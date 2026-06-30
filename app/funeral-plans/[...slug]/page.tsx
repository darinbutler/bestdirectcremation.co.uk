import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanity } from '@/lib/sanity';
import { allArticleSlugsQuery, articleBySlugQuery, relatedArticlesQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import FAQ from '@/components/FAQ';
import RelatedArticles from '@/components/RelatedArticles';
import PhoneCTA from '@/components/PhoneCTA';
import JsonLd from '@/components/JsonLd';
import { PortableText } from '@portabletext/react';
import { articleSchema, breadcrumbSchema, faqPageSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 60;

// Catch-all route — handles single-segment ('direct-cremation') AND multi-segment
// ('reviews/co-op', 'county/london', 'city/london-city') FP cluster slugs.
type Props = { params: { slug: string[] } };

export async function generateStaticParams() {
  const list: Array<{ slug: string; section: string }> = await sanity.fetch(allArticleSlugsQuery);
  return list
    .filter(a => a.section === 'funeral-plans')
    .map(a => ({ slug: a.slug.split('/') }));
}

// Combine the catch-all segments back into the full slug Sanity stored
function slugString(slugArr: string[]): string {
  return Array.isArray(slugArr) ? slugArr.join('/') : String(slugArr);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fullSlug = slugString(params.slug);
  const a = await sanity.fetch(articleBySlugQuery, { slug: fullSlug, section: 'funeral-plans' });
  if (!a) return {};
  const title = a.seo?.metaTitle || a.title;
  const desc  = a.seo?.metaDescription || a.excerpt || a.title;
  return {
    title, description: desc,
    alternates: { canonical: `${SITE.url}/funeral-plans/${a.slug}/` },
    openGraph: { title, description: desc, url: `${SITE.url}/funeral-plans/${a.slug}/`, type: 'article' },
  };
}

export default async function FuneralPlanArticle({ params }: Props) {
  const fullSlug = slugString(params.slug);
  const a = await sanity.fetch(articleBySlugQuery, { slug: fullSlug, section: 'funeral-plans' });
  if (!a) notFound();
  const path = `/funeral-plans/${a.slug}/`;

  let related = (a.relatedArticles || []).map((r: any) => ({ title: r.title, slug: r.slug, excerpt: r.excerpt }));
  if (related.length === 0) {
    related = await sanity.fetch<Array<{ title: string; slug: string; excerpt?: string }>>(
      relatedArticlesQuery,
      { section: 'funeral-plans', excludeSlug: a.slug },
    );
  }

  return (
    <>
      <Hero
        eyebrow="Funeral plans"
        title={a.title}
        subtitle={a.excerpt}
        showCTA={false}
      />

      {/* FCA-compliance banner — every FP page carries the disclaimer prominently */}
      <section className="bg-gold/10 border-y border-gold/30">
        <Container className="py-5 max-w-3xl">
          <p className="text-sm text-ink/85 leading-relaxed">
            <strong className="text-gold-dark">Important:</strong> {SITE.name} does not currently provide or sell prepaid
            funeral plans. We plan to launch our own direct cremation funeral plans from early 2027, once FCA-authorised.
            Until then, always verify any UK funeral plan provider on the official{' '}
            <a href="https://www.fca.org.uk/register" target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-gold-dark">
              FCA Register
            </a>{' '}before paying anything.
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 md:py-16 max-w-prose-wide">
          <article className="prose prose-lg max-w-none
                              prose-headings:font-serif prose-headings:text-green
                              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                              prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                              prose-h3:text-xl prose-h3:text-green prose-h3:mt-8 prose-h3:mb-3
                              prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                              prose-strong:text-ink prose-strong:font-bold
                              prose-ul:my-5 prose-li:my-1.5 prose-li:text-ink/85
                              prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-cream/40 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-ink/85">
            {a.body && <PortableText value={a.body} />}
          </article>
        </Container>
      </section>

      {a.faqs && a.faqs.length > 0 && (
        <FAQ items={a.faqs.map((f: any) => ({ question: f.question, answer: f.answer }))} />
      )}

      <RelatedArticles title="More funeral plan guides" basePath="/funeral-plans" articles={related} />

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Need to arrange a cremation today?</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            We do not currently sell funeral plans, but we can arrange a direct cremation right now —
            local, dignified, {SITE.priceLabel} all-inclusive.
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
          section: 'funeral-plans',
        }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Funeral plans', path: '/funeral-plans/' },
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
