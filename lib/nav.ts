/**
 * Central navigation registry.
 * Shared by Header, MobileMenu and Footer so every link lives in one place.
 *
 * Add new nav links here — they'll propagate everywhere.
 */
export type NavLink = { label: string; href: string; external?: boolean };
export type NavSection = { title: string; links: NavLink[] };

// Top-of-page primary nav (desktop horizontal, mobile drawer)
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Direct Cremation', href: '/direct-cremation/' },
  { label: 'Funeral Plans',    href: '/funeral-plans/' },
  { label: 'Coverage',         href: '/coverage/' },
  { label: 'Help & Guidance',  href: '/help/' },
];

// Footer sitemap — designed for maximum SEO coverage and user navigation.
// 5-column grid on desktop, split at lg. Every section is a self-contained
// theme so users can scan by intent rather than by document type.
export const FOOTER_SECTIONS: NavSection[] = [
  {
    title: 'Direct Cremation',
    links: [
      { label: 'What is a direct cremation?',     href: '/direct-cremation/' },
      { label: 'How direct cremation works',      href: '/help/how-direct-cremation-works/' },
      { label: 'What’s included',                 href: '/help/whats-included/' },
      { label: 'Direct cremation cost',           href: '/cost/' },
      { label: 'Cost calculator',                 href: '/cost-calculator/' },
      { label: 'Direct cremation near me',        href: '/near-me/' },
      { label: 'Compare us vs other providers',   href: '/compare/' },
    ],
  },
  {
    title: 'Popular Cities',
    links: [
      { label: 'London',            href: '/london/' },
      { label: 'Manchester',        href: '/manchester/' },
      { label: 'Birmingham',        href: '/west-midlands/' },
      { label: 'Liverpool',         href: '/merseyside/' },
      { label: 'Leeds',             href: '/west-yorkshire/' },
      { label: 'Sheffield',         href: '/south-yorkshire/' },
      { label: 'Bristol',           href: '/bristol/' },
      { label: 'Nottingham',        href: '/nottinghamshire/' },
      { label: 'Newcastle',         href: '/tyne-and-wear/' },
      { label: 'Southampton',       href: '/hampshire/' },
      { label: 'Cardiff',           href: '/cardiff/' },
      { label: 'Edinburgh',         href: '/edinburgh/' },
      { label: 'Glasgow',           href: '/glasgow/' },
      { label: 'Belfast',           href: '/county-antrim/' },
      { label: 'Brighton',          href: '/east-sussex/' },
      { label: 'Reading',           href: '/berkshire/' },
      { label: 'See every UK county →', href: '/coverage/' },
    ],
  },
  {
    title: 'Locations & Directories',
    links: [
      { label: 'All UK coverage — every county',   href: '/coverage/' },
      { label: 'UK crematoria directory',          href: '/crematoria/' },
      { label: 'UK register offices',              href: '/register-offices/' },
      { label: 'Partner funeral directors',        href: '/providers/' },
      { label: 'England',                          href: '/coverage/#england' },
      { label: 'Wales',                            href: '/coverage/#wales' },
      { label: 'Scotland',                         href: '/coverage/#scotland' },
      { label: 'Northern Ireland',                 href: '/coverage/#northern-ireland' },
    ],
  },
  {
    title: 'Funeral Plans',
    links: [
      { label: 'Funeral plans overview',           href: '/funeral-plans/' },
      { label: 'Direct cremation plans',           href: '/funeral-plans/direct-cremation/' },
      { label: 'Attended cremation plans',         href: '/funeral-plans/attended-cremation/' },
      { label: 'Plan cost guide',                  href: '/funeral-plans/cost/' },
      { label: 'Plan vs life insurance',           href: '/funeral-plans/vs-life-insurance/' },
      { label: 'FCA-regulated plans explained',    href: '/funeral-plans/fca-regulated/' },
      { label: 'Compare plan providers',           href: '/funeral-plans/compare/' },
      { label: 'See all funeral plan guides →',    href: '/funeral-plans/' },
    ],
  },
  {
    title: 'Help & Guidance',
    links: [
      { label: 'What to do when someone dies',     href: '/help/what-to-do-when-someone-dies/' },
      { label: 'Cost of a funeral',                href: '/help/cost-of-a-funeral/' },
      { label: 'Cremation vs burial',              href: '/help/cremation-vs-burial/' },
      { label: 'How to write a eulogy',            href: '/help/how-to-write-a-eulogy/' },
      { label: 'Bereavement support',              href: '/help/bereavement-support/' },
      { label: 'Probate & estate',                 href: '/help/probate-and-estate/' },
      { label: 'Writing a will',                   href: '/help/writing-a-will/' },
      { label: 'See all help articles →',          href: '/help/' },
      { label: 'Funeral terms glossary',           href: '/glossary/' },
      { label: 'Printable checklists (PDF)',       href: '/resources/' },
    ],
  },
];

// Bottom-row links (legal + company)
export const COMPANY_LINKS: NavLink[] = [
  { label: 'About us',         href: '/about/' },
  { label: 'Contact us',       href: '/contact/' },
  { label: 'Partner with us',  href: '/partner-with-us/' },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Website Terms',  href: '/terms-and-conditions/' },
  { label: 'Service Terms',  href: '/service-terms-and-conditions/' },
  { label: 'CMA Standardised Price List', href: 'https://bestdirectcremation.co.uk/wp-content/uploads/2026/05/Standardised-Price-List-2.pdf', external: true },
];

export const SOCIAL_LINKS = {
  facebook:  'http://www.facebook.com/bestfuneral',
  instagram: 'https://www.instagram.com/bestfunerals/',
};
