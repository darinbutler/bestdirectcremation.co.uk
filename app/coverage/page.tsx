import type { Metadata } from 'next';
import Link from 'next/link';
import { sanity } from '@/lib/sanity';
import { allCountiesForHubQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'UK Direct Cremation Coverage — Every County',
  description: `${SITE.name} arranges direct cremation across every UK county. Find direct cremation in your county — call ${SITE.phone}, 24 hours a day.`,
  alternates: { canonical: `${SITE.url}/coverage/` },
};

// Anchor ids so footer links like /coverage/#england work cleanly
const ANCHOR: Record<string, string> = {
  England: 'england',
  Wales: 'wales',
  Scotland: 'scotland',
  'Northern Ireland': 'northern-ireland',
};

const COUNTRY_ORDER = ['England', 'Wales', 'Scotland', 'Northern Ireland'];

export default async function CoveragePage() {
  const counties = await sanity.fetch<Array<{ name: string; slug: string; country: string; region?: string }>>(allCountiesForHubQuery);
  const byCountry: Record<string, typeof counties> = {};
  counties.forEach(c => { (byCountry[c.country] ||= []).push(c); });
  // Sort each country's list alphabetically
  Object.values(byCountry).forEach(list => list!.sort((a, b) => a.name.localeCompare(b.name)));
  // Ordered countries — England first, then UK nations
  const ordered = COUNTRY_ORDER.filter(c => byCountry[c]).concat(
    Object.keys(byCountry).filter(c => !COUNTRY_ORDER.includes(c))
  );

  return (
    <>
      <Hero
        eyebrow="UK coverage"
        title="Direct cremation across the UK"
        subtitle="A growing network of independent funeral directors covers every UK county. Call us 24 hours a day and we'll arrange a Best Direct Cremation for your family — wherever you are."
      />

      <Container className="py-12 md:py-16">
        {/* Country quick-jump */}
        <nav aria-label="Jump to country" className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-stone">
          {ordered.map(country => (
            <a key={country} href={`#${ANCHOR[country] || country.toLowerCase()}`}
               className="inline-flex items-center px-4 py-2 rounded-full bg-cream text-green text-sm font-medium hover:bg-gold hover:text-white transition">
              {country} <span className="ml-2 text-xs text-ink/50">({byCountry[country]!.length})</span>
            </a>
          ))}
        </nav>

        {ordered.map(country => (
          <section key={country} id={ANCHOR[country] || country.toLowerCase()} className="mb-14 scroll-mt-24">
            <h2 className="font-serif text-2xl md:text-3xl text-green mb-2">{country}</h2>
            <p className="text-sm text-ink/70 mb-5">{byCountry[country]!.length} counties covered across {country}.</p>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {byCountry[country]!.map(c => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}/`}
                        className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
                    <p className="font-serif text-green">Direct cremation in {c.name}</p>
                    {c.region && <p className="text-xs text-ink/55 mt-1">{c.region}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Always-on coverage CTA */}
        <section className="bg-green text-cream rounded-2xl px-6 md:px-10 py-10 md:py-12 text-center mt-8">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">Don&apos;t see your specific town?</h2>
          <p className="text-cream/85 max-w-2xl mx-auto mb-7 leading-relaxed">
            We can arrange a Best Direct Cremation across all of the UK. If we don&apos;t have a local partner for your exact area,
            we&apos;ll either connect you with a partner serving the surrounding area or recommend a trusted local independent
            funeral director who meets the same standards of care.
          </p>
          <div className="inline-block">
            <PhoneCTA size="lg" variant="invert" />
            <p className="text-sm italic text-cream/90 mt-2">{SITE.promiseSubtext}</p>
          </div>
        </section>
      </Container>
    </>
  );
}
