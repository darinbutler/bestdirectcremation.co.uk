import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import TrustSignals from '@/components/TrustSignals';
import JsonLd from '@/components/JsonLd';
import { sanity } from '@/lib/sanity';
import { allRegisterOfficesQuery } from '@/lib/queries';
import { CountyRegisterOfficeGroup, deduplicate, sortedByName, groupedByCountry } from '@/lib/register-offices';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'UK Register Offices Directory — Register a Death A-Z',
  description: 'Every UK register office with address, postcode and phone. Register a death within 5 days (8 in Scotland). Free directory for bereaved families.',
  alternates: { canonical: `${SITE.url}/register-offices/` },
};

const COUNTRY_ORDER = ['England', 'Wales', 'Scotland', 'Northern Ireland'];

export default async function RegisterOfficesHub() {
  const groups: CountyRegisterOfficeGroup[] = await sanity.fetch(allRegisterOfficesQuery);
  const all = sortedByName(deduplicate(groups));
  const byCountry = groupedByCountry(all);
  const byLetter: Record<string, typeof all> = {};
  all.forEach(r => {
    const letter = r.name[0].toUpperCase();
    (byLetter[letter] ||= []).push(r);
  });
  const letters = Object.keys(byLetter).sort();

  return (
    <>
      <Hero
        eyebrow="UK register offices directory"
        title="Register a death — UK register office finder"
        subtitle={`${all.length} UK register offices listed with address, postcode and contact. You must register the death within 5 days (8 in Scotland) of the death.`}
      />

      <TrustSignals />

      <Container className="py-12 md:py-16">

        {/* Practical guidance card */}
        <div className="bg-cream rounded-2xl p-6 md:p-8 mb-12 max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2">Before you visit</p>
          <h2 className="font-serif text-xl md:text-2xl text-green mb-3">Registering a death — what to bring</h2>
          <ul className="text-ink/85 space-y-1.5 text-sm leading-relaxed mb-4">
            <li>• The Medical Certificate of Cause of Death issued by the doctor or hospital</li>
            <li>• The deceased&apos;s full name and any previous names (maiden name, etc)</li>
            <li>• Date and place of birth, last home address, occupation</li>
            <li>• Their NHS number if known, details of any state pension or benefits</li>
            <li>• If applicable — spouse&apos;s name, date of birth, occupation</li>
          </ul>
          <p className="text-sm text-ink/75">
            Read our full <Link href="/help/what-to-do-when-someone-dies/" className="text-gold hover:text-gold-dark">step-by-step guide to what to do when someone dies</Link>.
          </p>
        </div>

        {all.length === 0 ? (
          <div className="text-center py-10 max-w-2xl mx-auto">
            <p className="font-serif text-2xl text-green mb-3">Directory loading</p>
            <p className="text-ink/75">We&apos;re still populating this directory. Meanwhile, see your local council&apos;s website for register office details, or call us if you need help.</p>
          </div>
        ) : (
          <>
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Jump by letter</p>
            <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-stone">
              {letters.map(L => (
                <a key={L} href={`#letter-${L}`}
                   className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cream text-green font-serif font-semibold hover:bg-gold hover:text-white transition">
                  {L}
                </a>
              ))}
            </div>

            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Browse by country</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {COUNTRY_ORDER.filter(c => byCountry[c]).map(country => (
                <a key={country} href={`#country-${country.toLowerCase().replace(/\s+/g, '-')}`}
                   className="block bg-cream p-4 rounded-card shadow-card hover:bg-white hover:shadow-lift hover:border-gold border border-transparent transition">
                  <p className="font-serif text-green">{country}</p>
                  <p className="text-xs text-ink/60 mt-1">{byCountry[country].length} office{byCountry[country].length === 1 ? '' : 's'}</p>
                </a>
              ))}
            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-green mb-6">All UK register offices A–Z</h2>
            {letters.map(L => (
              <section key={L} id={`letter-${L}`} className="mb-10 scroll-mt-24">
                <h3 className="font-serif text-3xl text-gold mb-4 sticky top-16 bg-white/95 backdrop-blur py-2 z-10">{L}</h3>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {byLetter[L].map(r => (
                    <li key={r.slug}>
                      <div className="block bg-cream p-4 rounded-card shadow-card">
                        <p className="font-serif text-green leading-snug">{r.name}</p>
                        {r.address && <p className="text-xs text-ink/65 mt-1">{r.address}</p>}
                        {r.postcode && <p className="text-xs text-ink/60 font-mono mt-0.5">{r.postcode}</p>}
                        {r.phone && (
                          <a href={`tel:${r.phone.replace(/[^0-9+]/g, '')}`} className="text-xs text-gold hover:text-gold-dark inline-block mt-1.5">
                            📞 {r.phone}
                          </a>
                        )}
                        {r.counties.length > 0 && (
                          <p className="text-xs text-ink/55 mt-1">Serving {r.counties.map(co => co.name).join(', ')}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </Container>

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Need help arranging the funeral after registration?</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            Once you have the Green Form from the register office, give us a call. We arrange direct cremation
            from £1,499 all-inclusive, delivered locally by a vetted independent funeral director.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'UK register offices', path: '/register-offices/' }]),
      )} />
    </>
  );
}
