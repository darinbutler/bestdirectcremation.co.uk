/**
 * Keyword-discovery pipeline.
 *
 * For every seed term related to direct cremation, this script:
 *   1) Queries Google Autocomplete (no auth — free, high signal for user queries)
 *   2) Optionally runs Apify's google-search-scraper actor to pull "People
 *      also ask" and "Related searches" from live SERPs
 *   3) Cross-references discovered terms against our existing generic-term
 *      pages in Sanity
 *   4) Emits outputs/keyword-discovery.csv with columns:
 *        source, term, suggested_slug, exists_in_sanity, suggested_intent
 *
 * The team then reviews the CSV and picks which terms to add. A companion
 * template (bottom of this file, commented) shows the shape to append to
 * scripts/ingest-generics.ts.
 *
 * Usage:
 *   # Autocomplete only (fastest, no Apify credits)
 *   npx tsx scripts/discover-keywords.ts
 *
 *   # Include SERP scrape (needs APIFY_API_TOKEN, uses ~1 credit per seed)
 *   APIFY_API_TOKEN=... npx tsx scripts/discover-keywords.ts --with-serp
 *
 *   # Also check against Sanity for existing coverage (needs Sanity token)
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/discover-keywords.ts
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { createClient } from '@sanity/client';

const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
const SANITY_TOKEN = process.env.SANITY_API_WRITE_TOKEN;
const WITH_SERP = process.argv.includes('--with-serp');
const OUT_PATH = 'outputs/keyword-discovery.csv';

// ── SEED QUERIES ──────────────────────────────────────────────────────────
// Deliberately broad — we want the seeds to fan out into user-intent terms.
// Grouped by intent cluster so we can spot gaps by cluster in the output.
const SEEDS: Array<{ query: string; intent: string }> = [
  // Cost / cheap intent
  { query: 'cheap cremation', intent: 'cost' },
  { query: 'cheap funeral', intent: 'cost' },
  { query: 'cheapest cremation UK', intent: 'cost' },
  { query: 'budget cremation', intent: 'cost' },
  { query: 'low cost funeral UK', intent: 'cost' },
  { query: 'cremation prices UK', intent: 'cost' },
  { query: 'funeral costs 2026', intent: 'cost' },
  { query: 'DWP funeral payment', intent: 'funding' },
  { query: 'help paying for a funeral', intent: 'funding' },
  { query: 'public health funeral', intent: 'funding' },
  { query: 'council paid cremation', intent: 'funding' },
  // Types / synonyms
  { query: 'direct cremation', intent: 'core' },
  { query: 'simple cremation', intent: 'core' },
  { query: 'no service cremation', intent: 'core' },
  { query: 'unattended cremation', intent: 'core' },
  { query: 'immediate cremation', intent: 'timing' },
  { query: 'same day cremation', intent: 'timing' },
  { query: 'urgent cremation', intent: 'timing' },
  // Eco / green
  { query: 'eco cremation', intent: 'eco' },
  { query: 'green cremation', intent: 'eco' },
  { query: 'environmentally friendly cremation', intent: 'eco' },
  // Religious / cultural
  { query: 'Jewish cremation UK', intent: 'religious' },
  { query: 'Muslim cremation UK', intent: 'religious' },
  { query: 'Hindu cremation UK', intent: 'religious' },
  { query: 'humanist cremation', intent: 'religious' },
  { query: 'non-religious funeral', intent: 'religious' },
  // Legal / paperwork
  { query: 'cremation form UK', intent: 'legal' },
  { query: 'green form cremation', intent: 'legal' },
  { query: 'medical certificate of cause of death', intent: 'legal' },
  { query: 'who signs cremation forms', intent: 'legal' },
  // After / ashes
  { query: 'what to do with ashes', intent: 'ashes' },
  { query: 'scattering ashes UK', intent: 'ashes' },
  { query: 'urn for ashes', intent: 'ashes' },
  { query: 'memorial jewellery ashes', intent: 'ashes' },
  // Providers / comparisons
  { query: 'best direct cremation UK', intent: 'comparison' },
  { query: 'alternative to Pure Cremation', intent: 'comparison' },
  { query: 'alternative to Co-op funeral', intent: 'comparison' },
  { query: 'alternative to Dignity funeral', intent: 'comparison' },
  { query: 'cheaper than Pure Cremation', intent: 'comparison' },
  // Circumstance
  { query: 'no next of kin cremation', intent: 'circumstance' },
  { query: 'homeless person cremation', intent: 'circumstance' },
  { query: 'died alone cremation', intent: 'circumstance' },
];

// ── Existing coverage ─────────────────────────────────────────────────────
async function loadExistingSlugs(): Promise<Set<string>> {
  if (!SANITY_TOKEN) {
    console.log('  (skipping Sanity dedup — set SANITY_API_WRITE_TOKEN to enable)\n');
    return new Set();
  }
  const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-10-01', useCdn: false, token: SANITY_TOKEN,
  });
  const [generics, articles] = await Promise.all([
    sanity.fetch<Array<{ slug: string; title: string }>>(`*[_type == "genericTerm"]{ "slug": slug.current, title }`),
    sanity.fetch<Array<{ slug: string; title: string }>>(`*[_type == "article"]{ "slug": slug.current, title }`),
  ]);
  const out = new Set<string>();
  generics.forEach(g => out.add(g.slug));
  articles.forEach(a => out.add(a.slug));
  console.log(`  Loaded ${generics.length} existing generic-term slugs + ${articles.length} article slugs.\n`);
  return out;
}

// ── Google Autocomplete ───────────────────────────────────────────────────
// suggestqueries.google.com returns a JSONP-ish array. We parse it defensively.
async function fetchAutocomplete(query: string): Promise<string[]> {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=uk&q=${encodeURIComponent(query)}`;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh) BDC-keyword-audit' } });
    if (!r.ok) return [];
    const body = await r.text();
    // Response shape: ["query", ["suggestion1", "suggestion2", ...]]
    const parsed = JSON.parse(body);
    return Array.isArray(parsed?.[1]) ? parsed[1].filter((s: any) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

// ── Apify google-search-scraper (SERP scrape for PAA + related) ───────────
async function fetchSerpFeatures(query: string): Promise<{ related: string[]; paa: string[] }> {
  if (!APIFY_TOKEN) return { related: [], paa: [] };
  try {
    const startUrl = 'https://api.apify.com/v2/acts/apify~google-search-scraper/runs?token=' + APIFY_TOKEN;
    const runResp = await fetch(startUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        queries: query,
        maxPagesPerQuery: 1,
        countryCode: 'gb',
        languageCode: 'en',
        includeUnfilteredResults: false,
      }),
    });
    if (!runResp.ok) return { related: [], paa: [] };
    const run: any = await runResp.json();
    const runId = run?.data?.id;
    if (!runId) return { related: [], paa: [] };
    // Poll for completion (up to 90s)
    for (let i = 0; i < 45; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const st = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`);
      const stJson: any = await st.json();
      if (stJson?.data?.status === 'SUCCEEDED') break;
      if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(stJson?.data?.status)) return { related: [], paa: [] };
    }
    const ds = await fetch(`https://api.apify.com/v2/actor-runs/${runId}/dataset/items?token=${APIFY_TOKEN}`);
    const items: any = await ds.json();
    if (!Array.isArray(items) || items.length === 0) return { related: [], paa: [] };
    const first = items[0];
    const related: string[] = Array.isArray(first?.relatedQueries) ? first.relatedQueries.map((x: any) => x.title || x).filter((s: any) => typeof s === 'string') : [];
    const paa: string[] = Array.isArray(first?.peopleAlsoAsk) ? first.peopleAlsoAsk.map((x: any) => x.question).filter((s: any) => typeof s === 'string') : [];
    return { related, paa };
  } catch {
    return { related: [], paa: [] };
  }
}

// ── Slug helper ───────────────────────────────────────────────────────────
function toSlug(s: string): string {
  return s.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 70);
}

// ── Main ──────────────────────────────────────────────────────────────────
async function run() {
  console.log(`Discovery — ${SEEDS.length} seeds${WITH_SERP && APIFY_TOKEN ? ' (with SERP scrape)' : ' (autocomplete only)'}\n`);

  const existing = await loadExistingSlugs();

  // Rows keyed by slug so we naturally de-dup
  const rows = new Map<string, { source: string; term: string; slug: string; intent: string; exists: boolean; seed: string }>();

  for (let i = 0; i < SEEDS.length; i++) {
    const seed = SEEDS[i];
    console.log(`  [${i + 1}/${SEEDS.length}] ${seed.query}`);

    // 1) Autocomplete
    const suggestions = await fetchAutocomplete(seed.query);
    for (const s of suggestions) {
      const slug = toSlug(s);
      if (!slug || slug === toSlug(seed.query)) continue;
      if (!rows.has(slug)) rows.set(slug, { source: 'autocomplete', term: s, slug, intent: seed.intent, exists: existing.has(slug), seed: seed.query });
    }

    // 2) Optional SERP scrape
    if (WITH_SERP) {
      const { related, paa } = await fetchSerpFeatures(seed.query);
      for (const s of related) {
        const slug = toSlug(s);
        if (!slug) continue;
        if (!rows.has(slug)) rows.set(slug, { source: 'related', term: s, slug, intent: seed.intent, exists: existing.has(slug), seed: seed.query });
      }
      for (const q of paa) {
        const slug = toSlug(q);
        if (!slug) continue;
        if (!rows.has(slug)) rows.set(slug, { source: 'paa', term: q, slug, intent: seed.intent, exists: existing.has(slug), seed: seed.query });
      }
    }

    // Rate-limit courtesy pause
    await new Promise(r => setTimeout(r, 300));
  }

  // Sort: new first, then by intent, then by term
  const sorted = [...rows.values()].sort((a, b) => {
    if (a.exists !== b.exists) return a.exists ? 1 : -1;
    if (a.intent !== b.intent) return a.intent.localeCompare(b.intent);
    return a.term.localeCompare(b.term);
  });

  // Write CSV
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  const header = 'source,term,suggested_slug,exists_in_sanity,intent,seed\n';
  const body = sorted.map(r => {
    const cells = [r.source, r.term, r.slug, r.exists ? 'yes' : 'NO', r.intent, r.seed];
    return cells.map(c => (c.includes(',') || c.includes('"') ? `"${c.replace(/"/g, '""')}"` : c)).join(',');
  }).join('\n');
  writeFileSync(OUT_PATH, header + body, 'utf8');

  const newCount = sorted.filter(r => !r.exists).length;
  console.log(`\n✅ Wrote ${sorted.length} unique terms to ${OUT_PATH}`);
  console.log(`   ${newCount} are NEW (not already in Sanity)`);
  console.log(`\nNext: open the CSV, sort by exists_in_sanity=NO, review, and pick which to add.`);
  console.log(`Template for adding new pages: see the bottom of scripts/ingest-generics.ts.`);
}

run().catch(err => { console.error(err); process.exit(1); });

/*  ─────────────────────────────────────────────────────────────────────
    TEMPLATE — add a new generic-term entry to scripts/ingest-generics.ts

    Paste an object like this into the TERMS array in ingest-generics.ts,
    then run `npx tsx scripts/ingest-generics.ts` to publish.
    ─────────────────────────────────────────────────────────────────────

    {
      slug: 'eco-cremation-uk',
      title: 'Eco Cremation UK — Environmentally Friendly Direct Cremation',
      modifier: 'eco',
      serviceNoun: 'cremation',
      intentMatch: 'eco',
      body: [
        pt(`Eco cremation is a growing choice for UK families who want a low-footprint funeral…`),
        h2('What makes a cremation "eco"?'),
        pt(`Several factors combine: coffin material (natural / cardboard vs treated wood), transport distance (local vs centralised), embalming (none), and modern crematorium filtration…`),
        // …continue for ~800-1200 words
      ],
      faqs: [
        { question: 'Is direct cremation more environmentally friendly than a traditional funeral?', answer: [pt(`Yes on most measures: no embalming, no long-distance transport, simpler coffin, no printed order of service…`)] },
        // …3-5 more Q&A
      ],
    },

    Aim for 800-1500 words per generic-term page. Google rewards depth on
    these long-tail informational pages, and the linkify engine will
    automatically weave in contextual internal links on ingest.
*/
