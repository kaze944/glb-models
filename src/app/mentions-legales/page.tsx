import type { Metadata } from "next";

import { MinimalHeader } from "@/components/layout/minimal-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LegalArticle } from "@/components/legal/legal-article";
import { legalNotice } from "@/content/legal";

export const metadata: Metadata = {
  title: legalNotice.title,
  description:
    "Éditeur du site, hébergeur, propriété intellectuelle et informations légales.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <MinimalHeader />
      <main className="flex-1">
        <LegalArticle document={legalNotice} />
      </main>
      <SiteFooter />
    </>
  );
}
