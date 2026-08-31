import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/sections/section-intro";
import { CtaLink } from "@/components/ui/cta";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

export function OfferSection() {
  const { offer } = copy;

  return (
    <section
      id="tarifs"
      className="border-hairline bg-surface-raised/70 scroll-mt-24 border-y py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionIntro
          layout="split"
          eyebrow={offer.eyebrow}
          headline={offer.headline}
          intro={offer.intro}
        />

        <div className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-3 md:gap-4 lg:gap-6">
          {offer.plans.map((plan, i) => {
            const featured = Boolean(plan.featured);

            return (
              <Reveal
                key={plan.id}
                delay={i * 90}
                className={cn(
                  "flex h-full flex-col rounded-2xl p-6 sm:p-7",
                  featured
                    ? "bg-ink lift-lg text-white md:-mt-6"
                    : "border-hairline lift border border-white bg-white",
                )}
              >
                <h3
                  className={cn(
                    "display-sub text-[1.3rem]",
                    featured && "text-white",
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 max-w-[30ch] text-[0.86rem] leading-relaxed",
                    featured ? "text-white/60" : "text-ink-muted",
                  )}
                >
                  {plan.bestFor}
                </p>

                <div
                  className={cn(
                    "mt-7 flex items-end gap-3 border-t pt-5",
                    featured ? "border-white/15" : "border-hairline",
                  )}
                >
                  <span
                    className={cn(
                      "figure text-[clamp(1.8rem,2.6vw,2.25rem)] leading-none",
                      featured ? "text-white" : "text-ink",
                    )}
                  >
                    {plan.priceFrom}
                  </span>
                  <span
                    className={cn(
                      "pb-[0.15em] font-mono text-[0.66rem] tracking-[0.1em] uppercase",
                      featured ? "text-white/50" : "text-ink-muted",
                    )}
                  >
                    {plan.priceNote}
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-4 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.64rem] tracking-[0.12em] uppercase",
                    featured
                      ? "border-white/20 text-white/70"
                      : "border-hairline text-ink-soft bg-surface",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-[4px] rounded-full",
                      featured ? "bg-accent-warm" : "bg-brand",
                    )}
                  />
                  {plan.timeline}
                </p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-baseline gap-3 text-[0.9rem] leading-snug",
                        featured ? "text-white/80" : "text-ink-soft",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "mt-[0.5em] h-px w-2.5 shrink-0",
                          featured ? "bg-white/40" : "bg-brand/50",
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-1 md:mt-auto">
                  <CtaLink
                    href={plan.cta.href}
                    location={`offer_${plan.id}`}
                    variant={featured ? "invert" : "outline"}
                    size="md"
                    fullWidth
                  >
                    {plan.cta.label}
                  </CtaLink>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={140}
          className="border-hairline mt-8 rounded-2xl border bg-[color-mix(in_oklab,var(--accent-warm-soft)_55%,white)] p-7 sm:p-9"
        >
          <div className="grid gap-5 md:grid-cols-12 md:gap-10">
            <h3 className="md:col-span-4">
              <span className="text-accent-warm-ink eyebrow flex items-center gap-3">
                <ShieldMark />
                {offer.guarantee.title}
              </span>
            </h3>
            <p className="text-ink-soft md:col-span-8 max-w-[62ch] text-[0.98rem] leading-relaxed">
              {offer.guarantee.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ShieldMark() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-[15px] shrink-0">
      <path
        d="M8 1.6 13.2 3.4v4.2c0 3.1-2.1 5.7-5.2 6.8-3.1-1.1-5.2-3.7-5.2-6.8V3.4L8 1.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="m5.7 7.9 1.7 1.7 3-3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
