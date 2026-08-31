/**
 * Qualification endpoint.
 *
 * Everything is optional here: with no environment variable at all the route
 * validates, scores and logs the lead, then answers 200. A fresh Vercel deploy
 * therefore converts from the first minute, and delivery can be wired later.
 *
 * Optional environment variables
 * ------------------------------
 *   LEAD_WEBHOOK_URL    Any JSON endpoint — Make, Zapier, n8n, a Slack
 *                       incoming webhook, a CRM. Receives the full payload
 *                       below as POST JSON.
 *   LEAD_WEBHOOK_SECRET Sent as `x-lead-signature` so the receiver can check
 *                       the call really comes from this site.
 *   RESEND_API_KEY      Enables the notification e-mail through Resend's HTTP
 *                       API (no SDK, plain `fetch`).
 *   LEAD_FROM_EMAIL     Sender for that e-mail. Must be a domain verified in
 *                       Resend. Defaults to `onboarding@resend.dev`.
 *   LEAD_TO_EMAIL       Recipient. Defaults to `site.contact.email`.
 *
 * The route never fails because a delivery target is misconfigured: the lead
 * is written to the server log first, and notifications are attempted after
 * the response has been sent.
 */

import { after } from "next/server";

import { site } from "@/content/site";
import {
  estimateProject,
  leadRequestSchema,
  normalisePhone,
  normaliseSiteUrl,
  scoreLead,
  type Lead,
  type LeadErrorCode,
  type LeadErrorResponse,
  type LeadResponse,
  type LeadScore,
  type LeadSuccessResponse,
} from "@/lib/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/* Rate limiting                                                       */
/* ------------------------------------------------------------------ */

/**
 * Six submissions per IP per ten minutes — far above what a real prospect
 * needs, low enough to make scripted flooding pointless.
 *
 * In-memory on purpose: a serverless instance handles a burst from a single
 * source, which is exactly the case this guards against. Cross-instance limits
 * would need Redis or Vercel KV, which this project deliberately does without.
 * Bots that rotate IPs are caught by the honeypot and the timing check below.
 */
const RATE_LIMIT = 6;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string, now: number): boolean {
  // Opportunistic sweep; the map only ever holds recent, active IPs.
  if (hits.size > 500) {
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }

  const entry = hits.get(ip);

  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/* ------------------------------------------------------------------ */
/* Anti-spam                                                           */
/* ------------------------------------------------------------------ */

/**
 * Nobody reads seven screens in under four seconds. Combined with the
 * honeypot this removes scripted submissions without showing a captcha —
 * which would cost far more conversions than the spam it stops.
 */
const MIN_FILL_MS = 4_000;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function json(payload: LeadResponse, status: number): Response {
  return Response.json(payload, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

function fail(
  code: LeadErrorCode,
  error: string,
  status: number,
  issues?: LeadErrorResponse["issues"],
): Response {
  return json({ ok: false, code, error, issues }, status);
}

function newLeadId(now: Date): string {
  const stamp = now.toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 36 ** 4)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0");

  return `KB-${stamp}-${random}`;
}

/* ------------------------------------------------------------------ */
/* Delivery                                                            */
/* ------------------------------------------------------------------ */

type DeliveryPayload = {
  leadId: string;
  receivedAt: string;
  score: LeadScore;
  lead: Lead & { phoneE164: string; currentSiteUrl?: string };
  meta: { elapsedMs: number; page?: string; referrer?: string; ip: string };
};

async function forwardToWebhook(payload: DeliveryPayload): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;

  const secret = process.env.LEAD_WEBHOOK_SECRET;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(secret ? { "x-lead-signature": secret } : {}),
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`webhook ${response.status} ${await response.text()}`);
  }
}

