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

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
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
