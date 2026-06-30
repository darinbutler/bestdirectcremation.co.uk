import { notFound } from 'next/navigation';
import { sanity } from '@/lib/sanity';
import { allGenericSlugsQuery, genericTermBySlugQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import FAQ from '@/components/FAQ';
import WhyBdc from '@/components/WhyBdc';
import PriceBlock from '@/components/PriceBlock';
import CostCalculatorCTA from '@/components/CostCalculatorCTA';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

type Props = { params: { slug: string } };

// Slugs where the cost calculator CTA card should be shown prominently
// (these landers target cost-themed search intent).
const COST_INTENT_SLUGS = new Set([
  'cheap-direct-cremation',
  'low-cost-direct-cremation',
  'affordable-direct-cremation',
  'cheap-cremation',
  'direct-cremation-cost-uk',
  'direct-cremation-1499',
  'all-inclusive-direct-cremation',
  'no-frills-funeral',
  'best-direct-cremation-providers-uk',
  'direct-cremation-companies-uk',
]);

export async function generateStaticParams() {
  const slugs: string[] = await sanity.fetch(allGenericSlugsQuery);
  return slugs.map(slug => ({ slug }));
}

export default async function GenericTermPage({ params }: Props) {
  const g = await sanity.fetch(genericTermBySlugQuery, { slug: params.slug });
  if (!g) notFound();
  const showCalculator = COST_INTENT_SLUGS.has(params.slug);
  return (
    <>
      <Hero
        eyebrow={g.modifier ? `${g.modifier} ${g.serviceNoun || ''}`.trim() : 'Direct cremation'}
        title={g.title}
        subtitle={undefined}
      />

      {/* Cost calculator card — shown only on cost-themed landers */}
      {showCalculator && <CostCalculatorCTA variant="card" />}

      <Container className="py-14 max-w-prose-wide prose-longform">
        {g.intentMatch && <PortableText value={g.intentMatch} />}
        {g.longForm && <div className="mt-8"><PortableText value={g.longForm} /></div>}
      </Container>
      {g.showComparisonStrip && <WhyBdc />}
      <PriceBlock />
      {g.faqs && g.faqs.length > 0 && (
        <FAQ items={g.faqs.map((f: any) => ({ question: f.question, answer: f.answer }))} />
      )}
    </>
  );
}
