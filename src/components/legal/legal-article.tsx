import type { LegalDocument } from "@/content/legal";

export function LegalArticle({ document }: { document: LegalDocument }) {
  return (
    <article className="container-page max-w-[46rem] py-16 sm:py-24">
      <p className="eyebrow text-ink-muted">
        Mise à jour du {document.updatedAt}
      </p>

      <h1 className="mt-4 text-[clamp(2rem,5vw,2.9rem)] leading-[1.06]">
        {document.title}
      </h1>

      <p className="text-ink-soft mt-6 text-[1.0625rem] leading-relaxed text-pretty">
        {document.intro}
      </p>

      <div className="rule mt-12" />

      <div className="mt-12 flex flex-col gap-11">
        {document.sections.map((section, index) => (
          <section key={section.heading}>
            <div className="flex items-baseline gap-3">
              <span className="text-ink-muted font-mono text-[0.7rem] tracking-[0.14em]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-[1.375rem] leading-snug">
                {section.heading}
              </h2>
            </div>

            <div className="mt-4 flex flex-col gap-4 pl-[calc(0.7rem+1.4ch)]">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-ink-soft leading-relaxed text-pretty"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets ? (
                <ul className="mt-1 flex flex-col gap-2.5">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet.slice(0, 40)}
                      className="text-ink-soft flex gap-3 leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="bg-hairline mt-[0.7em] h-px w-4 shrink-0"
                      />
                      <span className="text-pretty">{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
