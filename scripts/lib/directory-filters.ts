/**
 * Classify Google Maps scrape results — distinguishes genuine crematoria and
 * register offices from the funeral directors, undertakers, chapels of rest,
 * and solicitors that "crematorium near X" queries also return.
 *
 * Used by:
 *   - scripts/enrich-apify.ts (filter at ingest so bad entries never reach Sanity)
 *   - scripts/cleanup-directories.ts (retroactively remove bad entries already in Sanity)
 */

// Words that mean this is definitely NOT a crematorium — these are
// businesses that Google Maps mistakenly returns for "crematorium near X":
// funeral directors, undertakers, competitor cremation-service brands, and
// stone/memorial trades. Anything that OFFERS cremation (rather than IS a
// crematorium facility) is a competitor to Best Direct Cremation, not a
// directory entry — so reject those too.
const CREMATORIUM_REJECT = [
  // Funeral trade
  'funeral service',
  'funeral director',
  'funeral home',
  'funeral parlour',
  'funeral parlor',
  'funeralcare',              // Co-op Funeralcare
  'undertaker',
  'chapel of rest',
  'memorial service',
  // Stone / coffin / masonry trade
  'coffin',
  'monumental',
  'headstone',
  'stonemason',
  'memorial mason',
  'memorial masons',
  'monumental mason',
  // Competitor cremation-service brands (they offer the service — they aren't crematoria)
  'pure cremation',
  'simplicity cremation',
  'aura cremation',
  'distinct cremation',
  'dignity funeral',
  'dignity plc',
  'direct cremation service',
  'direct cremation ltd',
  'direct cremation limited',
  'cremation services ltd',
  'cremation services limited',
  // Pet cremation / pet funeral — the directory is for humans only
  'pet cremation',
  'pet crematorium',
  'pet crematoria',
  'pet funeral',
  'pet undertaker',
  'pet cemetery',
  'animal cremation',
  'animal crematorium',
  'equine cremation',
  'dog cremation',
  'cat cremation',
];

// Positive signals — a real crematorium name typically contains these words.
// If we see one of these AND no reject word, it's a crematorium.
//
// Note on "cemetery": many UK council-operated crematoria are part of a
// cemetery-and-crematorium facility, and Google Maps often returns them under
// the shorter cemetery name (e.g. "City of London Cemetery" is actually
// "City of London Cemetery and Crematorium"; "Warriston Cemetery" contains
// Warriston Crematorium; same for East London, Droylsden, Everton, Morningside
// etc.). Accepting "cemetery" catches these real crematoria — the small
// number of pure-cemetery false positives are outweighed by the many missed
// true positives.
const CREMATORIUM_ACCEPT = [
  'crematorium',
  'crematorio',       // occasional Italian-heritage listing
  'crematoria',       // rare plural in official name
  'cremation centre',
  'garden of remembrance',   // sometimes named this way
  'memorial park',           // sometimes the crematorium is part of a memorial park
  'cemetery',                // most UK council cemeteries house on-site crematoria
];

// Register office positive signals
const REGISTER_ACCEPT = [
  'register office',
  'registration office',
  'registrar',
  'registration service',
  'registration authority',
  'births, deaths and marriages',
  'births, marriages and deaths',
  'births marriages deaths',
  'civic centre',                 // often houses the register office
];

const REGISTER_REJECT = [
  'funeral',
  'funeralcare',
  'undertaker',
  'crematorium',
  'crematoria',
  'cremation',
  'cemetery',
  'solicitor',
  'law firm',
  'notary public',
  'stonemason',
  'monumental',
  'memorial mason',
  'pet',
  'animal',
];

function normaliseName(name: string): string {
  return (name || '').toLowerCase().replace(/[^a-z0-9\s,]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function isCrematorium(item: { name?: string; category?: string; categories?: string[] }): boolean {
  const name = normaliseName(item.name || '');
  if (!name) return false;

  const category = (item.category || '').toLowerCase();
  const categories = (item.categories || []).map(c => c.toLowerCase()).join(' ');
  const catBlob = `${category} ${categories}`;

  // Reject pet / animal / funeral / competitor entries via CATEGORY first —
  // this catches generically-named businesses (e.g. "Rex's Farewell") where
  // the name reveals nothing but the Google Maps category says "Pet crematorium".
  if (catBlob.includes('pet cremat')) return false;
  if (catBlob.includes('pet ceme')) return false;
  if (catBlob.includes('animal cremat')) return false;
  if (catBlob.includes('funeral director')) return false;
  if (catBlob.includes('funeral home')) return false;
  if (catBlob.includes('funeral service')) return false;
  if (catBlob.includes('undertaker')) return false;

  // Reject known bad names — funeral directors, competitor brands, pet /
  // animal cremation businesses, stone / memorial trades.
  for (const bad of CREMATORIUM_REJECT) if (name.includes(bad)) return false;

  // Accept if any positive signal is present in the name
  for (const good of CREMATORIUM_ACCEPT) if (name.includes(good)) return true;

  // Accept if the Google Maps category itself is "Crematorium" (most reliable
  // signal — but only after all the above rejects have been applied)
  if (catBlob.includes('crematorium')) return true;

  // No positive signal → reject. Better to under-list than to show wrong entries.
  return false;
}

export function isRegisterOffice(item: { name?: string; category?: string; categories?: string[] }): boolean {
  const name = normaliseName(item.name || '');
  if (!name) return false;

  const category = (item.category || '').toLowerCase();
  const categories = (item.categories || []).map(c => c.toLowerCase()).join(' ');
  const catBlob = `${category} ${categories}`;

  // Category-first rejection catches generically-named businesses whose
  // Google Maps category reveals what they actually are.
  if (catBlob.includes('funeral')) return false;
  if (catBlob.includes('crematorium')) return false;
  if (catBlob.includes('cremation')) return false;
  if (catBlob.includes('cemetery')) return false;
  if (catBlob.includes('pet')) return false;
  if (catBlob.includes('solicitor')) return false;
  if (catBlob.includes('undertaker')) return false;

  for (const bad of REGISTER_REJECT) if (name.includes(bad)) return false;

  for (const good of REGISTER_ACCEPT) if (name.includes(good)) return true;

  if (catBlob.includes('register office')) return true;
  if (catBlob.includes('local government office') && name.includes('registrar')) return true;

  return false;
}
