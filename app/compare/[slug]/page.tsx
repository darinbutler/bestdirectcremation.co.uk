import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { sanity } from '@/lib/sanity';
import { articleBySlugQuery, allArticleSlugsQuery } from '@/lib/queries';
import FAQ from '@/components/FAQ';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import TrustSignals from '@/components/TrustSignals';
import PriceDifferential from '@/components/PriceDifferential';
import LocalVsCentralised from '@/components/LocalVsCentralised';
import ComparisonTable from '@/components/ComparisonTable';
import JsonLd from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema, faqPageSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { COMPARISON_TABLES } from '@/lib/comparisonTables';

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs: Array<{ slug: string; section: string }> = await sanity.fetch(allArticleSlugsQuery);
  return slugs.filter(s => s.section === 'compare').map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await sanity.fetch(articleBySlugQuery, { slug: params.slug, section: 'compare' });
  if (!a) return {};
  const title = a.seo?.metaTitle || a.title;
  const desc  = a.seo?.metaDescription || a.excerpt || `Compare ${a.title} — fair head-to-head with Best Direct Cremation.`;
  return {
    title, description: desc,
    alternates: { canonical: `${SITE.url}/compare/${a.slug}/` },
    openGraph: { title, description: desc, url: `${SITE.url}/compare/${a.slug}/`, type: 'article' },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const a = await sanity.fetch(articleBySlugQuery, { slug: params.slug, section: 'compare' });
  if (!a) notFound();
  const path = `/compare/${a.slug}/`;
  const table = COMPARISON_TABLES[params.slug];

  return (
    <>
      {/* HERO — wider, compact, with price callout */}
      <section className="bg-cream border-b border-stone">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-14 lg:py-16">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-green mb-3 uppercase tracking-wide">
                Comparison · Best Direct Cremation vs {table?.competitorName || 'the competition'}
              </p>
              <h1 className="font-serif text-green text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.1] mb-4 tracking-tight">
                {a.title}
              </h1>
              {a.excerpt && (
                <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-6 max-w-xl">
                  {a.excerpt}
                </p>
              )}
              <PhoneCTA size="md" variant="green" />
              <p className="text-xs italic text-green font-medium mt-2">{SITE.promiseSubtext}</p>
            </div>

            {/* Price callout on the right — visible immediately */}
            {table && (
              <div className="bg-white rounded-2xl p-6 md:p-7 shadow-lift border-2 border-gold/40">
                <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2">At a glance</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-green font-bold mb-0.5">BDC</p>
                    <p className="font-serif text-3xl md:text-4xl text-green">£{table.pricing.bdcPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-ink/55 font-bold mb-0.5">{table.competitorName}</p>
                    <p className="font-serif text-3xl md:text-4xl text-ink/65">£{table.pricing.competitorPrice.toLocaleString()}</p>
                  </div>
                </div>
                {table.pricing.savings > 0 && (
                  <div className="bg-gold/10 border border-gold/30 rounded-lg px-3 py-2 text-center">
                    <p className="text-xs uppercase tracking-wider text-gold-dark font-bold">
                      You save £{table.pricing.savings.toLocaleString()}
                    </p>
                  </div>
                )}
                <p className="text-[11px] text-ink/55 mt-3 italic text-center">
                  Pricing accurate as of June 2026
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <TrustSignals />

      {/* PRICE DIFFERENTIAL — big bold pricing block */}
      {table && <PriceDifferential table={table} />}

      {/* LOCAL FD vs CENTRALISED — the structural differentiator */}
      {table && <LocalVsCentralised table={table} />}

      {/* AT-A-GLANCE TABLE — every feature side-by-side */}
      {table && <ComparisonTable table={table} />}

      {/* LONG-FORM ARTICLE — wider container, still readable prose width */}
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-prose-wide mx-auto">
            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-green prose-h2:text-2xl md:prose-h2:text-3xl prose-h3:text-xl prose-a:text-gold hover:prose-a:text-gold-dark prose-strong:text-ink">
              <PortableText value={a.body} />
            </article>
          </div>
        </div>
      </section>

      <FAQ
        items={(a.faqs || []).map((f: any) => ({ question: f.question, answer: f.answer }))}
        title="Frequently asked questions"
      />

      {/* Final CTA */}
      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">
            Ready to arrange a Best Direct Cremation?
          </h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            Call us 24 hours a day — a real person, every call. We&apos;ll explain how we&apos;d handle your specific situation.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        articleSchema({
          title: a.title,
          description: a.excerpt || a.title,
          path,
          datePublished: a.lastReviewed,
          dateModified: a.lastReviewed,
          section: 'compare',
        }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Compare', path: '/compare/' },
          { name: a.title, path },
        ]),
        faqPageSchema((a.faqs || []).map((f: any) => ({
          q: f.question,
          a: Array.isArray(f.answer)
            ? f.answer.map((b: any) => b.children?.map((s: any) => s.text).join(' ')).join(' ')
            : String(f.answer || ''),
        }))),
      )} />
    </>
  );
}
