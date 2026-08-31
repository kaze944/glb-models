"use client";

import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { Lead, LeadFormValues } from "@/lib/lead";
import { cn } from "@/lib/utils";

import styles from "./qualification.module.css";

/** The form instance the step components receive, already typed end to end. */
export type QualificationFormApi = UseFormReturn<LeadFormValues, unknown, Lead>;

type FieldProps = {
  id: string;
  label: string;
  /** Rendered as a muted suffix next to the label. */
  note?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function Field({ id, label, note, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="text-ink-soft flex items-baseline gap-2 font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase"
      >
        {label}
        {note ? (
          <span className="text-ink-muted/80 tracking-[0.06em] normal-case">
            {note}
          </span>
        ) : null}
      </label>

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-destructive text-[0.8125rem] leading-snug"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Shared look for inputs and textareas: 52 px tall, 16 px text, no iOS zoom. */
export const controlClass = cn(
  styles.field,
  "border-hairline text-ink placeholder:text-ink-muted/65 w-full rounded-xl border bg-white/70 px-3.5 text-[1rem] leading-normal tracking-[-0.01em]",
);

export const inputClass = cn(controlClass, "h-13");

export const textareaClass = cn(controlClass, "min-h-22 resize-none py-3");
