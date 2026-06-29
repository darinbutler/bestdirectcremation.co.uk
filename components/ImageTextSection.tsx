import Image from 'next/image';
import { ReactNode } from 'react';
import Container from './Container';

export default function ImageTextSection({
  eyebrow, title, children, image, imageAlt,
  imagePosition = 'left',
  background = 'white',
}: {
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  image: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  background?: 'white' | 'cream';
}) {
  const bgClass = background === 'cream' ? 'bg-cream' : 'bg-white';
  return (
    <section className={`${bgClass} border-b border-stone`}>
      <Container className="py-14 md:py-20">
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${imagePosition === 'right' ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <div className="relative w-full aspect-[4/3] lg:aspect-[5/6] rounded-card overflow-hidden shadow-card">
            <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            {eyebrow && <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">{eyebrow}</p>}
            <h2 className="font-serif text-section text-navy mb-5 leading-tight">{title}</h2>
            <div className="prose-longform text-ink/85 text-base leading-relaxed">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
