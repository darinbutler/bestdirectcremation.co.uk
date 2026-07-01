import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import WhyBdc from '@/components/WhyBdc';
import JsonLd from '@/components/JsonLd';
import { sanity } from '@/lib/sanity';
import { allRegisterOfficesQuery } from '@/lib/queries';
import { CountyRegisterOfficeGroup, deduplicate, RegisterOfficeRow } from '@/lib/register-offices';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 3600;

type Props = { params: { slug: string } };

async function loadAll(): Promise<Map<string, RegisterOfficeRow>> {
  const groups: CountyRegisterOfficeGroup[] = await sanity.fetch(allRegisterOfficesQuery);
  return deduplicate(groups);
}

export async function generateStaticParams() {
  const all = await loadAll();
  return [...all.keys()].map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const all = await loadAll();
  const r = all.get(params.slug);
  if (!r) return {};
  const desc = `${r.name}${r.postcode ? ` (${r.postcode})` : ''} — register a death in ${r.counties.map(co => co.name).join(', ')}. Address, contact and what to bring. You must register a death within 5 days (8 in Scotland).`;
  return {
    title: `${r.name} — Register a Death | Best Direct Cremation`,
    description: desc,
    alternates: { canonical: `${SITE.url}/register-offices/${r.slug}/` },
  };
}

export default async function RegisterOfficePage({ params }: Props) {
  const all = await loadAll();
  const r = all.get(params.slug);
  if (!r) notFound();
  const path = `/register-offices/${r.slug}/`;

  // Find sister offices in the same counties
  const sister: RegisterOfficeRow[] = [];
  for (const co of r.counties) {
    for (const other of all.values()) {
      if (other.slug === r.slug) continue;
      if (other.counties.find(oc => oc.slug === co.slug)) {
        if (!sister.find(s => s.slug === other.slug)) sister.push(other);
      }
    }
  }

  return (
    <>
      <Hero
        eyebrow="UK register office"
        title={r.name}
        subtitle={`${r.address || `Serving ${r.counties.map(co => co.name).join(', ')}`}${r.postcode ? ` · ${r.postcode}` : ''}`}
        showCTA={false}
      />

      <Container className="py-12 md:py-16 max-w-prose-wide">
        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* Details card */}
          <div className="bg-cream rounded-2xl p-6 border border-stone">
            <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Register office details</p>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Name</dt>
                <dd className="font-serif text-green text-lg leading-snug">{r.name}</dd>
              </div>
              {r.address && (
                <div>
                  <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Address</dt>
                  <dd className="text-ink/85">{r.address}</dd>
                </div>
              )}
              {r.postcode && (
                <div>
                  <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Postcode</dt>
                  <dd className="font-mono text-ink/85">{r.postcode}</dd>
                </div>
              )}
              {r.phone && (
                <div>
                  <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Phone</dt>
                  <dd>
                    <a href={`tel:${r.phone.replace(/[^0-9+]/g, '')}`} className="text-gold hover:text-gold-dark">
                      {r.phone}
                    </a>
                  </dd>
                </div>
              )}
              {r.website && (
                <div>
                  <dt className="text-ink/55 text-xs uppercase tracking-wider mb-0.5">Website</dt>
                  <dd><a href={r.website} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark break-all">{r.website.replace(/^https?:\/\//, '')}</a></dd>
                </div>
              )}
            </dl>
          </div>

          {/* Guidance card */}
          <div className="bg-green text-cream rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2">Before you visit</p>
            <p className="text-cream/90 text-sm mb-3 leading-relaxed">
              You must register a death within <strong className="text-white">5 days</strong> in England, Wales and Northern Ireland
              (<strong className="text-white">8 days</strong> in Scotland). Bring the Medical Certificate of Cause of Death, plus the
              deceased&apos;s personal details and any documents listed in our step-by-step guide.
            </p>
            <Link href="/help/what-to-do-when-someone-dies/" className="inline-block text-sm text-gold hover:text-white underline underline-offset-4">
              Read the full step-by-step guide →
            </Link>
          </div>
        </div>

        {/* What you'll receive */}
        <section className="mb-10 bg-cream rounded-2xl p-6 md:p-8">
          <h2 className="font-serif text-xl md:text-2xl text-green mb-3">What you&apos;ll receive at the register office</h2>
          <ul className="text-ink/85 space-y-2 text-sm leading-relaxed">
            <li><strong>Death certificate</strong> — official copies you can buy on the day. Most families need 4–6 (banks, pensions, probate, life insurance, utilities).</li>
            <li><strong>Certificate for Burial or Cremation</strong> (the &quot;Green Form&quot;) — give this to your funeral director so they can proceed with the cremation or burial. You cannot have a funeral without it.</li>
            <li><strong>Tell Us Once reference</strong> (in England, Scotland and Wales) — lets you notify HMRC, DWP, the passport office, DVLA and local council in one go.</li>
          </ul>
        </section>

        {/* Counties served */}
        {r.counties.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl md:text-2xl text-green mb-3">{r.name} serves</h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {r.counties.map(co => (
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

        {/* Sister offices */}
        {sister.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl md:text-2xl text-green mb-3">Other register offices in the same area</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sister.slice(0, 9).map(s => (
                <li key={s.slug}>
                  <Link href={`/register-offices/${s.slug}/`} className="block bg-cream p-3 rounded-card text-sm hover:bg-white hover:shadow-card transition">
                    <span className="font-serif text-green">{s.name}</span>
                    {s.postcode && <span className="block text-xs text-ink/55 mt-0.5">{s.postcode}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-xs text-ink/55 italic mt-10 pt-6 border-t border-stone">
          {SITE.name} is not affiliated with {r.name}. Register office details are sourced from publicly available
          information and verified periodically. Please confirm opening hours, appointment requirements and current
          details directly with the register office before visiting.
        </p>
      </Container>

      <WhyBdc />

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">After registration — call us to arrange the cremation</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            Once you have the Green Form, give us a call. £1,499 all-inclusive direct cremation, delivered locally by a
            vetted independent funeral director.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        {
          '@context': 'https://schema.org',
          '@type': 'GovernmentOffice',
          '@id': `${SITE.url}${path}#office`,
          name: r.name,
          ...(r.address ? { address: {
            '@type': 'PostalAddress',
            streetAddress: r.address,
            postalCode: r.postcode,
            addressCountry: 'GB',
          } } : {}),
          ...(r.phone ? { telephone: r.phone } : {}),
          ...(r.website ? { url: r.website } : {}),
          areaServed: r.counties.map(co => ({ '@type': 'AdministrativeArea', name: co.name })),
        },
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'UK register offices', path: '/register-offices/' },
          { name: r.name, path },
        ]),
      )} />
    </>
  );
}
