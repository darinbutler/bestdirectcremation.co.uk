import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/Container';
import Hero from '@/components/Hero';
import PhoneCTA from '@/components/PhoneCTA';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqPageSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { GLOSSARY, getTermBySlug, getRelatedTerms, getTermsByCategory } from '@/lib/glossary';

export const revalidate = false; // Pure static — terms don't change

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return GLOSSARY.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTermBySlug(params.slug);
  if (!t) return {};
  return {
    title: `${t.term} — UK Funeral Glossary | Best Direct Cremation`,
    description: t.shortDef,
    alternates: { canonical: `${SITE.url}/glossary/${t.slug}/` },
    openGraph: {
      title: `${t.term} — UK Funeral Glossary`,
      description: t.shortDef,
      url: `${SITE.url}/glossary/${t.slug}/`,
      type: 'article',
    },
  };
}

export default function GlossaryTerm({ params }: Props) {
  const t = getTermBySlug(params.slug);
  if (!t) notFound();
  const related = getRelatedTerms(t.related || []);
  const categorySiblings = getTermsByCategory(t.category).filter(s => s.slug !== t.slug).slice(0, 6);

  return (
    <>
      <Hero
        eyebrow={`Glossary · ${t.category}`}
        title={t.term}
        subtitle={t.shortDef}
        showCTA={false}
      />

      <Container className="py-12 md:py-16 max-w-prose-wide">

        {/* Long definition */}
        <div className="prose prose-lg max-w-none
                        prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                        prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-ink prose-strong:font-bold">
          {t.longDef.split('. ').reduce<string[]>((acc, sentence, i, arr) => {
            // Split into paragraphs every 3-4 sentences for readability
            const paraIdx = Math.floor(i / 3);
            acc[paraIdx] = (acc[paraIdx] || '') + sentence + (i === arr.length - 1 ? '' : '. ');
            return acc;
          }, []).map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {/* Related help article CTA */}
        {t.helpArticle && (
          <div className="mt-10 bg-gold/10 border border-gold/30 rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-wider text-gold-dark font-bold mb-1">Read more</p>
            <Link href={`/help/${t.helpArticle}/`} className="font-serif text-green hover:text-gold transition inline-flex items-center gap-2">
              Read our full guide on {t.term.toLowerCase()}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        )}

        {/* Related terms */}
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-stone">
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-4">Related terms</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {related.map(r => (
                <li key={r.slug}>
                  <Link href={`/glossary/${r.slug}/`} className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
                    <p className="font-serif text-green">{r.term}</p>
                    <p className="text-xs text-ink/65 mt-1 line-clamp-2">{r.shortDef}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* More in this category */}
        {categorySiblings.length > 0 && (
          <div className="mt-10">
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-4">More in {t.category}</p>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {categorySiblings.map(s => (
                <li key={s.slug}>
                  <Link href={`/glossary/${s.slug}/`} className="block bg-cream p-3 rounded-card text-sm hover:bg-white hover:shadow-card transition">
                    <span className="font-serif text-green">{s.term}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link href="/glossary/" className="text-gold font-semibold hover:text-gold-dark inline-flex items-center gap-1.5">
                Browse the full glossary
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </p>
          </div>
        )}

      </Container>

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Need to arrange a direct cremation?</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            £1,499 all-inclusive, delivered locally by a vetted independent funeral director. Call 24 hours a day.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        {
          '@context': 'https://schema.org',
          '@type': 'DefinedTerm',
          '@id': `${SITE.url}/glossary/${t.slug}/#term`,
          name: t.term,
          description: t.shortDef,
          inDefinedTermSet: `${SITE.url}/glossary/`,
          termCode: t.slug,
        },
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Glossary', path: '/glossary/' },
          { name: t.term, path: `/glossary/${t.slug}/` },
        ]),
        faqPageSchema([{ q: `What is ${t.term}?`, a: t.shortDef }]),
      )} />
    </>
  );
}
