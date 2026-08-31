import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
            <Accordion type="single" collapsible className="w-full">
              {objections.items.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={`q-${i}`}
                  className="border-hairline border-t not-last:border-b-0 last:border-b"
                >
                  <AccordionTrigger className="text-ink items-baseline gap-6 py-5 text-left text-[1rem] leading-snug font-normal tracking-[-0.022em] hover:no-underline sm:text-[1.08rem] **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:translate-y-1">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-ink-soft max-w-[64ch] pr-8 pb-6 text-[0.93rem] leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
