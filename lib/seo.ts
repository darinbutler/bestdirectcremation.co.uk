/**
 * Schema.org JSON-LD generators per page type.
 * Every page emits the appropriate set via the <JsonLd /> component.
 *
 * Strategy:
 *   - Organization + WebSite emitted in root layout (every page).
 *   - Page-specific schemas added per route (LocalBusiness for localities,
 *     Article for help/FP, Product for plans, HowTo for process articles,
 *     Speakable on FAQ for voice search).
 *   - Each schema uses stable @id values so Google can resolve relationships.
 */
import { SITE } from './site';

// ============================================================
// ORG + SITE  (root layout)
// ============================================================

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.publisher,
    alternateName: 'BDC',
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/logo.png`,
      width: 600,
      height: 120,
    },
    telephone: SITE.phone,
    email: SITE.email,
    description: 'Best Direct Cremation — simple, dignified direct cremation delivered locally by independent funeral directors across the UK. £1,499 all-inclusive.',
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: 'English',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    sameAs: [
      'http://www.facebook.com/bestfuneral',
      'https://www.instagram.com/bestfunerals/',
    ],
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'en-GB',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ============================================================
// BREADCRUMBS
// ============================================================

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

// ============================================================
// LOCAL BUSINESS  (county / town pages)
// ============================================================

export function localBusinessSchema(opts: {
  name: string;
  path: string;
  areaServed: string;
  description?: string;
  geo?: { latitude: number; longitude: number };
  address?: { street?: string; locality?: string; region?: string; postcode?: string };
}) {
  const s: any = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FuneralHome'],
    '@id': `${SITE.url}${opts.path}#localbusiness`,
    name: opts.name,
    url: `${SITE.url}${opts.path}`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: `${SITE.priceLabel}–${SITE.priceCeiling}`,
    description: opts.description || `Direct cremation in ${opts.areaServed} from ${SITE.priceLabel}, delivered locally by a vetted independent funeral director.`,
    image: `${SITE.url}/logo.png`,
    parentOrganization: { '@id': `${SITE.url}/#organization` },
    areaServed: { '@type': 'Place', name: opts.areaServed },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '00:00', closes: '23:59',
    }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Direct cremation services in ${opts.areaServed}`,
      itemListElement: [{
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Direct cremation' },
        price: 1499, priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
      }],
    },
  };
  if (opts.address) {
    s.address = {
      '@type': 'PostalAddress',
      streetAddress: opts.address.street,
      addressLocality: opts.address.locality,
      addressRegion: opts.address.region,
      postalCode: opts.address.postcode,
      addressCountry: 'GB',
    };
  }
  if (opts.geo) {
    s.geo = { '@type': 'GeoCoordinates', latitude: opts.geo.latitude, longitude: opts.geo.longitude };
  }
  return s;
}

// Backwards-compatible alias — older pages still import funeralHomeSchema
export function funeralHomeSchema(opts: {
  name: string;
  path: string;
  areaServed: string;
  partnerFd?: { name: string; address?: { street?: string; postcode?: string; latitude?: number; longitude?: number } };
}) {
  return localBusinessSchema({
    name: opts.name,
    path: opts.path,
    areaServed: opts.areaServed,
    address: opts.partnerFd?.address ? {
      street: opts.partnerFd.address.street,
      postcode: opts.partnerFd.address.postcode,
      region: opts.areaServed,
    } : undefined,
    geo: (opts.partnerFd?.address?.latitude && opts.partnerFd?.address?.longitude)
      ? { latitude: opts.partnerFd.address.latitude, longitude: opts.partnerFd.address.longitude }
      : undefined,
  });
}

// ============================================================
// SERVICE  (locality + homepage)
// ============================================================

export function serviceSchema(opts: { areaServed: string; path: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}${opts.path}#service`,
    serviceType: 'Direct cremation',
    name: `Direct cremation in ${opts.areaServed}`,
    description: opts.description,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: { '@type': 'Place', name: opts.areaServed },
    offers: {
      '@type': 'Offer',
      price: 1499, priceCurrency: 'GBP',
      url: `${SITE.url}${opts.path}`,
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
    },
  };
}

// ============================================================
// PRODUCT  (funeral plan pages — preserves Pricing & availability)
// ============================================================

export function productSchema(opts: {
  name: string;
  path: string;
  description: string;
  price?: number;
  brand?: string;
  image?: string;
}) {
  const s: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE.url}${opts.path}#product`,
    name: opts.name,
    description: opts.description,
    brand: { '@type': 'Brand', name: opts.brand || SITE.name },
    image: opts.image,
  };
  if (opts.price) {
    s.offers = {
      '@type': 'Offer',
      price: opts.price,
      priceCurrency: 'GBP',
      url: `${SITE.url}${opts.path}`,
      availability: 'https://schema.org/PreOrder',
      seller: { '@id': `${SITE.url}/#organization` },
    };
  }
  return s;
}

// ============================================================
// FAQ + SPEAKABLE  (voice search optimisation)
// ============================================================

export function faqPageSchema(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(it => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.faq-question', '.faq-answer'],
    },
  };
}

// ============================================================
// ARTICLE  (help + funeral plans articles)
// ============================================================

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
  wordCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE.url}${opts.path}#article`,
    headline: opts.title,
    description: opts.description,
    image: opts.image
      ? { '@type': 'ImageObject', url: opts.image, width: 1200, height: 630 }
      : `${SITE.url}/logo.png`,
    datePublished: opts.datePublished || new Date().toISOString(),
    dateModified: opts.dateModified || new Date().toISOString(),
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}${opts.path}` },
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
    articleSection: opts.section,
    wordCount: opts.wordCount,
  };
}

// ============================================================
// HOWTO  (process-oriented articles)
// ============================================================

export function howToSchema(opts: {
  name: string;
  path: string;
  description: string;
  totalTime?: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE.url}${opts.path}#howto`,
    name: opts.name,
    description: opts.description,
    totalTime: opts.totalTime,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// ============================================================
// REVIEW + AGGREGATE RATING  (partner pages)
// ============================================================

export function aggregateRatingSchema(opts: { rating: number; reviewCount: number }) {
  return {
    '@type': 'AggregateRating',
    ratingValue: opts.rating,
    reviewCount: opts.reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}

// ============================================================
// HELPER — emit one or many schemas in a single graph
// ============================================================

export function jsonLdString(...schemas: any[]) {
  if (schemas.length === 0) return '';
  return JSON.stringify(schemas.length === 1 ? schemas[0] : { '@context': 'https://schema.org', '@graph': schemas });
}
