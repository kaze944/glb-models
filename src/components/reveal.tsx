"use client";

import type { ElementType, ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  as?: ElementType;
};

/**
 * Wraps children in a scroll-triggered fade-and-rise. Content is present in
 * the server-rendered HTML, so it stays visible and indexable without JS.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-inview={inView ? "true" : "false"}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as never) : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
