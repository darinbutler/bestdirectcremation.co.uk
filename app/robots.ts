import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * robots.txt policy.
 *
 * Structure:
 *   1) Blanket allow for all user-agents, minus sensitive paths.
 *   2) Explicit ALLOW for good search + AI bots (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot).
 *   3) Explicit DISALLOW for known scraper / adversarial / SEO-mining bots — Ahrefs, Semrush,
 *      Majestic (MJ12), DotBot, Bytespider, CCBot, Amazonbot, Applebot-Extended,
 *      DataForSeoBot, PetalBot, YisouSpider, MegaIndex, DuckAssistBot.
 *
 * Why block them:
 *   - Ahrefs / Semrush / MJ12 / DotBot: siphon our content for competitor SEO tools without
 *     driving traffic to us.
 *   - Bytespider (TikTok/ByteDance) and CCBot (Common Crawl): scrape aggressively, contribute
 *     little / no traffic. CCBot is the training-data feeder for many models we don't want
 *     benefiting from our content uncompensated.
 *   - Amazonbot / Applebot-Extended: AI-training crawlers, no meaningful traffic benefit.
 *   - Well-behaved bots (Googlebot, Bingbot, PerplexityBot, GPTBot, ClaudeBot) DO honour the
 *     ban; adversarial bots often don't — for those we back this up with server-side rate
 *     limiting / IP blocks separately if scraping becomes a problem.
 */
export default function robots(): MetadataRoute.Robots {
  const BAD_BOTS = [
    // SEO-mining bots (compete with us; drive no traffic)
    'AhrefsBot', 'AhrefsSiteAudit',
    'SemrushBot', 'SemrushBot-BA', 'SemrushBot-SI', 'SemrushBot-CT',
    'MJ12bot',
    'DotBot',
    'DataForSeoBot',
    'BLEXBot',
    'MegaIndex.ru',
    'MegaIndex',
    'SEOkicks',
    'Seekport',
    // Aggressive crawlers with little traffic upside
    'Bytespider',
    'PetalBot',
    'YisouSpider',
    'YandexBot',
    'MauiBot',
    'ZoominfoBot',
    'SerpstatBot',
    'linkfluence',
    // AI-training crawlers we don't want feeding models without partnership
    'CCBot',
    'Amazonbot',
    'Applebot-Extended',
    'Diffbot',
    'FacebookBot',
    'Meta-ExternalAgent',
    'Meta-ExternalFetcher',
    'ImagesiftBot',
    'omgili',
    'omgilibot',
    'DuckAssistBot',
  ];

  return {
    rules: [
      // 1) Default policy for anything not called out explicitly below
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

      // 2) Explicit allow for the search + AI bots that DO drive real traffic
      { userAgent: 'Googlebot',      allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Bingbot',        allow: '/' },
      { userAgent: 'DuckDuckBot',    allow: '/' },
      { userAgent: 'GPTBot',         allow: '/' },
      { userAgent: 'ChatGPT-User',   allow: '/' },
      { userAgent: 'OAI-SearchBot',  allow: '/' },
      { userAgent: 'ClaudeBot',      allow: '/' },
      { userAgent: 'Claude-Web',     allow: '/' },
      { userAgent: 'PerplexityBot',  allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },  // Bard / Gemini extended

      // 3) Explicit disallow for scraper / mining / AI-training bots we don't want
      ...BAD_BOTS.map(userAgent => ({
        userAgent,
        disallow: '/',
      })),
    ],
    sitemap: [
      `${SITE.url}/sitemap.xml`,
      `${SITE.url}/sitemap-images.xml`,
    ],
    host: SITE.url,
  };
}
