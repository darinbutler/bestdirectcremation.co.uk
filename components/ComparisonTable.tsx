import Container from './Container';
import PhoneCTA from './PhoneCTA';
import { SITE } from '@/lib/site';
import type { ComparisonTable as Table } from '@/lib/comparisonTables';

/**
 * Head-to-head comparison table for /compare/[slug]/ pages.
 *
 * Layout:
 *   - Two-column header (BDC | Competitor)
 *   - Rows with green highlight on the BDC column where BDC has the
 *     structural advantage (bdcWin === true)
 *   - Mobile: cards stack vertically (each row becomes a mini-table)
 *   - Desktop: clean two-column table
 */
export default function ComparisonTable({ table }: { table: Table }) {
  return (
    <section className="bg-white border-y border-stone">
      <Container className="py-12 md:py-16">
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">At a glance</p>
        <h2 className="font-serif text-section text-green mb-3">
          Best Direct Cremation vs {table.competitorName}
        </h2>
        {table.competitorLogoNote && (
          <p className="text-sm text-ink/65 mb-8 italic">{table.competitorLogoNote}</p>
        )}

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-stone shadow-card">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-green text-white">
                <th className="text-left font-serif font-normal py-4 px-5 w-1/3">Feature</th>
                <th className="text-left font-serif font-normal py-4 px-5 bg-green-dark">
                  <span className="block text-xs uppercase tracking-wider text-gold mb-0.5">Recommended</span>
                  Best Direct Cremation
                </th>
                <th className="text-left font-serif font-normal py-4 px-5">
                  <span className="block text-xs uppercase tracking-wider text-cream/70 mb-0.5">Competitor</span>
                  {table.competitorName}
                </th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-cream/30' : 'bg-white'}>
                  <td className="py-4 px-5 align-top font-medium text-ink/85">{row.feature}</td>
                  <td className={`py-4 px-5 align-top ${row.bdcWin ? 'bg-green/5 border-l-4 border-green' : ''}`}>
                    <span className={row.bdcWin ? 'text-green font-semibold' : 'text-ink/85'}>
                      {row.bdc}
                    </span>
                    {row.bdcWin && (
                      <svg className="inline-block w-4 h-4 text-green ml-1.5 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </td>
                  <td className="py-4 px-5 align-top text-ink/75">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE: stacked cards */}
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

        {/* Sub-CTA */}
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

        {/* Disclaimer */}
        <p className="text-xs text-ink/55 mt-6 italic">
          Comparison data based on publicly available pricing and information from {table.competitorName} as of 2026.
          Prices and service models change — verify directly with each provider before deciding. Best Direct Cremation
          is not affiliated with {table.competitorName}.
        </p>
      </Container>
    </section>
  );
}
