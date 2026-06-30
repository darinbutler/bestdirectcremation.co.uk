'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { PRIMARY_NAV, FOOTER_SECTIONS } from '@/lib/nav';

/**
 * Mobile drawer menu. Opens from the right with the full nav including
 * deeper footer sections (locations, funeral plans cluster, help articles).
 *
 * Closed by default; toggled by the hamburger button in Header.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on route change (next/link hits)
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, [open]);

  return (
    <>
      {/* Hamburger trigger — md:hidden so desktop never sees it */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-green hover:bg-cream/50"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-[88%] max-w-sm bg-white shadow-lift transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between p-4 border-b border-stone">
          <span className="font-serif text-green text-lg">{SITE.name}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md text-green hover:bg-cream"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100%-65px)] pb-32">
          {/* Primary nav */}
          <ul className="border-b border-stone">
            {PRIMARY_NAV.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-4 text-lg font-serif text-green hover:bg-cream"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Deeper sections — same content as footer sitemap */}
          {FOOTER_SECTIONS.map(section => (
            <details key={section.title} className="border-b border-stone group">
              <summary className="px-5 py-4 text-base font-bold text-green cursor-pointer hover:bg-cream list-none flex items-center justify-between">
                {section.title}
                <svg className="w-4 h-4 text-gold transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <ul className="bg-cream/40 pb-2">
                {section.links.map(l => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block px-7 py-2.5 text-sm text-ink/85 hover:text-green"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}

          {/* Phone CTA */}
          <div className="p-5">
            <a
              href={SITE.phoneHref}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full bg-green text-white font-semibold"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {SITE.phone}
            </a>
            <p className="text-center text-xs italic text-green mt-2 font-medium">{SITE.promiseSubtext}</p>
          </div>
        </nav>
      </aside>
    </>
  );
}
