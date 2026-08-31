import { FaqList } from "@/components/sections/faq-list";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/sections/section-intro";
import { copy } from "@/content/copy";

export function ObjectionsSection() {
  const { objections } = copy;

  return (
    <section
      id="questions"
      className="container-page scroll-mt-24 py-20 sm:py-28"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <Reveal className="md:sticky md:top-28">
            <Eyebrow>{objections.eyebrow}</Eyebrow>
            <h2 className="display-section mt-5 max-w-[16ch]">
              {objections.headline}
            </h2>
            <div className="rule-left mt-7 w-24" />
            <p className="text-ink-soft mt-7 max-w-[36ch] text-[0.95rem] leading-relaxed">
              {objections.intro}
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal>
            <FaqList items={objections.items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
