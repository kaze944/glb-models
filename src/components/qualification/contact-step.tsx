"use client";

import { useWatch } from "react-hook-form";

import {
  Field,
  inputClass,
  textareaClass,
  type QualificationFormApi,
} from "@/components/qualification/fields";
import { OptionGroup } from "@/components/qualification/option-group";
import { roleOptions } from "@/components/qualification/questions";

type ContactStepProps = {
  form: QualificationFormApi;
  onInteract: () => void;
};

/**
 * Last screen: who you are, and the one open question.
 *
 * The free-text box is not a formality — it is where a prospect explains the
 * thing no dropdown could have captured, and it is the single best predictor
 * of a project worth calling back the same morning. Hence the placeholder that
 * asks for something specific rather than “votre message”.
 */
export function ContactStep({ form, onInteract }: ContactStepProps) {
  const { errors } = form.formState;
  const role = useWatch({ control: form.control, name: "role" });

  return (
    <div className="space-y-5">
      <div>
        <p
          id="q-role-label"
          className="text-ink-soft mb-2 font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase"
        >
          Sur ce projet, vous…
        </p>
        <OptionGroup
          options={roleOptions}
          value={role}
          compact
          labelledBy="q-role-label"
          describedBy={errors.role ? "q-role-error" : undefined}
          invalid={Boolean(errors.role)}
          onSelect={(value) => {
            onInteract();
            form.setValue("role", value, { shouldValidate: true, shouldDirty: true });
          }}
        />
        {errors.role?.message ? (
          <p
            id="q-role-error"
            role="alert"
            className="text-destructive mt-2 text-[0.8125rem] leading-snug"
          >
            {errors.role.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="q-fullname" label="Prénom et nom" error={errors.fullName?.message}>
          <input
            {...form.register("fullName", { onChange: onInteract })}
            id="q-fullname"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            autoCapitalize="words"
            placeholder="Camille Ferrand"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "q-fullname-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field
          id="q-company"
          label="Entreprise"
          note="facultatif"
          error={errors.company?.message}
        >
          <input
            {...form.register("company", { onChange: onInteract })}
            id="q-company"
            type="text"
            autoComplete="organization"
            enterKeyHint="next"
            autoCapitalize="words"
            placeholder="Ferrand & Fils"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "q-company-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field id="q-email" label="E-mail" error={errors.email?.message}>
          <input
            {...form.register("email", { onChange: onInteract })}
            id="q-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            enterKeyHint="next"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="camille@ferrand.fr"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "q-email-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field id="q-phone" label="Téléphone" error={errors.phone?.message}>
          <input
            {...form.register("phone", { onChange: onInteract })}
            id="q-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            placeholder="06 12 34 56 78"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "q-phone-error" : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <Field
        id="q-message"
        label="Quelque chose à ajouter"
        note="facultatif"
        error={errors.message?.message}
      >
        <textarea
          {...form.register("message", { onChange: onInteract })}
          id="q-message"
          rows={3}
          enterKeyHint="enter"
          placeholder="Un concurrent dont le site vous plaît, une contrainte de délai, une page qui vous pose problème…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "q-message-error" : undefined}
          className={textareaClass}
        />
      </Field>
    </div>
  );
}
