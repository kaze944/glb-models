"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CtaLink } from "@/components/ui/cta";
import { Wordmark } from "@/components/layout/wordmark";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

/**
 * Sticky header that condenses once the page is scrolled.
 *
 * The scroll handler is passive and only commits state when the threshold is
 * actually crossed, so it costs a comparison per frame and no re-render.
 */
export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Ouvrir le menu"
              className="border-hairline text-ink hover:border-ink/25 inline-flex size-11 items-center justify-center rounded-full border bg-white/70 transition-colors lg:hidden"
            >
              <MenuIcon className="size-[18px]" strokeWidth={1.5} />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[86%] gap-0 border-l-hairline bg-white sm:max-w-sm"
            >
              <SheetHeader className="px-6 pt-6 pb-2">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Wordmark />
              </SheetHeader>

              <nav aria-label="Navigation mobile" className="px-6 pt-4">
                <ul className="flex flex-col">
                  {copy.nav.links.map((link, i) => (
                    <li key={link.href} className="border-hairline border-t">
                      <SheetClose asChild>
                        <a
                          href={link.href}
                          className="group/item flex items-baseline gap-4 py-4"
                        >
                          <span className="text-ink-muted font-mono text-[0.7rem] tracking-[0.14em]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="display-sub text-ink">
                            {link.label}
                          </span>
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto border-t border-hairline p-6">
                <SheetClose asChild>
                  <CtaLink
                    href={copy.nav.cta.href}
                    location="mobile_menu"
                    fullWidth
                  >
                    {copy.nav.cta.label}
                  </CtaLink>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
