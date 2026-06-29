import Container from './Container';

const BEST = [
  'Delivered by a proper, local Funeral Director',
  'Respectful care, close to your home',
  'NAFD- or SAIF-accredited funeral director',
  'A dignified cremation at a local crematorium',
  'Transparent pricing and clear value',
];

const NATIONAL = [
  'Delivered via centralised logistics and call centres',
  'Driven hundreds of miles to a central ‘mega mortuary’',
  'Unaccredited by national funeral bodies SAIF or NAFD',
  'Cremation can take place miles away at a ‘super-crematorium’',
  'Headline pricing with multiple add-on expenses',
];

export default function ComparisonStrip() {
  return (
    <section className="bg-cream border-y border-stone">
      <Container className="py-14 md:py-20">
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3 text-center">Why families choose Best Direct Cremation</p>
        <h2 className="font-serif text-section font-medium text-navy text-center max-w-3xl mx-auto mb-12">
          Local care versus centralised national providers
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-card shadow-card p-7">
            <p className="font-serif text-navy text-xl mb-4 flex items-center gap-2">
              <span className="text-gold text-2xl">✓</span> Best Direct Cremations
            </p>
            <ul className="space-y-3 text-sm text-ink/85">
              {BEST.map(b => <li key={b} className="flex gap-2"><span className="text-gold flex-none">●</span> {b}</li>)}
            </ul>
          </div>
          <div className="bg-stone/60 rounded-card p-7">
            <p className="font-serif text-ink/70 text-xl mb-4 flex items-center gap-2">
              <span className="text-ink/40 text-2xl">×</span> National direct cremation providers
            </p>
            <ul className="space-y-3 text-sm text-ink/70">
              {NATIONAL.map(b => <li key={b} className="flex gap-2"><span className="text-ink/40 flex-none">●</span> {b}</li>)}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
