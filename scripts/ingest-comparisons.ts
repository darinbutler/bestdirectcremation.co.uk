/**
 * Ingest 8 head-to-head competitor comparison articles into Sanity as
 * articles with section='compare'.
 *
 * Tone: factual and fair (per user direction). Even-handed comparison
 * highlighting genuine structural differences (centralised vs local, FCA
 * status, pricing transparency, accreditation). No unsubstantiated claims.
 *
 * Routes: /compare/[slug]/  (e.g. /compare/pure-cremation/)
 *
 * Usage:  npx tsx scripts/ingest-comparisons.ts
 */
import { createClient } from '@sanity/client';
import { Linkifier } from './lib/linkify';

function enrichBlocks(blocks: any[], slug: string): any[] {
  if (!Array.isArray(blocks)) return blocks;
  const linkifier = new Linkifier({ currentSlug: slug });
  return blocks.map(block => {
    if (block?.style === 'normal' && block?.children?.[0]?.text && (!block.markDefs || block.markDefs.length === 0)) {
      return linkifier.pt(block.children[0].text);
    }
    return block;
  });
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6';
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;
if (!TOKEN) throw new Error('Set SANITY_API_WRITE_TOKEN before running ingestion.');
const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-10-01', useCdn: false, token: TOKEN });

const pt = (text: string) => ({ _type: 'block', style: 'normal', children: [{ _type: 'span', text }], markDefs: [] });
const h2 = (text: string) => ({ _type: 'block', style: 'h2', children: [{ _type: 'span', text }], markDefs: [] });
const h3 = (text: string) => ({ _type: 'block', style: 'h3', children: [{ _type: 'span', text }], markDefs: [] });

type Comp = {
  slug: string;
  title: string;
  competitor: string;
  excerpt: string;
  bodyBlocks: any[];
  faqs: Array<{ q: string; a: string }>;
};

// Standard closing block reused across all comparison pages
const closingBlock = (competitor: string) => [
  h2(`How to make the right choice for your family`),
  pt(`Choosing between ${competitor} and Best Direct Cremation comes down to four practical questions. First, does it matter to you that your loved one stays close to home throughout the process? If yes, choose the provider with the more local delivery model. Second, is price the deciding factor? Compare the all-in price including any Priority Care fees. Third, who is the funeral director who will actually deliver the service? Ask for their name and check their NAFD or SAIF accreditation. Fourth, are you comfortable with the corporate structure and reputation of both providers? Read recent reviews on Trustpilot and Google.`),
  pt(`Both ${competitor} and Best Direct Cremation are professional UK direct cremation providers. The differences are structural rather than quality-based — and the right choice depends on what matters most to your family.`),
  h2('Talk to a real person about your specific situation'),
  pt(`Best Direct Cremation answers 0333 242 1405 24 hours a day, every day — a real person, every call. No high-pressure sales. We'll explain how we'd handle your specific situation and confirm coverage in your area. Call us before deciding — even if you don't choose us, we'd rather help you make the right call than rush you into anything.`),
];

const standardFaqs = [
  { q: 'Is Best Direct Cremation FCA-authorised?', a: 'For prepaid funeral plans, no — Best Direct Cremation does not currently sell prepaid funeral plans. We plan to launch our own direct cremation funeral plans in early 2027 with FCA authorisation. For direct cremation at the time of need (our current service), FCA authorisation is not required.' },
  { q: 'How much does Best Direct Cremation cost?', a: '£1,499 all-inclusive. The only optional cost is a £250 Priority Care collection fee if the person who has died is not at a hospital or coroner\'s mortuary — maximum total £1,749.' },
  { q: 'Where will the cremation take place?', a: 'At a local crematorium near the family. We deliver every cremation through a vetted local independent funeral director — never centralised.' },
  { q: 'Are your partner funeral directors accredited?', a: 'Yes. Every funeral director in our network is NAFD (National Association of Funeral Directors) or SAIF (Society of Allied and Independent Funeral Directors) accredited.' },
];

const COMPARISONS: Comp[] = [
  {
    slug: 'pure-cremation',
    competitor: 'Pure Cremation',
    title: 'Best Direct Cremation vs Pure Cremation — Detailed Comparison 2026',
    excerpt: 'A fair, side-by-side comparison of Best Direct Cremation and Pure Cremation — pricing, service model, coverage, and what fits which family.',
    bodyBlocks: [
      pt(`Pure Cremation is the UK's largest dedicated direct cremation operator. Best Direct Cremation is a smaller, local-FD-network alternative. Both provide professional direct cremation services across the UK — but the way they do it is structurally different. This guide compares them fairly on every dimension that matters.`),
      h2('Quick comparison'),
      pt(`Pure Cremation direct cremation: ~£1,950 lump sum. Centralised model — collection from anywhere in the UK transported to Pure Cremation's mortuary in Andover, Hampshire, then cremated at one of Pure Cremation's owned crematoria. FCA-authorised (for their funeral plans).`),
      pt(`Best Direct Cremation: £1,499 all-inclusive (£250 optional Priority Care for non-hospital collections; maximum £1,749). Local model — collection by a vetted independent funeral director in your area, cared for locally, cremated at a local crematorium. NAFD or SAIF accredited at every partner.`),
      h2('Pricing in detail'),
      pt(`Pure Cremation's headline £1,950 includes the direct cremation service, paperwork and ashes returned. Priority Care collections (the majority — most deaths happen at home or in care homes rather than hospital) are included in the £1,950, which is a transparent pricing strength.`),
      pt(`Best Direct Cremation's £1,499 includes the same scope for hospital and coroner's mortuary collections. The £250 Priority Care add-on covers non-hospital collections. Maximum total £1,749 — still £200 cheaper than Pure Cremation's all-in price when Priority Care is needed.`),
      h2('Service model — centralised vs local'),
      pt(`This is the defining difference. Pure Cremation operates a centralised model: their collection drivers cover the UK from regional bases, your loved one is transported to their dedicated mortuary in Andover, and the cremation takes place at one of Pure Cremation's owned crematoria. This keeps costs lower at scale and ensures consistent quality through their owned infrastructure.`),
      pt(`Best Direct Cremation operates a local model: every cremation is delivered by an independent funeral director in your area. Your loved one stays close to home throughout. The cremation takes place at a local crematorium, often within 10-15 miles of where they lived. The local FD's name, premises and reputation are tied to your community.`),
      h2('Coverage'),
      pt(`Both operate UK-wide. Pure Cremation covers anywhere their collection network reaches. Best Direct Cremation covers every county in England and Wales through our partner FD network, and is expanding into Scotland and Northern Ireland.`),
      h2('Speed and process'),
      pt(`Both providers handle the practical and legal processes professionally. Timeline from death to ashes returned is similar — typically 2-3 weeks. Both answer their phones 24/7 with real people.`),
      h2('Reputation and reviews'),
      pt(`Pure Cremation has thousands of reviews on Trustpilot (typically 4.7-4.9 stars). They are well-established (founded 2014) and have handled high volumes for years. Best Direct Cremation is newer and operates through partner FDs whose individual reputations are well-established locally.`),
      h2('Which is right for which family?'),
      h3('Pure Cremation suits families who:'),
      pt(`Want the largest dedicated operator with the longest track record. Don't mind transportation distance and prefer a single national point of contact. Want the security of a heavily-marketed brand. Are comfortable with their loved one being transported a significant distance from home.`),
      h3('Best Direct Cremation suits families who:'),
      pt(`Want their loved one cared for locally throughout. Want the cremation at a local crematorium — often one that means something to the family. Want a local independent funeral director's personal touch. Want the lowest credible UK price for genuinely local delivery (£1,499 all-inclusive; maximum £1,749).`),
      ...closingBlock('Pure Cremation'),
    ],
    faqs: [
      { q: 'How much cheaper is Best Direct Cremation than Pure Cremation?', a: 'Best Direct Cremation is £451 cheaper for hospital collections (£1,499 vs £1,950) and £201 cheaper for Priority Care collections (£1,749 vs £1,950).' },
      { q: 'Why does Pure Cremation cost more?', a: 'Pure Cremation operates a centralised model with its own dedicated mortuary and owned crematoria. This infrastructure is more expensive to maintain than the partner-FD model.' },
      { q: 'Where will my loved one be cared for if I use Pure Cremation?', a: 'Pure Cremation has a dedicated mortuary in Andover, Hampshire. Your loved one would be transported to this facility regardless of where you live in the UK.' },
      ...standardFaqs,
    ],
  },
  {
    slug: 'aura',
    competitor: 'Aura',
    title: 'Best Direct Cremation vs Aura — Detailed Comparison 2026',
    excerpt: 'A fair side-by-side comparison of Best Direct Cremation and Aura — pricing, service model, and how to choose.',
    bodyBlocks: [
      pt(`Aura is a UK direct cremation provider with a regional model — they operate across most of England and into parts of Wales. Best Direct Cremation is a national local-FD-network operator. Both offer professional direct cremation services. This guide compares them fairly.`),
      h2('Quick comparison'),
      pt(`Aura direct cremation: typically £1,495-£1,795 depending on location and timing. Regional model with their own mortuary network. FCA-authorised for their funeral plans.`),
      pt(`Best Direct Cremation: £1,499 all-inclusive (£250 optional Priority Care; maximum £1,749). Local independent FD network. NAFD or SAIF accredited at every partner.`),
      h2('Pricing transparency'),
      pt(`Aura's pricing is generally clear, with their direct cremation service starting around £1,495. Some regional variation exists. Aura includes Priority Care in most pricing tiers.`),
      pt(`Best Direct Cremation's £1,499 is the same nationwide. Priority Care is a transparent £250 add-on, fully disclosed before commit. Maximum total £1,749.`),
      h2('Service model differences'),
      pt(`Aura operates a regional infrastructure model — owned or contracted mortuary capacity in regions where they operate, and direct partnerships with crematoria. Best Direct Cremation uses a partner-FD network where independent funeral directors in each county handle the local care.`),
      h2('Coverage'),
      pt(`Both serve most of England. Aura's coverage in Scotland and Northern Ireland is limited; Best Direct Cremation is expanding into both. Wales coverage is solid for both.`),
      h2('Reputation'),
      pt(`Aura has a growing Trustpilot presence (typically 4.5-4.8 stars). They are professional, FCA-authorised, and have a clear model. Best Direct Cremation's partner FDs are individually well-established in their local communities.`),
      h2('Which suits which family?'),
      h3('Aura suits families who:'),
      pt(`Want a clear, simply-presented regional provider. Live in their established coverage areas. Prefer a slightly more centralised, brand-consistent experience.`),
      h3('Best Direct Cremation suits families who:'),
      pt(`Want a genuinely local funeral director close to home. Want the most transparent pricing model (£1,499 base; £1,749 maximum). Want a partner FD whose name and reputation they can verify locally.`),
      ...closingBlock('Aura'),
    ],
    faqs: standardFaqs,
  },
  {
    slug: 'simplicity-cremations',
    competitor: 'Simplicity Cremations',
    title: 'Best Direct Cremation vs Simplicity Cremations — 2026 Comparison',
    excerpt: 'A clear comparison of Best Direct Cremation and Simplicity Cremations — pricing, model, and key differences.',
    bodyBlocks: [
      pt(`Simplicity Cremations (part of the Dignity Group) is one of the longer-established UK direct cremation operators. Best Direct Cremation is a more recent, local-FD-network competitor. Both deliver professional direct cremation. This guide is a fair, factual comparison.`),
      h2('Quick comparison'),
      pt(`Simplicity Cremations: typically £1,395-£1,595 depending on location and timing. Operates within the Dignity Group structure, often using Dignity-owned crematoria. Brand-recognised.`),
      pt(`Best Direct Cremation: £1,499 all-inclusive (£250 optional Priority Care; maximum £1,749). Local independent FD network. NAFD or SAIF accredited at every partner.`),
      h2('Corporate structure'),
      pt(`Simplicity Cremations is part of the Dignity Group, a major UK funeral services company. Dignity went through significant restructuring in 2022-2023 (delisting from the London Stock Exchange in 2023). Some customers had questions about the corporate situation during this period; the current entity is FCA-authorised for funeral plans.`),
      pt(`Best Direct Cremation is independent and works with NAFD/SAIF accredited local funeral directors — no parent group dependencies.`),
      h2('Service model'),
      pt(`Simplicity uses Dignity Group infrastructure including Dignity-owned crematoria in many regions. Your loved one may be cremated at a Dignity-owned facility rather than the closest local crematorium. Best Direct Cremation uses the closest local crematorium via the partner FD's existing relationships.`),
      h2('Pricing — same range'),
      pt(`The two providers' headline prices are similar. Simplicity often advertises slightly cheaper (~£1,395-£1,495) but check whether Priority Care is included or extra. Best Direct Cremation's £1,499 + £250 Priority Care (maximum £1,749) is fully transparent.`),
      h2('Which suits which family?'),
      h3('Simplicity suits families who:'),
      pt(`Are comfortable with the Dignity Group infrastructure. Prefer a brand-recognised national operator. Value the predictability of a single corporate parent.`),
      h3('Best Direct Cremation suits families who:'),
      pt(`Want a genuinely local, independent funeral director. Want their loved one cremated at the closest local crematorium. Prefer independence from large funeral groups. Want the most transparent all-in pricing.`),
      ...closingBlock('Simplicity Cremations'),
    ],
    faqs: standardFaqs,
  },
  {
    slug: 'co-op-funeralcare',
    competitor: 'Co-op Funeralcare',
    title: 'Best Direct Cremation vs Co-op Funeralcare — 2026 Comparison',
    excerpt: 'How Best Direct Cremation compares to Co-op Funeralcare for direct cremation — pricing, branches, and choice.',
    bodyBlocks: [
      pt(`Co-op Funeralcare is one of the UK's most recognised funeral providers, with a national network of branches and the brand trust of the Co-operative Group. Best Direct Cremation is a specialist direct cremation operator working through local independent funeral directors. Both deliver direct cremation; the structural differences are significant.`),
      h2('Quick comparison'),
      pt(`Co-op Funeralcare direct cremation: ~£1,995 lump sum. Delivered through Co-op's own branch network (semi-centralised). FCA-authorised for funeral plans. Strong brand recognition through the Co-operative Group.`),
      pt(`Best Direct Cremation: £1,499 all-inclusive (£250 optional Priority Care; maximum £1,749). Local independent FD network. Around £496 cheaper than Co-op for hospital collections and £246 cheaper with Priority Care.`),
      h2('Brand and trust'),
      pt(`Co-op Funeralcare benefits enormously from the Co-operative Group brand, which is one of the most trusted in the UK. For many families, this brand familiarity is itself a major reassurance. Best Direct Cremation doesn't have that brand legacy but works through independent funeral directors who are well-established in their local communities.`),
      h2('Service model'),
      pt(`Co-op uses its own branded branches and staff. The local Co-op funeral director is a Co-op employee. Cremation typically takes place at the closest crematorium (Co-op doesn't own its own crematoria network).`),
      pt(`Best Direct Cremation uses local independent funeral directors — typically family-owned or partnership businesses with their own premises, mortuaries and reputations. Different model, similar outcome.`),
      h2('Price'),
      pt(`Co-op's direct cremation at £1,995 is substantially more than Best Direct Cremation's £1,499. The price difference reflects Co-op's higher overhead structure (national branch network with full-time staff in every location) versus the local independent FD model's lower fixed costs.`),
      h2('Which suits which family?'),
      h3('Co-op Funeralcare suits families who:'),
      pt(`Place high value on the Co-operative Group brand and want a national, well-known operator. Prefer to have a branch to visit in person if needed. Have an existing relationship with a Co-op (member, customer, etc).`),
      h3('Best Direct Cremation suits families who:'),
      pt(`Want the lowest credible price for direct cremation (£1,499). Are comfortable working with a local independent funeral director rather than a national brand. Want to support smaller independent businesses in their community.`),
      ...closingBlock('Co-op Funeralcare'),
    ],
    faqs: standardFaqs,
  },
  {
    slug: 'dignity',
    competitor: 'Dignity',
    title: 'Best Direct Cremation vs Dignity — Direct Cremation Comparison 2026',
    excerpt: 'Comparing Best Direct Cremation with Dignity for direct cremation — model, pricing and recent corporate context.',
    bodyBlocks: [
      pt(`Dignity is one of the UK's longest-established funeral groups and owns the largest portfolio of UK crematoria (~45+ facilities). Best Direct Cremation is a specialist direct cremation operator using local independent funeral directors. Both offer direct cremation. This guide compares them fairly.`),
      h2('Quick comparison'),
      pt(`Dignity direct cremation: ~£2,200 typically. Vertical model — Dignity owns the funeral directors, the crematoria, and the supporting services. FCA-authorised for funeral plans.`),
      pt(`Best Direct Cremation: £1,499 all-inclusive (£250 optional Priority Care; maximum £1,749). Local independent FD network. Around £700 cheaper than Dignity for hospital collections.`),
      h2('Corporate context (important)'),
      pt(`Dignity went through significant restructuring in 2022-2023, including delisting from the London Stock Exchange in 2023. The company is now privately held. Customers should verify the current Dignity entity name on the FCA Register before buying any funeral plan. For at-need direct cremation (not a plan), this is less critical but worth knowing.`),
      h2('Service model — vertical integration'),
      pt(`Dignity owns the entire chain — the funeral director, the hearse, the mortuary, and the crematorium. This means: cremation almost always takes place at a Dignity-owned crematorium rather than the closest local crematorium; the service is consistent and well-controlled; but you may not have a choice of crematorium.`),
      pt(`Best Direct Cremation uses local independent funeral directors who use the closest local crematorium (which may or may not be Dignity-owned, depending on the area). This gives families more flexibility about where the cremation actually takes place.`),
      h2('Price'),
      pt(`Dignity's £2,200 direct cremation price is roughly £700 more than Best Direct Cremation's £1,499. The price difference largely reflects Dignity's vertical integration overhead and brand premium.`),
      h2('Which suits which family?'),
      h3('Dignity suits families who:'),
      pt(`Want a vertically-integrated operator that handles every step in-house. Are comfortable with cremation taking place at a Dignity-owned facility (which may not be the closest crematorium). Place high value on the established corporate brand.`),
      h3('Best Direct Cremation suits families who:'),
      pt(`Want a local independent funeral director, not a corporate chain. Want the cremation at the closest local crematorium. Want a significantly lower price (£1,499 vs ~£2,200).`),
      ...closingBlock('Dignity'),
    ],
    faqs: standardFaqs,
  },
  {
    slug: 'cremation-direct',
    competitor: 'Cremation Direct',
    title: 'Best Direct Cremation vs Cremation Direct — 2026 Comparison',
    excerpt: 'Comparing Best Direct Cremation with Cremation Direct — pricing, coverage and what to ask.',
    bodyBlocks: [
      pt(`Cremation Direct is a UK direct cremation specialist with regional coverage. Best Direct Cremation is a national local-FD-network operator. Both provide direct cremation; both are reasonable choices for many families. This guide compares them fairly.`),
      h2('Quick comparison'),
      pt(`Cremation Direct: typically £1,300-£1,500 lump sum. Regional model, varies by area.`),
      pt(`Best Direct Cremation: £1,499 all-inclusive (£250 optional Priority Care; maximum £1,749). Local independent FD network nationwide.`),
      h2('Pricing'),
      pt(`Cremation Direct can be slightly cheaper headline than Best Direct Cremation, particularly in certain regions. Always check the all-in price including Priority Care for non-hospital collections — this can add £400-£500 with some providers.`),
      h2('Coverage and consistency'),
      pt(`Cremation Direct's coverage and pricing vary by region. Best Direct Cremation's pricing is consistent nationally (£1,499; £1,749 max with Priority Care) and the service is delivered through vetted NAFD/SAIF accredited local funeral directors.`),
      h2('Service model'),
      pt(`Both providers use local funeral directors to deliver the actual service. The difference is structural — how the central operator vets, manages and quality-controls the network of partner FDs.`),
      h2('Which suits which family?'),
      h3('Cremation Direct suits families who:'),
      pt(`Are in a region where Cremation Direct's local pricing is meaningfully cheaper. Have done their due diligence on the specific local FD that will deliver the service.`),
      h3('Best Direct Cremation suits families who:'),
      pt(`Want consistent national pricing and the assurance of a vetted partner FD with NAFD or SAIF accreditation. Want the same transparent all-in price regardless of where they live in the UK.`),
      ...closingBlock('Cremation Direct'),
    ],
    faqs: standardFaqs,
  },
  {
    slug: 'memoria',
    competitor: 'Memoria',
    title: 'Best Direct Cremation vs Memoria — 2026 Comparison',
    excerpt: 'Comparing Best Direct Cremation with Memoria — owned crematoria model vs local funeral director network.',
    bodyBlocks: [
      pt(`Memoria is a UK funeral and crematorium group with significant owned crematorium infrastructure. Best Direct Cremation is a direct cremation specialist using local independent funeral directors. The two have different service models worth understanding before deciding.`),
      h2('Quick comparison'),
      pt(`Memoria direct cremation: typically £1,500-£1,800 depending on region. Owned crematoria model — Memoria has its own crematoria in certain areas which it uses for its direct cremation service.`),
      pt(`Best Direct Cremation: £1,499 all-inclusive (£250 optional Priority Care; maximum £1,749). Local independent FD network using the closest available crematorium.`),
      h2('Owned crematoria — pros and cons'),
      pt(`Memoria owns and operates its own crematoria in certain regions. This gives them direct quality control over the cremation facility itself — and pricing that reflects the fact they don't pay another operator for the crematorium fee. The trade-off: the cremation will take place at a Memoria-owned crematorium, which may or may not be the closest one to your home.`),
      h2('Service model'),
      pt(`Memoria handles the cremation directly at their owned facilities. For collection and the funeral director services, they typically work with local FDs. Best Direct Cremation works exclusively through local FD partners who handle the entire process from collection through cremation at the local crematorium of their choice.`),
      h2('Geographic coverage'),
      pt(`Memoria's owned crematorium network covers parts of the UK but not everywhere. Best Direct Cremation covers every county in England and Wales through partner FDs, and is expanding into Scotland and Northern Ireland.`),
      h2('Which suits which family?'),
      h3('Memoria suits families who:'),
      pt(`Live in an area where Memoria has an owned crematorium and don't mind the cremation taking place there. Want a company that controls the crematorium directly. Are comfortable with a model where the funeral director and crematorium operator are commercially aligned.`),
      h3('Best Direct Cremation suits families who:'),
      pt(`Want a fully local funeral director with personal accountability. Want the cremation at the closest crematorium (which may be a local council-owned or independent facility, not necessarily owned by any large operator). Want consistent national pricing.`),
      ...closingBlock('Memoria'),
    ],
    faqs: standardFaqs,
  },
  {
    slug: 'compare-the-funeral',
    competitor: 'Compare the Funeral',
    title: 'Best Direct Cremation vs Compare the Funeral — Aggregator vs Direct Provider',
    excerpt: 'Compare the Funeral is a comparison site — Best Direct Cremation is a direct provider. Understand the difference before booking.',
    bodyBlocks: [
      pt(`Compare the Funeral is a UK funeral comparison website that allows families to compare quotes from multiple local funeral directors. Best Direct Cremation is a direct provider — we don't aggregate quotes, we deliver the service ourselves through our vetted partner FD network. This guide explains the difference and which fits which family.`),
      h2('Quick comparison'),
      pt(`Compare the Funeral: comparison/aggregation platform. Families enter their requirements; the site returns quotes from multiple local funeral directors. The family then chooses one and contracts directly with them.`),
      pt(`Best Direct Cremation: direct provider. Single price (£1,499 all-inclusive; £250 optional Priority Care), single point of contact, vetted partner FD network. We handle everything end to end.`),
      h2('What you get with a comparison site'),
      pt(`Comparison sites are useful when you want to: see multiple local options side-by-side, compare prices across providers, find a local FD you didn't know about, or get a sense of the price range in your area. They can be especially useful for traditional funerals where prices vary significantly.`),
      h2('Trade-offs with comparison sites'),
      pt(`The trade-off: you do the work of evaluating multiple providers, contracting with one, and managing the process. For direct cremation specifically, where the service is fairly standardised, the value of a comparison site is lower — most credible providers are around £1,400-£2,000 and the service is similar.`),
      h2('What you get with a direct provider'),
      pt(`Best Direct Cremation offers: a single transparent price (£1,499; £1,749 max), a single phone number (0333 242 1405) staffed 24/7, an end-to-end managed service, and the assurance that your loved one will be cared for by a NAFD- or SAIF-accredited local funeral director vetted by us.`),
      h2('Which suits which family?'),
      h3('Compare the Funeral suits families who:'),
      pt(`Want to research multiple options and make an informed comparison. Have time to evaluate quotes and choose. Want a traditional funeral where comparison value is highest.`),
      h3('Best Direct Cremation suits families who:'),
      pt(`Want a single straightforward price, a single point of contact, and don't want to spend time evaluating multiple providers. Want direct cremation specifically (where price variation across credible providers is small).`),
      ...closingBlock('Compare the Funeral'),
    ],
    faqs: standardFaqs,
  },
];

// ============================================================
// INGEST
// ============================================================
async function run() {
  console.log(`Ingesting ${COMPARISONS.length} comparison pages into ${PROJECT_ID}/${DATASET}…`);
  let count = 0;

  for (const c of COMPARISONS) {
    const doc = {
      _type: 'article',
      _id: `compare-${c.slug}`,
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      section: 'compare',
      intent: 'comparison',
      excerpt: c.excerpt,
      body: enrichBlocks(c.bodyBlocks, c.slug),
      faqs: c.faqs.map(f => ({
        _type: 'faq',
        _key: f.q.slice(0, 12).replace(/\s/g, ''),
        question: f.q,
        answer: [pt(f.a)],
      })),
      lastReviewed: new Date().toISOString().split('T')[0],
      seo: {
        metaTitle: c.title,
        metaDescription: c.excerpt,
      },
    };
    await client.createOrReplace(doc);
    count++;
    console.log(`  ✓ /compare/${c.slug}/`);
  }

  console.log(`\nDone. ${count} comparison pages created.`);
}

run().catch(err => { console.error(err); process.exit(1); });
