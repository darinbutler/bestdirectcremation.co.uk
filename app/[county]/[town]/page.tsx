import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanity } from '@/lib/sanity';
import { allTownPathsQuery, townByPathQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import LongFormSections from '@/components/LongFormSections';
import FAQ from '@/components/FAQ';
import ProcessSteps from '@/components/ProcessSteps';
import ComparisonStrip from '@/components/ComparisonStrip';
import PriceBlock from '@/components/PriceBlock';
import CoveragePendingBanner from '@/components/CoveragePendingBanner';
import Container from '@/components/Container';

const PENDING_COUNTRIES = new Set(['Scotland', 'Northern Ireland']);
import PhoneCTA from '@/components/PhoneCTA';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqPageSchema, funeralHomeSchema, jsonLdString, serviceSchema } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 60;

type Props = { params: { county: string; town: string } };

export async function generateStaticParams() {
  const paths: Array<{ county: string; town: string }> = await sanity.fetch(allTownPathsQuery);
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await sanity.fetch(townByPathQuery, { county: params.county, town: params.town });
  if (!t) return {};
  const title = t.seo?.metaTitle || `Direct Cremation in ${t.name} | ${SITE.name}`;
  const desc  = t.seo?.metaDescription
    || `Direct cremation in ${t.name}, ${t.county?.name}. ${SITE.priceLabel} all-inclusive, delivered locally. Call ${SITE.phone}.`;
  return {
    title, description: desc,
    alternates: { canonical: `${SITE.url}/${t.county?.slug}/${t.slug}/` },
    openGraph: { title, description: desc, url: `${SITE.url}/${t.county?.slug}/${t.slug}/`, type: 'article' },
  };
}

export default async function TownPage({ params }: Props) {
  const t = await sanity.fetch(townByPathQuery, { county: params.county, town: params.town });
  if (!t) notFound();
  const path = `/${t.county?.slug}/${t.slug}/`;
  const isPending = PENDING_COUNTRIES.has(t.county?.country);
  return (
    <>
      <Hero
        eyebrow={`${t.county?.name}${t.population ? ` · pop ${t.population.toLocaleString()}` : ''}`}
        title={`Direct Cremation in ${t.name}`}
        subtitle={`Local, dignified direct cremation for families in ${t.name}, ${t.county?.name}. Call us 24 hours a day.`}
      />
      {isPending && <CoveragePendingBanner areaName={t.name} />}
      {t.uniqueLocalAngle && (
        <Container className="py-10 max-w-prose-wide">
          <p className="text-ink/85 text-base leading-relaxed italic border-l-4 border-gold pl-4">
            {t.uniqueLocalAngle}
          </p>
        </Container>
      )}
      <LongFormSections sections={t.longFormSections || []} />
      <ProcessSteps />
      <ComparisonStrip />
      <PriceBlock />
      <FAQ
        items={(t.faqs || []).map((f: any) => ({ question: f.question, answer: f.answer }))}
        title={`Frequently asked questions — ${t.name}`}
      />
      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">
            Speak to a real person about a cremation in {t.name}
          </h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">Available 24 hours a day.</p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>
      <JsonLd raw={jsonLdString(
        funeralHomeSchema({
          name: `${SITE.name} — ${t.name}`,
          path,
          areaServed: t.name,
          partnerFd: t.partnerFd ? { name: t.partnerFd.name, address: t.partnerFd.hqAddress } : undefined,
        }),
        serviceSchema({ areaServed: t.name, path, description: `Direct cremation in ${t.name} from ${SITE.priceLabel}, delivered by a local independent funeral director.` }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Coverage', path: '/coverage/' },
          { name: t.county?.name || '', path: `/${t.county?.slug}/` },
          { name: t.name, path },
        ]),
        faqPageSchema((t.faqs || []).map((f: any) => ({
          q: f.question,
          a: Array.isArray(f.answer)
            ? f.answer.map((b: any) => b.children?.map((s: any) => s.text).join(' ')).join(' ')
            : String(f.answer || ''),
        }))),
      )} />
    </>
  );
}
