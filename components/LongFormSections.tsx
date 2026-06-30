import { PortableText } from '@portabletext/react';
import PhoneCTA from './PhoneCTA';
import CountUp from './CountUp';
import { SITE } from '@/lib/site';

export type LongFormSection = {
  sectionRole: string;
  heading?: string;
  body?: any;
};

const ORDER = [
  '01-opening','02-what-is','03-why-us','04-process','05-crematoria',
  '06-register','07-partner','08-pricing','09-after','11-related',
];

/**
 * Long-form sections for county / town pages.
 *
 * Layout: article + sticky sidebar inside a wide (1280px) container.
 * Article uses prose styling so headings get the gold-bar H2 treatment,
 * paragraphs have proper rhythm, links are gold, etc. Sidebar carries
 * a jump-to-section TOC + a fixed phone CTA so families can call from
 * any scroll position.
 */
export default function LongFormSections({
  sections,
  areaName,
}: {
  sections: LongFormSection[];
  areaName?: string;
}) {
  if (!sections?.length) return null;
  const sorted = [...sections].sort((a, b) =>
    ORDER.indexOf(a.sectionRole) - ORDER.indexOf(b.sectionRole)
  );

  return (
    <article className="bg-white border-y border-stone">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-20">

        {areaName && (
          <>
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">In depth</p>
            <h2 className="font-serif text-2xl md:text-4xl text-green mb-10 max-w-3xl leading-tight">
              Everything you need to know about direct cremation in {areaName}
            </h2>
          </>
        )}

        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 xl:gap-16">

          {/* Article — wider than before, with full prose typography */}
          <div className="prose prose-lg max-w-none
                          prose-headings:font-serif prose-headings:text-green prose-headings:leading-tight
                          prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                          prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                          prose-h3:text-xl prose-h3:text-green prose-h3:mt-8 prose-h3:mb-3
                          prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                          prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-ink prose-strong:font-bold
                          prose-ul:my-5 prose-li:my-1.5 prose-li:text-ink/85
                          prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-cream/40 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-ink/85">
            {sorted.map((s, i) => (
              <section key={i} id={`section-${s.sectionRole}`} className="scroll-mt-24">
                {s.heading && <h2>{s.heading}</h2>}
                {s.body && <PortableText value={s.body} />}
              </section>
            ))}
          </div>

          {/* Sticky sidebar — TOC + phone CTA + price callout */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">

              {/* Local price callout */}
              <div className="bg-cream rounded-2xl p-6 border border-stone">
                <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2">
                  {areaName ? `Local price in ${areaName}` : 'Our price'}
                </p>
                <p className="font-serif text-4xl text-green leading-none mb-1">
                  <CountUp value={1499} />
                </p>
                <p className="text-xs text-ink/70 mb-4">all-inclusive (max £1,749 with Priority Care)</p>
                <PhoneCTA size="md" variant="green" />
                <p className="text-xs italic text-green mt-2 font-medium">{SITE.promiseSubtext}</p>
              </div>

              {/* Jump-to-section TOC */}
              {sorted.length > 1 && (
                <nav aria-label="On this page" className="bg-white rounded-2xl p-6 border border-stone">
                  <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">On this page</p>
                  <ul className="space-y-2 text-sm">
                    {sorted.map((s, i) => s.heading && (
                      <li key={i}>
                        <a href={`#section-${s.sectionRole}`} className="text-green hover:text-gold transition leading-snug block">
                          {s.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
