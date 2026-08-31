/**
 * MODÈLE À FAIRE VALIDER PAR UN JURISTE AVANT MISE EN LIGNE.
 *
 * Ces deux documents sont un point de départ rédigé pour un studio web qui
 * collecte des prospects via un formulaire et achète de la publicité en
 * ligne. Ils ne constituent pas un conseil juridique.
 *
 * À COMPLÉTER OBLIGATOIREMENT (les valeurs vivent dans `site.ts`, pas ici) :
 *   • `site.legal.company`, `capital`, `siret`, `rcs`, `vat`, `address`
 *     — les identifiants à zéro sont des gabarits, pas des valeurs valides ;
 *   • `site.legal.director` — nom réel du directeur de la publication ;
 *   • `site.legal.host` — à corriger si l’hébergement n’est pas Vercel ;
 *   • `site.contact.email`, `site.contact.privacyEmail` — boîtes réellement
 *     relevées : le second reçoit les demandes d’exercice des droits et doit
 *     être traité sous un mois ;
 *   • `site.legal.updatedAt` — à remettre à jour à chaque révision.
 *
 * À VÉRIFIER AVEC VOS OUTILS RÉELS : la liste des sous-traitants de la
 * section « Destinataires », les durées de conservation, et la présence
 * effective d’un bandeau de consentement si vous déposez des traceurs
 * publicitaires. Le texte décrit ci-dessous un site qui n’en dépose aucun
 * avant le choix du visiteur : votre implémentation doit le respecter.
 */

import { site } from "@/content/site";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  /** Rendered as a list under the paragraphs. */
  bullets?: string[];
};

/** Same shape for both documents so a single page component can render them. */
export type LegalDocument = {
  title: string;
  /** Human-readable date of the last review. */
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
};

const { legal, contact } = site;

export const legalNotice: LegalDocument = {
  title: "Mentions légales",
  updatedAt: legal.updatedAt,
  intro: `Les présentes mentions légales s’appliquent au site ${site.url}, édité par ${legal.company}. Elles précisent l’identité de l’éditeur, celle de l’hébergeur et les conditions d’utilisation du site.`,
  sections: [
    {
      heading: "Éditeur du site",
      paragraphs: [
        `${legal.company}, société par actions simplifiée unipersonnelle au capital de ${legal.capital}, dont le siège social est situé ${legal.address}.`,
      ],
      bullets: [
        `SIRET : ${legal.siret}`,
        `Immatriculation : ${legal.rcs}`,
        `TVA intracommunautaire : ${legal.vat}`,
        `Contact : ${contact.email} / ${contact.phone}`,
      ],
    },
    {
      heading: "Directeur de la publication",
      paragraphs: [
        `${legal.director}, en qualité de représentant légal de ${legal.company}.`,
        `Toute demande relative au contenu éditorial du site peut être adressée à ${contact.email}.`,
      ],
    },
    {
      heading: "Hébergeur",
      paragraphs: [
        `Le site est hébergé par ${legal.host} (${legal.hostUrl}).`,
        "L’hébergeur assure la disponibilité technique du site. Il n’intervient pas sur le contenu publié, qui relève de la seule responsabilité de l’éditeur.",
      ],
    },
    {
      heading: "Propriété intellectuelle",
      paragraphs: [
        `La structure du site, ses textes, ses visuels, son code source et ses éléments graphiques sont la propriété de ${legal.company} ou de ses partenaires. Ils sont protégés par le droit d’auteur et par le droit des marques.`,
        "Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, par quelque procédé que ce soit et sans autorisation écrite préalable, est interdite. Elle constitue une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.",
        "Les marques, noms commerciaux et logos des clients cités sur ce site restent la propriété de leurs titulaires respectifs et sont mentionnés avec leur accord.",
      ],
    },
    {
      heading: "Crédits",
      paragraphs: [
        `Conception, rédaction, design et développement : ${legal.company}.`,
        "Le site est développé avec Next.js et React, deux briques logicielles libres publiées sous licence MIT, et déployé chez l’hébergeur mentionné ci-dessus. Les polices de caractères sont diffusées sous licence libre.",
        "Photographies, illustrations et témoignages : à créditer nommément ici, avec le nom de leur auteur ou la licence applicable, dès que des visuels réels remplacent les éléments de démonstration.",
      ],
    },
    {
      heading: "Responsabilité",
      paragraphs: [
        "Les informations publiées sur ce site sont fournies à titre indicatif. L’éditeur s’efforce d’en assurer l’exactitude et la mise à jour, sans pouvoir garantir qu’elles soient exemptes d’erreurs ou d’omissions.",
        "Les tarifs, délais et périmètres présentés sont des ordres de grandeur. Seule la proposition commerciale signée entre les parties fait foi.",
        "Les résultats chiffrés présentés au titre des réalisations correspondent à des projets précis, mesurés dans les conditions indiquées sur la page. Ils ne constituent ni une moyenne, ni un engagement de performance applicable à un autre projet.",
        "Le site peut contenir des liens vers des sites tiers. L’éditeur n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
      ],
    },
    {
      heading: "Données personnelles et cookies",
      paragraphs: [
        "Le site collecte des données personnelles via son formulaire de qualification et mesure son audience, y compris publicitaire.",
        "Les traitements réalisés, leurs bases légales, leurs durées de conservation et les moyens d’exercer vos droits sont détaillés dans la politique de confidentialité.",
      ],
    },
    {
      heading: "Droit applicable",
      paragraphs: [
        "Les présentes mentions légales sont soumises au droit français.",
        "En cas de litige et à défaut de résolution amiable, compétence est attribuée aux tribunaux du ressort du siège social de l’éditeur, sous réserve des dispositions impératives applicables aux consommateurs.",
      ],
    },
  ],
};

