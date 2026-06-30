/**
 * Head-to-head comparison data for each /compare/[slug]/ page.
 * Keyed by article slug.
 *
 * Pricing data verified via Apify/web scrape June 2026 — recheck quarterly.
 * BDC price: £1,499 (max £1,749 with Priority Care).
 */

export type ComparisonRow = {
  feature: string;
  bdc: string;
  competitor: string;
  bdcWin?: boolean;
};

export type ComparisonTable = {
  competitorName: string;
  competitorLogoNote?: string;
  // Price differential card — drives the hero visual
  pricing: {
    bdcPrice: number;          // £1499
    bdcLabel: string;          // "£1,499 all-inclusive"
    competitorPrice: number;   // £2000
    competitorLabel: string;   // "£2,000"
    savings: number;           // £501
    savingsContext: string;    // "for the same direct cremation service"
  };
  // Local vs centralised module
  bdcModel: {
    headline: string;          // "Local funeral director"
    distance: string;          // "~10 miles from home, typical"
    careLocation: string;      // "Local FD's own mortuary, near family"
    benefits: string[];        // 3 short bullets
  };
  competitorModel: {
    headline: string;          // "Centralised national operation"
    distance: string;          // "Up to 200+ miles to central mortuary"
    careLocation: string;      // "Andover, Hampshire"
    drawbacks: string[];       // 3 short bullets
  };
  rows: ComparisonRow[];
};

