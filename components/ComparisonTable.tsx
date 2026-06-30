import PhoneCTA from './PhoneCTA';
import { SITE } from '@/lib/site';
import type { ComparisonTable as Table } from '@/lib/comparisonTables';

// Update this date whenever the comparison data is verified/refreshed
const LAST_VERIFIED = 'June 2026';

/**
 * Head-to-head comparison table for /compare/[slug]/ pages.
 * Wider layout (1280px), checkmark callouts where BDC has the edge,
 * prominent dated disclaimer at the bottom of the section.
 */
export default function ComparisonTable({ table }: { table: Table }) {
  return (
    <section className="bg-white border-y border-stone">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <p className="text-center text-sm uppercase tracking-widest text-gold font-semibold mb-3">
          Full side-by-side
        </p>
        <h2 className="text-center font-serif text-2xl md:text-4xl text-green mb-3">
          Best Direct Cremation vs {table.competitorName}
        </h2>
        {table.competitorLogoNote && (
          <p className="text-center text-sm md:text-base text-ink/65 mb-10 italic max-w-2xl mx-auto">
            {table.competitorLogoNote}
          </p>
        )}

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-stone shadow-card">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-green text-white">
                <th className="text-left font-serif font-normal py-5 px-6 w-1/3 text-base md:text-lg">Feature</th>
                <th className="text-left font-serif font-normal py-5 px-6 bg-green-dark relative">
                  <span className="absolute -top-px left-6 bg-gold text-white text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold">Recommended</span>
                  <span className="block text-xs uppercase tracking-wider text-cream/70 mb-1 mt-3">Recommended</span>
                  <span className="text-base md:text-lg">Best Direct Cremation</span>
                </th>
                <th className="text-left font-serif font-normal py-5 px-6">
                  <span className="block text-xs uppercase tracking-wider text-cream/70 mb-1">Competitor</span>
                  <span className="text-base md:text-lg">{table.competitorName}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-cream/30' : 'bg-white'}>
                  <td className="py-4 px-6 align-top font-medium text-ink/85">{row.feature}</td>
                  <td className={`py-4 px-6 align-top ${row.bdcWin ? 'bg-green/5 border-l-4 border-green' : ''}`}>
                    <span className={row.bdcWin ? 'text-green font-semibold' : 'text-ink/85'}>
                      {row.bdc}
                    </span>
                    {row.bdcWin && (
                      <svg className="inline-block w-4 h-4 text-green ml-1.5 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </td>
                  <td className="py-4 px-6 align-top text-ink/75">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE — stacked cards */}
        <div className="md:hidden space-y-4">
          {table.rows.map((row, i) => (
            <div key={i} className="rounded-xl border border-stone overflow-hidden">
              <div className="bg-cream/60 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-ink/70">
                {row.feature}
              </div>
              <div className={`px-4 py-3 border-b border-stone ${row.bdcWin ? 'bg-green/5' : 'bg-white'}`}>
                <p className="text-xs uppercase tracking-wider text-green font-bold mb-1 flex items-center gap-1.5">
                  Best Direct Cremation
                  {row.bdcWin && (
                    <svg className="w-3.5 h-3.5 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </p>
                <p className={`text-sm leading-snug ${row.bdcWin ? 'text-green font-semibold' : 'text-ink/85'}`}>
                  {row.bdc}
                </p>
              </div>
              <div className="px-4 py-3 bg-white">
                <p className="text-xs uppercase tracking-wider text-ink/55 font-bold mb-1">{table.competitorName}</p>
                <p className="text-sm leading-snug text-ink/75">{row.competitor}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sub-CTA inside the section */}
        <div className="mt-10 md:mt-12 bg-green text-cream rounded-2xl px-6 md:px-10 py-8 md:py-10 text-center">
          <h3 className="font-serif text-xl md:text-2xl text-white mb-2">Talk through your specific situation</h3>
          <p className="text-cream/85 text-sm md:text-base mb-6 max-w-xl mx-auto">
            Every family is different. Call us and a real person will explain exactly how a Best Direct Cremation
            would work for your family — no pressure, no commitment.
          </p>
          <div className="inline-block">
            <PhoneCTA size="lg" variant="invert" />
            <p className="text-xs italic text-cream/90 mt-2">{SITE.promiseSubtext}</p>
          </div>
        </div>

        {/* PROMINENT dated comparison disclaimer */}
        <div className="mt-10 md:mt-12 bg-cream/40 border border-stone rounded-xl p-5 md:p-6">
          <p className="text-xs uppercase tracking-wider text-ink/55 font-bold mb-2">Comparison disclaimer</p>
          <p className="text-sm text-ink/75 leading-relaxed">
            All prices, service models, and competitor information shown on this page are accurate as of{' '}
            <strong>{LAST_VERIFIED}</strong>, based on publicly available information published by{' '}
            {table.competitorName} and other public sources. Prices and operational models change — always
            verify current pricing and service details directly with {table.competitorName} before making a
            decision. {SITE.name} is not affiliated with, endorsed by, or sponsored by {table.competitorName}.
            This comparison is provided as fair, factual information to help families make an informed choice.
          </p>
          <p className="text-sm text-ink/75 leading-relaxed mt-3">
            Where the comparison refers to &quot;the closest local crematorium&quot;, the actual nearest crematorium
            depends on the family&apos;s location and is determined by the local funeral director at the time of arrangement.
            National operators with their own crematorium networks (e.g. Dignity owns ~45 UK crematoria) may use a
            crematorium within their own network rather than the nearest by distance.
          </p>
        </div>
      </div>
    </section>
  );
}
