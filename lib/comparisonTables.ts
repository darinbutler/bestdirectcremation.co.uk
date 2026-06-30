/**
 * Head-to-head comparison data for each /compare/[slug]/ page.
 * Keyed by article slug — kept here so editors don't have to wrestle
 * with structured arrays in Sanity Studio for relatively static data.
 */

export type ComparisonRow = {
  feature: string;
  bdc: string;
  competitor: string;
  bdcWin?: boolean;  // true if BDC has the clearly stronger position
};

export type ComparisonTable = {
  competitorName: string;
  competitorLogoNote?: string; // brief brand context
  rows: ComparisonRow[];
};

export const COMPARISON_TABLES: Record<string, ComparisonTable> = {
  'pure-cremation': {
    competitorName: 'Pure Cremation',
    competitorLogoNote: 'UK\'s largest dedicated direct cremation operator',
    rows: [
      { feature: 'Direct cremation price (lump sum)', bdc: '£1,499 all-inclusive', competitor: '~£1,950', bdcWin: true },
      { feature: 'Priority Care (non-hospital collection)', bdc: '£250 add-on (max total £1,749)', competitor: 'Included in £1,950' },
      { feature: 'Service delivery model', bdc: 'Local independent funeral director', competitor: 'Centralised national operation', bdcWin: true },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary near home', competitor: 'Andover, Hampshire mortuary' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Pure Cremation owned crematoria' },
      { feature: 'Funeral director accreditation', bdc: 'NAFD or SAIF (every partner)', competitor: 'Own staff (no external accreditation required)' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'England + Wales (Scotland/NI expanding)', competitor: 'UK-wide' },
    ],
  },
  'aura': {
    competitorName: 'Aura',
    competitorLogoNote: 'UK direct cremation specialist',
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: '£1,495–£1,795 (regional)' },
      { feature: 'Priority Care fee', bdc: '£250 add-on (max £1,749)', competitor: 'Typically included' },
      { feature: 'Service model', bdc: 'Local independent FD network', competitor: 'Regional infrastructure model' },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary', competitor: 'Aura regional mortuary' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Aura-affiliated crematoria' },
      { feature: 'FD accreditation', bdc: 'NAFD or SAIF', competitor: 'Internal standards' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'Every county England + Wales', competitor: 'Most of England, parts of Wales' },
    ],
  },
  'simplicity-cremations': {
    competitorName: 'Simplicity Cremations',
    competitorLogoNote: 'Part of the Dignity Group',
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: '£1,395–£1,595' },
      { feature: 'Priority Care fee', bdc: '£250 add-on (max £1,749)', competitor: 'Varies — check at quote' },
      { feature: 'Corporate structure', bdc: 'Independent', competitor: 'Owned by Dignity Group (restructured 2022-23)' },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary', competitor: 'Dignity Group infrastructure' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Often Dignity-owned crematoria' },
      { feature: 'FD accreditation', bdc: 'NAFD or SAIF', competitor: 'Dignity internal' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'England + Wales', competitor: 'UK-wide (subject to Dignity coverage)' },
    ],
  },
  'co-op-funeralcare': {
    competitorName: 'Co-op Funeralcare',
    competitorLogoNote: 'Part of the Co-operative Group',
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: '~£1,995', bdcWin: true },
      { feature: 'Service model', bdc: 'Local independent FD network', competitor: 'Co-op-branded national branches' },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary near home', competitor: 'Co-op branch mortuary' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Closest local crematorium (Co-op does not own crematoria)' },
      { feature: 'FD accreditation', bdc: 'NAFD or SAIF (every partner)', competitor: 'Co-op internal standards' },
      { feature: 'Brand recognition', bdc: 'Newer brand, local FD reputation', competitor: 'Strong national brand (Co-operative Group)' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'England + Wales', competitor: 'UK-wide' },
    ],
  },
  'dignity': {
    competitorName: 'Dignity',
    competitorLogoNote: 'UK\'s largest crematorium owner (~45+ facilities)',
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: '~£2,200', bdcWin: true },
      { feature: 'Service model', bdc: 'Local independent FD network', competitor: 'Vertically integrated (Dignity owns FD + crematoria)' },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary near home', competitor: 'Dignity-owned infrastructure' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Almost always a Dignity-owned crematorium' },
      { feature: 'Corporate context', bdc: 'Independent', competitor: 'Delisted from LSE in 2023; now privately held' },
      { feature: 'FD accreditation', bdc: 'NAFD or SAIF', competitor: 'Dignity internal' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'England + Wales', competitor: 'UK-wide' },
    ],
  },
  'cremation-direct': {
    competitorName: 'Cremation Direct',
    competitorLogoNote: 'UK direct cremation specialist',
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive (national)', competitor: '£1,300–£1,500 (regional)' },
      { feature: 'Priority Care fee', bdc: '£250 add-on (max £1,749)', competitor: 'Varies by region — check' },
      { feature: 'Service model', bdc: 'Local independent FD network', competitor: 'Local FD partnerships' },
      { feature: 'Pricing consistency', bdc: 'Same £1,499 nationwide', competitor: 'Varies by region' },
      { feature: 'FD accreditation', bdc: 'NAFD or SAIF', competitor: 'Varies by partner FD' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'Every county England + Wales', competitor: 'Regional, growing' },
    ],
  },
  'memoria': {
    competitorName: 'Memoria',
    competitorLogoNote: 'UK funeral & crematorium group',
    rows: [
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: '£1,500–£1,800' },
      { feature: 'Service model', bdc: 'Local independent FD network', competitor: 'Owns crematorium infrastructure' },
      { feature: 'Where loved one is cared for', bdc: 'Local FD\'s mortuary near home', competitor: 'Memoria-affiliated facility' },
      { feature: 'Crematorium used', bdc: 'Closest local crematorium', competitor: 'Memoria-owned crematorium' },
      { feature: 'FD accreditation', bdc: 'NAFD or SAIF', competitor: 'Internal Memoria standards' },
      { feature: 'Pricing consistency', bdc: 'Same £1,499 nationwide', competitor: 'Regional variation' },
      { feature: '24/7 real-person phone', bdc: 'Yes — 0333 242 1405', competitor: 'Yes' },
      { feature: 'Coverage', bdc: 'Every county England + Wales', competitor: 'Where Memoria has crematoria' },
    ],
  },
  'compare-the-funeral': {
    competitorName: 'Compare the Funeral',
    competitorLogoNote: 'UK funeral comparison platform (aggregator)',
    rows: [
      { feature: 'What it is', bdc: 'Direct cremation provider', competitor: 'Comparison/quote aggregator' },
      { feature: 'Direct cremation price', bdc: '£1,499 all-inclusive', competitor: 'Varies — quotes from different FDs' },
      { feature: 'Single price you can rely on?', bdc: 'Yes — same £1,499 nationwide', competitor: 'No — depends on FD selected' },
      { feature: 'Single point of contact', bdc: 'Yes — 0333 242 1405', competitor: 'No — you contract with a chosen FD directly' },
      { feature: 'Vetted FD partners', bdc: 'NAFD or SAIF accredited', competitor: 'Varies — research each FD yourself' },
      { feature: 'End-to-end managed service', bdc: 'Yes', competitor: 'No — you manage the FD relationship' },
      { feature: 'Time investment', bdc: 'Single call', competitor: 'Compare multiple quotes, evaluate, choose' },
      { feature: 'Best for', bdc: 'Direct cremation specifically', competitor: 'Traditional funerals where prices vary widely' },
    ],
  },
};
