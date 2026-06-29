import { sanity } from '@/lib/sanity';
import { groq } from 'next-sanity';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import Link from 'next/link';

export const revalidate = 60;

const query = groq`*[_type == "article" && section == "help" && defined(slug.current)] | order(_updatedAt desc){
  _id, title, "slug": slug.current, excerpt, intent, heroImage
}`;

export default async function HelpHub() {
  const items = await sanity.fetch<Array<any>>(query);
  return (
    <>
      <Hero
        eyebrow="Help &amp; guidance"
        title={<>Direct cremation — <span className="text-gold">your questions answered</span></>}
        subtitle="Practical, plain-English guides on what to do when someone dies, costs, the cremation process, and how to choose a provider."
      />
      <Container className="py-14 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(a => (
            <Link key={a._id} href={`/help/${a.slug}/`} className="block bg-cream p-6 rounded-card shadow-card hover:shadow-lift transition">
              <p className="text-xs uppercase tracking-widest text-gold mb-2">{a.intent || 'guide'}</p>
              <h3 className="font-serif text-lg text-navy mb-2">{a.title}</h3>
              {a.excerpt && <p className="text-sm text-ink/75">{a.excerpt}</p>}
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
