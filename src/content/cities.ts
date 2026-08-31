/**
 * Landing pages for geo-targeted paid search.
 *
 * One static page per city at `/creation-site-web/<slug>`, so an ad group
 * targeting "création site web lyon" can send traffic to a page whose
 * headline repeats the query. That message match is usually worth more on
 * the conversion rate than anything else you can change on the page.
 *
 * Add a city by appending an entry: the route, the sitemap and the internal
 * links all derive from this list.
 */

export type City = {
  slug: string;
  /** Display name, e.g. "Lyon". */
  name: string;
  /** Preposition + name, e.g. "à Lyon", "au Havre". */
  locative: string;
  /** Department, canton or province, used for reassurance in the copy. */
  area: string;
  country: "FR" | "BE" | "CH";
  /** One concrete local angle. Keep it honest and verifiable. */
  angle: string;
};

export const cities: City[] = [
  {
    slug: "paris",
    name: "Paris",
    locative: "à Paris",
    area: "Île-de-France",
    country: "FR",
    angle:
      "Le marché parisien est le plus concurrentiel de France : votre site doit se différencier en une phrase, pas en dix pages.",
  },
  {
    slug: "lyon",
    name: "Lyon",
    locative: "à Lyon",
    area: "Rhône",
    country: "FR",
    angle:
      "Beaucoup d’entreprises lyonnaises achètent de la publicité locale sans page dédiée : c’est là que part le budget.",
  },
  {
    slug: "marseille",
    name: "Marseille",
    locative: "à Marseille",
    area: "Bouches-du-Rhône",
    country: "FR",
    angle:
      "Le trafic marseillais est très majoritairement mobile : un site lent coûte directement des demandes.",
  },
  {
    slug: "bordeaux",
    name: "Bordeaux",
    locative: "à Bordeaux",
    area: "Gironde",
    country: "FR",
    angle:
      "Artisanat haut de gamme et services aux particuliers : la preuve visuelle du travail fini fait la différence.",
  },
  {
    slug: "toulouse",
    name: "Toulouse",
    locative: "à Toulouse",
    area: "Haute-Garonne",
    country: "FR",
    angle:
      "Marché B2B dense : un parcours de contact clair vaut mieux qu’une plaquette institutionnelle.",
  },
  {
    slug: "nantes",
    name: "Nantes",
    locative: "à Nantes",
    area: "Loire-Atlantique",
    country: "FR",
    angle:
      "Beaucoup de jeunes structures : le site doit crédibiliser avant même le premier échange.",
  },
  {
    slug: "lille",
    name: "Lille",
    locative: "à Lille",
    area: "Nord",
    country: "FR",
    angle:
      "Zone de chalandise transfrontalière : la page doit dire clairement où vous intervenez.",
  },
  {
    slug: "strasbourg",
    name: "Strasbourg",
    locative: "à Strasbourg",
    area: "Bas-Rhin",
    country: "FR",
    angle:
      "Clientèle souvent bilingue : mieux vaut une page nette en français qu’un site à moitié traduit.",
  },
  {
    slug: "nice",
    name: "Nice",
    locative: "à Nice",
    area: "Alpes-Maritimes",
    country: "FR",
    angle:
      "Forte saisonnalité : les campagnes doivent envoyer sur une page qui convertit dès la première visite.",
  },
  {
    slug: "rennes",
    name: "Rennes",
    locative: "à Rennes",
    area: "Ille-et-Vilaine",
    country: "FR",
    angle:
      "Réseau local très actif : les recommandations amènent du trafic direct, qui doit trouver où vous écrire.",
  },
  {
    slug: "montpellier",
    name: "Montpellier",
    locative: "à Montpellier",
    area: "Hérault",
    country: "FR",
    angle:
      "Beaucoup d’indépendants : la question du prix doit être traitée sur la page, pas repoussée à l’appel.",
  },
  {
    slug: "annecy",
    name: "Annecy",
    locative: "à Annecy",
    area: "Haute-Savoie",
    country: "FR",
    angle:
      "Clientèle exigeante sur la finition : le niveau de détail du site est lu comme le niveau de détail du travail.",
  },
  {
    slug: "bruxelles",
    name: "Bruxelles",
    locative: "à Bruxelles",
    area: "Région bruxelloise",
    country: "BE",
    angle:
      "Marché bilingue : nous livrons en français, et en néerlandais ou en anglais si votre clientèle l’exige.",
  },
  {
    slug: "liege",
    name: "Liège",
    locative: "à Liège",
    area: "Province de Liège",
    country: "BE",
    angle:
      "Tissu de PME familiales : la preuve par les chantiers et les clients pèse plus que le discours.",
  },
  {
    slug: "geneve",
    name: "Genève",
    locative: "à Genève",
    area: "Canton de Genève",
    country: "CH",
    angle:
      "Prestations à forte valeur : le site doit justifier un tarif élevé dès la première section.",
  },
  {
    slug: "lausanne",
    name: "Lausanne",
    locative: "à Lausanne",
    area: "Canton de Vaud",
    country: "CH",
    angle:
      "Clientèle qui compare peu mais vérifie beaucoup : la crédibilité prime sur la promesse.",
  },
];

export const cityBySlug = new Map(cities.map((city) => [city.slug, city]));
