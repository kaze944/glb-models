"use client";

import type { CSSProperties } from "react";

import type { Option } from "@/components/qualification/questions";
import { cn } from "@/lib/utils";

import styles from "./qualification.module.css";

type OptionCardProps = {
  option: Option<string>;
  selected: boolean;
  /** Stagger position, drives the entrance delay. */
  index: number;
  /** Multi-select renders a square marker and keeps the step open. */
  multiple?: boolean;
  /** Dense two-column variant used for sectors and channels. */
  compact?: boolean;
  /** Roving tabindex: only one card of a radiogroup is in the tab order. */
  tabIndex?: number;
  onSelect: (value: string) => void;
};

export function OptionCard({
  option,
  selected,
  index,
  multiple = false,
  compact = false,
  tabIndex,
  onSelect,
}: OptionCardProps) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      role={multiple ? "checkbox" : "radio"}
      aria-checked={selected}
      data-selected={selected}
      data-option
      tabIndex={tabIndex}
      onClick={() => onSelect(option.value)}
      style={{ "--i": index } as CSSProperties}
      className={cn(
        styles.option,
        styles.stagger,
        "group relative flex w-full items-center gap-3.5 rounded-2xl border bg-clip-padding text-left",
        "focus-visible:ring-brand/25 focus-visible:border-brand/50 focus-visible:ring-4 focus-visible:outline-none",
        // Both variants stay above the 56 px thumb target on mobile.
        compact ? "min-h-14 px-3.5 py-3" : "min-h-17 px-4 py-3.5",
        selected
          ? "border-brand/45 bg-brand-soft/60 shadow-[0_14px_32px_-20px_var(--brand)]"
          : "border-hairline hover:border-brand/30 bg-white/60 hover:bg-white/90 hover:shadow-[0_12px_28px_-20px_rgb(16_24_40_/_0.45)]",
      )}
    >
      {Icon ? (
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-xl border transition-colors duration-200",
            compact ? "size-8" : "size-10",
            selected
              ? "border-brand/25 text-brand bg-white"
              : "border-hairline/70 text-ink-muted group-hover:text-brand bg-white/70",
          )}
        >
          <Icon
            className={compact ? "size-4" : "size-[1.15rem]"}
            strokeWidth={1.6}
            aria-hidden
          />
        </span>
      ) : null}

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "text-ink block leading-snug font-medium tracking-[-0.012em]",
            compact ? "text-[0.875rem]" : "text-[0.9375rem]",
          )}
        >
          {option.label}
        </span>
        {option.hint ? (
          <span className="text-ink-muted mt-0.5 block text-[0.8125rem] leading-snug text-pretty">
            {option.hint}
          </span>
        ) : null}
      </span>

      <span
        aria-hidden
        className={cn(
          "grid size-5 shrink-0 place-items-center border transition-colors duration-200",
          multiple ? "rounded-[0.4rem]" : "rounded-full",
          selected
            ? "border-brand bg-brand text-white"
            : "border-hairline group-hover:border-brand/40 bg-white/70",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3"
        >
          <path className={styles.tick} d="M5 12.5 10 17.5 19 7.5" />
        </svg>
      </span>
    </button>
  );
}
