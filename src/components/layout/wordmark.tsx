import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Pure-text wordmark: no SVG, no image, nothing to download. The cobalt
 * square is the only brand mark and is decorative.
 */
export function Wordmark({
  condensed = false,
  tone = "ink",
  className,
}: {
  condensed?: boolean;
  tone?: "ink" | "invert";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.45em] font-medium tracking-[-0.045em] transition-[font-size] duration-300",
        condensed ? "text-[1.05rem]" : "text-[1.15rem]",
        tone === "invert" ? "text-white" : "text-ink",
        className,
      )}
    >
      {site.name}
      <span
        aria-hidden
        className={cn(
          "mb-[0.12em] size-[0.3em] rounded-[1px]",
          tone === "invert" ? "bg-white/70" : "bg-brand",
        )}
      />
    </span>
  );
}
