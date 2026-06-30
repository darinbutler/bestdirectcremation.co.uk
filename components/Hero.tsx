import { ReactNode } from 'react';
import Image from 'next/image';
import Container from './Container';
import PhoneCTA from './PhoneCTA';
import { SITE } from '@/lib/site';
import { IMG } from '@/lib/images';

/**
 * Hero — large background photo with cream overlay card.
 * Matches the live bestdirectcremation.co.uk treatment exactly.
 */
export default function Hero({
  eyebrow, title, subtitle, showCTA = true, background = true,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  showCTA?: boolean;
  background?: boolean;
}) {
  return (
    <section className="relative bg-cream">
      {background && (
        <div className="absolute inset-0 z-0">
          <Image
            src={IMG.heroBackground}
            alt=""
            fill
            priority
            // Mobile crops aggressively to where the people are (right of frame);
            // desktop centres the full crematorium scene.
            className="object-cover object-[68%_center] md:object-center"
            sizes="100vw"
          />
        </div>
      )}
      <Container className="relative z-10 py-5 md:py-10 lg:py-16">
        <div className="max-w-xl md:max-w-2xl bg-cream/95 backdrop-blur-sm rounded-2xl p-5 md:p-9 shadow-lift">
          {eyebrow && (
            <p className="text-base md:text-lg font-bold text-green mb-3 md:mb-4">{eyebrow}</p>
          )}
          <h1 className="font-serif font-normal text-gold leading-[1.1] tracking-tight text-[clamp(1.5rem,5.2vw,3rem)] mb-3 md:mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm md:text-base text-ink/85 leading-relaxed mb-4 md:mb-5 max-w-lg">
              {subtitle}
            </p>
          )}
          {showCTA && (
            <div className="flex flex-col items-start gap-1.5">
              <PhoneCTA size="md" variant="green" pulse />
              <p className="text-xs md:text-sm italic text-green font-medium">{SITE.promiseSubtext}</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
