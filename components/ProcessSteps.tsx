import Container from './Container';

const STEPS = [
  { n: 1, title: 'Call Best Direct Cremation',  body: 'Call us at any time, day or night, to start your arrangements. A real person answers — every time.' },
  { n: 2, title: 'Local funeral care',          body: 'Your local Best Funeral Director respectfully takes your loved one into their care and prepares them for cremation at their own funeral home.' },
  { n: 3, title: 'Funeral arrangements',        body: 'Our expert funeral directors support you with all the paperwork and handle the practical arrangements.' },
  { n: 4, title: 'A local cremation takes place', body: 'The coffin is driven to a local crematorium in a proper funeral vehicle, where a dignified cremation is carried out.' },
  { n: 5, title: 'Return of ashes',             body: 'Ashes are returned to you, or scattered respectfully at the crematorium, depending on your preference.' },
];

export default function ProcessSteps() {
  return (
    <section className="bg-white border-y border-stone">
      <Container className="py-14 md:py-20">
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">How a Best Direct Cremation works</p>
        <h2 className="font-serif text-section font-medium text-navy mb-10 max-w-2xl">Five clear steps, delivered locally, with proper care.</h2>
        <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {STEPS.map(step => (
            <li key={step.n} className="">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold text-white font-serif text-xl">{step.n}</span>
                <h3 className="font-serif text-lg text-navy">{step.title}</h3>
              </div>
              <p className="text-ink/80 text-sm leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
