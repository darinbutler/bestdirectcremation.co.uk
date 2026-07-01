/**
 * Register-offices directory helpers.
 * Same shape as crematoria.ts — dedupes by name + postcode, tracks counties served.
 */
import { slugifyHeading } from './portable-text-utils';

export type RawRegisterOffice = {
  name: string;
  address?: string;
  postcode?: string;
  phone?: string;
  website?: string;
};

export type RegisterOfficeRow = {
  name: string;
  slug: string;
  address?: string;
  postcode?: string;
  phone?: string;
  website?: string;
  counties: Array<{ name: string; slug: string; country: string }>;
};

export type CountyRegisterOfficeGroup = {
  countyName: string;
  countySlug: string;
  country: string;
  registerOffices: RawRegisterOffice[];
};

export function registerOfficeSlug(name: string, postcode?: string): string {
  const base = slugifyHeading(name);
  if (postcode) {
    const pcShort = postcode.toLowerCase().replace(/\s+/g, '').slice(0, 4);
    return `${base}-${pcShort}`.slice(0, 70);
  }
  return base;
}

export function deduplicate(groups: CountyRegisterOfficeGroup[]): Map<string, RegisterOfficeRow> {
  const out = new Map<string, RegisterOfficeRow>();
  for (const group of groups) {
    if (!Array.isArray(group.registerOffices)) continue;
    for (const r of group.registerOffices) {
      if (!r?.name) continue;
      const slug = registerOfficeSlug(r.name, r.postcode);
      if (!out.has(slug)) {
        out.set(slug, {
          name: r.name,
          slug,
          address: r.address,
          postcode: r.postcode,
          phone: r.phone,
          website: r.website,
          counties: [],
        });
      }
      const entry = out.get(slug)!;
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

export function sortedByName(map: Map<string, RegisterOfficeRow>): RegisterOfficeRow[] {
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function groupedByCountry(rows: RegisterOfficeRow[]): Record<string, RegisterOfficeRow[]> {
  const out: Record<string, RegisterOfficeRow[]> = {};
  for (const row of rows) {
    const country = row.counties[0]?.country || 'Other';
    (out[country] ||= []).push(row);
  }
  return out;
}
