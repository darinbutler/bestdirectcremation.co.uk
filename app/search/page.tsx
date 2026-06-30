import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import SearchInput from '@/components/SearchInput';
import PhoneCTA from '@/components/PhoneCTA';
import JsonLd from '@/components/JsonLd';
import { sanity } from '@/lib/sanity';
import { searchQuery } from '@/lib/queries';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { GLOSSARY } from '@/lib/glossary';

export const metadata: Metadata = {
  title: 'Search | Best Direct Cremation',
  description: 'Search across counties, towns, help articles, funeral plans guidance, comparisons and the UK funeral terms glossary.',
  alternates: { canonical: `${SITE.url}/search/` },
  robots: { index: false, follow: true },  // don't index search results pages
};

type SearchProps = { searchParams: { q?: string } };

type Hit = { type: string; title?: string; name?: string; slug: string; excerpt?: string; county?: string; country?: string };

function urlFor(hit: Hit): string {
  switch (hit.type) {
    case 'county':  return `/${hit.slug}/`;
    case 'town':    return `/${hit.county}/${hit.slug}/`;
    case 'help':    return `/help/${hit.slug}/`;
    case 'fp':      return `/funeral-plans/${hit.slug}/`;
    case 'compare': return `/compare/${hit.slug}/`;
    case 'generic': return `/services/${hit.slug}/`;
    case 'glossary':return `/glossary/${hit.slug}/`;
    default:        return '/';
  }
}

function labelFor(type: string): string {
  return {
    county: 'County', town: 'Town', help: 'Help & guidance',
    fp: 'Funeral plans', compare: 'Comparison', generic: 'Services guide', glossary: 'Glossary',
  }[type] || type;
}

function HitCard({ hit }: { hit: Hit }) {
  const title = hit.name || hit.title || hit.slug;
  return (
    <li>
      <Link href={urlFor(hit)} className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
        <p className="text-xs uppercase tracking-wider text-gold font-semibold mb-1">{labelFor(hit.type)}</p>
        <p className="font-serif text-green leading-snug">{title}</p>
        {hit.excerpt && <p className="text-xs text-ink/65 mt-1 line-clamp-2">{hit.excerpt}</p>}
      </Link>
    </li>
  );
}

export default async function SearchPage({ searchParams }: SearchProps) {
  const q = (searchParams.q || '').trim();
  let hits: Record<string, Hit[]> = {};
  let glossaryHits: Hit[] = [];
  let total = 0;

  if (q.length >= 2) {
    // Sanity content search — substring match with leading + trailing wildcard
    const qstar = `*${q}*`;
    const sanityResults = await sanity.fetch(searchQuery, { qstar });
    hits = {
      county:    sanityResults.counties    || [],
      town:      sanityResults.towns       || [],
      help:      sanityResults.help        || [],
      fp:        sanityResults.funeralPlans|| [],
      compare:   sanityResults.comparisons || [],
      generic:   sanityResults.generics    || [],
    };
    // Glossary search runs locally
    const qLower = q.toLowerCase();
    glossaryHits = GLOSSARY
      .filter(t => t.term.toLowerCase().includes(qLower) || t.shortDef.toLowerCase().includes(qLower))
      .slice(0, 10)
      .map(t => ({ type: 'glossary', title: t.term, slug: t.slug, excerpt: t.shortDef }));
    total = Object.values(hits).reduce((s, arr) => s + arr.length, 0) + glossaryHits.length;
  }

  return (
    <>
      <Hero
        eyebrow="Search"
        title={q.length >= 2 ? `Results for "${q}"` : 'Search Best Direct Cremation'}
        subtitle={q.length >= 2
          ? `${total} result${total === 1 ? '' : 's'} across UK counties, towns, articles, comparisons and the funeral glossary.`
          : 'Search counties, towns, help articles, funeral plan guides, comparisons and our 124-term funeral glossary.'}
        showCTA={false}
      />

      <Container className="py-12 md:py-16">

        <div className="max-w-2xl mx-auto mb-12">
          <SearchInput />
        </div>

        {q.length < 2 && (
          <div className="text-center text-ink/70 max-w-2xl mx-auto">
            <p className="mb-6">Type at least 2 characters in the search box above.</p>
            <p className="text-sm">Looking for something specific?</p>
            <ul className="grid sm:grid-cols-2 gap-3 mt-4">
              <li><Link href="/coverage/" className="block bg-cream p-4 rounded-card hover:bg-white hover:shadow-card transition"><span className="font-serif text-green">UK coverage by county</span></Link></li>
              <li><Link href="/cost-calculator/" className="block bg-cream p-4 rounded-card hover:bg-white hover:shadow-card transition"><span className="font-serif text-green">Funeral cost calculator</span></Link></li>
              <li><Link href="/help/" className="block bg-cream p-4 rounded-card hover:bg-white hover:shadow-card transition"><span className="font-serif text-green">Help &amp; guidance articles</span></Link></li>
              <li><Link href="/glossary/" className="block bg-cream p-4 rounded-card hover:bg-white hover:shadow-card transition"><span className="font-serif text-green">Funeral terms glossary</span></Link></li>
              <li><Link href="/compare/" className="block bg-cream p-4 rounded-card hover:bg-white hover:shadow-card transition"><span className="font-serif text-green">Compare UK providers</span></Link></li>
              <li><Link href="/funeral-plans/" className="block bg-cream p-4 rounded-card hover:bg-white hover:shadow-card transition"><span className="font-serif text-green">Funeral plans guide</span></Link></li>
            </ul>
          </div>
        )}

        {q.length >= 2 && total === 0 && (
          <div className="text-center text-ink/70 max-w-xl mx-auto py-10">
            <p className="font-serif text-2xl text-green mb-3">No results for &quot;{q}&quot;</p>
            <p className="mb-6">Try a different search term, browse our coverage hub, or call us — a real person, 24 hours a day.</p>
            <PhoneCTA size="md" variant="green" />
          </div>
        )}

        {/* Result groups */}
        {(['county','town','help','fp','compare','generic'] as const).map(type => {
          const items = hits[type] || [];
          if (items.length === 0) return null;
          return (
            <section key={type} className="mb-10">
              <h2 className="font-serif text-xl md:text-2xl text-green mb-4">{labelFor(type)} <span className="text-ink/50 text-base">({items.length})</span></h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((h, i) => <HitCard key={i} hit={h} />)}
              </ul>
            </section>
          );
        })}

        {glossaryHits.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl md:text-2xl text-green mb-4">Glossary <span className="text-ink/50 text-base">({glossaryHits.length})</span></h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {glossaryHits.map((h, i) => <HitCard key={i} hit={h} />)}
            </ul>
          </section>
        )}

      </Container>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Search', path: '/search/' }]),
      )} />
    </>
  );
}
