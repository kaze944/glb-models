"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, LoaderCircleIcon, LockIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch, type FieldPath, type FieldErrors } from "react-hook-form";

import { ActivityStep } from "@/components/qualification/activity-step";
import { ContactStep } from "@/components/qualification/contact-step";
import { GlassPanel } from "@/components/qualification/glass-panel";
import { OptionGroup } from "@/components/qualification/option-group";
import { ProgressRail } from "@/components/qualification/progress-rail";
import {
  secondsLeft,
  steps,
  type Step,
} from "@/components/qualification/questions";
import { RewardPanel } from "@/components/qualification/reward-panel";
import { StepHeading } from "@/components/qualification/step-heading";
import { clearDraft, readDraft, writeDraft } from "@/components/qualification/use-draft";
import { ctaVariants } from "@/components/ui/cta";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import {
  leadSchema,
  stepSchemas,
  type Channel,
  type Lead,
  type LeadEstimate,
  type LeadFormValues,
  type LeadResponse,
  type StepId,
} from "@/lib/lead";
import { cn } from "@/lib/utils";

import styles from "./qualification.module.css";

const HEADING_ID = "qualification-step-title";

const EMPTY: LeadFormValues = {
  goal: "",
  situation: "",
  sector: "",
  area: "",
  currentSite: "",
  timeline: "",
  budget: "",
  acquisition: [],
  role: "",
  fullName: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

/** Field names of a screen, read straight off the schema it is validated by. */
function stepFields(id: StepId): (keyof LeadFormValues)[] {
  return Object.keys(stepSchemas[id].shape) as (keyof LeadFormValues)[];
}

type Submitted = { leadId: string; estimate: LeadEstimate; lead: Lead };

export type QualificationFormProps = {
  /**
   * Answer picked on the static first screen before this chunk finished
   * loading. Nothing the visitor taps is ever lost to a code-split boundary.
   */
  initialGoal?: string;
};

export default function QualificationForm({ initialGoal }: QualificationFormProps) {
  const [restored] = useState(() => {
    const saved = readDraft();
    const values: LeadFormValues = { ...EMPTY, ...(saved?.values ?? {}) };
    if (initialGoal) values.goal = initialGoal;

    const savedIndex = Math.min(Math.max(saved?.stepIndex ?? 0, 0), steps.length - 1);

    return {
      values,
      stepIndex: initialGoal ? Math.max(savedIndex, 1) : savedIndex,
      startedAt: saved?.startedAt ?? Date.now(),
      resumed: Boolean(saved),
    };
  });

  const [stepIndex, setStepIndex] = useState(restored.stepIndex);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [phase, setPhase] = useState<"filling" | "sending" | "done">("filling");
  const [submitted, setSubmitted] = useState<Submitted | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LeadFormValues, unknown, Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: restored.values,
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const advanceTimer = useRef<number | null>(null);
  const startedRef = useRef(restored.resumed);
  const mountedRef = useRef(false);

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  // `useWatch` rather than `form.watch()`: same subscription, but a stable
  // reference the React Compiler can reason about.
  const answers = useWatch({ control: form.control }) as LeadFormValues;

  /* -------------------------------------------------------------- */
  /* Draft persistence                                               */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    if (phase === "done") return;

    const timer = window.setTimeout(() => {
      writeDraft({
        values: answers,
        stepIndex,
        startedAt: restored.startedAt,
      });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [answers, stepIndex, phase, restored.startedAt]);

  /* -------------------------------------------------------------- */
  /* Focus, scroll and the virtual keyboard                          */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    viewportRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });

    const card = cardRef.current;
    if (!card) return;

    // Re-centre the card only when it has drifted out of view: the page itself
    // must never jump back to the top between two questions.
    const rect = card.getBoundingClientRect();
    if (rect.top < 64 || rect.top > window.innerHeight * 0.6) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [stepIndex, phase]);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () => {
      const overlap = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop,
      );
      cardRef.current?.style.setProperty("--kb-overlap", `${Math.round(overlap)}px`);
    };

    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);

    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(
    () => () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    },
    [],
  );

  /* -------------------------------------------------------------- */
  /* Navigation                                                      */
  /* -------------------------------------------------------------- */

  const markStarted = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start", { form: "qualification" });
  }, []);

  const goToFirstInvalidStep = useCallback((errors: FieldErrors<LeadFormValues>) => {
    const target = steps.findIndex((candidate) =>
      stepFields(candidate.id).some((field) => Boolean(errors[field])),
    );
    if (target >= 0) {
      setDirection("back");
      setStepIndex(target);
    }
  }, []);

  const send = useCallback(
    async (values: Lead) => {
      setPhase("sending");
      setServerError(null);

      try {
        const response = await fetch(site.leadEndpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            answers: values,
            meta: {
              elapsedMs: Math.max(0, Date.now() - restored.startedAt),
              page: window.location.pathname + window.location.search,
              referrer: document.referrer || undefined,
            },
            trap: trapRef.current?.value ?? "",
          }),
        });

        const payload = (await response.json()) as LeadResponse;

        if (!payload.ok) {
          if (payload.issues) {
            for (const [field, message] of Object.entries(payload.issues)) {
              form.setError(field as FieldPath<LeadFormValues>, {
                type: "server",
                message,
              });
            }
            goToFirstInvalidStep(form.formState.errors);
          }

          setServerError(payload.error);
          setPhase("filling");
          track("form_error", { step: "coordonnees", reason: payload.code });
          return;
        }

        clearDraft();
        setSubmitted({
          leadId: payload.leadId,
          estimate: payload.estimate,
          lead: values,
        });
        setPhase("done");
        track("form_submit", {
          lead_id: payload.leadId,
          score: payload.score.value,
          temperature: payload.score.temperature,
          budget: values.budget,
          timeline: values.timeline,
        });

        // Gives Google Ads a conversion URL to key on, and makes a refresh
        // land on the real /merci page instead of an empty form.
        try {
          window.history.replaceState(null, "", "/merci");
        } catch {
          // Not worth failing a conversion over.
        }
      } catch {
        setServerError(
          "L’envoi n’a pas abouti. Vérifiez votre connexion et réessayez : vos réponses sont conservées.",
        );
        setPhase("filling");
        track("form_error", { step: "coordonnees", reason: "network" });
      }
    },
    [form, goToFirstInvalidStep, restored.startedAt],
  );

  const onInvalid = useCallback(
    (errors: FieldErrors<LeadFormValues>) => {
      track("form_error", { step: "coordonnees", reason: "validation" });
      goToFirstInvalidStep(errors);
    },
    [goToFirstInvalidStep],
  );

  const submitAll = useCallback(
    () => form.handleSubmit(send, onInvalid)(),
    [form, onInvalid, send],
  );

  const advance = useCallback(async () => {
    if (phase === "sending") return;

    const current = steps[stepIndex];
    const valid = await form.trigger(stepFields(current.id), { shouldFocus: true });

    if (!valid) {
      track("form_error", { step: current.id, index: stepIndex + 1 });
      return;
    }

    track("form_step_complete", {
      step: current.id,
      index: stepIndex + 1,
      total: steps.length,
    });

    if (stepIndex < steps.length - 1) {
      setDirection("forward");
      setStepIndex(stepIndex + 1);
      return;
    }

    await submitAll();
  }, [form, phase, stepIndex, submitAll]);

  function goBack() {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    setDirection("back");
    setStepIndex((index) => Math.max(0, index - 1));
  }

  function pickSingle(field: Step & { kind: "single" }, value: string) {
    markStarted();
    form.setValue(field.field, value, { shouldValidate: true, shouldDirty: true });

    // Short enough to feel instant, long enough to see the tick land.
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => void advance(), 260);
  }

  function toggleChannel(value: string) {
    markStarted();
    const current = (form.getValues("acquisition") ?? []) as Channel[];
    const next = current.includes(value as Channel)
      ? current.filter((channel) => channel !== value)
      : [...current, value as Channel];

    form.setValue("acquisition", next, {
      shouldValidate: Boolean(form.formState.errors.acquisition),
      shouldDirty: true,
    });
  }

  /* -------------------------------------------------------------- */
  /* Render                                                          */
  /* -------------------------------------------------------------- */

  if (phase === "done" && submitted) {
    return (
      <GlassPanel ref={cardRef}>
        <RewardPanel
          lead={submitted.lead}
          estimate={submitted.estimate}
          leadId={submitted.leadId}
        />
      </GlassPanel>
    );
  }

  const { errors } = form.formState;
  const choiceError =
    step.kind === "single"
      ? errors[step.field]?.message
      : step.kind === "multi"
        ? errors.acquisition?.message
        : undefined;

  const showPrimary = step.kind !== "single";
  const sending = phase === "sending";

  return (
    <GlassPanel ref={cardRef}>
      <form onSubmit={(event) => {
          event.preventDefault();
          void advance();
        }}
        noValidate
        onChange={markStarted}
      >
        <div className="border-hairline/70 border-b px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
          <ProgressRail
            stepIndex={stepIndex}
            total={steps.length}
            tag={step.tag}
            seconds={secondsLeft(stepIndex)}
          />
        </div>

        <p aria-live="polite" className="sr-only">
          {`Étape ${stepIndex + 1} sur ${steps.length}. ${step.title(answers)}`}
        </p>

        <div ref={viewportRef} className={cn(styles.viewport, "px-5 py-6 sm:px-7")}>
          <div key={step.id} data-direction={direction} className={styles.step}>
            <StepHeading
              id={HEADING_ID}
              ref={headingRef}
              title={step.title(answers)}
              help={step.help(answers)}
            />

            <div className="mt-5">
              {step.kind === "single" ? (
                <OptionGroup
                  options={step.options}
                  value={answers[step.field]}
                  labelledBy={HEADING_ID}
                  describedBy={choiceError ? "q-choice-error" : undefined}
                  invalid={Boolean(choiceError)}
                  onSelect={(value) => pickSingle(step, value)}
                />
              ) : null}

              {step.kind === "multi" ? (
                <OptionGroup
                  multiple
                  compact
                  options={step.options}
                  value={answers.acquisition}
                  labelledBy={HEADING_ID}
                  describedBy={choiceError ? "q-choice-error" : undefined}
                  invalid={Boolean(choiceError)}
                  onSelect={toggleChannel}
                />
              ) : null}

              {step.kind === "activite" ? (
                <ActivityStep
                  form={form}
                  labelledBy={HEADING_ID}
                  onInteract={markStarted}
                />
              ) : null}

              {step.kind === "coordonnees" ? (
                <ContactStep form={form} onInteract={markStarted} />
              ) : null}

              {choiceError ? (
                <p
                  id="q-choice-error"
                  role="alert"
                  className="text-destructive mt-3 text-[0.8125rem] leading-snug"
                >
                  {choiceError}
                </p>
              ) : null}
            </div>
          </div>

          <div className={styles.trap} aria-hidden>
            <label htmlFor="q-fax">Ne remplissez pas ce champ</label>
            <input
              ref={trapRef}
              id="q-fax"
              name="fax"
              type="text"
              tabIndex={-1}
              autoComplete="off"
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
          {serverError ? (
            <p
              role="alert"
              className="border-destructive/25 bg-destructive/5 text-destructive mb-3 rounded-xl border px-3.5 py-2.5 text-[0.8125rem] leading-snug"
            >
              {serverError}{" "}
              <a href={`tel:${site.contact.phoneHref}`} className="underline">
                {site.contact.phone}
              </a>
            </p>
          ) : null}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0 || sending}
              className={cn(
                "text-ink-muted hover:text-ink -ml-2 inline-flex h-11 items-center gap-1.5 rounded-full px-2 text-[0.8125rem] transition-colors",
                "focus-visible:ring-brand/25 focus-visible:ring-4 focus-visible:outline-none",
                stepIndex === 0 && "pointer-events-none opacity-0",
              )}
            >
              <ArrowLeftIcon className="size-3.5" strokeWidth={1.8} aria-hidden />
              Retour
            </button>

            {showPrimary ? (
              <button
                type="submit"
                disabled={sending}
                className={cn(
                  ctaVariants({ variant: "solid", size: "md" }),
                  "h-13 min-w-[9.5rem] px-6 sm:h-12",
                )}
              >
                {sending ? (
                  <>
                    <LoaderCircleIcon
                      className="size-4 animate-spin"
                      strokeWidth={2}
                      aria-hidden
                    />
                    Envoi…
                  </>
                ) : isLast ? (
                  "Recevoir mon analyse"
                ) : (
                  "Continuer"
                )}
              </button>
            ) : (
              <p className="text-ink-muted text-right text-[0.75rem] leading-snug">
                Sélectionnez une réponse
                <span className="hidden sm:inline"> — nous passons à la suite</span>
              </p>
            )}
          </div>

          <p className="text-ink-muted mt-3 flex items-start gap-2 text-[0.75rem] leading-relaxed">
            <LockIcon
              className="mt-px size-3 shrink-0 opacity-70"
              strokeWidth={1.8}
              aria-hidden
            />
            <span>
              {isLast
                ? copy.formSection.privacy
                : "Analyse écrite sous 24 h ouvrées, fourchette de budget et délai compris. Aucun appel commercial non sollicité."}
            </span>
          </p>
        </div>
      </form>
    </GlassPanel>
  );
}
