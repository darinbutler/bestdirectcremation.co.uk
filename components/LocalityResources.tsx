import Link from 'next/link';
import Container from './Container';

/**
 * Resources panel for locality (county/town) pages.
 * Provides a curated set of cross-section links so locality pages
 * aren't dead-ends — calculator, comparisons, and high-value help articles.
 */
export default function LocalityResources({ areaName }: { areaName: string }) {
  const resources: { href: string; label: string; sub: string }[] = [
    { href: '/cost-calculator/',                 label: 'Funeral cost calculator',          sub: 'See your saving by region in 30 seconds' },
    { href: '/compare/',                         label: 'Compare UK direct cremation providers', sub: 'Best Direct Cremation vs Pure, Co-op, Dignity & more' },
    { href: '/help/what-to-do-when-someone-dies/', label: 'What to do when someone dies',      sub: 'Step-by-step UK practical guide' },
    { href: '/help/cost-of-a-funeral/',          label: 'Cost of a funeral UK 2026',        sub: 'Pricing breakdown + financial help options' },
    { href: '/help/how-direct-cremation-works/', label: 'How direct cremation works',       sub: 'Step-by-step process explained' },
    { href: '/help/choosing-a-funeral-director/', label: 'Choosing a funeral director',     sub: 'NAFD/SAIF accreditation + 7-question checklist' },
  ];

  return (
    <section className="bg-cream/40 border-y border-stone">
      <Container className="py-12 md:py-16">
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">More resources</p>
        <h2 className="font-serif text-section text-green mb-3">Helpful guidance for families in {areaName}</h2>
        <p className="text-ink/75 mb-8 max-w-2xl">
          Whether you&apos;re planning ahead or arranging a cremation today, these guides cover the practical and financial
          questions families ask most often.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map(r => (
            <li key={r.href}>
              <Link href={r.href} className="block bg-white p-5 rounded-card shadow-card hover:shadow-lift transition border border-transparent hover:border-gold group">
                <p className="font-serif text-green text-base leading-snug mb-1">{r.label}</p>
                <p className="text-xs text-ink/65 leading-relaxed">{r.sub}</p>
                <p className="mt-3 text-xs text-gold font-semibold inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Read
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
