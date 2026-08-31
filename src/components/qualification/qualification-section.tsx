import { copy } from "@/content/copy";
import { site } from "@/content/site";

/**
 * Conversion section wrapping the multi-step qualification form.
 * The anchor id is the target of every call to action on the page.
 */
export function QualificationSection() {
  return (
    <section
      id={site.ctaAnchor.replace("#", "")}
      className="container-page scroll-mt-24 py-24"
    >
      <p className="eyebrow text-brand">{copy.formSection.eyebrow}</p>
      <h2 className="mt-4 text-4xl">{copy.formSection.headline}</h2>
      <p className="text-ink-soft mt-4 max-w-xl">{copy.formSection.intro}</p>
    </section>
  );
}
