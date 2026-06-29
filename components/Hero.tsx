import { ReactNode } from 'react';
import Container from './Container';
import PhoneCTA from './PhoneCTA';
import { SITE } from '@/lib/site';

export default function Hero({
  eyebrow, title, subtitle, showCTA = true,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  showCTA?: boolean;
}) {
  return (
    <section className="bg-cream border-b border-stone">
      <Container className="py-14 md:py-20 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow && <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">{eyebrow}</p>}
          <h1 className="font-serif font-medium text-navy text-hero leading-tight mb-4">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl text-ink/80 leading-relaxed mb-8 max-w-2xl">{subtitle}</p>}
          {showCTA && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <PhoneCTA size="lg" variant="gold" showSubtext />
              <p className="text-sm italic text-ink/60">{SITE.strapline}</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
