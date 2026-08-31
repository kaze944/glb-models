"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Distance before the element enters the viewport, e.g. "-12% 0px". */
  rootMargin?: string;
  threshold?: number;
  /** Stop observing after the first intersection. Default: true. */
  once?: boolean;
};

/**
 * Minimal scroll-reveal primitive. Replaces an animation library: one
 * IntersectionObserver per element, the transition itself lives in CSS.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.15,
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Very old browsers and some in-app webviews: show everything rather
    // than leaving the page blank. Deferred so the effect stays a
    // subscription rather than a synchronous render trigger.
    if (typeof IntersectionObserver === "undefined") {
      const id = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}
