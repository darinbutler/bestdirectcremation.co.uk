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
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      )}
      <Container className="relative z-10 py-8 md:py-12 lg:py-16">
        <div className="max-w-xl bg-cream/95 backdrop-blur-sm rounded-2xl p-6 md:p-9 shadow-lift">
          {eyebrow && (
            <p className="text-sm font-semibold text-green mb-3">{eyebrow}</p>
          )}
          <h1 className="font-serif italic font-medium text-gold leading-[1.05] text-[clamp(1.75rem,4.2vw,3rem)] mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm md:text-base text-ink/85 leading-relaxed mb-5 max-w-lg">
              {subtitle}
            </p>
          )}
          {showCTA && (
            <div className="flex flex-col items-start gap-1.5">
              <PhoneCTA size="md" variant="green" />
              <p className="text-xs md:text-sm italic text-green font-medium">{SITE.promiseSubtext}</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
