import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sanity } from '@/lib/sanity';
import { allTownPathsQuery, townByPathQuery, siblingTownsQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import LongFormSections from '@/components/LongFormSections';
import FAQ from '@/components/FAQ';
import ProcessSteps from '@/components/ProcessSteps';
import WhyBdc from '@/components/WhyBdc';
import PriceBlock from '@/components/PriceBlock';
import CoveragePendingBanner from '@/components/CoveragePendingBanner';
import LocalityResources from '@/components/LocalityResources';
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
  const siblings = await sanity.fetch<Array<{ name: string; slug: string }>>(
    siblingTownsQuery,
    { countySlug: t.county?.slug, excludeSlug: t.slug },
  );
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
      <WhyBdc />
      <PriceBlock />
      <FAQ
        items={(t.faqs || []).map((f: any) => ({ question: f.question, answer: f.answer }))}
        title={`Frequently asked questions — ${t.name}`}
      />

      <LocalityResources areaName={t.name} />

      {/* Sibling towns + back to county — internal-link block */}
      {(siblings.length > 0 || t.county?.slug) && (
        <section className="bg-white border-y border-stone">
          <Container className="py-12 md:py-16">
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">More across {t.county?.name}</p>
            <h2 className="font-serif text-section text-green mb-2">Direct cremation in nearby towns</h2>
            <p className="text-ink/75 mb-6 max-w-2xl">
              We arrange direct cremation through vetted local independent funeral directors in towns across {t.county?.name}.
              Browse other towns we cover, or call us to confirm coverage for your exact area.
            </p>
            {siblings.length > 0 && (
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {siblings.map(s => (
                  <li key={s.slug}>
                    <Link href={`/${t.county?.slug}/${s.slug}/`}
                          className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
                      <p className="font-serif text-green">Direct cremation in {s.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link href={`/${t.county?.slug}/`} className="inline-flex items-center gap-2 text-green font-semibold hover:text-gold transition">
              See all of {t.county?.name}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </Container>
        </section>
      )}

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
