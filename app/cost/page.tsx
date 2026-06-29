import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PriceBlock from '@/components/PriceBlock';

export const metadata: Metadata = {
  title: 'How Much Does a Direct Cremation Cost in the UK?',
  description: 'Direct cremation in the UK from £1,499 all-inclusive. The Best Direct Cremation cost guide — what is included, what is not, and what other providers charge.',
};

export default function CostPage() {
  return (
    <>
      <Hero
        eyebrow="Cost guide"
        title={<>How much does a <span className="text-gold">direct cremation</span> cost in the UK?</>}
        subtitle="Direct cremation in the UK from £1,499 all-inclusive — far less than the £4,510 UK average for a traditional funeral (SunLife 2026)."
      />
      <PriceBlock />
      <Container className="py-14 max-w-prose-wide prose-longform">
        <p>Full cost pillar content is being extended to ~2,500-3,000 words. Regional cost variants live at /cost/london/, /cost/manchester/, etc.</p>
      </Container>
    </>
  );
}
