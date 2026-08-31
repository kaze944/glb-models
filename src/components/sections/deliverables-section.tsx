import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/sections/section-intro";
import { copy } from "@/content/copy";

/**
 * Scope-of-work sheet. Reads like a contract annex: a sticky heading column
 * and one hairline row per group, no cards.
 */
export function DeliverablesSection() {
  const { deliverables } = copy;

  return (
    <section className="container-page py-20 sm:py-28">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <Reveal className="md:sticky md:top-28">
            <Eyebrow>{deliverables.eyebrow}</Eyebrow>
            <h2 className="display-section mt-5 max-w-[16ch]">
              {deliverables.headline}
            </h2>
            <div className="rule-left mt-7 w-24" />
            <p className="text-ink-soft lede mt-7 max-w-[38ch]">
              {deliverables.intro}
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          {deliverables.groups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 70}
              className="border-hairline border-t py-7 first:border-t-0 first:pt-0 sm:py-8"
            >
              <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
                <h3 className="flex items-baseline gap-3 sm:col-span-4">
                  <span className="text-ink-muted font-mono text-[0.68rem] tracking-[0.16em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-sub text-[1.15rem] sm:text-[1.2rem]">
                    {group.title}
                  </span>
                </h3>

                <ul className="sm:col-span-8">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-ink-soft flex items-baseline gap-3 py-1.5 text-[0.93rem] leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="bg-brand/45 mt-[0.55em] size-[4px] shrink-0 rotate-45"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
