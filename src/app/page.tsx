import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StickyCta } from "@/components/layout/sticky-cta";
import { QualificationSection } from "@/components/qualification/qualification-section";
import { DeliverablesSection } from "@/components/sections/deliverables-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { MethodSection } from "@/components/sections/method-section";
import { ObjectionsSection } from "@/components/sections/objections-section";
import { OfferSection } from "@/components/sections/offer-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ProofBar } from "@/components/sections/proof-bar";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { copy } from "@/content/copy";
import { site } from "@/content/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}#studio`,
      name: site.legalName,
      description: copy.meta.description,
      url: site.url,
      email: site.contact.email,
      telephone: site.contact.phoneHref,
      areaServed: site.serviceAreas.map((area) => ({
        "@type": "City",
        name: area,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}#faq`,
      mainEntity: copy.objections.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* Bottom padding clears the mobile sticky bar. */}
      <main id="top" className="flex-1 pb-[84px] lg:pb-0">
        <Hero />
        <ProofBar />
        <ProblemSection />
        <MethodSection />
        <ShowcaseSection />
        <DeliverablesSection />
        <OfferSection />
        <TestimonialsSection />

        <div className="border-hairline bg-surface-raised/70 border-y">
          <QualificationSection />
        </div>

        <ObjectionsSection />
        <FinalCta />
      </main>

      <SiteFooter />
      <StickyCta />

      <script
        type="application/ld+json"
        // Serialised from typed content, so there is no user input to escape.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
