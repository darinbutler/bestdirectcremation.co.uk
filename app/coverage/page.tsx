import type { Metadata } from 'next';
import Link from 'next/link';
import { sanity } from '@/lib/sanity';
import { allCountiesForHubQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'UK Direct Cremation Coverage',
  description: `${SITE.name} works with NAFD- or SAIF-accredited independent funeral directors across the UK. Find direct cremation in your county.`,
  alternates: { canonical: `${SITE.url}/coverage/` },
};

export default async function CoveragePage() {
  const counties = await sanity.fetch<Array<{ name: string; slug: string; country: string; region?: string; coverageStatus: string }>>(allCountiesForHubQuery);
  const byCountry: Record<string, typeof counties> = {};
  counties.forEach(c => {
    (byCountry[c.country] ||= []).push(c);
  });
  return (
    <>
      <Hero
        eyebrow="UK coverage"
        title={<>Direct cremation across the UK — <span className="text-gold">always local</span></>}
        subtitle="A growing network of independent funeral directors covers every UK county. Find yours below."
      />
      <Container className="py-14 md:py-20">
        {Object.entries(byCountry).map(([country, list]) => (
          <section key={country} className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-navy mb-5">{country}</h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {list!.map(c => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}/`} className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift transition">
                    <p className="font-serif text-navy">{c.name}</p>
                    <p className="text-xs text-ink/60 mt-1">
                      {c.coverageStatus === 'live' ? '✓ Live coverage' : '⏳ Coming soon'}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
