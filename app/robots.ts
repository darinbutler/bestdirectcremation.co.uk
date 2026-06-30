import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/',          // Sanity Studio
          '/api/',             // API routes
          '/_next/',           // Next.js internals
          '/admin/',           // Future admin area
          '/*?*',              // Query string variants (avoid duplicate content)
        ],
      },
      // Block bad-faith scrapers; explicit allow for major search engines
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    sitemap: [
      `${SITE.url}/sitemap.xml`,
      `${SITE.url}/sitemap-images.xml`,
    ],
    host: SITE.url,
  };
}
