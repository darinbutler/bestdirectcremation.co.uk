import { notFound } from 'next/navigation';
import { sanity } from '@/lib/sanity';
import { allGenericSlugsQuery, genericTermBySlugQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import FAQ from '@/components/FAQ';
import WhyBdc from '@/components/WhyBdc';
import PriceBlock from '@/components/PriceBlock';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs: string[] = await sanity.fetch(allGenericSlugsQuery);
  return slugs.map(slug => ({ slug }));
}

export default async function GenericTermPage({ params }: Props) {
  const g = await sanity.fetch(genericTermBySlugQuery, { slug: params.slug });
  if (!g) notFound();
  return (
    <>
      <Hero
        eyebrow={g.modifier ? `${g.modifier} ${g.serviceNoun || ''}`.trim() : 'Direct cremation'}
        title={g.title}
        subtitle={undefined}
      />
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