function emailBody(payload: DeliveryPayload): string {
  const { lead, score } = payload;

  const lines = [
    `Score ${score.value}/100 (${score.temperature})`,
    score.reasons.length ? `Signaux : ${score.reasons.join(", ")}` : null,
    "",
    `Contact    ${lead.fullName}${lead.company ? ` — ${lead.company}` : ""}`,
    `E-mail     ${lead.email}`,
    `Téléphone  ${lead.phoneE164}`,
    `Rôle       ${lead.role}`,
    "",
    `Objectif   ${lead.goal}`,
    `Situation  ${lead.situation}`,
    `Secteur    ${lead.sector}`,
    `Zone       ${lead.area}`,
    `Échéance   ${lead.timeline}`,
    `Budget     ${lead.budget}`,
    `Canaux     ${lead.acquisition.join(", ")}`,
    lead.currentSiteUrl ? `Site       ${lead.currentSiteUrl}` : null,
    "",
    lead.message ? `Message :\n${lead.message}` : "Pas de message libre.",
    "",
    `Dossier ${payload.leadId} — reçu le ${payload.receivedAt}`,
    payload.meta.page ? `Page ${payload.meta.page}` : null,
    payload.meta.referrer ? `Référent ${payload.meta.referrer}` : null,
  ];

  return lines.filter((line) => line !== null).join("\n");
}

async function notifyByEmail(payload: DeliveryPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev",
      to: [process.env.LEAD_TO_EMAIL ?? site.contact.email],
      reply_to: payload.lead.email,
      subject: `[${payload.score.temperature}] ${payload.lead.fullName} — ${payload.lead.area} — ${payload.score.value}/100`,
      text: emailBody(payload),
    }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`resend ${response.status} ${await response.text()}`);
  }
}

async function deliver(payload: DeliveryPayload): Promise<void> {
  const results = await Promise.allSettled([
    forwardToWebhook(payload),
    notifyByEmail(payload),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      // The lead is already in the log above, so nothing is lost.
      console.error("[lead] delivery failed", payload.leadId, result.reason);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */

export async function POST(request: Request): Promise<Response> {
  const now = new Date();
  const ip = clientIp(request);

  if (rateLimited(ip, now.getTime())) {
    return fail(
      "rate_limited",
      "Nous avons déjà reçu plusieurs demandes depuis cette connexion. Réessayez dans quelques minutes ou appelez-nous.",
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("malformed_json", "Requête illisible.", 400);
  }

  const parsed = leadRequestSchema.safeParse(body);

  if (!parsed.success) {
    const issues: LeadErrorResponse["issues"] = {};

    for (const issue of parsed.error.issues) {
      // `answers.email` → `email`; anything outside `answers` stays generic.
      const [scope, field] = issue.path;
      if (scope === "answers" && typeof field === "string" && !(field in issues)) {
        issues[field as keyof Lead] = issue.message;
      }
    }

    return fail(
      "invalid_payload",
      "Quelques réponses demandent une correction.",
      422,
      Object.keys(issues).length > 0 ? issues : undefined,
    );
  }

  const { answers, meta, trap } = parsed.data;
  const leadId = newLeadId(now);
  const score = scoreLead(answers);
  const estimate = estimateProject(answers, now);

  const suspicious = Boolean(trap && trap.trim()) || meta.elapsedMs < MIN_FILL_MS;

  const success: LeadSuccessResponse = {
    ok: true,
    leadId,
    score: { value: score.value, temperature: score.temperature },
    estimate,
  };

  if (suspicious) {
    // Answer exactly like a real submission: a bot that gets an error retries.
    console.warn("[lead] discarded", {
      leadId,
      ip,
      trapped: Boolean(trap && trap.trim()),
      elapsedMs: meta.elapsedMs,
    });
    return json(success, 200);
  }

  const payload: DeliveryPayload = {
    leadId,
    receivedAt: now.toISOString(),
    score,
    lead: {
      ...answers,
      phoneE164: normalisePhone(answers.phone),
      currentSiteUrl: normaliseSiteUrl(answers.currentSite),
    },
    meta: { ...meta, ip },
  };

  console.info(
    `[lead] ${leadId} ${score.value}/100 ${score.temperature} — ${answers.fullName} <${answers.email}> ${payload.lead.phoneE164} — ${answers.sector}/${answers.area} — ${answers.budget} / ${answers.timeline}`,
  );

  // Delivery runs once the visitor already has their confirmation screen.
  after(() => deliver(payload));

  return json(success, 200);
}

export async function GET(): Promise<Response> {
  return fail("invalid_payload", "Utilisez POST pour envoyer une demande.", 405);
}
