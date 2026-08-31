/**
 * Single source of truth for everything brand- and deployment-specific.
 * Change these values and the whole landing page follows.
 */

export const site = {
  name: "Kobalt",
  legalName: "Kobalt Studio",
  tagline: "Studio de création de sites web pour entrepreneurs",
  /** Used for canonical URLs, Open Graph and JSON-LD. Override in Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kobalt.studio",
  locale: "fr_FR",

  contact: {
    email: "contact@kobalt.studio",
    phone: "+33 6 00 00 00 00",
    /** Digits only, international format, for tel: and WhatsApp links. */
    phoneHref: "+33600000000",
  },

  /** Where the qualification form posts. Swap for your CRM / webhook. */
  leadEndpoint: "/api/lead",

  /** Anchor targeted by every call to action on the page. */
  ctaAnchor: "#projet",

  /** Areas served — feed these from your paid-search keywords. */
  serviceAreas: [
    "Paris",
    "Lyon",
    "Marseille",
    "Bordeaux",
    "Lille",
    "Toulouse",
    "Nantes",
    "Genève",
    "Bruxelles",
  ],

  social: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
  },

  legal: {
    company: "Kobalt Studio SASU",
    siret: "000 000 000 00000",
    address: "12 rue de la Réussite, 75002 Paris",
    director: "Direction de la publication",
    host: "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA",
  },
} as const;

export type Site = typeof site;
