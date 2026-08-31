"use client";

import type { LeadFormValues } from "@/lib/lead";

/**
 * Answers survive a refresh, a mis-tapped back button and a phone call in the
 * middle of the form.
 *
 * `sessionStorage` rather than `localStorage` on purpose: the draft belongs to
 * this visit. Coming back a week later with half-stale answers pre-filled
 * would be worse than starting over, and it keeps the retention story simple
 * for the privacy notice.
 */

const KEY = "kobalt.qualification.v1";
/** Bumped whenever the question set changes, so old shapes are discarded. */
const VERSION = 1;

export type SavedDraft = {
  version: number;
  values: Partial<LeadFormValues>;
  stepIndex: number;
  /** First interaction, used for the anti-spam timing check. */
  startedAt: number;
};

export function readDraft(): SavedDraft | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SavedDraft;
    if (parsed?.version !== VERSION || typeof parsed.values !== "object") return null;

    return parsed;
  } catch {
    // Private browsing, quota, corrupted JSON: never block the form.
    return null;
  }
}

export function writeDraft(draft: Omit<SavedDraft, "version">): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(KEY, JSON.stringify({ version: VERSION, ...draft }));
  } catch {
    // Storage refused: the form keeps working, it just stops remembering.
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    // Nothing to recover from.
  }
}
