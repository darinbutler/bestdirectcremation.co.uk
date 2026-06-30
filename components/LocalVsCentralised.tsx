import Image from 'next/image';
import { IMG } from '@/lib/images';
import type { ComparisonTable } from '@/lib/comparisonTables';

/**
 * The headline differentiator on every comparison page.
 * Side-by-side cards showing the structural difference between BDC's
 * local-FD model and the competitor's centralised/national model.
 *
 * BDC side uses real photography (FD shop) to make it tangible.
 * Competitor side uses an iconographic treatment to signal the abstract,
 * distant nature of a centralised hub.
 */
export default function LocalVsCentralised({ table }: { table: ComparisonTable }) {
  const { bdcModel, competitorModel, competitorName } = table;

  return (
    <section className="bg-cream/40 border-y border-stone">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <p className="text-center text-sm uppercase tracking-widest text-gold font-semibold mb-3">
          The biggest structural difference
        </p>
        <h2 className="text-center font-serif text-2xl md:text-4xl text-green mb-4 max-w-3xl mx-auto leading-tight">
          Where your loved one is actually cared for
        </h2>
        <p className="text-center text-ink/75 max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed">
          This is the choice that matters most — and the one most providers don&apos;t want you to think about.
        </p>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">

          {/* BDC — local FD, with real photo */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lift border-2 border-gold/40 flex flex-col">
            <div className="relative h-56 md:h-64 bg-stone overflow-hidden">
              <Image
                src={IMG.fdShop}
                alt="Best Funeral Director shop front — a real local independent funeral director"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                Best Direct Cremation
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <p className="text-xs uppercase tracking-wider text-green font-bold mb-2">Local model</p>
              <h3 className="font-serif text-2xl md:text-3xl text-green mb-3 leading-tight">
                {bdcModel.headline}
              </h3>

              {/* Distance pill */}
              <div className="inline-flex items-center gap-2 bg-green/10 text-green text-sm font-semibold px-4 py-2 rounded-full mb-5 self-start">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {bdcModel.distance}
              </div>

              <div className="bg-cream/60 rounded-xl p-4 md:p-5 mb-5">
                <p className="text-xs uppercase tracking-wider text-ink/55 font-semibold mb-1">Care location</p>
                <p className="font-serif text-green text-lg">{bdcModel.careLocation}</p>
              </div>

              <ul className="space-y-2.5 mt-auto">
                {bdcModel.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-ink/85">
                    <span className="w-6 h-6 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Competitor — centralised, iconographic */}
          <div className="bg-white rounded-2xl overflow-hidden border border-stone flex flex-col">
            <div className="relative h-56 md:h-64 bg-gradient-to-br from-ink/10 to-ink/20 flex items-center justify-center overflow-hidden">
              {/* Distance line illustration */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256" preserveAspectRatio="none">
                <defs>
                  <pattern id="dashes" patternUnits="userSpaceOnUse" width="20" height="2">
                    <line x1="0" y1="1" x2="10" y2="1" stroke="currentColor" strokeWidth="2" className="text-ink/30" />
                  </pattern>
                </defs>
                {/* Home pin (left) */}
                <circle cx="60" cy="128" r="8" fill="currentColor" className="text-ink/40" />
                <circle cx="60" cy="128" r="4" fill="white" />
                <text x="60" y="155" textAnchor="middle" className="text-[10px] fill-ink/55 uppercase tracking-wider font-semibold">Your home</text>
                {/* Dashed line */}
                <line x1="76" y1="128" x2="324" y2="128" strokeWidth="2" strokeDasharray="6 4" className="stroke-ink/35" />
                {/* Hub pin (right) */}
                <circle cx="340" cy="128" r="14" fill="currentColor" className="text-ink/45" />
                <text x="340" y="158" textAnchor="middle" className="text-[10px] fill-ink/55 uppercase tracking-wider font-semibold">Operator&apos;s crematorium</text>
              </svg>
              <div className="absolute top-4 left-4 bg-ink/70 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                {competitorName}
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <p className="text-xs uppercase tracking-wider text-ink/60 font-bold mb-2">Centralised model</p>
              <h3 className="font-serif text-2xl md:text-3xl text-ink mb-3 leading-tight">
                {competitorModel.headline}
              </h3>

              {/* Distance pill */}
              <div className="inline-flex items-center gap-2 bg-ink/10 text-ink/70 text-sm font-semibold px-4 py-2 rounded-full mb-5 self-start">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
                {competitorModel.distance}
              </div>

              <div className="bg-stone/60 rounded-xl p-4 md:p-5 mb-5">
                <p className="text-xs uppercase tracking-wider text-ink/55 font-semibold mb-1">Care location</p>
                <p className="font-serif text-ink text-lg">{competitorModel.careLocation}</p>
              </div>

              <ul className="space-y-2.5 mt-auto">
                {competitorModel.drawbacks.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-ink/75">
                    <span className="w-6 h-6 rounded-full bg-ink/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-ink/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
