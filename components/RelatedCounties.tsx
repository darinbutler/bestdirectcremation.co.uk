import Link from 'next/link';
import Container from './Container';

/**
 * "Direct cremation in nearby counties" — internal-linking block to keep
 * users within the locality cluster and pass authority between sibling
 * county pages. Driven by neighbouring counties array passed in.
 */
export default function RelatedCounties({
  current,
  neighbours,
}: {
  current: string;
  neighbours: Array<{ name: string; slug: string }>;
}) {
  if (!neighbours || neighbours.length === 0) return null;
  return (
    <section className="bg-white border-y border-stone">
      <Container className="py-12 md:py-16">
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Nearby counties</p>
        <h2 className="font-serif text-section text-green mb-2">Direct cremation in counties near {current}</h2>
        <p className="text-ink/75 mb-6 max-w-2xl">
          If you have family across multiple UK counties, you may also want direct cremation coverage in
          one of these nearby areas. Each county page sets out the same all-inclusive £1,499 service.
        </p>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {neighbours.map(n => (
            <li key={n.slug}>
              <Link
                href={`/${n.slug}/`}
                className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold"
              >
                <p className="font-serif text-green">Direct cremation in {n.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
