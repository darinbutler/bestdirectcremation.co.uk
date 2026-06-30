import Container from './Container';

/**
 * The 4 USP bullets shown immediately below the hero — matching the live BDC site.
 */
const USPS = [
  { title: 'Cared for locally and never driven miles away',  icon: '📍' },
  { title: 'Delivered by a proper independent funeral director', icon: '🤝' },
  { title: 'Personal attention and professional mortuary care', icon: '✨' },
  { title: 'A real person to talk to, whenever you need us',  icon: '📞' },
];

export default function UspGrid() {
  return (
    <section className="bg-white border-b border-stone">
      <Container className="py-10 md:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {USPS.map(u => (
            <div key={u.title} className="text-center">
              <div className="text-3xl mb-3" aria-hidden="true">{u.icon}</div>
              <h3 className="font-serif text-base text-navy leading-snug">{u.title}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
