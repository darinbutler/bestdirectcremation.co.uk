'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Search input — submits to /search?q=...
 * Compact pill-styled input that fits in the header bar.
 */
export default function SearchInput({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={compact ? 'relative' : 'relative w-full'}>
      <label htmlFor="bdc-search" className="sr-only">Search Best Direct Cremation</label>
      <input
        id="bdc-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={compact ? 'Search…' : 'Search counties, articles, terms…'}
        className={`${compact ? 'w-44 lg:w-56 pl-9 pr-3 py-2 text-sm' : 'w-full pl-11 pr-4 py-3 text-base'} bg-cream rounded-full border border-stone focus:bg-white focus:border-gold focus:outline-none placeholder:text-ink/45 text-ink`}
        autoComplete="off"
        minLength={2}
      />
      <span className={`absolute ${compact ? 'left-3 top-2' : 'left-4 top-3.5'} pointer-events-none text-ink/45`}>
        <svg className={compact ? 'w-4 h-4' : 'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
    </form>
  );
}
