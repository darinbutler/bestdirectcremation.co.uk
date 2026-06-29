import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sanity } from '@/lib/sanity';
import { allCountySlugsQuery, countyBySlugQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import LongFormSections from '@/components/LongFormSections';
import FAQ from '@/components/FAQ';
import ProcessSteps from '@/components/ProcessSteps';
import ComparisonStrip from '@/components/ComparisonStrip';
import PriceBlock from '@/components/PriceBlock';
import CoveragePendingBanner from '@/components/CoveragePendingBanner';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqPageSchema, funeralHomeSchema, jsonLdString, serviceSchema } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 60;

// ISR — static at build, refreshed when editors update Sanity

type Props = { params: { county: string } };

export async function generateStaticParams() {
  const slugs: string[] = await sanity.fetch(allCountySlugsQuery);
  return slugs.map(slug => ({ county: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await sanity.fetch(countyBySlugQuery, { slug: params.county });
  if (!c) return {};
  const title = c.seo?.metaTitle || `Direct Cremation in ${c.name} | ${SITE.name}`;
  const desc  = c.seo?.metaDescription || `Direct cremation in ${c.name} from ${SITE.priceLabel}, delivered locally. Call ${SITE.phone} — 24 hours a day.`;
  return {
    title, description: desc,
    alternates: { canonical: `${SITE.url}/${c.slug}/` },
    openGraph: { title, description: desc, url: `${SITE.url}/${c.slug}/`, type: 'article' },
  };
}

export default async function CountyPage({ params }: Props) {
  const c = await sanity.fetch(countyBySlugQuery, { slug: params.county });
  if (!c) notFound();
  const isPending = c.coverageStatus === 'coming-soon';
  const path = `/${c.slug}/`;
  return (
    <>
      <Hero
        eyebrow={`${c.country}${c.region ? ` · ${c.region}` : ''}`}
        title={<>Direct Cremation in <span className="text-gold">{c.name}</span></>}
        subtitle={`Always delivered locally by handpicked independent funeral directors serving ${c.name}.`}
      />
      {isPending && <CoveragePendingBanner areaName={c.name} />}
      <LongFormSections sections={c.longFormSections || []} />
      <ProcessSteps />
      <ComparisonStrip />
      <PriceBlock />
      {c.cities && c.cities.length > 0 && (
        <section className="bg-white border-y border-stone">
          <Container className="py-14 md:py-20">
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Towns &amp; cities in {c.name}</p>
            <h2 className="font-serif text-section text-navy mb-8">Direct cremation across {c.name}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {c.cities.map((city: any) => (
                <Link
                  key={city._id}
                  href={`/${c.slug}/${city.slug}/`}
                  className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift transition"
                >
                  <p className="font-serif text-navy">{city.name}</p>
                  <p className="text-xs text-ink/60 mt-1">
                    {city.coverageStatus === 'live' ? '✓ Live coverage' : '⏳ Coming soon'}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
      <FAQ items={(c.faqs || []).map((f: any) => ({ question: f.question, answer: f.answer }))} title={`Frequently asked questions — ${c.name}`} />
      <section className="bg-navy text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">
            Speak to a real person about a cremation in {c.name}
          </h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">Available 24 hours a day.</p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>
      <JsonLd raw={jsonLdString(
        funeralHomeSchema({ name: `${SITE.name} — ${c.name}`, path, areaServed: c.name }),
        serviceSchema({ areaServed: c.name, path, description: `Direct cremation in ${c.name} from ${SITE.priceLabel}, delivered locally.` }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Coverage', path: '/coverage/' },
          { name: c.name, path },
        ]),
        faqPageSchema((c.faqs || []).map((f: any) => ({
          q: f.question,
          a: Array.isArray(f.answer)
            ? f.answer.map((b: any) => b.children?.map((s: any) => s.text).join(' ')).join(' ')
            : String(f.answer || ''),
        }))),
      )} />
    </>
  );
}
