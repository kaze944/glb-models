import type { ReactNode, Ref } from "react";

import { cn } from "@/lib/utils";

import styles from "./qualification.module.css";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
};

/**
 * The frosted card itself.
 *
 * `.glass-strong` carries the blur and the inset highlight; `styles.panel`
 * adds the gradient hairline along the top edge and the opaque fallback for
 * browsers without `backdrop-filter` (Firefox with the feature turned off,
 * older Android WebViews) — a translucent panel that does not blur is an
 * unreadable panel.
 */
export function GlassPanel({ children, className, ref }: GlassPanelProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "glass-strong relative isolate overflow-hidden rounded-[1.75rem]",
        styles.panel,
        className,
      )}
    >
      {children}
    </div>
  );
}
