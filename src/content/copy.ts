import type { Copy } from "@/content/schema";
import { site } from "@/content/site";

const CTA = site.ctaAnchor;

export const copy: Copy = {
  nav: {
    links: [
      { label: "Méthode", href: "#methode" },
      { label: "Réalisations", href: "#realisations" },
      { label: "Tarifs", href: "#tarifs" },
      { label: "Questions", href: "#questions" },
    ],
    cta: { label: "Démarrer mon projet", href: CTA },
  },

  hero: {
    eyebrow: "Studio de création de sites web",
    headline: "Un site qui vous amène des clients,",
    emphasis: "pas des compliments.",
    subheadline:
      "Nous concevons des sites rapides, clairs et pensés pour la conversion. Livrés en 21 jours, mesurés sur une seule chose : le nombre de demandes qualifiées qu'ils génèrent.",
    primaryCta: {
      label: "Évaluer mon projet en 90 secondes",
      href: CTA,
      note: "Gratuit et sans engagement — réponse sous 24 h ouvrées.",
    },
    secondaryCta: { label: "Voir des résultats concrets", href: "#realisations" },
    reassurances: [
      "Réponse sous 24 h",
      "Devis fixe, pas de dépassement",
      "Livré en 21 jours",
    ],
    stats: [
      { value: "21 j", label: "délai moyen de mise en ligne" },
      { value: "94", label: "score PageSpeed mobile minimum" },
      { value: "x2,4", label: "demandes entrantes en moyenne" },
    ],
  },

  proofBar: {
    intro: "Ils nous ont confié leur croissance",
    clients: [
      "Atelier Vernier",
      "Cabinet Solane",
      "Groupe Ferrand",
      "Maison Oria",
      "Neveu & Associés",
      "Studio Palma",
    ],
  },

  problem: {
    eyebrow: "Le vrai problème",
    headline: "Votre site ne vend pas. Ce n'est pas une question de goût.",
    intro:
      "Un site peut être joli et ne rien rapporter. Voici ce que nous retrouvons dans 9 audits sur 10 chez des entrepreneurs comme vous.",
    items: [
      {
        symptom: "Le visiteur ne comprend pas ce que vous faites en 5 secondes",
        cost: "Il repart avant même de lire votre offre.",
      },
      {
        symptom: "Le site met plus de 3 secondes à s'afficher sur mobile",
        cost: "Vous perdez une part importante du trafic que vous payez.",
      },
      {
        symptom: "Aucun parcours clair vers la prise de contact",
        cost: "Les visiteurs intéressés n'ont nulle part où aller.",
      },
      {
        symptom: "Un formulaire générique « demande de devis »",
        cost: "Vous recevez des curieux, pas des projets sérieux.",
      },
    ],
    bridge:
      "Nous ne vendons pas des pages. Nous construisons le chemin le plus court entre une publicité et un client qui vous appelle.",
  },

  method: {
    eyebrow: "Notre méthode",
    headline: "Quatre étapes, aucune zone d'ombre.",
    intro:
      "Un cadre éprouvé, des livrables datés, et un interlocuteur unique du premier appel à la mise en ligne.",
    steps: [
      {
        index: "01",
        title: "Cadrage",
        duration: "Jours 1 à 3",
        description:
          "Nous analysons votre marché, vos concurrents et vos meilleurs clients pour identifier le message qui déclenche l'action.",
        deliverables: ["Audit concurrentiel", "Positionnement", "Plan du site"],
      },
      {
        index: "02",
        title: "Message",
        duration: "Jours 4 à 8",
        description:
          "Nous écrivons chaque ligne du site autour d'une promesse claire et de preuves vérifiables. Vous validez avant tout design.",
        deliverables: ["Copywriting complet", "Structure de conversion"],
      },
      {
        index: "03",
        title: "Design & build",
        duration: "Jours 9 à 18",
        description:
          "Design sur mesure, développement performant, intégration de votre outil de suivi. Pas de thème générique, pas de surcharge.",
        deliverables: ["Maquettes", "Site développé", "Suivi analytique"],
      },
      {
        index: "04",
        title: "Mise en ligne",
        duration: "Jours 19 à 21",
        description:
          "Tests, référencement technique, mise en ligne et formation. Vous repartez autonome, avec un site qui charge en moins d'une seconde.",
        deliverables: ["Recette complète", "SEO technique", "Formation 1 h"],
      },
    ],
  },

  showcase: {
    eyebrow: "Réalisations",
    headline: "Des sites qui changent la courbe de chiffre d'affaires.",
    intro:
      "Trois projets récents, les chiffres avant et après, et ce que nous avons changé.",
    cases: [
      {
        client: "Atelier Vernier",
        sector: "Menuiserie sur mesure",
        city: "Bordeaux",
        challenge:
          "Un site vitrine sans parcours de contact, alimenté par de la publicité locale.",
        outcome:
          "Refonte complète autour d'un formulaire de qualification et de preuves chantier.",
        metrics: [
          { value: "+186 %", label: "demandes qualifiées" },
          { value: "−41 %", label: "coût par demande" },
          { value: "1,1 s", label: "temps de chargement" },
        ],
      },
      {
        client: "Cabinet Solane",
        sector: "Conseil patrimonial",
        city: "Lyon",
        challenge:
          "Beaucoup de trafic, très peu de rendez-vous réellement pris.",
        outcome:
          "Message repositionné sur le résultat client et prise de rendez-vous en trois clics.",
        metrics: [
          { value: "x3,2", label: "rendez-vous pris" },
          { value: "+27 %", label: "taux de clic publicitaire" },
          { value: "18 j", label: "délai de livraison" },
        ],
      },
      {
        client: "Maison Oria",
        sector: "Architecture d'intérieur",
        city: "Paris",
        challenge:
          "Une image haut de gamme mais aucun signal de crédibilité mesurable.",
        outcome:
          "Portfolio structuré, preuves chiffrées et parcours de contact adapté au mobile.",
        metrics: [
          { value: "+142 %", label: "temps passé sur le site" },
          { value: "+68 %", label: "projets entrants" },
          { value: "98", label: "score PageSpeed" },
        ],
      },
    ],
    disclaimer:
      "Chiffres mesurés sur les 90 jours suivant la mise en ligne, comparés aux 90 jours précédents.",
  },

  deliverables: {
    eyebrow: "Ce que vous recevez",
    headline: "Tout ce qu'il faut pour vendre. Rien de superflu.",
    intro:
      "Un périmètre écrit noir sur blanc avant de commencer, pour que personne ne découvre de surprise à la facture.",
    groups: [
      {
        title: "Stratégie",
        items: [
          "Audit de votre marché et de vos concurrents",
          "Positionnement et promesse différenciante",
          "Architecture du parcours de conversion",
        ],
      },
      {
        title: "Création",
        items: [
          "Design sur mesure, jamais de thème acheté",
          "Copywriting intégral rédigé par un humain",
          "Déclinaison mobile pensée en premier",
        ],
      },
      {
        title: "Technique",
        items: [
          "Développement sur Next.js, hébergement inclus 12 mois",
          "Score PageSpeed supérieur à 90 garanti",
          "SEO technique, données structurées, sitemap",
        ],
      },
      {
        title: "Après la mise en ligne",
        items: [
          "Suivi des conversions branché sur vos campagnes",
          "Formation à la mise à jour du contenu",
          "30 jours de corrections incluses",
        ],
      },
    ],
  },

  offer: {
    eyebrow: "Investissement",
    headline: "Un prix fixe, annoncé avant de commencer.",
    intro:
      "Chaque projet est chiffré après le premier échange. Les fourchettes ci-dessous couvrent 90 % des demandes que nous recevons.",
    plans: [
      {
        id: "essentiel",
        name: "Essentiel",
        bestFor: "Indépendants et jeunes structures qui lancent leur acquisition.",
        priceFrom: "2 400 €",
        priceNote: "HT, paiement en 2 fois",
        timeline: "14 jours",
        features: [
          "Page de conversion sur mesure",
          "Copywriting complet",
          "Formulaire de qualification",
          "Suivi des conversions",
          "Hébergement 12 mois inclus",
        ],
        cta: { label: "Voir si c'est adapté", href: CTA },
      },
      {
        id: "croissance",
        name: "Croissance",
        bestFor: "Entreprises établies qui investissent déjà en publicité.",
        priceFrom: "4 900 €",
        priceNote: "HT, paiement en 3 fois",
        timeline: "21 jours",
        features: [
          "Site complet de 5 à 8 pages",
          "Pages locales par ville pour vos campagnes",
          "Formulaire de qualification avancé",
          "Tests A/B sur les messages clés",
          "Tableau de bord de suivi",
          "90 jours d'accompagnement",
        ],
        cta: { label: "Démarrer mon projet", href: CTA },
        featured: true,
      },
      {
        id: "surmesure",
        name: "Sur mesure",
        bestFor: "Groupes, franchises et projets à plusieurs entités.",
        priceFrom: "Sur devis",
        priceNote: "après cadrage",
        timeline: "à définir",
        features: [
          "Architecture multi-sites ou multi-langues",
          "Connexion à votre CRM ou ERP",
          "Contenus et production visuelle",
          "Accompagnement acquisition continu",
        ],
        cta: { label: "Décrire mon contexte", href: CTA },
      },
    ],
    guarantee: {
      title: "Engagement performance",
      body: "Si votre nouveau site ne charge pas en moins de 1,5 seconde sur mobile et n'obtient pas un score PageSpeed supérieur à 90, nous corrigeons à nos frais jusqu'à ce que ce soit le cas.",
    },
  },

  testimonials: {
    eyebrow: "Ils en parlent mieux que nous",
    headline: "Le retour de ceux qui ont franchi le pas.",
    items: [
      {
        quote:
          "En six semaines, nous avons plus de demandes qu'en un an avec l'ancien site. Et surtout, ce sont les bons projets qui arrivent.",
        author: "Julien Vernier",
        role: "Fondateur, Atelier Vernier",
        initials: "JV",
        result: "+186 % de demandes qualifiées",
      },
      {
        quote:
          "Le formulaire fait un vrai tri. Je ne passe plus mes soirées à répondre à des gens qui cherchent juste un prix.",
        author: "Sarah Lombard",
        role: "Associée, Cabinet Solane",
        initials: "SL",
        result: "x3,2 rendez-vous pris",
      },
      {
        quote:
          "Un interlocuteur, des dates tenues, un rendu au-dessus de ce que j'espérais. C'est rare.",
        author: "Marc Oria",
        role: "Directeur, Maison Oria",
        initials: "MO",
        result: "Livré en 19 jours",
      },
    ],
  },

  objections: {
    eyebrow: "Questions fréquentes",
    headline: "Ce que vous voulez savoir avant de nous parler.",
    intro:
      "Si votre question n'y est pas, posez-la dans le formulaire : nous y répondons personnellement.",
    items: [
      {
        question: "Combien coûte réellement un site chez vous ?",
        answer:
          "Entre 2 400 € et 4 900 € HT pour la très grande majorité des projets. Le prix est fixé après le premier échange et n'évolue plus, sauf si vous ajoutez vous-même du périmètre.",
      },
      {
        question: "Pourquoi un formulaire plutôt qu'une demande de devis ?",
        answer:
          "Parce qu'un devis envoyé à l'aveugle ne veut rien dire. Les questions nous permettent d'arriver au premier appel avec une recommandation concrète, et vous permettent de savoir tout de suite si nous sommes le bon partenaire.",
      },
      {
        question: "Je n'ai ni logo, ni photos, ni textes. C'est bloquant ?",
        answer:
          "Non. Le copywriting est inclus, et nous pouvons prendre en charge la direction artistique et la production visuelle. Nous vous dirons simplement ce que cela ajoute au budget avant de commencer.",
      },
      {
        question: "Que se passe-t-il si le résultat ne me convient pas ?",
        answer:
          "Vous validez le message, puis le design, avant tout développement. Deux tours de retours sont inclus à chaque étape, et vous ne payez le solde qu'à la mise en ligne.",
      },
      {
        question: "Puis-je modifier le site moi-même ensuite ?",
        answer:
          "Oui. Les contenus modifiables sont branchés sur une interface simple et nous vous formons une heure avant la livraison. Vous restez propriétaire du site et du nom de domaine.",
      },
      {
        question: "Travaillez-vous partout en France ?",
        answer:
          "Oui, et en Belgique et en Suisse. Tout se fait à distance, en visio, avec des points fixés à l'avance. Nous nous déplaçons pour les projets qui le nécessitent.",
      },
    ],
  },

  formSection: {
    eyebrow: "Première étape",
    headline: "Décrivez votre projet en 90 secondes.",
    intro:
      "Six questions pour comprendre où vous en êtes. Vous recevez ensuite une recommandation écrite, que nous travaillions ensemble ou non.",
    bullets: [
      "Une recommandation personnalisée sous 24 h ouvrées",
      "Une fourchette de budget et un délai réalistes",
      "Aucun appel commercial non sollicité",
    ],
    privacy:
      "Vos réponses servent uniquement à préparer notre échange. Aucune revente de données, désinscription en un clic.",
  },

  finalCta: {
    headline: "Chaque semaine sans site qui convertit vous coûte des clients.",
    subheadline:
      "Nous ouvrons quatre projets par mois pour garantir le délai de 21 jours. Prenez votre place pendant qu'elle est disponible.",
    cta: {
      label: "Évaluer mon projet maintenant",
      href: CTA,
      note: "90 secondes, sans engagement.",
    },
    scarcity: "Projets ouverts ce mois-ci : 4",
  },

  footer: {
    blurb:
      "Kobalt conçoit des sites web de conversion pour les entrepreneurs qui investissent dans leur acquisition.",
    columns: [
      {
        title: "Studio",
        links: [
          { label: "Méthode", href: "#methode" },
          { label: "Réalisations", href: "#realisations" },
          { label: "Tarifs", href: "#tarifs" },
          { label: "Questions", href: "#questions" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: site.contact.email, href: `mailto:${site.contact.email}` },
          { label: site.contact.phone, href: `tel:${site.contact.phoneHref}` },
        ],
      },
      {
        title: "Informations",
        links: [
          { label: "Mentions légales", href: "/mentions-legales" },
          { label: "Confidentialité", href: "/confidentialite" },
        ],
      },
    ],
    legalNote: "Tous droits réservés.",
  },

  stickyBar: {
    label: "Réponse sous 24 h",
    cta: { label: "Évaluer mon projet", href: CTA },
  },

  meta: {
    title: "Création de site web pour entrepreneurs — sites qui convertissent",
    description:
      "Studio de création de sites web pensés pour la conversion. Design sur mesure, copywriting inclus, livraison en 21 jours. Évaluez votre projet en 90 secondes.",
    ogTitle: "Un site qui vous amène des clients, pas des compliments.",
    ogDescription:
      "Sites de conversion sur mesure pour entrepreneurs. Livrés en 21 jours, mesurés sur les demandes qualifiées générées.",
  },
};
