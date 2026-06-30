import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { sanity } from '@/lib/sanity';
import { articleBySlugQuery, allArticleSlugsQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import TrustSignals from '@/components/TrustSignals';
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
      <Hero
        eyebrow="Comparison"
        title={a.title}
        subtitle={a.excerpt}
      />

      {/* Trust signal strip — above the long-form content */}
      <TrustSignals />

      {/* At-a-glance table — the headline differences in one scan */}
      {table && <ComparisonTable table={table} />}

      {/* Full long-form body — for users who want the detail */}
      <Container className="py-12 md:py-16 max-w-prose-wide">
        <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-green prose-h2:text-2xl md:prose-h2:text-3xl prose-h3:text-xl prose-a:text-gold hover:prose-a:text-gold-dark prose-strong:text-ink">
          <PortableText value={a.body} />
        </article>
      </Container>

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
