import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/**
 * Mono label preceded by a hairline tick. Repeated at the top of every
 * section, it is the element that ties the page together.
 */
export function Eyebrow({
  children,
  className,
  tone = "brand",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "ink" | "invert";
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-3",
        tone === "brand" && "text-brand",
        tone === "ink" && "text-ink-muted",
        tone === "invert" && "text-white/60",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-6",
          tone === "invert" ? "bg-white/35" : "bg-current opacity-45",
        )}
      />
      {children}
    </span>
  );
}

type SectionIntroProps = {
  eyebrow: string;
  headline: ReactNode;
  intro?: string;
  /**
   * `stack` keeps everything left-aligned in one column; `split` pushes the
   * paragraph to a second column so wide sections do not read as centred.
   */
  layout?: "stack" | "split";
  tone?: "default" | "invert";
  className?: string;
  /** Extra element rendered under the paragraph (counter, link, note). */
  aside?: ReactNode;
};

export function SectionIntro({
  eyebrow,
  headline,
  intro,
  layout = "stack",
  tone = "default",
  className,
  aside,
}: SectionIntroProps) {
  const invert = tone === "invert";

  return (
    <div
      className={cn(
        layout === "split" &&
          "grid gap-x-12 gap-y-6 md:grid-cols-12 md:items-end",
        className,
      )}
    >
      <Reveal className={cn(layout === "split" && "md:col-span-7")}>
        <Eyebrow tone={invert ? "invert" : "brand"}>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "display-section mt-5 max-w-[19ch] md:max-w-[22ch]",
            invert && "text-white",
          )}
        >
          {headline}
        </h2>
      </Reveal>

      {intro || aside ? (
        <Reveal
          delay={90}
          className={cn(
            layout === "split"
              ? "md:col-span-5 md:pb-1.5"
              : "mt-6 max-w-[58ch]",
          )}
        >
          {intro ? (
            <p
              className={cn(
                "lede",
                invert ? "text-white/70" : "text-ink-soft",
                layout === "split" && "max-w-[42ch]",
              )}
            >
              {intro}
            </p>
          ) : null}
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}
