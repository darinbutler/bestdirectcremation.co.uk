import Container from './Container';
import { ReactNode } from 'react';

/**
 * 4 USP bullets shown immediately below the hero — matching the live BDC site.
 * Gold circular icon backgrounds + deep green serif text.
 */
const PinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const HeartHandIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const UserIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const USPS: { title: string; icon: ReactNode }[] = [
  { title: 'Cared for locally and never driven miles away',     icon: PinIcon },
  { title: 'Delivered by a proper independent funeral director', icon: CheckIcon },
  { title: 'Personal attention and professional mortuary care',  icon: HeartHandIcon },
  { title: 'A real person to talk to, whenever you need us',     icon: UserIcon },
];

export default function UspGrid() {
  return (
    <section className="bg-white">
      <Container className="py-6 md:py-10">
        {/* 2x2 grid on mobile so all 4 USPs peek above the fold, 4-col from lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-5 md:gap-6 lg:gap-8">
          {USPS.map((u, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-2 md:mb-3 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gold flex items-center justify-center text-gold">
                <span className="w-5 h-5 md:w-6 md:h-6 block">{u.icon}</span>
              </div>
              <h3 className="font-serif text-sm md:text-base text-green leading-snug max-w-[14rem] mx-auto">
                {u.title}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
