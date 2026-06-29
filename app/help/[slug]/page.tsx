import { notFound } from 'next/navigation';
import { sanity } from '@/lib/sanity';
import { allArticleSlugsQuery, articleBySlugQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import FAQ from '@/components/FAQ';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const list: Array<{ slug: string; section: string }> = await sanity.fetch(allArticleSlugsQuery);
  return list.filter(a => a.section === 'help').map(a => ({ slug: a.slug }));
}

export default async function HelpArticle({ params }: Props) {
  const a = await sanity.fetch(articleBySlugQuery, { slug: params.slug, section: 'help' });
  if (!a) notFound();
  return (
    <>
      <Hero
        eyebrow="Help &amp; guidance"
        title={a.title}
        subtitle={a.excerpt}
        showCTA={false}
      />
      <Container className="py-14 md:py-20 max-w-prose-wide prose-longform">
        {a.body && <PortableText value={a.body} />}
      </Container>
      {a.faqs && a.faqs.length > 0 && (
        <FAQ items={a.faqs.map((f: any) => ({ question: f.question, answer: f.answer }))} />
      )}
      {a.relatedArticles && a.relatedArticles.length > 0 && (
        <Container className="py-12">
          <h2 className="font-serif text-2xl text-navy mb-6">Related guides</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {a.relatedArticles.map((r: any) => (
              <li key={r.slug}>
                <Link href={`/help/${r.slug}/`} className="block bg-cream p-5 rounded-card shadow-card hover:shadow-lift transition">
                  <p className="font-serif text-navy">{r.title}</p>
                  {r.excerpt && <p className="text-sm text-ink/70 mt-1">{r.excerpt}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </>
  );
}
