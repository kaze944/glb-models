"use client";

import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const ctaVariants = cva(
  "group/cta relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[-0.012em] whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out outline-none select-none focus-visible:ring-4 focus-visible:ring-brand/25 active:translate-y-px",
  {
    variants: {
      variant: {
        solid:
          "bg-brand-strong text-white shadow-[0_1px_1px_rgb(16_24_40/0.06),0_12px_28px_-14px_color-mix(in_oklab,var(--brand)_70%,transparent)] hover:bg-[color-mix(in_oklab,var(--brand-strong)_88%,black)] hover:shadow-[0_1px_1px_rgb(16_24_40/0.06),0_18px_38px_-16px_color-mix(in_oklab,var(--brand)_75%,transparent)]",
        outline:
          "border border-hairline bg-surface/70 text-ink hover:border-[color-mix(in_oklab,var(--ink)_28%,transparent)] hover:bg-surface",
        invert:
          "bg-white text-ink hover:bg-[color-mix(in_oklab,white_92%,var(--brand))]",
        quiet:
          "border border-white/25 text-white hover:border-white/60 hover:bg-white/10 focus-visible:ring-white/30",
      },
      size: {
        lg: "h-14 px-7 text-[0.975rem] sm:h-[3.25rem]",
        md: "h-12 px-5 text-[0.9rem]",
        sm: "h-11 px-4 text-[0.85rem]",
      },
    },
    defaultVariants: { variant: "solid", size: "lg" },
  },
);

type CtaLinkProps = VariantProps<typeof ctaVariants> & {
  href: string;
  /** Reported to analytics so we can rank CTAs by placement. */
  location: string;
  children: ReactNode;
  className?: string;
  /** Hides the trailing arrow for quieter, secondary actions. */
  arrow?: boolean;
  fullWidth?: boolean;
  tabIndex?: number;
};

export function CtaLink({
  href,
  location,
  children,
  className,
  variant,
  size,
  arrow = true,
  fullWidth = false,
  tabIndex,
}: CtaLinkProps) {
  return (
    <a
      href={href}
      data-cta={location}
      tabIndex={tabIndex}
      onClick={() => track("cta_click", { location })}
      className={cn(
        ctaVariants({ variant, size }),
        fullWidth && "w-full",
        className,
      )}
    >
      <span>{children}</span>
      {arrow ? (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="size-[0.95em] translate-x-0 transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
        >
          <path
            d="M2.5 8h10.2M9 4.2 12.8 8 9 11.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </a>
  );
}

export { ctaVariants };
