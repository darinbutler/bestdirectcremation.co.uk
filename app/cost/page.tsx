import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PriceBlock from '@/components/PriceBlock';
import CostCalculatorCTA from '@/components/CostCalculatorCTA';
import TrustSignals from '@/components/TrustSignals';
import WhyBdc from '@/components/WhyBdc';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqPageSchema, jsonLdString, serviceSchema } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Direct Cremation Cost UK 2026 — From £1,499 All-Inclusive',
  description: 'How much does a direct cremation cost in the UK in 2026? £1,499 all-inclusive with Best Direct Cremation. Full cost breakdown, comparison with major providers, and an interactive cost calculator.',
  alternates: { canonical: `${SITE.url}/cost/` },
};

const FAQS = [
  { question: 'How much does a direct cremation cost in the UK in 2026?', answer: 'Direct cremation prices in the UK range from £1,400 to £2,200 in 2026, depending on provider and model. Best Direct Cremation costs £1,499 all-inclusive, with a £250 optional Priority Care collection fee for non-hospital collections (maximum total £1,749).' },
  { question: 'What\'s included in the £1,499?', answer: 'Collection from a hospital or coroner\'s mortuary, professional care in a local funeral director\'s mortuary, a simple coffin suitable for cremation, all legal paperwork (doctor\'s certificates and Green Form), the cremation at a local crematorium, and the return of ashes to you.' },
  { question: 'Is £1,499 the same price across the UK?', answer: 'Yes, our pricing is fixed nationally. We charge £1,499 in London, Manchester, Cornwall — anywhere in England and Wales. Maximum £1,749 with Priority Care. No regional variation.' },
  { question: 'What is the Priority Care fee?', answer: 'A £250 add-on for collection from home, care homes or hospices rather than a hospital mortuary. Most UK deaths happen in non-hospital settings, so Priority Care is needed for most cases — fully disclosed before you commit.' },
  { question: 'How does this compare to a traditional funeral?', answer: 'The average UK traditional funeral costs £4,510 in 2026 (SunLife Cost of Dying Report). Direct cremation at £1,499 saves around £3,000 per funeral. Many families use the saving to hold a personal memorial later in a venue that means something.' },
  { question: 'Why are some direct cremations advertised cheaper?', answer: 'Two reasons. First, centralisation: cheaper providers transport bodies to a single regional mortuary often hundreds of miles away. Second, hidden Priority Care fees that add £400-£500 at the point of need. A £950 headline price often becomes £1,450 once Priority Care is included.' },
];

