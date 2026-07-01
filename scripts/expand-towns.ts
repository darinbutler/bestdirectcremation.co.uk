/**
 * Expand town coverage — add ~200 additional UK towns from
 * scripts/lib/uk-towns-expanded.ts on top of the existing 173.
 *
 * Only INSERTS new town docs — never modifies existing ones. Skips any town
 * whose slug already exists. Adds `_key` to every array item.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/expand-towns.ts
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/expand-towns.ts --dry-run
 */
import { createClient } from '@sanity/client';
import { randomBytes } from 'crypto';
import { Linkifier } from './lib/linkify';
import { EXPANDED_TOWNS } from './lib/uk-towns-expanded';

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6';
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;
if (!TOKEN) throw new Error('Set SANITY_API_WRITE_TOKEN before running.');
const DRY_RUN = process.argv.includes('--dry-run');

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-10-01', useCdn: false, token: TOKEN,
});

function k(): string { return randomBytes(6).toString('hex'); }

function ensureKeys(value: any): void {
  if (Array.isArray(value)) {
    for (const item of value) {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        if (!item._key) item._key = k();
        for (const key of Object.keys(item)) ensureKeys(item[key]);
      }
    }
  } else if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) ensureKeys(value[key]);
  }
}

const pt = (text: string) => ({ _type: 'block', style: 'normal', children: [{ _type: 'span', text, _key: k() }], markDefs: [] });
const h2 = (text: string) => ({ _type: 'block', style: 'h2', children: [{ _type: 'span', text, _key: k() }], markDefs: [] });

function enrichBlocks(blocks: any[], slug: string): any[] {
  if (!Array.isArray(blocks)) return blocks;
  const linkifier = new Linkifier({ currentSlug: slug });
  return blocks.map(block => {
    if (block?.style === 'normal' && block?.children?.[0]?.text && (!block.markDefs || block.markDefs.length === 0)) {
      return linkifier.pt(block.children[0].text);
    }
    return block;
  });
}

/** Same section skeleton as ingest-towns.ts but scaled to a shorter first-pass body. */
function sections(t: { name: string; pop: number }, countyName: string) {
  const N = t.name;
  return [
    { _type: 'longFormSection', sectionRole: '01-intro',
      heading: `Direct cremation in ${N}`,
      body: [
        pt(`Direct cremation in ${N} is delivered locally by a vetted independent Best Funeral Director working in your area, at £1,499 all-inclusive (maximum £1,749 with Priority Care). Best Direct Cremation covers ${N} and the surrounding parts of ${countyName} through a UK-wide network of NAFD- or SAIF-accredited local partners — never a centralised national operation.`),
        pt(`This page explains what a direct cremation costs in ${N}, what the process looks like, which crematorium your loved one will be taken to, and how to arrange it from wherever you are. Call 0333 242 1405 24 hours a day — a real person, every call.`),
      ],
    },
    { _type: 'longFormSection', sectionRole: '02-price',
      heading: `${N} pricing — from £1,499 all-inclusive`,
      body: [
        pt(`Our price in ${N} is the same nationally-set £1,499 all-inclusive, with a £250 Priority Care add-on if the collection is from home, a care home or a hospice rather than a hospital mortuary. Maximum total: £1,749. No regional supplement, no hidden fees at the point of need.`),
      ],
    },
    { _type: 'longFormSection', sectionRole: '03-process',
      heading: `How arranging a direct cremation in ${N} works`,
      body: [
        pt(`When you call us from ${N}, we take the essential details, appoint your local Best Funeral Director, and they attend the collection at the place of death — typically within 24 hours. You register the death at the local register office (this only the next of kin can do in person), and the local funeral director handles everything from there: paperwork, the cremation at your closest local crematorium, and the return of the ashes to you.`),
      ],
    },
    { _type: 'longFormSection', sectionRole: '04-local-team',
      heading: `Your local funeral director in ${N}`,
      body: [
        pt(`Best Direct Cremation partners with vetted independent Best Funeral Directors across ${countyName}. They are members of the NAFD or SAIF (or both), locally based, and accountable to the community. If we do not yet have a named partner in your specific town within ${countyName}, we source a nearby vetted independent funeral director who meets the same standards — call us and we will confirm the specific coverage for your postcode.`),
      ],
    },
  ];
}

