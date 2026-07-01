/**
 * Competitor audit — for each target search term, fetch the top UK results
 * via Apify, then scrape each result page and extract the metrics we need
 * to know if our page can outrank it.
 *
 * Output: outputs/competitor-audit.csv with per-URL rows:
 *   query, position, url, domain, title, meta_desc_len,
 *   word_count, h1_count, h2_count, h3_count, faq_count,
 *   schema_types, internal_link_count, external_link_count, image_count, has_price
 *
 * Aggregated summary at outputs/competitor-audit-summary.md — shows for
 * each search term: median word count, common H2 headings, whether the top
 * results use FAQ / schema, and a "we need to hit" target that's 20% above
 * the median winner.
 *
 * Usage:
 *   APIFY_API_TOKEN=... npx tsx scripts/audit-competitors.ts
 *
 *   # Faster iteration — only re-audit URLs; skip SERP fetch (uses cached)
 *   APIFY_API_TOKEN=... npx tsx scripts/audit-competitors.ts --use-cache
 *
 *   # Add / remove query terms in the TARGETS array below.
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { dirname } from 'path';

const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
if (!APIFY_TOKEN) throw new Error('Set APIFY_API_TOKEN before running.');

const CACHE_PATH = 'outputs/.competitor-audit-cache.json';
const CSV_PATH   = 'outputs/competitor-audit.csv';
const MD_PATH    = 'outputs/competitor-audit-summary.md';
const USE_CACHE  = process.argv.includes('--use-cache');

/** High-signal UK search terms we want to rank for but currently don't. */
const TARGETS = [
  // Cost / funding
  'cheap cremation UK',
  'cheapest cremation UK',
  'budget funeral UK',
  'funeral costs UK 2026',
  'DWP funeral payment',
  'help paying for a funeral UK',
  'public health funeral UK',
  // Timing
  'same day cremation UK',
  'immediate cremation UK',
  // Eco
  'eco cremation UK',
  'green cremation UK',
  // Religious / cultural
  'humanist cremation UK',
  'atheist funeral UK',
  // Legal
  'green form cremation',
  'who signs cremation forms',
  // Ashes
  'what to do with ashes UK',
  'scattering ashes UK rules',
  // Comparisons
  'alternative to Pure Cremation',
  'alternative to Co-op funeral',
  'alternative to Aura Cremation',
  'cheaper than Pure Cremation',
  // Locations
  'direct cremation Scotland',
  'direct cremation Wales',
  'direct cremation Northern Ireland',
];

const TOP_N = 5; // top N results per query to audit

// ── Cache ─────────────────────────────────────────────────────────────────
type CachedSerp = { query: string; results: Array<{ position: number; url: string; title: string }> };
type CachedPage = { url: string; ok: boolean; metrics: PageMetrics | null };
type Cache = { serp: Record<string, CachedSerp>; page: Record<string, CachedPage> };

function loadCache(): Cache {
  if (USE_CACHE && existsSync(CACHE_PATH)) {
    try { return JSON.parse(readFileSync(CACHE_PATH, 'utf8')); } catch { /* fall through */ }
  }
  return { serp: {}, page: {} };
}
function saveCache(c: Cache) {
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(c, null, 2), 'utf8');
}

// ── Apify SERP scrape ─────────────────────────────────────────────────────
async function fetchSerp(query: string): Promise<Array<{ position: number; url: string; title: string }>> {
  const startUrl = `https://api.apify.com/v2/acts/apify~google-search-scraper/runs?token=${APIFY_TOKEN}`;
  const startResp = await fetch(startUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      queries: query,
      maxPagesPerQuery: 1,
      countryCode: 'gb',
      languageCode: 'en',
      resultsPerPage: 10,
      includeUnfilteredResults: false,
      saveHtml: false,
    }),
  });
  if (!startResp.ok) throw new Error(`SERP start failed for "${query}": HTTP ${startResp.status}`);
  const start: any = await startResp.json();
  const runId = start?.data?.id;
  if (!runId) throw new Error('No runId returned');
  // Poll up to 3 min
  for (let i = 0; i < 90; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const stResp = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`);
    const st: any = await stResp.json();
    const status = st?.data?.status;
    if (status === 'SUCCEEDED') break;
    if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(status)) throw new Error(`Run ${status}`);
  }
  const ds = await fetch(`https://api.apify.com/v2/actor-runs/${runId}/dataset/items?token=${APIFY_TOKEN}`);
  const items: any = await ds.json();
  if (!Array.isArray(items) || items.length === 0) return [];
  const first = items[0];
  const organic = Array.isArray(first?.organicResults) ? first.organicResults : [];
  return organic.slice(0, TOP_N).map((r: any, i: number) => ({
    position: i + 1,
    url: r?.url || '',
    title: r?.title || '',
  })).filter((r: { url: string }) => r.url);
}

