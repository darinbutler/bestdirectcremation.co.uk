import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import TrustSignals from '@/components/TrustSignals';
import CostCalculatorCTA from '@/components/CostCalculatorCTA';
import JsonLd from '@/components/JsonLd';
import { sanity } from '@/lib/sanity';
import { allGenericTermsQuery } from '@/lib/queries';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Direct Cremation Services Guide — Plain-English Answers to Every Question',
  description: 'Browse every angle on direct cremation — cheap, near me, no service, when someone dies at home, vs traditional funerals, and more. Plain-English answers.',
  alternates: { canonical: `${SITE.url}/services/` },
};

// Intent-based categories — match how users search
const INTENT_GROUPS: { label: string; description: string; slugMatchers: RegExp[] }[] = [
  { label: 'Cost & affordability', description: 'How much it costs, where the savings come from, and how to keep things affordable', slugMatchers: [/^cheap-/, /^low-cost-/, /^affordable-/, /cost-uk$/, /^direct-cremation-1499$/, /^all-inclusive-/] },
  { label: 'No service / unattended', description: 'Direct cremation without a formal ceremony at the crematorium', slugMatchers: [/^no-service-/, /^unattended-/, /^simple-cremation-uk$/, /^cheap-cremation$/, /^cremation-only-/, /^cremation-without-/] },
  { label: 'How it works', description: 'The step-by-step process from first call to ashes returned', slugMatchers: [/^how-to-/, /^direct-cremation-explained$/, /^is-direct-cremation-right/, /^why-choose-/, /^dignified-/] },
  { label: 'When someone dies', description: 'What to do when someone dies at home, in hospital, in care home or in hospice', slugMatchers: [/^cremation-when-someone-dies-/, /^24-hour-/, /^fast-/] },
  { label: 'Comparisons', description: 'Direct cremation versus traditional, attended, and individual competitors', slugMatchers: [/^direct-cremation-vs-/, /^alternative-to-/, /^best-direct-cremation-providers/, /^direct-cremation-companies/] },
  { label: 'After the cremation', description: 'Ashes, memorials, and what families do next', slugMatchers: [/^memorial-after-/, /^what-happens-to-ashes-/] },
  { label: 'For specific families', description: 'Direct cremation for Christian, non-religious, and other family situations', slugMatchers: [/^christian-/, /^non-religious-/, /^no-frills-/] },
  { label: 'Local & near me', description: 'Direct cremation in your local area', slugMatchers: [/^direct-cremation-near-me$/] },
];

type Lander = { title: string; slug: string; modifier?: string; serviceNoun?: string };

function groupLanders(landers: Lander[]) {
  const grouped: Record<string, Lander[]> = {};
  const used = new Set<string>();
  INTENT_GROUPS.forEach(g => {
    grouped[g.label] = landers.filter(l => {
      if (used.has(l.slug)) return false;
      const matches = g.slugMatchers.some(m => m.test(l.slug));
      if (matches) used.add(l.slug);
      return matches;
    });
  });
  // Anything unmatched gets dumped in "Other"
  const other = landers.filter(l => !used.has(l.slug));
  if (other.length > 0) grouped['Other'] = other;
  return grouped;
}

export default async function ServicesHub() {
  const landers: Lander[] = await sanity.fetch(allGenericTermsQuery);
  const grouped = groupLanders(landers);

  return (
    <>
      <Hero
        eyebrow="Direct cremation services guide"
        title="Plain-English answers to every direct cremation question"
        subtitle={`Browse ${landers.length} in-depth guides covering every angle on UK direct cremation — costs, the process, what to do when someone dies, comparisons with traditional funerals, and more.`}
      />

      <TrustSignals />

      <CostCalculatorCTA variant="card" />

      <Container className="py-12 md:py-16">
        {Object.entries(grouped).map(([label, items]) => {
          if (items.length === 0) return null;
          const groupMeta = INTENT_GROUPS.find(g => g.label === label);
          return (
            <section key={label} className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl text-green mb-2">{label}</h2>
              {groupMeta?.description && (
                <p className="text-ink/75 mb-5 max-w-3xl">{groupMeta.description}</p>
              )}
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(l => (
                  <li key={l.slug}>
                    <Link href={`/services/${l.slug}/`} className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
                      <p className="font-serif text-green text-sm leading-snug">{l.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </Container>

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Speak to a real person, 24 hours a day</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">£1,499 all-inclusive, delivered locally by a vetted independent funeral director.</p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services/' },
        ]),
      )} />
    </>
  );
}
