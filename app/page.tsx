import Hero from '@/components/Hero';
import ProcessSteps from '@/components/ProcessSteps';
import ComparisonStrip from '@/components/ComparisonStrip';
import PriceBlock from '@/components/PriceBlock';
import FAQ from '@/components/FAQ';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import JsonLd from '@/components/JsonLd';
import { faqPageSchema, jsonLdString, serviceSchema } from '@/lib/seo';
import Link from 'next/link';
import { SITE } from '@/lib/site';

const HOMEPAGE_FAQS = [
  { question: 'How much does a Best Direct Cremation cost?',
    answer: `${SITE.priceLabel} all-inclusive. The only optional cost is a £${SITE.priorityCare} Priority Care collection fee if the person who has died is not at a hospital or coroner's mortuary — maximum total ${SITE.priceCeiling}.` },
  { question: 'Is the cremation local or centralised?',
    answer: 'Every Best Direct Cremation is delivered locally by a partner funeral director near where you live. Your loved one is never transported to a centralised hub.' },
  { question: 'Will a real person answer the phone?',
    answer: 'Yes. We answer 24 hours a day — a real person, every time. ' + SITE.phone + '.' },
  { question: 'Do you provide funeral plans?',
    answer: 'Not yet. Best Direct Cremation does not currently sell prepaid funeral plans, but plan to launch from early 2027. Our funeral plans guide explains everything to look for in the meantime.' },
];

export default function Home() {
  const faqSchema = faqPageSchema(HOMEPAGE_FAQS.map(f => ({ q: f.question, a: typeof f.answer === 'string' ? f.answer : '' })));
  const svcSchema = serviceSchema({
    areaServed: 'United Kingdom',
    path: '/',
    description: 'Direct cremation across the UK, delivered locally by independent funeral directors. £1,499 all-inclusive.',
  });
  return (
    <>
      <Hero
        eyebrow="Best Direct Cremation"
        title={<>Simple, dignified direct cremation — <span className="text-gold">done properly</span></>}
        subtitle="Always delivered locally by our handpicked, independent BEST Funeral Directors."
      />
      <Container className="py-14 md:py-20 max-w-prose-wide">
        <h2 className="font-serif text-section text-navy mb-4">Direct cremation — delivered by a local, vetted, funeral director</h2>
        <p className="text-ink/80 leading-relaxed mb-4">
          Best Direct Cremation provides simple, dignified direct cremation services, delivered by an independent
          funeral director that&apos;s local to you — chosen and verified by us as one of the finest in the country.
        </p>
        <p className="text-ink/80 leading-relaxed mb-4">
          You don&apos;t need to compare providers, worry about quality, or question what happens behind the scenes.
          When you choose Best Direct Cremation, we&apos;ve already done the work for you — so you can <strong>know
          you&apos;re in great care</strong>.
        </p>
        <p className="text-ink/80 leading-relaxed mb-4">
          Your loved one will be cared for locally by an independent funeral director with trained staff, their own
          vehicles, professional premises and mortuary facilities — never transported around the country to fit a
          centralised process.
        </p>
        <p className="text-ink/80 leading-relaxed mb-6">
          <strong>Best Direct Cremation for {SITE.priceLabel}.</strong> Clear pricing. No hidden extras. Local professional care.
        </p>
        <PhoneCTA size="lg" variant="gold" showSubtext />
      </Container>
      <ProcessSteps />
      <ComparisonStrip />
      <PriceBlock />
      <section className="bg-navy text-cream">
        <Container className="py-14 md:py-20 text-center">
          <p className="text-sm uppercase tracking-widest text-gold-light font-semibold mb-3">Coverage</p>
          <h2 className="font-serif text-section text-white mb-4 max-w-2xl mx-auto">
            Find direct cremation in your county
          </h2>
          <p className="text-cream/85 max-w-2xl mx-auto mb-8 leading-relaxed">
            We work with a growing network of independent funeral directors across England, Wales, Scotland and
            Northern Ireland. Even if we&apos;re still expanding into your area, call us — we&apos;ll connect you to a
            trusted local FD who meets our standards.
          </p>
          <Link href="/coverage/" className="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-md font-semibold hover:bg-gold-dark transition">
            See UK coverage →
          </Link>
        </Container>
      </section>
      <FAQ items={HOMEPAGE_FAQS.map(f => ({ question: f.question, answer: f.answer }))} />
      <JsonLd raw={jsonLdString(svcSchema, faqSchema)} />
    </>
  );
}
