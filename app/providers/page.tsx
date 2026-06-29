import { sanity } from '@/lib/sanity';
import { groq } from 'next-sanity';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';

export const revalidate = 60;

const query = groq`*[_type == "partner" && defined(slug.current)] | order(name asc){
  _id, name, "slug": slug.current, logo, accreditation,
  "hqTown": hqAddress.town->name,
}`;

export default async function ProvidersPage() {
  const partners = await sanity.fetch<Array<any>>(query);
  return (
    <>
      <Hero
        eyebrow="Our partners"
        title={<>Our partner <span className="text-gold">funeral directors</span></>}
        subtitle="We work with a vetted network of independent funeral directors across the UK — every one personally chosen for their professionalism, facilities and standards of care."
      />
      <Container className="py-14 md:py-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map(p => (
            <Link key={p._id} href={`/providers/${p.slug}/`} className="block bg-cream p-5 rounded-card shadow-card hover:shadow-lift transition">
              {p.logo && (
                <img src={urlFor(p.logo).width(200).height(120).fit('max').url()} alt={p.name} className="h-20 object-contain mb-3" />
              )}
              <p className="font-serif text-navy">{p.name}</p>
              {p.hqTown && <p className="text-xs text-ink/60 mt-1">{p.hqTown}</p>}
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
