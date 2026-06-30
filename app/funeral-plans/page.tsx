import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import JsonLd from '@/components/JsonLd';
import { sanity } from '@/lib/sanity';
import { allFuneralPlansQuery } from '@/lib/queries';
import { breadcrumbSchema, faqPageSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'UK Funeral Plans Guide — FCA-Authorised Providers Explained',
  description: 'A complete UK guide to FCA-regulated prepaid funeral plans. Compare providers, plan types, costs, and what to look for. Best Direct Cremation plans launch 2027.',
  alternates: { canonical: `${SITE.url}/funeral-plans/` },
};

// Category groups for the 152 FP cluster docs
const CATEGORY_GROUPS: { label: string; description: string; prefixes: string[]; intents?: string[] }[] = [
  { label: 'Funeral plan types', description: 'Direct cremation plans, attended cremation, traditional, burial — and what each typically includes.', prefixes: [], intents: ['plan-type'] },
  { label: 'Cost & comparisons', description: 'How much funeral plans cost, plan vs life insurance, plan vs savings.', prefixes: [], intents: ['cost', 'comparison'] },
  { label: 'Planning by age', description: 'What changes when you buy a plan at 50, 60, 70 or 80+.', prefixes: ['over-'], intents: ['planning'] },
  { label: 'Cancellation & legal', description: 'Cancellation rules, FCA-authorised providers, and what to look for.', prefixes: [], intents: ['legal'] },
  { label: 'Provider reviews', description: 'Fair, factual reviews of major UK funeral plan providers (informational only — we don\'t sell plans).', prefixes: ['reviews/'] },
  { label: 'How they work', description: 'Step-by-step explainers on how funeral plans actually work.', prefixes: [], intents: ['process'] },
  { label: 'Funeral plans in your county', description: 'County-specific guidance on funeral plans.', prefixes: ['county/'] },
  { label: 'Funeral plans in your city', description: 'City-specific guidance on funeral plans.', prefixes: ['city/'] },
];

type Article = { title: string; slug: string; excerpt?: string; intent?: string };

function categorise(articles: Article[]) {
  const buckets: Record<string, Article[]> = {};
  const used = new Set<string>();
  CATEGORY_GROUPS.forEach(g => {
    buckets[g.label] = articles.filter(a => {
      if (used.has(a.slug)) return false;
      const prefixMatch = g.prefixes.some(p => a.slug.startsWith(p));
      const intentMatch = g.intents?.includes(a.intent || '') ?? false;
      const include = (g.prefixes.length > 0 && prefixMatch) || (g.intents && intentMatch && g.prefixes.length === 0);
      if (include) used.add(a.slug);
      return include;
    }).sort((a, b) => a.title.localeCompare(b.title));
  });
  const other = articles.filter(a => !used.has(a.slug));
  if (other.length > 0) buckets['Other guides'] = other.sort((a, b) => a.title.localeCompare(b.title));
  return buckets;
}

const FAQS = [
  { question: 'Does Best Direct Cremation sell funeral plans?', answer: 'No, not currently. We plan to launch our own direct cremation funeral plans in early 2027, once FCA-authorised. Until then, every page in our funeral plans section is informational only.' },
  { question: 'Why does the FCA regulate funeral plans?', answer: 'Following the collapse of SafeHands Funeral Plans in 2022 which left around 45,000 customers with worthless plans, the Financial Conduct Authority took over regulation of all UK funeral plans on 29 July 2022. Every UK funeral plan provider must now be FCA-authorised.' },
  { question: 'How do I verify a funeral plan provider is legitimate?', answer: 'Search the official FCA Register at fca.org.uk/register. If the provider isn\'t listed, they cannot legally sell funeral plans in the UK.' },
  { question: 'What does a typical UK funeral plan cost?', answer: 'Direct cremation plans: £1,400-£2,200. Attended cremation: £2,500-£3,800. Traditional plan: £3,800-£5,500. Burial plan: £4,500-£6,500 (plot extra).' },
];

export default async function FuneralPlansHub() {
  const articles: Article[] = await sanity.fetch(allFuneralPlansQuery);
  const buckets = categorise(articles);

  return (
    <>
      <Hero
        eyebrow="UK funeral plans guide"
        title="Everything to know about UK funeral plans"
        subtitle={`A complete, informational guide to FCA-regulated UK funeral plans — types, costs, providers, age-specific advice and more across ${articles.length} in-depth guides.`}
      />

      <section className="bg-gold/10 border-y border-gold/30">
        <Container className="py-5 max-w-3xl">
          <p className="text-sm text-ink/85 leading-relaxed">
            <strong className="text-gold-dark">Important:</strong> {SITE.name} does not currently provide or sell prepaid
            funeral plans. We plan to launch our own from early 2027, once FCA-authorised. Until then, this section is
            informational only. Always verify any UK funeral plan provider on the{' '}
            <a href="https://www.fca.org.uk/register" target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-gold-dark">FCA Register</a> before paying anything.
          </p>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Start here</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {[
            { slug: 'direct-cremation', label: 'Direct cremation plans' },
            { slug: 'cost', label: 'How much do plans cost?' },
            { slug: 'fca-regulated', label: 'FCA-regulated explained' },
            { slug: 'compare', label: 'Compare providers' },
          ].map(p => (
            <Link key={p.slug} href={`/funeral-plans/${p.slug}/`}
                  className="block bg-green text-cream p-5 rounded-card shadow-card hover:bg-green-dark transition group">
              <p className="font-serif text-base leading-snug">{p.label}</p>
              <p className="text-xs uppercase tracking-wider text-gold font-semibold mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read →</p>
            </Link>
          ))}
        </div>

        {Object.entries(buckets).map(([label, items]) => {
          if (items.length === 0) return null;
          const groupMeta = CATEGORY_GROUPS.find(g => g.label === label);
          return (
            <section key={label} className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl text-green mb-2">{label}</h2>
              {groupMeta?.description && <p className="text-ink/75 mb-5 max-w-3xl">{groupMeta.description}</p>}
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.slice(0, 30).map(a => (
                  <li key={a.slug}>
                    <Link href={`/funeral-plans/${a.slug}/`} className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
                      <p className="font-serif text-green text-sm leading-snug">{a.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              {items.length > 30 && <p className="text-sm text-ink/65 mt-3 italic">Showing 30 of {items.length} — see the full list in the sitemap.</p>}
            </section>
          );
        })}
      </Container>

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Need to arrange a cremation today?</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            We don&apos;t currently sell funeral plans — but we can arrange a direct cremation right now, £1,499 all-inclusive.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Funeral plans', path: '/funeral-plans/' }]),
        faqPageSchema(FAQS.map(f => ({ q: f.question, a: f.answer }))),
      )} />
    </>
  );
}
