import PhoneCTA from './PhoneCTA';
import CountUp from './CountUp';
import { SITE } from '@/lib/site';
import type { ComparisonTable } from '@/lib/comparisonTables';

/**
 * Big bold price-differential block. Shown immediately under the hero
 * on every /compare/[slug]/ page. Makes the price advantage instantly
 * visible — no scrolling, no reading.
 */
export default function PriceDifferential({ table }: { table: ComparisonTable }) {
  const { pricing, competitorName } = table;
  const hasSavings = pricing.savings > 0;

  return (
    <section className="bg-gradient-to-b from-cream to-white border-b border-stone">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-14">
        <p className="text-center text-sm uppercase tracking-widest text-gold font-semibold mb-3">
          The price difference
        </p>
        <h2 className="text-center font-serif text-2xl md:text-3xl text-green mb-8 md:mb-10">
          {hasSavings ? (
            <>Save <span className="text-gold"><CountUp value={pricing.savings} /></span> with Best Direct Cremation</>
          ) : (
            <>Best Direct Cremation vs {competitorName}</>
          )}
        </h2>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-stretch max-w-5xl mx-auto">

          {/* BDC card — visually dominant */}
          <div className="relative bg-green text-white rounded-2xl px-6 py-8 md:px-10 md:py-12 shadow-lift">
            <div className="absolute -top-3 left-6 md:left-10 bg-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Recommended
            </div>
            <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Best Direct Cremation</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-serif text-5xl md:text-6xl text-white font-medium"><CountUp value={pricing.bdcPrice} /></span>
            </div>
            <p className="text-cream/85 text-sm md:text-base mb-5 leading-snug">{pricing.bdcLabel}</p>
            <ul className="space-y-1.5 text-sm text-cream/95 mb-6">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Local independent funeral director delivery
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                NAFD or SAIF accredited
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Cared for close to home
              </li>
            </ul>
            <PhoneCTA size="md" variant="invert" />
          </div>

          {/* VS pill — visible only on desktop */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-cream border-2 border-stone flex items-center justify-center">
              <span className="font-serif text-xl text-green">vs</span>
            </div>
          </div>

          {/* Competitor card — muted treatment */}
          <div className="bg-white border-2 border-stone rounded-2xl px-6 py-8 md:px-10 md:py-12">
            <p className="text-xs uppercase tracking-wider text-ink/55 font-bold mb-3">{competitorName}</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-serif text-5xl md:text-6xl text-ink/85 font-medium"><CountUp value={pricing.competitorPrice} /></span>
            </div>
            <p className="text-ink/65 text-sm md:text-base mb-5 leading-snug">{pricing.competitorLabel}</p>
            <ul className="space-y-1.5 text-sm text-ink/70">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-ink/40 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {table.competitorModel.headline}
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-ink/40 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {table.competitorModel.careLocation}
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm md:text-base text-green/85 italic mt-8 max-w-2xl mx-auto">
          {pricing.savingsContext}
        </p>
      </div>
    </section>
  );
}
