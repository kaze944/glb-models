"use client";

import { useEffect, useState } from "react";

import { CtaLink } from "@/components/ui/cta";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const FORM_ID = site.ctaAnchor.replace("#", "");

/**
 * Mobile-only conversion bar.
 *
 * Two IntersectionObservers instead of a scroll listener: the bar shows once
 * the hero has left the screen and hides again while the form is in view, so
 * it never competes with the thing it points to.
 */
export function StickyCta() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const form = document.getElementById(FORM_ID);
    const observers: IntersectionObserver[] = [];

    const watch = (
      node: HTMLElement | null,
      set: (v: boolean) => void,
      rootMargin: string,
    ) => {
      if (!node) return;
      const observer = new IntersectionObserver(
        ([entry]) => set(entry.isIntersecting),
        { rootMargin },
      );
      observer.observe(node);
      observers.push(observer);
    };

    watch(hero, setHeroVisible, "-45% 0px 0px 0px");
    watch(form, setFormVisible, "0px 0px -35% 0px");

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const shown = !heroVisible && !formVisible;

  return (
    <div
      aria-hidden={!shown}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 lg:hidden",
        "transition-[transform,opacity] duration-400 ease-out",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="border-hairline border-t bg-[color-mix(in_oklab,white_88%,transparent)] backdrop-blur-xl backdrop-saturate-150">
        <div className="container-page flex items-center gap-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <p className="text-ink-soft hidden flex-1 items-center gap-2 text-[0.85rem] leading-tight sm:flex">
            <span
              aria-hidden
              className="bg-accent-warm size-1.5 shrink-0 rounded-full"
            />
            {copy.stickyBar.label}
          </p>
          <CtaLink
            href={copy.stickyBar.cta.href}
            location="sticky_bar"
            size="md"
            className="flex-1 sm:flex-none"
            tabIndex={shown ? undefined : -1}
          >
            {copy.stickyBar.cta.label}
          </CtaLink>
        </div>
      </div>
    </div>
  );
}
