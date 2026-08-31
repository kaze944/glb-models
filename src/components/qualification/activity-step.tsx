"use client";

import { useWatch } from "react-hook-form";

import {
  Field,
  inputClass,
  type QualificationFormApi,
} from "@/components/qualification/fields";
import { OptionGroup } from "@/components/qualification/option-group";
import { hasCurrentSite, sectorOptions } from "@/components/qualification/questions";
import { site } from "@/content/site";
import type { Situation } from "@/lib/lead";

type ActivityStepProps = {
  form: QualificationFormApi;
  /** Id of the step heading, so the sector grid is announced with a name. */
  labelledBy: string;
  onInteract: () => void;
};

const AREAS_LIST_ID = "kb-service-areas";

/**
 * Sector, city and — only when there is one — the current address.
 *
 * The city is the field the whole geotargeted ad account hangs on, so it gets
 * suggestions without ever being restricted to them: a plumber in Vannes must
 * be able to type Vannes.
 */
export function ActivityStep({ form, labelledBy, onInteract }: ActivityStepProps) {
  const { errors } = form.formState;
  const sector = useWatch({ control: form.control, name: "sector" });
  const situation = useWatch({ control: form.control, name: "situation" }) as
    | Situation
    | undefined;

  return (
    <div className="space-y-5">
      <OptionGroup
        options={sectorOptions}
        value={sector}
        compact
        labelledBy={labelledBy}
        describedBy={errors.sector ? "q-sector-error" : undefined}
        invalid={Boolean(errors.sector)}
        onSelect={(value) => {
          onInteract();
          form.setValue("sector", value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      />

      {errors.sector?.message ? (
        <p
          id="q-sector-error"
          role="alert"
          className="text-destructive text-[0.8125rem] leading-snug"
        >
          {errors.sector.message}
        </p>
      ) : null}

      <Field
        id="q-area"
        label="Ville ou zone d’intervention"
        error={errors.area?.message}
      >
        <input
          {...form.register("area", { onChange: onInteract })}
          id="q-area"
          type="text"
          list={AREAS_LIST_ID}
          placeholder="Lyon, Bruxelles, tout le Grand Est…"
          autoComplete="address-level2"
          enterKeyHint="next"
          autoCapitalize="words"
          spellCheck={false}
          aria-invalid={Boolean(errors.area)}
          aria-describedby={errors.area ? "q-area-error" : undefined}
          className={inputClass}
        />
        <datalist id={AREAS_LIST_ID}>
          {site.serviceAreas.map((area) => (
            <option key={area} value={area} />
          ))}
        </datalist>
      </Field>

      {hasCurrentSite(situation) ? (
        <Field
          id="q-current-site"
          label="Votre site actuel"
          note="nous irons le regarder"
          error={errors.currentSite?.message}
        >
          <input
            {...form.register("currentSite", { onChange: onInteract })}
            id="q-current-site"
            type="text"
            inputMode="url"
            placeholder="monentreprise.fr"
            autoComplete="url"
            enterKeyHint="next"
            autoCapitalize="none"
            spellCheck={false}
            aria-invalid={Boolean(errors.currentSite)}
            aria-describedby={errors.currentSite ? "q-current-site-error" : undefined}
            className={inputClass}
          />
        </Field>
      ) : null}
    </div>
  );
}
