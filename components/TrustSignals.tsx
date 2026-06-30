import Container from './Container';

/**
 * Trust signal strip — NAFD + SAIF accreditation, transparent pricing,
 * 24/7 phone. Designed to appear above the fold or just below it on
 * locality pages, comparison pages, and any conversion-critical surface.
 */
export default function TrustSignals() {
  return (
    <section className="bg-cream/60 border-y border-stone">
      <Container className="py-7 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-center">
          {/* NAFD */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green/10 flex items-center justify-center mb-2 md:mb-3">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-serif text-sm md:text-base text-green leading-tight">NAFD &amp; SAIF accredited partners</p>
          </div>
          {/* Local FD */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green/10 flex items-center justify-center mb-2 md:mb-3">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="font-serif text-sm md:text-base text-green leading-tight">Local FD delivery, never centralised</p>
          </div>
          {/* CMA */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green/10 flex items-center justify-center mb-2 md:mb-3">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" />
              </svg>
            </div>
            <p className="font-serif text-sm md:text-base text-green leading-tight">CMA-compliant transparent pricing</p>
          </div>
          {/* 24/7 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green/10 flex items-center justify-center mb-2 md:mb-3">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p className="font-serif text-sm md:text-base text-green leading-tight">Real person, 24 hours a day</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
