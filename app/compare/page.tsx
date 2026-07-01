import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import ComparisonStrip from '@/components/ComparisonStrip';
import PriceBlock from '@/components/PriceBlock';
import PhoneCTA from '@/components/PhoneCTA';
import TrustSignals from '@/components/TrustSignals';
import WhyBdc from '@/components/WhyBdc';
import FAQ from '@/components/FAQ';
import CostCalculatorCTA from '@/components/CostCalculatorCTA';
import JsonLd from '@/components/JsonLd';
import { sanity } from '@/lib/sanity';
import { allCompareArticlesQuery } from '@/lib/queries';
import { breadcrumbSchema, faqPageSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'UK Direct Cremation Provider Comparison 2026 — Best Direct Cremation vs Pure, Co-op, Dignity, Aura, Simplicity',
  description: 'Compare UK direct cremation providers side by side: price, service model, accreditation, transparency and hidden fees. Best Direct Cremation £1,499 all-inclusive vs Pure Cremation, Co-op, Dignity, Aura, Simplicity, Distinct.',
  alternates: { canonical: `${SITE.url}/compare/` },
  openGraph: {
    title: 'UK Direct Cremation Provider Comparison 2026',
    description: 'Side-by-side comparison of every major UK direct cremation provider — price, service model, hidden fees.',
    url: `${SITE.url}/compare/`,
    type: 'article',
  },
};

const FAQS = [
  {
    question: 'Which is the cheapest UK direct cremation provider?',
    answer:
      'Simplicity Cremations advertises the lowest headline price (from £1,395) but the true cost with Priority Care is often around £1,795–£1,995. Best Direct Cremation is £1,499 all-inclusive with a maximum of £1,749 with Priority Care — the lowest transparent all-in ceiling of the major UK operators.',
  },
  {
    question: 'What is the difference between a local and a centralised direct cremation?',
    answer:
      'A local direct cremation is delivered by an independent funeral director in your area, using the closest local crematorium. A centralised direct cremation (e.g. Pure Cremation) transports the deceased to a single national or regional facility, often hundreds of miles from where the family lives. Local delivery keeps your loved one closer to home and lets you use a family-friendly crematorium.',
  },
  {
    question: 'Are all UK direct cremation providers regulated?',
    answer:
      'Funeral services themselves are governed by the CMA (Competition and Markets Authority) Standardised Price List rules — every provider must publish standardised pricing. Funeral plans (paying in advance) are regulated by the FCA (Financial Conduct Authority) since July 2022. Best Direct Cremation is not yet FCA-authorised to sell funeral plans — we plan to be authorised in early 2027.',
  },
  {
    question: 'What hidden fees should I watch for when comparing direct cremation providers?',
    answer:
      'The main hidden cost is Priority Care (out-of-hours or non-hospital collection). Some £950–£1,200 headline prices become £1,450 at the point of need after Priority Care is added. Other things to check: coffin type (some ultra-cheap providers use cardboard), whether the ashes return is included (some charge extra for a proper urn), and where the cremation happens (a distant crematorium adds transport cost and reduces personal connection).',
  },
  {
    question: 'Is Best Direct Cremation the cheapest UK direct cremation provider?',
    answer:
      'On the all-inclusive maximum-cost basis (£1,749 including Priority Care), yes — for a locally-delivered service. Some providers advertise lower headline prices but the true all-in cost, once Priority Care is added, is usually higher. Simplicity, part of the Dignity Group, can undercut on headline price but is a centralised service.',
  },
  {
    question: 'How is Best Direct Cremation different from Co-op Funeralcare?',
    answer:
      'Co-op Funeralcare is a national high-street funeral director offering a full range of services including a Simple Direct Cremation at around £1,895–£1,995. Best Direct Cremation is a direct-cremation specialist at £1,499 — around £400–£500 cheaper for a comparable local service. Both use accredited funeral directors, but Co-op prioritises its own branch network whilst we source the closest independent funeral director to your loved one.',
  },
  {
    question: 'Should I choose a national brand or an independent provider?',
    answer:
      'National brands (Pure Cremation, Dignity, Co-op) offer scale and familiar names. Best Direct Cremation combines the reassurance of a nationally-organised service (24-hour phone, single fixed price, quality standards) with the personal touch of a local independent funeral director in your area. Best of both — without the centralised transport that comes with a national brand.',
  },
];

