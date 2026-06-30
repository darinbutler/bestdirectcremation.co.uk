import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
import CostCalculatorCTA from '@/components/CostCalculatorCTA';
import JsonLd from '@/components/JsonLd';
import { makePortableTextComponents } from '@/components/portableTextComponents';
import { articleSchema, breadcrumbSchema, faqPageSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { IMG } from '@/lib/images';
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

// Other comparison slugs for the sidebar "Compare with another provider" list
const OTHER_COMPARISONS: Array<{ slug: string; name: string }> = [
  { slug: 'pure-cremation',         name: 'Pure Cremation' },
  { slug: 'aura',                   name: 'Aura' },
  { slug: 'simplicity-cremations',  name: 'Simplicity Cremations' },
  { slug: 'co-op-funeralcare',      name: 'Co-op Funeralcare' },
  { slug: 'dignity',                name: 'Dignity' },
  { slug: 'cremation-direct',       name: 'Cremation Direct' },
  { slug: 'memoria',                name: 'Memoria' },
  { slug: 'compare-the-funeral',    name: 'Compare the Funeral' },
];

export default async function ComparisonPage({ params }: Props) {
  const a = await sanity.fetch(articleBySlugQuery, { slug: params.slug, section: 'compare' });
  if (!a) notFound();
  const path = `/compare/${a.slug}/`;
  const table = COMPARISON_TABLES[params.slug];
  const others = OTHER_COMPARISONS.filter(o => o.slug !== params.slug).slice(0, 5);

  return (
    <>
      {/* HERO — background image + price card */}
      <section className="relative bg-cream border-b border-stone overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={IMG.heroBackground}
            alt=""
            fill
            priority
            className="object-cover object-[70%_center] md:object-center"
            sizes="100vw"
          />
          {/* Left-weighted cream gradient so hero text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/92 to-cream/30 md:from-cream/95 md:via-cream/85 md:to-cream/20" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center">
            <div className="bg-cream/85 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 max-w-2xl shadow-lift">
              <p className="text-xs md:text-sm font-bold text-green mb-3 uppercase tracking-wider">
                Provider comparison
              </p>
              <h1 className="font-serif text-green text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.1] mb-4 tracking-tight">
                {a.title}
              </h1>
              {a.excerpt && (
                <p className="text-base md:text-lg text-ink/80 leading-relaxed mb-6">
                  {a.excerpt}
                </p>
              )}
              <PhoneCTA size="md" variant="green" />
              <p className="text-xs italic text-green font-medium mt-2">{SITE.promiseSubtext}</p>
            </div>

            {table && (
              <div className="bg-white rounded-2xl p-6 md:p-7 shadow-lift border-2 border-gold/40">
                <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2">At a glance</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-green font-bold mb-0.5">Best Direct Cremation</p>
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
      {table && <PriceDifferential table={table} />}
      {table && <LocalVsCentralised table={table} />}
      {table && <ComparisonTable table={table} />}

      {/* LONG-FORM — 2-column article with sticky sidebar */}
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">
            In depth
          </p>
          <h2 className="font-serif text-2xl md:text-4xl text-green mb-10 max-w-3xl leading-tight">
            Best Direct Cremation vs {table?.competitorName}
          </h2>

          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 xl:gap-16">

            {/* Main article — typography-rich */}
            <article className="prose prose-lg max-w-none
                                prose-headings:font-serif prose-headings:text-green prose-headings:leading-tight
                                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                                prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                                prose-h3:text-xl prose-h3:text-green prose-h3:mt-8 prose-h3:mb-3
                                prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                                prose-a:text-gold prose-a:no-underline hover:prose-a:text-gold-dark hover:prose-a:underline
                                prose-strong:text-ink prose-strong:font-bold
                                prose-ul:my-5 prose-li:my-1.5 prose-li:text-ink/85
                                prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-cream/40 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-ink/85">
              <PortableText value={a.body} components={makePortableTextComponents()} />
            </article>

            {/* Sticky sidebar — quick facts, CTA, other comparisons */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">

                {/* Quick facts */}
                {table && (
                  <div className="bg-cream rounded-2xl p-6 border border-stone">
                    <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Quick facts</p>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Best Direct Cremation</dt>
                        <dd className="font-serif text-green text-xl">£{table.pricing.bdcPrice.toLocaleString()}</dd>
                      </div>
                      <div>
                        <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">{table.competitorName}</dt>
                        <dd className="font-serif text-ink/75 text-xl">£{table.pricing.competitorPrice.toLocaleString()}</dd>
                      </div>
                      {table.pricing.savings > 0 && (
                        <div className="pt-3 border-t border-stone">
                          <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">You save</dt>
                          <dd className="font-serif text-gold text-xl font-semibold">£{table.pricing.savings.toLocaleString()}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}

                {/* Sticky CTA */}
                <div className="bg-green text-cream rounded-2xl p-6 text-center">
                  <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2">Talk to us</p>
                  <p className="text-sm mb-4 text-cream/90">A real person, 24 hours a day.</p>
                  <PhoneCTA size="md" variant="invert" />
                  <p className="text-xs italic text-cream/85 mt-2">{SITE.promiseSubtext}</p>
                </div>

                {/* Cost calculator tile */}
                <CostCalculatorCTA variant="tile" />

                {/* Other comparisons */}
                <div className="bg-white rounded-2xl p-6 border border-stone">
                  <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Compare with another provider</p>
                  <ul className="space-y-2 text-sm">
                    {others.map(o => (
                      <li key={o.slug}>
                        <Link href={`/compare/${o.slug}/`} className="text-green hover:text-gold inline-flex items-center gap-1 group">
                          Best Direct Cremation vs {o.name}
                          <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                          </svg>
                        </Link>
                      </li>
                    ))}
                    <li className="pt-2 mt-2 border-t border-stone">
                      <Link href="/compare/" className="text-gold font-semibold hover:text-gold-dark inline-flex items-center gap-1 group">
                        See all comparisons
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Read more — curated pillar links */}
                <div className="bg-white rounded-2xl p-6 border border-stone">
                  <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Read more</p>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/help/what-is-direct-cremation/" className="text-green hover:text-gold">What is a direct cremation?</Link></li>
                    <li><Link href="/help/cost-of-a-funeral/" className="text-green hover:text-gold">Cost of a funeral UK 2026</Link></li>
                    <li><Link href="/help/cremation-vs-burial/" className="text-green hover:text-gold">Cremation vs burial</Link></li>
                    <li><Link href="/help/how-direct-cremation-works/" className="text-green hover:text-gold">How direct cremation works</Link></li>
                    <li><Link href="/help/choosing-a-funeral-director/" className="text-green hover:text-gold">Choosing a funeral director</Link></li>
                    <li className="pt-2 mt-2 border-t border-stone">
                      <Link href="/glossary/" className="text-gold font-semibold hover:text-gold-dark">Funeral terms glossary →</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FAQ
        items={(a.faqs || []).map((f: any) => ({ question: f.question, answer: f.answer }))}
        title="Frequently asked questions"
      />

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Ready to arrange a Best Direct Cremation?</h2>
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
