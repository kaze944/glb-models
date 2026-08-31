import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";

import { copy } from "@/content/copy";
import { site } from "@/content/site";

import "./globals.css";

const display = Instrument_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const mono = Geist_Mono({
  variable: "--font-mono-ui",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: copy.meta.title,
    template: `%s — ${site.name}`,
  },
  description: copy.meta.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: copy.meta.ogTitle,
    description: copy.meta.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.ogTitle,
    description: copy.meta.ogDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        {/* Scroll reveals are progressive: without JS everything stays visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="bg-background text-foreground flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#projet"
          className="focus-visible:ring-brand/30 sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-white focus-visible:px-5 focus-visible:py-3 focus-visible:text-sm focus-visible:shadow-lg focus-visible:ring-4"
        >
          {copy.nav.cta.label}
        </a>
        {children}
      </body>
    </html>
  );
}
