/**
 * Apify enrichment — scrape every UK crematorium + register office via
 * the Google Maps Scraper actor, then inject the real local data into
 * each county and town Sanity document.
 *
 * Output per county:
 *   - crematoria: [{ name, address, postcode, lat, long, mapUrl }] × up to 5 nearest
 *   - registerOffices: [{ name, address, postcode, phone, url }] × 1-3 for the county
 *
 * Output per town:
 *   - nearestCrematoria: same shape, up to 3 nearest
 *   - registerOffice: single nearest with travel info
 *
 * Cost: typical Google Maps actor charges ~$7 per 1,000 records.
 *       UK crematorium count: ~280-300. UK register office count: ~400-450.
 *       Total ~£4-6 for one full run.
 *
 * Setup:
 *   1. Sign up at apify.com → Settings → Integrations → API token.
 *   2. Export the token:
 *        export APIFY_API_TOKEN=apify_api_xxxx
 *      You already have:
 *        export SANITY_API_WRITE_TOKEN=sk-xxxx
 *   3. Run:
 *        npx tsx scripts/enrich-apify.ts
 *      OR with --dry-run to scrape only, no Sanity write:
 *        npx tsx scripts/enrich-apify.ts --dry-run
 *
 * Usage:  npx tsx scripts/enrich-apify.ts
 */
import { createClient } from '@sanity/client';
import { ApifyClient } from 'apify-client';
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// ----------------------------------------------------------------
// CONFIG
// ----------------------------------------------------------------
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6';
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_TOKEN = process.env.SANITY_API_WRITE_TOKEN;
const APIFY_TOKEN  = process.env.APIFY_API_TOKEN;
const DRY_RUN      = process.argv.includes('--dry-run');

if (!APIFY_TOKEN) throw new Error('Set APIFY_API_TOKEN before running.');
if (!DRY_RUN && !SANITY_TOKEN) throw new Error('Set SANITY_API_WRITE_TOKEN before running (or use --dry-run).');

const apify  = new ApifyClient({ token: APIFY_TOKEN });
const sanity = DRY_RUN ? null : createClient({
  projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-10-01',
  useCdn: false, token: SANITY_TOKEN,
});

// Cache scrape results to disk so we don't pay for repeats
const CACHE = './tmp/apify-cache.json';

// Apify actor for Google Maps — well-maintained, charges per result
const GMAPS_ACTOR = 'compass/crawler-google-places';

// ----------------------------------------------------------------
// CACHE HELPERS
// ----------------------------------------------------------------
function loadCache(): Record<string, any[]> {
  if (!existsSync(CACHE)) return {};
  try { return JSON.parse(readFileSync(CACHE, 'utf8')); } catch { return {}; }
}
function saveCache(c: Record<string, any[]>) {
  mkdirSync(dirname(CACHE), { recursive: true });
  writeFileSync(CACHE, JSON.stringify(c, null, 2));
}

// ----------------------------------------------------------------
// APIFY — run Google Maps scraper for a given search query
// ----------------------------------------------------------------
async function scrapeGoogleMaps(query: string, maxResults: number = 50): Promise<any[]> {
  console.log(`  ↻ Scraping: "${query}" (max ${maxResults})`);
  const run = await apify.actor(GMAPS_ACTOR).call({
    searchStringsArray: [query],
    locationQuery: 'United Kingdom',
    maxCrawledPlacesPerSearch: maxResults,
    language: 'en',
    includeOpeningHours: false,
    includeImages: false,
    includeReviews: false,
    scrapePlaceDetailPage: true,
  });
  const { items } = await apify.dataset(run.defaultDatasetId).listItems();
  console.log(`    ✓ ${items.length} results`);
  return items;
}

// ----------------------------------------------------------------
// MAIN ENRICHMENT FLOW
// ----------------------------------------------------------------
type Place = {
  name: string;
  address?: string;
  postcode?: string;
  lat?: number;
  long?: number;
  phone?: string;
  url?: string;
  website?: string;
};

function toPlace(item: any): Place {
  return {
    name: item.title || item.name,
    address: item.address,
    postcode: item.postalCode || extractPostcode(item.address),
    lat: item.location?.lat,
    long: item.location?.lng,
    phone: item.phone,
    url: item.url,
    website: item.website,
  };
}

function extractPostcode(addr?: string): string | undefined {
  if (!addr) return undefined;
  const m = addr.match(/[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}/i);
  return m ? m[0].toUpperCase() : undefined;
}

// Haversine distance (km) between two lat/long pairs
function distanceKm(a: { lat: number; long: number }, b: { lat: number; long: number }): number {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.long - a.long) * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 +
            Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