function faqs(t: { name: string }, countyName: string) {
  const N = t.name;
  return [
    { _type: 'faqItem',
      question: `Do you cover ${N}?`,
      answer: [pt(`Yes. Best Direct Cremation covers ${N} and the surrounding parts of ${countyName} via a network of vetted local independent funeral directors. Call 0333 242 1405 to confirm the specific coverage for your postcode.`)],
    },
    { _type: 'faqItem',
      question: `How much does a direct cremation cost in ${N}?`,
      answer: [pt(`£1,499 all-inclusive nationally, with a maximum of £1,749 if Priority Care collection (home, care home or hospice) is needed. Our pricing does not vary by region.`)],
    },
    { _type: 'faqItem',
      question: `Which crematorium will be used?`,
      answer: [pt(`The closest local crematorium to where your loved one lived — chosen by your local Best Funeral Director. Not a centralised operator-owned facility.`)],
    },
    { _type: 'faqItem',
      question: `How quickly can you attend?`,
      answer: [pt(`Typically within a few hours of your call, with collection within 24 hours in most cases. A real person answers 0333 242 1405 around the clock.`)],
    },
  ];
}

// Rough SEO metadata generator
function seoBlock(t: { name: string }, countyName: string) {
  const N = t.name;
  return {
    metaTitle: `Direct Cremation in ${N} — from £1,499 all-inclusive`.slice(0, 60),
    metaDescription: `£1,499 all-inclusive direct cremation in ${N}, ${countyName}, delivered locally by a vetted independent funeral director. Max £1,749 with Priority Care. Call 0333 242 1405.`.slice(0, 160),
  };
}

async function run() {
  console.log(`Expand-towns ${DRY_RUN ? '(dry run) ' : ''}— ${EXPANDED_TOWNS.length} candidates in the expanded list.`);

  // 1. Grab existing town slugs — skip any that already exist
  const existingSlugs = new Set<string>(
    await client.fetch<string[]>(`*[_type == "town"].slug.current`)
  );
  console.log(`Existing town docs in Sanity: ${existingSlugs.size}\n`);

  // 2. Grab all county slugs so we can verify each expanded town has a valid county
  const countySlugs = new Set<string>(
    await client.fetch<string[]>(`*[_type == "county"].slug.current`)
  );

  let inserted = 0;
  let skippedExisting = 0;
  let skippedNoCounty = 0;

  for (const t of EXPANDED_TOWNS) {
    if (existingSlugs.has(t.slug)) { skippedExisting++; continue; }
    if (!countySlugs.has(t.countySlug)) {
      console.log(`  ⚠ Skip ${t.name.padEnd(24)} — county '${t.countySlug}' not found in Sanity`);
      skippedNoCounty++;
      continue;
    }

    const countyName = t.countySlug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    const doc: any = {
      _type: 'town',
      _id: `town-${t.slug}`,
      name: t.name,
      slug: { _type: 'slug', current: t.slug },
      county: { _type: 'reference', _ref: `county-${t.countySlug}` },
      population: t.pop,
      coverageStatus: 'coming-soon',
      uniqueLocalAngle: `[Editor: replace with a 2-3 sentence locality-specific angle for ${t.name} — e.g. notable landmark, major employer, historical character, or community feature.]`,
      longFormSections: sections(t, countyName).map(s => ({
        ...s,
        body: enrichBlocks(s.body, t.slug),
      })),
      faqs: faqs(t, countyName),
      seo: seoBlock(t, countyName),
      lastReviewed: new Date().toISOString().split('T')[0],
    };

    ensureKeys(doc);

    if (!DRY_RUN) await client.create(doc);
    inserted++;
    console.log(`  + ${t.name.padEnd(24)} (${countyName})`);
  }

  console.log(`\n──────────────────────────────────────`);
  console.log(` Summary ${DRY_RUN ? '(DRY RUN)' : ''}`);
  console.log(`──────────────────────────────────────`);
  console.log(` Inserted: ${inserted}`);
  console.log(` Skipped (already exist): ${skippedExisting}`);
  console.log(` Skipped (county missing): ${skippedNoCounty}`);
  console.log(` Grand total towns after run: ${existingSlugs.size + (DRY_RUN ? inserted : inserted)}`);
  if (DRY_RUN) console.log(' Re-run without --dry-run to actually write.');
}

run().catch(err => { console.error(err); process.exit(1); });
