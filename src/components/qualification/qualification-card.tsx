"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";

import { FormSkeleton } from "@/components/qualification/form-skeleton";
import { readDraft } from "@/components/qualification/use-draft";
import type { QualificationFormProps } from "@/components/qualification/qualification-form";

/**
 * Splits the conversion panel in two.
 *
 * What ships with the page is the first question and nothing else. The
 * validated form — `react-hook-form`, `zod`, the schema, the seven screens —
 * lives behind a dynamic import that is fetched as soon as the section comes
 * within a screen and a half of the viewport, so it is already in memory by
 * the time anyone taps. Tapping before then simply carries the answer over.
 */
export function QualificationCard() {
  const [Form, setForm] = useState<ComponentType<QualificationFormProps> | null>(null);
  const [pickedGoal, setPickedGoal] = useState<string | undefined>();
  const hostRef = useRef<HTMLDivElement>(null);
  const requested = useRef(false);

  const load = useCallback(() => {
    if (requested.current) return;
    requested.current = true;

    void import("@/components/qualification/qualification-form").then((module) =>
      setForm(() => module.default),
    );
  }, []);

  useEffect(() => {
    // A draft means this visit already started the form: bring it back at once.
    if (readDraft()) {
      load();
      return;
    }

    const node = hostRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      load();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        load();
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [load]);

  if (Form) return <Form initialGoal={pickedGoal} />;

  return (
    <div ref={hostRef}>
      <FormSkeleton
        selected={pickedGoal}
        onPick={(value) => {
          setPickedGoal(value);
          load();
        }}
      />
    </div>
  );
}