export const COMPARISON_TABLES: Record<string, ComparisonTable> = {
  'pure-cremation': {
    competitorName: 'Pure Cremation',
    competitorLogoNote: 'UK\'s largest dedicated direct cremation operator',
    pricing: {
      bdcPrice: 1499,
      bdcLabel: '£1,499 all-inclusive',
      competitorPrice: 2000,
      competitorLabel: '£2,000',
      savings: 501,
      savingsContext: 'Save £501 — for a more personal, locally-delivered service',
    },
    bdcModel: {
      headline: 'Your local independent funeral director',
      distance: 'Typically within 10–15 miles of home',
      careLocation: 'Local FD\'s own mortuary, near family',
      benefits: [
        'NAFD or SAIF accredited',
        'Cremation at the closest local crematorium',
        'A real local funeral professional accountable to your community',
      ],
    },
    competitorModel: {
      headline: 'National operator with their own crematoria network',
      distance: 'Often transported significant distance from where they rest',
      careLocation: 'A Pure-operated facility — chosen by them, not the closest',
      drawbacks: [
        'Cremation at a Pure-operated crematorium, not necessarily the nearest to home',
        'Your loved one is still moved a significant distance from where they died',
        'No local funeral director relationship in your community',
      ],
    },
    rows: [
      { feature: 'Direct cremation price (lump sum)', bdc: '£1,499 all-inclusive', competitor: '£2,000', bdcWin: true },
      { feature: 'Priority Care (non-hospital collection)', bdc: '£250 add-on (max total £1,749)', competitor: 'Included' },
      { feature: 'Service delivery model', bdc: 'Local independent funeral director', competitor: 'Centralised national operation', bdcWin: true },
      { feature: 'Where your loved one is cared for', bdc: 'Local FD\'s mortuary near home', competitor: 'Andover, Hampshire mortuary' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Pure Cremation owned crematoria' },
      { feature: 'Funeral director accreditation', bdc: 'NAFD or SAIF (every partner)', competitor: 'Own staff (no external accreditation required)' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'England + Wales (Scotland/NI expanding)', competitor: 'UK-wide' },
    ],
  },

  'aura': {
    competitorName: 'Aura',
    competitorLogoNote: 'UK direct cremation specialist',
    pricing: {
      bdcPrice: 1499, bdcLabel: '£1,499 all-inclusive',
      competitorPrice: 1745, competitorLabel: '£1,745 (typical)',
      savings: 246, savingsContext: 'Save up to £246 with the same standards of care',
    },
    bdcModel: {
      headline: 'Your local independent funeral director',
      distance: 'Typically within 10–15 miles of home',
      careLocation: 'Local FD\'s own mortuary',
      benefits: [
        'NAFD or SAIF accredited',
        'Cremation at the closest local crematorium',
        'Real local funeral director accountable to your community',
      ],
    },
    competitorModel: {
      headline: 'Regional operator network',
      distance: 'Often transported significant distance from where they rest',
      careLocation: 'An Aura-affiliated facility, chosen by them',
      drawbacks: [
        'Cared for at a regional Aura mortuary, not your local funeral director',
        'Cremation at an Aura-affiliated crematorium — not necessarily the nearest',
        'No local funeral director relationship in your community',
      ],
    },
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: '£1,495–£1,795 (regional)' },
      { feature: 'Priority Care fee', bdc: '£250 add-on (max £1,749)', competitor: 'Typically included' },
      { feature: 'Service model', bdc: 'Local independent funeral director network', competitor: 'Regional infrastructure', bdcWin: true },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary', competitor: 'Aura regional mortuary' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Aura-affiliated' },
      { feature: 'Funeral director accreditation', bdc: 'NAFD or SAIF', competitor: 'Internal standards' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'Every county England + Wales', competitor: 'Most of England, parts of Wales' },
    ],
  },

  'simplicity-cremations': {
    competitorName: 'Simplicity Cremations',
    competitorLogoNote: 'Part of the Dignity Group',
    pricing: {
      bdcPrice: 1499, bdcLabel: '£1,499 all-inclusive',
      competitorPrice: 1495, competitorLabel: '£1,495–£1,595',
      savings: 0, savingsContext: 'Similar headline — but Best Direct Cremation is independent, never part of a larger group',
    },
    bdcModel: {
      headline: 'Independent — your local funeral director',
      distance: 'Typically within 10–15 miles of home',
      careLocation: 'Local FD\'s own mortuary',
      benefits: [
        'Fully independent operator',
        'NAFD or SAIF accredited partner funeral directors',
        'Closest local crematorium',
      ],
    },
    competitorModel: {
      headline: 'Part of the Dignity Group',
      distance: 'Routed to Dignity-affiliated facilities',
      careLocation: 'A Dignity Group facility, chosen by them',
      drawbacks: [
        'Owned by Dignity Group (restructured 2022–23)',
        'Cremation at a Dignity-owned crematorium, not necessarily the nearest',
        'Your loved one moved within the Dignity network, not to a local funeral director',
      ],
    },
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: '£1,395–£1,595' },
      { feature: 'Priority Care fee', bdc: '£250 add-on (max £1,749)', competitor: 'Varies — check at quote' },
      { feature: 'Corporate structure', bdc: 'Independent', competitor: 'Owned by Dignity Group', bdcWin: true },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary', competitor: 'Dignity Group infrastructure' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Often Dignity-owned crematoria' },
      { feature: 'Funeral director accreditation', bdc: 'NAFD or SAIF', competitor: 'Dignity internal' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'England + Wales', competitor: 'UK-wide' },
    ],
  },

  'co-op-funeralcare': {
    competitorName: 'Co-op Funeralcare',
    competitorLogoNote: 'Part of the Co-operative Group',
    pricing: {
      bdcPrice: 1499, bdcLabel: '£1,499 all-inclusive',
      competitorPrice: 1995, competitorLabel: '£1,995',
      savings: 496, savingsContext: 'Save £496 — local funeral director delivery versus Co-op branded branches',
    },
    bdcModel: {
      headline: 'Your local independent funeral director',
      distance: 'Typically within 10–15 miles of home',
      careLocation: 'Local FD\'s own mortuary',
      benefits: [
        'Independent, NAFD or SAIF accredited FD',
        'Closest local crematorium',
        'Locally-rooted funeral professional',
      ],
    },
    competitorModel: {
      headline: 'Co-op branded national chain',
      distance: 'Routed to a Co-op branch — possibly some distance away',
      careLocation: 'A Co-op branch mortuary, chosen by them',
      drawbacks: [
        'Co-op employee, not an independent local funeral director',
        'Branch may not be the nearest funeral director to home',
        'Pricing reflects national chain overhead',
      ],
    },
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: '£1,995', bdcWin: true },
      { feature: 'Service model', bdc: 'Local independent funeral director network', competitor: 'Co-op-branded national branches' },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary near home', competitor: 'Co-op branch mortuary' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Closest local crematorium (Co-op does not own crematoria)' },
      { feature: 'Funeral director accreditation', bdc: 'NAFD or SAIF (every partner)', competitor: 'Co-op internal standards' },
      { feature: 'Brand recognition', bdc: 'Newer brand, local funeral director reputation', competitor: 'Strong national brand' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'England + Wales', competitor: 'UK-wide' },
    ],
  },

  'dignity': {
    competitorName: 'Dignity',
    competitorLogoNote: 'UK\'s largest crematorium owner (~45+ facilities)',
    pricing: {
      bdcPrice: 1499, bdcLabel: '£1,499 all-inclusive',
      competitorPrice: 2200, competitorLabel: '£2,200',
      savings: 701, savingsContext: 'Save £701 — and use the closest crematorium, not a Dignity-owned one',
    },
    bdcModel: {
      headline: 'Your local independent funeral director',
      distance: 'Typically within 10–15 miles of home',
      careLocation: 'Local FD\'s own mortuary',
      benefits: [
        'Independent FD, NAFD or SAIF accredited',
        'Closest local crematorium (not Dignity-owned)',
        'Local accountability',
      ],
    },
    competitorModel: {
      headline: 'Vertically integrated funeral group',
      distance: 'Routed to a Dignity-owned crematorium (45+ in the UK)',
      careLocation: 'Dignity infrastructure end-to-end',
      drawbacks: [
        'FD, mortuary AND crematorium all Dignity-owned',
        'Cremation at a Dignity crematorium — often not the nearest to home',
        'Recently restructured (delisted from LSE 2023)',
      ],
    },
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: '£2,200', bdcWin: true },
      { feature: 'Service model', bdc: 'Local independent funeral director network', competitor: 'Vertically integrated (funeral director + crematoria)' },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary near home', competitor: 'Dignity-owned infrastructure' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Almost always Dignity-owned' },
      { feature: 'Corporate context', bdc: 'Independent', competitor: 'Delisted from LSE 2023' },
      { feature: 'Funeral director accreditation', bdc: 'NAFD or SAIF', competitor: 'Dignity internal' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'England + Wales', competitor: 'UK-wide' },
    ],
  },

  'cremation-direct': {
    competitorName: 'Cremation Direct',
    competitorLogoNote: 'UK direct cremation specialist',
    pricing: {
      bdcPrice: 1499, bdcLabel: '£1,499 (nationwide)',
      competitorPrice: 1400, competitorLabel: '£1,300–£1,500',
      savings: 0, savingsContext: 'Comparable headline — Best Direct Cremation offers consistent national pricing & vetted funeral directors',
    },
    bdcModel: {
      headline: 'Vetted local independent funeral directors',
      distance: 'Typically within 10–15 miles of home',
      careLocation: 'Local FD\'s own mortuary',
      benefits: [
        'NAFD or SAIF accredited',
        'Same £1,499 price nationwide',
        'Quality vetted by Best Direct Cremation',
      ],
    },
    competitorModel: {
      headline: 'Local funeral director partnerships',
      distance: 'Local FD coverage',
      careLocation: 'Partner FD mortuary',
      drawbacks: [
        'Price varies by region',
        'Vetting standards vary',
        'Regional, not nationwide',
      ],
    },
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive (national)', competitor: '£1,300–£1,500 (regional)' },
      { feature: 'Priority Care fee', bdc: '£250 add-on (max £1,749)', competitor: 'Varies by region' },
      { feature: 'Service model', bdc: 'Local independent funeral director network', competitor: 'Local funeral director partnerships' },
      { feature: 'Pricing consistency', bdc: 'Same £1,499 nationwide', competitor: 'Varies by region', bdcWin: true },
      { feature: 'Funeral director accreditation', bdc: 'NAFD or SAIF', competitor: 'Varies by partner funeral director' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'Every county England + Wales', competitor: 'Regional, growing' },
    ],
  },

  'memoria': {
    competitorName: 'Memoria',
    competitorLogoNote: 'UK funeral & crematorium group',
    pricing: {
      bdcPrice: 1499, bdcLabel: '£1,499 all-inclusive',
      competitorPrice: 1650, competitorLabel: '£1,500–£1,800',
      savings: 151, savingsContext: 'Save up to £151 and avoid Memoria-owned crematorium constraints',
    },
    bdcModel: {
      headline: 'Your local independent funeral director',
      distance: 'Typically within 10–15 miles of home',
      careLocation: 'Local FD\'s own mortuary',
      benefits: [
        'Independent, NAFD or SAIF accredited',
        'Closest local crematorium (any operator)',
        'No commercial alignment between FD and crematorium',
      ],
    },
    competitorModel: {
      headline: 'Owns crematorium infrastructure',
      distance: 'Routed to a Memoria-owned crematorium — not necessarily the nearest',
      careLocation: 'A Memoria-affiliated facility, chosen by them',
      drawbacks: [
        'Cremation at a Memoria-owned crematorium',
        'FD and crematorium commercially aligned (less family choice)',
        'Limited to areas where Memoria operates crematoria',
      ],
    },
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: '£1,500–£1,800', bdcWin: true },
      { feature: 'Service model', bdc: 'Local independent funeral director network', competitor: 'Owns crematorium infrastructure' },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary near home', competitor: 'Memoria-affiliated facility' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Memoria-owned crematorium' },
      { feature: 'Funeral director accreditation', bdc: 'NAFD or SAIF', competitor: 'Internal Memoria standards' },
      { feature: 'Pricing consistency', bdc: 'Same £1,499 nationwide', competitor: 'Regional variation' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'Every county England + Wales', competitor: 'Where Memoria has crematoria' },
    ],
  },

  'compare-the-funeral': {
    competitorName: 'Compare the Funeral',
    competitorLogoNote: 'UK funeral comparison platform (aggregator)',
    pricing: {
      bdcPrice: 1499, bdcLabel: '£1,499 all-inclusive',
      competitorPrice: 1800, competitorLabel: 'Varies (£1,400–£2,500+)',
      savings: 301, savingsContext: 'Single transparent price vs juggling multiple quotes',
    },
    bdcModel: {
      headline: 'One vetted provider, one price, one call',
      distance: 'Typically within 10–15 miles of home',
      careLocation: 'Local FD\'s own mortuary',
      benefits: [
        'Single £1,499 all-inclusive price',
        'NAFD or SAIF accredited FDs we vet',
        'End-to-end managed service',
      ],
    },
    competitorModel: {
      headline: 'Comparison/quote aggregator',
      distance: 'Depends on FD you select',
      careLocation: 'Depends on FD',
      drawbacks: [
        'You evaluate multiple quotes yourself',
        'You contract directly with chosen FD',
        'FD vetting varies — you do due diligence',
      ],
    },
    rows: [
      { feature: 'What it is', bdc: 'Direct cremation provider', competitor: 'Comparison/quote aggregator' },
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: 'Varies — quotes from different FDs' },
      { feature: 'Single price you can rely on?', bdc: 'Yes — same £1,499 nationwide', competitor: 'No — depends on FD selected', bdcWin: true },
      { feature: 'Single point of contact', bdc: 'Yes — 0333 242 1405', competitor: 'No — contract with each FD directly' },
      { feature: 'Vetted FD partners', bdc: 'NAFD or SAIF accredited', competitor: 'Varies — research each FD yourself' },
      { feature: 'End-to-end managed service', bdc: 'Yes', competitor: 'No — you manage the FD relationship' },
      { feature: 'Time investment', bdc: 'Single call', competitor: 'Compare quotes, evaluate, choose' },
      { feature: 'Best for', bdc: 'Direct cremation specifically', competitor: 'Traditional funerals' },
    ],
  },
};
