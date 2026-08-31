# Site de conversion — studio de création de sites web

Landing page Next.js conçue pour recevoir du trafic publicitaire payant (Google Ads) sur des requêtes du type « création site web + [ville] », et le transformer en demandes qualifiées.

L’événement de conversion n’est volontairement pas une « demande de devis » mais un **formulaire de qualification en six questions** au terme duquel le visiteur reçoit une recommandation écrite.

---

## Démarrage

```bash
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000.

| Commande            | Rôle                                        |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Serveur de développement                    |
| `npm run build`     | Build de production                         |
| `npm run start`     | Sert le build de production                 |
| `npm run typecheck` | Vérification TypeScript                     |
| `npm run lint`      | ESLint                                      |
| `npm run lint:fix`  | ESLint avec correction automatique          |

---

## Ce qu’il faut personnaliser avant la mise en ligne

Tout le contenu est séparé du code, dans `src/content/`. Vous n’avez pas besoin de toucher aux composants.

| Fichier                  | Contenu                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- |
| `src/content/site.ts`    | Marque, coordonnées, mentions légales, zones desservies                        |
| `src/content/copy.ts`    | **Tout le texte visible** de la page                                           |
| `src/content/cities.ts`  | Les villes qui génèrent une page locale                                        |
| `src/content/legal.ts`   | Mentions légales et politique de confidentialité                               |
| `src/content/schema.ts`  | Typage du contenu — ne pas modifier sans adapter les composants                |

### À remplacer impérativement

Les valeurs livrées sont des **gabarits**, pas des données réelles :

- `site.contact` — e-mail, téléphone et adresse de traitement des données réellement relevés.
- `site.legal` — raison sociale, capital, SIRET, RCS, TVA, adresse, directeur de la publication.
- `site.url` — le domaine final (ou la variable d’environnement `NEXT_PUBLIC_SITE_URL`).
- Les **témoignages** et les **chiffres de résultats** dans `copy.ts` : ce sont des exemples. Publier des résultats clients non vérifiés vous expose, et un prospect qui découvre qu’un témoignage est faux ne revient pas. Remplacez-les par vos vrais cas, avec l’accord écrit des clients concernés.
- Les **mentions légales** et la **politique de confidentialité** : le texte est un modèle sérieux, à faire relire avant publication.

---

## Réception des demandes du formulaire

Le formulaire envoie sur `POST /api/lead`. **Aucune variable d’environnement n’est obligatoire** : sans configuration, la route valide la demande, la journalise côté serveur et répond correctement. Le site fonctionne donc dès le premier déploiement.

Pour recevoir réellement les demandes, définissez l’une ou l’autre de ces variables dans Vercel (Settings → Environment Variables) :

| Variable               | Effet                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `LEAD_WEBHOOK_URL`     | Relaie chaque demande en JSON. Compatible Make, Zapier, n8n, Slack, Google Sheets.    |
| `RESEND_API_KEY`       | Envoie un e-mail via Resend.                                                          |
| `LEAD_EMAIL_TO`        | Destinataire de l’e-mail (requis si `RESEND_API_KEY` est défini).                     |
| `LEAD_EMAIL_FROM`      | Expéditeur, sur un domaine vérifié chez Resend.                                       |
| `NEXT_PUBLIC_SITE_URL` | Domaine final, utilisé pour les URL canoniques, le sitemap et Open Graph.             |

Chaque demande est accompagnée d’un **score de 0 à 100** calculé à partir du budget, de l’échéance et de l’objectif déclarés, pour vous permettre de rappeler les meilleurs dossiers en premier.

---

## Suivi des conversions

`src/lib/analytics.ts` expose une fonction `track()` qui pousse les événements vers `dataLayer` (Google Tag Manager / Google Ads), Plausible et Umami, **sans charger le moindre script**. Installez le tag de votre choix dans `src/app/layout.tsx` et les événements remonteront automatiquement.

Événements émis : `cta_click`, `form_start`, `form_step_complete`, `form_submit`, `form_error`, `phone_click`, `showcase_3d_loaded`.

Pour Google Ads, la conversion la plus fiable à déclarer est le chargement de la page `/merci`.

---

## Pages locales pour vos campagnes

Chaque entrée de `src/content/cities.ts` génère une page statique à l’adresse `/creation-site-web/<slug>` — par exemple `/creation-site-web/lyon`.

Le titre principal, la balise `title` et les données structurées reprennent le nom de la ville. Envoyez chaque groupe d’annonces sur la page correspondante : cette correspondance entre la requête et le titre est généralement le levier qui pèse le plus sur le taux de conversion, et elle améliore le score de qualité dans Google Ads.

Ajouter une ville consiste à ajouter un objet dans le tableau : la page, le sitemap et les liens internes suivent.

---

## Déploiement sur Vercel

1. Poussez le dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com), **Add New → Project**, puis importez le dépôt.
3. Vercel détecte Next.js seul ; ne modifiez aucun réglage de build.
4. Ajoutez vos variables d’environnement, puis **Deploy**.

Chaque `git push` sur la branche principale redéploie le site. Les autres branches produisent une URL de prévisualisation.

## Brancher un domaine acheté chez Hostinger

Dans Vercel : **Project → Settings → Domains → Add**, saisissez votre domaine (par exemple `mondomaine.fr`). Vercel affiche alors les enregistrements à créer.

Dans Hostinger : **Domaines → votre domaine → DNS / Serveurs de noms → Gérer les enregistrements DNS**.

Deux options.

**Option A — garder les DNS chez Hostinger** (la plus simple)

Supprimez les enregistrements `A` et `CNAME` existants pour `@` et `www`, puis créez :

| Type    | Nom   | Valeur                 | TTL     |
| ------- | ----- | ---------------------- | ------- |
| `A`     | `@`   | `76.76.21.21`          | 14400   |
| `CNAME` | `www` | `cname.vercel-dns.com` | 14400   |

**Vérifiez toujours ces valeurs dans l’écran Vercel** : ce sont celles que Vercel indique qui font foi, elles peuvent évoluer.

**Option B — déléguer les DNS à Vercel**

Dans Hostinger, section **Serveurs de noms**, choisissez « Changer les serveurs de noms » et saisissez ceux fournis par Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`). Vercel gère alors l’ensemble de votre zone DNS. À éviter si vos e-mails professionnels dépendent d’enregistrements MX configurés chez Hostinger, sauf à les recréer côté Vercel.

