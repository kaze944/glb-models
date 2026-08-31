/**
 * Wording and structure of the qualification flow.
 *
 * Kept separate from `@/lib/lead` so the data contract (values, schemas,
 * scoring) can be shared with the server without dragging copy or icons into
 * the API bundle — and, the other way round, so the static first screen can be
 * rendered without pulling `zod` into the page's initial JavaScript. Every
 * import from `@/lib/lead` here is type-only, and must stay that way.
 *
 * Titles are functions so each screen can echo the previous answers back.
 */

import {
  AtSignIcon,
  BinocularsIcon,
  BriefcaseBusinessIcon,
  CalendarClockIcon,
  CalendarRangeIcon,
  CircleDashedIcon,
  EllipsisIcon,
  HammerIcon,
  HeartPulseIcon,
  HouseIcon,
  LayoutGridIcon,
  MegaphoneIcon,
  MessagesSquareIcon,
  PaintbrushIcon,
  PhoneOutgoingIcon,
  RocketIcon,
  SearchIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SmartphoneIcon,
  StoreIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import type {
  Budget,
  Channel,
  Goal,
  Lead,
  LeadDraft,
  Role,
  Sector,
  Situation,
  StepId,
  Timeline,
} from "@/lib/lead";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type Option<V extends string> = {
  value: V;
  label: string;
  hint?: string;
  icon?: IconType;
};

/** Only these two situations imply an existing address worth asking for. */
export function hasCurrentSite(situation: Situation | undefined): boolean {
  return situation === "site-depasse" || situation === "site-sans-demandes";
}

/* ------------------------------------------------------------------ */
/* Options                                                             */
/* ------------------------------------------------------------------ */

const goalOptions: Option<Goal>[] = [
  {
    value: "demandes",
    label: "Générer plus de demandes",
    hint: "Faire du site ma première source de clients.",
    icon: TrendingUpIcon,
  },
  {
    value: "credibilite",
    label: "Gagner en crédibilité",
    hint: "Inspirer confiance dès les premières secondes.",
    icon: ShieldCheckIcon,
  },
  {
    value: "vente-en-ligne",
    label: "Vendre en ligne",
    hint: "Encaisser directement depuis le site.",
    icon: ShoppingBagIcon,
  },
  {
    value: "lancement",
    label: "Lancer une nouvelle activité",
    hint: "Exister en ligne dès le premier jour.",
    icon: RocketIcon,
  },
];

const situationOptions: Option<Situation>[] = [
  {
    value: "aucun-site",
    label: "Je n’ai pas encore de site",
    hint: "Tout est à construire.",
    icon: CircleDashedIcon,
  },
  {
    value: "site-depasse",
    label: "J’ai un site, il est dépassé",
    hint: "Il ne reflète plus mon niveau réel.",
    icon: PaintbrushIcon,
  },
  {
    value: "site-sans-demandes",
    label: "J’ai un site, il ne convertit pas",
    hint: "Des visites, très peu de demandes.",
    icon: TrendingDownIcon,
  },
  {
    value: "reseaux-seulement",
    label: "Je n’ai que mes réseaux",
    hint: "Une page Instagram ou une fiche Google, rien de plus.",
    icon: SmartphoneIcon,
  },
];

export const sectorOptions: Option<Sector>[] = [
  { value: "batiment", label: "Artisanat & bâtiment", icon: HammerIcon },
  {
    value: "services-pro",
    label: "Services aux entreprises",
    icon: BriefcaseBusinessIcon,
  },
  { value: "sante", label: "Santé & bien-être", icon: HeartPulseIcon },
  { value: "commerce", label: "Commerce & restauration", icon: StoreIcon },
  { value: "immobilier", label: "Immobilier & habitat", icon: HouseIcon },
  { value: "autre", label: "Autre secteur", icon: EllipsisIcon },
];

const timelineOptions: Option<Timeline>[] = [
  {
    value: "des-que-possible",
    label: "Le plus tôt possible",
    hint: "C’est un sujet bloquant aujourd’hui.",
    icon: ZapIcon,
  },
  {
    value: "trois-mois",
    label: "Dans les trois mois",
    hint: "Le projet est décidé, la date reste à caler.",
    icon: CalendarClockIcon,
  },
  {
    value: "six-mois",
    label: "D’ici six mois",
    hint: "J’anticipe, sans urgence particulière.",
    icon: CalendarRangeIcon,
  },
  {
    value: "exploration",
    label: "Je me renseigne",
    hint: "Je compare avant de m’engager.",
    icon: BinocularsIcon,
  },
];

// No icons here on purpose: the amounts carry the hierarchy on their own.
const budgetOptions: Option<Budget>[] = [
  {
    value: "moins-2500",
    label: "Moins de 2 500 €",
    hint: "Budget serré, périmètre à prioriser.",
  },
  {
    value: "2500-5000",
    label: "2 500 € – 5 000 €",
    hint: "La fourchette de la majorité de nos projets.",
  },
  {
    value: "5000-10000",
    label: "5 000 € – 10 000 €",
    hint: "Site complet, pages locales et tests de messages.",
  },
  {
    value: "plus-10000",
    label: "Plus de 10 000 €",
    hint: "Projet structurant, plusieurs entités ou plusieurs langues.",
  },
  {
    value: "a-definir",
    label: "Je ne sais pas encore",
    hint: "Réponse parfaitement valable : c’est nous qui vous donnerons la fourchette.",
  },
];

const acquisitionOptions: Option<Channel>[] = [
  {
    value: "bouche-a-oreille",
    label: "Bouche-à-oreille",
    icon: MessagesSquareIcon,
  },
  { value: "recherche-google", label: "Recherche Google", icon: SearchIcon },
  { value: "publicite-payante", label: "Publicité payante", icon: MegaphoneIcon },
  { value: "reseaux-sociaux", label: "Réseaux sociaux", icon: AtSignIcon },
  { value: "prospection", label: "Prospection directe", icon: PhoneOutgoingIcon },
  { value: "plateformes", label: "Plateformes & annuaires", icon: LayoutGridIcon },
];

export const roleOptions: Option<Role>[] = [
  { value: "decideur", label: "Je décide" },
  { value: "co-decideur", label: "Nous décidons à deux" },
  { value: "prescripteur", label: "Je prépare la décision" },
];

/* ------------------------------------------------------------------ */
/* Conversational fragments                                            */
/* ------------------------------------------------------------------ */

const goalPhrase: Record<Goal, string> = {
  demandes: "générer plus de demandes",
  credibilite: "gagner en crédibilité",
  "vente-en-ligne": "vendre en ligne",
  lancement: "lancer votre activité",
};

const situationPhrase: Record<Situation, string> = {
  "aucun-site": "un premier site",
  "site-depasse": "une refonte",
  "site-sans-demandes": "un site à faire enfin convertir",
  "reseaux-seulement": "un premier site",
};

const sectorPhrase: Record<Sector, string> = {
  batiment: "l’artisanat et le bâtiment",
  "services-pro": "les services aux entreprises",
  sante: "la santé et le bien-être",
  commerce: "le commerce et la restauration",
  immobilier: "l’immobilier",
  autre: "votre secteur",
};

/* ------------------------------------------------------------------ */
/* Steps                                                               */
/* ------------------------------------------------------------------ */

type StepBase = {
  id: StepId;
  /** Short mono label displayed above the progress rail. */
  tag: string;
  title: (answers: LeadDraft) => string;
  /** Why we ask, and what we do with the answer. */
  help: (answers: LeadDraft) => string;
};

export type Step = StepBase &
  (
    | {
        kind: "single";
        field: "goal" | "situation" | "timeline" | "budget";
        options: Option<string>[];
      }
    | { kind: "multi"; field: "acquisition"; options: Option<Channel>[] }
    | { kind: "activite" }
    | { kind: "coordonnees" }
  );

const draftGoal = (answers: LeadDraft) => answers.goal as Goal | undefined;
const draftSituation = (answers: LeadDraft) =>
  answers.situation as Situation | undefined;
const draftSector = (answers: LeadDraft) => answers.sector as Sector | undefined;

/*
 * Order is the conversion design, not a data model.
 *
 *   1–2  two one-tap questions, no keyboard, no commitment — the visitor is
 *        already three seconds in before anything is asked of them
 *   3    first typing, but on a subject they enjoy: their own business
 *   4    the deadline, which reframes the project as something that happens
 *   5    the budget, asked only once effort has been invested
 *   6    an easy multi-choice screen right after the hardest question
 *   7    contact details last, when leaving would mean losing the analysis
 */
export const steps: Step[] = [
  {
    id: "objectif",
    kind: "single",
    field: "goal",
    tag: "Objectif",
    title: () => "Que doit vous apporter ce site, avant tout ?",
    help: () =>
      "Une seule réponse. C’est elle qui oriente toute la recommandation que nous vous enverrons.",
    options: goalOptions,
  },
  {
    id: "situation",
    kind: "single",
    field: "situation",
    tag: "Point de départ",
    title: (answers) => {
      const goal = draftGoal(answers);
      return goal
        ? `Pour ${goalPhrase[goal]}, d’où partez-vous ?`
        : "D’où partez-vous aujourd’hui ?";
    },
    help: () =>
      "Repartir de zéro ou reprendre l’existant n’a ni le même coût ni le même délai. Nous adaptons la méthode.",
    options: situationOptions,
  },
  {
    id: "activite",
    kind: "activite",
    tag: "Votre activité",
    title: (answers) => {
      const situation = draftSituation(answers);
      return situation
        ? `Pour ${situationPhrase[situation]}, parlez-nous de votre activité.`
        : "Parlez-nous de votre activité.";
    },
    help: (answers) =>
      hasCurrentSite(draftSituation(answers))
        ? "La concurrence sur « création site web » n’a rien à voir d’une ville à l’autre. Et un coup d’œil à votre site actuel rend notre analyse bien plus concrète."
        : "La concurrence sur « création site web » n’a rien à voir d’une ville à l’autre : c’est ce qui détermine le travail de référencement à prévoir.",
  },
  {
    id: "echeance",
    kind: "single",
    field: "timeline",
    tag: "Échéance",
    title: (answers) => {
      const sector = draftSector(answers);
      return sector
        ? `Dans ${sectorPhrase[sector]}, quand voulez-vous être en ligne ?`
        : "Quand souhaitez-vous être en ligne ?";
    },
    help: () =>
      "Nous ouvrons quatre projets par mois pour tenir le délai de 21 jours. Votre échéance nous dit tout de suite si c’est jouable.",
    options: timelineOptions,
  },
  {
    id: "budget",
    kind: "single",
    field: "budget",
    tag: "Enveloppe",
    title: () => "Quelle enveloppe avez-vous en tête ?",
    help: () =>
      "Aucune de ces réponses ne vous engage. Elle nous évite simplement de vous proposer quelque chose hors de portée — ou très en dessous de vos ambitions.",
    options: budgetOptions,
  },
  {
    id: "acquisition",
    kind: "multi",
    field: "acquisition",
    tag: "Acquisition",
    title: (answers) =>
      draftSituation(answers) === "site-sans-demandes"
        ? "D’où vient le trafic qui ne convertit pas ?"
        : "Aujourd’hui, comment vos clients vous trouvent-ils ?",
    help: () =>
      "Un site ne crée pas de trafic tout seul. Savoir d’où viennent vos clients nous dit sur quoi concentrer les efforts. Plusieurs réponses possibles.",
    options: acquisitionOptions,
  },
  {
    id: "coordonnees",
    kind: "coordonnees",
    tag: "Vos coordonnées",
    title: () => "Où envoyons-nous votre analyse ?",
    help: () =>
      "Elle part par e-mail sous 24 h ouvrées. Le téléphone ne sert qu’en cas de question sur votre projet : jamais de relance commerciale.",
  },
];

/** Screens the visitor perceives as “questions” — the contact form excluded. */
export const questionCount = steps.length - 1;

/**
 * The opening screen, pre-narrowed so the static skeleton can render it
 * without importing the form (and therefore without importing `zod`).
 */
export const firstStep = steps[0] as Extract<Step, { kind: "single" }>;

/** Rough seconds left, shown next to the progress rail. */
export function secondsLeft(stepIndex: number): number {
  const remaining = steps.length - stepIndex;
  return Math.max(10, Math.round((remaining * 13) / 5) * 5);
}

/* ------------------------------------------------------------------ */
/* Recap helpers                                                       */
/* ------------------------------------------------------------------ */

const allOptions = [
  ...goalOptions,
  ...situationOptions,
  ...sectorOptions,
  ...timelineOptions,
  ...budgetOptions,
  ...acquisitionOptions,
  ...roleOptions,
];

const labelByValue = new Map<string, string>(
  allOptions.map((option) => [option.value, option.label]),
);

export function labelFor(value: string | undefined): string {
  if (!value) return "—";
  return labelByValue.get(value) ?? value;
}

/** Key/value pairs rendered on the reward screen. */
export function recapRows(lead: Lead): { label: string; value: string }[] {
  return [
    { label: "Objectif", value: labelFor(lead.goal) },
    { label: "Point de départ", value: labelFor(lead.situation) },
    { label: "Activité", value: `${labelFor(lead.sector)} — ${lead.area}` },
    { label: "Échéance", value: labelFor(lead.timeline) },
    { label: "Enveloppe", value: labelFor(lead.budget) },
    {
      label: "Acquisition",
      value: lead.acquisition.map((channel) => labelFor(channel)).join(", "),
    },
  ];
}
