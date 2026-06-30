/**
 * Crematorium directory helpers.
 *
 * Crematoria are stored as inline objects on county documents (Apify
 * enrichment populates them). A single crematorium can appear in multiple
 * counties (border crematoria serve adjacent areas), so we dedupe by name
 * + postcode, and remember which counties each one serves.
 */
import { slugifyHeading } from './portable-text-utils';

export type RawCrematorium = {
  name: string;
  address?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
  website?: string;
};

export type CrematoriumRow = {
  name: string;
  slug: string;
  address?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  /** Counties where this crematorium is listed (in case it serves multiple) */
  counties: Array<{ name: string; slug: string; country: string }>;
};

export type CountyCrematoriumGroup = {
  countyName: string;
  countySlug: string;
  country: string;
  crematoria: RawCrematorium[];
};

/** Build a unique slug for a crematorium based on name + postcode (more stable than name alone). */
export function crematoriumSlug(name: string, postcode?: string): string {
  const base = slugifyHeading(name);
  if (postcode) {
    const pcShort = postcode.toLowerCase().replace(/\s+/g, '').slice(0, 4);
    return `${base}-${pcShort}`.slice(0, 70);
  }
  return base;
}

/**
 * Dedupe crematoria across all counties.
 * Returns a Map keyed by slug, each containing the canonical crematorium + the list
 * of counties it appears in.
 */
export function deduplicate(groups: CountyCrematoriumGroup[]): Map<string, CrematoriumRow> {
  const out = new Map<string, CrematoriumRow>();
  for (const group of groups) {
    if (!Array.isArray(group.crematoria)) continue;
    for (const c of group.crematoria) {
      if (!c?.name) continue;
      const slug = crematoriumSlug(c.name, c.postcode);
      if (!out.has(slug)) {
        out.set(slug, {
          name: c.name,
          slug,
          address: c.address,
          postcode: c.postcode,
          latitude: c.latitude,
          longitude: c.longitude,
          website: c.website,
          counties: [],
        });
      }
      const entry = out.get(slug)!;
      // Add this county if not already in the list
      if (!entry.counties.find(co => co.slug === group.countySlug)) {
        entry.counties.push({
          name: group.countyName,
          slug: group.countySlug,
          country: group.country,
        });
      }
    }
  }
  return out;
}

/** Sort by name alphabetically — used for the hub listing. */
export function sortedByName(map: Map<string, CrematoriumRow>): CrematoriumRow[] {
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Group by country for the hub display. */
export function groupedByCountry(rows: CrematoriumRow[]): Record<string, CrematoriumRow[]> {
  const out: Record<string, CrematoriumRow[]> = {};
  for (const row of rows) {
    // Use the first county's country as primary; most crematoria are within one country
    const country = row.counties[0]?.country || 'Other';
    (out[country] ||= []).push(row);
  }
  return out;
}
