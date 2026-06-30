import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import TrustSignals from '@/components/TrustSignals';
import CostCalculatorCTA from '@/components/CostCalculatorCTA';
import JsonLd from '@/components/JsonLd';
import { sanity } from '@/lib/sanity';
import { allHelpArticlesQuery } from '@/lib/queries';
import { breadcrumbSchema, faqPageSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Help & Guidance — UK Funeral & Cremation Practical Guides',
  description: 'Plain-English UK guides on what to do when someone dies, cost of a funeral, direct cremation, bereavement support, probate, wills, and more. Free, comprehensive, dignified.',
  alternates: { canonical: `${SITE.url}/help/` },
};

type Article = { title: string; slug: string; excerpt?: string; intent?: string };

// Intent groupings — match user search intent
const INTENT_GROUPS: { label: string; intents: string[] }[] = [
  { label: 'When someone dies — practical steps', intents: ['process'] },
  { label: 'Cost & financial help',                intents: ['cost'] },
  { label: 'Legal & administration',               intents: ['legal'] },
  { label: 'Planning ahead',                        intents: ['planning'] },
  { label: 'Bereavement support',                  intents: ['support'] },
  { label: 'Reference',                             intents: ['reference', 'informational', 'comparison'] },
];

const FAQS = [
  { question: 'What\'s the most important thing to do first when someone dies?', answer: 'Contact a doctor — either the GP if the death was expected at home, or call 999 if unexpected. The doctor verifies the death and issues the Medical Certificate of Cause of Death, which you need to register the death.' },
  { question: 'How quickly do I need to register a death?', answer: 'Within 5 days in England, Wales and Northern Ireland; 8 days in Scotland. Most register offices have appointments within 1-2 working days.' },
  { question: 'What is "Tell Us Once"?', answer: 'A free UK government service that notifies most public bodies of a death in one go (HMRC, DWP, DVLA, Passport Office, local council). The registrar gives you a reference number when you register the death.' },
  { question: 'How much does the cheapest UK funeral cost?', answer: 'A direct cremation, typically £1,400-£1,700 all-inclusive in 2026. Best Direct Cremation costs £1,499 (£1,749 max with Priority Care).' },
  { question: 'Where can I get bereavement support?', answer: 'Cruse Bereavement Support (0808 808 1677) is the UK\'s largest bereavement charity — free helpline, online chat, regional groups. Samaritans (116 123) for immediate emotional support, 24/7.' },
];

export default async function HelpHub() {
  const items: Article[] = await sanity.fetch(allHelpArticlesQuery);

  const grouped: Record<string, Article[]> = {};
  const used = new Set<string>();
  INTENT_GROUPS.forEach(g => {
    grouped[g.label] = items
      .filter(a => g.intents.includes(a.intent || '') && !used.has(a.slug))
      .sort((a, b) => a.title.localeCompare(b.title));
    grouped[g.label].forEach(a => used.add(a.slug));
  });
  const other = items.filter(a => !used.has(a.slug)).sort((a, b) => a.title.localeCompare(b.title));
  if (other.length > 0) grouped['Other guides'] = other;

  return (
    <>
      <Hero
        eyebrow="Help & guidance"
        title="Practical UK funeral guidance, free"
        subtitle={`Plain-English guides on what to do when someone dies, cost of a funeral, direct cremation, bereavement support, probate, wills and more. ${items.length} comprehensive UK-focused articles.`}
      />

      <TrustSignals />

      <CostCalculatorCTA variant="card" />

      <Container className="py-12 md:py-16">

        {/* Top pillar shortcuts */}
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Most-read pillars</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {[
            { slug: 'what-to-do-when-someone-dies', label: 'What to do when someone dies' },
            { slug: 'cost-of-a-funeral',            label: 'Cost of a funeral UK 2026' },
            { slug: 'what-is-direct-cremation',     label: 'What is a direct cremation?' },
            { slug: 'how-direct-cremation-works',   label: 'How direct cremation works' },
          ].map(p => (
            <Link key={p.slug} href={`/help/${p.slug}/`}
                  className="block bg-green text-cream p-5 rounded-card shadow-card hover:bg-green-dark transition group">
              <p className="font-serif text-base leading-snug">{p.label}</p>
              <p className="text-xs uppercase tracking-wider text-gold font-semibold mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read →</p>
            </Link>
          ))}
        </div>

        {/* Grouped by intent */}
        {Object.entries(grouped).map(([label, articles]) => {
          if (articles.length === 0) return null;
          return (
            <section key={label} className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl text-green mb-5">{label}</h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map(a => (
                  <li key={a.slug}>
                    <Link href={`/help/${a.slug}/`}
                          className="block bg-cream p-5 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
                      <p className="font-serif text-green leading-snug mb-1">{a.title}</p>
                      {a.excerpt && <p className="text-xs text-ink/65 line-clamp-2">{a.excerpt}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {/* Cross-section CTA */}
        <section className="mt-12 pt-12 border-t border-stone">
          <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Looking for something else?</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/glossary/" className="block bg-cream p-5 rounded-card hover:bg-white hover:shadow-card transition">
              <p className="font-serif text-green">Funeral terms glossary</p>
              <p className="text-xs text-ink/65 mt-1">124+ UK terms explained</p>
            </Link>
            <Link href="/funeral-plans/" className="block bg-cream p-5 rounded-card hover:bg-white hover:shadow-card transition">
              <p className="font-serif text-green">Funeral plans guide</p>
              <p className="text-xs text-ink/65 mt-1">152 in-depth FCA-compliant articles</p>
            </Link>
            <Link href="/compare/" className="block bg-cream p-5 rounded-card hover:bg-white hover:shadow-card transition">
              <p className="font-serif text-green">Compare UK providers</p>
              <p className="text-xs text-ink/65 mt-1">vs Pure, Co-op, Dignity & more</p>
            </Link>
          </div>
        </section>

      </Container>

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Talk to a real person, 24 hours a day</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">£1,499 all-inclusive direct cremation, delivered locally by a vetted independent funeral director.</p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Help & guidance', path: '/help/' }]),
        faqPageSchema(FAQS.map(f => ({ q: f.question, a: f.answer }))),
      )} />
    </>
  );
}
