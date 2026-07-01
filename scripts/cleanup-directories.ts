/**
 * Retroactively clean up crematoria + register offices already in Sanity.
 *
 * Google Maps returns funeral directors, chapels of rest, stonemasons and
 * memorial masons for "crematorium near X" queries. Same problem for register
 * offices — solicitors and notaries sneak in.
 *
 * This script:
 *   1. Fetches every county doc with crematoria or registerOffices set
 *   2. Applies the same isCrematorium / isRegisterOffice classifiers as
 *      enrich-apify.ts (patched to filter forward)
 *   3. Also cleans town.nearestCrematoria arrays
 *   4. Writes back only the passing entries (patch .set)
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/cleanup-directories.ts
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/cleanup-directories.ts --dry-run
 *
 * Safe to run repeatedly — idempotent.
 */
import { createClient } from '@sanity/client';
import { isCrematorium, isRegisterOffice } from './lib/directory-filters';

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6';
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;
if (!TOKEN) throw new Error('Set SANITY_API_WRITE_TOKEN before running.');
const DRY_RUN    = process.argv.includes('--dry-run');

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-10-01', useCdn: false, token: TOKEN,
});

async function run() {
  console.log(`Cleanup ${DRY_RUN ? '(dry run) ' : ''}— removing non-crematoria / non-register-offices from Sanity…\n`);

  // County-level cleanup
  const counties = await client.fetch<Array<{
    _id: string; name: string; slug: { current: string };
    crematoria?: any[]; registerOffices?: any[];
  }>>(`
    *[_type == "county" && (defined(crematoria) || defined(registerOffices))] {
      _id, name, slug, crematoria, registerOffices
    }
  `);

  let totalCremRemoved = 0;
  let totalROremoved   = 0;
  let countiesTouched  = 0;

  for (const c of counties) {
    const crematoriaBefore = c.crematoria || [];
    const roBefore         = c.registerOffices || [];

    // Filter — keep only entries that pass the classifier
    const crematoriaKeep  = crematoriaBefore.filter(item => isCrematorium(item));
    const roKeep          = roBefore.filter(item => isRegisterOffice(item));

    const cremRemoved = crematoriaBefore.length - crematoriaKeep.length;
    const roRemoved   = roBefore.length - roKeep.length;

    if (cremRemoved === 0 && roRemoved === 0) continue;

    countiesTouched++;
    totalCremRemoved += cremRemoved;
    totalROremoved   += roRemoved;

    // Log what's being removed so it's auditable
    const droppedCrem = crematoriaBefore.filter(item => !isCrematorium(item)).map(x => x.name).filter(Boolean);
    const droppedRO   = roBefore.filter(item => !isRegisterOffice(item)).map(x => x.name).filter(Boolean);
    console.log(`\n  ${c.name}:`);
    if (droppedCrem.length) console.log(`    -${cremRemoved} crematoria: ${droppedCrem.join(' | ')}`);
    if (droppedRO.length)   console.log(`    -${roRemoved} register offices: ${droppedRO.join(' | ')}`);

    if (!DRY_RUN) {
      await client.patch(c._id).set({
        crematoria: crematoriaKeep,
        registerOffices: roKeep,
      }).commit();
    }
  }

  // Town-level cleanup (nearestCrematoria)
  console.log('\n\nCleaning town.nearestCrematoria arrays…\n');
  const towns = await client.fetch<Array<{
    _id: string; name: string; slug: { current: string };
    nearestCrematoria?: any[];
  }>>(`
    *[_type == "town" && defined(nearestCrematoria) && count(nearestCrematoria) > 0] {
      _id, name, slug, nearestCrematoria
    }
  `);

  let totalTownCremRemoved = 0;
  let townsTouched = 0;

  for (const t of towns) {
    const before = t.nearestCrematoria || [];
    const keep   = before.filter(item => isCrematorium(item));
    const removed = before.length - keep.length;
    if (removed === 0) continue;
    townsTouched++;
    totalTownCremRemoved += removed;

    const dropped = before.filter(item => !isCrematorium(item)).map(x => x.name).filter(Boolean);
    console.log(`  ${t.name.padEnd(28)} -${removed}: ${dropped.join(' | ')}`);

    if (!DRY_RUN) {
      await client.patch(t._id).set({ nearestCrematoria: keep }).commit();
    }
  }

  // Summary
  console.log('\n\n────────────────────────────────────────');
  console.log(` Summary ${DRY_RUN ? '(DRY RUN — nothing written)' : ''}`);
  console.log('────────────────────────────────────────');
  console.log(` Counties touched: ${countiesTouched} / ${counties.length}`);
  console.log(`   • Removed ${totalCremRemoved} bogus crematoria entries`);
  console.log(`   • Removed ${totalROremoved} bogus register office entries`);
  console.log(` Towns touched: ${townsTouched} / ${towns.length}`);
  console.log(`   • Removed ${totalTownCremRemoved} bogus nearest-crematoria entries`);
  console.log('');
  if (DRY_RUN) console.log(' Re-run without --dry-run to actually delete.');
  else         console.log(' Done. /crematoria/ and /register-offices/ hub pages will refresh via ISR within 1 hour.');
}

run().catch(err => { console.error(err); process.exit(1); });
