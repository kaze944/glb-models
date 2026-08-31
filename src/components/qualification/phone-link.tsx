"use client";

import { PhoneIcon } from "lucide-react";

import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Escape hatch for the visitors who will never fill a form.
 * Tracked separately so the phone can be compared with the form in Ads.
 */
export function PhoneLink({
  location,
  className,
}: {
  location: string;
  className?: string;
}) {
  return (
    <a
      href={`tel:${site.contact.phoneHref}`}
      onClick={() => track("phone_click", { location })}
      className={cn(
        "text-ink-soft hover:text-brand inline-flex items-center gap-2 text-[0.875rem] transition-colors",
        className,
      )}
    >
      <PhoneIcon className="size-3.5 shrink-0" strokeWidth={1.7} aria-hidden />
      <span className="tabular-nums">{site.contact.phone}</span>
    </a>
  );
}
