/**
 * WordPress → new-site 301 redirects.
 *
 * Read by next.config.mjs at build time and served by Vercel's edge on every
 * request. Adding a redirect here is a build-time change — you must redeploy
 * for it to take effect.
 *
 * This is a plain .mjs file (not .ts) so Next.js can import it directly
 * inside next.config.mjs without a TypeScript pass. Types are documented
 * via JSDoc.
 *
 * @typedef {{ source: string, destination: string, permanent: boolean }} RedirectRule
 *
 * Housekeeping notes for the team:
 *   • Every source must match the OLD trailing-slash convention. WordPress
 *     usually served with trailing slash — check GSC to be sure.
 *   • For dynamic segments use `:slug*` (matches everything after) — Next.js
 *     re-emits it in the destination.
 *   • Order matters. First match wins. Put specific rules before wildcards.
 *   • To populate GSC top-page redirects: run
 *       npx tsx scripts/scrape-wp-sitemap.ts
 *     to fetch the live WP sitemap, then hand-map the top-clicked URLs into
 *     `gscTopPageRedirects` below.
 */

/** @type {RedirectRule[]} */
const structuralRedirects = [
  { source: '/direct-cremations',              destination: '/direct-cremation/', permanent: true },
  { source: '/direct-cremations/',             destination: '/direct-cremation/', permanent: true },
  { source: '/help-and-guidance',              destination: '/help/', permanent: true },
  { source: '/help-and-guidance/',             destination: '/help/', permanent: true },
  { source: '/help-and-guidance/:slug*',       destination: '/help/:slug*', permanent: true },
  { source: '/direct-cremation-providers',     destination: '/providers/', permanent: true },
  { source: '/direct-cremation-providers/',    destination: '/providers/', permanent: true },
  { source: '/direct-cremation-providers/:slug*', destination: '/providers/:slug*', permanent: true },
  { source: '/about-us',                       destination: '/about/', permanent: true },
  { source: '/about-us/',                      destination: '/about/', permanent: true },
  { source: '/contact-us',                     destination: '/contact/', permanent: true },
  { source: '/contact-us/',                    destination: '/contact/', permanent: true },
  { source: '/privacy',                        destination: '/privacy-policy/', permanent: true },
  { source: '/privacy/',                       destination: '/privacy-policy/', permanent: true },
  { source: '/terms',                          destination: '/terms-and-conditions/', permanent: true },
  { source: '/terms/',                         destination: '/terms-and-conditions/', permanent: true },

  // WordPress author / tag / category patterns → funnel to hubs
  { source: '/author/:slug*',                  destination: '/', permanent: true },
  { source: '/category/:slug*',                destination: '/help/', permanent: true },
  { source: '/tag/:slug*',                     destination: '/help/', permanent: true },

  // WordPress feeds
  { source: '/feed',                           destination: '/', permanent: true },
  { source: '/feed/',                          destination: '/', permanent: true },
  { source: '/comments/feed',                  destination: '/', permanent: true },
  { source: '/comments/feed/',                 destination: '/', permanent: true },

  // WP admin / login
  { source: '/wp-admin/:slug*',                destination: '/', permanent: true },
  { source: '/wp-login.php',                   destination: '/', permanent: true },
];

/** @type {RedirectRule[]} */
const localityPatternRedirects = [
  { source: '/direct-cremation-in-:slug',      destination: '/:slug/', permanent: true },
  { source: '/direct-cremation-in-:slug/',     destination: '/:slug/', permanent: true },
  { source: '/direct-cremation-:slug',         destination: '/:slug/', permanent: true },
  { source: '/direct-cremation-:slug/',        destination: '/:slug/', permanent: true },
];

/**
 * Populated by hand after running:
 *    npx tsx scripts/scrape-wp-sitemap.ts
 * Review the CSV output at outputs/wp-sitemap-scrape.csv and add each
 * top-ranking URL below with its new-site destination.
 *
 * @type {RedirectRule[]}
 */
const gscTopPageRedirects = [
  // Example entries — replace with real ones once you have GSC data:
  // { source: '/blog/what-is-direct-cremation/', destination: '/direct-cremation/', permanent: true },
];

/** @type {RedirectRule[]} */
export const allRedirects = [
  ...gscTopPageRedirects,
  ...structuralRedirects,
  ...localityPatternRedirects,
];
