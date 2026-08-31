import { Wordmark } from "@/components/layout/wordmark";
import { copy } from "@/content/copy";
import { site } from "@/content/site";

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-hairline bg-surface-raised border-t">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Wordmark className="text-[1.35rem]" />
            <p className="text-ink-soft mt-5 max-w-[36ch] text-[0.95rem] leading-relaxed">
              {copy.footer.blurb}
            </p>
          </div>

          {copy.footer.columns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="md:col-span-2"
            >
              <h2 className="eyebrow text-ink-muted">{column.title}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <a
                      href={link.href}
                      className="link-sweep text-ink-soft hover:text-ink text-[0.9rem] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="rule mt-14" />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
          <ul className="text-ink-muted flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.66rem] tracking-[0.14em] uppercase">
            {site.serviceAreas.map((area, i) => (
              <li key={area} className="flex items-center gap-3">
                {area}
                {i < site.serviceAreas.length - 1 ? (
                  <span aria-hidden className="bg-hairline h-3 w-px" />
                ) : null}
              </li>
            ))}
          </ul>

          <p className="text-ink-muted font-mono text-[0.66rem] tracking-[0.12em] uppercase">
            © {YEAR} {site.legal.company} — {copy.footer.legalNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
