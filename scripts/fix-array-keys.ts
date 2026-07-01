/**
 * Retroactively add `_key` to every array item in every Sanity document.
 *
 * Sanity requires each item in an array to have a unique `_key` string —
 * without it, the Studio shows "Missing keys" warnings on the longFormSections
 * and faqs arrays and blocks in-place editing. The ingest scripts (v1)
 * generated these arrays without `_key`, so every county/town/article/generic
 * has this issue.
 *
 * This script walks every doc recursively and adds a stable random `_key` to
 * any array item that doesn't already have one. Existing keys are preserved
 * so the script is idempotent — safe to run any number of times.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/fix-array-keys.ts
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/fix-array-keys.ts --dry-run
 */
import { createClient } from '@sanity/client';
import { randomBytes } from 'crypto';

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6';
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;
if (!TOKEN) throw new Error('Set SANITY_API_WRITE_TOKEN before running.');
const DRY_RUN = process.argv.includes('--dry-run');

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-10-01', useCdn: false, token: TOKEN,
});

/** Generate a compact random key (12 hex chars). Sanity requires string _key. */
function newKey(): string {
  return randomBytes(6).toString('hex');
}

/** True if v is a plain object (not an array, not null). */
function isPlainObject(v: any): v is Record<string, any> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

/**
 * Walk value recursively; for every array encountered, ensure each element
 * (that is an object) has a `_key`. Return true if any change was made.
 * Note: `_key` is only required on array ITEMS, not top-level fields.
 */
function ensureKeys(value: any): boolean {
  let changed = false;
  if (Array.isArray(value)) {
    for (const item of value) {
      if (isPlainObject(item)) {
        if (!item._key) { item._key = newKey(); changed = true; }
        // Recurse into item to catch nested arrays (body blocks etc)
        for (const k of Object.keys(item)) {
          if (ensureKeys(item[k])) changed = true;
        }
      }
    }
  } else if (isPlainObject(value)) {
    for (const k of Object.keys(value)) {
      if (ensureKeys(value[k])) changed = true;
    }
  }
  return changed;
}

/** Which fields to strip when re-uploading — Sanity system fields. */
const SYSTEM_FIELDS = new Set(['_id', '_type', '_rev', '_createdAt', '_updatedAt']);

async function run() {
  console.log(`Fix array _key values ${DRY_RUN ? '(dry run) ' : ''}across all documents…\n`);

  const types = ['county', 'town', 'article', 'genericTerm', 'partner', 'siteSettings', 'author'];

  let touchedCount = 0;
  let totalDocs = 0;

  for (const type of types) {
    const docs = await client.fetch<any[]>(
      `*[_type == $type]`,
      { type }
    );
    if (docs.length === 0) continue;
    console.log(`\n${type} (${docs.length} docs)`);

    for (const doc of docs) {
      totalDocs++;
      // Deep-clone to avoid mutating the fetched object in memory in confusing ways
      const workingCopy = JSON.parse(JSON.stringify(doc));
      const changed = ensureKeys(workingCopy);
      if (!changed) continue;

      touchedCount++;
      const title = doc.name || doc.title || doc._id;
      console.log(`  ✓ ${type} ${title.padEnd(40).slice(0, 40)} — added keys`);

      if (!DRY_RUN) {
        // Build a patch of only the top-level fields that contain the keyed arrays
        const patch: Record<string, any> = {};
        for (const k of Object.keys(workingCopy)) {
          if (SYSTEM_FIELDS.has(k)) continue;
          patch[k] = workingCopy[k];
        }
        await client.patch(doc._id).set(patch).commit();
      }
    }
  }

  console.log('\n──────────────────────────────────────');
  console.log(` Summary ${DRY_RUN ? '(DRY RUN)' : ''}`);
  console.log('──────────────────────────────────────');
  console.log(` Scanned ${totalDocs} documents`);
  console.log(` Patched ${touchedCount} documents (added missing _keys)`);
  if (DRY_RUN) console.log(' Re-run without --dry-run to actually write.');
  else         console.log(' Done. Refresh Studio to see "Missing keys" warnings clear.');
}

run().catch(err => { console.error(err); process.exit(1); });
