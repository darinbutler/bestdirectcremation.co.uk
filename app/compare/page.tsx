import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import ComparisonStrip from '@/components/ComparisonStrip';
import PriceBlock from '@/components/PriceBlock';

export const metadata: Metadata = {
  title: 'UK Direct Cremation Provider Comparison 2026',
  description: 'Compare UK direct cremation providers: Best Direct Cremation, Pure Cremation, Aura, Distinct, Simplicity, Co-op. Price, service model, accreditation and what is actually included.',
};

export default function ComparePage() {
  return (
    <>
      <Hero
        eyebrow="Compare"
        title={<>UK direct cremation <span className="text-gold">comparison 2026</span></>}
        subtitle="How Best Direct Cremation compares with Pure Cremation, Aura, Distinct, Simplicity and Co-op — on price, service model, accreditation and what is actually included."
      />
      <Container className="py-14 max-w-prose-wide prose-longform">
        <p>This is the comparison hub — full price-ladder + per-provider review pages are coming in Phase 3 of the rebuild.</p>
      </Container>
      <ComparisonStrip />
      <PriceBlock />
    </>
  );
}
