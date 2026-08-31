"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MenuIcon } from "lucide-react";

import { CtaLink } from "@/components/ui/cta";
import { Wordmark } from "@/components/layout/wordmark";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

const MobileMenu = dynamic(
  () => import("@/components/layout/mobile-menu").then((m) => m.MobileMenu),
  { ssr: false },
);

/**
 * Sticky header that condenses once the page is scrolled.
 *
 * The scroll handler is passive and only commits state when the threshold is
 * actually crossed, so it costs a comparison per frame and no re-render.
 */
export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);

  // Warms the chunk on the first hint of intent so the sheet opens instantly.
  const primeMenu = useCallback(() => setMenuLoaded(true), []);

  useEffect(() => {
    let last = false;
    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next !== last) {
        last = next;
        setCondensed(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-condensed={condensed}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        condensed
          ? "border-b border-hairline bg-[color-mix(in_oklab,white_82%,transparent)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-6 transition-[height] duration-300",
          condensed ? "h-[60px]" : "h-[76px]",
        )}
      >
        <a
          href="#top"
          className="-m-2 rounded-md p-2"
          aria-label={`${copy.nav.cta.label} — accueil`}
        >
          <Wordmark condensed={condensed} />
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {copy.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-sweep text-ink-soft hover:text-ink text-[0.9rem] tracking-[-0.01em] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink
            href={copy.nav.cta.href}
            location="header"
            size="sm"
            arrow={false}
            className="hidden sm:inline-flex"
          >
            {copy.nav.cta.label}
          </CtaLink>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            onPointerEnter={primeMenu}
            onTouchStart={primeMenu}
            onFocus={primeMenu}
            onClick={() => {
              setMenuLoaded(true);
              setMenuOpen(true);
            }}
            className="border-hairline text-ink hover:border-ink/25 inline-flex size-11 items-center justify-center rounded-full border bg-white/70 transition-colors lg:hidden"
          >
            <MenuIcon className="size-[18px]" strokeWidth={1.5} />
          </button>

          {menuLoaded ? (
            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
          ) : null}
        </div>
      </div>
    </header>
  );
}
