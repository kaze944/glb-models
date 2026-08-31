import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
import { cities, cityBySlug, type City } from "@/content/cities";
import { copy } from "@/content/copy";
import { site } from "@/content/site";

type Params = { ville: string };

export function generateStaticParams(): Params[] {
  return cities.map((city) => ({ ville: city.slug }));
}

export const dynamicParams = false;

function heroOverrides(city: City) {
  return {
    eyebrow: `Création de site web ${city.locative}`,
    headline: `Un site web qui vous amène des clients ${city.locative},`,
    emphasis: "pas des compliments.",
    subheadline: `${copy.hero.subheadline} Nous travaillons à distance avec des entreprises ${city.locative} et dans ${city.area}.`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { ville } = await params;
  const city = cityBySlug.get(ville);
  if (!city) return {};

  const title = `Création de site web ${city.locative} — prix fixe, 21 jours`;
  const description = `Studio de création de sites web pour les entreprises ${city.locative}. Rédaction comprise, prix fixe, mise en ligne en 21 jours. Recommandation écrite sous 24 h.`;

  return {
    title,
    description,
    alternates: { canonical: `/creation-site-web/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/creation-site-web/${city.slug}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { ville } = await params;
  const city = cityBySlug.get(ville);
  if (!city) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/creation-site-web/${city.slug}#studio`,
    name: `${site.legalName} — création de site web ${city.locative}`,
    description: copy.meta.description,
    url: `${site.url}/creation-site-web/${city.slug}`,
    email: site.contact.email,
    telephone: site.contact.phoneHref,
    areaServed: { "@type": "City", name: city.name },
  };

  return (
    <>
      <SiteHeader />

      <main id="top" className="flex-1 pb-[84px] lg:pb-0">
        <Hero overrides={heroOverrides(city)} />
        <ProofBar />

        <section className="container-page py-12 sm:py-16">
          <div className="border-hairline max-w-[62ch] border-l pl-6">
            <p className="eyebrow text-ink-muted">Contexte local</p>
            <p className="text-ink-soft mt-3 text-[1.0625rem] leading-relaxed text-pretty">
              {city.angle}
            </p>
          </div>
        </section>

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
