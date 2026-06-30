'use client';

import { useEffect, useRef, useState } from 'react';
import type { Heading } from '@/lib/portable-text-utils';

/**
 * "On this page" sticky table-of-contents for long-form articles.
 *
 * - Lists every h2 heading from the article body (h3s shown nested when includeH3)
 * - Click → smooth scroll to the corresponding heading
 * - IntersectionObserver highlights the section currently in view
 * - Hidden on mobile (sidebar pattern only works at lg+)
 *
 * Pair with the makePortableTextComponents() serializer, which assigns
 * matching IDs to the h2/h3 elements.
 */
export default function ArticleTOC({
  headings,
  title = 'On this page',
}: {
  headings: Heading[];
  title?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || headings.length === 0) return;

    // Track which heading is closest to the top of the viewport
    const elements = headings
      .map(h => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first heading currently above the viewport's mid-line
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    );

    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  if (headings.length < 2) return null; // Only show TOC when there are multiple sections

  return (
    <nav aria-label={title} className="bg-white rounded-2xl p-6 border border-stone">
      <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">{title}</p>
      <ul className="space-y-1.5 text-sm">
        {headings.map(h => (
          <li key={h.id} className={h.level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${h.id}`}
              className={`block leading-snug transition py-1 ${
                activeId === h.id
                  ? 'text-gold font-semibold border-l-2 border-gold pl-3 -ml-3'
                  : 'text-green hover:text-gold'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
