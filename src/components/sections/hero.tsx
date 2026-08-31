import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { AmbientOrbs } from "@/components/visual/ambient-orbs";
import { ShowcaseStage } from "@/components/visual/showcase-stage";
import { CtaLink } from "@/components/ui/cta";
import { copy } from "@/content/copy";

/**
 * Highlights `emphasis` inside the headline. The copy is owned by another
 * author, so this handles both cases: emphasis as a substring of the
 * headline, and emphasis as the clause that follows it.
 */
function headlineWithEmphasis(headline: string, emphasis: string): ReactNode {
  if (!emphasis) return headline;
  const at = headline.indexOf(emphasis);

  if (at === -1) {
    return (
      <>
        {headline}{" "}
        <span className="emphasis-stroke">{emphasis}</span>
      </>
    );
  }

  return (
    <>
      {headline.slice(0, at)}
      <span className="emphasis-stroke">{emphasis}</span>
      {headline.slice(at + emphasis.length)}
    </>
  );
}

export function Hero() {
  const { hero } = copy;

  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <AmbientOrbs
        variant="soft"
        animated
        className="-z-10 h-[130%] opacity-45"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-hairline"
      />

      <div className="container-page pt-[112px] pb-14 sm:pt-[136px] sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="motion-safe:animate-fade">
              <span className="eyebrow text-brand inline-flex items-center gap-3">
                <span
                  aria-hidden
                  className="bg-brand relative flex size-[5px] rounded-full"
                >
                  <span className="bg-brand/50 motion-safe:animate-sheen absolute inset-[-4px] rounded-full" />
                </span>
                {hero.eyebrow}
              </span>
            </p>

            <h1 className="display-hero mt-6 max-w-[15ch] text-balance">
              {headlineWithEmphasis(hero.headline, hero.emphasis)}
            </h1>

            <p className="lede text-ink-soft mt-7 max-w-[52ch] motion-safe:animate-rise [animation-delay:120ms]">
              {hero.subheadline}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaLink
                href={hero.primaryCta.href}
                location="hero_primary"
                className="w-full sm:w-auto"
              >
                {hero.primaryCta.label}
              </CtaLink>
              <CtaLink
                href={hero.secondaryCta.href}
                location="hero_secondary"
                variant="outline"
                arrow={false}
                className="w-full sm:w-auto"
              >
                {hero.secondaryCta.label}
              </CtaLink>
            </div>

            {hero.primaryCta.note ? (
              <p className="text-ink-muted mt-4 text-[0.82rem]">
                {hero.primaryCta.note}
              </p>
            ) : null}

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {hero.reassurances.map((item) => (
                <li
                  key={item}
                  className="text-ink-soft flex items-center gap-2 text-[0.85rem]"
                >
                  <CheckMark />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 xl:col-span-5">
            <ShowcaseStage />
          </div>
        </div>

        <Reveal delay={200} className="mt-14 sm:mt-20">
          <div className="bg-hairline h-px w-full" />
          <dl className="grid grid-cols-1 sm:grid-cols-3">
            {hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`border-hairline flex flex-col gap-2 py-6 sm:py-7 ${
                  i > 0 ? "border-t sm:border-t-0 sm:border-l sm:pl-8" : ""
                } ${i === 0 ? "sm:pr-8" : ""} ${i === 1 ? "sm:pr-8" : ""}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="contents">
                  <span className="figure text-ink text-[clamp(2rem,3.2vw,2.7rem)] leading-none">
                    {stat.value}
                  </span>
                  <span className="text-ink-muted max-w-[24ch] font-mono text-[0.67rem] tracking-[0.13em] uppercase">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function CheckMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 14 14"
      className="text-brand size-[13px] shrink-0"
    >
      <path
        d="M2 7.4 5.4 10.8 12 3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