export default async function CompareHub() {
  const comparisons = await sanity.fetch<Array<{ title: string; slug: string; excerpt?: string }>>(allCompareArticlesQuery);

  return (
    <>
      <Hero
        eyebrow="Compare UK providers"
        title={<>UK direct cremation <span className="text-gold">comparison 2026</span></>}
        subtitle="How Best Direct Cremation compares against every major UK direct cremation provider — price, service model, transparency, accreditation and what is actually included."
      />

      <TrustSignals />

      {/* Editorial intro */}
      <section className="bg-white">
        <Container className="py-12 md:py-16 max-w-prose-wide">
          <article
            className="prose prose-lg max-w-none
                       prose-headings:font-serif prose-headings:text-green
                       prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                       prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                       prose-h3:text-xl prose-h3:text-green prose-h3:mt-8 prose-h3:mb-3
                       prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                       prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-ink prose-strong:font-bold
                       prose-ul:my-5 prose-li:my-1.5 prose-li:text-ink/85"
          >
            <p className="text-lg md:text-xl text-ink/85 leading-relaxed">
              The UK direct cremation market has grown from around 3% of funerals in 2019 to roughly
              <strong> 20% in 2026</strong>. That growth has attracted every kind of provider — national
              operators with their own crematoria networks, independent regional specialists, digital-first
              start-ups, and the high-street brands people already know. Prices range from a headline £950 to
              over £2,200, and the total-cost gap once hidden fees are added is even wider.
            </p>
            <p>
              This hub compares Best Direct Cremation against each of the largest UK direct cremation
              providers on the things that actually matter to a bereaved family — not just the price on the
              website. Below you will find in-depth comparison guides for each provider, plus a summary of
              how to structure a fair comparison yourself.
            </p>

            <h2>How to structure a fair comparison</h2>
            <p>
              Six questions cover almost everything you need to ask. Any provider that dodges or hedges on
              these is telling you something.
            </p>
            <p>
              <strong>1. What is the total price, including Priority Care?</strong> Headline prices are often
              hospital-mortuary collection only. Most UK deaths happen at home, in care homes or in hospices
              — meaning most families pay a Priority Care add-on at the point of need. A fair comparison
              uses the <em>maximum you could pay</em>, not the marketing headline.
            </p>
            <p>
              <strong>2. Is the cremation local, or centralised?</strong> Some large operators transport the
              deceased to a single national mortuary — often hundreds of miles from where the family lives.
              A local direct cremation keeps your loved one closer to home and uses a crematorium the family
              could reasonably visit later.
            </p>
            <p>
              <strong>3. What kind of coffin is used?</strong> A proper simple wooden coffin is the baseline.
              A few ultra-cheap providers use cardboard. Ask.
            </p>
            <p>
              <strong>4. Is the provider or its network NAFD or SAIF accredited?</strong> The National
              Association of Funeral Directors (NAFD) and the Society of Allied and Independent Funeral
              Directors (SAIF) publish and enforce professional standards. Every independent funeral director
              in our network is accredited by one or both.
            </p>
            <p>
              <strong>5. Who answers the phone at 3am — a real person or a call centre?</strong> Direct
              cremation providers get contacted at every hour of the day. Some operators run 24/7 in-house
              phone lines with trained staff. Others outsource to overseas call centres. It matters when you
              call.
            </p>
            <p>
              <strong>6. Is the CMA Standardised Price List easy to find?</strong> The CMA requires every UK
              funeral provider to publish standardised pricing. Reputable providers link to theirs on every
              price page. If you have to hunt for it, or it is buried in a PDF, that itself is a signal. Read
              ours <a href="https://bestdirectcremation.co.uk/wp-content/uploads/2026/05/Standardised-Price-List-2.pdf" target="_blank" rel="noopener noreferrer">here</a> and compare against every provider you are considering.
            </p>

            <h2>The major UK direct cremation providers, at a glance</h2>
            <p>
              A quick snapshot before you dive into the detailed comparison pages below. Prices verified June
              2026 — we refresh these quarterly.
            </p>
            <p>
              <strong>Best Direct Cremation — £1,499 (max £1,749).</strong> Local independent funeral director
              delivery through a UK-wide network. Single fixed price. NAFD/SAIF accredited partners. 24-hour
              phone answered by a real person.
            </p>
            <p>
              <strong>Pure Cremation — ~£2,000.</strong> The UK&apos;s largest dedicated direct cremation
              operator. Centralised — bodies are transported to their own crematoria, often significantly far
              from where the family lives. Higher headline price, includes Priority Care.
            </p>
            <p>
              <strong>Co-op Funeralcare — ~£1,895–£1,995.</strong> High-street national brand operating
              through the Co-op&apos;s own funeral branch network. Familiar, trusted name; higher price
              reflects the branch overhead.
            </p>
            <p>
              <strong>Dignity — ~£1,995–£2,200.</strong> Large national operator, vertically integrated
              (Dignity often owns the funeral director, the mortuary and the crematorium). Higher price;
              families rarely see the Dignity brand at ground level.
            </p>
            <p>
              <strong>Aura Cremations — £1,495–£1,795.</strong> Semi-regional operator with strong customer
              service reputation. Prices vary by region.
            </p>
            <p>
              <strong>Simplicity Cremations — £1,395–£1,595.</strong> Part of the Dignity Group. Lowest
              headline price of the major operators, but centralised delivery and additional Priority Care
              fees can push the total higher.
            </p>
            <p>
              <strong>Distinct Cremations — ~£1,295–£1,595.</strong> Regional independent-flavoured brand,
              growing footprint. Locally-focused where covered.
            </p>

            <h2>Where each provider genuinely wins</h2>
            <p>
              This is not a market where one provider wins everything. Different providers are stronger on
              different things.
            </p>
            <p>
              <strong>If you want the lowest transparent all-in price with local delivery:</strong> Best
              Direct Cremation at £1,499 (max £1,749) is the strongest option we know of for a nationally-organised,
              locally-delivered service.
            </p>
            <p>
              <strong>If you want a big national brand you already know:</strong> Co-op Funeralcare, and to a
              lesser extent Dignity, offer that reassurance at a modest premium.
            </p>
            <p>
              <strong>If you happen to live within a short drive of a Pure Cremation crematorium and cost
              matters less than avoiding involvement:</strong> Pure Cremation offers a fully hands-off end-to-end
              service you never really see.
            </p>
            <p>
              <strong>If you want the absolute lowest headline price and are comfortable with centralised
              handling:</strong> Simplicity Cremations or Distinct Cremations often show the lowest advertised
              price, though total costs vary once Priority Care is added.
            </p>

            <h2>Common misconceptions when comparing providers</h2>
            <p>
              A few things families frequently get wrong:
            </p>
            <p>
              <strong>&quot;The cheapest headline price is the cheapest service.&quot;</strong> Usually not, once
              Priority Care is added. Ask for the maximum you could pay, not the minimum.
            </p>
            <p>
              <strong>&quot;A national brand means better quality.&quot;</strong> Scale means consistency and 24-hour
              coverage, which are real. It does not automatically mean a warmer, more local, or more accountable
              service — often the opposite.
            </p>
            <p>
              <strong>&quot;All direct cremations are the same.&quot;</strong> Legally, all cremations must meet the
              same standards. But there is a real difference between being cared for in a local funeral
              director&apos;s mortuary five miles from your family, and being transported 200 miles to a
              regional processing facility. Both are &quot;direct cremations&quot;. They are not the same experience for
              your family.
            </p>
            <p>
              <strong>&quot;I need to buy a funeral plan to lock in the price.&quot;</strong> Not necessarily.
              Direct cremation prices have been fairly stable since 2022. A funeral plan is one option; paying
              at the point of need is another. See our <Link href="/funeral-plans/">funeral plans guide</Link>
              for how UK plans work under FCA regulation.
            </p>

          </article>
        </Container>
      </section>

      <ComparisonStrip />

      <PriceBlock />

      {/* Comparison articles grid */}
      <section className="bg-cream border-y border-stone">
        <Container className="py-14 md:py-20">
          <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Detailed comparisons</p>
          <h2 className="font-serif text-2xl md:text-3xl text-green mb-8">
            Best Direct Cremation vs every major UK provider
          </h2>
          {comparisons.length === 0 ? (
            <p className="text-ink/70">Detailed comparison guides are being published — check back shortly, or call us to talk through your specific options.</p>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparisons.map(c => (
                <li key={c.slug}>
                  <Link
                    href={`/compare/${c.slug}/`}
                    className="block bg-white p-6 rounded-card shadow-card hover:shadow-lift transition border border-transparent hover:border-gold h-full"
                  >
                    <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-1.5">Head to head</p>
                    <p className="font-serif text-lg text-green leading-snug mb-2">{c.title}</p>
                    {c.excerpt && <p className="text-sm text-ink/70 leading-relaxed">{c.excerpt}</p>}
                    <p className="text-xs text-gold font-medium mt-4">Read the comparison →</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <CostCalculatorCTA variant="card" />

      <WhyBdc />

      <FAQ items={FAQS} title="UK direct cremation comparison — FAQs" />

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">Not sure which provider is right for your family?</p>
          <h2 className="font-serif text-section text-white mb-4">Talk to a real person, 24 hours a day.</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            We&apos;ll talk you through your options — including honest advice on whether Best Direct Cremation
            is the right fit, or whether another provider would suit your family better. £1,499 all-inclusive if
            you choose us. No pressure, no chatbots.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Compare providers', path: '/compare/' },
        ]),
        faqPageSchema(FAQS.map(f => ({ q: f.question, a: f.answer }))),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'UK direct cremation provider comparisons',
          numberOfItems: comparisons.length,
          itemListElement: comparisons.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE.url}/compare/${c.slug}/`,
            name: c.title,
          })),
        },
      )} />
    </>
  );
}
