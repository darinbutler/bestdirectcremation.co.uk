import { SITE } from '@/lib/site';

type Variant = 'green' | 'gold' | 'invert' | 'sage';
type Size = 'sm' | 'md' | 'lg';

const variantStyles: Record<Variant, string> = {
  green:  'bg-green text-white hover:bg-green-dark',
  gold:   'bg-gold text-white hover:bg-gold-dark',
  invert: 'bg-white text-green hover:bg-cream',
  sage:   'bg-sage-700 text-white hover:bg-sage-800',
};
const iconPulseRingColor: Record<Variant, string> = {
  green:  'bg-white/60',     // on a green button — soft white ring
  gold:   'bg-white/60',     // on a gold button — soft white ring
  invert: 'bg-green/50',     // on a white button — soft green ring
  sage:   'bg-white/60',
};
const sizeStyles: Record<Size, string> = {
  sm: 'text-sm px-4 py-2 rounded-full gap-2',
  md: 'text-base px-6 py-3 rounded-full gap-2',
  lg: 'text-lg md:text-xl px-8 py-4 rounded-full gap-3 shadow-lift',
};

export default function PhoneCTA({
  size = 'md', variant = 'green', showSubtext = false, pulse = false,
}: { size?: Size; variant?: Variant; showSubtext?: boolean; pulse?: boolean }) {
  return (
    <div className="inline-flex flex-col items-start gap-2">
      <a
        href={SITE.phoneHref}
        aria-label={`Call Best Direct Cremation on ${SITE.phone}, 24 hours a day`}
        className={`relative inline-flex items-center font-semibold tracking-wide transition ${variantStyles[variant]} ${sizeStyles[size]}`}
      >
        {/* Phone icon — wrapped so we can pulse a soft ring just around the icon, mobile only */}
        <span className="relative inline-flex items-center justify-center">
          {pulse && (
            <span
              aria-hidden="true"
              className={`md:hidden absolute inset-[-6px] rounded-full ${iconPulseRingColor[variant]} animate-pulse-ring opacity-70 motion-reduce:hidden`}
            />
          )}
          <svg className="relative w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
        {SITE.phone}
      </a>
      {showSubtext && (
        <span className="text-xs md:text-sm italic text-green/80 px-1 font-medium">{SITE.promiseSubtext}</span>
      )}
    </div>
  );
}
