import { SITE } from '@/lib/site';

type Variant = 'gold' | 'invert' | 'sage';
type Size = 'sm' | 'md' | 'lg';

const variantStyles: Record<Variant, string> = {
  gold:   'bg-gold text-white hover:bg-gold-dark',
  invert: 'bg-white text-navy hover:bg-cream',
  sage:   'bg-sage-700 text-white hover:bg-sage-800',
};
const sizeStyles: Record<Size, string> = {
  sm: 'text-sm px-4 py-2 rounded-md gap-2',
  md: 'text-base px-5 py-2.5 rounded-md gap-2',
  lg: 'text-lg md:text-xl px-7 py-3.5 rounded-lg gap-3 shadow-lift',
};

export default function PhoneCTA({
  size = 'md', variant = 'gold', showSubtext = false, pulse = false,
}: { size?: Size; variant?: Variant; showSubtext?: boolean; pulse?: boolean }) {
  return (
    <div className="inline-flex flex-col items-start gap-2">
      <a
        href={SITE.phoneHref}
        aria-label={`Call Best Direct Cremation on ${SITE.phone}, 24 hours a day`}
        className={`inline-flex items-center font-semibold tracking-wide transition ${variantStyles[variant]} ${sizeStyles[size]} ${pulse ? 'animate-pulse-slow' : ''}`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        {SITE.phone}
      </a>
      {showSubtext && (
        <span className="text-xs md:text-sm italic text-ink/70 px-1">{SITE.promiseSubtext}</span>
      )}
    </div>
  );
}
