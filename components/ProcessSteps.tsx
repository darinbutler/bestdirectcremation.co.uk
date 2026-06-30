import Image from 'next/image';
import Container from './Container';
import { IMG } from '@/lib/images';

/**
 * 5-step process — matches the live BDC layout: each step has a real
 * lifestyle photo paired with the title + body. Numbered overlay on photo.
 */
const STEPS = [
  { n: 1, title: 'Call Best Direct Cremation',  body: 'Call us at any time, day or night, to start your funeral arrangements. The Best team will support and guide you through everything.', image: IMG.step1Call,    alt: 'Lady talking on phone to arrange a Best Direct Cremation' },
  { n: 2, title: 'Local funeral care',           body: 'The local Best Funeral Director will respectfully take your loved one into their care and prepare them for cremation at their funeral home.', image: IMG.step2Care,   alt: 'Local funeral director caring for the deceased' },
  { n: 3, title: 'Funeral arrangements',         body: 'Our expert funeral directors will support you with all the necessary paperwork and handle the practical arrangements for the cremation.', image: IMG.step3Arrange, alt: 'Funeral director handling paperwork and arrangements' },
  { n: 4, title: 'A local cremation takes place', body: 'The coffin is driven to a local crematorium in a proper funeral vehicle, where a dignified cremation is carried out.', image: IMG.step4Cremate, alt: 'Best Direct Cremation at a local crematorium' },
  { n: 5, title: 'Return of ashes',              body: 'The ashes can be scattered at the crematorium, or they are returned to you for you to scatter or arrange a lasting memorial.', image: IMG.step5Ashes,   alt: 'Return of ashes after a direct cremation' },
];

export default function ProcessSteps() {
  return (
    <section className="bg-white border-y border-stone">
      <Container className="py-14 md:py-20">
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">What to expect</p>
        <h2 className="font-serif text-section font-medium text-navy mb-10 max-w-2xl">What to expect with a Best Direct Cremation</h2>
        <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5">
          {STEPS.map(step => (
            <li key={step.n} className="flex flex-col">
              <div className="relative w-full aspect-[4/3] rounded-card overflow-hidden shadow-card mb-4">
                <Image src={step.image} alt={step.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw" />
                <div className="absolute top-3 left-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-gold text-white font-serif text-lg shadow-lift">
                  {step.n}
                </div>
              </div>
              <h3 className="font-serif text-lg text-navy mb-2">{step.n}. {step.title}</h3>
              <p className="text-ink/80 text-sm leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
