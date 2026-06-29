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
