import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import TrustSignals from '@/components/TrustSignals';
import DirectorySearch from '@/components/DirectorySearch';
import JsonLd from '@/components/JsonLd';
import { sanity } from '@/lib/sanity';
import { allCrematoriaQuery } from '@/lib/queries';
import { CountyCrematoriumGroup, deduplicate, sortedByName, groupedByCountry } from '@/lib/crematoria';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'UK Crematoria Directory — Every UK Crematorium A-Z',
  description: 'A directory of every UK crematorium with addresses, postcodes and the counties they serve. Find your local crematorium for direct cremation arrangements.',
  alternates: { canonical: `${SITE.url}/crematoria/` },
};

const COUNTRY_ORDER = ['England', 'Wales', 'Scotland', 'Northern Ireland'];

export default async function CrematoriaHub() {
  const groups: CountyCrematoriumGroup[] = await sanity.fetch(allCrematoriaQuery);
  const all = sortedByName(deduplicate(groups));
  const byCountry = groupedByCountry(all);

  // A-Z index
  const byLetter: Record<string, typeof all> = {};
  all.forEach(c => {
    const letter = c.name[0].toUpperCase();
    (byLetter[letter] ||= []).push(c);
  });
  const letters = Object.keys(byLetter).sort();

  return (
    <>
      <Hero
        eyebrow="UK crematoria directory"
        title="Every UK crematorium, listed"
        subtitle={`${all.length} UK crematoria with addresses, postcodes, and the counties they serve. Browse by region or jump alphabetically.`}
      />

      <TrustSignals />

      <Container className="py-12 md:py-16">

        {all.length === 0 ? (
          <div className="text-center py-16 max-w-2xl mx-auto">
            <p className="font-serif text-2xl text-green mb-3">Directory loading</p>
            <p className="text-ink/75 mb-6">
              We&apos;re still building this directory. In the meantime, every UK county page lists the crematoria
              serving that area — see <Link href="/coverage/" className="text-gold hover:text-gold-dark">UK coverage</Link>.
            </p>
            <PhoneCTA size="md" variant="green" />
          </div>
        ) : (
          <DirectorySearch
            items={all}
            basePath="/crematoria"
            label="Search UK crematoria by name, postcode or county"
            itemLabelSingular="crematorium"
            itemLabelPlural="crematoria"
          >
            {/* A-Z jump */}
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Jump by letter</p>
            <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-stone">
              {letters.map(L => (
                <a key={L} href={`#letter-${L}`}
                   className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cream text-green font-serif font-semibold hover:bg-gold hover:text-white transition">
                  {L}
                </a>
              ))}
            </div>

            {/* Country quick-jump */}
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Browse by country</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {COUNTRY_ORDER.filter(c => byCountry[c]).map(country => (
                <a key={country} href={`#country-${country.toLowerCase().replace(/\s+/g, '-')}`}
                   className="block bg-cream p-4 rounded-card shadow-card hover:bg-white hover:shadow-lift hover:border-gold border border-transparent transition">
                  <p className="font-serif text-green">{country}</p>
                  <p className="text-xs text-ink/60 mt-1">{byCountry[country].length} crematori{byCountry[country].length === 1 ? 'um' : 'a'}</p>
                </a>
              ))}
            </div>

            {/* A-Z listing */}
            <h2 className="font-serif text-2xl md:text-3xl text-green mb-6">All UK crematoria A–Z</h2>
            {letters.map(L => (
              <section key={L} id={`letter-${L}`} className="mb-10 scroll-mt-24">
                <h3 className="font-serif text-3xl text-gold mb-4 sticky top-16 bg-white/95 backdrop-blur py-2 z-10">{L}</h3>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {byLetter[L].map(c => (
                    <li key={c.slug}>
                      <Link href={`/crematoria/${c.slug}/`} className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
                        <p className="font-serif text-green leading-snug">{c.name}</p>
                        {c.postcode && <p className="text-xs text-ink/60 mt-1">{c.postcode}</p>}
                        {c.counties.length > 0 && (
                          <p className="text-xs text-ink/55 mt-1">Serving {c.counties.map(co => co.name).join(', ')}</p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* By country */}
            <h2 className="font-serif text-2xl md:text-3xl text-green mb-6 mt-12 pt-12 border-t border-stone">By country</h2>
            {COUNTRY_ORDER.filter(c => byCountry[c]).map(country => (
              <section key={country} id={`country-${country.toLowerCase().replace(/\s+/g, '-')}`} className="mb-10 scroll-mt-24">
                <h3 className="font-serif text-2xl text-green mb-4">{country} <span className="text-ink/50 text-base font-sans">({byCountry[country].length})</span></h3>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {byCountry[country].map(c => (
                    <li key={c.slug}>
                      <Link href={`/crematoria/${c.slug}/`} className="block bg-cream p-3 rounded-card text-sm hover:bg-white hover:shadow-card transition">
                        <span className="font-serif text-green">{c.name}</span>
                        {c.postcode && <span className="text-ink/55 ml-2 text-xs">{c.postcode}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </DirectorySearch>
        )}
      </Container>

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Need to arrange a direct cremation?</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            We arrange direct cremation at the closest local crematorium to where your loved one lived.
            £1,499 all-inclusive. Call 24 hours a day.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'UK crematoria', path: '/crematoria/' }]),
      )} />
    </>
  );
}
