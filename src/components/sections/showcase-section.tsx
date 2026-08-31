import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/sections/section-intro";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

/**
 * The proof block. Numbers are the loudest thing on the page here: mono,
 * tabular, oversized, with the headline metric in cobalt.
 */
export function ShowcaseSection() {
  const { showcase } = copy;

  return (
    <section id="realisations" className="container-page scroll-mt-24 py-20 sm:py-28">
      <SectionIntro
        layout="split"
        eyebrow={showcase.eyebrow}
        headline={showcase.headline}
        intro={showcase.intro}
      />

      <div className="mt-14 sm:mt-20">
        {showcase.cases.map((item, i) => {
          const flipped = i % 2 === 1;

          return (
            <Reveal
              key={item.client}
              className="border-hairline border-t py-10 last:border-b sm:py-12"
            >
              <article className="grid gap-8 md:grid-cols-12 md:gap-10">
                <header
                  className={cn(
                    "md:col-span-4",
                    flipped ? "md:order-2 md:col-start-9" : "md:order-1",
                  )}
                >
                  <span className="text-ink-muted font-mono text-[0.7rem] tracking-[0.18em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-sub mt-3">{item.client}</h3>
                  <p className="text-ink-muted mt-3 font-mono text-[0.66rem] tracking-[0.13em] uppercase">
                    {item.sector}
                    <span aria-hidden className="mx-2 opacity-40">
                      /
                    </span>
                    {item.city}
                  </p>
                </header>

                <div
                  className={cn(
                    "md:col-span-7",
                    flipped
                      ? "md:order-1 md:col-start-1"
                      : "md:order-2 md:col-start-6",
                  )}
                >
                  <p className="text-ink-soft max-w-[52ch] text-[0.92rem] leading-relaxed">
                    {item.challenge}
                  </p>
                  <p className="text-ink mt-4 max-w-[48ch] text-[1.05rem] leading-snug tracking-[-0.025em] sm:text-[1.15rem]">
                    {item.outcome}
                  </p>

                  <dl className="border-hairline mt-8 grid grid-cols-3 border-t">
                    {item.metrics.map((metric, m) => (
                      <div
                        key={metric.label}
                        className={cn(
                          "border-hairline flex flex-col gap-2 pt-5",
                          m > 0 && "border-l pl-4 sm:pl-6",
                          m < item.metrics.length - 1 && "pr-3",
                        )}
                      >
                        <dt className="sr-only">{metric.label}</dt>
                        <dd className="contents">
                          <span
                            className={cn(
                              "figure text-[clamp(1.55rem,3vw,2.5rem)] leading-none",
                              m === 0 ? "text-brand" : "text-ink",
                            )}
                          >
                            {metric.value}
                          </span>
                          <span className="text-ink-muted font-mono text-[0.62rem] leading-[1.5] tracking-[0.11em] uppercase">
                            {metric.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <p className="text-ink-muted mt-6 max-w-[62ch] font-mono text-[0.66rem] leading-relaxed tracking-[0.06em]">
        {showcase.disclaimer}
      </p>
    </section>
  );
}
