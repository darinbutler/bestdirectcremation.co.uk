import Container from './Container';
import PhoneCTA from './PhoneCTA';
import { SITE } from '@/lib/site';

const INCLUDED = [
  'All Funeral Director fees — care, time and support',
  'Collection from a hospital or coroner\'s mortuary',
  'Professional local mortuary care',
  'A suitable coffin for cremation',
  'Full support with all legal paperwork',
  'Cremation at a local crematorium',
  'Ashes returned to you or scattered on your behalf',
];

const NOT_INCLUDED = [
  'Attended service or ceremony at the crematorium',
  'Viewing of the deceased',
  'Embalming',
  'Memorial arrangements or formal notices',
  'Alternative ashes urns (optional add-on)',
];

export default function PriceBlock() {
  return (
    <section className="bg-white border-y border-stone">
      <Container className="py-14 md:py-20">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Pricing</p>
            <h2 className="font-serif text-section font-medium text-navy mb-4">
              Direct Cremation from {SITE.priceLabel}
            </h2>
            <p className="text-ink/80 text-sm leading-relaxed mb-5">
              A simple, affordable funeral that saves more than £3,000 compared to the average traditional UK funeral
              ({SITE.sunlife2026}, SunLife Cost of Dying Report 2026).
            </p>
            <p className="text-ink/80 text-sm leading-relaxed mb-6">
              Clear pricing. No hidden extras. Local professional care. Maximum {SITE.priceCeiling} with Priority Care.
            </p>
            <PhoneCTA size="md" variant="gold" showSubtext />
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
            <div>
              <p className="font-serif text-navy text-lg mb-3">What&apos;s included</p>
              <ul className="space-y-2 text-sm text-ink/85">
                {INCLUDED.map(it => (
                  <li key={it} className="flex gap-2">
                    <span className="text-gold flex-none">✓</span> {it}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-serif text-ink/70 text-lg mb-3">What&apos;s not included</p>
              <ul className="space-y-2 text-sm text-ink/70">
                {NOT_INCLUDED.map(it => (
                  <li key={it} className="flex gap-2">
                    <span className="text-ink/40 flex-none">×</span> {it}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-ink/60 mt-4 leading-relaxed">
                If, before the cremation, you decide you want a small service, your local Best Funeral Director can adapt
                the arrangements for an appropriate fee — something that&apos;s simply not possible with national providers.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
