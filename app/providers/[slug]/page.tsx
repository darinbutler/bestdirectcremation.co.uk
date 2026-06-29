import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sanity } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { allPartnerSlugsQuery, partnerBySlugQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs: string[] = await sanity.fetch(allPartnerSlugsQuery);
  return slugs.map(slug => ({ slug }));
}

export default async function PartnerPage({ params }: Props) {
  const p = await sanity.fetch(partnerBySlugQuery, { slug: params.slug });
  if (!p) notFound();
  return (
    <>
      <Hero
        eyebrow="Partner funeral director"
        title={<><span className="text-gold">{p.name}</span></>}
        subtitle={`A trusted independent funeral director, chosen by Best Direct Cremation for their professionalism and standards.`}
      />
      <Container className="py-14 max-w-prose-wide">
        {p.logo && <img src={urlFor(p.logo).width(280).fit('max').url()} alt={p.name} className="h-24 object-contain mb-6" />}
        {p.bio && <div className="prose-longform"><PortableText value={p.bio} /></div>}
        {p.facilities && p.facilities.length > 0 && (
          <>
            <h2 className="font-serif text-2xl text-navy mt-10 mb-4">Facilities &amp; services</h2>
            <ul className="list-disc pl-6 text-ink/85 space-y-1">
              {p.facilities.map((f: string) => <li key={f}>{f}</li>)}
            </ul>
          </>
        )}
        {p.townsServed && p.townsServed.length > 0 && (
          <>
            <h2 className="font-serif text-2xl text-navy mt-10 mb-4">Towns served</h2>
            <ul className="flex flex-wrap gap-2">
              {p.townsServed.map((t: any) => (
                <li key={t.slug}>
                  <Link href={`/${t.county?.slug}/${t.slug}/`} className="inline-block bg-cream px-3 py-1.5 rounded-md text-sm text-navy hover:bg-stone">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="mt-10">
          <PhoneCTA size="lg" variant="gold" showSubtext />
        </div>
      </Container>
    </>
  );
}
