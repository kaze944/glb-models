import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Wordmark } from "@/components/layout/wordmark";

/**
 * Header for secondary pages. The main header navigates through in-page
 * anchors, which do not resolve outside the landing page.
 */
export function MinimalHeader() {
  return (
    <header className="border-hairline border-b">
      <div className="container-page flex h-[68px] items-center justify-between gap-6">
        <Link href="/" className="-m-2 rounded-md p-2" aria-label="Accueil">
          <Wordmark />
        </Link>

        <Link
          href="/"
          className="text-ink-soft hover:text-ink inline-flex items-center gap-2 text-[0.9rem] transition-colors"
        >
          <ArrowLeftIcon className="size-4" strokeWidth={1.5} />
          Retour au site
        </Link>
      </div>
    </header>
  );
}
