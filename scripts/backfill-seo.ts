/**
 * Backfill sensible metaTitle + metaDescription onto every doc that currently
 * has an empty SEO block.
 *
 * - Never overwrites existing values (idempotent).
 * - Uses the doc's name/title + section to generate a template that's much
 *   better than blank but that editors can still refine in Studio.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/backfill-seo.ts
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/backfill-seo.ts --dry-run
 */
import { createClient } from '@sanity/client';

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6';
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;
if (!TOKEN) throw new Error('Set SANITY_API_WRITE_TOKEN before running.');
const DRY_RUN = process.argv.includes('--dry-run');

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-10-01', useCdn: false, token: TOKEN,
});

// Copy templates (tweak here — they'll apply site-wide on next run)
const PRICE = '£1,499';
const CEILING = '£1,749';
const PHONE = '0333 242 1405';
const BRAND = 'Best Direct Cremation';

function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + '…';
}

function buildForCounty(c: any) {
  const name = c.name;
  const title = truncate(`Direct Cremation in ${name} — from ${PRICE} | ${BRAND}`, 60);
  const desc  = truncate(
    `${PRICE} all-inclusive direct cremation in ${name}, delivered locally by a vetted independent funeral director. Call ${PHONE} — 24 hours a day.`,
    160
  );
  return { title, desc };
}

function buildForTown(t: any) {
  const name = t.name;
  const county = t.countyName || '';
  const title = truncate(`Direct Cremation in ${name}${county ? `, ${county}` : ''} — from ${PRICE}`, 60);
  const desc  = truncate(
    `${PRICE} all-inclusive direct cremation in ${name}${county ? `, ${county}` : ''}, delivered locally. Max ${CEILING} with Priority Care. Call ${PHONE}.`,
    160
  );
  return { title, desc };
}

function buildForArticle(a: any) {
  const title = truncate(`${a.title} | ${BRAND}`, 60);
  const desc  = truncate(
    a.excerpt || `${a.title} — UK guide from ${BRAND}. Direct cremation from ${PRICE}. Call ${PHONE} for 24-hour help.`,
    160
  );
  return { title, desc };
}

function buildForGeneric(g: any) {
  const title = truncate(`${g.title} — UK 2026 from ${PRICE}`, 60);
  const desc  = truncate(
    `${g.title} — UK guide covering price, process and provider comparison. ${PRICE} all-inclusive with ${BRAND}. Call ${PHONE}.`,
    160
  );
  return { title, desc };
}

async function run() {
  console.log(`Backfill SEO metadata ${DRY_RUN ? '(dry run) ' : ''}across all docs…\n`);
  let touched = 0;

  // Counties
  const counties = await client.fetch<any[]>(`*[_type == "county"]{ _id, name, seo }`);
  for (const c of counties) {
    const needsTitle = !c.seo?.metaTitle;
    const needsDesc  = !c.seo?.metaDescription;
    if (!needsTitle && !needsDesc) continue;
    const { title, desc } = buildForCounty(c);
    const seo = { ...(c.seo || {}) };
    if (needsTitle) seo.metaTitle = title;
    if (needsDesc)  seo.metaDescription = desc;
    console.log(`  county   ${c.name.padEnd(30)} ${needsTitle ? 'T ' : '  '}${needsDesc ? 'D' : ' '}`);
    touched++;
    if (!DRY_RUN) await client.patch(c._id).set({ seo }).commit();
  }

  // Towns
  const towns = await client.fetch<any[]>(`*[_type == "town"]{ _id, name, "countyName": county->name, seo }`);
  for (const t of towns) {
    const needsTitle = !t.seo?.metaTitle;
    const needsDesc  = !t.seo?.metaDescription;
    if (!needsTitle && !needsDesc) continue;
    const { title, desc } = buildForTown(t);
    const seo = { ...(t.seo || {}) };
    if (needsTitle) seo.metaTitle = title;
    if (needsDesc)  seo.metaDescription = desc;
    console.log(`  town     ${t.name.padEnd(30)} ${needsTitle ? 'T ' : '  '}${needsDesc ? 'D' : ' '}`);
    touched++;
    if (!DRY_RUN) await client.patch(t._id).set({ seo }).commit();
  }

  // Articles (help + funeral-plans + comparisons)
  const articles = await client.fetch<any[]>(`*[_type == "article"]{ _id, title, section, excerpt, seo }`);
  for (const a of articles) {
    const needsTitle = !a.seo?.metaTitle;
    const needsDesc  = !a.seo?.metaDescription;
    if (!needsTitle && !needsDesc) continue;
    const { title, desc } = buildForArticle(a);
    const seo = { ...(a.seo || {}) };
    if (needsTitle) seo.metaTitle = title;
    if (needsDesc)  seo.metaDescription = desc;
    console.log(`  ${(a.section || 'article').padEnd(8)} ${(a.title || '').padEnd(30).slice(0, 30)} ${needsTitle ? 'T ' : '  '}${needsDesc ? 'D' : ' '}`);
    touched++;
    if (!DRY_RUN) await client.patch(a._id).set({ seo }).commit();
  }

  // Generic-term landers
  const generics = await client.fetch<any[]>(`*[_type == "genericTerm"]{ _id, title, seo }`);
  for (const g of generics) {
    const needsTitle = !g.seo?.metaTitle;
    const needsDesc  = !g.seo?.metaDescription;
    if (!needsTitle && !needsDesc) continue;
    const { title, desc } = buildForGeneric(g);
    const seo = { ...(g.seo || {}) };
    if (needsTitle) seo.metaTitle = title;
    if (needsDesc)  seo.metaDescription = desc;
    console.log(`  generic  ${(g.title || '').padEnd(30).slice(0, 30)} ${needsTitle ? 'T ' : '  '}${needsDesc ? 'D' : ' '}`);
    touched++;
    if (!DRY_RUN) await client.patch(g._id).set({ seo }).commit();
  }

  console.log('\n──────────────────────────────────────');
  console.log(` Summary ${DRY_RUN ? '(DRY RUN)' : ''}`);
  console.log('──────────────────────────────────────');
  console.log(` ${touched} documents got templated SEO metadata.`);
  console.log(' T = metaTitle set · D = metaDescription set');
  console.log(' Existing values were preserved — nothing overwritten.');
  if (DRY_RUN) console.log('\n Re-run without --dry-run to actually write.');
}

run().catch(err => { console.error(err); process.exit(1); });
