"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CtaLink } from "@/components/ui/cta";
import { Wordmark } from "@/components/layout/wordmark";
import { copy } from "@/content/copy";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Loaded on demand from the header: the Radix dialog primitives behind this
 * sheet are around 20 kB gzipped, and most visitors never open the menu.
 */
export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="border-l-hairline w-[86%] gap-0 bg-white sm:max-w-sm"
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
                    <span className="display-sub text-ink">{link.label}</span>
                  </a>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-hairline mt-auto border-t p-6">
          <SheetClose asChild>
            <CtaLink href={copy.nav.cta.href} location="mobile_menu" fullWidth>
              {copy.nav.cta.label}
            </CtaLink>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
