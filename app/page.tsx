import Hero from '@/components/Hero';
import UspGrid from '@/components/UspGrid';
import ImageTextSection from '@/components/ImageTextSection';
import ProcessSteps from '@/components/ProcessSteps';
import ComparisonStrip from '@/components/ComparisonStrip';
import PriceBlock from '@/components/PriceBlock';
import UkCoverageMap from '@/components/UkCoverageMap';
import FAQ from '@/components/FAQ';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import JsonLd from '@/components/JsonLd';
import { faqPageSchema, jsonLdString, serviceSchema } from '@/lib/seo';
import { IMG } from '@/lib/images';
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
        title="Simple, dignified direct cremation — done properly"
        subtitle="Always delivered locally by our handpicked, independent BEST Funeral Directors."
      />
      <UspGrid />

      {/* Section 1 — Direct cremation, delivered by a local FD */}
      <ImageTextSection
        eyebrow="Done properly"
        title="Direct cremation — delivered by a local, vetted, funeral director"
        image={IMG.fdShop}
        imageAlt="A Best Funeral Director shop front — independent and local"
        imagePosition="left"
        background="white"
      >
        <p>
          Best Direct Cremation provides simple, dignified direct cremation services, delivered by an independent
          funeral director that&apos;s local to you — chosen and verified by us as one of the finest in the country,
          meeting the highest standards of professional care.
        </p>
        <p>
          You don&apos;t need to compare providers, worry about quality, or question what happens behind the scenes.
          When you choose Best Direct Cremation, we&apos;ve already done all the work for you — so you can{' '}
          <strong>know you&apos;re in great care</strong>.
        </p>
        <p>
          Your loved one will be cared for locally by an independent funeral director with trained staff, vehicles,
          professional premises and mortuary facilities — never transported around the country to fit a centralised
          process.
        </p>
        <p>
          <strong>Best Direct Cremation for {SITE.priceLabel}.</strong> Clear pricing. No hidden extras. Local
          professional care.
        </p>
        <p className="mt-6"><PhoneCTA size="lg" variant="green" showSubtext /></p>
      </ImageTextSection>

      {/* Section 2 — What is direct cremation? */}
      <ImageTextSection
        eyebrow="What is direct cremation?"
        title="A modern, more personal way to say goodbye"
        image={IMG.flowersUrn}
        imageAlt="White roses and an urn on a console table — a quiet remembrance"
        imagePosition="right"
        background="cream"
      >
        <p>
          One in every five UK funerals is now a direct cremation. It removes the formal ceremony at the
          crematorium, giving families the freedom to take time, reflect, and remember a loved one in their own way.
        </p>
        <p>
          Some families choose to hold a memorial or celebration of life later — somewhere that holds special
          meaning. Others prefer the simplicity of a direct cremation without a large ceremony. There&apos;s no right
          or wrong choice — only what feels right for you.
        </p>
        <p>
          What matters is that while the service is simple, delivering it properly is not. Best Direct Cremation
          brings it all together — local professional care, dignified handling, and ashes returned with respect.
        </p>
      </ImageTextSection>

      {/* Section 3 — Know You're In Great Care */}
      <ImageTextSection
        eyebrow="Know you're in great care"
        title="Every cremation delivered by a local Best Funeral Director"
        image={IMG.fdCircle}
        imageAlt="A collage of independent Best Funeral Director partners"
        imagePosition="left"
        background="white"
      >
        <p>
          When you arrange a Best Direct Cremation, you are not choosing a logistics-led operation that delivers
          cremations from a centralised hub.
        </p>
        <p>
          You are choosing a provider that takes responsibility for how your service is delivered — and guarantees
          your loved one will be cared for and cremated locally, by a proper funeral professional.
        </p>
        <p>Every Best Funeral Director must meet our highest standards:</p>
        <ul>
          <li><strong>Proven local expertise</strong> — well-established in their community.</li>
          <li><strong>Professional premises and facilities</strong> — own mortuary, verified by us.</li>
          <li><strong>Fully trained, experienced staff</strong> — dignity, compassion, and care.</li>
          <li><strong>Recognised accreditation</strong> — NAFD or SAIF members.</li>
        </ul>
      </ImageTextSection>

      <ComparisonStrip />
      <PriceBlock />
      <ProcessSteps />
      <UkCoverageMap />

      {/* What to do when someone dies */}
      <ImageTextSection
        eyebrow="Practical guidance"
        title="What to do when someone dies"
        image={IMG.hands}
        imageAlt="Hands folded in reflection — practical guidance after a death"
        imagePosition="right"
        background="cream"
      >
        <p>
          For most people, arranging a funeral is something they have to do for the first time. It&apos;s a difficult
          thing to take on when you know nothing about what you&apos;re supposed to do — especially at a time when
          you&apos;re likely to be bewildered, upset and dealing with grief.
        </p>
        <p>
          We&apos;ve created a simple, plain-English guide to the things you need to do and the decisions you&apos;ll
          need to make.
        </p>
        <p className="mt-4">
          <Link href="/help/what-to-do-when-someone-dies/" className="text-gold underline font-medium hover:text-gold-dark">
            Read: What to do when someone dies →
          </Link>
        </p>
      </ImageTextSection>

      {/* Funeral help and guidance */}
      <ImageTextSection
        eyebrow="Help and guidance"
        title="Answers to the questions families ask"
        image={IMG.faqHero}
        imageAlt="Frequently asked questions about direct cremation"
        imagePosition="left"
        background="white"
      >
        <p>
          There are a lot of unanswered questions when it comes to funerals and direct cremation. A good funeral
          director will answer them all in person — but for those who want to read and understand more first,
          we&apos;ve written several help and advice articles that cover the most common questions.
        </p>
        <p className="mt-4">
          <Link href="/help/" className="text-gold underline font-medium hover:text-gold-dark">
            Browse Funeral Help and Guidance →
          </Link>
        </p>
      </ImageTextSection>

      <FAQ items={HOMEPAGE_FAQS.map(f => ({ question: f.question, answer: f.answer }))} />

      {/* Final CTA strip */}
      <section className="bg-navy text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4 max-w-2xl mx-auto">
            Speak to a real person, day or night
          </h2>
          <p className="text-cream/85 max-w-2xl mx-auto mb-8 leading-relaxed">
            Available 24 hours a day. A real member of the team — never a chatbot, never an answering service.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(svcSchema, faqSchema)} />
    </>
  );
}
