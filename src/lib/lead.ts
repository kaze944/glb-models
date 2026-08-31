/**
 * Lead contract shared by the client form and the `/api/lead` route.
 *
 * Everything here is isomorphic on purpose: the browser validates each step
 * with the exact schema the server re-validates against. No labels live here —
 * wording belongs to `components/qualification/questions.ts`, so this module
 * stays free of icons and copy and can be imported by the route handler.
 */

import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Answer vocabularies                                                 */
/* ------------------------------------------------------------------ */

export const GOALS = [
  "demandes",
  "credibilite",
  "vente-en-ligne",
  "lancement",
] as const;

export const SITUATIONS = [
  "aucun-site",
  "site-depasse",
  "site-sans-demandes",
  "reseaux-seulement",
] as const;

export const SECTORS = [
  "batiment",
  "services-pro",
  "sante",
  "commerce",
  "immobilier",
  "autre",
] as const;

export const TIMELINES = [
  "des-que-possible",
  "trois-mois",
  "six-mois",
  "exploration",
] as const;

export const BUDGETS = [
  "moins-2500",
  "2500-5000",
  "5000-10000",
  "plus-10000",
  "a-definir",
] as const;

export const CHANNELS = [
  "bouche-a-oreille",
  "recherche-google",
  "publicite-payante",
  "reseaux-sociaux",
  "prospection",
  "plateformes",
] as const;

export const ROLES = ["decideur", "co-decideur", "prescripteur"] as const;

export type Goal = (typeof GOALS)[number];
export type Situation = (typeof SITUATIONS)[number];
export type Sector = (typeof SECTORS)[number];
export type Timeline = (typeof TIMELINES)[number];
export type Budget = (typeof BUDGETS)[number];
export type Channel = (typeof CHANNELS)[number];
export type Role = (typeof ROLES)[number];

/* ------------------------------------------------------------------ */
/* Schemas                                                             */
/* ------------------------------------------------------------------ */

