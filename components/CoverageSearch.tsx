'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

/**
 * Client-side search for the /coverage/ hub page.
 *
 * Filters both counties AND towns as the user types — a family searching for
 * "Bolton" (a town, not a county) still gets to the right locality page.
 *
 * When the search box is empty, renders {children} (the server-rendered
 * country-grouped A-Z browse). When there's a query, replaces that with a
 * combined ranked results list.
 */

export type CountyRow = {
  name: string;
  slug: string;
  country?: string;
  region?: string;
};

export type TownRow = {
  name: string;
  slug: string;
  county?: string;
  countySlug?: string;
};

type Props = {
  counties: CountyRow[];
  towns: TownRow[];
  children: React.ReactNode;
};

export default function CoverageSearch({ counties, towns, children }: Props) {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return { countyHits: [] as CountyRow[], townHits: [] as TownRow[] };

    const countyScore = (c: CountyRow) => {
      const n = c.name.toLowerCase();
      if (n === query) return 5;
      if (n.startsWith(query)) return 4;
      if (n.includes(query)) return 3;
      return 0;
    };
    const townScore = (t: TownRow) => {
      const n = t.name.toLowerCase();
      const c = (t.county || '').toLowerCase();
      if (n === query) return 5;
      if (n.startsWith(query)) return 4;
      if (n.includes(query)) return 3;
      if (c.includes(query)) return 1;
      return 0;
    };

    const scoredCounties = counties
      .map(c => ({ c, s: countyScore(c) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s || a.c.name.localeCompare(b.c.name))
      .slice(0, 30)
      .map(x => x.c);

    const scoredTowns = towns
      .map(t => ({ t, s: townScore(t) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s || a.t.name.localeCompare(b.t.name))
      .slice(0, 60)
      .map(x => x.t);

    return { countyHits: scoredCounties, townHits: scoredTowns };
  }, [counties, towns, query]);

  return (
    <div className="mb-10">
      {/* Search input */}
      <div className="max-w-2xl mb-8">
        <label htmlFor="coverage-search" className="sr-only">Search for a town or county</label>
        <div className="relative">
          <svg aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40 pointer-events-none"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="coverage-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for your town, city or county…"
            autoComplete="off"
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-cream border-2 border-stone focus:border-gold focus:bg-white focus:outline-none text-base text-ink placeholder:text-ink/45 transition"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-ink/50 hover:bg-stone hover:text-ink transition inline-flex items-center justify-center text-xl leading-none"
            >
              ×
            </button>
          )}
        </div>
        {!query && (
          <p className="text-xs text-ink/55 mt-2">
            {counties.length} counties · {towns.length} towns · full A-Z browse below
          </p>
        )}
      </div>

      {query ? (
        <section aria-live="polite">
          {results.countyHits.length === 0 && results.townHits.length === 0 ? (
            <div className="bg-cream rounded-2xl p-8 text-center max-w-2xl">
              <p className="font-serif text-lg text-green mb-2">
                No match for &ldquo;{q}&rdquo;
              </p>
              <p className="text-sm text-ink/70">
                Try a shorter search, or call us on 0333 242 1405 — we cover every UK area even where we don&apos;t yet have a named page.
              </p>
            </div>
          ) : (
            <>
              {results.countyHits.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-widest text-gold font-bold mb-3">
                    Counties matching &ldquo;{q}&rdquo; ({results.countyHits.length})
                  </p>
                  <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {results.countyHits.map(c => (
                      <li key={c.slug}>
                        <Link href={`/${c.slug}/`} className="block bg-white p-4 rounded-card shadow-card hover:shadow-lift hover:border-gold border border-transparent transition">
                          <p className="font-serif text-green">Direct cremation in {c.name}</p>
                          <p className="text-xs text-ink/55 mt-1">{c.country || ''}{c.region && c.region !== c.country ? ` · ${c.region}` : ''}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {results.townHits.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold font-bold mb-3">
                    Towns & cities matching &ldquo;{q}&rdquo; ({results.townHits.length})
                  </p>
                  <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {results.townHits.map(t => (
                      <li key={`${t.countySlug}-${t.slug}`}>
                        <Link href={`/${t.countySlug}/${t.slug}/`} className="block bg-white p-4 rounded-card shadow-card hover:shadow-lift hover:border-gold border border-transparent transition">
                          <p className="font-serif text-green">Direct cremation in {t.name}</p>
                          {t.county && <p className="text-xs text-ink/55 mt-1">{t.county}</p>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>
      ) : (
        children
      )}
    </div>
  );
}
