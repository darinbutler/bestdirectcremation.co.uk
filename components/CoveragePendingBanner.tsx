import Container from './Container';
import PhoneCTA from './PhoneCTA';
import { SITE } from '@/lib/site';

/**
 * Used on county / town pages where coverageStatus === 'coming-soon'.
 * Captures the call AND offers the alternative — exactly the pattern asked for.
 */
export default function CoveragePendingBanner({ areaName }: { areaName: string }) {
  return (
    <section className="bg-gold/10 border-y border-gold/30">
      <Container className="py-10 md:py-12 max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-gold-dark font-semibold mb-3">We&apos;re growing into {areaName}</p>
        <h2 className="font-serif text-2xl md:text-3xl text-navy mb-3">
          We will soon be serving families in {areaName}
        </h2>
        <p className="text-ink/85 leading-relaxed mb-5">
          {SITE.name} is finalising the local funeral directors that we will partner with in {areaName}.
          If you need to arrange a direct cremation now, please call us. We will either:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-ink/85 text-sm mb-6">
          <li>Connect you with a partner funeral director already serving the surrounding area, or</li>
          <li>Recommend a trusted local independent funeral director who meets the same standards of care we require from every Best Funeral Director.</li>
        </ul>
        <PhoneCTA size="md" variant="gold" showSubtext />
      </Container>
    </section>
  );
}
