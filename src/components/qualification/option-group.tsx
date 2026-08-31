"use client";

import { useRef, type KeyboardEvent } from "react";

import { OptionCard } from "@/components/qualification/option-card";
import type { Option } from "@/components/qualification/questions";
import { cn } from "@/lib/utils";

type OptionGroupProps = {
  options: Option<string>[];
  /** A single value, or the list of checked values in multi-select mode. */
  value: string | string[] | undefined;
  multiple?: boolean;
  compact?: boolean;
  labelledBy: string;
  describedBy?: string;
  invalid?: boolean;
  onSelect: (value: string) => void;
};

const NEXT_KEYS = ["ArrowDown", "ArrowRight"];
const PREVIOUS_KEYS = ["ArrowUp", "ArrowLeft"];

/**
 * Card-shaped radio group.
 *
 * Arrow keys move focus without committing a choice: selecting here advances
 * the visitor to the next screen, and a change of context must stay an
 * explicit act (Space, Enter or tap). Selection therefore rides on the native
 * button activation, and this component only owns the roving tab index.
 */
export function OptionGroup({
  options,
  value,
  multiple = false,
  compact = false,
  labelledBy,
  describedBy,
  invalid = false,
  onSelect,
}: OptionGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const isSelected = (candidate: string) => selectedValues.includes(candidate);

  const firstTabbable = multiple
    ? -1
    : Math.max(
        0,
        options.findIndex((option) => isSelected(option.value)),
      );

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (![...NEXT_KEYS, ...PREVIOUS_KEYS, "Home", "End"].includes(event.key)) return;

    const cards = Array.from(
      ref.current?.querySelectorAll<HTMLButtonElement>("[data-option]") ?? [],
    );
    if (cards.length === 0) return;

    const current = cards.indexOf(document.activeElement as HTMLButtonElement);
    const last = cards.length - 1;

    let next = current;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else if (NEXT_KEYS.includes(event.key)) next = current < last ? current + 1 : 0;
    else next = current > 0 ? current - 1 : last;

    event.preventDefault();
    cards[next]?.focus();
  }

  return (
    <div
      ref={ref}
      role={multiple ? "group" : "radiogroup"}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        "grid gap-2.5",
        compact && "sm:grid-cols-2",
      )}
    >
      {options.map((option, index) => (
        <OptionCard
          key={option.value}
          option={option}
          index={index}
          multiple={multiple}
          compact={compact}
          selected={isSelected(option.value)}
          tabIndex={multiple ? 0 : index === firstTabbable ? 0 : -1}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
