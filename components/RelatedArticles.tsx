import Link from 'next/link';
import Container from './Container';

/**
 * Related articles block — internal linking across help / FP / comparison
 * content. Each card links to a sibling article.
 */
export default function RelatedArticles({
  title = 'Related guides',
  articles,
  basePath = '/help',
}: {
  title?: string;
  basePath?: string;
  articles: Array<{ title: string; slug: string; excerpt?: string }>;
}) {
  if (!articles || articles.length === 0) return null;
  return (
    <section className="bg-cream/40 border-y border-stone">
      <Container className="py-12 md:py-16">
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">More guidance</p>
        <h2 className="font-serif text-section text-green mb-6">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map(a => (
            <Link
              key={a.slug}
              href={`${basePath}/${a.slug}/`}
              className="block bg-white p-5 md:p-6 rounded-card shadow-card hover:shadow-lift transition border border-transparent hover:border-gold"
            >
              <h3 className="font-serif text-green text-lg leading-snug mb-2">{a.title}</h3>
              {a.excerpt && <p className="text-sm text-ink/75 line-clamp-3">{a.excerpt}</p>}
              <p className="mt-3 text-sm text-gold font-medium">Read guide →</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
