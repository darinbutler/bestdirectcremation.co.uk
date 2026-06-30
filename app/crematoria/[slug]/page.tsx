import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import WhyBdc from '@/components/WhyBdc';
import JsonLd from '@/components/JsonLd';
import { sanity } from '@/lib/sanity';
import { allCrematoriaQuery } from '@/lib/queries';
import { CountyCrematoriumGroup, deduplicate, CrematoriumRow } from '@/lib/crematoria';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 3600;

type Props = { params: { slug: string } };

async function loadAll(): Promise<Map<string, CrematoriumRow>> {
  const groups: CountyCrematoriumGroup[] = await sanity.fetch(allCrematoriaQuery);
  return deduplicate(groups);
}

export async function generateStaticParams() {
  const all = await loadAll();
  return [...all.keys()].map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const all = await loadAll();
  const c = all.get(params.slug);
  if (!c) return {};
  const desc = `${c.name}${c.postcode ? ` (${c.postcode})` : ''} — UK crematorium serving ${c.counties.map(co => co.name).join(', ')}. Direct cremation arrangements via Best Direct Cremation, £1,499 all-inclusive.`;
  return {
    title: `${c.name} — UK Crematorium | Best Direct Cremation`,
    description: desc,
    alternates: { canonical: `${SITE.url}/crematoria/${c.slug}/` },
  };
}

export default async function CrematoriumPage({ params }: Props) {
  const all = await loadAll();
  const c = all.get(params.slug);
  if (!c) notFound();
  const path = `/crematoria/${c.slug}/`;

  // Find sister crematoria in the same counties (other choices for families in the area)
  const sister: CrematoriumRow[] = [];
  for (const co of c.counties) {
    for (const other of all.values()) {
      if (other.slug === c.slug) continue;
      if (other.counties.find(oc => oc.slug === co.slug)) {
        if (!sister.find(s => s.slug === other.slug)) sister.push(other);
      }
    }
  }
  sister.slice(0, 6);

  return (
    <>
      <Hero
        eyebrow="UK crematorium"
        title={c.name}
        subtitle={`${c.address || `Serving ${c.counties.map(co => co.name).join(', ')}`}${c.postcode ? ` · ${c.postcode}` : ''}`}
        showCTA={false}
      />

      <Container className="py-12 md:py-16 max-w-prose-wide">
        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* Details card */}
          <div className="bg-cream rounded-2xl p-6 border border-stone">
            <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Crematorium details</p>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Name</dt>
                <dd className="font-serif text-green text-lg leading-snug">{c.name}</dd>
              </div>
              {c.address && (
                <div>
                  <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Address</dt>
                  <dd className="text-ink/85">{c.address}</dd>
                </div>
              )}
              {c.postcode && (
                <div>
                  <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Postcode</dt>
                  <dd className="font-mono text-ink/85">{c.postcode}</dd>
                </div>
              )}
              {c.website && (
                <div>
                  <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Website</dt>
                  <dd><a href={c.website} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark break-all">{c.website.replace(/^https?:\/\//, '')}</a></dd>
                </div>
              )}
              {(c.latitude && c.longitude) && (
                <div>
                  <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Location</dt>
                  <dd className="text-xs text-ink/65">{c.latitude.toFixed(5)}, {c.longitude.toFixed(5)}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Service CTA card */}
          <div className="bg-green text-cream rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2">Arrange direct cremation</p>
            <p className="text-cream/90 text-sm mb-5 leading-relaxed">
              {SITE.name} arranges direct cremation through a vetted local independent funeral director, at the
              closest local crematorium to where your loved one lived. £1,499 all-inclusive (£1,749 maximum with
              Priority Care).
            </p>
            <PhoneCTA size="md" variant="invert" />
            <p className="text-xs italic text-cream/85 mt-2">{SITE.promiseSubtext}</p>
          </div>
        </div>

        {/* Counties served */}
        {c.counties.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl md:text-2xl text-green mb-3">{c.name} serves</h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {c.counties.map(co => (
                <li key={co.slug}>
                  <Link href={`/${co.slug}/`} className="block bg-cream p-4 rounded-card hover:bg-white hover:shadow-card transition">
                    <p className="font-serif text-green">Direct cremation in {co.name}</p>
                    <p className="text-xs text-ink/55 mt-1">{co.country}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sister crematoria */}
        {sister.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl md:text-2xl text-green mb-3">Other crematoria in the same area</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sister.slice(0, 9).map(s => (
                <li key={s.slug}>
                  <Link href={`/crematoria/${s.slug}/`} className="block bg-cream p-3 rounded-card text-sm hover:bg-white hover:shadow-card transition">
                    <span className="font-serif text-green">{s.name}</span>
                    {s.postcode && <span className="block text-xs text-ink/55 mt-0.5">{s.postcode}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-xs text-ink/55 italic mt-10 pt-6 border-t border-stone">
          {SITE.name} is not affiliated with {c.name}. Crematorium details are sourced from publicly available
          information and verified periodically. Please confirm current details directly with the crematorium
          before making arrangements.
        </p>
      </Container>

      <WhyBdc />

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Speak to a real person, 24 hours a day</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">£1,499 all-inclusive direct cremation, delivered locally by a vetted independent funeral director.</p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        {
          '@context': 'https://schema.org',
          '@type': 'Place',
          '@id': `${SITE.url}${path}#place`,
          name: c.name,
          ...(c.address ? { address: {
            '@type': 'PostalAddress',
            streetAddress: c.address,
            postalCode: c.postcode,
            addressCountry: 'GB',
          } } : {}),
          ...(c.latitude && c.longitude ? { geo: {
            '@type': 'GeoCoordinates',
            latitude: c.latitude,
            longitude: c.longitude,
          } } : {}),
          ...(c.website ? { url: c.website } : {}),
        },
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'UK crematoria', path: '/crematoria/' },
          { name: c.name, path },
        ]),
      )} />
    </>
  );
}
