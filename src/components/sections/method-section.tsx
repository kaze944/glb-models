import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/sections/section-intro";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

/** Descending stagger on wide screens; ignored below md. */
const STAIRCASE = ["md:mt-0", "md:mt-6", "md:mt-12", "md:mt-[4.5rem]"];

export function MethodSection() {
  const { method } = copy;

  return (
    <section
      id="methode"
      className="border-hairline bg-surface-raised/70 scroll-mt-24 border-y py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionIntro
          layout="split"
          eyebrow={method.eyebrow}
          headline={method.headline}
          intro={method.intro}
        />

        <ol className="relative mt-14 grid gap-y-11 sm:mt-20 md:grid-cols-4 md:gap-x-8">
          <span
            aria-hidden
            className="bg-hairline absolute inset-x-0 top-0 hidden h-px md:block"
          />

          {method.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.index}
              delay={i * 90}
              className="relative pl-9 md:pt-9 md:pl-0"
            >
              {/* Mobile rail */}
              {i < method.steps.length - 1 ? (
                <span
                  aria-hidden
                  className="bg-hairline absolute top-4 bottom-[-2.75rem] left-[5px] w-px md:hidden"
                />
              ) : null}

              {/* Node sitting on the rail / rule */}
              <span
                aria-hidden
                className="border-hairline absolute top-[3px] left-0 flex size-[11px] items-center justify-center rounded-full border bg-white md:top-[-5px]"
              >
                <span className="bg-brand size-[4px] rounded-full" />
              </span>

              <div className={cn(STAIRCASE[i] ?? "md:mt-0")}>
                <div className="flex items-baseline gap-3">
                  <span className="text-ink-muted font-mono text-[0.7rem] tracking-[0.18em]">
                    {step.index}
                  </span>
                  <span className="bg-hairline h-px flex-1" />
                  <span className="text-accent-warm-ink font-mono text-[0.66rem] tracking-[0.13em] uppercase">
                    {step.duration}
                  </span>
                </div>

                <h3 className="display-sub mt-4">{step.title}</h3>

                <p className="text-ink-soft mt-3 max-w-[36ch] text-[0.92rem] leading-relaxed">
                  {step.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {step.deliverables.map((item) => (
                    <li
                      key={item}
                      className="border-hairline text-ink-soft rounded-full border bg-white px-2.5 py-1 text-[0.72rem] tracking-[-0.005em]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