export default function CostPage() {
  const path = '/cost/';
  return (
    <>
      <Hero
        eyebrow="Cost guide"
        title="Direct cremation cost UK 2026"
        subtitle="£1,499 all-inclusive with Best Direct Cremation. Maximum £1,749 with Priority Care. Compare with the £4,510 UK funeral average and every major UK provider in our cost calculator."
      />

      <TrustSignals />

      {/* Primary inline CTA — kicks users to the calculator immediately */}
      <CostCalculatorCTA variant="card" />

      <PriceBlock />

      {/* Pillar content */}
      <section className="bg-white">
        <Container className="py-12 md:py-16 max-w-prose-wide">
          <article className="prose prose-lg max-w-none
                              prose-headings:font-serif prose-headings:text-green
                              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                              prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                              prose-h3:text-xl prose-h3:text-green prose-h3:mt-8 prose-h3:mb-3
                              prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                              prose-strong:text-ink prose-strong:font-bold">

            <h2>What you should pay in 2026</h2>
            <p>
              A credible UK direct cremation costs £1,400–£2,200 in 2026. <strong>Best Direct Cremation
              is £1,499 all-inclusive.</strong> The maximum you will pay is £1,749 if Priority Care
              collection is needed (the £250 add-on for home, care home or hospice collections rather
              than a hospital mortuary). There are no other fees added at the point of need.
            </p>
            <p>
              The lowest you should pay anywhere — for genuinely local delivery — is around £1,400.
              Anything cheaper usually means centralisation, hidden Priority Care fees, or other
              point-of-need surprises. <Link href="/cost-calculator/">Try our cost calculator</Link> to
              see how £1,499 compares against major UK providers for your specific region.
            </p>

            <h2>Why direct cremation is so much cheaper than a traditional funeral</h2>
            <p>
              The average UK funeral cost in 2026 is £4,510 (SunLife Cost of Dying Report 2026). A
              direct cremation costs around a third of that. The difference is everything ceremonial
              that a direct cremation strips out: no service at the crematorium, no hearse and
              limousines, no celebrant or minister, no music licensing, no large floral tributes, no
              order of service, no embalming, no upgraded coffin, no wake organised by the funeral
              director.
            </p>
            <p>
              What remains is the dignified core of the funeral: collection of the deceased,
              professional care in a local mortuary, a simple coffin, all the legal paperwork, the
              cremation itself, and the return of ashes. The care is identical to a traditional
              cremation — it is the ceremony that is removed.
            </p>

            <h2>UK direct cremation pricing — major providers compared</h2>
            <p>
              Best Direct Cremation: £1,499 all-inclusive (max £1,749 with Priority Care). Local
              independent funeral director delivery.
            </p>
            <p>
              Pure Cremation: ~£2,000. Centralised — your loved one is transported to their Andover,
              Hampshire mortuary regardless of where you live.
            </p>
            <p>
              Co-op Funeralcare: ~£1,995. Delivered through Co-op&apos;s national branch network.
            </p>
            <p>
              Dignity: ~£2,200. Vertically integrated — Dignity owns the funeral director, mortuary
              and crematorium used.
            </p>
            <p>
              Aura: £1,495–£1,795 depending on region. Semi-regional operator.
            </p>
            <p>
              Simplicity Cremations: £1,395–£1,595. Part of the Dignity Group.
            </p>
            <p>
              For the full side-by-side breakdown with structural comparisons, see our{' '}
              <Link href="/compare/">provider comparison hub</Link>. Or use the{' '}
              <Link href="/cost-calculator/">cost calculator</Link> to see the specific saving
              for your region.
            </p>

            <h2>Hidden fees to watch for</h2>
            <p>
              The most common hidden cost is the Priority Care or out-of-hours collection fee. If
              someone dies at home or in a care home (which is where the majority of UK deaths
              happen), the body must be collected promptly. Some providers advertise £950–£1,200
              but charge £400–£500 for Priority Care at the point of need. The headline £950 becomes
              a real £1,450.
            </p>
            <p>
              Best Direct Cremation&apos;s Priority Care fee is a transparent £250, taking the
              maximum total to £1,749 — fully disclosed before you commit. No surprises at the point
              of need.
            </p>

            <h2>What you can do with the saving</h2>
            <p>
              Switching from a traditional funeral (£4,510) to a direct cremation (£1,499) saves
              roughly £3,000. Many families use the saving to hold a personal memorial later —
              at a venue and time that genuinely matters. A pub function room, a community hall,
              an outdoor location. The memorial can include any element a traditional funeral would
              have had (celebrant, music, readings, food) without being confined to a 25-minute
              crematorium slot. You can take weeks or months to plan it properly.
            </p>

            <h2>Help if you can&apos;t afford the funeral</h2>
            <p>
              If even £1,499 is out of reach, three routes can help. The DWP Funeral Expenses Payment
              covers £1,000+ for low-income families on certain benefits. The Children&apos;s Funeral
              Fund covers most fees if a child under 18 has died (no means test). As a last resort,
              the local authority will arrange a Public Health Funeral at no cost. Read our{' '}
              <Link href="/help/cost-of-a-funeral/">complete cost guide</Link> for the full detail
              on each.
            </p>

          </article>
        </Container>
      </section>

      <WhyBdc />

      <FAQ items={FAQS} title="Direct cremation cost — frequently asked questions" />

      <JsonLd raw={jsonLdString(
        serviceSchema({
          areaServed: 'United Kingdom',
          path,
          description: 'Direct cremation in the UK from £1,499 all-inclusive. Cost guide and interactive calculator.',
        }),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Cost', path },
        ]),
        faqPageSchema(FAQS.map(f => ({ q: f.question, a: f.answer }))),
      )} />
    </>
  );
}