export const privacyPolicy: LegalDocument = {
  title: "Politique de confidentialité",
  updatedAt: legal.updatedAt,
  intro: `Cette page explique quelles données ${legal.company} collecte sur ${site.url}, pourquoi, combien de temps elles sont conservées et comment exercer vos droits au titre du Règlement général sur la protection des données (RGPD). Elle est écrite pour être lue, pas seulement pour être publiée.`,
  sections: [
    {
      heading: "Responsable du traitement",
      paragraphs: [
        `Le responsable du traitement est ${legal.company}, ${legal.address}, immatriculée sous le SIRET ${legal.siret}.`,
        `Pour toute question relative à vos données, écrivez à ${contact.privacyEmail}. Aucun délégué à la protection des données n’a été désigné : les demandes sont traitées directement par la direction.`,
      ],
    },
    {
      heading: "Données que nous collectons",
      paragraphs: [
        "Le formulaire de qualification est le seul endroit du site où vous saisissez des informations vous concernant. Aucun champ n’y est piégé et aucun compte n’est créé.",
      ],
      bullets: [
        "Ce que vous renseignez dans le formulaire : objectif du projet, situation actuelle, secteur d’activité, ville ou zone couverte, adresse de votre site existant, échéance, budget envisagé, canaux d’acquisition utilisés, votre rôle dans la décision, nom et prénom, adresse e-mail, numéro de téléphone, nom de l’entreprise et description libre du projet.",
        "Ce que vous nous transmettez ensuite : contenu de vos e-mails, comptes rendus d’échanges et documents que vous nous communiquez.",
        "Ce qui est collecté automatiquement : adresse IP, type d’appareil et de navigateur, pages consultées, durée de consultation, page ou annonce d’origine et identifiants de campagne publicitaire.",
      ],
    },
    {
      heading: "Pourquoi, et sur quelle base légale",
      paragraphs: [
        "Nous ne traitons vos données que pour les finalités suivantes, chacune rattachée à une base légale précise.",
      ],
      bullets: [
        "Répondre à votre demande, préparer la recommandation écrite et établir une proposition commerciale : exécution de mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).",
        "Exécuter et suivre le contrat lorsque nous travaillons ensemble, facturation comprise : exécution du contrat (article 6.1.b) et respect de nos obligations comptables et fiscales (article 6.1.c).",
        "Vous adresser des informations sur nos services dans le prolongement d’un échange existant : notre intérêt légitime à la prospection entre professionnels (article 6.1.f), avec un lien de désinscription dans chaque message.",
        "Mesurer l’audience du site et la performance de nos campagnes : votre consentement pour les traceurs non essentiels (article 6.1.a), notre intérêt légitime pour la mesure strictement nécessaire au fonctionnement et à la sécurité du site (article 6.1.f).",
      ],
    },
    {
      heading: "Ce que nous ne faisons pas",
      paragraphs: [
        "Nous ne vendons, ne louons ni n’échangeons vos données. Nous ne les utilisons pas pour prendre une décision entièrement automatisée produisant des effets juridiques à votre égard.",
        "Nous ne collectons aucune donnée sensible au sens de l’article 9 du RGPD, et le formulaire n’en demande jamais. Merci de ne pas en faire figurer dans le champ de description libre.",
      ],
    },
    {
      heading: "Combien de temps nous les gardons",
      paragraphs: [
        "Les durées ci-dessous sont des maximums. Une suppression demandée avant leur terme est effectuée sans délai.",
      ],
      bullets: [
        "Prospect sans suite : 3 ans à compter de votre dernier contact, conformément à la recommandation de la CNIL en matière de prospection.",
        "Client : toute la durée de la relation contractuelle, puis 10 ans pour les pièces comptables, conformément au Code de commerce.",
        "Preuve du consentement aux traceurs : 6 mois. Cookies déposés : 13 mois au maximum. Données de fréquentation : 25 mois au maximum.",
        "Au terme de ces durées, les données sont supprimées ou anonymisées de manière irréversible.",
      ],
    },
    {
      heading: "Qui y a accès",
      paragraphs: [
        "Vos données sont accessibles aux seules personnes de notre équipe qui en ont besoin pour traiter votre demande.",
        `Nous faisons appel à des prestataires agissant comme sous-traitants, encadrés par un contrat conforme à l’article 28 du RGPD : notre hébergeur ${legal.host}, notre fournisseur de messagerie professionnelle, notre outil de suivi des demandes, et nos outils de mesure d’audience et de publicité en ligne, dont Google Analytics et Google Ads.`,
        "Vos données peuvent également être communiquées aux autorités administratives ou judiciaires lorsque la loi nous y oblige.",
      ],
    },
    {
      heading: "Transferts hors de l’Union européenne",
      paragraphs: [
        "Certains de ces prestataires sont établis en dehors de l’Union européenne, principalement aux États-Unis.",
        "Les transferts correspondants sont encadrés par les clauses contractuelles types de la Commission européenne, par une décision d’adéquation, notamment le cadre de protection des données UE–États-Unis, et par les mesures supplémentaires exigées par ces mécanismes.",
      ],
    },
    {
      heading: "Cookies et mesure d’audience",
      paragraphs: [
        "Lors de votre première visite, un bandeau vous permet d’accepter ou de refuser les traceurs non essentiels. Aucun traceur publicitaire n’est déposé avant votre choix.",
      ],
      bullets: [
        "Cookies strictement nécessaires : fonctionnement du site, sécurité et mémorisation de votre choix en matière de traceurs. Ils ne requièrent pas votre consentement.",
        "Cookies de mesure d’audience et de publicité : ils nous indiquent quelle annonce ou quelle page a conduit à une demande, mesurent nos campagnes et évitent de vous montrer inutilement la même annonce.",
        "Vous pouvez modifier ou retirer votre consentement à tout moment depuis le lien de gestion des cookies en pied de page, ou en configurant votre navigateur. Le retrait ne remet pas en cause la licéité des traitements déjà réalisés.",
      ],
    },
    {
      heading: "Vos droits",
      paragraphs: [
        "Vous disposez sur vos données des droits suivants, que vous pouvez exercer gratuitement.",
      ],
      bullets: [
        "Accès : obtenir une copie des données que nous détenons sur vous.",
        "Rectification : faire corriger une information inexacte ou incomplète.",
        "Effacement : demander la suppression de vos données, sous réserve de nos obligations légales de conservation.",
        "Limitation : demander le gel d’un traitement le temps d’une vérification.",
        "Opposition : vous opposer à tout moment aux traitements fondés sur notre intérêt légitime, dont la prospection.",
        "Portabilité : récupérer dans un format lisible les données que vous nous avez fournies.",
        "Retrait du consentement : revenir à tout moment sur l’accord donné aux traceurs.",
        "Directives post-mortem : définir le sort de vos données après votre décès.",
      ],
    },
    {
      heading: "Comment les exercer",
      paragraphs: [
        `Écrivez à ${contact.privacyEmail}, ou par courrier à ${legal.company}, ${legal.address}. Précisez le droit que vous souhaitez exercer.`,
        "Nous répondons dans un délai d’un mois à compter de la réception de la demande. Une pièce justificative d’identité peut vous être demandée en cas de doute raisonnable sur votre identité.",
        "Si notre réponse ne vous satisfait pas, vous pouvez saisir la Commission nationale de l’informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou déposer une réclamation sur cnil.fr.",
      ],
    },
    {
      heading: "Sécurité",
      paragraphs: [
        "Nous mettons en œuvre des mesures techniques et organisationnelles adaptées : chiffrement des échanges en HTTPS, authentification forte sur les outils, accès limité aux personnes habilitées et sauvegardes régulières.",
        "En cas de violation de données susceptible d’engendrer un risque élevé pour vos droits et libertés, nous vous en informons dans les conditions prévues par l’article 34 du RGPD.",
      ],
    },
    {
      heading: "Modification de cette politique",
      paragraphs: [
        `Cette politique peut être mise à jour pour tenir compte d’évolutions légales ou techniques. La date de dernière révision figure en tête de page : ${legal.updatedAt}.`,
        "En cas de modification substantielle, nous en informons les personnes concernées par un moyen approprié.",
      ],
    },
  ],
};

/** Both documents, keyed by the route that renders them. */
export const legalDocuments = {
  "/mentions-legales": legalNotice,
  "/confidentialite": privacyPolicy,
} as const;
