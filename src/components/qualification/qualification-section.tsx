import { CheckIcon } from "lucide-react";

import { PhoneLink } from "@/components/qualification/phone-link";
import { QualificationCard } from "@/components/qualification/qualification-card";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/sections/section-intro";
import { AmbientOrbs } from "@/components/visual/ambient-orbs";
import { copy } from "@/content/copy";
import { site } from "@/content/site";

/**
 * Conversion section wrapping the multi-step qualification form.
 * The anchor id is the target of every call to action on the page.
 *
 * Server Component on purpose: the promise, the headline and the three
 * reasons to answer are in the initial HTML, and only the panel hydrates.
 */
export function QualificationSection() {
  const { formSection } = copy;

  return (
    <section
      id={site.ctaAnchor.replace("#", "")}
      className="relative isolate scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <AmbientOrbs variant="focus" animated className="-z-10" />

      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>{formSection.eyebrow}</Eyebrow>
              <h2 className="display-section mt-5 max-w-[17ch]">
                {formSection.headline}
              </h2>
              <div className="rule-left mt-7 w-24" />
              <p className="text-ink-soft mt-7 max-w-[44ch] text-[0.975rem] leading-relaxed">
                {formSection.intro}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <ul className="mt-8 space-y-3.5">
                {formSection.bullets.map((bullet) => (
                  <li key={bullet} className="flex max-w-[42ch] gap-3">
                    <span
                      aria-hidden
                      className="border-brand/20 text-brand mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border bg-white/70"
                    >
                      <CheckIcon className="size-3" strokeWidth={2.4} />
                    </span>
                    <span className="text-ink-soft text-[0.9375rem] leading-snug text-pretty">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-hairline mt-8 border-t pt-6">
                <p className="text-ink-muted text-[0.8125rem] leading-relaxed">
                  Vous préférez en parler de vive voix ? Appelez-nous, du lundi au
                  vendredi, de 9 h à 18 h.
                </p>
                <PhoneLink location="qualification-section" className="mt-2" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <QualificationCard />
          </div>
        </div>
      </div>
    </section>
  );
}
