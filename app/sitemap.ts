import type { MetadataRoute } from 'next';
import { sanity } from '@/lib/sanity';
import { sitemapDataQuery } from '@/lib/queries';
import { SITE } from '@/lib/site';

type Row = { slug?: string; county?: string; section?: string; _updatedAt?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await sanity.fetch<{
    counties: Row[];
    towns: Row[];
    partners: Row[];
    articles: Row[];
    generics: Row[];
  }>(sitemapDataQuery);

  const now = new Date();
  const baseUrls: MetadataRoute.Sitemap = [
    { url: SITE.url + '/',                changeFrequency: 'weekly',  priority: 1.0, lastModified: now },
    { url: SITE.url + '/direct-cremation/', changeFrequency: 'weekly',  priority: 0.95, lastModified: now },
    { url: SITE.url + '/funeral-plans/',  changeFrequency: 'weekly',  priority: 0.9, lastModified: now },
    { url: SITE.url + '/coverage/',       changeFrequency: 'weekly',  priority: 0.9, lastModified: now },
    { url: SITE.url + '/providers/',      changeFrequency: 'weekly',  priority: 0.85, lastModified: now },
    { url: SITE.url + '/compare/',        changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: SITE.url + '/cost/',           changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: SITE.url + '/help/',           changeFrequency: 'weekly',  priority: 0.8, lastModified: now },
    { url: SITE.url + '/about/',          changeFrequency: 'monthly', priority: 0.4, lastModified: now },
    { url: SITE.url + '/contact/',        changeFrequency: 'monthly', priority: 0.4, lastModified: now },
  ];

  const countyUrls: MetadataRoute.Sitemap = (data.counties || []).map(r => ({
    url: `${SITE.url}/${r.slug}/`,
    lastModified: r._updatedAt ? new Date(r._updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const townUrls: MetadataRoute.Sitemap = (data.towns || []).map(r => ({
    url: `${SITE.url}/${r.county}/${r.slug}/`,
    lastModified: r._updatedAt ? new Date(r._updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const partnerUrls: MetadataRoute.Sitemap = (data.partners || []).map(r => ({
    url: `${SITE.url}/providers/${r.slug}/`,
    lastModified: r._updatedAt ? new Date(r._updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const articleUrls: MetadataRoute.Sitemap = (data.articles || []).map(r => ({
    url: `${SITE.url}/${r.section === 'funeral-plans' ? 'funeral-plans' : 'help'}/${r.slug}/`,
    lastModified: r._updatedAt ? new Date(r._updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const genericUrls: MetadataRoute.Sitemap = (data.generics || []).map(r => ({
    url: `${SITE.url}/services/${r.slug}/`,
    lastModified: r._updatedAt ? new Date(r._updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...baseUrls, ...countyUrls, ...townUrls, ...partnerUrls, ...articleUrls, ...genericUrls];
}
