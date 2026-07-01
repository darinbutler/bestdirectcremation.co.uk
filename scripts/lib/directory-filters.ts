/**
 * Classify Google Maps scrape results — distinguishes genuine crematoria and
 * register offices from the funeral directors, undertakers, chapels of rest,
 * and solicitors that "crematorium near X" queries also return.
 *
 * Used by:
 *   - scripts/enrich-apify.ts (filter at ingest so bad entries never reach Sanity)
 *   - scripts/cleanup-directories.ts (retroactively remove bad entries already in Sanity)
 */

// Words that mean this is definitely NOT a crematorium — these strings are
// funeral-industry terms that Google Maps mistakenly returns for our query.
const CREMATORIUM_REJECT = [
  'funeral service',
  'funeral director',
  'funeral home',
  'funeral parlour',
  'funeral parlor',
  'undertaker',
  'chapel of rest',
  'memorial service',
  'coffin',
  'monumental',
  'headstone',
  'stonemason',
];

// Positive signals — a real crematorium name typically contains these words.
// If we see one of these AND no reject word, it's a crematorium.
const CREMATORIUM_ACCEPT = [
  'crematorium',
  'crematorio',       // occasional Italian-heritage listing
  'crematoria',       // rare plural in official name
  'cremation centre',
  'garden of remembrance',   // sometimes named this way
  'memorial park',           // sometimes the crematorium is part of a memorial park
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
  'solicitor',
  'law firm',
  'notary public',
];

function normaliseName(name: string): string {
  return (name || '').toLowerCase().replace(/[^a-z0-9\s,]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function isCrematorium(item: { name?: string; category?: string; categories?: string[] }): boolean {
  const name = normaliseName(item.name || '');
  if (!name) return false;

  // Reject known funeral-industry names outright
  for (const bad of CREMATORIUM_REJECT) if (name.includes(bad)) return false;

  // Accept if any positive signal is present
  for (const good of CREMATORIUM_ACCEPT) if (name.includes(good)) return true;

  // Accept if the Google Maps category itself is "Crematorium" (most reliable signal)
  const category = (item.category || '').toLowerCase();
  const categories = (item.categories || []).map(c => c.toLowerCase()).join(' ');
  if (category.includes('crematorium') || categories.includes('crematorium')) return true;

  // No positive signal → reject. Better to under-list than to show wrong entries.
  return false;
}

export function isRegisterOffice(item: { name?: string; category?: string; categories?: string[] }): boolean {
  const name = normaliseName(item.name || '');
  if (!name) return false;

  for (const bad of REGISTER_REJECT) if (name.includes(bad)) return false;

  for (const good of REGISTER_ACCEPT) if (name.includes(good)) return true;

  const category = (item.category || '').toLowerCase();
  const categories = (item.categories || []).map(c => c.toLowerCase()).join(' ');
  if (category.includes('register office') || categories.includes('register office')) return true;
  if (category.includes('local government office') && name.includes('registrar')) return true;

  return false;
}
