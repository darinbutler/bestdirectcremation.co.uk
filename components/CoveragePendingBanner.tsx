import Container from './Container';
import PhoneCTA from './PhoneCTA';
import { SITE } from '@/lib/site';

/**
 * Shown on county / town pages where we don't yet operate a partner FD
 * (currently Scotland and Northern Ireland).
 * Soft, transparent treatment — pages still indexable for organic search
 * but visitors are told the truth and given a clear path: we'll connect
 * them to a trusted local FD.
 */
export default function CoveragePendingBanner({ areaName }: { areaName: string }) {
  return (
    <section className="bg-gold/10 border-y border-gold/30">
      <Container className="py-10 md:py-12 max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-gold-dark font-semibold mb-3">
          Expanding into {areaName}
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-green mb-3">
          {SITE.name} is growing its network in {areaName}
        </h2>
        <p className="text-ink/85 leading-relaxed mb-5">
          {SITE.name} is in the process of partnering with vetted independent funeral directors in {areaName}.
          If you need to arrange a direct cremation today, please call us — we will:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-ink/85 text-sm mb-7">
          <li>Confirm whether we can serve your specific area through an existing partner, or</li>
          <li>Recommend a trusted local independent funeral director who meets the same standards of care we require from every Best Funeral Director.</li>
        </ul>
        <PhoneCTA size="md" variant="green" />
        <p className="text-xs italic text-green mt-2 font-medium">{SITE.promiseSubtext}</p>
      </Container>
    </section>
  );
}