// ----------------------------------------------------------------
// RUN
// ----------------------------------------------------------------
async function run() {
  console.log('Apify enrichment starting…');
  if (DRY_RUN) console.log('🌵 DRY RUN — scraping only, no Sanity writes');

  const cache = loadCache();

  // 1. Get all county + town slugs from Sanity (if not dry-run)
  let counties: Array<{ name: string; slug: string; country: string }> = [];
  let towns: Array<{ name: string; slug: string; county: { slug: string; name: string } }> = [];

  if (!DRY_RUN && sanity) {
    counties = await sanity.fetch(`*[_type=="county" && defined(slug.current)]{ name, "slug": slug.current, country }`);
    towns    = await sanity.fetch(`*[_type=="town" && defined(slug.current)]{ name, "slug": slug.current, "county": county->{ name, "slug": slug.current } }`);
    console.log(`  Loaded ${counties.length} counties and ${towns.length} towns from Sanity`);
  }

  // 2. Build queries — one per county for crematoria + register offices
  const queries: Array<{ key: string; query: string; type: 'crematoria' | 'register-office' }> = [];

  for (const c of counties) {
    queries.push({ key: `crematoria-${c.slug}`, query: `crematorium near ${c.name}, ${c.country}, UK`, type: 'crematoria' });
    queries.push({ key: `register-${c.slug}`,    query: `register office ${c.name}, ${c.country}, UK`,  type: 'register-office' });
  }

  // 3. Scrape each (using cache)
  const allResults: Record<string, Place[]> = {};

  for (const q of queries) {
    if (cache[q.key]) {
      console.log(`  ✓ Cached: ${q.key}`);
      allResults[q.key] = cache[q.key];
      continue;
    }
    try {
      const items = await scrapeGoogleMaps(q.query, q.type === 'crematoria' ? 10 : 5);
      const places = items.map(toPlace).filter(p => p.name);
      allResults[q.key] = places;
      cache[q.key] = places;
      saveCache(cache);  // save after every successful scrape
    } catch (err: any) {
      console.error(`  ✗ Failed: ${q.key}`, err.message);
      allResults[q.key] = [];
    }
  }

  // 4. Update Sanity with enriched data (skip if dry-run)
  if (DRY_RUN || !sanity) {
    console.log('\nDry-run complete. Scraped data cached at', CACHE);
    return;
  }

  console.log('\nUpdating Sanity documents with enriched data…');
  for (const c of counties) {
    const crematoria      = (allResults[`crematoria-${c.slug}`] || []).slice(0, 5);
    const registerOffices = (allResults[`register-${c.slug}`] || []).slice(0, 3);
    if (crematoria.length === 0 && registerOffices.length === 0) continue;

    await sanity.patch({
      query: `*[_type=="county" && slug.current==$slug][0]`,
      params: { slug: c.slug },
    }).set({
      crematoria: crematoria.map(p => ({
        _type: 'crematorium',
        _key: (p.name + (p.postcode || '')).replace(/\W/g, '').slice(0, 20),
        name: p.name, address: p.address, postcode: p.postcode,
        latitude: p.lat, longitude: p.long, website: p.website,
      })),
      registerOffices: registerOffices.map(p => ({
        _type: 'registerOffice',
        _key: (p.name + (p.postcode || '')).replace(/\W/g, '').slice(0, 20),
        name: p.name, address: p.address, postcode: p.postcode,
        phone: p.phone, website: p.website,
      })),
    }).commit();
    console.log(`  ✓ ${c.name}: ${crematoria.length} crematoria, ${registerOffices.length} register offices`);
  }

  // 5. For towns — find the 3 nearest crematoria from the county-level scrape
  console.log('\nMatching nearest crematoria to towns…');
  for (const t of towns) {
    if (!t.county?.slug) continue;
    const countyCrematoria = (allResults[`crematoria-${t.county.slug}`] || [])
      .filter(p => p.lat && p.long);
    if (countyCrematoria.length === 0) continue;

    // Without town lat/long we just take the county-level results in order
    // (Apify's Google Maps actor returns roughly distance-sorted from the search query)
    const nearest = countyCrematoria.slice(0, 3);

    await sanity.patch({
      query: `*[_type=="town" && slug.current==$slug && county->slug.current==$countySlug][0]`,
      params: { slug: t.slug, countySlug: t.county.slug },
    }).set({
      nearestCrematoria: nearest.map(p => ({
        _type: 'crematorium',
        _key: (p.name + (p.postcode || '')).replace(/\W/g, '').slice(0, 20),
        name: p.name, address: p.address, postcode: p.postcode,
        latitude: p.lat, longitude: p.long, website: p.website,
      })),
    }).commit();
  }
  console.log(`  ✓ Enriched ${towns.length} towns`);

  console.log('\nDone. Apify enrichment complete.');
}

run().catch(err => { console.error(err); process.exit(1); });
