import Image from 'next/image';
import Link from 'next/link';
import { IMG } from '@/lib/images';
import { SITE } from '@/lib/site';
import PhoneCTA from './PhoneCTA';

/**
 * Generic "Why Best Direct Cremation" USP block.
 * Local independent FD vs national chain — no specific competitor named.
 *
 * Used on every locality page, generic-term lander, and the homepage so
 * the BDC USP (local FD delivery, not centralised) lands instantly on
 * every entry point. Competitor-specific framing lives only on /compare/ pages.
 */
export default function WhyBdc({
  showCompareLink = true,
  title,
}: { showCompareLink?: boolean; title?: string } = {}) {
  return (
    <section className="bg-cream/40 border-y border-stone">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <p className="text-center text-sm uppercase tracking-widest text-gold font-semibold mb-3">
          Why families choose us
        </p>
        <h2 className="text-center font-serif text-2xl md:text-4xl text-green mb-4 max-w-3xl mx-auto leading-tight">
          {title || (<>Local independent funeral director <span className="text-gold italic">vs</span> national chain</>)}
        </h2>
        <p className="text-center text-ink/75 max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed">
          The biggest decision is where your loved one is cared for. We deliver every cremation through a vetted local
          funeral director — not a national chain&apos;s centralised network.
        </p>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">

          {/* BDC card — local FD with real photo */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lift border-2 border-gold/40 flex flex-col">
            <div className="relative h-56 md:h-64 bg-stone overflow-hidden">
              <Image
                src={IMG.fdShop}
                alt="A Best Funeral Director shop front — a real local independent funeral director"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                Best Direct Cremation
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <p className="text-xs uppercase tracking-wider text-green font-bold mb-2">Local model — {SITE.priceLabel}</p>
              <h3 className="font-serif text-2xl md:text-3xl text-green mb-5 leading-tight">
                Your local independent funeral director
              </h3>

              <ul className="space-y-3 mb-2 flex-1">
                <li className="flex items-start gap-3 text-sm md:text-base text-ink/85">
                  <span className="w-6 h-6 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span><strong className="text-green">NAFD or SAIF accredited</strong> — every partner funeral director vetted by us</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-ink/85">
                  <span className="w-6 h-6 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span><strong className="text-green">Cared for close to home</strong> — local funeral director&apos;s own mortuary, typically within 10–15 miles</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-ink/85">
                  <span className="w-6 h-6 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span><strong className="text-green">Closest local crematorium</strong> — not an operator-chosen one</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-ink/85">
                  <span className="w-6 h-6 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span><strong className="text-green">Real local accountability</strong> — your funeral director&apos;s name and reputation are in your community</span>
                </li>
              </ul>

              <div className="mt-6">
                <PhoneCTA size="md" variant="green" />
              </div>
            </div>
          </div>

          {/* National chain card — generic, no competitor named */}
          <div className="bg-white rounded-2xl overflow-hidden border border-stone flex flex-col">
            <div className="relative h-56 md:h-64 bg-gradient-to-br from-ink/[0.06] to-ink/[0.14] flex items-center justify-center overflow-hidden">
              {/* Distance-map illustration: small warm home pin on left, winding
                  dashed path across, imposing "mega crematorium" building on right. */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 256"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                {/* Distance label above the path */}
                <text x="200" y="46" textAnchor="middle"
                      style={{ fontSize: 11, letterSpacing: 1.2 }}
                      className="fill-ink/55 uppercase font-semibold">
                  Often 100+ miles
                </text>

                {/* Winding dashed route */}
                <path
                  d="M 74 128 C 130 78, 180 178, 230 100 S 280 172, 300 130"
                  fill="none"
                  strokeWidth="2.4"
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                  className="stroke-ink/40"
                />

                {/* HOME PIN (left) — small, warm gold, with tiny house glyph */}
                <g transform="translate(38 82)">
                  <ellipse cx="18" cy="60" rx="10" ry="2.5" className="fill-black/15" />
                  <path
                    d="M18 0 C28 0 34 8 34 18 C34 30 18 52 18 52 C18 52 2 30 2 18 C2 8 8 0 18 0 Z"
                    className="fill-gold"
                    stroke="#A6864F"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M18 9 L9 18 L11 18 L11 26 L25 26 L25 18 L27 18 Z M16 26 L16 21 L20 21 L20 26"
                    fill="white"
                  />
                </g>
                <text x="55" y="168" textAnchor="middle"
                      style={{ fontSize: 10, letterSpacing: 1.4 }}
                      className="fill-ink/75 uppercase font-bold">
                  Your local area
                </text>

                {/* MEGA CREMATORIUM (right) — imposing industrial building */}
                <g transform="translate(268 60)">
                  {/* Smoke plumes rising from chimney */}
                  <ellipse cx="76" cy="8"  rx="10" ry="6" className="fill-black/10" />
                  <ellipse cx="86" cy="0"  rx="9"  ry="5" className="fill-black/[0.07]" />
                  <ellipse cx="70" cy="-4" rx="7"  ry="4" className="fill-black/[0.05]" />
                  <ellipse cx="82" cy="18" rx="11" ry="6" className="fill-black/12" />

                  {/* Tall industrial chimney */}
                  <rect x="70" y="18" width="10" height="52" className="fill-ink/70" />
                  <rect x="67" y="16" width="16" height="5"  className="fill-ink/85" />
                  <rect x="72" y="22" width="1.5" height="46" className="fill-white/10" />

                  {/* Main factory-block body */}
                  <rect x="4" y="46" width="96" height="70" className="fill-ink/70" />
                  <rect x="4" y="46" width="96" height="4" className="fill-ink/85" />

                  {/* Rows of small institutional windows */}
                  {[58, 76, 94].map((y) => (
                    <g key={y}>
                      <rect x="12" y={y} width="7" height="9" className="fill-ink/45" />
                      <rect x="24" y={y} width="7" height="9" className="fill-ink/45" />
                      <rect x="36" y={y} width="7" height="9" className="fill-ink/45" />
                      <rect x="60" y={y} width="7" height="9" className="fill-ink/45" />
                      <rect x="72" y={y} width="7" height="9" className="fill-ink/45" />
                      <rect x="84" y={y} width="7" height="9" className="fill-ink/45" />
                    </g>
                  ))}

                  {/* Wide industrial entrance / delivery bay */}
                  <rect x="42" y="94" width="20" height="22" className="fill-ink/90" />
                  <line x1="52" y1="94" x2="52" y2="116" strokeWidth="0.5" className="stroke-white/20" />

                  {/* Ground shadow */}
                  <ellipse cx="52" cy="120" rx="60" ry="3" className="fill-black/15" />
                </g>
                <text x="320" y="200" textAnchor="middle"
                      style={{ fontSize: 11, letterSpacing: 1.4 }}
                      className="fill-ink/85 uppercase font-bold">
                  Mega crematorium
                </text>
                <text x="320" y="214" textAnchor="middle"
                      style={{ fontSize: 9, letterSpacing: 0.8 }}
                      className="fill-ink/55 uppercase font-semibold">
                  Not your local one
                </text>
              </svg>
              <div className="absolute top-4 left-4 bg-ink/80 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                National chain
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <p className="text-xs uppercase tracking-wider text-ink/60 font-bold mb-2">Centralised model — typically £1,800–£2,200</p>
              <h3 className="font-serif text-2xl md:text-3xl text-ink mb-5 leading-tight">
                Routed through a national operator&apos;s network
              </h3>

              <ul className="space-y-3 mb-2 flex-1">
                <li className="flex items-start gap-3 text-sm md:text-base text-ink/75">
                  <span className="w-6 h-6 rounded-full bg-ink/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-ink/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </span>
                  <span><strong>Operator&apos;s own staff or branch network</strong> — not an independent local funeral director</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-ink/75">
                  <span className="w-6 h-6 rounded-full bg-ink/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-ink/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </span>
                  <span><strong>Often moved significant distance</strong> from where they rest to the operator&apos;s chosen facility</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-ink/75">
                  <span className="w-6 h-6 rounded-full bg-ink/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-ink/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </span>
                  <span><strong>Cremation at an operator-owned/affiliated crematorium</strong> — not necessarily the nearest</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-ink/75">
                  <span className="w-6 h-6 rounded-full bg-ink/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-ink/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </span>
                  <span><strong>No local funeral director relationship</strong> in your community after the cremation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {showCompareLink && (
          <div className="text-center mt-10 md:mt-12">
            <Link href="/compare/" className="inline-flex items-center gap-2 text-green font-semibold hover:text-gold transition group">
              See full side-by-side provider comparisons
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
