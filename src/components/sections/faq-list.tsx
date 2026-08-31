import type { Objections } from "@/content/schema";

/**
 * FAQ built on native `<details>` rather than a JS accordion.
 *
 * Shipping zero JavaScript for this section matters on paid traffic, and the
 * shared `name` attribute gives browsers that support it the same
 * one-open-at-a-time behaviour. Where it is unsupported, panels simply toggle
 * independently, which is an acceptable degradation. Answers stay in the DOM
 * either way, so search engines index them.
 */
export function FaqList({ items }: { items: Objections["items"] }) {
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <details
          key={item.question}
          name="faq"
          className="border-hairline group border-t last:border-b"
        >
          <summary className="text-ink flex cursor-pointer list-none items-baseline gap-5 py-5 text-[1rem] leading-snug tracking-[-0.022em] transition-colors [&::-webkit-details-marker]:hidden sm:text-[1.08rem]">
            <span className="text-ink-muted mt-px font-mono text-[0.68rem] tracking-[0.14em] tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="group-hover:text-ink/80 flex-1 text-pretty transition-colors">
              {item.question}
            </span>

            <span
              aria-hidden
              className="text-ink-muted relative mt-[0.45em] size-3 shrink-0"
            >
              <span className="bg-current absolute top-1/2 left-0 h-px w-3 -translate-y-1/2" />
              <span className="bg-current absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>

          {/* 0fr → 1fr animates to the content's natural height without JS. */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="text-ink-soft max-w-[64ch] pr-8 pb-6 pl-[calc(0.68rem+2ch+1.25rem)] text-[0.93rem] leading-relaxed text-pretty">
                {item.answer}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
