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
            <div className="relative h-56 md:h-64 bg-gradient-to-br from-ink/10 to-ink/20 flex items-center justify-center overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256" preserveAspectRatio="none">
                <circle cx="60" cy="128" r="8" fill="currentColor" className="text-ink/40" />
                <circle cx="60" cy="128" r="4" fill="white" />
                <text x="60" y="155" textAnchor="middle" className="text-[10px] fill-ink/55 uppercase tracking-wider font-semibold">Your home</text>
                <line x1="76" y1="128" x2="324" y2="128" strokeWidth="2" strokeDasharray="6 4" className="stroke-ink/35" />
                <circle cx="340" cy="128" r="14" fill="currentColor" className="text-ink/45" />
                <text x="340" y="158" textAnchor="middle" className="text-[10px] fill-ink/55 uppercase tracking-wider font-semibold">Operator&apos;s crematorium</text>
              </svg>
              <div className="absolute top-4 left-4 bg-ink/70 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
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
