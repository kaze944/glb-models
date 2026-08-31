/**
 * FROZEN CONTRACT.
 *
 * The section components read `copy` through these types, so the shape must
 * stay stable. Copy work happens in `copy.ts` (values only); layout work
 * happens in `components/sections` (rendering only).
 */

export type Cta = {
  label: string;
  /** Anchor or absolute URL. */
  href: string;
  /** Small reassurance line rendered under the button. */
  note?: string;
};

export type Nav = {
  label: string;
  href: string;
};

export type Hero = {
  eyebrow: string;
  /** Rendered as the h1. `emphasis` is highlighted inside the headline. */
  headline: string;
  emphasis: string;
  subheadline: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  /** 3 to 4 short risk-reversal chips shown under the CTAs. */
  reassurances: string[];
  /** Numbers shown next to the hero visual. */
  stats: { value: string; label: string }[];
};

export type ProofBar = {
  intro: string;
  /** Text-only client references keep this section weightless. */
  clients: string[];
};

export type Problem = {
  eyebrow: string;
  headline: string;
  intro: string;
  items: { symptom: string; cost: string }[];
  /** One-line transition into the solution. */
  bridge: string;
};

export type Method = {
  eyebrow: string;
  headline: string;
  intro: string;
  steps: {
    /** e.g. "01" */
    index: string;
    title: string;
    duration: string;
    description: string;
    deliverables: string[];
  }[];
};

export type Showcase = {
  eyebrow: string;
  headline: string;
  intro: string;
  cases: {
    client: string;
    sector: string;
    city: string;
    challenge: string;
    outcome: string;
    metrics: { value: string; label: string }[];
  }[];
  disclaimer: string;
};

export type Deliverables = {
  eyebrow: string;
  headline: string;
  intro: string;
  groups: {
    title: string;
    items: string[];
  }[];
};

export type Offer = {
  eyebrow: string;
  headline: string;
  intro: string;
  plans: {
    id: string;
    name: string;
    bestFor: string;
    priceFrom: string;
    priceNote: string;
    timeline: string;
    features: string[];
    cta: Cta;
    featured?: boolean;
  }[];
  guarantee: {
    title: string;
    body: string;
  };
};

export type Testimonials = {
  eyebrow: string;
  headline: string;
  items: {
    quote: string;
    author: string;
    role: string;
    /** Two-letter fallback for the avatar. */
    initials: string;
    result?: string;
  }[];
};

export type Objections = {
  eyebrow: string;
  headline: string;
  intro: string;
  items: { question: string; answer: string }[];
};

export type FormSection = {
  eyebrow: string;
  headline: string;
  intro: string;
  /** Bullets shown beside the form to justify the time investment. */
  bullets: string[];
  privacy: string;
};

export type FinalCta = {
  headline: string;
  subheadline: string;
  cta: Cta;
  scarcity: string;
};

export type Footer = {
  blurb: string;
  columns: { title: string; links: Nav[] }[];
  legalNote: string;
};

export type Copy = {
  nav: {
    links: Nav[];
    cta: Cta;
  };
  hero: Hero;
  proofBar: ProofBar;
  problem: Problem;
  method: Method;
  showcase: Showcase;
  deliverables: Deliverables;
  offer: Offer;
  testimonials: Testimonials;
  objections: Objections;
  formSection: FormSection;
  finalCta: FinalCta;
  footer: Footer;
  /** Sticky mobile bar. */
  stickyBar: { label: string; cta: Cta };
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
};
