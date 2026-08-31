/**
 * Single source of truth for everything brand- and deployment-specific.
 * Change these values and the whole landing page follows.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * À REMPLACER AVANT LA MISE EN LIGNE (propriétaire du site)
 *
 * Tout ce qui suit est volontairement fictif. Rien de ce bloc ne doit rester
 * en l’état une fois le site publié :
 *
 *   • `contact.email`, `contact.phone`, `contact.phoneHref`,
 *     `contact.privacyEmail` — adresses et numéro réels, boîtes relevées.
 *   • `url` — le domaine définitif (ou la variable NEXT_PUBLIC_SITE_URL
 *     côté Vercel, qui a la priorité).
 *   • `legal.*` — raison sociale, capital, SIRET, RCS, TVA, adresse du
 *     siège et nom du directeur de la publication. Les identifiants
 *     à zéro sont des gabarits, pas des valeurs valides.
 *   • `legal.host` — à corriger si l’hébergement n’est pas Vercel.
 *   • `legal.updatedAt` — à remettre à jour à chaque révision des pages
 *     « Mentions légales » et « Politique de confidentialité ».
 *   • `serviceAreas` — à aligner sur les villes réellement ciblées par vos
 *     campagnes Google Ads : cette liste s’affiche en pied de page et
 *     alimente le balisage JSON-LD.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Cadran",
  legalName: "Cadran Studio",
  tagline: "Sites web qui produisent des demandes, pour les TPE et PME",
  /** Short promise reused in JSON-LD and social previews. */
  promise: "Le texte avant le dessin. En ligne en 21 jours, à prix fixe.",
  /** Used for canonical URLs, Open Graph and JSON-LD. Override in Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cadran.studio",
  locale: "fr_FR",

  contact: {
    email: "contact@cadran.studio",
    phone: "+33 6 00 00 00 00",
    /** Digits only, international format, for tel: and WhatsApp links. */
    phoneHref: "+33600000000",
    /** Address used to exercise GDPR rights, cited in the privacy policy. */
    privacyEmail: "donnees@cadran.studio",
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
    "Toulouse",
    "Bordeaux",
    "Nantes",
    "Lille",
    "Strasbourg",
    "Rennes",
    "Montpellier",
    "Nice",
    "Grenoble",
    "Annecy",
    "Bruxelles",
    "Liège",
    "Namur",
    "Charleroi",
    "Genève",
    "Lausanne",
    "Fribourg",
    "Neuchâtel",
  ],

  social: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
  },

  legal: {
    company: "Cadran Studio SASU",
    /** Placeholder identifiers — replace with the real ones before going live. */
    capital: "5 000 €",
    siret: "000 000 000 00000",
    rcs: "RCS Paris 000 000 000",
    vat: "FR00 000000000",
    address: "12 rue de la Réussite, 75002 Paris",
    director: "Camille Roussel",
    host: "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA",
    hostUrl: "https://vercel.com",
    /** Date of the last review of the legal documents. */
    updatedAt: "31 août 2026",
  },
} as const;

export type Site = typeof site;
