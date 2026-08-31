"use client";

import { LockIcon } from "lucide-react";

import { GlassPanel } from "@/components/qualification/glass-panel";
import { OptionGroup } from "@/components/qualification/option-group";
import {
  firstStep,
  secondsLeft,
  steps,
} from "@/components/qualification/questions";
import { ProgressRail } from "@/components/qualification/progress-rail";
import { StepHeading } from "@/components/qualification/step-heading";
import { cn } from "@/lib/utils";

import styles from "./qualification.module.css";

const HEADING_ID = "qualification-step-title";

type FormSkeletonProps = {
  /** Set once the visitor has tapped, while the form chunk is still in flight. */
  selected?: string;
  onPick?: (value: string) => void;
};

/**
 * The first screen, rendered server-side and shipped without `zod`,
 * `react-hook-form` or any validation code.
 *
 * It is not a grey placeholder: it is the real question, with real options.
 * The heavy form is fetched while the visitor reads it, and a tap made before
 * the chunk lands is replayed into the form as its first answer.
 */
export function FormSkeleton({ selected, onPick }: FormSkeletonProps) {
  return (
    <GlassPanel>
      <div className="border-hairline/70 border-b px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
        <ProgressRail
          stepIndex={0}
          total={steps.length}
          tag={firstStep.tag}
          seconds={secondsLeft(0)}
        />
      </div>

      <div className={cn(styles.viewport, "px-5 py-6 sm:px-7")}>
        <StepHeading
          id={HEADING_ID}
          title={firstStep.title({})}
          help={firstStep.help({})}
        />

        <div className="mt-5">
          <OptionGroup
            options={firstStep.options}
            value={selected}
            labelledBy={HEADING_ID}
            onSelect={(value) => onPick?.(value)}
          />
        </div>
      </div>

      <div aria-hidden className={styles.fade} />

      <div
        className={cn(
          styles.actionBar,
          "border-hairline/70 border-t px-5 pt-3.5 sm:px-7",
        )}
      >
        <div className="flex h-11 items-center justify-end">
          <p className="text-ink-muted text-right text-[0.75rem] leading-snug">
            Sélectionnez une réponse
            <span className="hidden sm:inline"> — nous passons à la suite</span>
          </p>
        </div>

        <p className="text-ink-muted mt-3 flex items-start gap-2 text-[0.75rem] leading-relaxed">
          <LockIcon
            className="mt-px size-3 shrink-0 opacity-70"
            strokeWidth={1.8}
            aria-hidden
          />
          <span>
            Analyse écrite sous 24 h ouvrées, fourchette de budget et délai
            compris. Aucun appel commercial non sollicité.
          </span>
        </p>
      </div>
    </GlassPanel>
  );
}
