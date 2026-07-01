/**
 * Ingest Funeral Plans content cluster into Sanity as article documents.
 *
 * Creates ~152 docs:
 *   - 25 cluster articles at /funeral-plans/[slug]/
 *   - 96 county-level FP pages at /funeral-plans/[county]/
 *   - 30 city-level FP pages at /funeral-plans/[city]/
 *
 * Pillar /funeral-plans/ stays as the hardcoded React page (app/funeral-plans/page.tsx).
 * All cluster articles are stored with section: 'funeral-plans' so the
 * /funeral-plans/[slug]/ route picks them up.
 *
 * CRITICAL COMPLIANCE NOTE — all pages must inform, not sell. BDC is not
 * currently FCA-authorised to sell funeral plans (launch planned early 2027).
 * Every page carries the existing disclaimer.
 *
 * Usage:  npx tsx scripts/ingest-funeral-plans.ts
 */
import { createClient } from '@sanity/client';
import { Linkifier } from './lib/linkify';

function enrichBody(bodyBlocks: any[], slug: string): any[] {
  const linkifier = new Linkifier({ currentSlug: slug });
  return bodyBlocks.map(block => {
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
const heading = (text: string) => ({ _type: 'block', style: 'h2', children: [{ _type: 'span', text }], markDefs: [] });

const FCA_DISCLAIMER = pt(`Important: Best Direct Cremation does not currently provide or sell prepaid funeral plans. We plan to launch our own direct cremation funeral plans in early 2027. Until then, always check that your chosen provider is FCA-authorised by searching the official FCA Register at fca.org.uk/register before paying anything.`);

// ============================================================
// CLUSTER ARTICLES (25)
// ============================================================

type Article = { slug: string; title: string; intent: string; excerpt: string; bodyBlocks: any[] };

const CLUSTER: Article[] = [
  {
    slug: 'direct-cremation', intent: 'plan-type',
    title: 'Direct Cremation Funeral Plan — A Complete UK Guide',
    excerpt: 'How a direct cremation funeral plan works in the UK, who it is right for, what to look for in an FCA-regulated provider, and what BDC plans to offer from 2027.',
    bodyBlocks: [
      pt(`A direct cremation funeral plan lets you pay for a simple, unattended cremation in advance — locking in today's price and removing the financial and emotional burden from your family when the time comes. It is the lowest-cost type of prepaid funeral plan, typically costing between £1,400 and £2,200 depending on the provider.`),
      pt(`Direct cremation has become the fastest-growing funeral choice in the UK, and direct cremation funeral plans have grown alongside it. They appeal to people who want to take care of arrangements in advance without committing to the cost or formality of a traditional attended funeral.`),
      heading('What a direct cremation funeral plan covers'),
      pt(`A typical direct cremation plan covers: collection of the deceased (usually 24/7), professional care in a local mortuary, a simple coffin suitable for cremation, all legal paperwork, the cremation itself at a local crematorium, and the return of ashes to the family. There is no service or ceremony at the crematorium.`),
      pt(`What it does not cover: a service or celebration of life, viewing of the deceased, embalming, alternative urns, memorials, headstones, the wake, or anything outside the direct cremation service itself.`),
      heading('Direct cremation plan cost in the UK 2026'),
      pt(`Direct cremation plans typically cost between £1,400 and £2,200 in 2026. The price depends on the provider, payment terms (lump sum vs monthly instalments), and whether the plan includes optional add-ons like a Priority Care collection from a home or hospice. Always compare the all-in price and check what is and is not included before buying.`),
      heading('Is a direct cremation plan right for you?'),
      pt(`Direct cremation plans suit people who want a simple, dignified send-off without the cost or formality of a traditional funeral, and who are happy for any memorial or celebration of life to be planned by the family separately after the cremation. They are not the right choice if you want a service or hymns at the crematorium, viewing of the deceased, or any of the ceremonial elements of a traditional funeral.`),
      heading('What to look for in a provider'),
      pt(`FCA authorisation is non-negotiable. Since July 2022 every UK funeral plan provider must be authorised by the Financial Conduct Authority. Search the official FCA Register at fca.org.uk/register before paying anything. Beyond authorisation, look for: clear all-inclusive pricing, transparent terms about what is and is not covered, a network of local independent funeral directors (not centralised logistics), and Financial Services Compensation Scheme protection.`),
      heading('Best Direct Cremation funeral plans (launching 2027)'),
      pt(`Best Direct Cremation does not currently sell prepaid funeral plans. We plan to launch our own direct cremation funeral plans in early 2027 — delivered through the same network of vetted local independent funeral directors that delivers every Best Direct Cremation today. Sign up to be told the moment we launch by calling 0333 242 1405.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'attended-cremation', intent: 'plan-type',
    title: 'Attended Cremation Funeral Plan — What It Includes',
    excerpt: 'How an attended cremation funeral plan works, the typical UK cost (£2,500–£3,800), and how it differs from a direct cremation plan.',
    bodyBlocks: [
      pt(`An attended cremation funeral plan covers a cremation that family and friends can attend at the crematorium chapel — typically a 20-30 minute service led by a celebrant, with music, readings and a brief committal. It sits between a direct cremation plan and a traditional funeral plan in both cost and ceremony.`),
      heading('What is included'),
      pt(`A typical attended cremation plan includes: collection of the deceased, professional care, a simple-to-mid-range coffin, paperwork, a hearse to transport the coffin to the crematorium, the crematorium chapel booking (typically 20-30 minutes), the cremation, and the return of ashes. Some plans include a celebrant; many do not.`),
      heading('Typical cost'),
      pt(`Attended cremation funeral plans cost between £2,500 and £3,800 in the UK in 2026. That is £1,000-£1,500 more than a direct cremation plan, but several thousand less than a fully traditional funeral plan. Always confirm what is included — some providers count the celebrant, music licensing fee or doctor's certificates as add-ons.`),
      heading('Who should choose this plan'),
      pt(`Attended cremation suits people who want family to gather at the crematorium for a brief, dignified moment of farewell — but who do not want or need the full traditional funeral with limousines, large-scale flowers, an extended service or a wake organised by the funeral director.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'simple', intent: 'plan-type',
    title: 'Simple Funeral Plan UK 2026',
    excerpt: 'What a "simple" funeral plan includes, why providers use the term, and how it compares to direct cremation and attended cremation plans.',
    bodyBlocks: [
      pt(`A "simple funeral plan" is the term most commonly used by Co-op Funeralcare and Dignity for their entry-level attended funeral plans. Despite the name, simple plans are typically attended (family present at the crematorium) and sit at the lower end of the attended-funeral price range, between £2,500 and £3,500 in 2026.`),
      heading('What a simple plan typically includes'),
      pt(`Most simple plans cover: collection within 25 miles of home (during working hours), care of the deceased, a basic coffin, hearse, the funeral director's professional services, and the cremation. They usually do not cover: out-of-hours collection, a viewing, embalming, limousines, flowers, the celebrant, doctor's fees, or anything ceremonial beyond the crematorium booking.`),
      heading('Simple vs Direct Cremation plans'),
      pt(`A direct cremation funeral plan is significantly cheaper (£1,400-£2,200) and removes the crematorium service entirely. A simple plan keeps the family-attended service but strips out most of the ceremonial extras. If price is the priority, direct cremation wins. If a brief moment of farewell at the crematorium matters, simple is the better fit.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'traditional', intent: 'plan-type',
    title: 'Traditional Funeral Plan UK — Full Ceremony Plan',
    excerpt: 'What a traditional funeral plan covers, typical UK cost (£3,800–£5,500), and the difference between attended cremation and full traditional plans.',
    bodyBlocks: [
      pt(`A traditional funeral plan covers a full ceremonial funeral — a hearse and limousine for family, professional pallbearers, a mid-to-higher-range coffin, the funeral director's full services, a celebrant or minister, and the crematorium or burial service. It is the most expensive prepaid funeral plan and represents most of what people imagine when they think "funeral".`),
      heading('Typical cost'),
      pt(`Traditional funeral plans cost between £3,800 and £5,500 in the UK in 2026. The wide range reflects the choice of coffin, the number of limousines, whether burial or cremation is included, and any optional extras like floral tributes, music licensing, or a wake.`),
      heading('Who should choose this plan'),
      pt(`Traditional funeral plans suit people who want the full ceremonial experience for their family — a procession, a service with hymns, a celebrant or minister, and the formal elements that historically defined a UK funeral. Many families value the structure and ritual of a traditional funeral, and a plan locks in today's price ahead of inflation.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'burial', intent: 'plan-type',
    title: 'Burial Funeral Plan UK',
    excerpt: 'What a burial funeral plan covers, plot costs, and why burial plans cost significantly more than cremation plans.',
    bodyBlocks: [
      pt(`A burial funeral plan covers everything needed for an interment funeral — collection of the deceased, professional care, a coffin suitable for burial, a hearse and limousine if required, the funeral director's services, a celebrant, and the burial itself. Crucially, most burial plans do not include the grave plot or interment fee — these are paid separately and have risen sharply in recent years.`),
      heading('Why burial plans cost more'),
      pt(`A burial funeral plan typically costs between £4,500 and £6,500 — more than a traditional cremation plan. This is because burial requires a more substantial coffin, often a longer ceremony, and additional gravedigging and interment services. The plot itself (anywhere from £1,500 to £20,000+ depending on location) is almost always separate from the plan.`),
      heading('What to check before buying'),
      pt(`Burial plans vary widely. Always confirm: whether the plot is included or excluded (almost always excluded), what happens if you move home before death (most plans transfer with you), whether the plan covers green / woodland burial as well as conventional churchyard or cemetery burial, and whether the religious or cultural specifics you need (e.g. a Muslim or Jewish burial) are covered.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'cost', intent: 'cost',
    title: 'How Much Does a Funeral Plan Cost in the UK in 2026?',
    excerpt: 'Funeral plan costs in 2026 — typical prices by plan type, payment options, and what affects the final price.',
    bodyBlocks: [
      pt(`Funeral plan costs in the UK in 2026 range from around £1,400 for the simplest direct cremation plans to £6,500+ for a fully traditional burial plan. The exact price depends on the plan type, the provider, your age, and how you choose to pay.`),
      heading('By plan type'),
      pt(`Direct cremation funeral plan: £1,400-£2,200. Attended cremation / simple plan: £2,500-£3,800. Traditional funeral plan: £3,800-£5,500. Burial plan: £4,500-£6,500 (plot extra). Always compare the all-in price and ask exactly what is included.`),
      heading('Payment options and total cost'),
      pt(`Most providers offer two payment methods: a single lump sum, or monthly instalments over 1-10 years. Monthly payments over more than 12 months will normally add a finance charge — sometimes 10-25% extra over the period. If you can afford a lump sum, you will pay significantly less in total. Some plans also offer a 5- or 10-year fixed instalment period at no extra cost; these are best value.`),
      heading('What affects the price'),
      pt(`Provider (Co-op, Dignity and Golden Charter price differently for similar plans); your age at purchase (some plans restrict instalment options for over-75s); whether instant cover is required if you die early (some plans need 1-2 years of premiums before paying out in full); and any optional add-ons like alternative urns, headstones or memorial services.`),
      heading('Best Direct Cremation funeral plans'),
      pt(`Best Direct Cremation does not currently sell prepaid funeral plans. We are planning to launch our own direct cremation funeral plans in early 2027 with the same all-inclusive, transparent pricing we use for our standard service today.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'vs-life-insurance', intent: 'comparison',
    title: 'Funeral Plan vs Life Insurance — Which Is Better?',
    excerpt: 'Funeral plans versus life insurance / over-50s plans — the differences, when each makes sense, and how to combine them.',
    bodyBlocks: [
      pt(`Funeral plans and life insurance are often confused but they work very differently. A funeral plan is a contract that pays for an actual funeral service at today's prices. A life insurance policy pays a lump sum of cash to your beneficiaries when you die, which they can use however they choose — including for the funeral, but not exclusively for it.`),
      heading('Funeral plan — pros and cons'),
      pt(`Pros: locks in today's funeral price (protecting against inflation), guarantees the services your family will receive, removes decision-making burden from grieving family. Cons: only covers the funeral itself (not the wake, not your other expenses), more limited in what you can change later, requires upfront capital or instalments.`),
      heading('Life insurance — pros and cons'),
      pt(`Pros: pays cash that can be used for anything (funeral, debts, inheritance), often cheaper monthly payments, no requirement to use a specific provider. Cons: the payout is a fixed sum which inflation can erode; over-50s policies often require many years of premiums before they pay out more than you paid in; payouts can be slow to arrive, and your family may need to find funds quickly to actually arrange the funeral.`),
      heading('Can you have both?'),
      pt(`Yes — and many people do. A direct cremation funeral plan can cover the essentials at today's price, while a smaller life insurance policy can cover the wake, memorial, the family's immediate cash needs, or simply leave an inheritance. The combination removes the funeral risk entirely while leaving flexibility for everything else.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'vs-savings', intent: 'comparison',
    title: 'Funeral Plan vs Savings Account — Which Makes More Sense?',
    excerpt: 'Comparing a funeral plan with simply saving the equivalent money — when each makes sense.',
    bodyBlocks: [
      pt(`Some people prefer to set aside the equivalent cost of a funeral in a savings account or ISA rather than commit to a funeral plan. This has clear advantages but also some serious downsides that are worth understanding before you decide.`),
      heading('When savings beat a funeral plan'),
      pt(`Savings give you total flexibility. You can spend the money on anything, change your mind, withdraw at any time, and earn interest. If you are disciplined about not touching it, and the cash is held in a tax-efficient account like an ISA, savings can be the most cost-effective route — particularly if you die many years after setting the money aside.`),
      heading('When a funeral plan beats savings'),
      pt(`A funeral plan beats savings on two counts: inflation protection and execution certainty. Funeral costs have risen by roughly 5% per year over the last decade — faster than most ISA returns. If you set aside £1,499 for a direct cremation today in cash, by the time you die in 15 years that cash may only cover a fraction of the actual cost. A plan locks in today's price for whenever the time comes.`),
      pt(`The execution certainty matters too. When you die, your family needs to arrange the funeral within days. With a plan, they make one phone call. With savings, they need to access the account (which can take weeks if probate is required), choose a funeral director, arrange the service, and manage the finances at the worst possible time emotionally.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'over-50', intent: 'planning',
    title: 'Funeral Plans for Over 50s — A Practical Guide',
    excerpt: 'How funeral plans work for people in their 50s, including instalment options, payment terms and which plans are best.',
    bodyBlocks: [
      pt(`If you are in your 50s and considering a funeral plan, you have more options than most age groups. You can typically pay a lump sum, spread payments over 5, 10 or even 15 years, and choose between every type of plan from direct cremation through to a fully traditional burial. The earlier you commit, the more flexibility you have.`),
      heading('Best plan types for over-50s'),
      pt(`Direct cremation plans are popular with over-50s because they lock in the lowest possible funeral cost while leaving flexibility for the family to plan a personal memorial later. Attended cremation plans suit families who want a brief crematorium service. Traditional plans are right if you want the full ceremonial funeral. Burial plans (with a separate plot purchase) are right if burial is a religious or family preference.`),
      heading('Payment terms to look for'),
      pt(`At age 50-60 you can almost always spread payments over 10+ years without extra finance charges — making monthly costs around £15-£50 depending on plan type. Look for plans with no medical underwriting (most don't require it), flexible cancellation terms, and full FCA Compensation Scheme cover. Avoid plans that lock in a long instalment period AND charge extra for early death — you want one or the other, not both.`),
      heading('Why over-50s consider plans now'),
      pt(`Funeral costs have risen 5%+ annually for over a decade. The £4,510 average UK funeral in 2026 will likely be £7,000+ by 2040. Locking in today's price at 50 protects your family from that inflation — and removes the financial decision-making burden from them at the worst possible time. Many over-50s also use a plan as a way to make their wishes explicit without difficult conversations.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'over-60', intent: 'planning',
    title: 'Funeral Plans for Over 60s — What to Know Before Buying',
    excerpt: 'How funeral plans work for people in their 60s — most plans are still freely available, but check carefully for age-based exclusions and instalment limits.',
    bodyBlocks: [
      pt(`At 60-69 you are still in the prime age range for buying a funeral plan. Almost every UK provider will sell you a plan in this bracket, with full FCA protection, full instalment options up to 10 years, and no medical underwriting. The earlier in this bracket you commit, the more flexibility you have on payment terms.`),
      heading('What changes versus over-50s'),
      pt(`Three things change as you move into your 60s. First, the maximum instalment period some providers offer shortens — many cap monthly plans at 10 years and will not stretch to 15+. Second, monthly premiums are slightly higher because the actuarial risk is greater. Third, some plans add a "first 12 months" exclusion where if you die in the first year you receive a refund rather than a funeral service.`),
      heading('What to look for'),
      pt(`Look for: full FCA Compensation Scheme cover, immediate full benefit (some plans pay the full service from day one regardless of how early you die), all-inclusive pricing with no surprise add-ons (especially Priority Care or out-of-hours collection charges), and the ability to update preferences in future (e.g. if you move home).`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'over-70', intent: 'planning',
    title: 'Funeral Plans for Over 70s — Your Options',
    excerpt: 'How funeral plans work at 70+ — most plans still available, with shorter instalment periods and some specific things to check.',
    bodyBlocks: [
      pt(`Funeral plans remain widely available for people in their 70s. Every major UK provider offers plans up to at least age 75, and many to age 80+. The most common change is that monthly instalment options become more limited — typically capped at 5-7 years rather than 10-15 — so the monthly cost is higher unless you can pay a lump sum.`),
      heading('Most popular plan types for over-70s'),
      pt(`Direct cremation plans are particularly popular in this age bracket because they offer the lowest upfront cost (£1,400-£2,200), don't require medical questions, and remove the financial pressure from the family. Many over-70s combine a direct cremation plan with a small life insurance policy or savings to cover the wake or memorial separately.`),
      heading('What to check'),
      pt(`Be careful with plans that exclude immediate full benefit (some plans only pay out a refund if you die in the first 1-2 years). Some specialist over-70s plans have lower premiums but stricter underwriting — read the small print. Always check whether the plan transfers if you move home or care home.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'over-80', intent: 'planning',
    title: 'Funeral Plans for Over 80s — What is Actually Available',
    excerpt: 'Funeral plans for people aged 80 and over — the options are narrower but still available.',
    bodyBlocks: [
      pt(`Buying a funeral plan at 80+ is more restricted than at younger ages but still possible. Several UK providers will sell plans up to age 85, and some up to 90. Lump sum payment is normally the only option at this age — monthly instalments are not usually available. Premium per year is higher because the actuarial risk is significant.`),
      heading("What's typically available"),
      pt(`Direct cremation plans and simple attended-cremation plans are the most accessible at this age. Some traditional and burial plans become harder to find because providers worry about cost certainty over a short remaining lifespan. Always confirm: full FCA cover, immediate full benefit (no exclusion for early death), and price locked at today's rate regardless of when the plan is activated.`),
      heading('Alternatives to consider'),
      pt(`If a funeral plan is harder to arrange at 80+, two alternatives are worth considering: a guaranteed-acceptance over-50s life insurance policy (which pays a lump sum at death, no medical questions, no age limit); or simply ring-fencing the equivalent amount in a savings account marked specifically for funeral costs. Each has its trade-offs — see our Funeral Plan vs Life Insurance and Funeral Plan vs Savings guides.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'how-to-choose', intent: 'planning',
    title: 'How to Choose the Right Funeral Plan',
    excerpt: 'A practical checklist for choosing an FCA-regulated UK funeral plan that matches your wishes and budget.',
    bodyBlocks: [
      pt(`Choosing the right funeral plan comes down to four questions: what kind of funeral do you want, what can you afford to pay (now or monthly), which provider is genuinely trustworthy, and what flexibility do you need over the years ahead.`),
      heading('1. What kind of funeral do you want?'),
      pt(`Direct cremation — simplest and cheapest, no service at the crematorium. Attended cremation — family present at the crematorium for a brief service. Traditional funeral — full ceremonial funeral with hearse, limousines and a celebrant. Burial — interment rather than cremation. Knowing this answer first narrows the field of plans dramatically.`),
      heading('2. What can you afford to pay?'),
      pt(`Lump sum is always cheapest because finance charges on instalment plans can add 10-25% over a multi-year payment period. If a lump sum is not possible, look for the longest interest-free instalment period the provider offers — typically 1-2 years. Watch for plans that lock you into 10-year instalments at a high implied interest rate.`),
      heading('3. Is the provider FCA-authorised?'),
      pt(`Non-negotiable: every legitimate UK funeral plan provider must be authorised by the Financial Conduct Authority. Check the official FCA Register at fca.org.uk/register before paying anything. If a provider isn't on the Register, walk away. The FCA register also shows whether the firm is fully authorised, restricted, or has conditions on its permissions.`),
      heading('4. What flexibility do you need?'),
      pt(`Will you move home? Most plans transfer with you but check. Will family preferences change? Look for plans that allow you to update your nominated funeral director, choice of music, etc. without changing the underlying plan. Are you happy with the named partner FD? With a direct cremation plan, you can usually nominate or change the FD.`),
      heading('Red flags'),
      pt(`Avoid plans that: are not FCA-authorised (illegal to sell); use a non-FSCS-protected trust structure (your money is at risk if the provider fails); have many additional fees outside the headline price; tie you to a specific FD without recourse; or have unclear cancellation terms.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'fca-regulated', intent: 'legal',
    title: 'FCA-Regulated Funeral Plans Explained',
    excerpt: 'Why the FCA regulates UK funeral plans since 2022, what FCA authorisation actually means, and how to verify a provider.',
    bodyBlocks: [
      pt(`Since 29 July 2022, every UK funeral plan provider has been required to be authorised by the Financial Conduct Authority (FCA). The change was triggered by the collapse of SafeHands Funeral Plans in 2022, which left thousands of customers with worthless plans and exposed serious failings in the pre-FCA self-regulation regime.`),
      heading('What FCA authorisation means'),
      pt(`An FCA-authorised funeral plan provider must: hold customer funds in an FCA-regulated trust or insurance product (not the company's general bank account), have minimum capital adequacy requirements, follow FCA conduct rules including treating customers fairly, provide clear and transparent terms, and be covered by the Financial Services Compensation Scheme (FSCS) so that if the firm fails customers' plans are still honoured.`),
      heading('How to verify a provider'),
      pt(`Search the official FCA Register at fca.org.uk/register. Type in the provider's name. The Register shows: whether they are authorised (full authorisation, restricted, or interim), what permissions they have, who their senior managers are, and whether they have any enforcement actions against them. If a provider isn't on the Register, they cannot legally sell funeral plans in the UK.`),
      heading('What changed for existing customers in 2022'),
      pt(`Some pre-FCA providers chose not to seek authorisation and instead wound down — typically transferring their book of plans to an authorised provider, refunding customers, or in the worst cases (like SafeHands) collapsing entirely. If you bought a plan before July 2022 from a provider that no longer trades, the FCA and Funeral Services Consumer Standards Review have guidance on what to do.`),
      heading('Why this matters for choosing today'),
      pt(`FCA authorisation guarantees three things: your money is held safely (in a regulated trust, not the firm's general account); if the firm fails, the FSCS will honour your plan; and the firm follows conduct rules on selling, transparency and complaints. None of these protections existed before July 2022.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'whats-included', intent: 'planning',
    title: "What's Included in a Funeral Plan?",
    excerpt: 'A detailed breakdown of what funeral plans cover, what they often exclude, and what to confirm before buying.',
    bodyBlocks: [
      pt(`Funeral plans vary widely in what they cover. Even within a single category like "direct cremation", different providers include or exclude different elements. This guide breaks down what is typically included, what is usually extra, and what to check on every plan.`),
      heading('Almost always included'),
      pt(`Collection of the deceased (usually within 25-50 miles of home), professional care of the deceased in a mortuary, a coffin suitable for the plan type, all statutory paperwork and registration support, the funeral director's professional fees, the cremation or burial fee itself, and the return of ashes to the family (if cremation).`),
      heading('Often included, sometimes extra'),
      pt(`Out-of-hours or weekend collection (some plans add a fee), a celebrant or minister (some plans include, some don't), music and music licensing fees, doctor's certificates and medical fees (the "disbursements"), an order of service / order sheet, a hearse and / or limousine for attended plans.`),
      heading('Almost always excluded'),
      pt(`Flowers, the wake or reception venue and catering, headstones or memorials, the burial plot (huge cost — paid separately), an upgraded coffin beyond the plan default, additional limousines for family, embalming (unless specifically included), alternative or decorative urns, and any service held outside the crematorium or burial venue.`),
      heading('What to verify before buying'),
      pt(`Ask the provider: what is the exact maximum mileage for collection? Is out-of-hours included? Is there a Priority Care fee for non-hospital collections? Is the celebrant included? What happens if you die abroad? Can the plan be transferred to another funeral director if you move home? Get every answer in writing.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'payment-options', intent: 'planning',
    title: 'Funeral Plan Payment Options — Lump Sum vs Monthly',
    excerpt: 'Payment options for UK funeral plans — single lump sum, monthly instalments over 1-15 years, and which works out cheapest.',
    bodyBlocks: [
      pt(`UK funeral plan providers offer three main payment options: a single lump sum, monthly instalments over a fixed period (typically 1-15 years), or in some cases an annuity-style premium until death. Each has very different total costs and risks.`),
      heading('Lump sum payment'),
      pt(`Paying the full plan price upfront in one payment is almost always the cheapest total cost. No finance charges, no time risk, and the plan benefits start immediately. If you can afford it, lump sum is the right choice for most people. A direct cremation plan paid lump-sum in 2026 typically costs £1,400-£2,200.`),
      heading('Monthly instalments 1-2 years'),
      pt(`Short instalment periods (1-2 years) are often offered interest-free or at very low cost. This makes them almost as good as lump sum and works well if you want to spread payments over a year or two but don't want the total cost to creep up.`),
      heading('Monthly instalments 5-15 years'),
      pt(`Long instalment periods (5-15 years) make monthly costs very affordable — £15-£50 a month — but the total cost over the period typically adds 10-25% to the headline plan price. This is the "finance charge". The longer the period, the higher the total cost. Always ask for the total cost including all finance charges before agreeing.`),
      heading('What happens if you die during instalments?'),
      pt(`This is the critical question. Some plans pay the full benefit immediately regardless of how many instalments you have made. Others only pay out what you have paid in (a refund) if you die in the first 1-2 years. Some have a hybrid: 50% benefit in year 1, 75% in year 2, full benefit thereafter. Always confirm in writing.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'cancellation', intent: 'planning',
    title: 'Can You Cancel a Funeral Plan?',
    excerpt: 'How cancellation works on UK funeral plans — the 30-day FCA cooling-off period, refund rules and what to expect.',
    bodyBlocks: [
      pt(`Yes, you can cancel a UK funeral plan. The rules and refund amounts depend on when you cancel, which plan you bought, and whether you bought before or after the FCA took over regulation in July 2022.`),
      heading('Within 30 days — FCA cooling-off period'),
      pt(`Under FCA rules, every UK funeral plan comes with a minimum 30-day cooling-off period. If you cancel within 30 days you are entitled to a full refund, less only any minor administrative costs (typically £0-£100, sometimes nothing). This applies to every FCA-authorised provider.`),
      heading('After 30 days but before death'),
      pt(`Cancellation after the cooling-off period is allowed but usually subject to a cancellation fee. The fee varies dramatically by provider — some charge a flat £200-£400 cancellation fee, others apply a percentage. A few providers offer "full refund minus administration costs" for the lifetime of the plan, which is the best terms to look for if flexibility matters.`),
      heading('After paying instalments'),
      pt(`If you cancel partway through an instalment plan, you usually receive a refund of the instalments paid minus the cancellation fee. This often means you lose 5-15% of what you have paid in. The longer the instalment period and the further into it you are, the smaller the proportional loss.`),
      heading('After death'),
      pt(`The plan cannot be "cancelled" once the person has died — it activates and pays out for the funeral. However, if the family wants a different funeral than the plan specifies, most providers allow the plan benefit to be applied as a credit toward a different service through the same funeral director. Ask the funeral director arranging the funeral.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'reviews-guide', intent: 'planning',
    title: 'Funeral Plan Reviews — How to Spot a Trustworthy Provider',
    excerpt: "How to read funeral plan reviews properly — what genuinely matters, what's just noise, and the warning signs to watch for.",
    bodyBlocks: [
      pt(`Funeral plan reviews are a useful but imperfect signal. They tell you about salespeople, customer service and the experience at the moment of death — but they don't tell you whether the underlying plan is good value or properly protected. This guide explains what to read and what to ignore.`),
      heading('What reviews are good for'),
      pt(`Customer service quality, salespeople tactics (high-pressure or honest?), the actual experience family members had at the moment of death, response times, and the quality of the funeral director the plan delivered. These are all things you cannot judge from the brochure but you can learn from real experiences.`),
      heading('What reviews can\'t tell you'),
      pt(`Whether the plan is FCA-authorised (check the Register). Whether the trust holding your money is secure. Whether the headline price is genuinely all-inclusive. Whether the cancellation terms are fair. Whether the provider's financial position is solid. These are all hard, structural questions that customer reviews don't cover.`),
      heading('Red flags in reviews'),
      pt(`Multiple complaints about salespeople pressuring vulnerable customers, complaints about hidden fees emerging at the time of death, complaints about the funeral director quality being inconsistent, and any pattern of complaints around refunds or cancellations being denied. One bad review is just noise; a pattern of similar complaints is signal.`),
      heading('Where to read reviews'),
      pt(`Trustpilot, Feefo and Google Reviews are useful starting points. Always weight recent reviews more heavily — funeral plans companies change. Check the FCA Register at fca.org.uk/register for any enforcement actions. Search "[provider name] complaints" on Google for forum discussions. And read the negative reviews carefully — they often tell you the most.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'how-they-work', intent: 'process',
    title: 'How Do Funeral Plans Work?',
    excerpt: 'Step-by-step: how a UK funeral plan works from buying to activation to delivery.',
    bodyBlocks: [
      pt(`A UK funeral plan is a contract between you, a funeral plan provider, and (usually) a funeral director. You pay for the funeral now — at today's price — and the provider guarantees to deliver those services when the time comes, regardless of how much funeral costs have risen.`),
      heading('Step 1 — Choose and buy a plan'),
      pt(`Decide what kind of funeral you want (direct cremation, attended, traditional, burial). Choose a provider that is FCA-authorised. Decide how to pay (lump sum or instalments). Read the small print on what's included and excluded. Sign and pay.`),
      heading('Step 2 — Your money is held in trust'),
      pt(`When you pay, the money goes into an FCA-regulated trust or insurance product — not the provider's general bank account. This protects your money if the provider fails. The funds grow over time and are invested by trustees to keep pace with funeral cost inflation.`),
      heading('Step 3 — Tell your family'),
      pt(`Make sure whoever will arrange your funeral knows the plan exists. Tell them where the paperwork is kept, the plan number, and the provider's contact details. Some providers offer a "wallet card" or sticker for important documents. This is the most-skipped step and the most important — a plan they can't find is no use to your family.`),
      heading('Step 4 — Activation at the time of need'),
      pt(`When you die, your family (or whoever is arranging the funeral) calls the provider's claims line — typically a 24/7 number. The provider confirms the plan details, contacts the local funeral director, and the funeral is arranged according to the plan's specifications. Your family doesn't need to find money or make commercial decisions.`),
      heading('Step 5 — The funeral takes place'),
      pt(`The funeral director carries out the plan exactly as written. Anything extra requested at the time (additional limousine, extra flowers, etc.) is paid for separately by the family. The plan covers what it covers — no more, no less. The ashes (if cremation) are returned to the family.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'reviews/co-op', intent: 'review',
    title: 'Co-op Funeralcare Funeral Plan Review (2026)',
    excerpt: 'An informational review of the Co-op Funeralcare funeral plan — what it includes, prices, trust structure and what to look out for.',
    bodyBlocks: [
      pt(`Co-op Funeralcare is one of the largest UK funeral plan providers, with FCA authorisation since 2022. The brand benefits from the trust and recognition of the wider Co-operative Group and a national network of branches. This review covers the plan structure, pricing, and what to verify before buying.`),
      heading('Plan types and pricing'),
      pt(`Co-op offers three main plan tiers in 2026: Simple Plan (~£2,800), Bronze Plan (~£3,400), and Silver Plan (~£3,900). Co-op also offers a direct cremation plan at around £1,995. Pricing varies regionally — collection within 25 miles is included; out-of-area collections may incur additional charges.`),
      heading('What is included'),
      pt(`Co-op plans typically include: collection, care of the deceased, a coffin appropriate to plan tier, the hearse, the funeral director's services, the cremation fee, and any third-party fees ("disbursements") that are within the agreed cap. Higher tiers add a limousine, a celebrant, and a more substantial coffin.`),
      heading('Strengths'),
      pt(`Co-op is well-known, well-capitalised, and FCA-authorised. Plans transfer easily if you move. Cancellation terms are reasonable (typically a £300-£400 cancellation fee outside the 30-day cooling-off period). The national branch network means a consistent experience.`),
      heading('Things to check'),
      pt(`Co-op uses its own funeral directors which means the family doesn't choose the local FD. Disbursements (doctor's fees, cremation fees) are typically capped — confirm the cap and whether the family pays the excess if disbursements rise above it. Some Co-op plans include "Special Day" cover; check whether you need this or whether it adds cost.`),
      pt(`This review is informational only. Best Direct Cremation does not currently sell funeral plans — we plan to launch our own in early 2027. Until then, always verify a plan and provider directly with the FCA Register at fca.org.uk/register before buying.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'reviews/dignity', intent: 'review',
    title: 'Dignity Funeral Plan Review (2026)',
    excerpt: 'An informational review of Dignity funeral plans — plan structure, pricing, and what to check before buying.',
    bodyBlocks: [
      pt(`Dignity is one of the longest-established UK funeral plan providers, with a large network of own-branded funeral directors and crematoria. The company has been through significant restructuring in recent years — including delisting from the London Stock Exchange in 2023 — and is now FCA-authorised under its updated corporate structure.`),
      heading('Plan types and pricing'),
      pt(`Dignity offers tiered plans from a basic cremation plan (around £2,200) through to a more comprehensive traditional plan (around £4,500+). Dignity's "Tailored" plans allow you to add specific elements (limousines, flowers, celebrant) to a base plan.`),
      heading('What is included'),
      pt(`Dignity plans typically include: collection (within stated limits), care, coffin appropriate to plan, services of the funeral director, the cremation fee at one of Dignity's 45+ owned crematoria, and a disbursements contribution. Add-ons (hearse, limousines, celebrants) vary by plan tier.`),
      heading('Strengths'),
      pt(`Owns its own crematoria network (so the cremation fee is directly controllable). Long-established brand. Wide range of plan options. FCA-authorised since 2022.`),
      heading('Things to check'),
      pt(`Because Dignity owns crematoria, the cremation will likely take place at one of their own facilities, not necessarily the closest to where the family lives. The 2022-2023 corporate restructuring caused some customers concern; check the current FCA-authorised entity name on the Register before paying. Disbursements caps vary by plan.`),
      pt(`This review is informational only. Best Direct Cremation does not currently sell funeral plans — we plan to launch our own in early 2027. Always verify with the FCA Register at fca.org.uk/register.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'reviews/golden-charter', intent: 'review',
    title: 'Golden Charter Funeral Plan Review (2026)',
    excerpt: 'Golden Charter funeral plans — independent funeral director network, plan structure, and what to verify.',
    bodyBlocks: [
      pt(`Golden Charter is the largest UK funeral plan provider that sells through a network of independent funeral directors, rather than a single corporate-owned chain. Plans are administered centrally by Golden Charter, but delivered locally by NAFD- or SAIF-accredited independent funeral directors. FCA-authorised since 2022.`),
      heading('Plan types and pricing'),
      pt(`Golden Charter offers tiered plans from "Value" (£1,900-£2,500 — a simpler cremation plan) through "Standard" (£2,800-£3,500) to "Premium" (£3,800-£5,500). Direct cremation plans are around £1,700-£2,200. Prices vary by region because they depend on the local independent funeral director's costs.`),
      heading('Strengths'),
      pt(`The independent FD network is the key differentiator — your funeral is delivered by a local funeral director with their own facilities and reputation, rather than a centralised chain. Golden Charter's trust is FCA-regulated and protected.`),
      heading('Things to check'),
      pt(`Different funeral directors in the Golden Charter network charge different prices for similar plans — comparing on price alone can be misleading because what you're really comparing is the local FD's cost base. Ask which specific funeral director will deliver your plan. Confirm cancellation terms and any disbursements cap.`),
      pt(`This review is informational only. Best Direct Cremation does not currently sell funeral plans — we plan to launch our own in early 2027. Always verify on the FCA Register at fca.org.uk/register.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'reviews/pure-cremation', intent: 'review',
    title: 'Pure Cremation Funeral Plan Review (2026)',
    excerpt: 'Pure Cremation funeral plans — direct cremation specialist, pricing, service model and what to check.',
    bodyBlocks: [
      pt(`Pure Cremation is one of the largest UK direct cremation specialists, with FCA authorisation since 2022 and a dedicated direct cremation funeral plan offering. Pure Cremation is also a competitor to Best Direct Cremation — they operate on a centralised model with their own crematoria, where Best Direct Cremation uses a network of vetted local independent funeral directors.`),
      heading('Plan types and pricing'),
      pt(`Pure Cremation's direct cremation funeral plan is typically priced around £1,950-£2,100 (lump sum). Monthly instalments are available over 1, 2 or 3 years. The plan covers the full direct cremation service end to end, with Pure Cremation handling everything from collection through cremation.`),
      heading('Service model — centralised vs local'),
      pt(`This is the key difference vs Best Direct Cremation. Pure Cremation operates a centralised model — they have their own collection drivers, their own mortuary in Andover, Hampshire, and their own crematoria. This keeps their costs lower at scale but means your loved one may be transported a significant distance from home to be cared for and cremated at Pure Cremation's facilities. Best Direct Cremation, by contrast, delivers every cremation locally via a vetted independent funeral director near the family.`),
      heading('Strengths'),
      pt(`FCA-authorised, well-established direct cremation operator, transparent pricing, large customer base means well-tested processes.`),
      heading('Things to check'),
      pt(`Where will collection actually happen? How far will your loved one be transported? At which crematorium will the cremation take place? For some families the centralised model is fine; for others, keeping the loved one close to home matters enormously.`),
      pt(`This review is informational only. Best Direct Cremation does not currently sell funeral plans — we plan to launch our own in early 2027 with the same local-delivery model that defines our standard service.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'reviews/avalon', intent: 'review',
    title: 'Avalon Funeral Plan Review (2026)',
    excerpt: 'Avalon funeral plans (Member of the Avalon Trust) — informational review of structure, pricing and what to verify.',
    bodyBlocks: [
      pt(`Avalon Funeral Plans is administered through the Avalon Trust and sold through a network of independent funeral directors across the UK. The company has been through FCA authorisation review in 2022 and is currently authorised. Plans are delivered locally by Avalon Network funeral directors.`),
      heading('Plan types and pricing'),
      pt(`Avalon offers a range of plans from a basic cremation plan (£2,200-£2,800) through a more comprehensive plan (£3,500-£4,800). Direct cremation options are typically around £1,800-£2,200. Pricing varies by the local funeral director's cost base.`),
      heading('Strengths'),
      pt(`Independent funeral director network means local delivery. Avalon Trust structure provides FCA-regulated fund protection. Plans transfer between Avalon network FDs if you move.`),
      heading('Things to check'),
      pt(`Confirm the specific Avalon Network funeral director who will deliver the plan, their NAFD or SAIF accreditation, and their location relative to where you live now. Read the disbursements cap carefully. Avalon has been through a corporate evolution — verify the current FCA-authorised entity on the Register before paying.`),
      pt(`This review is informational. Best Direct Cremation does not currently sell funeral plans — launch planned early 2027. Always verify on the FCA Register at fca.org.uk/register.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'reviews/age-co', intent: 'review',
    title: 'Age Co Funeral Plan Review (2026)',
    excerpt: 'Age Co funeral plans — partnership with Dignity, plan structure, and what makes the Age UK affiliation matter.',
    bodyBlocks: [
      pt(`Age Co Funeral Plans is the branded funeral plan offering from Age Co, the social enterprise arm of Age UK (one of the UK's largest charities supporting older people). Age Co funeral plans are underwritten and delivered by Dignity — the affiliation gives the plan Age UK's brand trust while the actual funeral services are provided through Dignity's network.`),
      heading('Plan types and pricing'),
      pt(`Age Co offers tiered plans similar to Dignity's own — direct cremation through to traditional. Prices typically £2,000 (direct cremation) to £4,500 (traditional). The Age Co brand is the differentiator rather than the underlying plan structure, which mirrors Dignity's.`),
      heading('Strengths'),
      pt(`The Age UK affiliation is a strong trust signal for older buyers. Profits from Age Co plans contribute to Age UK's charitable work. FCA-authorised through Dignity.`),
      heading('Things to check'),
      pt(`Because plans are delivered by Dignity, the same questions apply: where will the funeral take place? Which Dignity-owned crematorium will be used? Disbursements caps. Age Co plans are not cheaper than Dignity's own plans simply because they are sold under the Age UK brand.`),
      pt(`This review is informational. Best Direct Cremation does not currently sell funeral plans. Always verify on the FCA Register.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'reviews/safehands', intent: 'review',
    title: 'SafeHands Funeral Plans — What Happened? (An Investigation)',
    excerpt: 'A complete account of what happened when SafeHands Funeral Plans collapsed in 2022, what customers lost, and what protections exist today.',
    bodyBlocks: [
      pt(`SafeHands Funeral Plans collapsed into administration in March 2022 — just months before the FCA's new funeral plan regulations were due to take effect. Tens of thousands of customers were left with worthless plans, and the collapse became the defining moment that triggered the FCA's new regulatory regime for the entire industry. This article explains what happened, what customers received (or did not receive), and what protections exist today.`),
      heading('What was SafeHands?'),
      pt(`SafeHands Plans Ltd was a UK funeral plan provider that grew rapidly through the 2010s by selling lower-priced plans (often £1,000-£1,500) through a network of agents and call centres. At the peak the company had around 45,000 customer plans on the books.`),
      heading('Why it collapsed'),
      pt(`SafeHands operated under the pre-FCA self-regulation regime overseen by the Funeral Planning Authority. When the FCA announced it would take over regulation from July 2022, every existing provider had to apply for FCA authorisation. SafeHands' application was not granted, and the company entered administration in March 2022 — before the FCA regime even formally began. Administrators FRP Advisory took over.`),
      heading('What customers lost'),
      pt(`When administrators reviewed SafeHands' trust fund, they found a shortfall of tens of millions of pounds. Customers' plans could not be honoured at the original prices. Some customers received partial refunds of their original payments; many received nothing. Around 45,000 families lost what they had paid in — typically £1,000-£1,500 per customer.`),
      heading('Why the FSCS did not cover the losses'),
      pt(`Because SafeHands collapsed before the FCA regime began on 29 July 2022, customers were not protected by the FSCS (Financial Services Compensation Scheme). This was the gap that the FCA's incoming regulation was designed to close — but the timing meant SafeHands customers fell in between.`),
      heading('Are funeral plans safer today?'),
      pt(`Yes, substantially. Since 29 July 2022, every UK funeral plan provider must be FCA-authorised, hold customer money in a regulated trust, follow conduct rules, and be FSCS-covered. If a provider fails today, the FSCS protects customer plans. Always verify FCA authorisation at fca.org.uk/register before paying for any plan.`),
      heading('Advice for affected SafeHands customers'),
      pt(`If you were a SafeHands customer and have not yet received any communication about your plan, contact FRP Advisory or check Citizens Advice for guidance. The FCA also has a dedicated page on the SafeHands collapse. Some former SafeHands customers were offered transfer arrangements to other providers at a discount — this offer is now expired but is worth investigating if you have unanswered paperwork.`),
      pt(`Best Direct Cremation will be FCA-authorised when we launch our own funeral plans in early 2027 — and the SafeHands experience is exactly why every plan we sell will be properly protected, transparently priced, and tied to a real local funeral director.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'compare', intent: 'comparison',
    title: 'Funeral Plan Provider Comparison UK 2026',
    excerpt: 'Side-by-side comparison of the UK\'s major funeral plan providers — Co-op, Dignity, Golden Charter, Pure Cremation, Avalon, Age Co.',
    bodyBlocks: [
      pt(`The UK funeral plan market is dominated by six major providers in 2026: Co-op Funeralcare, Dignity, Golden Charter, Pure Cremation, Avalon and Age Co. All six are FCA-authorised and all six have advantages and trade-offs depending on what you want.`),
      heading('Direct cremation plans (entry-level cost)'),
      pt(`Lowest direct cremation plan prices in 2026: Pure Cremation (around £1,950), Avalon (around £1,800-£2,200), Golden Charter (around £1,700-£2,200, local FD-dependent), Dignity (around £2,200), Co-op (around £1,995), Age Co (around £2,000). Pure Cremation is centralised; the others use local funeral directors.`),
      heading('Local vs centralised delivery'),
      pt(`Pure Cremation = centralised (their own mortuary and crematoria). Co-op Funeralcare = own branch network (semi-centralised). Dignity = own funeral directors and crematoria. Age Co = delivered by Dignity. Golden Charter = independent funeral director network (genuinely local). Avalon = independent funeral director network. If keeping your loved one close to home matters, Golden Charter, Avalon (or BDC when we launch in 2027) are the best fits.`),
      heading('Brand and trust signals'),
      pt(`Co-op and Age Co benefit from very high brand recognition. Dignity has the longest history but went through corporate restructuring 2022-2023. Golden Charter has the biggest independent FD network. Pure Cremation is the largest dedicated direct-cremation operator. Avalon has the longest-standing independent FD trust structure.`),
      heading('What to compare'),
      pt(`All-in price (lump sum and total cost over instalments); whether the funeral is delivered locally or centrally; disbursements cap and what happens above it; cancellation terms; whether plans transfer when you move home; reviews from real customers on Trustpilot and Google. And always — check the FCA Register first.`),
      heading('Best Direct Cremation funeral plans'),
      pt(`Best Direct Cremation plans launch in early 2027 — direct cremation only, delivered through our vetted network of independent local funeral directors, transparent all-inclusive pricing, and full FCA authorisation from day one.`),
      FCA_DISCLAIMER,
    ],
  },
  {
    slug: 'near-me', intent: 'planning',
    title: 'Funeral Plans Near Me — How to Find a Local Plan Provider',
    excerpt: 'How to find a funeral plan provider local to where you live, why local delivery matters, and what to ask.',
    bodyBlocks: [
      pt(`When people search "funeral plans near me", they're usually looking for a provider that will deliver the funeral in their local area — not a national chain that may transport the deceased hundreds of miles to a centralised hub. This guide explains how to find a genuinely local funeral plan provider and what questions to ask.`),
      heading('Why local delivery matters'),
      pt(`Many UK funeral plan providers operate centralised models — collection drivers based at regional hubs, a single mortuary serving large areas, and a small number of owned crematoria. When you die, your loved one may be transported far from home for the cremation. For some families this is fine; for many, keeping the funeral local is a key reason for choosing one provider over another.`),
      heading('How to find a local provider'),
      pt(`Search the FCA Register at fca.org.uk/register filtered to funeral plan providers, then check which providers operate in your area. Golden Charter's website lets you search for plans by your postcode and shows which local independent funeral director would deliver the plan. Avalon Network does the same. Direct cremation specialists like Pure Cremation typically don't deliver locally regardless of where you live.`),
      heading('Questions to ask a local provider'),
      pt(`Which specific funeral director will deliver the plan? What is their address? Are they NAFD or SAIF accredited? Where will the cremation take place — which crematorium? What happens if the chosen funeral director closes or stops trading? What happens if you move home?`),
      heading('Best Direct Cremation — local by design'),
      pt(`Best Direct Cremation operates the local-FD model by design. When we launch funeral plans in early 2027, every plan will be delivered by a vetted local independent funeral director near the family — never a centralised hub. Call 0333 242 1405 to join our launch waitlist.`),
      FCA_DISCLAIMER,
    ],
  },
];

// ============================================================
// LOCALITY CROSSOVER (96 county FP pages + 30 top city FP pages)
// ============================================================

const COUNTY_NAMES: Array<[string,string,string]> = [
  ['bedfordshire','Bedfordshire','England'],['berkshire','Berkshire','England'],['bristol','Bristol','England'],
  ['buckinghamshire','Buckinghamshire','England'],['cambridgeshire','Cambridgeshire','England'],['cheshire','Cheshire','England'],
  ['cornwall','Cornwall','England'],['county-durham','County Durham','England'],['cumbria','Cumbria','England'],
  ['derbyshire','Derbyshire','England'],['devon','Devon','England'],['dorset','Dorset','England'],
  ['east-sussex','East Sussex','England'],['east-yorkshire','East Yorkshire','England'],['essex','Essex','England'],
  ['gloucestershire','Gloucestershire','England'],['london','Greater London','England'],['manchester','Greater Manchester','England'],
  ['hampshire','Hampshire','England'],['herefordshire','Herefordshire','England'],['hertfordshire','Hertfordshire','England'],
  ['isle-of-wight','Isle of Wight','England'],['kent','Kent','England'],['lancashire','Lancashire','England'],
  ['leicestershire','Leicestershire','England'],['lincolnshire','Lincolnshire','England'],['merseyside','Merseyside','England'],
  ['norfolk','Norfolk','England'],['north-yorkshire','North Yorkshire','England'],['northamptonshire','Northamptonshire','England'],
  ['northumberland','Northumberland','England'],['nottinghamshire','Nottinghamshire','England'],['oxfordshire','Oxfordshire','England'],
  ['rutland','Rutland','England'],['shropshire','Shropshire','England'],['somerset','Somerset','England'],
  ['south-yorkshire','South Yorkshire','England'],['staffordshire','Staffordshire','England'],['suffolk','Suffolk','England'],
  ['surrey','Surrey','England'],['tyne-and-wear','Tyne and Wear','England'],['warwickshire','Warwickshire','England'],
  ['west-midlands','West Midlands','England'],['west-sussex','West Sussex','England'],['west-yorkshire','West Yorkshire','England'],
  ['wiltshire','Wiltshire','England'],['worcestershire','Worcestershire','England'],
  ['anglesey','Anglesey','Wales'],['blaenau-gwent','Blaenau Gwent','Wales'],['bridgend','Bridgend','Wales'],
  ['caerphilly','Caerphilly','Wales'],['cardiff','Cardiff','Wales'],['carmarthenshire','Carmarthenshire','Wales'],
  ['ceredigion','Ceredigion','Wales'],['conwy','Conwy','Wales'],['denbighshire','Denbighshire','Wales'],
  ['flintshire','Flintshire','Wales'],['gwynedd','Gwynedd','Wales'],['merthyr-tydfil','Merthyr Tydfil','Wales'],
  ['monmouthshire','Monmouthshire','Wales'],['neath-port-talbot','Neath Port Talbot','Wales'],['pembrokeshire','Pembrokeshire','Wales'],
  ['powys','Powys','Wales'],['rhondda-cynon-taf','Rhondda Cynon Taf','Wales'],['swansea','Swansea','Wales'],
  ['torfaen','Torfaen','Wales'],['vale-of-glamorgan','Vale of Glamorgan','Wales'],['wrexham','Wrexham','Wales'],
  ['aberdeenshire','Aberdeenshire','Scotland'],['angus','Angus','Scotland'],['argyll-and-bute','Argyll and Bute','Scotland'],
  ['ayrshire','Ayrshire','Scotland'],['dumfries-and-galloway','Dumfries and Galloway','Scotland'],['dunbartonshire','Dunbartonshire','Scotland'],
  ['dundee','Dundee','Scotland'],['east-lothian','East Lothian','Scotland'],['edinburgh','Edinburgh','Scotland'],
  ['fife','Fife','Scotland'],['glasgow','Glasgow','Scotland'],['highland','Highland','Scotland'],
  ['inverclyde','Inverclyde','Scotland'],['midlothian','Midlothian','Scotland'],['moray','Moray','Scotland'],
  ['north-lanarkshire','North Lanarkshire','Scotland'],['perth-and-kinross','Perth and Kinross','Scotland'],['renfrewshire','Renfrewshire','Scotland'],
  ['scottish-borders','Scottish Borders','Scotland'],['south-lanarkshire','South Lanarkshire','Scotland'],
  ['stirlingshire-and-clackmannanshire','Stirlingshire & Clackmannanshire','Scotland'],['west-lothian','West Lothian','Scotland'],
  ['armagh','Armagh','Northern Ireland'],['county-antrim','County Antrim','Northern Ireland'],['county-down','County Down','Northern Ireland'],
  ['fermanagh','Fermanagh','Northern Ireland'],['londonderry','Londonderry','Northern Ireland'],['tyrone','Tyrone','Northern Ireland'],
];

function localityFpArticle(slug: string, name: string, isCity: boolean): Article {
  const T = isCity ? 'city' : 'county';
  return {
    slug: `${T}/${slug}`,
    intent: 'planning',
    title: `Funeral Plans in ${name} — A Local Guide`,
    excerpt: `Funeral plans for families in ${name} — what to look for in a local provider, FCA verification, and what's coming from Best Direct Cremation in 2027.`,
    bodyBlocks: [
      pt(`Families in ${name} considering a funeral plan have the same range of choices as the rest of the UK — and the same things to watch out for. This guide explains what to look for in a plan that will be delivered locally to ${name}, why FCA authorisation matters, and what Best Direct Cremation plans to offer to families in ${name} from early 2027.`),
      heading(`Funeral plan options in ${name}`),
      pt(`The major UK funeral plan providers all serve ${name} either through their own funeral directors or through partnerships with local independent funeral directors. The key choice for families in ${name} is whether the plan is delivered by a centralised national operation (Pure Cremation, Co-op, Dignity) or by a genuinely local independent funeral director (Golden Charter, Avalon, or — from 2027 — Best Direct Cremation).`),
      heading('What changes locally'),
      pt(`The plan itself is regulated nationally by the FCA, so the protections, refund rules and trust structures are the same everywhere. What changes locally is who actually delivers the funeral. In ${name}, that means asking: which local funeral director will collect my loved one and arrange the cremation? Which crematorium will be used? How far from home will my loved one be transported?`),
      heading(`Crematoria serving ${name}`),
      pt(`The cremation under your plan would take place at a local crematorium serving ${name}. Different plans use different crematoria — some providers own their own (Dignity, Pure Cremation), others use local independent crematoria. If you have a preference for a specific crematorium in or near ${name} — perhaps because a partner or relative was cremated there — confirm this with your provider before buying.`),
      heading('FCA verification'),
      pt(`Whoever you buy a funeral plan from in ${name}, verify them on the FCA Register at fca.org.uk/register before paying. The Register is the only definitive source for confirming a provider is legally authorised to sell plans. If a salesperson visits your home in ${name} offering a plan and won't or can't confirm their FCA authorisation, walk away.`),
      heading(`Best Direct Cremation funeral plans in ${name} (from 2027)`),
      pt(`Best Direct Cremation does not currently sell funeral plans. We plan to launch our own direct cremation funeral plans in early 2027, delivered in ${name} by the same vetted local independent funeral directors we use for our standard direct cremation service today. To be told the moment we launch and confirm coverage in ${name}, call 0333 242 1405.`),
      FCA_DISCLAIMER,
    ],
  };
}

// ============================================================
// Top 30 cities for FP locality crossover
// ============================================================
const TOP_30: Array<[string,string]> = [
  ['london-city','London'],['birmingham','Birmingham'],['manchester-city','Manchester'],['liverpool','Liverpool'],
  ['leeds','Leeds'],['glasgow-city','Glasgow'],['sheffield','Sheffield'],['newcastle-upon-tyne','Newcastle upon Tyne'],
  ['bristol-city','Bristol'],['belfast','Belfast'],['edinburgh-city','Edinburgh'],['cardiff-city','Cardiff'],
  ['coventry','Coventry'],['bradford','Bradford'],['stoke-on-trent','Stoke-on-Trent'],['wolverhampton','Wolverhampton'],
  ['plymouth','Plymouth'],['nottingham','Nottingham'],['southampton','Southampton'],['reading','Reading'],
  ['derby','Derby'],['portsmouth','Portsmouth'],['brighton','Brighton'],['hull','Hull'],
  ['aberdeen','Aberdeen'],['preston','Preston'],['northampton','Northampton'],['luton','Luton'],
  ['milton-keynes','Milton Keynes'],['norwich','Norwich'],
];

async function run() {
  console.log(`Ingesting Funeral Plans cluster into ${PROJECT_ID}/${DATASET}…`);
  let count = 0;

  // 25 cluster articles
  for (const a of CLUSTER) {
    const doc = {
      _type: 'article',
      _id: `fp-${a.slug.replace(/\//g, '-')}`,
      title: a.title,
      slug: { _type: 'slug', current: a.slug },
      section: 'funeral-plans',
      intent: a.intent,
      excerpt: a.excerpt,
      body: enrichBody(a.bodyBlocks, a.slug),
      lastReviewed: new Date().toISOString().split('T')[0],
    };
    await client.createOrReplace(doc);
    count++;
    console.log(`  ✓ cluster   /funeral-plans/${a.slug}/`);
  }

  // 96 county FP pages
  for (const [slug, name] of COUNTY_NAMES) {
    const a = localityFpArticle(slug, name, false);
    const doc = {
      _type: 'article',
      _id: `fp-county-${slug}`,
      title: a.title,
      slug: { _type: 'slug', current: a.slug },
      section: 'funeral-plans',
      intent: a.intent,
      excerpt: a.excerpt,
      body: enrichBody(a.bodyBlocks, a.slug),
      lastReviewed: new Date().toISOString().split('T')[0],
    };
    await client.createOrReplace(doc);
    count++;
    console.log(`  ✓ county    /funeral-plans/${a.slug}/`);
  }

  // 30 city FP pages
  for (const [slug, name] of TOP_30) {
    const a = localityFpArticle(slug, name, true);
    const doc = {
      _type: 'article',
      _id: `fp-city-${slug}`,
      title: a.title,
      slug: { _type: 'slug', current: a.slug },
      section: 'funeral-plans',
      intent: a.intent,
      excerpt: a.excerpt,
      body: enrichBody(a.bodyBlocks, a.slug),
      lastReviewed: new Date().toISOString().split('T')[0],
    };
    await client.createOrReplace(doc);
    count++;
    console.log(`  ✓ city      /funeral-plans/${a.slug}/`);
  }

  console.log(`\nDone. ${count} funeral plans documents created.`);
}

run().catch(err => { console.error(err); process.exit(1); });
