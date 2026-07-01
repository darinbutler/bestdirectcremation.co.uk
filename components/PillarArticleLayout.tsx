import Link from 'next/link';
import Container from './Container';
import PhoneCTA from './PhoneCTA';
import { SITE } from '@/lib/site';

/**
 * Two-column reading layout for hand-coded pillar pages
 * (/direct-cremation/, /compare/, /near-me/, etc).
 *
 * Left column: the article body (children).
 * Right column: sticky sidebar with:
 *   - "Arrange a direct cremation today" price + phone CTA card
 *   - Cost calculator link
 *   - Trust bullets (accreditation)
 *
 * Behind the whole thing: a giant decorative "B" glyph in the far margin,
 * only visible on xl+ screens, at very low opacity — breaks up the whitespace
 * on wide monitors without competing with the reading content.
 *
 * Below lg: sidebar hides, content stacks single-column as before.
 */
export default function PillarArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative bg-white overflow-hidden">

      {/* Decorative B watermark — LEFT side.
          Sized big to genuinely fill the whitespace on wide monitors. Kept
          at low opacity so it accentuates without competing with reading. */}
      <img
        src="/b-mark.jpg"
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="hidden xl:block absolute pointer-events-none select-none z-0"
        style={{
          left: '-14rem',
          top: '2rem',
          width: '54rem',
          height: 'auto',
          opacity: 0.06,
        }}
      />

      {/* Decorative B watermark — RIGHT side, mirrored, further down.
          Also uses /public/b-mark.png. */}
      <img
        src="/b-mark.jpg"
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="hidden xl:block absolute pointer-events-none select-none z-0"
        style={{
          right: '-12rem',
          top: '54rem',
          width: '46rem',
          height: 'auto',
          opacity: 0.05,
          transform: 'scaleX(-1)',
        }}
      />

      <Container className="relative z-10 py-12 md:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14">

          {/* LEFT: article body */}
          <div className="max-w-3xl">
            {children}
          </div>

          {/* RIGHT: sticky sidebar (hidden on mobile/tablet) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">

              {/* Price + phone card */}
              <div className="bg-cream rounded-2xl p-6 border border-stone shadow-card">
                <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2">
                  Arrange a direct cremation today
                </p>
                <p className="font-serif text-4xl text-green leading-none mb-1">£1,499</p>
                <p className="text-xs text-ink/70 mb-4">
                  all-inclusive · max £1,749 with Priority Care
                </p>
                <PhoneCTA size="md" variant="green" />
                <p className="text-xs italic text-green mt-3 font-medium">
                  {SITE.promiseSubtext || 'Here whenever you need us — 24 hours a day'}
                </p>
              </div>

              {/* Cost calculator link */}
              <Link
                href="/cost-calculator/"
                className="block bg-white rounded-2xl p-5 border border-gold/40 hover:border-gold hover:shadow-card transition group"
              >
                <p className="text-xs uppercase tracking-wider text-gold font-bold mb-1.5 flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="10" x2="8" y2="10" />
                    <line x1="12" y1="10" x2="12" y2="10" />
                    <line x1="16" y1="10" x2="16" y2="10" />
                    <line x1="8" y1="14" x2="8" y2="14" />
                    <line x1="12" y1="14" x2="12" y2="14" />
                    <line x1="16" y1="14" x2="16" y2="14" />
                    <line x1="8" y1="18" x2="16" y2="18" />
                  </svg>
                  Cost calculator
                </p>
                <p className="font-serif text-lg text-green mb-1 leading-snug">
                  See your saving in 30 seconds
                </p>
                <p className="text-xs text-ink/60">
                  Compare with Pure, Co-op, Dignity and other UK providers
                </p>
                <p className="text-xs text-gold font-medium mt-2 group-hover:underline">Open calculator →</p>
              </Link>

              {/* Trust bullets */}
              <div className="bg-white rounded-2xl p-5 border border-stone/60 shadow-card">
                <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">
                  Why families choose us
                </p>
                <ul className="space-y-2 text-sm text-ink/85">
                  <li className="flex gap-2">
                    <span className="text-gold flex-shrink-0">✓</span>
                    <span>NAFD or SAIF accredited local network</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold flex-shrink-0">✓</span>
                    <span>Local independent funeral director — not centralised</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold flex-shrink-0">✓</span>
                    <span>Real person on the phone, never a chatbot</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold flex-shrink-0">✓</span>
                    <span>Transparent max price — £1,749, no surprises</span>
                  </li>
                </ul>
              </div>

            </div>
          </aside>

        </div>
      </Container>
    </section>
  );
}
