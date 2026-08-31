import { Reveal } from "@/components/reveal";
import { SectionIntro } from "@/components/sections/section-intro";
import { copy } from "@/content/copy";

/**
 * Editorial ledger rather than a card grid: one hairline row per symptom,
 * with the business cost set opposite it.
 */
export function ProblemSection() {
  const { problem } = copy;

  return (
    <section className="container-page py-20 sm:py-28">
      <SectionIntro
        layout="split"
        eyebrow={problem.eyebrow}
        headline={problem.headline}
        intro={problem.intro}
      />

      <ul className="mt-14 sm:mt-16">
        {problem.items.map((item, i) => (
          <Reveal
            as="li"
            key={item.symptom}
            delay={i * 70}
            className="border-hairline group/row hover:bg-surface-raised/70 border-t transition-colors last:border-b"
          >
            <div className="grid gap-x-8 gap-y-3 py-6 md:grid-cols-12 md:items-baseline md:py-7">
              <span className="text-ink-muted group-hover/row:text-brand col-span-1 font-mono text-[0.7rem] tracking-[0.16em] transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              <p className="text-ink col-span-6 max-w-[34ch] text-[1.08rem] leading-snug tracking-[-0.025em] sm:text-[1.18rem]">
                {item.symptom}
              </p>

              <p className="text-ink-soft col-span-5 flex max-w-[38ch] items-baseline gap-3 text-[0.93rem] leading-relaxed">
                <span
                  aria-hidden
                  className="text-accent-warm-ink shrink-0 font-mono text-[0.8rem]"
                >
                  &rarr;
                </span>
                {item.cost}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120} className="mt-14 flex md:justify-end">
        <p className="border-brand text-ink max-w-[52ch] border-l-2 pl-6 text-[1.15rem] leading-[1.45] tracking-[-0.03em] sm:text-[1.4rem] md:pl-8">
          {problem.bridge}
        </p>
      </Reveal>
    </section>
  );
}
