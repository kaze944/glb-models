import Link from "next/link";

import { MinimalHeader } from "@/components/layout/minimal-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CtaLink } from "@/components/ui/cta";

export default function NotFound() {
  return (
    <>
      <MinimalHeader />

      <main className="container-page flex flex-1 items-center py-28">
        <div className="max-w-[46ch]">
          <p className="eyebrow text-ink-muted">Erreur 404</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,2.9rem)] leading-[1.06]">
            Cette page n’existe pas.
          </h1>
          <p className="text-ink-soft mt-5 leading-relaxed text-pretty">
            Le lien est peut-être ancien, ou l’adresse comporte une faute de
            frappe. Vous pouvez revenir à l’accueil, ou décrire directement
            votre projet.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/#projet" location="not_found" arrow>
              Décrire mon projet
            </CtaLink>
            <Link
              href="/"
              className="text-ink-soft hover:text-ink inline-flex h-12 items-center justify-center text-[0.95rem] transition-colors sm:px-2"
            >
              Retour à l’accueil
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
