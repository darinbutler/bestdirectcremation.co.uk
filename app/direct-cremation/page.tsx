import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import ProcessSteps from '@/components/ProcessSteps';
import ComparisonStrip from '@/components/ComparisonStrip';
import PriceBlock from '@/components/PriceBlock';
import PhoneCTA from '@/components/PhoneCTA';

export const metadata: Metadata = {
  title: 'What is a Direct Cremation? — A complete UK guide',
  description: 'Everything you need to know about direct cremations. The Best Direct Cremation guide to unattended funerals, what is included, what is not, and how to choose a provider.',
};

export default function DirectCremationPage() {
  return (
    <>
      <Hero
        eyebrow="The guide"
        title={<>What is a <span className="text-gold">direct cremation</span> funeral?</>}
        subtitle="The Best Direct Cremation guide to everything you need to know about direct cremations and unattended funerals."
      />
      <Container className="py-14 md:py-20 max-w-prose-wide prose-longform">
        <p className="text-lg text-ink/85 mb-6">
          Direct cremation funerals have grown in popularity over the past few years, with nearly 20% of UK funerals
          each year now being a direct cremation. It is seen as a modern, affordable alternative to a traditional
          funeral that can give families the freedom to remember a loved one in their own way.
        </p>
        {/* Phase 2 content extension: rewrite to 3,000+ words in Sanity-friendly Portable Text */}
        <p className="text-ink/80">
          {/* placeholder — replace with the full long-form rewrite when content team is ready */}
          This page is being extended to the full 3,000-word cornerstone format. The existing WordPress content has
          been migrated as a starting point and will be expanded with locality-specific detail, an FAQ block wrapped in
          FAQPage schema, and an attended-direct-cremation explainer.
        </p>
      </Container>
      <ProcessSteps />
      <ComparisonStrip />
      <PriceBlock />
      <section className="bg-cream border-y border-stone">
        <Container className="py-14 text-center">
          <h2 className="font-serif text-section text-navy mb-3">Direct cremations — done properly</h2>
          <p className="text-ink/75 mb-8">Call us to arrange a direct cremation delivered by a local independent funeral director.</p>
          <div className="inline-block"><PhoneCTA size="lg" variant="gold" showSubtext pulse /></div>
        </Container>
      </section>
    </>
  );
}
