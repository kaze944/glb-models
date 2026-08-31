import { Reveal } from "@/components/reveal";
import { AmbientOrbs } from "@/components/visual/ambient-orbs";
import { CtaLink } from "@/components/ui/cta";
import { copy } from "@/content/copy";

export function FinalCta() {
  const { finalCta } = copy;

  return (
    <section className="bg-ink relative isolate overflow-hidden text-white">
      <AmbientOrbs
        variant="focus"
        animated
        className="-z-10 opacity-[0.22]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] grid-guides"
      />

      <div className="container-page py-20 sm:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal className="md:col-span-7">
            <h2 className="display-section max-w-[18ch] text-white">
              {finalCta.headline}
            </h2>
            <p className="lede mt-6 max-w-[46ch] text-white/65">
              {finalCta.subheadline}
            </p>
          </Reveal>

          <Reveal
            delay={120}
            className="md:col-span-5 md:border-l md:border-white/12 md:pl-10"
          >
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-3.5 py-1.5 font-mono text-[0.66rem] tracking-[0.13em] text-white/75 uppercase">
              <span aria-hidden className="relative flex size-[6px]">
                <span className="bg-accent-warm absolute inset-0 rounded-full" />
                <span className="bg-accent-warm motion-safe:animate-sheen absolute inset-[-3px] rounded-full opacity-40" />
              </span>
              {finalCta.scarcity}
            </p>

            <div className="mt-6">
              <CtaLink
                href={finalCta.cta.href}
                location="final_cta"
                variant="invert"
                fullWidth
              >
                {finalCta.cta.label}
              </CtaLink>
            </div>

            {finalCta.cta.note ? (
              <p className="mt-4 text-[0.82rem] text-white/50">
                {finalCta.cta.note}
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
