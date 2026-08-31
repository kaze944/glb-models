import type { Metadata } from "next";

import { MinimalHeader } from "@/components/layout/minimal-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LegalArticle } from "@/components/legal/legal-article";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description:
    "Données collectées par le formulaire, finalités, durées de conservation et exercice de vos droits.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <>
      <MinimalHeader />
      <main className="flex-1">
        <LegalArticle document={privacyPolicy} />
      </main>
      <SiteFooter />
    </>
  );
}
