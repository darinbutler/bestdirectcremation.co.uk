import Link from 'next/link';
import Container from './Container';

/**
 * Reusable callout linking to the cost calculator.
 * Variants:
 *   - 'card'   : full-width gold-tinted card (use mid-page or after a cost block)
 *   - 'tile'   : compact tile for sidebars
 *   - 'inline' : single-line text link (use within prose / sections)
 */
type Variant = 'card' | 'tile' | 'inline';

export default function CostCalculatorCTA({ variant = 'card' }: { variant?: Variant }) {
  if (variant === 'inline') {
    return (
      <Link href="/cost-calculator/" className="inline-flex items-center gap-1.5 text-green font-semibold hover:text-gold transition group">
        Try the cost calculator
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </Link>
    );
  }

  if (variant === 'tile') {
    return (
      <Link href="/cost-calculator/" className="block bg-cream rounded-2xl p-5 border border-stone hover:border-gold hover:shadow-card transition group">
        <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
          </svg>
          Cost calculator
        </p>
        <p className="font-serif text-green leading-snug mb-1">See your saving by region</p>
        <p className="text-xs text-ink/70">Compare £1,499 vs the alternatives in 30 seconds.</p>
        <p className="text-sm font-semibold text-gold mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          Try it
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </p>
      </Link>
    );
  }

  // Default card
  return (
    <section className="bg-gold/10 border-y border-gold/30">
      <Container className="py-10 md:py-12 max-w-4xl">
        <div className="md:flex md:items-center md:gap-8">
          <div className="md:w-2/3 mb-5 md:mb-0">
            <p className="text-xs uppercase tracking-wider text-gold-dark font-bold mb-2">Funeral cost calculator</p>
            <h2 className="font-serif text-2xl md:text-3xl text-green mb-2 leading-tight">
              See your saving in 30 seconds
            </h2>
            <p className="text-ink/85 leading-relaxed">
              Pick a funeral type and region. We&apos;ll show you the typical cost vs Best Direct
              Cremation&apos;s £1,499 — plus what every major UK provider charges.
            </p>
          </div>
          <div className="md:w-1/3 md:text-right">
            <Link
              href="/cost-calculator/"
              className="inline-flex items-center gap-2 bg-green text-white px-6 py-3 rounded-full font-semibold hover:bg-green-dark transition shadow-lift"
            >
              Open the calculator
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