La propagation prend de quelques minutes à quelques heures. Le certificat HTTPS est émis automatiquement par Vercel une fois le domaine vérifié.

Pensez ensuite à mettre `NEXT_PUBLIC_SITE_URL` à la valeur du domaine final et à redéployer, pour que le sitemap et les URL canoniques pointent au bon endroit.

---

## Choix techniques

- **Next.js 16** (App Router) et **React 19**. Les sections sont des composants serveur ; seuls le header, le formulaire, la barre CTA mobile et l’accordéon sont hydratés.
- **Tailwind CSS v4** en configuration CSS-first : tous les jetons de design sont dans `src/app/globals.css`.
- **shadcn/ui** pour les primitives accessibles, restylées pour ne pas avoir l’air d’un thème par défaut.
- **Aucune librairie d’animation.** Les apparitions au scroll reposent sur un `IntersectionObserver` de quelques lignes (`src/hooks/use-in-view.ts`) et des transitions CSS. Cela économise plusieurs dizaines de kilo-octets de JavaScript, ce qui compte quand chaque visiteur est payé.
- **Thème clair uniquement**, typographie sans empattement et de graisse fine.
- Toutes les animations respectent `prefers-reduced-motion`.

### Le modèle 3D

`public/models/iphone.glb` est le modèle fourni, optimisé de 4,56 Mo à 634 Ko (quantification des maillages, textures converties en WebP). Il ne nécessite aucun décodeur externe.

Il n’est chargé qu’en enrichissement progressif : uniquement sur grand écran, avec un pointeur précis, hors mode « économie de données » et hors `prefers-reduced-motion`. Sur mobile, un mockup en HTML et CSS pur est affiché à la place. Le code de la 3D ne fait donc jamais partie du JavaScript initial de la page.

### Outil de capture

`scripts/screenshot.mjs` pilote Chrome sans aucune dépendance, avec émulation mobile, capture pleine page et défilement préalable (nécessaire pour déclencher les apparitions au scroll).

```bash
node scripts/screenshot.mjs http://localhost:3000 /tmp/desktop.png --full
node scripts/screenshot.mjs http://localhost:3000 /tmp/mobile.png --width=390 --height=844 --mobile --full
```
