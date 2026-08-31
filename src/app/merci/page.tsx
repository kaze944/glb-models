import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, MailIcon } from "lucide-react";

import { GlassPanel } from "@/components/qualification/glass-panel";
import { PhoneLink } from "@/components/qualification/phone-link";
import { AmbientOrbs } from "@/components/visual/ambient-orbs";
import { site } from "@/content/site";

/**
 * Confirmation page.
 *
 * Doubles as the conversion URL for Google Ads: the form rewrites the address
 * to `/merci` once a lead is accepted, and reloading or bookmarking that
 * address lands here rather than on a half-empty form.
 */
export const metadata: Metadata = {
  title: "Demande reçue",
  description:
    "Votre demande d’analyse est enregistrée. Vous recevez votre recommandation écrite sous 24 h ouvrées.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/merci" },
};

const steps = [
  {
    when: "Sous 24 h ouvrées",
    title: "Votre recommandation écrite",
    detail:
      "Deux pages : ce qui bloque aujourd’hui, ce que nous corrigerions en premier, une fourchette de budget et un délai réalistes.",
  },
  {
    when: "Ensuite, si vous le souhaitez",
    title: "Un appel de 20 minutes",
    detail:
      "Pour répondre à vos questions et vérifier ensemble que nous sommes le bon partenaire. C’est vous qui décidez de le programmer.",
  },
  {
    when: "Sous 4 jours ouvrés",
    title: "Proposition chiffrée et planning daté",
    detail:
      "Un prix fixe, des dates de livraison. Rien ne démarre sans votre accord écrit.",
  },
];

export default function MerciPage() {
  return (
    <main className="relative isolate flex flex-1 items-center overflow-hidden py-20 sm:py-28">
      <AmbientOrbs variant="focus" animated className="-z-10" />

      <div className="container-page">
        <div className="mx-auto max-w-[46rem]">
          <GlassPanel className="px-6 py-9 sm:px-10 sm:py-12">
            <p className="eyebrow text-brand">Demande reçue</p>
            <h1 className="display-sub mt-4 max-w-[22ch]">
              Merci. Votre analyse est en préparation.
            </h1>
            <p className="text-ink-soft mt-5 max-w-[52ch] text-[0.975rem] leading-relaxed">
              Nous avons tout ce qu’il nous faut pour commencer. Vous n’avez rien
              d’autre à faire : la suite arrive par e-mail, et personne ne vous
              appellera sans que vous l’ayez demandé.
            </p>

            <div className="rule mt-9" />

            <ol className="mt-9 space-y-7">
              {steps.map((step) => (
                <li key={step.title} className="flex gap-5">
                  <span
                    aria-hidden
                    className="border-hairline text-ink-muted mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border bg-white/70 font-mono text-[0.6875rem]"
                  >
                    {String(steps.indexOf(step) + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-brand font-mono text-[0.6875rem] tracking-[0.1em] uppercase">
                      {step.when}
                    </p>
                    <p className="text-ink mt-1.5 text-[1rem] font-medium tracking-[-0.015em]">
                      {step.title}
                    </p>
                    <p className="text-ink-muted mt-1.5 max-w-[52ch] text-[0.875rem] leading-relaxed text-pretty">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="border-hairline mt-10 border-t pt-7">
              <p className="text-ink-soft text-[0.875rem] leading-relaxed">
                Votre projet est urgent ou vous avez oublié un détail important ?
                Écrivez-nous ou appelez-nous directement.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
                <PhoneLink location="merci" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-ink-soft hover:text-brand inline-flex items-center gap-2 text-[0.875rem] transition-colors"
                >
                  <MailIcon className="size-3.5 shrink-0" strokeWidth={1.7} aria-hidden />
                  {site.contact.email}
                </a>
              </div>
            </div>
          </GlassPanel>

          <Link
            href="/"
            className="text-ink-muted hover:text-ink mt-8 inline-flex items-center gap-2 text-[0.875rem] transition-colors"
          >
            <ArrowLeftIcon className="size-3.5" strokeWidth={1.7} aria-hidden />
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
