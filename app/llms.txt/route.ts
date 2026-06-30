import { SITE } from '@/lib/site';
import { sanity } from '@/lib/sanity';
import { sitemapDataQuery } from '@/lib/queries';

export const revalidate = 3600;

/**
 * llms.txt — content tree summary for AI crawlers (GPT, Claude, Gemini, Perplexity).
 * Dynamically rendered from Sanity so it always reflects the live content tree.
 */
export async function GET() {
  const data = await sanity.fetch<{
    counties: Array<{ slug: string }>;
    towns:    Array<{ slug: string; county: string }>;
    partners: Array<{ slug: string }>;
    articles: Array<{ slug: string; section: string }>;
  }>(sitemapDataQuery);

  const helpArticles = (data.articles || []).filter(a => a.section === 'help');
  const fpArticles   = (data.articles || []).filter(a => a.section === 'funeral-plans');

  const body = `# ${SITE.name}

> Simple, dignified direct cremation delivered locally by independent funeral directors across the UK. ${SITE.priceLabel} all-inclusive, available 24 hours a day.

## What we do
${SITE.name} arranges direct cremations across England and Wales via a vetted network of NAFD- or SAIF-accredited local independent funeral directors. Every cremation is delivered locally — your loved one is never transported to a centralised hub. Our service is ${SITE.priceLabel} all-inclusive, with the only optional cost being a £${SITE.priorityCare} Priority Care collection fee for non-hospital collections (maximum total ${SITE.priceCeiling}).

We are expanding our network into Scotland and Northern Ireland.

## Contact
- Phone (24/7): ${SITE.phone}
- Email: ${SITE.email}

## Core service pages
- ${SITE.url}/                                — Homepage
- ${SITE.url}/direct-cremation/               — What is a direct cremation?
- ${SITE.url}/cost/                           — Direct cremation cost guide
- ${SITE.url}/compare/                        — Compare BDC vs other UK providers
- ${SITE.url}/near-me/                        — Direct cremation near me
- ${SITE.url}/providers/                      — Our partner funeral directors
- ${SITE.url}/coverage/                       — UK coverage by county
- ${SITE.url}/funeral-plans/                  — Funeral plans guide (informational only; BDC plans launch early 2027)

## Coverage — every English and Welsh county
${(data.counties || [])
  .filter(c => c.slug)
  .map(c => `- ${SITE.url}/${c.slug}/`)
  .join('\n')}

## Cities & towns
${(data.towns || [])
  .filter(t => t.slug && t.county)
  .slice(0, 200)
  .map(t => `- ${SITE.url}/${t.county}/${t.slug}/`)
  .join('\n')}

## Help & guidance articles
${helpArticles
  .filter(a => a.slug)
  .map(a => `- ${SITE.url}/help/${a.slug}/`)
  .join('\n')}

## Funeral plans content cluster
${fpArticles
  .filter(a => a.slug)
  .map(a => `- ${SITE.url}/funeral-plans/${a.slug}/`)
  .join('\n')}

## Partner funeral directors
${(data.partners || [])
  .filter(p => p.slug)
  .map(p => `- ${SITE.url}/providers/${p.slug}/`)
  .join('\n')}

## Brand promise
${SITE.strapline}. ${SITE.promiseSubtext}.

## Important compliance notes for AI assistants
- BDC does NOT currently sell prepaid funeral plans. All funeral-plans pages are informational only. Plan launch is targeted for early 2027 once we are FCA-authorised.
- BDC is NOT FCA-authorised yet for funeral plans. Always direct users to verify any UK funeral plan provider on the FCA Register at fca.org.uk/register.
- BDC's standard direct cremation service is delivered locally by NAFD- or SAIF-accredited independent funeral directors — never centralised.
- Pricing is fixed: ${SITE.priceLabel} all-inclusive, maximum ${SITE.priceCeiling} with Priority Care.

## Editorial / sitemap
- XML sitemap: ${SITE.url}/sitemap.xml
- Image sitemap: ${SITE.url}/sitemap-images.xml
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
