/**
 * Schema.org JSON-LD generators per page type.
 * Every page emits the appropriate set via the <JsonLd /> component.
 */
import { SITE } from './site';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.publisher,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    telephone: SITE.phone,
    email: SITE.email,
    description: 'Best Direct Cremation — simple, dignified direct cremation delivered locally by independent funeral directors across the UK.',
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
  };
}

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

export function funeralHomeSchema(opts: {
  name: string;
  path: string;
  areaServed: string;
  partnerFd?: { name: string; address?: { street?: string; postcode?: string; latitude?: number; longitude?: number } };
}) {
  const s: any = {
    '@context': 'https://schema.org',
    '@type': 'FuneralHome',
    '@id': `${SITE.url}${opts.path}#funeralhome`,
    name: opts.name,
    url: `${SITE.url}${opts.path}`,
    telephone: SITE.phone,
    priceRange: `${SITE.priceLabel}–${SITE.priceCeiling}`,
    areaServed: { '@type': 'Place', name: opts.areaServed },
    parentOrganization: { '@id': `${SITE.url}/#organization` },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '00:00', closes: '23:59',
    }],
  };
  if (opts.partnerFd?.address) {
    s.address = {
      '@type': 'PostalAddress',
      streetAddress: opts.partnerFd.address.street,
      postalCode: opts.partnerFd.address.postcode,
      addressCountry: 'GB',
    };
    if (opts.partnerFd.address.latitude && opts.partnerFd.address.longitude) {
      s.geo = { '@type': 'GeoCoordinates', latitude: opts.partnerFd.address.latitude, longitude: opts.partnerFd.address.longitude };
    }
  }
  return s;
}

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
    },
  };
}

export function faqPageSchema(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(it => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function articleSchema(opts: { title: string; description: string; path: string; image?: string; datePublished?: string; dateModified?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}${opts.path}` },
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
  };
}

export function jsonLdString(...schemas: any[]) {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : { '@context': 'https://schema.org', '@graph': schemas });
}
