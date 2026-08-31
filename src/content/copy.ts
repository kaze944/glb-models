import type { Copy } from "@/content/schema";
import { site } from "@/content/site";

const CTA = site.ctaAnchor;

export const copy: Copy = {
  nav: {
    links: [
      { label: "Méthode", href: "#methode" },
      { label: "Résultats", href: "#realisations" },
      { label: "Tarifs", href: "#tarifs" },
      { label: "Questions", href: "#questions" },
    ],
    cta: { label: "Évaluer mon projet", href: CTA },
  },

  hero: {
    eyebrow: "Studio de création de sites web",
    headline: "Un site web qui vous amène des clients, pas des compliments.",
    emphasis: "pas des compliments.",
    subheadline:
      "Nous écrivons votre site avant de le dessiner. Vous validez chaque phrase, le prix ne bouge plus, et le site est en ligne en 21 jours.",
    primaryCta: {
      label: "Évaluer mon projet en 90 secondes",
      href: CTA,
      note: "Gratuit, sans engagement. Votre recommandation écrite sous 24 h ouvrées.",
    },
    secondaryCta: {
      label: "Voir trois résultats chiffrés",
      href: "#realisations",
      note: "Le point de départ, ce que nous avons changé, ce que ça a donné.",
    },
    reassurances: [
      "Rédaction comprise : rien à écrire de votre côté",
      "Prix fixe écrit au contrat",
      "Le site vous appartient, sans abonnement",
    ],
    stats: [
      { value: "21 j", label: "du cadrage à la mise en ligne" },
      { value: "90+", label: "score PageSpeed mobile inscrit au contrat" },
      { value: "4", label: "projets ouverts par mois" },
    ],
  },

  proofBar: {
    intro: "Ils nous ont confié leur site cette année",
    clients: [
      "Atelier Vernier",
      "Cabinet Solane",
      "Maison Oria",
      "Delaunoy & Associés",
      "Toitures Marchal",
      "Fiduciaire Chappuis",
    ],
  },

  problem: {
    eyebrow: "Le vrai problème",
    headline: "Un site peut être très beau et ne rien vous rapporter.",
    intro:
      "Voici les quatre fuites que nous retrouvons presque à chaque audit. Vous allez sans doute en reconnaître deux ou trois.",
    items: [
      {
        symptom: "On ne comprend pas ce que vous vendez en cinq secondes",
        cost: "Le visiteur repart chez le concurrent ouvert dans l’onglet d’à côté.",
      },
      {
        symptom: "Votre site met plus de trois secondes à s’afficher sur un téléphone",
        cost: "Vous avez payé le clic, vous perdez le visiteur avant la première image.",
      },
      {
        symptom: "Pour vous joindre, il faut dénicher une adresse e-mail en bas de page",
        cost: "Les visiteurs les plus décidés cherchent trente secondes, puis renoncent.",
      },
      {
        symptom: "Votre seul bouton s’appelle « Demande de devis »",
        cost: "Vous récoltez des comparateurs de prix, et vous les triez le soir.",
      },
    ],
    bridge:
      "Aucune de ces fuites ne se répare avec un nouveau design. Elles se réparent en changeant l’ordre du travail.",
  },

  method: {
    eyebrow: "Notre méthode",
    headline: "Nous travaillons dans l’ordre inverse.",
    intro:
      "Dans la plupart des agences, le texte arrive en dernier, une fois les maquettes validées. Chez nous il arrive en premier, parce que c’est lui qui convainc.",
    steps: [
      {
        index: "01",
        title: "Cadrage",
        duration: "Jours 1 à 3",
        description:
          "Nous appelons trois de vos meilleurs clients et nous lisons les sites de vos concurrents les mieux placés. Nous cherchons l’argument que personne n’occupe.",
        deliverables: ["Entretiens clients", "Angle de positionnement", "Plan du site"],
      },
      {
        index: "02",
        title: "Écriture",
        duration: "Jours 4 à 8",
        description:
          "Nous écrivons chaque ligne du site, dans l’ordre où vos prospects se posent leurs questions. Vous validez le texte avant qu’un pixel ne soit dessiné.",
        deliverables: ["Texte intégral", "Ordre des arguments", "Réponses aux objections"],
      },
      {
        index: "03",
        title: "Design et développement",
        duration: "Jours 9 à 18",
        description:
          "Le dessin habille un texte déjà validé, jamais l’inverse. Développement sur mesure, sans thème acheté ni extensions empilées qui alourdissent vos pages.",
        deliverables: ["Maquettes mobile et bureau", "Développement", "Suivi des demandes"],
      },
      {
        index: "04",
        title: "Mise en ligne",
        duration: "Jours 19 à 21",
        description:
          "Tests sur tous les écrans, référencement technique, mise en ligne, une heure de formation. Chaque demande est ensuite comptée et reliée à l’annonce qui l’a produite.",
        deliverables: ["Recette et tests", "SEO technique", "Formation 1 h"],
      },
    ],
  },

  showcase: {
    eyebrow: "Résultats clients",
    headline: "Trois refontes, et ce qu’elles ont changé.",
    intro:
      "Pour chacune : d’où partait le client, ce que nous avons changé, ce que les chiffres disent depuis.",
    cases: [
      {
        client: "Atelier Vernier",
        sector: "Menuiserie sur mesure",
        city: "Bordeaux",
        challenge:
          "1 200 € de publicité locale chaque mois, et un site vitrine sans le moindre parcours de contact.",
        outcome:
          "Formulaire en trois étapes, chantiers documentés, fourchettes de budget annoncées dès la page d’accueil.",
        metrics: [
          { value: "+186 %", label: "demandes qualifiées" },
          { value: "−41 %", label: "coût par demande" },
          { value: "1,1 s", label: "temps d’affichage" },
        ],
      },
      {
        client: "Cabinet Solane",
        sector: "Conseil patrimonial",
        city: "Lyon",
        challenge:
          "Beaucoup de clics venus des annonces, presque aucun rendez-vous au bout du parcours.",
        outcome:
          "Message recentré sur ce que le client obtient, preuves de méthode, prise de rendez-vous en trois clics.",
        metrics: [
          { value: "×3,2", label: "rendez-vous pris" },
          { value: "+27 %", label: "taux de clic sur les annonces" },
          { value: "18 j", label: "délai de livraison" },
        ],
      },
      {
        client: "Maison Oria",
        sector: "Architecture d’intérieur",
        city: "Paris",
        challenge:
          "Une image haut de gamme, mais rien qu’un visiteur pressé puisse vérifier en une minute.",
        outcome:
          "Projets documentés du premier croquis à la livraison, budgets en fourchette, parcours pensé pour le téléphone.",
        metrics: [
          { value: "+68 %", label: "projets entrants" },
          { value: "−33 %", label: "demandes hors budget" },
          { value: "98", label: "score PageSpeed mobile" },
        ],
      },
    ],
    disclaimer:
      "Chiffres relevés dans Google Analytics 4 et Google Ads sur les 90 jours qui ont suivi la mise en ligne, comparés aux 90 jours précédents, à budget publicitaire équivalent. Ces trois clients nous ont autorisés à les publier. Un résultat dépend aussi du marché, de l’offre et du budget de chaque entreprise : ce ne sont pas des moyennes, et ce n’est pas une promesse.",
  },

  deliverables: {
    eyebrow: "Le périmètre",
    headline: "Ce que vous avez exactement pour ce prix.",
    intro:
      "Le devis reprend ces lignes une par une. Ce qui n’y figure pas ne vous sera jamais facturé sans votre accord écrit.",
    groups: [
      {
        title: "Stratégie",
        items: [
          "Entretiens avec trois de vos clients",
          "Analyse des concurrents les mieux placés",
          "Angle de positionnement et ordre des arguments",
        ],
      },
      {
        title: "Écriture",
        items: [
          "Texte intégral du site, écrit par un humain",
          "Arguments rangés dans l’ordre des objections",
          "Deux tours de retours à chaque étape",
        ],
      },
      {
        title: "Technique",
        items: [
          "Code écrit pour vous, sans thème acheté",
          "Score PageSpeed mobile au-dessus de 90",
          "Référencement technique et données structurées",
          "Hébergement et nom de domaine gérés 12 mois",
        ],
      },
      {
        title: "Après la mise en ligne",
        items: [
          "Compteur de demandes relié à vos annonces",
          "Une heure de formation pour modifier vos pages",
          "30 jours de corrections incluses",
          "Vos accès et votre code remis le jour de la livraison",
        ],
      },
    ],
  },

  offer: {
    eyebrow: "Tarifs",
    headline: "Un prix fixe, écrit avant de commencer.",
    intro:
      "Vous recevez une fourchette dans votre recommandation écrite, puis un prix ferme après trente minutes d’échange.",
    plans: [
      {
        id: "essentiel",
        name: "Essentiel",
        bestFor: "Indépendants et petites structures qui démarrent.",
        priceFrom: "2 400 €",
        priceNote: "HT, 40 % au démarrage",
        timeline: "14 jours",
        features: [
          "Une page unique, pensée pour la prise de contact",
          "Rédaction intégrale comprise",
          "Formulaire de qualification",
          "Compteur de demandes",
          "Hébergement géré 12 mois",
        ],
        cta: {
          label: "Vérifier si ça me suffit",
          href: CTA,
          note: "Si une page ne suffit pas, nous le dirons.",
        },
      },
      {
        id: "croissance",
        name: "Croissance",
        bestFor:
          "Entreprises qui achètent déjà de la publicité et veulent payer chaque demande moins cher.",
        priceFrom: "4 900 €",
        priceNote: "HT, réglable en 3 fois",
        timeline: "21 jours",
        features: [
          "Site complet de 5 à 8 pages",
          "Une page par ville pour vos campagnes",
          "Formulaire de qualification en six questions",
          "Deux titres testés après la mise en ligne",
          "Tableau de bord des demandes reçues",
          "Hébergement et nom de domaine gérés 12 mois",
          "90 jours de suivi compris",
        ],
        cta: {
          label: "Réserver ma place ce mois-ci",
          href: CTA,
          note: "Quatre projets par mois, pas un de plus.",
        },
        featured: true,
      },
      {
        id: "reseau",
        name: "Réseau",
        bestFor: "Groupes, franchises et projets à plusieurs entités ou plusieurs langues.",
        priceFrom: "9 000 €",
        priceNote: "HT, après cadrage",
        timeline: "calé ensemble",
        features: [
          "Plusieurs sites ou plusieurs langues",
          "Connexion à votre CRM ou à votre logiciel métier",
          "Production des textes, des photos et des vidéos",
          "Suivi trimestriel de vos demandes",
        ],
        cta: {
          label: "Décrire mon contexte",
          href: CTA,
          note: "Un cadrage avant tout chiffrage.",
        },
      },
    ],
    guarantee: {
      title: "Deux engagements écrits au contrat",
      body: "Votre site s’affiche en moins de 1,5 seconde sur mobile et obtient au moins 90 sur PageSpeed. Sinon nous corrigeons à nos frais jusqu’à ce que ce soit le cas. Et si la mise en ligne prend plus de cinq jours ouvrés de retard pour une raison qui nous incombe, nous déduisons 10 % du prix. Le solde ne se règle qu’une fois le site en ligne.",
    },
  },

  testimonials: {
    eyebrow: "Leurs retours",
    headline: "Ce qu’ils en disent, six mois après.",
    items: [
      {
        quote:
          "J’avais déjà payé deux sites avant celui-là. Cette fois, j’ai lu tout le texte avant de voir la moindre maquette, et j’ai compris pourquoi les deux premiers ne m’avaient rien rapporté. Aujourd’hui je reçois des demandes chaque semaine et je sais d’où elles viennent.",
        author: "Julien Vernier",
        role: "Fondateur, Atelier Vernier",
        initials: "JV",
        result: "+186 % de demandes qualifiées",
      },
      {
        quote:
          "Le formulaire fait le tri à ma place. Je ne passe plus mes soirées à répondre à des gens qui voulaient juste un prix.",
        author: "Sarah Lombard",
        role: "Associée, Cabinet Solane",
        initials: "SL",
        result: "×3,2 rendez-vous pris",
      },
      {
        quote:
          "Trois prestataires avant eux, trois projets qui traînent. Là, les dates ont été tenues et j’ai eu le même interlocuteur du début à la fin.",
        author: "Marc Oria",
        role: "Directeur, Maison Oria",
        initials: "MO",
        result: "Livré en 19 jours",
      },
    ],
  },

  objections: {
    eyebrow: "Questions fréquentes",
    headline: "Les questions que vous vous posez déjà.",
    intro:
      "Nous répondons franchement, le prix en premier. Si votre question n’est pas là, posez-la dans le formulaire : vous aurez une réponse écrite.",
    items: [
      {
        question: "Combien coûte un site chez vous, et pourquoi pas 900 € comme le freelance que j’ai vu ?",
        answer:
          "Comptez 2 400 € HT pour une page unique, 4 900 € HT pour un site de 5 à 8 pages, à partir de 9 000 € HT pour les projets à plusieurs entités. À 900 €, vous achetez un thème rempli avec vos textes actuels. C’est parfois suffisant, mais votre message ne change pas, donc votre nombre de demandes non plus. Chez nous, le prix est arrêté avant le démarrage et ne bouge plus, sauf si vous ajoutez vous-même du périmètre. Vous réglez 40 % au lancement et le solde une fois le site en ligne.",
      },
      {
        question: "Pourquoi un formulaire plutôt qu’une demande de devis ?",
        answer:
          "Parce qu’un devis établi sans rien connaître de votre marché ni de vos concurrents locaux ne vaut rien : c’est un chiffre au hasard. Les six questions prennent 90 secondes et vous rapportent autre chose qu’un tarif. Vous recevez une recommandation écrite : ce qui vous fait perdre des demandes aujourd’hui, ce que nous corrigerions en premier, un budget et une date. Elle est à vous. Vous pouvez la faire chiffrer ailleurs, nous préférons cela à un devis que vous jetterez.",
      },
      {
        question: "21 jours, ce n’est pas trop rapide pour un site sérieux ?",
        answer:
          "C’est rapide parce que l’ordre est fixé et que rien n’est improvisé : cadrage, texte validé, dessin, mise en ligne. Le délai tient à une condition, annoncée dès le premier jour : vos retours sous 48 h ouvrées à chaque étape. C’est aussi pour cela que nous n’ouvrons que quatre projets par mois. Si vous ne pouvez pas tenir ce rythme, nous calons un calendrier plus long, au même prix.",
      },
      {
        question: "Garantissez-vous que j’aurai plus de clients ?",
        answer:
          "Non. Et méfiez-vous de qui vous le promet : votre offre, votre marché et votre budget publicitaire pèsent au moins autant que le site. Nous garantissons ce qui dépend de nous, et c’est écrit au contrat : le prix, la date, la vitesse d’affichage, et une demande comptée chaque fois qu’un visiteur vous écrit. Les cas montrés plus haut sont des projets réels mesurés sur 90 jours ; ils ne préjugent pas des vôtres.",
      },
      {
        question: "Je n’ai ni texte, ni photo, ni logo. C’est bloquant ?",
        answer:
          "Non, c’est même le cas le plus fréquent. La rédaction est comprise dans tous les projets : vous répondez à nos questions pendant une heure, nous écrivons. Pour les photos, les vidéos et l’identité visuelle, nous produisons ou nous faisons produire. Le supplément vous est annoncé avant de commencer, jamais sur la facture.",
      },
      {
        question: "Le site m’appartient-il ? Puis-je le modifier seul ?",
        answer:
          "Le site est à vous : code, contenus, nom de domaine et accès vous sont remis le jour de la livraison, sans clause de reprise et sans abonnement obligatoire. Vos textes, vos images et vos pages courantes se modifient depuis une interface simple, et nous vous formons une heure avant la mise en ligne. Si vous partez ailleurs dans deux ans, vous emportez tout.",
      },
    ],
  },

  formSection: {
    eyebrow: "Première étape",
    headline: "Vous repartez avec une recommandation écrite.",
    intro:
      "Six questions, 90 secondes, aucune inscription. Sous 24 h ouvrées, vous recevez une analyse écrite de votre situation.",
    bullets: [
      "Les trois points qui vous coûtent le plus de demandes",
      "Ce que nous corrigerions en premier, avec une fourchette de budget",
      "Aucun appel non sollicité : vous décidez de la suite",
    ],
    privacy:
      "Vos réponses servent à préparer cette recommandation, rien d’autre. Pas de revente, pas d’inscription automatique à une lettre d’information, effacement sur simple demande.",
  },

  finalCta: {
    headline: "Chaque semaine, des visiteurs repartent sans vous écrire.",
    subheadline:
      "Nous ouvrons quatre projets par mois pour tenir les 21 jours. Quand le mois est plein, le projet suivant attend le mois d’après.",
    cta: {
      label: "Recevoir ma recommandation écrite",
      href: CTA,
      note: "90 secondes, rien à préparer. Réponse écrite sous 24 h ouvrées.",
    },
    scarcity: "Quatre projets ouverts par mois",
  },

  footer: {
    blurb: `${site.name} conçoit des sites qui produisent des demandes, pour les dirigeants de TPE et PME en France, en Belgique et en Suisse. Le texte avant le dessin.`,
    columns: [
      {
        title: "Studio",
        links: [
          { label: "Méthode", href: "#methode" },
          { label: "Résultats", href: "#realisations" },
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
    label: "Réponse écrite sous 24 h ouvrées",
    cta: { label: "Évaluer mon projet", href: CTA },
  },

  meta: {
    title: "Création de site web pour TPE-PME : prix fixe, 21 jours",
    description:
      "Nous écrivons votre site avant de le dessiner : prix fixe annoncé d’avance, mise en ligne en 21 jours. Recevez votre recommandation écrite sous 24 h ouvrées.",
    ogTitle: "Un site web qui vous amène des clients, pas des compliments.",
    ogDescription:
      "Le texte avant le dessin. Prix fixe, mise en ligne en 21 jours, chaque demande comptée. 90 secondes de questions, une recommandation écrite sous 24 h.",
  },
};
