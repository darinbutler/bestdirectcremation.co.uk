import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';

export const metadata: Metadata = {
  title: 'Prepaid Funeral Plans — Everything You Need to Know',
  description: 'The Best Direct Cremation guide to FCA-regulated funeral plans. How they work, what to look for in a provider, and how to plan ahead with confidence.',
};

export default function FuneralPlansPage() {
  return (
    <>
      <Hero
        eyebrow="Plan ahead"
        title={<>What you need to know about <span className="text-gold">funeral plans</span></>}
        subtitle="A complete guide to FCA-regulated prepaid funeral plans — what they cover, how they work, and how to choose a trustworthy provider."
      />
      <Container className="py-14 md:py-20 max-w-prose-wide prose-longform">
        <p className="text-lg text-ink/85 mb-6">
          Planning ahead for your funeral is a thoughtful and responsible thing to do. It lets you share your preference
          for the type of funeral you want, and puts financial security in place so the costs are covered.
        </p>
        <p className="bg-cream border-l-4 border-gold p-4 italic text-ink/85">
          <strong>Important:</strong> Best Direct Cremation does not currently provide or offer prepaid funeral plans.
          We plan to launch our own direct cremation funeral plans from early 2027. This guide explains how funeral plans
          work, their benefits, and the importance of choosing an FCA-regulated provider in the meantime.
        </p>
        <p className="text-ink/80 mt-6">
          {/* Phase 2 content extension: the full ~2,500-3,000 word pillar lives in Sanity */}
          This page is being extended to the full 2,500-3,000 word funeral-plans pillar. Supporting articles for plan
          types, age-segmented buyers, provider reviews and FCA explainer will publish at /funeral-plans/[slug]/.
        </p>
      </Container>
      <section className="bg-cream border-y border-stone">
        <Container className="py-14 text-center">
          <h2 className="font-serif text-section text-navy mb-3">Have questions about funeral plans?</h2>
          <p className="text-ink/75 mb-8 max-w-2xl mx-auto">
            Call us — we&apos;ll guide you through what to look for in an FCA-regulated plan provider. Our own direct
            cremation funeral plans launch in early 2027.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="gold" showSubtext pulse /></div>
        </Container>
      </section>
    </>
  );
}
