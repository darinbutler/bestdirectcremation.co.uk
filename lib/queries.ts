/**
 * GROQ queries — every page that reads from Sanity uses one of these.
 */
import { groq } from 'next-sanity';

export const allCountySlugsQuery = groq`*[_type == "county" && defined(slug.current)][].slug.current`;
export const allTownPathsQuery = groq`
  *[_type == "town" && defined(slug.current) && defined(county->slug.current)]{
    "county": county->slug.current,
    "town":   slug.current,
  }
`;
export const allPartnerSlugsQuery = groq`*[_type == "partner" && defined(slug.current)][].slug.current`;
export const allArticleSlugsQuery = groq`*[_type == "article" && defined(slug.current)]{ "slug": slug.current, section }`;
export const allGenericSlugsQuery = groq`*[_type == "genericTerm" && defined(slug.current)][].slug.current`;

export const countyBySlugQuery = groq`
  *[_type == "county" && slug.current == $slug][0]{
    _id, name, "slug": slug.current, country, region, population, postcodePrefixes,
    coverageStatus,
    crematoria,
    registerOffices,
    "partnerFds": partnerFds[]->{ _id, name, "slug": slug.current, logo, accreditation },
    "cities":     cities[]->{ _id, name, "slug": slug.current, population, coverageStatus },
    longFormSections,
    faqs,
    seo,
    lastReviewed,
  }
`;

export const townByPathQuery = groq`
  *[_type == "town" && slug.current == $town && county->slug.current == $county][0]{
    _id, name, "slug": slug.current, population, postcodePrefix, coverageStatus,
    "county": county->{ _id, name, "slug": slug.current, country, region },
    "partnerFd": partnerFd->{ _id, name, "slug": slug.current, logo, accreditation, hqAddress, established },
    "alternateFds": alternateFds[]->{ _id, name, "slug": slug.current },
    nearestCrematoria,
    registerOffice,
    uniqueLocalAngle,
    longFormSections,
    faqs,
    seo,
    lastReviewed,
  }
`;

export const partnerBySlugQuery = groq`
  *[_type == "partner" && slug.current == $slug][0]{
    _id, name, "slug": slug.current, established,
    hqAddress { street, postcode, latitude, longitude, "town": town->{ name, "slug": slug.current } },
    "townsServed": townsServed[]->{ name, "slug": slug.current, "county": county->{ name, "slug": slug.current } },
    accreditation, facilities, bio, reviewCount, reviewRating,
    logo, photos, openingHours, seo,
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug && section == $section][0]{
    _id, title, "slug": slug.current, section, intent, excerpt, heroImage, body, faqs,
    "relatedArticles": relatedArticles[]->{ title, "slug": slug.current, section, excerpt, heroImage },
    lastReviewed, seo,
  }
`;

export const genericTermBySlugQuery = groq`
  *[_type == "genericTerm" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, modifier, serviceNoun,
    intentMatch, longForm, showPriceLadder, showComparisonStrip, faqs, seo,
  }
`;

// For /coverage/ hub
export const allCountiesForHubQuery = groq`
  *[_type == "county" && defined(slug.current)] | order(name asc){
    name, "slug": slug.current, country, region, coverageStatus,
  }
`;

// All generic-term landers for /services/ hub
export const allGenericTermsQuery = groq`
  *[_type == "genericTerm" && defined(slug.current)] | order(title asc) {
    title, "slug": slug.current, modifier, serviceNoun, intentMatch,
  }
`;

// All funeral-plans cluster docs for /funeral-plans/ hub
export const allFuneralPlansQuery = groq`
  *[_type == "article" && section == "funeral-plans" && defined(slug.current)] | order(title asc) {
    title, "slug": slug.current, excerpt, intent,
  }
`;

// All help articles for /help/ hub
export const allHelpArticlesQuery = groq`
  *[_type == "article" && section == "help" && defined(slug.current)] | order(title asc) {
    title, "slug": slug.current, excerpt, intent,
  }
`;

// Cross-section search — counties, towns, articles, generics in one query.
// $q is a case-insensitive substring matcher; matches title, slug, excerpt.
// Glossary terms are searched separately on the client (they live in lib/glossary.ts, not Sanity).
export const searchQuery = groq`{
  "counties": *[_type == "county" && (name match $qstar || slug.current match $qstar)] | order(name asc) [0...10] {
    "type": "county", name, "slug": slug.current, country,
  },
  "towns": *[_type == "town" && (name match $qstar || slug.current match $qstar)] | order(name asc) [0...10] {
    "type": "town", name, "slug": slug.current, "county": county->slug.current,
  },
  "help": *[_type == "article" && section == "help" && (title match $qstar || excerpt match $qstar)] | order(title asc) [0...8] {
    "type": "help", title, "slug": slug.current, excerpt,
  },
  "funeralPlans": *[_type == "article" && section == "funeral-plans" && (title match $qstar || excerpt match $qstar)] | order(title asc) [0...8] {
    "type": "fp", title, "slug": slug.current, excerpt,
  },
  "comparisons": *[_type == "article" && section == "compare" && (title match $qstar || excerpt match $qstar)] | order(title asc) [0...8] {
    "type": "compare", title, "slug": slug.current, excerpt,
  },
  "generics": *[_type == "genericTerm" && (title match $qstar || serviceNoun match $qstar)] | order(title asc) [0...8] {
    "type": "generic", title, "slug": slug.current,
  },
}`;

// All comparison articles for /compare/ hub
export const allCompareArticlesQuery = groq`
  *[_type == "article" && section == "compare" && defined(slug.current)] | order(title asc) {
    title, "slug": slug.current, excerpt,
  }
`;

// Nearby counties in the same country — excludes self
export const nearbyCountiesQuery = groq`
  *[_type == "county" && country == $country && slug.current != $excludeSlug] | order(name asc) [0...4]{
    name, "slug": slug.current,
  }
`;

// Sibling towns within the same county — excludes self
export const siblingTownsQuery = groq`
  *[_type == "town" && county->slug.current == $countySlug && slug.current != $excludeSlug] | order(name asc) [0...6]{
    name, "slug": slug.current,
  }
`;

// Related articles in the same section (help OR funeral-plans), excludes self
export const relatedArticlesQuery = groq`
  *[_type == "article" && section == $section && slug.current != $excludeSlug] | order(_updatedAt desc) [0...3]{
    title, "slug": slug.current, excerpt,
  }
`;

// For sitemap.xml
export const sitemapDataQuery = groq`{
  "counties": *[_type == "county" && defined(slug.current)]{ "slug": slug.current, lastReviewed, _updatedAt },
  "towns":    *[_type == "town" && defined(slug.current) && defined(county->slug.current)]{
                "slug": slug.current, "county": county->slug.current, _updatedAt },
  "partners": *[_type == "partner" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "articles": *[_type == "article" && defined(slug.current)]{ "slug": slug.current, section, _updatedAt },
  "generics": *[_type == "genericTerm" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
}`;

export const siteSettingsQuery = groq`*[_id == "siteSettings"][0]`;
