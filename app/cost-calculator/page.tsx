import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import CostCalculator from '@/components/CostCalculator';
import TrustSignals from '@/components/TrustSignals';
import WhyBdc from '@/components/WhyBdc';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqPageSchema, jsonLdString, serviceSchema } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Funeral Cost Calculator UK 2026 — See Your Saving',
  description: 'Interactive UK funeral cost calculator. Compare Best Direct Cremation\'s £1,499 all-inclusive price with traditional funerals, attended cremation, and every major UK provider — by region.',
  alternates: { canonical: `${SITE.url}/cost-calculator/` },
  openGraph: {
    title: 'Funeral Cost Calculator UK 2026 — See Your Saving',
    description: 'Compare BDC\'s £1,499 direct cremation vs traditional UK funerals + every major provider.',
    url: `${SITE.url}/cost-calculator/`,
  },
};

const FAQS = [
  {
    question: 'How accurate is this calculator?',
    answer: 'Pricing baselines come from the SunLife Cost of Dying Report 2026 (the UK\'s most authoritative annual funeral pricing survey) plus publicly available provider pricing verified in June 2026. Regional multipliers reflect SunLife\'s regional data. Actual cost can vary based on your specific circumstances and the funeral director used.',
  },
  {
    question: 'Is the £1,499 Best Direct Cremation price the same everywhere?',
    answer: 'Yes. We charge £1,499 all-inclusive across all of England and Wales, with a £250 optional Priority Care fee for collections from home, care homes or hospices (maximum total £1,749). Pricing does not vary by region or postcode.',
  },
  {
    question: 'Why are traditional funerals so much more expensive?',
    answer: 'A traditional UK funeral includes the chapel service, hearse, limousine(s), celebrant or minister, music licensing, floral tributes, order of service printing, and often a wake organised by the funeral director. A direct cremation removes all of these ceremonial elements while keeping the essential dignified care of the deceased — collection, mortuary care, paperwork, the cremation itself, and return of ashes.',
  },
  {
    question: 'What if I want to hold a memorial separately?',
    answer: 'Many families now choose direct cremation followed by a personal memorial later — at home, in a pub, at a community hall, outdoors. The memorial can include any element a traditional funeral would have (celebrant, music, readings, food) without being confined to a 25-minute crematorium slot. You can take weeks or months to plan it properly.',
  },
  {
    question: 'Are the competitor prices shown accurate?',
    answer: 'Yes, verified as of June 2026 via Apify-scraped public pricing. Prices change — always verify directly with the provider before deciding. Best Direct Cremation is not affiliated with any of the competitors shown.',
  },
  {
    question: 'What\'s included in the £1,499?',
    answer: 'Collection from a hospital or coroner\'s mortuary, professional care in a local funeral director\'s mortuary, a simple coffin suitable for cremation, all legal paperwork (doctor\'s certificates, Green Form), the cremation at a local crematorium, and the return of ashes to you. £250 Priority Care for non-hospital collections (max £1,749). No hidden fees.',
  },
];

export default function CostCalculatorPage() {
  const path = '/cost-calculator/';
  return (
    <>
      <Hero
        eyebrow="Funeral cost calculator"
        title="See your direct cremation saving"
        subtitle="Compare Best Direct Cremation's £1,499 all-inclusive price with traditional funerals and every major UK provider — by region. No personal details required."
      />

      <TrustSignals />

      <CostCalculator />

      {/* Static SEO content explaining the methodology + what's included */}
      <section className="bg-white">
        <Container className="py-12 md:py-16 max-w-prose-wide">
          <article className="prose prose-lg max-w-none
                              prose-headings:font-serif prose-headings:text-green
                              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                              prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                              prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                              prose-strong:text-ink prose-strong:font-bold">
            <h2>How the calculator works</h2>
            <p>
              The calculator uses three inputs — the type of funeral, the region you live in, and whether
              the deceased is in a hospital or elsewhere — to estimate your costs. The numbers come from
              two sources. First, the <strong>SunLife Cost of Dying Report 2026</strong>, the UK&apos;s most
              authoritative annual survey of funeral pricing. Second, publicly available 2026 pricing
              from the major UK direct cremation providers, verified in June 2026.
            </p>
            <p>
              We show three things on the result panel: the typical cost of the funeral type you picked
              (adjusted for your region), Best Direct Cremation&apos;s price for the same service, and
              the saving. If you picked direct cremation, we also show what the other major UK providers
              charge for the same service.
            </p>

            <h2>Why £1,499?</h2>
            <p>
              £1,499 is what it actually costs to deliver a proper direct cremation through a local
              independent funeral director — their staff, premises, vehicles, mortuary, paperwork, and
              the crematorium fee — plus a fair margin to keep them in business. The £250 Priority Care
              add-on covers the additional work involved when collection is from home, a care home, or
              a hospice rather than a hospital mortuary.
            </p>
            <p>
              The maximum price is £1,749. There are no other fees added at the point of need. Every
              partner funeral director in our network is NAFD- or SAIF-accredited and has their own
              premises and mortuary. We deliver locally — never centralised.
            </p>

            <h2>Why some providers are cheaper</h2>
            <p>
              You may see UK direct cremation advertised at £950 or £1,200. The price comes from two
              places. First, centralisation: your loved one is transported to a single regional mortuary
              (often hundreds of miles from home) and cremated at a corporate-owned crematorium.
              For some families that is acceptable; for many, it is not.
            </p>
            <p>
              Second, hidden fees that emerge at the point of need. The most common is the Priority
              Care or out-of-hours collection fee. A £950 headline price can become £1,450 once the
              £500 Priority Care fee is added (and the majority of deaths happen at home, in care
              homes, or in hospices — so Priority Care is almost always needed).
            </p>
            <p>
              Best Direct Cremation&apos;s £1,499 includes everything except Priority Care, which is a
              transparent £250 add-on. Maximum £1,749. No surprises.
            </p>

            <h2>The wider picture</h2>
            <p>
              The average UK funeral costs <strong>£4,510 in 2026</strong> (SunLife Cost of Dying
              Report 2026). That figure has risen by roughly 5% per year for over a decade — faster
              than UK wage growth. Direct cremation has grown rapidly as a response: it now accounts
              for around one in every five UK funerals.
            </p>
            <p>
              The saving versus a traditional funeral is typically £3,000+. Many families use the
              saving to hold a personal memorial later — at a venue and time that genuinely matters
              — rather than paying for a 25-minute crematorium service.
            </p>
          </article>
        </Container>
      </section>

      <WhyBdc />

      <FAQ items={FAQS} title="Cost calculator — frequently asked questions" />

      <JsonLd raw={jsonLdString(
        serviceSchema({
          areaServed: 'United Kingdom',
          path,
          description: 'Funeral cost calculator comparing Best Direct Cremation\'s £1,499 all-inclusive price with traditional UK funerals and major direct cremation providers.',
        }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Cost calculator', path },
        ]),
        faqPageSchema(FAQS.map(f => ({ q: f.question, a: f.answer }))),
      )} />
    </>
  );
}
