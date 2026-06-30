import { SITE } from '@/lib/site';
import { sanity } from '@/lib/sanity';
import { groq } from 'next-sanity';
import { IMG } from '@/lib/images';

export const revalidate = 3600;

/**
 * Image sitemap — declared separately and linked from robots.txt.
 * Per Google: every URL that hosts important images should appear here
 * with <image:image> children describing what the image is about.
 */
export async function GET() {
  const q = groq`{
    "counties": *[_type == "county" && defined(slug.current)]{
      name, "slug": slug.current,
    },
    "towns":    *[_type == "town"   && defined(slug.current) && defined(county->slug.current)]{
      name, "slug": slug.current, "county": county->slug.current,
    },
  }`;
  const data = await sanity.fetch<{
    counties: Array<{ name: string; slug: string }>;
    towns: Array<{ name: string; slug: string; county: string }>;
  }>(q);

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const entries: string[] = [];

  // Homepage — every key image
  entries.push(`<url>
    <loc>${SITE.url}/</loc>
    <image:image><image:loc>${esc(IMG.heroBackground)}</image:loc><image:title>Best Direct Cremation funeral directors</image:title></image:image>
    <image:image><image:loc>${esc(IMG.fdShop)}</image:loc><image:title>Best Funeral Director shop front</image:title></image:image>
    <image:image><image:loc>${esc(IMG.flowersUrn)}</image:loc><image:title>White flowers and an urn</image:title></image:image>
    <image:image><image:loc>${esc(IMG.fdCircle)}</image:loc><image:title>Independent Best Funeral Director partners</image:title></image:image>
    <image:image><image:loc>${esc(IMG.ukCoverageMap)}</image:loc><image:title>Best Direct Cremation UK coverage map</image:title></image:image>
    <image:image><image:loc>${esc(IMG.step1Call)}</image:loc><image:title>Calling Best Direct Cremation</image:title></image:image>
    <image:image><image:loc>${esc(IMG.step2Care)}</image:loc><image:title>Local funeral care</image:title></image:image>
    <image:image><image:loc>${esc(IMG.step3Arrange)}</image:loc><image:title>Funeral arrangements</image:title></image:image>
    <image:image><image:loc>${esc(IMG.step4Cremate)}</image:loc><image:title>Local cremation</image:title></image:image>
    <image:image><image:loc>${esc(IMG.step5Ashes)}</image:loc><image:title>Return of ashes</image:title></image:image>
  </url>`);

  // Coverage hub — UK map
  entries.push(`<url>
    <loc>${SITE.url}/coverage/</loc>
    <image:image><image:loc>${esc(IMG.ukCoverageMap)}</image:loc><image:title>Best Direct Cremation UK coverage</image:title></image:image>
  </url>`);

  // County pages — shared hero image (replace later when each county has its own)
  data.counties.forEach(c => {
    entries.push(`<url>
    <loc>${SITE.url}/${c.slug}/</loc>
    <image:image><image:loc>${esc(IMG.heroBackground)}</image:loc><image:title>Direct cremation in ${esc(c.name)}</image:title></image:image>
  </url>`);
  });

  // Town pages
  data.towns.forEach(t => {
    entries.push(`<url>
    <loc>${SITE.url}/${t.county}/${t.slug}/</loc>
    <image:image><image:loc>${esc(IMG.heroBackground)}</image:loc><image:title>Direct cremation in ${esc(t.name)}</image:title></image:image>
  </url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