const requiredChoice = (message: string) =>
  z.string({ required_error: message, invalid_type_error: message });

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Merci de rester sous ${max} caractères.`)
    .optional();

/**
 * Deliberately permissive: French, Belgian and Swiss numbers arrive written
 * as `06 12 34 56 78`, `+33 6 12 34 56 78`, `0033612345678` or `06.12.34.56.78`.
 * We count digits instead of matching a country pattern, and normalise on the
 * server rather than rejecting a real prospect over a separator.
 */
const phone = z
  .string({ required_error: "Un numéro nous permet de vous joindre rapidement." })
  .trim()
  .min(1, "Un numéro nous permet de vous joindre rapidement.")
  .max(30, "Ce numéro semble trop long.")
  .refine(
    (value) => /^[+\d][\d\s().\-/]*$/.test(value),
    "Utilisez uniquement des chiffres, des espaces et le signe +.",
  )
  .refine(
    (value) => (value.match(/\d/g) ?? []).length >= 9,
    "Ce numéro paraît incomplet. Exemple : 06 12 34 56 78.",
  );

export const leadSchema = z.object({
  goal: requiredChoice("Choisissez l’objectif le plus proche du vôtre.").pipe(
    z.enum(GOALS, {
      errorMap: () => ({ message: "Choisissez l’objectif le plus proche du vôtre." }),
    }),
  ),
  situation: requiredChoice("Indiquez où vous en êtes aujourd’hui.").pipe(
    z.enum(SITUATIONS, {
      errorMap: () => ({ message: "Indiquez où vous en êtes aujourd’hui." }),
    }),
  ),
  sector: requiredChoice("Sélectionnez le secteur le plus proche du vôtre.").pipe(
    z.enum(SECTORS, {
      errorMap: () => ({ message: "Sélectionnez le secteur le plus proche du vôtre." }),
    }),
  ),
  area: z
    .string({ required_error: "Indiquez votre ville ou votre zone." })
    .trim()
    .min(2, "Indiquez votre ville ou votre zone d’intervention.")
    .max(80, "Merci de rester sous 80 caractères."),
  timeline: requiredChoice("Donnez-nous une échéance, même approximative.").pipe(
    z.enum(TIMELINES, {
      errorMap: () => ({ message: "Donnez-nous une échéance, même approximative." }),
    }),
  ),
  budget: requiredChoice("Choisissez une tranche : elle ne vous engage à rien.").pipe(
    z.enum(BUDGETS, {
      errorMap: () => ({
        message: "Choisissez une tranche : elle ne vous engage à rien.",
      }),
    }),
  ),
  acquisition: z
    .array(z.enum(CHANNELS, { errorMap: () => ({ message: "Canal inconnu." }) }), {
      required_error: "Sélectionnez au moins un canal, plusieurs si besoin.",
      invalid_type_error: "Sélectionnez au moins un canal, plusieurs si besoin.",
    })
    .min(1, "Sélectionnez au moins un canal, plusieurs si besoin.")
    .max(CHANNELS.length),
  role: requiredChoice("Précisez votre rôle sur ce projet.").pipe(
    z.enum(ROLES, {
      errorMap: () => ({ message: "Précisez votre rôle sur ce projet." }),
    }),
  ),
  fullName: z
    .string({ required_error: "Dites-nous comment vous appeler." })
    .trim()
    .min(2, "Dites-nous comment vous appeler.")
    .max(80, "Merci de rester sous 80 caractères."),
  email: z
    .string({ required_error: "Il nous faut un e-mail pour vous envoyer l’analyse." })
    .trim()
    .min(1, "Il nous faut un e-mail pour vous envoyer l’analyse.")
    .max(160, "Cette adresse est trop longue.")
    .email("Cette adresse semble incomplète. Exemple : prenom@entreprise.fr"),
  phone,
  company: optionalText(120),
  currentSite: optionalText(200).refine(
    (value) =>
      !value ||
      /^[^\s]+\.[a-z]{2,}([/?#].*)?$/i.test(value.replace(/^https?:\/\//i, "")),
    "Vérifiez l’adresse : elle doit ressembler à monentreprise.fr",
  ),
  message: optionalText(1200),
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadDraft = Partial<Record<keyof Lead, unknown>>;

/**
 * What the form actually holds before parsing: the choice fields are plain
 * strings until an option is picked, so the resolver — not the type system —
 * is what turns them into enum members.
 */
export type LeadFormValues = z.input<typeof leadSchema>;

/**
 * One schema per screen. The client derives its per-step validation from these
 * shapes, so a field can never be validated by one set of rules in the browser
 * and another on the server.
 */
export const stepSchemas = {
  objectif: leadSchema.pick({ goal: true }),
  situation: leadSchema.pick({ situation: true }),
  activite: leadSchema.pick({ sector: true, area: true, currentSite: true }),
  echeance: leadSchema.pick({ timeline: true }),
  budget: leadSchema.pick({ budget: true }),
  acquisition: leadSchema.pick({ acquisition: true }),
  coordonnees: leadSchema.pick({
    role: true,
    fullName: true,
    email: true,
    phone: true,
    company: true,
    message: true,
  }),
} as const;

export type StepId = keyof typeof stepSchemas;

export const leadRequestSchema = z.object({
  answers: leadSchema,
  meta: z.object({
    /** Milliseconds between the first interaction and the submission. */
    elapsedMs: z.number().int().min(0).max(24 * 60 * 60 * 1000),
    page: z.string().max(300).optional(),
    referrer: z.string().max(600).optional(),
  }),
  /** Honeypot. Must stay empty: only automated fillers touch it. */
  trap: z.string().max(200).optional(),
});

export type LeadRequest = z.infer<typeof leadRequestSchema>;

/* ------------------------------------------------------------------ */
/* Normalisation                                                       */
/* ------------------------------------------------------------------ */

/**
 * Turns whatever the visitor typed into a dialable number.
 *
 * `0033`/`00` prefixes become `+`, French national numbers starting with a
 * single `0` are promoted to `+33`, everything else keeps its digits. The raw
 * input is never discarded upstream — this is only what lands in the CRM.
 */
export function normalisePhone(input: string): string {
  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, "");
  const explicitInternational = trimmed.startsWith("+") || digits.startsWith("00");
  const national = digits.replace(/^00/, "");

  if (explicitInternational) return `+${national}`;
  if (digits.length === 10 && digits.startsWith("0")) return `+33${digits.slice(1)}`;
  return digits;
}

/** Adds the scheme back so the URL is clickable straight from the CRM. */
export function normaliseSiteUrl(input: string | undefined): string | undefined {
  if (!input) return undefined;
  const trimmed = input.trim();
  if (!trimmed) return undefined;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/* ------------------------------------------------------------------ */
/* Scoring                                                             */
/* ------------------------------------------------------------------ */

export type Temperature = "chaud" | "tiede" | "froid";

export type LeadScore = {
  /** 0 to 100. */
  value: number;
  temperature: Temperature;
  /** Human-readable drivers, useful in the CRM and in the server log. */
  reasons: string[];
};

/*
 * Weights add up to exactly 100, so the score reads as a percentage.
 *
 *   budget      30  — the single best predictor of a project that signs
 *   timeline    26  — urgency; a six-month horizon rarely converts this quarter
 *   situation   14  — an existing site that fails to convert is the sharpest pain
 *   goal        12  — commercial intent behind the project
 *   role        10  — talking to the decision-maker halves the sales cycle
 *   acquisition  8  — someone already buying traffic understands what a site costs
 *
 * Temperature bands: >= 65 chaud, >= 40 tiède, below froid.
 */

const BUDGET_POINTS: Record<Budget, number> = {
  "plus-10000": 30,
  "5000-10000": 26,
  "2500-5000": 16,
  "a-definir": 10,
  "moins-2500": 4,
};

const TIMELINE_POINTS: Record<Timeline, number> = {
  "des-que-possible": 26,
  "trois-mois": 18,
  "six-mois": 8,
  exploration: 0,
};

const SITUATION_POINTS: Record<Situation, number> = {
  "site-sans-demandes": 14,
  "site-depasse": 11,
  "reseaux-seulement": 7,
  "aucun-site": 6,
};

const GOAL_POINTS: Record<Goal, number> = {
  demandes: 12,
  "vente-en-ligne": 10,
  credibilite: 6,
  lancement: 4,
};

const ROLE_POINTS: Record<Role, number> = {
  decideur: 10,
  "co-decideur": 6,
  prescripteur: 2,
};

const CHANNEL_POINTS: Record<Channel, number> = {
  "publicite-payante": 8,
  "recherche-google": 4,
  "reseaux-sociaux": 2,
  plateformes: 2,
  prospection: 1,
  "bouche-a-oreille": 1,
};

const CHANNEL_CAP = 8;

export function scoreLead(lead: Lead): LeadScore {
  const channelPoints = Math.min(
    CHANNEL_CAP,
    lead.acquisition.reduce((total, channel) => total + CHANNEL_POINTS[channel], 0),
  );

  const value =
    BUDGET_POINTS[lead.budget] +
    TIMELINE_POINTS[lead.timeline] +
    SITUATION_POINTS[lead.situation] +
    GOAL_POINTS[lead.goal] +
    ROLE_POINTS[lead.role] +
    channelPoints;

  const reasons: string[] = [];

  if (lead.timeline === "des-que-possible") reasons.push("échéance immédiate");
  if (lead.timeline === "exploration") reasons.push("en phase de comparaison");
  if (lead.budget === "plus-10000" || lead.budget === "5000-10000") {
    reasons.push("budget confortable");
  }
  if (lead.budget === "moins-2500") reasons.push("budget sous le point d’entrée");
  if (lead.role === "decideur") reasons.push("décideur direct");
  if (lead.role === "prescripteur") reasons.push("non décisionnaire");
  if (lead.acquisition.includes("publicite-payante")) {
    reasons.push("achète déjà du trafic");
  }
  if (lead.situation === "site-sans-demandes") reasons.push("trafic sans conversion");
  if (lead.message && lead.message.length > 120) reasons.push("brief détaillé");

  const temperature: Temperature =
    value >= 65 ? "chaud" : value >= 40 ? "tiede" : "froid";

  return { value, temperature, reasons };
}

/* ------------------------------------------------------------------ */
/* Estimate returned as the reward screen                              */
/* ------------------------------------------------------------------ */

export type LeadEstimate = {
  plan: string;
  budgetRange: string;
  budgetNote: string;
  productionTime: string;
  launchLabel: string;
  focus: string[];
  nextSteps: { when: string; title: string; detail: string }[];
};

const BUDGET_BRACKETS: Record<
  Budget,
  { plan: string; range: string; note: string }
> = {
  "moins-2500": {
    plan: "Essentiel",
    range: "2 400 € – 3 200 € HT",
    note: "Votre enveloppe est juste sous notre point d’entrée. Nous vous dirons franchement ce qui tient dedans, et ce qui devra attendre.",
  },
  "2500-5000": {
    plan: "Essentiel",
    range: "2 400 € – 4 900 € HT",
    note: "Cette enveloppe couvre un site de conversion complet, textes et suivi des conversions inclus.",
  },
  "5000-10000": {
    plan: "Croissance",
    range: "4 900 € – 8 500 € HT",
    note: "De quoi ajouter des pages locales pour vos campagnes et tester plusieurs messages clés.",
  },
  "plus-10000": {
    plan: "Sur mesure",
    range: "À partir de 10 000 € HT",
    note: "Périmètre à cadrer ensemble : plusieurs entités, connexion à votre CRM ou production de contenus.",
  },
  "a-definir": {
    plan: "Essentiel",
    range: "2 400 € – 4 900 € HT",
    note: "C’est la fourchette la plus fréquente pour un projet comparable au vôtre. Elle sera figée après notre échange.",
  },
};

const GOAL_FOCUS: Record<Goal, string[]> = {
  demandes: [
    "Un message qui se comprend en cinq secondes",
    "Un parcours de contact en trois clics maximum",
    "Le suivi des conversions branché sur vos campagnes",
  ],
  credibilite: [
    "Une direction artistique à la hauteur de vos prestations",
    "Des preuves clients vérifiables et chiffrées",
    "Une expérience mobile irréprochable",
  ],
  "vente-en-ligne": [
    "Un tunnel d’achat court et rassurant",
    "Des fiches produits qui lèvent les objections",
    "Paiement, livraison et relances automatisés",
  ],
  lancement: [
    "Un positionnement clair avant la première ligne de code",
    "Une page unique qui concentre toute la conversion",
    "Une base prête à recevoir vos premières campagnes",
  ],
};

const SITUATION_FOCUS: Record<Situation, string> = {
  "site-sans-demandes":
    "Un audit du parcours actuel pour isoler ce qui bloque vraiment",
  "site-depasse": "La reprise de votre référencement existant, sans perte de trafic",
  "aucun-site": "Nom de domaine, hébergement et mise en ligne pris en charge",
  "reseaux-seulement":
    "Une passerelle entre vos réseaux sociaux et un point de contact unique",
};

function addBusinessDays(from: Date, days: number): Date {
  const date = new Date(from.getTime());
  let remaining = days;

  while (remaining > 0) {
    date.setUTCDate(date.getUTCDate() + 1);
    const weekday = date.getUTCDay();
    if (weekday !== 0 && weekday !== 6) remaining -= 1;
  }

  return date;
}

function formatFr(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Paris",
  }).format(date);
}

/**
 * Turns the answers into the personalised recap shown once the form is sent.
 * Pure and deterministic apart from `now`, which the caller injects.
 */
export function estimateProject(lead: Lead, now: Date = new Date()): LeadEstimate {
  const bracket =
    lead.budget === "a-definir" && lead.goal === "vente-en-ligne"
      ? BUDGET_BRACKETS["5000-10000"]
      : BUDGET_BRACKETS[lead.budget];

  const productionDays = lead.goal === "vente-en-ligne" ? 30 : 21;

  const productionTime =
    lead.timeline === "des-que-possible"
      ? `${productionDays} jours, créneau prioritaire`
      : `${productionDays} jours à partir du lancement`;

  const launchLabel =
    lead.timeline === "des-que-possible"
      ? `Mise en ligne réalisable dès le ${formatFr(
          new Date(now.getTime() + productionDays * 86_400_000),
        )}`
      : lead.timeline === "trois-mois"
        ? "Créneau à réserver dès maintenant : nous ouvrons quatre projets par mois"
        : "Nous gardons votre dossier ouvert et vous recontactons quand vous le souhaitez";

  const focus = [SITUATION_FOCUS[lead.situation], ...GOAL_FOCUS[lead.goal]].slice(0, 3);

  const nextSteps = [
    {
      when: `Sous 24 h ouvrées — ${formatFr(addBusinessDays(now, 1))}`,
      title: "Votre recommandation écrite",
      detail:
        "Ce que nous ferions à votre place, dans quel ordre et pour quel budget. Deux pages, pas un devis à l’aveugle.",
    },
    {
      when: `À partir du ${formatFr(addBusinessDays(now, 2))}`,
      title: "Un appel de 20 minutes, si vous le souhaitez",
      detail:
        "Nous répondons à vos questions et vérifions ensemble que nous sommes le bon partenaire.",
    },
    {
      when: `Avant le ${formatFr(addBusinessDays(now, 4))}`,
      title: "Proposition chiffrée et planning daté",
      detail:
        "Un prix fixe et des dates de livraison. Rien ne démarre sans votre accord écrit.",
    },
  ];

  return {
    plan: bracket.plan,
    budgetRange: bracket.range,
    budgetNote: bracket.note,
    productionTime,
    launchLabel,
    focus,
    nextSteps,
  };
}

/* ------------------------------------------------------------------ */
/* API response contract                                               */
/* ------------------------------------------------------------------ */

export type LeadSuccessResponse = {
  ok: true;
  leadId: string;
  score: { value: number; temperature: Temperature };
  estimate: LeadEstimate;
};

export type LeadErrorCode =
  | "invalid_payload"
  | "malformed_json"
  | "rate_limited"
  | "server_error";

export type LeadErrorResponse = {
  ok: false;
  code: LeadErrorCode;
  error: string;
  /** Field name → first French error message. */
  issues?: Partial<Record<keyof Lead, string>>;
};

export type LeadResponse = LeadSuccessResponse | LeadErrorResponse;
