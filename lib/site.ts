/**
 * SITE constants — phone, price, brand strings.
 * These stay in code, not Sanity — too sensitive to leave editable.
 */
export const SITE = {
  name: 'Best Direct Cremation',
  url: 'https://bestdirectcremation.co.uk', // production domain; preview deploys at *.vercel.app
  phone: '0333 242 1405',
  phoneHref: 'tel:03332421405',
  email: 'care@bestfunerals.co.uk',
  priceLabel: '£1,499',
  priceCeiling: '£1,749',          // with Priority Care
  priorityCare: 250,
  publisher: 'Best Direct Cremation',
  strapline: "Know You're In Great Care",
  promiseSubtext: 'Here whenever you need us — 24 hours a day',
  // Sister brand for full-funeral-service referrals
  bestFuneralsUrl: 'https://bestfunerals.co.uk',
  // Accreditation
  accreditation: ['NAFD', 'SAIF'] as const,
  // Reference UK avg traditional funeral cost (SunLife 2026)
  sunlife2026: '£4,510',
} as const;

export type SiteConstants = typeof SITE;
