"use client";

import { CheckIcon, MailIcon, PhoneIcon } from "lucide-react";
import type { CSSProperties } from "react";

import { recapRows } from "@/components/qualification/questions";
import { site } from "@/content/site";
import type { Lead, LeadEstimate } from "@/lib/lead";
import { cn } from "@/lib/utils";

import styles from "./qualification.module.css";

type RewardPanelProps = {
  lead: Lead;
  estimate: LeadEstimate;
  leadId: string;
};

const riseAt = (index: number) => ({ "--i": index }) as CSSProperties;

/**
 * Shown once the lead is accepted. This is the payoff for the seven screens
 * the visitor just went through: a real read on their project, not a thank-you
 * note.
 */
export function RewardPanel({ lead, estimate, leadId }: RewardPanelProps) {
  const firstName = lead.fullName.trim().split(/\s+/)[0];

  return (
    <div className="px-5 pt-7 pb-8 sm:px-8 sm:pt-9">
      <div className="flex items-start gap-4">
        <span
          className={cn(
            styles.seal,
            "border-brand/20 bg-brand/8 text-brand grid size-12 shrink-0 place-items-center rounded-2xl border",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <path className={styles.sealTick} d="M5 12.5 10 17.5 19 7.5" />
          </svg>
        </span>

        <div className="min-w-0">
          <p className="eyebrow text-brand">Diagnostic prêt</p>
          <h3 className="text-ink mt-1.5 text-[1.4rem] leading-[1.15] sm:text-[1.6rem]">
            Merci {firstName}, voici ce que nous retenons.
          </h3>
        </div>
      </div>

      <p className="text-ink-soft mt-4 text-[0.9375rem] leading-relaxed text-pretty">
        Votre recommandation écrite part par e-mail sous 24 h ouvrées, à
        l&apos;adresse <span className="text-ink font-medium">{lead.email}</span>.
        En attendant, voici la lecture que nous faisons de vos réponses.
      </p>

      <div
        style={riseAt(0)}
        className={cn(
          styles.rise,
          "border-hairline mt-6 rounded-2xl border bg-white/70 p-5",
        )}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-ink-muted font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
              Fourchette estimée
            </p>
            <p className="text-ink mt-1.5 text-[1.5rem] leading-none tracking-[-0.03em]">
              {estimate.budgetRange}
            </p>
          </div>
          <div className="text-right">
            <p className="text-ink-muted font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
              Production
            </p>
            <p className="text-ink mt-1.5 text-[1.05rem] leading-none tracking-[-0.02em]">
              {estimate.productionTime}
            </p>
          </div>
        </div>

        <p className="text-ink-soft mt-3.5 text-[0.875rem] leading-relaxed text-pretty">
          {estimate.budgetNote}
        </p>

        <p className="text-ink-muted border-hairline mt-3.5 border-t pt-3.5 text-[0.8125rem] leading-relaxed">
          {estimate.launchLabel}
        </p>
      </div>

      <section style={riseAt(1)} className={cn(styles.rise, "mt-7")}>
        <h4 className="text-ink-muted font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
          Nos trois priorités sur votre projet
        </h4>
        <ul className="mt-3 space-y-2.5">
          {estimate.focus.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="bg-brand/10 text-brand mt-0.5 grid size-5 shrink-0 place-items-center rounded-full">
                <CheckIcon className="size-3" strokeWidth={2.6} aria-hidden />
              </span>
              <span className="text-ink-soft text-[0.9375rem] leading-snug text-pretty">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section style={riseAt(2)} className={cn(styles.rise, "mt-7")}>
        <h4 className="text-ink-muted font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
          La suite, datée
        </h4>
        <ol className="border-hairline mt-3 space-y-5 border-l pl-5">
          {estimate.nextSteps.map((step) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden
                className="border-brand/40 absolute top-1.5 -left-[1.4rem] size-2.5 rounded-full border-2 bg-white"
              />
              <p className="text-brand font-mono text-[0.6875rem] tracking-[0.08em] uppercase">
                {step.when}
              </p>
              <p className="text-ink mt-1 text-[0.9375rem] font-medium tracking-[-0.012em]">
                {step.title}
              </p>
              <p className="text-ink-muted mt-1 text-[0.8438rem] leading-relaxed text-pretty">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <details
        style={riseAt(3)}
        className={cn(styles.rise, "group border-hairline mt-7 border-t pt-5")}
      >
        <summary className="text-ink-soft hover:text-ink flex cursor-pointer list-none items-center justify-between font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors">
          Vos réponses
          <span className="text-ink-muted transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </summary>
        <dl className="mt-4 space-y-2.5">
          {recapRows(lead).map((row) => (
            <div key={row.label} className="flex gap-4 text-[0.875rem]">
              <dt className="text-ink-muted w-32 shrink-0">{row.label}</dt>
              <dd className="text-ink-soft min-w-0 flex-1 text-pretty">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </details>

      <div className="border-hairline mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-5">
        <p className="text-ink-muted font-mono text-[0.6875rem] tracking-[0.08em] uppercase">
          Dossier {leadId}
        </p>
        <a
          href={`mailto:${site.contact.email}`}
          className="text-ink-soft hover:text-brand inline-flex items-center gap-1.5 text-[0.8125rem] transition-colors"
        >
          <MailIcon className="size-3.5" strokeWidth={1.7} aria-hidden />
          {site.contact.email}
        </a>
        <a
          href={`tel:${site.contact.phoneHref}`}
          className="text-ink-soft hover:text-brand inline-flex items-center gap-1.5 text-[0.8125rem] transition-colors"
        >
          <PhoneIcon className="size-3.5" strokeWidth={1.7} aria-hidden />
          {site.contact.phone}
        </a>
      </div>
    </div>
  );
}