// ── Page metrics extraction ───────────────────────────────────────────────
type PageMetrics = {
  domain: string;
  title: string;
  metaDescLen: number;
  wordCount: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  h2s: string[];
  faqCount: number;
  schemaTypes: string[];
  internalLinkCount: number;
  externalLinkCount: number;
  imageCount: number;
  hasPrice: boolean;
};

function extractMetrics(html: string, url: string): PageMetrics {
  const domain = new URL(url).hostname.replace(/^www\./, '');
  const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleM ? titleM[1].trim().replace(/\s+/g, ' ') : '';
  const descM = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const metaDescLen = descM ? descM[1].length : 0;

  // Strip <script> / <style> / <nav> / <footer> for word count
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ');
  const textOnly = stripped.replace(/<[^>]+>/g, ' ').replace(/&\w+;/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = textOnly ? textOnly.split(/\s+/).length : 0;

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  const h2s = h2Matches.map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')).filter(Boolean);
  const h3Count = (html.match(/<h3\b/gi) || []).length;

  // FAQ signals — either FAQPage schema or classic FAQ headings
  const faqSchemaCount = (html.match(/"@type"\s*:\s*"Question"/g) || []).length;
  const faqTextCount = (html.match(/<summary[^>]*>[\s\S]*?<\/summary>/gi) || []).length;
  const faqCount = Math.max(faqSchemaCount, faqTextCount);

  // Schema.org @type list
  const typeMatches = [...html.matchAll(/"@type"\s*:\s*"([A-Za-z]+)"/g)];
  const schemaTypes = [...new Set(typeMatches.map(m => m[1]))];

  // Links
  const linkMatches = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["']/gi)];
  let internalLinkCount = 0;
  let externalLinkCount = 0;
  for (const m of linkMatches) {
    const href = m[1];
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
    if (href.startsWith('/') || href.startsWith(url) || href.includes(domain)) internalLinkCount++;
    else if (href.startsWith('http')) externalLinkCount++;
  }

  const imageCount = (html.match(/<img\b/gi) || []).length;
  const hasPrice = /£\s?\d{3,4}|£\s?1[,\d]{3}/.test(textOnly);

  return {
    domain, title, metaDescLen, wordCount, h1Count, h2Count: h2s.length, h3Count,
    h2s: h2s.slice(0, 12), faqCount, schemaTypes,
    internalLinkCount, externalLinkCount, imageCount, hasPrice,
  };
}

async function fetchPage(url: string): Promise<{ ok: boolean; html: string }> {
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible) BDC-competitive-audit/1.0' },
      redirect: 'follow',
    });
    if (!r.ok) return { ok: false, html: '' };
    const html = await r.text();
    return { ok: true, html };
  } catch {
    return { ok: false, html: '' };
  }
}

