'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

/**
 * Client-side directory search that filters instantly as the user types.
 *
 * Used on /crematoria/ and /register-offices/ hub pages. Filters the full
 * A-Z list by name, postcode, or county-name substring match. When search
 * is empty, renders {children} (the server-rendered A-Z browse). When there
 * is a query, replaces the browse with a ranked results list.
 *
 * Kept intentionally small — no fuzzy matching library. Substring + starts-with
 * ranking is enough for a ~200-entry list and keeps the bundle tiny.
 */
export type DirectoryItem = {
  name: string;
  slug: string;
  postcode?: string;
  counties: Array<{ name: string; slug: string; country?: string }>;
};

type Props = {
  items: DirectoryItem[];
  basePath: string;               // e.g. "/crematoria" or "/register-offices"
  label?: string;                 // input label / placeholder
  itemLabelSingular?: string;     // "crematorium" / "register office"
  itemLabelPlural?: string;       // "crematoria" / "register offices"
  children: React.ReactNode;      // the A-Z browse markup, shown when search is empty
};

export default function DirectorySearch({
  items,
  basePath,
  label = 'Search by name, postcode or county',
  itemLabelSingular = 'entry',
  itemLabelPlural = 'entries',
  children,
}: Props) {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];
    // Score each item: 3 = name starts-with, 2 = name contains, 1 = postcode/county match
    const scored: Array<{ item: DirectoryItem; score: number }> = [];
    for (const item of items) {
      const name = item.name.toLowerCase();
      const postcode = (item.postcode || '').toLowerCase();
      const counties = item.counties.map(c => c.name.toLowerCase()).join(' ');
      let score = 0;
      if (name.startsWith(query))        score = 3;
      else if (name.includes(query))     score = 2;
      else if (postcode.includes(query)) score = 1;
      else if (counties.includes(query)) score = 1;
      if (score > 0) scored.push({ item, score });
    }
    scored.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
    return scored.slice(0, 40).map(s => s.item);
  }, [items, query]);

  return (
    <div>
      {/* Search input */}
      <div className="mb-8">
        <label htmlFor="directory-search" className="sr-only">{label}</label>
        <div className="relative max-w-2xl">
          <svg
            aria-hidden
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40 pointer-events-none"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="directory-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={label}
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
            Or browse alphabetically / by country below · {items.length} {itemLabelPlural} listed
          </p>
        )}
      </div>

      {/* Results OR original browse */}
      {query ? (
        <section aria-live="polite" className="mb-10">
          {results.length === 0 ? (
            <div className="bg-cream rounded-2xl p-8 text-center">
              <p className="font-serif text-lg text-green mb-2">
                No {itemLabelPlural} match &ldquo;{q}&rdquo;
              </p>
              <p className="text-sm text-ink/70">
                Try a shorter search — a partial name, a postcode start (e.g. &ldquo;SW1&rdquo;), or the county name.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-ink/70 mb-4">
                {results.length === 40 ? `Top 40 matches for` : `${results.length} match${results.length === 1 ? '' : 'es'} for`}{' '}
                <span className="font-serif italic text-green">&ldquo;{q}&rdquo;</span>
              </p>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {results.map(r => (
                  <li key={r.slug}>
                    <Link
                      href={`${basePath}/${r.slug}/`}
                      className="block bg-white p-4 rounded-card border border-stone shadow-card hover:shadow-lift hover:border-gold transition"
                    >
                      <p className="font-serif text-green leading-snug">{r.name}</p>
                      {r.postcode && <p className="text-xs text-ink/60 font-mono mt-1">{r.postcode}</p>}
                      {r.counties.length > 0 && (
                        <p className="text-xs text-ink/55 mt-1">
                          Serving {r.counties.map(c => c.name).join(', ')}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      ) : (
        children
      )}
    </div>
  );
}
