import { cn } from "@/lib/utils";

import styles from "./qualification.module.css";

type ProgressRailProps = {
  /** Zero-based index of the screen on display. */
  stepIndex: number;
  total: number;
  /** Short name of the current screen, e.g. “Enveloppe”. */
  tag: string;
  /** Rough time left, already rounded. */
  seconds: number;
};

/**
 * Step counter, remaining time and the bar itself.
 *
 * The bar never starts empty: an untouched form already shows a sliver of
 * progress, which reads as “this is short” rather than “this is a form”.
 */
export function ProgressRail({ stepIndex, total, tag, seconds }: ProgressRailProps) {
  const ratio = (stepIndex + 0.35) / total;
  const percent = Math.round(ratio * 100);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-ink-soft font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
          <span className="text-brand tabular-nums">
            {String(stepIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-ink-muted/60 mx-1.5">/</span>
          <span className="text-ink-muted tabular-nums">
            {String(total).padStart(2, "0")}
          </span>
          <span className="text-hairline mx-2.5" aria-hidden>
            —
          </span>
          <span className="text-ink-soft normal-case tracking-[0.04em]">{tag}</span>
        </p>

        <p className="text-ink-muted shrink-0 text-[0.75rem] tabular-nums">
          {seconds} s restantes
        </p>
      </div>

      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={stepIndex + 1}
        aria-valuetext={`Étape ${stepIndex + 1} sur ${total} : ${tag}`}
        className="bg-hairline/90 mt-3 h-[3px] w-full overflow-hidden rounded-full"
      >
        <div
          className={cn(styles.railFill, "h-full rounded-full")}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
