/**
 * Scrape the live bestdirectcremation.co.uk WordPress site's sitemap(s) and
 * emit a CSV of every indexed URL, plus its HTTP status.
 *
 * Why: to build accurate 301 redirects into lib/redirects.mjs, we need to
 * know the exact URL set the WP site is currently serving. Grabbing them
 * from the sitemap is far more reliable than guessing patterns.
 *
 * How:
 *  1) Fetch /sitemap.xml (or /sitemap_index.xml — Yoast SEO's naming)
 *  2) If it's a sitemap INDEX, recursively fetch each child sitemap
 *  3) Collect every <loc> URL
 *  4) HEAD-check each URL to record HTTP status (200 = keep, 404 = drop)
 *  5) Output outputs/wp-sitemap-scrape.csv with columns:
 *       url, path, status, lastmod
 *
 * Usage:
 *   npx tsx scripts/scrape-wp-sitemap.ts
 *
 *   Optional flags:
 *     --no-status-check    skip HEAD requests (much faster, keeps 404s)
 *     --output=/path.csv   override output location
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const WP_ORIGIN = 'https://bestdirectcremation.co.uk';
const OUT_PATH = getFlag('--output') || 'outputs/wp-sitemap-scrape.csv';
const SKIP_STATUS = process.argv.includes('--no-status-check');

// Sitemap URLs to try in order. WP + Yoast typically uses sitemap_index.xml,
// but we'll fall back to sitemap.xml if the first isn't found.
const CANDIDATE_SITEMAPS = [
  `${WP_ORIGIN}/sitemap_index.xml`,
  `${WP_ORIGIN}/sitemap.xml`,
  `${WP_ORIGIN}/wp-sitemap.xml`,
];

function getFlag(name: string): string | undefined {
  const arg = process.argv.find(a => a.startsWith(`${name}=`));
  return arg ? arg.split('=')[1] : undefined;
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'BDC-migration-audit/1.0' },
      redirect: 'follow',
    });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

async function head(url: string): Promise<{ status: number; finalUrl: string }> {
  try {
    const r = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'BDC-migration-audit/1.0' },
      redirect: 'follow',
    });
    return { status: r.status, finalUrl: r.url };
  } catch {
    return { status: 0, finalUrl: url };
  }
}

/** Pull <loc>...</loc> values out of a sitemap XML blob. */
function extractLocs(xml: string): Array<{ loc: string; lastmod?: string }> {
  const out: Array<{ loc: string; lastmod?: string }> = [];
  // Each <url> or <sitemap> block contains a <loc> and optional <lastmod>
  const blocks = xml.match(/<(url|sitemap)>[\s\S]*?<\/(url|sitemap)>/g) || [];
  for (const b of blocks) {
    const locM = b.match(/<loc>([^<]+)<\/loc>/);
    if (!locM) continue;
    const lastmodM = b.match(/<lastmod>([^<]+)<\/lastmod>/);
    out.push({ loc: locM[1].trim(), lastmod: lastmodM?.[1]?.trim() });
  }
  return out;
}

async function crawlSitemap(url: string, seenSitemaps: Set<string>): Promise<Array<{ loc: string; lastmod?: string }>> {
  if (seenSitemaps.has(url)) return [];
  seenSitemaps.add(url);

  const xml = await fetchText(url);
  if (!xml) return [];

  const entries = extractLocs(xml);
  if (entries.length === 0) return [];

  // If entries point to more XML sitemaps, recurse
  const isIndex = xml.includes('<sitemapindex') || entries[0].loc.endsWith('.xml');
  if (isIndex) {
    let all: Array<{ loc: string; lastmod?: string }> = [];
    for (const e of entries) {
      console.log(`  ↻ Fetching sub-sitemap: ${e.loc}`);
      const inner = await crawlSitemap(e.loc, seenSitemaps);
      all = all.concat(inner);
    }
    return all;
  }

  return entries;
}

async function main() {
  console.log('▶ Scraping WordPress sitemap…\n');

  const seenSitemaps = new Set<string>();
  let allUrls: Array<{ loc: string; lastmod?: string }> = [];

  for (const candidate of CANDIDATE_SITEMAPS) {
    console.log(`Trying: ${candidate}`);
    const found = await crawlSitemap(candidate, seenSitemaps);
    if (found.length > 0) {
      console.log(`  ✓ Got ${found.length} URLs from ${candidate}\n`);
      allUrls = found;
      break;
    } else {
      console.log(`  ✗ Empty or not found\n`);
    }
  }

  if (allUrls.length === 0) {
    console.error('❌ Could not fetch any sitemap. The site may serve them under a different path.');
    console.error('   Try opening https://bestdirectcremation.co.uk/robots.txt to see the sitemap URL.');
    process.exit(1);
  }

  // De-dup
  const uniqueUrls = new Map<string, { loc: string; lastmod?: string }>();
  for (const u of allUrls) uniqueUrls.set(u.loc, u);
  const list = [...uniqueUrls.values()];
  console.log(`Deduped: ${list.length} unique URLs\n`);

  // HEAD-check each URL for live status (parallel batches of 10)
  const results: Array<{ loc: string; path: string; status: number; finalUrl: string; lastmod?: string }> = [];
  if (SKIP_STATUS) {
    for (const u of list) {
      results.push({ loc: u.loc, path: new URL(u.loc).pathname, status: 0, finalUrl: u.loc, lastmod: u.lastmod });
    }
    console.log('Skipped HTTP status checks (--no-status-check)');
  } else {
    console.log(`Checking HTTP status for ${list.length} URLs (parallel batches of 10)…`);
    const batchSize = 10;
    for (let i = 0; i < list.length; i += batchSize) {
      const batch = list.slice(i, i + batchSize);
      const statuses = await Promise.all(batch.map(b => head(b.loc)));
      for (let j = 0; j < batch.length; j++) {
        const u = batch[j];
        const s = statuses[j];
        results.push({
          loc: u.loc,
          path: new URL(u.loc).pathname,
          status: s.status,
          finalUrl: s.finalUrl,
          lastmod: u.lastmod,
        });
      }
      process.stdout.write(`  ${Math.min(i + batchSize, list.length)}/${list.length}\r`);
    }
    console.log('');
  }

  // Write CSV
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  const header = 'url,path,status,final_url,lastmod\n';
  const csvBody = results.map(r => {
    const cells = [r.loc, r.path, String(r.status), r.finalUrl, r.lastmod || ''];
    return cells.map(c => (c.includes(',') || c.includes('"') ? `"${c.replace(/"/g, '""')}"` : c)).join(',');
  }).join('\n');
  writeFileSync(OUT_PATH, header + csvBody, 'utf8');
  console.log(`\n✅ Wrote ${results.length} URLs to ${OUT_PATH}`);

  // Print summary counts
  const okCount = results.filter(r => r.status >= 200 && r.status < 300).length;
  const redirectCount = results.filter(r => r.status >= 300 && r.status < 400).length;
  const errorCount = results.filter(r => r.status >= 400).length;
  const untested = results.filter(r => r.status === 0).length;
  console.log(`\nSummary: ${okCount} OK · ${redirectCount} redirects · ${errorCount} 4xx/5xx · ${untested} untested`);
  console.log(`\nNext step: open ${OUT_PATH} in a spreadsheet, sort by clicks (from GSC), and add`);
  console.log('the top URLs to lib/redirects.mjs → gscTopPageRedirects.');
}

main().catch(err => { console.error(err); process.exit(1); });
