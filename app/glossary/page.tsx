import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { GLOSSARY, CATEGORY_ORDER, getTermsByCategory, getAlphabeticalIndex } from '@/lib/glossary';

export const metadata: Metadata = {
  title: 'UK Funeral Terms Glossary — Direct Cremation, Burial, Plans, Legal',
  description: 'A plain-English glossary of UK funeral, cremation, burial, bereavement and legal terms — over 120 terms explained.',
  alternates: { canonical: `${SITE.url}/glossary/` },
};

export default function GlossaryHub() {
  const alphabetical = getAlphabeticalIndex();
  const letters = Object.keys(alphabetical).sort();
  return (
    <>
      <Hero
        eyebrow="Glossary"
        title="UK funeral terms — explained"
        subtitle={`Over ${GLOSSARY.length} UK funeral, cremation, burial, bereavement and legal terms in plain English. Jump by letter, browse by category, or search for the specific term you need.`}
      />

      <Container className="py-12 md:py-16">

        {/* A-Z quick jump */}
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Jump by letter</p>
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-stone">
          {letters.map(L => (
            <a
              key={L}
              href={`#letter-${L}`}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cream text-green font-serif font-semibold hover:bg-gold hover:text-white transition"
            >
              {L}
            </a>
          ))}
        </div>

        {/* Category grouping */}
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Browse by category</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {CATEGORY_ORDER.map(category => {
            const terms = getTermsByCategory(category);
            if (terms.length === 0) return null;
            return (
              <a
                key={category}
                href={`#category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold"
              >
                <p className="font-serif text-green">{category}</p>
                <p className="text-xs text-ink/60 mt-1">{terms.length} term{terms.length !== 1 ? 's' : ''}</p>
              </a>
            );
          })}
        </div>

        {/* A-Z list */}
        <h2 className="font-serif text-2xl md:text-3xl text-green mb-6">A–Z of UK funeral terms</h2>
        {letters.map(L => (
          <section key={L} id={`letter-${L}`} className="mb-10 scroll-mt-24">
            <h3 className="font-serif text-3xl text-gold mb-4 sticky top-16 bg-white/95 backdrop-blur py-2 z-10">{L}</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {alphabetical[L].map(t => (
                <li key={t.slug}>
                  <Link href={`/glossary/${t.slug}/`} className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
                    <p className="font-serif text-green">{t.term}</p>
                    <p className="text-xs text-ink/65 mt-1 line-clamp-2">{t.shortDef}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Categories list */}
        <h2 className="font-serif text-2xl md:text-3xl text-green mb-6 mt-12 pt-12 border-t border-stone">By category</h2>
        {CATEGORY_ORDER.map(category => {
          const terms = getTermsByCategory(category);
          if (terms.length === 0) return null;
          return (
            <section key={category} id={`category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="mb-10 scroll-mt-24">
              <h3 className="font-serif text-2xl text-green mb-4">{category}</h3>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {terms.map(t => (
                  <li key={t.slug}>
                    <Link href={`/glossary/${t.slug}/`} className="block bg-cream p-3 rounded-card text-sm hover:bg-white hover:shadow-card transition">
                      <span className="font-serif text-green">{t.term}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

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
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Glossary', path: '/glossary/' },
        ]),
      )} />
    </>
  );
}
