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
      <Container className="relative z-10 py-12 md:py-20 lg:py-28">
        <div className="max-w-2xl bg-cream/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lift">
          {eyebrow && (
            <p className="text-sm font-semibold text-green mb-4">{eyebrow}</p>
          )}
          <h1 className="font-serif italic font-medium text-gold leading-[1.05] text-[clamp(2rem,5vw,3.75rem)] mb-5">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-ink/85 leading-relaxed mb-7 max-w-xl">
              {subtitle}
            </p>
          )}
          {showCTA && (
            <div className="flex flex-col items-start gap-2">
              <PhoneCTA size="lg" variant="green" />
              <p className="text-sm italic text-green font-medium">{SITE.promiseSubtext}</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
