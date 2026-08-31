import { cn } from "@/lib/utils";

type AmbientOrbsProps = {
  className?: string;
  /** `soft` for page background, `focus` behind a glass panel. */
  variant?: "soft" | "focus";
  /** Slow drift animation. Disabled automatically by prefers-reduced-motion. */
  animated?: boolean;
};

/**
 * Warm/cool colour wash sitting behind glass surfaces.
 *
 * Built from radial gradients rather than blurred solid shapes: a large
 * `filter: blur()` forces an offscreen buffer and repaints on scroll, while
 * gradients are rasterised once and cost nothing to composite.
 */
export function AmbientOrbs({
  className,
  variant = "soft",
  animated = false,
}: AmbientOrbsProps) {
  const intensity = variant === "focus" ? 1 : 0.62;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute -top-[22%] -left-[14%] aspect-square w-[78%] rounded-full",
          animated && "motion-safe:animate-drift",
        )}
        style={{
          background: `radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--accent-warm) ${
            34 * intensity
          }%, transparent), transparent 68%)`,
        }}
      />
      <div
        className={cn(
          "absolute -right-[16%] -bottom-[26%] aspect-square w-[82%] rounded-full",
          animated && "motion-safe:animate-drift [animation-delay:-11s]",
        )}
        style={{
          background: `radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--brand) ${
            32 * intensity
          }%, transparent), transparent 68%)`,
        }}
      />
      <div
        className="absolute top-[18%] right-[6%] aspect-square w-[38%] rounded-full"
        style={{
          background: `radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--brand) ${
            18 * intensity
          }%, transparent), transparent 70%)`,
        }}
      />
    </div>
  );
}