// ── Main ──────────────────────────────────────────────────────────────────
async function run() {
  const cache = loadCache();
  const rows: Array<{ query: string; position: number } & PageMetrics> = [];

  for (let i = 0; i < TARGETS.length; i++) {
    const q = TARGETS[i];
    console.log(`\n[${i + 1}/${TARGETS.length}] ${q}`);

    // SERP
    let serp = cache.serp[q];
    if (!serp) {
      console.log('  ↻ SERP scrape…');
      try {
        const results = await fetchSerp(q);
        serp = { query: q, results };
        cache.serp[q] = serp;
        saveCache(cache);
      } catch (e: any) {
        console.log(`  ✗ SERP failed: ${e.message}`);
        continue;
      }
    } else {
      console.log(`  ✓ SERP cached (${serp.results.length} results)`);
    }

    // Per-result page fetch + metrics
    for (const r of serp.results) {
      let cached = cache.page[r.url];
      if (!cached) {
        console.log(`    ↳ ${r.position}. ${r.url}`);
        const { ok, html } = await fetchPage(r.url);
        if (!ok) { cached = { url: r.url, ok: false, metrics: null }; }
        else     { cached = { url: r.url, ok: true, metrics: extractMetrics(html, r.url) }; }
        cache.page[r.url] = cached;
        saveCache(cache);
      }
      if (cached.ok && cached.metrics) {
        rows.push({ query: q, position: r.position, ...cached.metrics });
      }
    }
  }

  // ── Write CSV ────────────────────────────────────────────────────────
  mkdirSync(dirname(CSV_PATH), { recursive: true });
  const header = 'query,position,domain,title,meta_desc_len,word_count,h1,h2,h3,faq,schema_types,internal_links,external_links,images,has_price,url\n';
  const csvBody = rows.map(r => {
    const cells = [
      r.query, String(r.position), r.domain, r.title, String(r.metaDescLen),
      String(r.wordCount), String(r.h1Count), String(r.h2Count), String(r.h3Count),
      String(r.faqCount), r.schemaTypes.join(' | '),
      String(r.internalLinkCount), String(r.externalLinkCount), String(r.imageCount),
      r.hasPrice ? 'yes' : 'no', '',
    ];
    return cells.map(c => (c.includes(',') || c.includes('"') ? `"${c.replace(/"/g, '""')}"` : c)).join(',');
  }).join('\n');
  writeFileSync(CSV_PATH, header + csvBody, 'utf8');
  console.log(`\n✅ Wrote ${rows.length} audit rows to ${CSV_PATH}`);

  // ── Write Markdown summary ───────────────────────────────────────────
  const median = (nums: number[]) => {
    if (nums.length === 0) return 0;
    const s = [...nums].sort((a, b) => a - b);
    return s[Math.floor(s.length / 2)];
  };
  const mdParts: string[] = [];
  mdParts.push('# Competitor audit — gap analysis\n');
  mdParts.push(`Ran ${TARGETS.length} search terms × top ${TOP_N} results = ${rows.length} pages audited.\n`);
  mdParts.push('For each term below: median word count of the top competitors, common H2 patterns you should cover or beat, whether the winners use FAQ + schema, and the "target" your page needs to hit to outrank.\n\n');

  const byQuery = new Map<string, typeof rows>();
  for (const r of rows) {
    if (!byQuery.has(r.query)) byQuery.set(r.query, []);
    byQuery.get(r.query)!.push(r);
  }
  for (const q of TARGETS) {
    const list = byQuery.get(q) || [];
    if (list.length === 0) continue;
    const wc = list.map(r => r.wordCount);
    const medWc = median(wc);
    const targetWc = Math.round(medWc * 1.2);
    const withFaq = list.filter(r => r.faqCount > 0).length;
    const withArticleSchema = list.filter(r => r.schemaTypes.some(t => ['Article', 'FAQPage', 'HowTo'].includes(t))).length;
    const commonH2s = new Map<string, number>();
    for (const r of list) for (const h of r.h2s) {
      const norm = h.toLowerCase();
      commonH2s.set(norm, (commonH2s.get(norm) || 0) + 1);
    }
    const topH2s = [...commonH2s.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([h, c]) => `- ${h}${c > 1 ? ` _(${c} sites)_` : ''}`);

    mdParts.push(`## \`${q}\`\n`);
    mdParts.push(`- **Median winner word count**: ${medWc.toLocaleString()}`);
    mdParts.push(`- **Target for our page**: ${targetWc.toLocaleString()}+ words (median × 1.2)`);
    mdParts.push(`- **FAQ block on top ${TOP_N}**: ${withFaq} of ${list.length}`);
    mdParts.push(`- **Article / FAQPage / HowTo schema on top ${TOP_N}**: ${withArticleSchema} of ${list.length}`);
    mdParts.push(`- **Top competing domains**: ${[...new Set(list.map(r => r.domain))].join(', ')}`);
    mdParts.push('- **Common H2 patterns to cover / beat**:');
    if (topH2s.length) mdParts.push(...topH2s);
    else               mdParts.push('  - (no consistent H2 pattern found — opportunity to define the structure)');
    mdParts.push('');
  }

  mdParts.push('\n---\n');
  mdParts.push('## How to use this\n');
  mdParts.push('1. Sort the CSV by `word_count` to see who ranks with what depth.');
  mdParts.push('2. Where the median is under 800 words, we can win with a 1,200-word page + FAQ + schema.');
  mdParts.push('3. Where the median is 2,000+, we need a proper cornerstone (~2,500 words with a rich H2 spine).');
  mdParts.push('4. For every term, we should:');
  mdParts.push('   - Cover every H2 pattern the competitors cover, plus 2-3 that they don\'t.');
  mdParts.push('   - Add FAQPage schema (6-8 Q&A) — most competitors don\'t have it.');
  mdParts.push('   - Add Article schema with an assigned Person author (EEAT).');
  mdParts.push('   - Include a price callout (£1,499) — visible price consistently correlates with UK cremation-page performance.');
  mdParts.push('   - Include an in-prose contextual link to /compare/, /coverage/, /cost-calculator/, and 2-3 related help articles.');
  writeFileSync(MD_PATH, mdParts.join('\n'), 'utf8');
  console.log(`✅ Wrote gap-analysis summary to ${MD_PATH}`);
}

run().catch(err => { console.error(err); process.exit(1); });
