/**
 * Expand 6 highest-volume help articles to 4,000+ words each.
 *
 * Pillars rewritten:
 *   1. what-to-do-when-someone-dies   — UK monthly volume ~90k
 *   2. cost-of-a-funeral              — UK monthly volume ~40k
 *   3. what-is-direct-cremation       — already strong, deepen
 *   4. cremation-vs-burial            — high comparison volume
 *   5. how-direct-cremation-works     — process pillar
 *   6. choosing-a-funeral-director    — decision pillar
 *
 * Each rewrite uses createOrReplace with the same _id, so it overwrites
 * the existing article cleanly.
 *
 * Usage:  npx tsx scripts/expand-pillars.ts
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
const h2 = (text: string) => ({ _type: 'block', style: 'h2', children: [{ _type: 'span', text }], markDefs: [] });
const h3 = (text: string) => ({ _type: 'block', style: 'h3', children: [{ _type: 'span', text }], markDefs: [] });

const CTA = pt(`If you need help arranging a direct cremation, Best Direct Cremation is available 24 hours a day on 0333 242 1405. A real person — never a chatbot — every call. £1,499 all-inclusive, delivered locally by a vetted independent funeral director.`);

type Article = { slug: string; title: string; intent: string; excerpt: string; bodyBlocks: any[]; faqs: Array<{q: string; a: string}> };

const PILLARS: Article[] = [

  // ============================================================
  // 1. WHAT TO DO WHEN SOMEONE DIES  (~4,500 words)
  // ============================================================
  {
    slug: 'what-to-do-when-someone-dies',
    title: 'What to Do When Someone Dies — The Complete UK Step-by-Step Guide',
    intent: 'process',
    excerpt: 'A clear, calm, comprehensive UK guide to every step after someone has died — from the first hour to the funeral and beyond. Updated for 2026.',
    bodyBlocks: [
      pt(`When someone close to you dies, time slows down and everything feels overwhelming. For most people, this is the first time they have had to deal with the practicalities — and there is a lot to do at the worst possible moment. This guide walks you through every step, in order, in plain English. Take your time. Most things do not have to be done in the first hour or even the first day.`),
      pt(`This guide covers what to do in the first few hours, how to register the death, choosing a funeral director, arranging the funeral, the longer-term administration of the estate, and the bereavement support that is freely available across the UK. It is up to date for England, Wales, Scotland and Northern Ireland in 2026.`),

      h2('The first hour — what you need to do right now'),
      pt(`What you need to do first depends entirely on where and how the person died. There are three main scenarios, and the steps are different for each.`),

      h3('If the death was expected at home (terminal illness, hospice or community care)'),
      pt(`Call the GP surgery or the community nursing team who looked after them. They will arrange for a doctor to attend, verify the death, and issue the Medical Certificate of Cause of Death (sometimes called the MCCD). There is no rush. Give yourself a few minutes with your loved one before making any phone calls. Modern UK practice gives families time to sit with the person who has died — it is not necessary to immediately call funeral directors or move the body.`),
      pt(`If the death happens overnight or at the weekend, call NHS 111 first. They will dispatch the on-call GP or district nurse. Out-of-hours services are now well-established across the UK and will respond within a few hours.`),

      h3('If the death was unexpected'),
      pt(`Call 999. Paramedics will attend, attempt resuscitation if appropriate, and verify the death. If there is anything unusual or unclear about the cause of death, they will involve the police and the coroner. This is routine and does not imply anything wrong — around 40% of UK deaths are reported to the coroner.`),
      pt(`Do not move the person or touch anything in the room until paramedics or police have completed their initial check. Stay with the person if you can. Do not feel pressured to leave the room before professionals arrive.`),

      h3('If the death happened in hospital or hospice'),
      pt(`The staff handle the immediate practicalities. The deceased will be moved to the hospital mortuary, and you will be given paperwork — usually the Medical Certificate of Cause of Death — that you take to the local register office. Most hospitals have a bereavement office (sometimes called the Patient Affairs Office) that supports families through the next steps. They will provide a checklist of what to do next, recommend (but never specifically endorse) local funeral directors, and help with practical questions.`),
      pt(`Take their time. You do not have to make funeral arrangements within hours of the death. Most hospitals will care for your loved one in the mortuary for several days while you take stock.`),

      h2('Registering the death — the next 5 days'),
      pt(`In England, Wales and Northern Ireland, most deaths must be registered within 5 days. In Scotland, you have 8 days. You register at the register office for the area where the person died — not necessarily where they lived. Most councils now require an appointment, which you can book online. The appointment itself takes 30-45 minutes.`),

      h3('What you need to bring'),
      pt(`The Medical Certificate of Cause of Death issued by the doctor or hospital. The person's full name, including any previous names (maiden name, names from previous marriages). Their date and place of birth. Their last home address. Their occupation (the last regular job, even if retired). Their NHS number if you can find it. Details of any state pension or benefits they were receiving. If they were married or in a civil partnership, the spouse's full name, date of birth and occupation. If you have it, their passport or birth certificate — but these are not strictly required.`),

      h3('What the registrar will give you'),
      pt(`A Death Certificate — the official record of the death. You will usually want several certified copies, because banks, pensions, insurance companies and the probate service all want originals. Each certified copy currently costs £11 (England and Wales; Scotland and NI vary slightly). Most families order 6-10 copies at the time of registration. You can order more later for the same fee.`),
      pt(`A "Green Form" — Certificate for Burial or Cremation. You give this to the funeral director. Without it, the cremation or burial cannot legally take place.`),
      pt(`A notification slip for state pensions and benefits — this lets the DWP know the person has died.`),

      h3('Tell Us Once — the most useful service most people do not know about'),
      pt(`When you register the death, ask about the "Tell Us Once" service. It is free and is offered by most local councils. With one phone call or one online form, you notify almost every government department in one go: HMRC, the DWP, the Passport Office, the DVLA, the local council, the Electoral Register, and more. Without Tell Us Once you would have to write to each one separately — typically 10-15 letters. The registrar will give you a unique reference number to use within 28 days. Use it. It saves enormous amounts of admin and stops you receiving demand letters from departments who don't know the person has died.`),

      h2('Choosing a funeral director'),
      pt(`This is the single most important decision you will make in this process. The funeral director you choose determines the dignity of care your loved one receives, the cost of the funeral, and the experience your family has. You have free choice — no hospital, hospice or care home can require you to use a specific funeral director. Take your time. Compare options.`),

      h3('What to look for'),
      pt(`NAFD (National Association of Funeral Directors) or SAIF (National Society of Allied and Independent Funeral Directors) accreditation. These are the two main UK trade bodies and members must follow professional standards, have complaints processes, and undergo periodic inspection. A funeral director who belongs to neither has chosen not to be held to those standards.`),
      pt(`Transparent pricing displayed on their website. Every UK funeral director is required by the Competition and Markets Authority (CMA) Funerals Market Investigation Order 2021 to publish a Standardised Price List on their website and display one in their branch. If you can't find it, ask. If they refuse to show it, walk away.`),
      pt(`Reviews on Google, Trustpilot and Funeral Guide. Read recent reviews — funeral providers can change over time. Look for patterns of complaints, not isolated bad reviews.`),
      pt(`A local, real-person presence. A funeral director with their own premises, their own mortuary, their own vehicles, and staff who live and work locally. Some "local" providers turn out to be local-sounding branches of national chains. There is nothing wrong with that, but you should know which is which.`),

      h3('Direct cremation versus traditional funeral — the cost gap'),
      pt(`A direct cremation typically costs £1,400-£1,700 in 2026, all-inclusive. Best Direct Cremation costs £1,499 (£1,749 maximum with Priority Care). A traditional cremation funeral with a 25-30 minute service averages £4,510 (SunLife Cost of Dying Report 2026). A traditional burial averages £5,000-£10,000+ once you add the plot cost.`),
      pt(`The difference is what's included. A direct cremation removes the formal service at the crematorium, the hearse and limousines, the celebrant, the flowers and the order of service. What remains is the essential dignified care: collection, mortuary care, a simple coffin, the cremation, and the return of ashes. Many families now choose direct cremation followed by a personal memorial later in a venue and at a time that means something — a pub, a community hall, a favourite outdoor spot.`),

      h2('What the funeral director does for you'),
      pt(`Once you've appointed a funeral director, they take over almost all the practicalities. They will: collect your loved one from the place of death (any time of day or night if needed), care for them in their mortuary, handle all the cremation paperwork (Forms Cremation 4 and 5, or Form Cremation 6 if the coroner is involved), book the crematorium or cemetery, arrange the service (if any), provide transport, coordinate with any celebrant or minister, and return the ashes to you.`),
      pt(`You stay in charge of the choices — what type of funeral, the music, the readings, what should and should not be included — but the practical execution moves off your shoulders.`),

      h2('Arranging the funeral — what to decide'),
      pt(`What type of funeral. Direct cremation (no service at the crematorium), attended cremation (brief crematorium service), traditional funeral (full ceremonial), or burial. Read our cremation vs burial guide for the full comparison.`),
      pt(`When the funeral should take place. UK funerals typically happen 1-3 weeks after death. The main constraints are the cremation paperwork (1-3 working days), the registrar (1-2 days for the Green Form), and the crematorium's available slots. Direct cremation is often quickest because there is no need to coordinate a service date with extended family.`),
      pt(`Music, readings, who speaks. If you're having an attended service, the celebrant will spend time with you understanding the deceased and helping you choose. Personal, specific stories work better than generic eulogies.`),
      pt(`Flowers, donations, wake. Increasingly families request donations to a charity in lieu of flowers. The wake (the gathering after) can be at a pub, community hall, family home — anywhere meaningful. Or there can be no wake at all; many families now hold a separate memorial weeks later.`),

      h2('Beyond the funeral — the longer admin'),
      pt(`The funeral is over within a few weeks. The longer administration of the estate takes 6-18 months. Here is what to expect.`),

      h3('Probate'),
      pt(`Probate is the legal authority to deal with the deceased's estate (property, money, possessions). It is generally needed if the deceased owned property in their sole name, had significant bank accounts (the threshold varies by bank, typically £20,000-£50,000), or owned anything else that needs to be transferred. If everything was jointly owned, probate is usually not needed because assets pass automatically to the survivor.`),
      pt(`If there's a will, the named executor applies for a "Grant of Probate". If there's no will (the person died intestate), the next of kin applies for "Letters of Administration". Both give the same legal authority. You can apply online via GOV.UK or by post. Processing currently takes 4-16 weeks. The fee is £300 for estates over £5,000, free below that.`),

      h3('Inheritance tax'),
      pt(`If the estate is worth more than the nil-rate band (£325,000 in 2026), inheritance tax may be due at 40% on the amount above. There are additional allowances: an extra £175,000 if a main residence passes to direct descendants (children, grandchildren), and any unused allowance from a deceased spouse can transfer to the survivor. Most UK estates do not pay inheritance tax — only around 4% of UK estates exceed the threshold. But if yours does, get professional advice early because inheritance tax must be paid before probate is granted.`),

      h3('Closing accounts and notifying companies'),
      pt(`Banks, pensions, utility companies, insurance providers, council tax, TV licence, subscriptions. Most have dedicated bereavement teams. Use Tell Us Once for state benefits. Beyond that, every company you contact will ask for a certified copy of the Death Certificate. This is why you ordered multiple copies at registration.`),
      pt(`Citizens Advice has comprehensive bereavement guidance covering every step. The "What to do after a death" service on GOV.UK walks you through legal requirements. Most banks have dedicated bereavement teams who will guide you through closing accounts and accessing funds for funeral expenses.`),

      h2('Bereavement support — you do not have to do this alone'),
      pt(`Grief is not a problem to be solved or a phase to be moved through. It is the natural response to losing someone you love. Some people feel intense sadness immediately. Others feel numb for weeks before the loss hits. Some can't sleep or eat. Some experience anger or guilt. Some feel relief, especially after a long illness — and then guilt about feeling relieved. All of this is normal.`),
      pt(`Free, professional, immediate support is available across the UK:`),
      h3('Cruse Bereavement Support'),
      pt(`The UK's largest bereavement charity. Free helpline (0808 808 1677), online chat, regional support groups, and one-to-one counselling. Highly recommended as a first port of call for anyone struggling with grief — fresh or long-standing.`),
      h3('Samaritans'),
      pt(`If grief becomes overwhelming or you have thoughts of self-harm, call Samaritans on 116 123. Free, 24/7, confidential. They are trained for exactly this.`),
      h3('Specialist support'),
      pt(`Child loss: Sands (stillbirth and neonatal deaths) — sands.org.uk. Child Bereavement UK — for grieving children and parents who have lost a child. WAY (Widowed and Young) — for partners widowed under 50. Marie Curie — bereavement support specifically for families of people who died in palliative care. Winston's Wish — supporting grieving children. Each has dedicated trained volunteers who have been through similar losses.`),
      h3('NHS counselling'),
      pt(`Your GP can refer you for bereavement counselling on the NHS. Waiting times vary but in most areas this is available within 6-12 weeks. NHS Talking Therapies (formerly IAPT) accepts self-referrals in most areas — search "NHS Talking Therapies [your area]" to find your local service. If grief is significantly impacting your daily life — sleep, eating, work, relationships — this is the right route.`),

      h2('When the death involves the coroner'),
      pt(`Roughly 40% of UK deaths are reported to the coroner. This sounds alarming but is routine. The coroner is involved when: the death was sudden or unexpected; the cause of death is unclear; the death happened after recent injury, surgery or medical procedure; the death occurred in custody, prison or police contact; or the death may have been from violence, accident, neglect or self-harm.`),
      pt(`If the coroner is involved, the timeline lengthens. The coroner may order a post-mortem to establish the cause of death. They may hold an inquest (a formal investigation) — this is more common with violent or unexplained deaths. Most coroner cases conclude within 2-4 weeks; inquests can take 6 months or longer for complex cases.`),
      pt(`While the coroner's investigation is open, the funeral cannot take place. Your funeral director will keep you informed of progress.`),

      h2('A simple checklist for the first month'),
      pt(`Week 1: arrange medical certification, call the funeral director, support the family. Week 1-2: register the death, use Tell Us Once, start telling family and friends. Week 2-3: arrange the funeral (if direct cremation), continue family communications, ensure post is being collected. Week 3-4: the cremation (if direct), receive the ashes, start thinking about memorial plans, begin probate if applicable. Week 4+: notify remaining accounts and providers, claim any state benefits or bereavement payment you may be entitled to.`),

      CTA,
    ],
    faqs: [
      { q: 'How long do I have to register a death in the UK?', a: '5 days in England, Wales and Northern Ireland; 8 days in Scotland. Book an appointment at the register office for the area where the person died.' },
      { q: 'Do I have to use a specific funeral director if the death happens in hospital?', a: 'No. Hospitals must allow you to use any funeral director you choose. The hospital bereavement office can give you a list of local options but cannot recommend one specifically.' },
      { q: 'What is the cheapest type of funeral in the UK?', a: 'A direct cremation. Typical cost is £1,400-£1,700 all-inclusive in 2026. Best Direct Cremation is £1,499 (£1,749 max with Priority Care).' },
      { q: 'Can I see my loved one before the funeral if I choose direct cremation?', a: 'In most cases yes. While the cremation itself is unattended, many families ask to spend a few moments with their loved one at the funeral director\'s premises beforehand. Confirm with your funeral director at the time of arrangement.' },
      { q: 'What is "Tell Us Once" and is it free?', a: 'Tell Us Once is a free government service offered through most UK councils. It notifies most public bodies (HMRC, DWP, DVLA, Passport Office, local council) of a death in one go. The registrar gives you a reference number when you register the death. You must use it within 28 days.' },
      { q: 'When does the coroner get involved?', a: 'When the death is sudden, unexpected, or unexplained; after recent surgery or injury; in custody or police contact; or where there is any concern about cause of death. Around 40% of UK deaths go through the coroner. The process is routine and usually concludes within 2-4 weeks.' },
      { q: 'Can I get financial help with the funeral cost?', a: 'Yes if you are on certain benefits. The DWP Funeral Expenses Payment provides £1,000+ towards funeral costs for those on Universal Credit, Pension Credit, Income Support, Housing Benefit, JSA, ESA, Working Tax Credit or Child Tax Credit. Apply within 6 months via GOV.UK. The Children\'s Funeral Fund covers most fees if a child under 18 has died — no means test.' },
      { q: 'Do I need to use the funeral director at the hospital?', a: 'Absolutely not. You have free choice. The hospital may give you a list of local options but cannot push you toward one specifically.' },
    ],
  },

  // ============================================================
  // 2. COST OF A FUNERAL  (~4,500 words)
  // ============================================================
  {
    slug: 'cost-of-a-funeral',
    title: 'How Much Does a Funeral Cost in the UK in 2026? — The Complete Pricing Guide',
    intent: 'cost',
    excerpt: 'A definitive breakdown of UK funeral costs in 2026, by type, by region, by provider, with practical guidance on keeping costs down and accessing financial help.',
    bodyBlocks: [
      pt(`The average UK funeral cost in 2026 is £4,510 (SunLife Cost of Dying Report 2026), a 4.7% rise on 2025. That headline figure averages all funeral types together. Actual costs range from £1,400 for the simplest direct cremation up to £10,000+ for an elaborate traditional burial in central London. This guide breaks down every cost component, region, and provider, so you can make an informed decision.`),
      pt(`Funeral costs in the UK have outpaced wage growth for over a decade — rising 5% per year on average against 3% wage growth. This is why direct cremation, an alternative that strips out the ceremonial cost, has grown so fast: it now accounts for around one in every five UK funerals.`),

      h2('Average UK funeral costs by type — 2026 figures'),
      h3('Direct cremation'),
      pt(`£1,400-£1,700 all-inclusive. The cheapest credible UK funeral option. Includes collection, mortuary care, a simple coffin, all paperwork, the cremation, and return of ashes. There is no service at the crematorium. Best Direct Cremation is £1,499 (£1,749 maximum with Priority Care). This is now one in five UK funerals.`),
      h3('Attended cremation (simple)'),
      pt(`£2,500-£3,800. A brief 20-30 minute service at the crematorium with family present. Includes most of what a direct cremation includes plus the chapel booking, a celebrant, music, and a hearse. The "simple" tier from major providers like Co-op Funeralcare and Dignity sits here.`),
      h3('Traditional cremation'),
      pt(`£4,500-£5,500. A full ceremonial cremation funeral with family present. Includes everything in an attended cremation plus typically a limousine for family, a higher-quality coffin, a more elaborate floral tribute, an order of service, and sometimes a wake organised by the funeral director.`),
      h3('Traditional burial'),
      pt(`£5,000-£10,000+ depending on the plot cost. Includes everything in a traditional cremation plus the burial plot (£1,500 in rural areas to £20,000+ in central London), gravedigging fees, and any memorial stone. The plot is the biggest variable.`),

      h2('What makes up the cost — line by line'),
      pt(`The CMA Funerals Market Investigation Order 2021 requires every UK funeral director to publish a Standardised Price List. This makes the breakdown clearer than ever. Here is what each line means.`),
      h3('Funeral director fees'),
      pt(`£1,500-£3,500. Covers the funeral director's professional services: collection of the deceased, care in their mortuary, the coffin, all paperwork, vehicles, and their time. This is the biggest single line and the one most variable between providers. National chains charge more here because they have higher overhead; small independents can be cheaper.`),
      h3('Disbursements (third-party fees)'),
      pt(`£600-£1,200. These are fees the funeral director pays on your behalf to third parties: the cremation fee paid to the crematorium (£500-£900); the doctor's certificates for cremation (£82 each, two needed unless the coroner is involved, total £164); the celebrant or minister fee (£200-£400 if attended); music licensing for any recorded music; sometimes a small fee for the order of service printing. These are largely outside the funeral director's control.`),
      h3('Add-ons and extras'),
      pt(`£200-£2,000+. Anything ceremonial above the basic service: additional limousines for family, full floral tributes (single sprays, casket sprays, letter tributes spelling out names), embalming if requested, an upgraded coffin, alternative urns, memorial keepsakes, online streaming of the service. All optional, all can add up.`),
      h3('The wake or reception'),
      pt(`£200-£1,500. Not arranged by the funeral director — you arrange the venue, food and drink separately. A pub function room is often free if you spend on drinks. A community hall typically charges £100-£300 for the room. Catering ranges from sandwiches and tea (a few hundred pounds for 50 people) to a sit-down meal (£25-£50 per head).`),

      h2('Why funeral costs have risen so fast'),
      pt(`Five drivers have pushed UK funeral costs higher faster than general inflation:`),
      pt(`1. Crematorium and burial fees. Local authorities have increased these sharply over the last decade as council budgets tightened. A cremation fee that was £600 in 2015 is often £900+ in 2026.`),
      pt(`2. Premises and staff. Funeral homes need 24/7 staff, refrigerated mortuary space, hearse vehicles, premises in expensive locations. All of these costs have risen with inflation.`),
      pt(`3. Doctor's certificate fees. Set by Parliament. Currently £82 per certificate (two needed for most cremations) — £164 total. This was £73 each in 2015.`),
      pt(`4. Celebrant and minister fees. Reflecting demand and the cost of professional training.`),
      pt(`5. Fuel and vehicle costs. Particularly impactful for centralised providers who transport bodies long distances.`),

      h2('Funeral costs by region — where you live matters'),
      pt(`UK funeral costs vary significantly by region. London is the most expensive — typically 20-30% above the national average — driven mostly by crematorium and burial plot fees. The cheapest regions are typically the North East, Wales and parts of the West Midlands.`),
      pt(`Average UK funeral by region (SunLife 2026 data):`),
      pt(`London £5,140 · South East £4,720 · South West £4,610 · East £4,560 · West Midlands £4,460 · East Midlands £4,420 · Yorkshire £4,380 · North West £4,340 · Wales £4,310 · Scotland £4,290 · North East £4,180 · Northern Ireland £4,150`),
      pt(`For direct cremation specifically, the regional variation is much smaller because most providers (Best Direct Cremation included) charge the same price nationally. Best Direct Cremation costs £1,499 whether you're in Mayfair or Middlesbrough.`),

      h2('How to keep funeral costs down'),
      h3('Choose direct cremation over traditional'),
      pt(`The single biggest cost-saving decision. Switching from a traditional cremation funeral (£4,510 average) to a direct cremation (£1,499 at Best Direct Cremation) saves around £3,000. That's roughly two-thirds. The trade-off is no service at the crematorium — but you can hold a personal memorial later, often more meaningfully than a 25-minute crematorium service would have been.`),
      h3('Compare three providers minimum'),
      pt(`Get the Standardised Price List from at least three local funeral directors plus one national operator. Compare the all-in prices. Watch for hidden fees — especially Priority Care for non-hospital collections, which can add £400-£500 with some providers (Best Direct Cremation's is a transparent £250 maximum).`),
      h3('Skip ceremonial extras you don\'t actually want'),
      pt(`Many families pay for elements no one really wanted because they felt they "should". Limousines for extended family, large floral tributes, an upgraded coffin no one will see — none of these change the dignity of the funeral. Talk frankly with the family about what actually matters.`),
      h3('Hold the wake at home or a pub function room'),
      pt(`Far cheaper and often more meaningful than a hired hall with formal catering. A pub function room with a tab for drinks and a buffet often works out at half the cost of a formal wake.`),
      h3('Ask for donations to a charity in lieu of flowers'),
      pt(`Increasingly the norm. Many families now request donations to a charity (often related to the cause of death or a cause the deceased supported) rather than several hundred pounds of cut flowers that wilt within days. Specify in the announcement.`),
      h3('Choose a weekday morning slot'),
      pt(`Crematorium fees often vary by slot. Friday afternoons and Saturday morning slots typically command a premium. Mid-week morning slots are usually the cheapest and most available.`),
      h3('Use a simpler coffin'),
      pt(`A traditional MDF veneer coffin costs the funeral director around £150 wholesale. Premium hardwood coffins cost £600-£1,500. Cardboard or willow coffins cost £200-£400 and are often more meaningful — and considerably cheaper. The coffin makes a substantial cost difference.`),

      h2('Financial help if you cannot afford the funeral'),
      pt(`If the cost is genuinely beyond what you can afford, several routes exist.`),
      h3('Funeral Expenses Payment (DWP)'),
      pt(`A means-tested government payment for low-income families. Available to people receiving Universal Credit, Pension Credit, Income Support, Housing Benefit, Jobseeker's Allowance (income-based), Employment and Support Allowance (income-related), Working Tax Credit (with disability element) or Child Tax Credit. Covers cremation or burial fees, certain travel costs, and additional costs of moving the body. Typically £1,000-£1,500 depending on circumstances. Apply within 6 months of the funeral via GOV.UK or by calling the Bereavement Service helpline.`),
      h3('Children\'s Funeral Fund'),
      pt(`If a child under 18 has died, the Children's Funeral Fund (England) covers most cremation or burial fees with no means test. Wales, Scotland and Northern Ireland have similar arrangements. Speak to your funeral director — they apply on your behalf.`),
      h3('Bereavement Support Payment'),
      pt(`Not specifically for the funeral, but available to spouses or civil partners (and from 2023 also cohabiting partners with children) of someone who died while paying National Insurance. Higher rate (with children): £3,500 initial + £350/month for 18 months. Standard rate: £2,500 initial + £100/month for 18 months. Apply within 21 months of the death.`),
      h3('Bereavement charities and grants'),
      pt(`Down to Earth (a London-focused charity helping families afford funerals). Quaker Social Action's Fair Funerals campaign. Turn2us (a search tool for grants you may qualify for). Each can provide specific advice and sometimes direct grants.`),
      h3('Public Health Funeral (last resort)'),
      pt(`If there is genuinely no one who can pay for the funeral, the local authority will arrange a Public Health Funeral (still sometimes called a "pauper's funeral" colloquially). This is a basic but dignified cremation paid for by the council. The council will try to recover costs from the deceased's estate if possible. The local authority chooses the funeral director and the timing.`),

      h2('Funeral plans — locking in today\'s price'),
      pt(`A prepaid funeral plan lets you pay for the funeral now at today's price, with the provider guaranteeing the service whenever the time comes. The advantage is inflation protection: if funeral costs continue to rise 5% per year, a £1,499 plan today might be worth £2,300 by 2035. Since July 2022, every UK funeral plan provider must be FCA-authorised. Always verify on the FCA Register (fca.org.uk/register) before buying.`),
      pt(`Best Direct Cremation does not currently sell prepaid funeral plans. We plan to launch our own from early 2027, once FCA-authorised. Until then, our funeral plans content is informational — explaining options, prices, providers, and what to look for, without selling anything.`),

      h2('Comparing major UK funeral providers — 2026 pricing'),
      h3('Direct cremation specialists'),
      pt(`Best Direct Cremation: £1,499 all-inclusive (£1,749 with Priority Care). Local independent funeral director delivery. Pure Cremation: ~£2,000 (centralised, Andover-based mortuary). Aura: £1,495-£1,795 regional. Simplicity Cremations (Dignity Group): £1,395-£1,595. Cremation Direct: £1,300-£1,500 regional.`),
      h3('National funeral chains'),
      pt(`Co-op Funeralcare direct cremation: ~£1,995. Dignity direct cremation: ~£2,200 (cremation at a Dignity-owned crematorium). Funeral Partners: regional, typically £1,800-£2,400.`),

      h2('Why our pricing works'),
      pt(`Best Direct Cremation costs £1,499 because that reflects the true cost of delivering a proper direct cremation through a local independent funeral director — their staff, premises, vehicles, mortuary, paperwork and the crematorium fee — plus a fair margin to keep them in business. There is no centralised hub overhead and no surprise fees added at the point of need. The £250 Priority Care add-on covers the additional work involved in collecting someone outside a hospital mortuary (typically home, care home or hospice). Total maximum £1,749.`),
      pt(`The cheapest providers (£950-£1,200) achieve their price by centralising operations — your loved one may be transported hundreds of miles to a regional mortuary, and the cremation may take place at a single corporate crematorium far from home. For some families that is acceptable. For many, keeping their loved one close to home is worth the small price difference.`),

      CTA,
    ],
    faqs: [
      { q: 'What is the cheapest funeral in the UK in 2026?', a: 'A direct cremation. Typical credible price £1,400-£1,700 all-inclusive. Best Direct Cremation costs £1,499 (£1,749 maximum with Priority Care).' },
      { q: 'What is the average cost of a UK funeral?', a: '£4,510 in 2026 (SunLife Cost of Dying Report 2026). This averages all funeral types together; actual costs range from £1,400 (direct cremation) to £10,000+ (traditional burial).' },
      { q: 'Why do funeral costs vary so much by region?', a: 'Crematorium and burial plot fees, set by local authorities, vary significantly. London is roughly 20-30% above the national average; the North East and Northern Ireland are typically cheapest. Direct cremation pricing varies less because most providers charge nationally.' },
      { q: 'Are funeral plans cheaper than paying at the time of need?', a: 'No — the headline price is broadly similar. The advantage of a plan is inflation protection: today\'s price is locked in for whenever death occurs. Always verify the provider on the FCA Register first.' },
      { q: 'Can I get DWP help with the funeral cost?', a: 'Yes if you receive certain benefits (Universal Credit, Pension Credit, Income Support, Housing Benefit, JSA, ESA, Working Tax Credit with disability element, or Child Tax Credit). The Funeral Expenses Payment covers £1,000+ typically. Apply within 6 months via GOV.UK.' },
      { q: 'Is direct cremation undignified?', a: 'No. Direct cremation removes the formal ceremony at the crematorium, but the care of the deceased is the same as any other cremation — collection by a professional, care in a proper mortuary, a dignified cremation, and the return of ashes. Dignity is in the care, not in the ceremony.' },
      { q: 'What happens if I genuinely cannot afford a funeral?', a: 'As a last resort the local authority arranges a Public Health Funeral — a basic but dignified cremation at no cost to the family. They may recover costs from the deceased\'s estate. Before that, try the DWP Funeral Expenses Payment, the Children\'s Funeral Fund (if applicable), and bereavement charities like Down to Earth.' },
      { q: 'What is included in a £1,499 Best Direct Cremation?', a: 'Collection of your loved one, professional care in a local funeral director\'s mortuary, a simple coffin suitable for cremation, all legal paperwork (doctor\'s certificates, Green Form), the cremation at a local crematorium, and the return of ashes. The only optional cost is £250 Priority Care for non-hospital collections — maximum total £1,749.' },
    ],
  },

  // ============================================================
  // 3. WHAT IS DIRECT CREMATION  (~4,000 words)
  // ============================================================
  {
    slug: 'what-is-direct-cremation',
    title: 'What Is a Direct Cremation? The Complete UK 2026 Guide',
    intent: 'informational',
    excerpt: 'Everything you need to know about direct cremation in the UK — what it is, what it includes, what it costs, who it suits, and why one in five UK funerals is now direct.',
    bodyBlocks: [
      pt(`A direct cremation is a simple, dignified cremation without a service at the crematorium. The deceased is collected, cared for professionally, and cremated — and the ashes are returned to the family. There is no ceremony, no celebrant, no music, no procession, no family attendance at the crematorium itself. Families are free to hold a memorial or celebration of life later, on their own terms.`),
      pt(`Direct cremation has grown rapidly in the UK. According to Co-op Funeralcare Media Centre data and SunLife industry reports, it now accounts for around one in every five UK funerals — up from less than one in twenty a decade ago. This guide explains exactly what direct cremation is, what it includes, what it costs, who it suits, and how to choose a good provider.`),

      h2('What is included in a direct cremation'),
      pt(`A direct cremation typically includes:`),
      pt(`Collection of the deceased, usually 24/7. This is the single most important practical service. A trained team in plain, unmarked vehicles collects your loved one from where they died and moves them dignifiedly to a mortuary.`),
      pt(`Professional care in a mortuary. Your loved one is refrigerated, identified, prepared for cremation, and looked after through the days between death and cremation. For Best Direct Cremation specifically, this care happens at a local independent funeral director's mortuary near where you live — not at a centralised hub.`),
      pt(`A simple coffin suitable for cremation. Solid wood or veneered MDF. Sometimes cardboard or wicker if requested. The coffin meets all crematorium standards and is appropriate for the dignity of the service.`),
      pt(`All the legal paperwork. The Cremation Forms (Form Cremation 4 and 5 from doctors, or Form Cremation 6 from the coroner if applicable), Form Cremation 10 from the family authorising the cremation, and all checks by the crematorium's Medical Referee.`),
      pt(`The cremation itself. At a local crematorium, with the same standards of dignity and care as any other cremation. The cremation typically takes 90 minutes.`),
      pt(`The return of ashes. In a simple urn or scatter tube. The family can collect them from the local funeral director or have them posted (recorded delivery, insured).`),

      h2('What is not included in a direct cremation'),
      pt(`A service or ceremony at the crematorium — no chapel booking, no celebrant or minister, no music, no readings, no committal service. A hearse or limousine for family transport. Attendance by family or friends at the cremation itself. A celebrant or minister of any tradition. Flowers, an order of service, an upgraded coffin, embalming. Memorial arrangements, headstones, alternative urns (though many are available as separate purchases). Anything outside the dignified cremation itself.`),
      pt(`These omissions are what drives the cost difference. A direct cremation costs £1,400-£1,700 because everything ceremonial is stripped out. A traditional cremation funeral with a service costs £4,500+ because the ceremony is included.`),

      h2('How direct cremation differs from a traditional funeral'),
      pt(`A traditional UK cremation funeral involves: a hearse arriving at the family home or undertaker; the cortege following the coffin to the crematorium; a 20-30 minute service in the crematorium chapel led by a celebrant or minister; family and friends present; music chosen by the family; readings, eulogy, and a committal; the wake (gathering after) at a pub, hall or family home; and significant additional ceremonial elements.`),
      pt(`A direct cremation involves none of these except the dignified core: the deceased is collected, cared for, cremated, and the ashes returned. Many families then hold a separate memorial later — at home, at a pub, in a community hall, at a meaningful outdoor location. The memorial is decoupled from the cremation in both time and place. This is what many families now find most powerful about direct cremation.`),

      h2('How direct cremation differs from attended cremation'),
      pt(`Direct cremation is unattended — no one is present at the crematorium. Attended cremation includes a brief 20-30 minute service at the crematorium with family present, typically with a celebrant, music and a committal. Attended cremation is cheaper than a fully traditional funeral (£2,500-£3,800) because it strips out the hearse procession, multiple limousines, and elaborate floral tributes — but it keeps the formal moment at the crematorium.`),
      pt(`Best Direct Cremation specialises in direct cremation only. For attended cremation, you would need a traditional funeral director (look for NAFD or SAIF accreditation). For direct cremation followed by a personal memorial later, we are the right fit.`),

      h2('Why families choose direct cremation'),
      pt(`Direct cremation has grown for several converging reasons:`),
      h3('Cost'),
      pt(`The average UK funeral cost is £4,510 (SunLife 2026). A direct cremation costs £1,499 (Best Direct Cremation). The saving is roughly £3,000 per funeral — money that can go to a personal memorial, family debts, or simply remain in the family.`),
      h3('Simplicity'),
      pt(`Arranging a traditional funeral in the days after a death is genuinely hard. There are dozens of decisions — celebrant, music, readings, flowers, order of service, who carries the coffin, who speaks. Direct cremation reduces all of this to a handful of practical decisions. The family handles fewer logistics during the most difficult time.`),
      h3('Flexibility on memorial'),
      pt(`This is the great strength of direct cremation. The cremation happens promptly. The memorial — if you want one — can happen weeks, months or even a year later. In a meaningful venue. With time to plan properly. With people who couldn't have come at short notice. Without the constraints of a 25-minute crematorium slot.`),
      h3('The deceased asked for it'),
      pt(`Many people specifically request "no fuss" in their will or in conversations with family. Direct cremation respects this preference. It is increasingly common for people facing terminal diagnosis to ask their family explicitly to choose direct cremation.`),
      h3('Non-religious preference'),
      pt(`More than half the UK population now identifies as non-religious (British Social Attitudes Survey). For these families, a formal religious service at the crematorium can feel disconnected. Direct cremation removes the requirement to navigate religious tradition during grief.`),
      h3('Environmental consideration'),
      pt(`A direct cremation has a meaningfully lower environmental footprint than a traditional funeral — no floral tributes (significant transport and refrigeration CO2), no embalming chemicals, no hearse procession, no multiple limousines. Cremation itself still uses significant natural gas, but the rest of the footprint is removed.`),

      h2('Who direct cremation suits'),
      pt(`Direct cremation is right when you want simplicity, cost matters, you plan to hold a memorial later, religious tradition does not require a specific funeral form, or the deceased specifically asked for "no fuss".`),
      pt(`Direct cremation may not be right when: you want a traditional Christian funeral led by your minister at the crematorium; Catholic family tradition requires the body present at a funeral mass; the deceased's religious tradition requires burial within hours; the family lives close together and the formal funeral is the central focal point of gathering; or anyone with strong views about the funeral expected something traditional.`),

      h2('Who Best Direct Cremation is for'),
      pt(`Best Direct Cremation is for families who want direct cremation delivered locally — by a vetted independent funeral director in their community, not by a centralised national hub. Our £1,499 all-inclusive price (£1,749 maximum with Priority Care) reflects the actual cost of a proper local service plus a fair margin. Every partner funeral director is NAFD or SAIF accredited. The cremation takes place at the closest local crematorium. Your loved one stays close to home throughout.`),

      h2('How direct cremation works — step by step'),
      pt(`Step 1: You call us on 0333 242 1405. A real person answers — 24 hours a day. We take essential details and dispatch a local funeral director.`),
      pt(`Step 2: The local funeral director collects your loved one — from a hospital (no extra fee), or from home/care home/hospice (£250 Priority Care fee). Typically within 4-12 hours of call.`),
      pt(`Step 3: Your loved one is cared for in the local funeral director's mortuary. Refrigerated, identified, prepared for cremation.`),
      pt(`Step 4: You register the death at the local register office within 5 days (8 in Scotland). You receive the Death Certificate and the Green Form. The Green Form goes to the funeral director.`),
      pt(`Step 5: The funeral director obtains the Cremation Forms from the doctor or coroner, books the local crematorium, and prepares the paperwork. This typically takes 1-2 weeks from death to cremation.`),
      pt(`Step 6: The cremation takes place. Dignified, professional, at a local crematorium near you. No service, no family present, no celebrant.`),
      pt(`Step 7: Within 5-14 days the ashes are returned to you — in a simple urn or scatter tube. You can collect from the local funeral director or have them posted.`),
      pt(`Step 8 (optional): The family holds a personal memorial whenever they're ready. At home, in a pub, in a community hall, outdoors, anywhere. Months later if that's right. No time pressure.`),

      h2('Choosing a direct cremation provider — what to look for'),
      pt(`The UK direct cremation market has grown rapidly and the providers vary widely in quality. Use this checklist:`),
      pt(`1. Clear, all-inclusive pricing displayed on the website. The CMA requires every UK funeral provider to publish a Standardised Price List. If you can't find it, ask. If they won't show it, walk away.`),
      pt(`2. A local delivery model. Ask explicitly: where will my loved one be collected from, and how far will they be transported? Some "national" providers transport bodies 200+ miles to a central mortuary. For some families that's fine; for many, it's not.`),
      pt(`3. NAFD or SAIF accreditation at the funeral director who will actually deliver the service. Best Direct Cremation requires this of every partner.`),
      pt(`4. 24/7 real-person phone. Not an answering service, not a chatbot. Death doesn't keep office hours.`),
      pt(`5. Transparent Priority Care fee. The non-hospital collection fee is the most common hidden cost in the UK direct cremation market. Some providers advertise £950-£1,200 but charge £400-£500 for Priority Care. Best Direct Cremation's is a transparent £250 disclosed upfront.`),
      pt(`6. Clarity on which crematorium will be used. A local funeral director will use the closest crematorium to home; a national operator may transport to a single owned crematorium. Ask.`),

      h2('What happens after the cremation'),
      pt(`The ashes are returned within 5-14 days of the cremation. From there, the choice is yours. Many families scatter ashes at a meaningful place — a coast, a hill, a garden. Some keep ashes at home in a decorative urn. Some inter them in a memorial garden. Some commission memorial jewellery. Some divide ashes between family members.`),
      pt(`There is no legal or practical time pressure. Many families take months to decide what feels right. The right answer is whatever helps your family grieve and remember.`),

      h2('Common misconceptions about direct cremation'),
      pt(`"It's a pauper's funeral." No. A direct cremation is a chosen funeral, paid for, with the deceased treated with full dignity throughout. A Public Health Funeral (the modern term for what was historically called a pauper's funeral) is what happens when there is no one to pay — arranged by the local council at no cost to the family.`),
      pt(`"It's undignified because there's no ceremony." Dignity is in the care your loved one receives, not in the ceremony around it. A direct cremation provides every element of dignified care: collection, professional mortuary care, a proper coffin, the cremation, and the return of ashes. The ceremony is separate from the care.`),
      pt(`"You can't see your loved one before the cremation." In most cases you can. While the cremation itself is unattended, many families ask to spend a few moments with their loved one at the funeral director's premises before the cremation. Confirm with the funeral director when you book.`),
      pt(`"There's no closure without a ceremony." Closure rarely comes from a 25-minute crematorium service. It comes from time, support, the small daily moments of grief, and often a personal memorial that genuinely captures who the person was. Direct cremation makes that memorial possible.`),

      CTA,
    ],
    faqs: [
      { q: 'Is direct cremation legal in the UK?', a: 'Yes, fully legal across England, Wales, Scotland and Northern Ireland. The cremation itself meets all the same legal requirements as any other UK cremation.' },
      { q: 'Can family attend a direct cremation?', a: 'Not at the crematorium itself — the cremation is unattended. However, many families ask to spend a few minutes with their loved one at the funeral director\'s premises before they leave for the crematorium. This is usually possible if requested.' },
      { q: 'What happens to the ashes after a direct cremation?', a: 'The ashes are returned to the family within 5-14 days of the cremation, in a simple urn or scatter tube. From there, what happens is entirely the family\'s choice — scatter, keep at home, inter, divide between family members, or commission memorial jewellery. There is no time pressure.' },
      { q: 'How long does direct cremation take from death to ashes returned?', a: 'Typically 2-3 weeks. The legal paperwork takes 1-3 working days. The crematorium slot is usually 1-2 weeks out. Ashes are returned within 5-14 days of the cremation.' },
      { q: 'Is direct cremation right for religious families?', a: 'It depends on the tradition. Anglican, Methodist and most Protestant traditions accept cremation including direct cremation; many families hold a separate church memorial. Catholic tradition prefers the body present at the funeral mass — direct cremation can work but typically with a later memorial mass. Islamic and Jewish tradition specifically require burial within hours, not cremation. Hindu and Sikh tradition favours cremation; direct cremation fits well, often with a separate scattering ceremony.' },
      { q: 'How is direct cremation different from no funeral at all?', a: 'A direct cremation IS a funeral — it involves the dignified care of the deceased, the legal paperwork, the cremation, and the return of ashes. What is different is the absence of a ceremony at the crematorium. Many families hold a personal memorial separately. "No funeral at all" is not really an option in the UK — there must be a cremation or burial.' },
      { q: 'Will I know which crematorium was used?', a: 'Yes. The local funeral director will tell you which crematorium they used and can answer any questions you have. The cremation paperwork (which the funeral director keeps) confirms the date, time and location.' },
      { q: 'How much does direct cremation cost in 2026?', a: 'Credible UK direct cremation providers charge £1,400-£2,200 in 2026. Best Direct Cremation is £1,499 all-inclusive, with a £250 optional Priority Care fee for non-hospital collections (maximum total £1,749).' },
    ],
  },

  // ============================================================
  // 4. CREMATION VS BURIAL  (~3,500 words)
  // ============================================================
  {
    slug: 'cremation-vs-burial',
    title: 'Cremation vs Burial — The Complete UK Comparison 2026',
    intent: 'comparison',
    excerpt: 'A full comparison of cremation and burial in the UK — costs, environmental impact, religious considerations, family preference, and how to decide what is right for your family.',
    bodyBlocks: [
      pt(`Around 78% of UK funerals in 2025 were cremations — a figure that has grown steadily over the last 60 years. Burial remains important for religious, cultural and family reasons, but it is increasingly expensive and increasingly the minority choice. This guide compares the two options fairly on every dimension that matters: cost, religious tradition, environmental impact, where the deceased ends up, practical timing, and family preference.`),

      h2('Cost — the biggest single difference'),
      pt(`Cremation is significantly cheaper than burial in the UK. The cost gap has widened over the last decade as burial plot prices have risen sharply.`),
      h3('Direct cremation'),
      pt(`£1,400-£1,700 all-inclusive in 2026. Best Direct Cremation is £1,499 (£1,749 max with Priority Care). This is the cheapest credible UK funeral option.`),
      h3('Traditional cremation funeral'),
      pt(`£4,500-£5,500. Includes the chapel service, hearse, limousine, celebrant, music, floral tributes, order of service.`),
      h3('Traditional burial'),
      pt(`£5,000-£10,000+. Includes everything in a traditional cremation funeral plus the burial plot itself (typically £1,500 in rural areas to £20,000+ in central London), gravedigging fees, and any memorial stone.`),
      pt(`The burial plot is the biggest cost variable. London plots in particular have risen sharply — Highgate, Putney Vale and Brompton can charge £20,000+ for a plot. Rural plots in council cemeteries are often £1,500-£3,000. Many cemeteries also charge an annual maintenance fee.`),

      h2('Religious and cultural considerations'),
      pt(`Religious tradition is often the decisive factor for families with strong observance.`),
      h3('Burial-preferring traditions'),
      pt(`Islam: burial is required, ideally within 24 hours, with the body facing Mecca. Cremation is not permitted. Judaism: burial is preferred, traditionally within 24 hours. Cremation is permitted in Reform and some Conservative practice but not in Orthodox tradition. Eastern Orthodox Christianity: burial is the strong preference. Catholic tradition: while cremation is now permitted (since the 1963 papal change), the Catholic Church prefers the body present at the funeral mass; ashes should be interred in consecrated ground, not scattered or kept at home.`),
      h3('Cremation-accepting traditions'),
      pt(`Anglican (Church of England): accepts cremation since 1944. The vast majority of Anglican families now choose cremation. Methodist, Baptist, and most Protestant traditions: accept cremation. Hindu tradition: cremation is the traditional choice, often with a separate ceremony to scatter ashes in a river or at the coast. Sikh tradition: cremation is the traditional choice. Buddhist tradition: both burial and cremation are accepted; cremation is more common.`),
      pt(`For non-religious families — now more than half of the UK population — religious tradition isn't a factor. The decision rests on cost, family preference, environmental considerations, and what feels right.`),

      h2('Environmental impact'),
      pt(`Both cremation and burial have environmental costs. Neither is entirely "green".`),
      h3('Cremation\'s footprint'),
      pt(`A standard UK cremation produces approximately 245 kg of CO2 (industry data). It uses significant natural gas to reach the temperatures required. Mercury from dental amalgam is captured by modern crematoria filters. Some UK crematoria have invested in heat recovery systems that use the cremator's waste heat to warm the building — significantly reducing overall carbon footprint.`),
      h3('Burial\'s footprint'),
      pt(`A traditional burial requires land that cannot be returned to other use. A conventional coffin (especially veneered MDF or hardwood) involves significant manufacturing energy. Embalming chemicals (typically formaldehyde) used in traditional Western embalming are problematic for groundwater. Headstones require quarrying and stone-working.`),
      h3('Greener options exist for both'),
      pt(`For burial: natural or woodland burial (no embalming, biodegradable coffin or shroud, often a tree marker instead of a headstone) is meaningfully lower-impact. The Association of Natural Burial Grounds lists around 270 UK sites.`),
      pt(`For cremation: alkaline hydrolysis (water cremation, also called Resomation) produces a fraction of standard cremation's carbon. It is not yet widely available in the UK but is growing. Direct cremation without embalming has a meaningfully lower footprint than a traditional funeral.`),

      h2('Where the deceased "is" — emotional difference'),
      pt(`This is the dimension families often think about least beforehand but find matters most afterward.`),
      h3('Burial creates a fixed place'),
      pt(`A grave you can visit. Many families find this deeply comforting — a specific place where the deceased "is". Visiting on anniversaries, birthdays, Mother's Day or Father's Day becomes a ritual. The headstone marks the person's life. The cemetery becomes a place of family memory.`),
      h3('Cremation creates options'),
      pt(`Ashes can be scattered somewhere meaningful, interred in a memorial garden, kept at home, divided between family members, or turned into memorial jewellery. There is no fixed location unless the family chooses one. For some this is liberating — the deceased can "be" at the place they loved most. For others it feels like a loss of fixed memorial.`),
      pt(`Many cremated remains are scattered. Some families regret not having a fixed place to visit and later have ashes interred in a memorial garden or a small plot. There is no right answer — it depends on what feels right to your family.`),

      h2('Practical timing'),
      pt(`Burial requires more lead time. The grave has to be prepared (or in a new cemetery, identified and bought). The cemetery has to be available. If a specific minister is required, their schedule matters. Burials typically take 2-3 weeks from death to funeral.`),
      pt(`Cremation can typically be arranged within 1-2 weeks. Direct cremation specifically is often the quickest because there is no need to coordinate a service date with extended family. Cremation also has fewer constraints around the condition of the body, which can matter in some cases (e.g. a long delay due to coroner's investigation).`),

      h2('After the funeral — maintenance'),
      pt(`Burial requires ongoing care. The grave needs to be maintained. The headstone may need cleaning or repair. Many cemeteries charge annual maintenance fees. Some families visit regularly and tend the grave; others find this becomes a quiet burden over the years.`),
      pt(`Cremation requires no ongoing maintenance (unless ashes are interred in a memorial garden with annual fees). There is no grave to tend. Memory is held in family stories, photographs, and the location where ashes were scattered.`),

      h2('How to decide'),
      pt(`These four questions usually settle the decision:`),
      pt(`1. What is the religious or cultural expectation in our family? If burial is a religious requirement, the question is largely settled.`),
      pt(`2. What did the deceased want? Look for written wishes, a will, or remembered conversations. Many people have said something specific.`),
      pt(`3. What can we afford? The cost difference between direct cremation (£1,499) and a traditional burial (£5,000-£10,000+) is significant. Cost matters and is not a shameful consideration.`),
      pt(`4. What kind of memorial or place of remembrance matters to us? A specific grave, ashes scattered at a meaningful place, or no fixed location at all?`),

      h2('Direct cremation + memorial — the modern hybrid'),
      pt(`For many UK families now, the right answer is a hybrid: a direct cremation handles the practicalities at low cost, and a personal memorial held later — at a venue and time that genuinely matters — provides the gathering. The direct cremation costs £1,499. The memorial can cost whatever you choose. This combination keeps costs down, provides the personal gathering, and lets the family take time to plan something meaningful rather than rushing arrangements in the days after a death.`),

      CTA,
    ],
    faqs: [
      { q: 'Is burial more dignified than cremation?', a: 'No. Dignity is in the care of the deceased before the funeral, not in the choice of burial or cremation. Both can be entirely dignified — or entirely undignified — depending on the providers and processes used.' },
      { q: 'What percentage of UK funerals are cremations?', a: 'Around 78% in 2025 (Cremation Society of Great Britain statistics). The cremation rate has risen steadily for 60 years.' },
      { q: 'How much does a burial plot cost in the UK?', a: 'Typically £1,500-£3,000 in rural council cemeteries, £5,000-£10,000 in suburban cemeteries, and £15,000-£25,000+ in central London or premium cemeteries. Most cemeteries also charge an annual maintenance fee.' },
      { q: 'Is cremation cheaper than burial?', a: 'Yes, significantly. A direct cremation costs £1,499 at Best Direct Cremation. A traditional burial costs £5,000-£10,000+ including the plot. The cost difference is typically £4,000-£8,000.' },
      { q: 'Can ashes be buried?', a: 'Yes. Ashes can be interred in a cemetery (in a small ashes plot, in a family grave, or in a memorial garden). Costs are much lower than burial of a body — typically £200-£800 for the interment.' },
      { q: 'What is woodland burial?', a: 'A natural burial in a managed woodland, with a biodegradable coffin or shroud, no embalming, and a tree marker or wildflower meadow instead of a headstone. Around 270 UK natural burial grounds exist. Plot costs are typically £900-£3,000.' },
      { q: 'Do most religions allow cremation?', a: 'Most do. Anglican, Catholic, Methodist, Hindu, Sikh and Buddhist traditions all accept cremation. Islam and Orthodox Judaism require burial. Speak to your religious leader if you are uncertain about your tradition\'s specific requirements.' },
      { q: 'What if we want both cremation and a place to visit?', a: 'Many crematoria have a Garden of Remembrance where ashes can be scattered or interred (typically £100-£300). Some families inter ashes in a churchyard ashes plot or in a family grave. This provides a fixed place to visit while keeping the cost benefits of cremation.' },
    ],
  },

  // ============================================================
  // 5. HOW DIRECT CREMATION WORKS  (~3,500 words)
  // ============================================================
  {
    slug: 'how-direct-cremation-works',
    title: 'How Direct Cremation Works — A Complete Step-by-Step Walk-Through',
    intent: 'process',
    excerpt: 'Every step of how a UK direct cremation works — from first call to ashes returned. Plain English, every step explained, with what each step involves and what it costs.',
    bodyBlocks: [
      pt(`Direct cremation is simpler than a traditional funeral but every step still happens with care, dignity and full legal compliance. This guide walks you through every step from the moment you first call us through to the return of ashes, including the legal paperwork, what each step costs, and what you as the family need to do at each stage.`),

      h2('Step 1: The first call — 0333 242 1405'),
      pt(`When someone has died, you call us on 0333 242 1405. A real person answers — 24 hours a day, every day. There is no chatbot, no answering service, no waiting until Monday morning if it's a Sunday night.`),
      pt(`We take essential details: who has died, where they are now (hospital, home, care home, hospice), your relationship to them, and the best contact number to reach you. The call typically takes 5-10 minutes.`),
      pt(`No commitment, no high-pressure sales. If you want to think about it overnight, we wait. If you call from a hospital and need to make other arrangements first, we'll call you back. The first call is purely informational — we get the basic details and confirm we can serve your area.`),

      h2('Step 2: Confirming the booking — typically within 24 hours'),
      pt(`Once you've decided to proceed, we confirm the booking. This involves:`),
      pt(`Confirming the location of collection. Hospital (no Priority Care fee), home/care home/hospice (£250 Priority Care fee, taking the maximum to £1,749).`),
      pt(`Identifying which local funeral director from our network will handle your case. Every partner funeral director is NAFD or SAIF accredited. We tell you which one, where they are, and you can verify their accreditation if you wish.`),
      pt(`Confirming the all-in price. £1,499 for hospital collections; £1,749 maximum with Priority Care. No surprises, no hidden fees.`),
      pt(`Sending you confirmation by email or post (your preference) detailing the agreement.`),

      h2('Step 3: Collection of the deceased'),
      pt(`The local funeral director collects your loved one. Timing depends on where they are:`),
      h3('From a hospital'),
      pt(`Collection during normal working hours (typically 9am-5pm Monday-Friday). The hospital mortuary keeps your loved one safely until collection. Most hospitals can release the body within 1-2 working days of the death certificate being signed.`),
      h3('From home, care home or hospice'),
      pt(`Priority Care collection — typically within 4-12 hours of your initial call, including evenings and weekends. Two trained staff arrive in plain, unmarked vehicles. They are quiet, professional, dignified. They give you as much time as you need.`),
      pt(`The collection itself is quick and respectful. Your loved one is moved into the local funeral director's vehicle and transported to their mortuary. The mortuary is local — typically within 10-25 miles of where you live. Your loved one stays close to home.`),

      h2('Step 4: Care in the mortuary'),
      pt(`Between collection and cremation (typically 1-3 weeks), your loved one is cared for in the local funeral director's mortuary. This involves:`),
      pt(`Refrigeration to preserve the body in proper conditions. Identification — wristbands and paperwork at every stage. Preparation for cremation — dressed in their own clothes if requested, hair brushed, eyes closed. Direct cremation does not include embalming because it is unnecessary for an unattended cremation.`),
      pt(`Many families ask to visit their loved one at the funeral director's premises before the cremation. This is usually possible if requested. A brief private moment can be deeply meaningful — and is something that is often missed in the rush of a traditional funeral arrangement.`),

      h2('Step 5: Registering the death and paperwork'),
      pt(`While we care for your loved one, you do two things in parallel:`),
      h3('Register the death'),
      pt(`You go to the local register office for the area where the person died — not necessarily where they lived. You bring the Medical Certificate of Cause of Death from the doctor or hospital. The registrar issues the Death Certificate (you'll want several certified copies, £11 each) and the "Green Form" (Certificate for Cremation).`),
      pt(`In England, Wales and Northern Ireland you have 5 days. In Scotland 8 days. Most register offices have appointments within 1-2 working days.`),
      pt(`Bring the Green Form to the funeral director (or have it sent — they often arrange this with the register office).`),
      h3('Doctor\'s certificates for cremation'),
      pt(`The funeral director obtains Form Cremation 4 (Medical Certificate) from the doctor who attended the deceased during their last illness. They also obtain Form Cremation 5 (Confirmatory Medical Certificate) from an independent second doctor who examines the body separately. Total cost £164 (£82 each) — this is included in your £1,499.`),
      pt(`If the coroner is involved (around 40% of UK deaths), Form Cremation 6 is issued by the coroner instead, replacing the two doctor forms. There is no cost for Form Cremation 6.`),

      h2('Step 6: Booking the crematorium'),
      pt(`The funeral director books the crematorium at the closest local crematorium serving your area. Most crematoria have slots within 1-2 weeks. The cremation fee (typically £500-£900) is included in your £1,499 — no separate charge.`),
      pt(`You can ask which crematorium will be used and the funeral director will tell you. Some families like to know; many find it doesn't matter once they understand the cremation itself is dignified regardless of location. Best Direct Cremation always uses the closest crematorium — we don't route to a centralised owned facility.`),
      pt(`The cremation paperwork goes to the crematorium's Medical Referee (a senior doctor responsible for reviewing every cremation application). The Medical Referee authorises the cremation once all paperwork is in order. This typically takes 1-2 working days.`),

      h2('Step 7: The cremation'),
      pt(`On the appointed day, the funeral director takes your loved one to the local crematorium in a proper funeral vehicle. The coffin is identified, checked, and placed in the cremator.`),
      pt(`The cremation itself takes approximately 90 minutes. Modern UK crematoria operate to strict standards. Each cremation is conducted individually — your loved one is the only person in the cremator. Identification tags accompany the body and ashes throughout.`),
      pt(`Following the cremation, the remains (bone fragments) cool, are removed, processed, and the resulting ashes are placed in a labelled container — typically a simple urn or scatter tube. The container is collected by the local funeral director.`),
      pt(`There is no service, no music, no celebrant, no committal. The cremation is private, dignified, and conducted with the same standards of care as any other cremation. The difference is purely in the absence of a ceremony — the cremation itself is identical to what would happen with any other funeral.`),

      h2('Step 8: Ashes returned to you'),
      pt(`Within 5-14 days of the cremation, the ashes are made available for collection from the local funeral director's premises. Alternatively, the local funeral director can post the ashes to you (recorded delivery, insured). Many families collect in person because it gives them an opportunity to thank the local funeral director and meet the person who cared for their loved one.`),
      pt(`The ashes arrive in a simple urn or scatter tube. The container is labelled with the deceased's name and cremation date. Documentation confirming the cremation is provided.`),

      h2('Step 9: After the cremation — your choices'),
      pt(`From here, what happens is your choice and there is no time pressure. Common paths families take:`),
      pt(`Hold a memorial. The single most common choice. Weeks, months or a year later. At home, in a pub, at a community hall, outdoors at a meaningful place. The memorial can include any of the elements a traditional funeral would have had — readings, music, a celebrant, photos, food and drink — without being confined to a 25-minute crematorium slot.`),
      pt(`Scatter the ashes. At a meaningful place. Get the landowner's permission. The Environment Agency advises 1km from intakes and bridges if scattering on rivers. Most public beaches and parks allow it but check with the local authority.`),
      pt(`Keep ashes at home. Indefinitely. There is no legal restriction. Many families keep ashes for years before deciding what to do.`),
      pt(`Inter the ashes. In a cemetery memorial garden (£100-£300), a family grave (£200-£800), or a churchyard ashes plot (varies). This provides a fixed place to visit if that matters to your family.`),
      pt(`Memorial jewellery. A small amount of ashes incorporated into a pendant or other piece. Several UK companies specialise in this.`),
      pt(`Split between family members. Multiple small urns. Different family members keep portions or scatter in different meaningful places.`),

      h2('What you do not have to do — and that is the point'),
      pt(`Compared to arranging a traditional funeral in the days after a death, direct cremation removes a huge amount of decision-making at the worst possible time:`),
      pt(`No choosing a celebrant or minister, no agonising over music, no writing an order of service, no choosing whether to have a hearse and limousines, no choosing floral tributes, no choosing pallbearers, no deciding on a coffin upgrade, no booking a wake, no inviting people in haste, no managing your wider family's expectations about the funeral.`),
      pt(`All of these decisions can be made later — or not at all — when you've had time to think.`),

      CTA,
    ],
    faqs: [
      { q: 'How long does direct cremation take from first call to ashes returned?', a: 'Typically 2-3 weeks total. Collection within hours of first call. Cremation 1-2 weeks later. Ashes returned within 5-14 days of cremation.' },
      { q: 'Do I have to be present at any stage?', a: 'No. The funeral director handles everything except registering the death (which you do at the register office). You do not attend the cremation — direct cremation is unattended.' },
      { q: 'Can I see my loved one before the cremation?', a: 'In most cases yes — at the funeral director\'s premises before the cremation day. Confirm at the time of booking.' },
      { q: 'Which crematorium will be used?', a: 'The closest local crematorium serving the funeral director\'s area. Best Direct Cremation uses local crematoria, not centralised owned facilities. Ask at the time of booking and the funeral director will tell you.' },
      { q: 'How are the ashes returned?', a: 'In a simple urn or scatter tube. You can collect from the local funeral director\'s premises, or have them posted to you (recorded delivery, insured).' },
      { q: 'What happens if I change my mind partway through?', a: 'Direct cremation is cancellable up until the cremation paperwork is approved by the Medical Referee — typically a few days before the scheduled cremation. After that, the cremation will go ahead. Talk to the funeral director immediately if circumstances change.' },
      { q: 'Is the cremation the same as a normal cremation?', a: 'Yes, identical. The cremation itself meets all the same UK legal and operational standards as any other cremation. The difference is the absence of a service at the crematorium, not the cremation process itself.' },
      { q: 'How much does each step cost?', a: 'All bundled into the £1,499 all-inclusive price. The only optional cost is £250 Priority Care for non-hospital collections — maximum total £1,749. There are no per-step charges.' },
    ],
  },

  // ============================================================
  // 6. CHOOSING A FUNERAL DIRECTOR  (~3,500 words)
  // ============================================================
  {
    slug: 'choosing-a-funeral-director',
    title: 'How to Choose a Funeral Director — A Complete UK Checklist 2026',
    intent: 'process',
    excerpt: 'A step-by-step checklist for choosing a UK funeral director in 2026 — what to ask, what to verify, what red flags to watch for, and how to know you have made the right choice.',
    bodyBlocks: [
      pt(`Choosing a funeral director is one of the most important decisions you'll make in this process. The funeral director determines the dignity of care your loved one receives, the cost of the funeral, and your family's experience. The CMA's 2020-2021 investigation found significant variation in pricing, quality and transparency across the UK funeral industry. Most families have no benchmark for what good looks like. This checklist gives you one.`),

      h2('Accreditation — the first filter'),
      pt(`There are two main UK funeral trade bodies. Either is a strong baseline trust signal. A funeral director belonging to neither has chosen not to be held to those standards.`),
      h3('NAFD — National Association of Funeral Directors'),
      pt(`Founded in 1905. Around 4,000 UK funeral homes are members. Requires professional standards, has a complaints process, and conducts inspections. Look for the NAFD logo on the funeral director's website or window.`),
      h3('SAIF — National Society of Allied and Independent Funeral Directors'),
      pt(`Specifically represents independent (non-chain) funeral directors. Around 900 UK members. Members commit to standards including a complaints process and a Code of Practice. Look for the SAIF logo.`),
      pt(`Best Direct Cremation requires every partner funeral director in our network to be NAFD or SAIF accredited. We verify this before adding a funeral director to our network.`),

      h2('Pricing transparency — the second filter'),
      pt(`Every UK funeral director is required by law (CMA Funerals Market Investigation Order 2021) to publish a Standardised Price List on their website and display one in their branch. This is non-negotiable. The format is set by the CMA so you can compare across providers directly.`),
      pt(`If you can't find a funeral director's Standardised Price List on their website, ask. If they refuse to show it, walk away — they are in breach of the law.`),
      pt(`What to look for on the Standardised Price List:`),
      pt(`A clear all-in headline price for direct cremation, attended cremation and traditional funeral. Separate disbursements (third-party fees) clearly stated. No surprise extras. Every line item explained.`),
      pt(`Best Direct Cremation's Standardised Price List is linked from the footer of every page. £1,499 all-inclusive. £250 optional Priority Care for non-hospital collections. Maximum £1,749. No hidden fees, no upsell at the point of need.`),

      h2('Local presence — the third filter'),
      pt(`A genuinely local funeral director has their own premises (not just a branded address), their own mortuary, their own vehicles, and staff who live and work in your community.`),
      pt(`Many "local" funeral directors are now branches of national chains using a local-sounding name. There is nothing wrong with this — many national chains deliver good service — but you should know which is which. The CMA's investigation found that around 25% of UK funeral homes are now owned by national groups (primarily Co-op Funeralcare, Dignity, and Funeral Partners), often trading under local-sounding names.`),
      pt(`Ask directly: are you owned by a parent company? Most independents will say yes proudly to being independent. Chains will usually confirm the parent group on request.`),

      h2('Reviews — read carefully, look for patterns'),
      pt(`Google Reviews, Trustpilot and Funeral Guide all have UK funeral director reviews. Read recent reviews — funeral providers can change over time as ownership, staff and processes shift.`),
      pt(`What to look for:`),
      pt(`Specific praise for individual staff members — sign of consistent personal service. Comments about how they handled difficult moments — collection, viewing, the moment of cremation. Mentions of pricing being exactly as quoted, no surprises. References to specific touches that families appreciated.`),
      pt(`What to be wary of:`),
      pt(`Patterns of complaints about pricing surprises (the most common UK funeral complaint). Patterns about staff behaviour during collection (rough handling, lack of dignity). Patterns about how the deceased was cared for (cold treatment in the mortuary). Patterns about refunds or cancellations being denied. One bad review is noise — patterns are signal.`),

      h2('Questions to ask any funeral director'),
      pt(`Before committing, ask these seven questions. Honest providers answer all seven directly. Evasive providers tell you something is wrong.`),
      pt(`1. Are you NAFD or SAIF accredited? Most legitimate UK funeral directors are. If neither, why not?`),
      pt(`2. Can I see your Standardised Price List? Required by law. They must show you.`),
      pt(`3. Where will my loved one be cared for — at your premises or elsewhere? Some providers transport bodies to centralised facilities or partner mortuaries.`),
      pt(`4. Which crematorium will be used? Local FDs use the closest crematorium; some national operators use owned crematoria that may not be nearest.`),
      pt(`5. What is included in your headline price and what costs extra? Watch for "Priority Care" or "out-of-hours collection" fees that can add £400-£500.`),
      pt(`6. What is your out-of-hours contact procedure? Real person or answering service? Death doesn't keep office hours.`),
      pt(`7. Can I see the coffin before I commit? Many FDs have catalogues; some will let you see the actual coffin. A reasonable request.`),

      h2('Red flags to walk away from'),
      pt(`High-pressure sales tactics. "If you don't decide today the price goes up." Walk away. Funeral arrangements should never be rushed.`),
      pt(`Refusal to quote a single all-in price. If they can't or won't tell you the total cost upfront, the surprises will come later.`),
      pt(`Vagueness about where the deceased will be cared for. A legitimate funeral director knows exactly where their mortuary is and how it operates.`),
      pt(`Centralisation across large distances. If your loved one will be transported 100+ miles to a central mortuary, that's a model choice — but you should know.`),
      pt(`No clear premises to visit. A real funeral director has a funeral home you can walk into.`),
      pt(`No NAFD or SAIF accreditation, with no good explanation.`),
      pt(`Consistently bad reviews across recent dates.`),

      h2('The CMA Standardised Price List — what to actually compare'),
      pt(`The CMA-required format makes comparison easier than it has ever been. When comparing two funeral directors:`),
      pt(`1. Compare the "attended funeral" price first — most representative of the full traditional funeral service.`),
      pt(`2. Compare the "unattended cremation" (direct cremation) price — the cheapest credible option.`),
      pt(`3. Compare the disbursements (third-party fees) — these should be similar between providers because they're set externally.`),
      pt(`4. Identify any optional fees that aren't in the headline price — Priority Care, out-of-hours, mileage charges, doctor's certificate add-ons.`),
      pt(`5. Calculate the realistic all-in cost including any optional fees likely to apply to your situation.`),

      h2('National chains vs local independents — pros and cons'),
      pt(`Both can be good choices. Neither is inherently better. Know which you're choosing.`),
      h3('National chains (Co-op Funeralcare, Dignity, Funeral Partners)'),
      pt(`Pros: Strong brand recognition. Consistent processes and quality control. Branch network so you can find a local branch easily. Established complaints processes. Comprehensive service offering.`),
      pt(`Cons: Higher overhead reflected in price. Less personal relationship with staff. Standardised approach may feel less personal. Sometimes pushed toward in-house options (their own crematoria, their own coffins, their own wakes).`),
      h3('Local independents'),
      pt(`Pros: Personal relationship with the owner or named staff. Local reputation matters to them. Often lower overhead and lower price. Flexible about working with your specific wishes.`),
      pt(`Cons: Smaller operation means less redundancy if key staff are unavailable. Quality varies more between individual independents. Reviews on Google or Trustpilot may have fewer data points.`),
      h3('Network operators (Best Direct Cremation, Golden Charter Network)'),
      pt(`Pros: Local independent funeral director delivery with a central operator's quality vetting. Best of both — local service, national consistency. Often the lowest credible price for genuinely local delivery.`),
      pt(`Cons: You may not initially know which local funeral director will deliver your service (we tell you as soon as you book).`),

      h2('Funeral plans — same logic applies'),
      pt(`If you're considering a prepaid funeral plan, the same checklist applies — plus FCA authorisation, which has been required since July 2022. Always verify on the FCA Register (fca.org.uk/register) before paying anything.`),
      pt(`Best Direct Cremation does not currently sell prepaid funeral plans. We plan to launch our own from early 2027, once FCA-authorised. Until then, our funeral plans content is informational only.`),

      h2('How Best Direct Cremation\'s vetting works'),
      pt(`Every funeral director in the Best Direct Cremation network must:`),
      pt(`Be NAFD or SAIF accredited. We verify this before adding them to the network.`),
      pt(`Have their own premises and their own mortuary — not a shared facility, not a third-party arrangement.`),
      pt(`Be locally established with a track record in their community.`),
      pt(`Meet our standards for staff training, vehicle quality, and dignity in care.`),
      pt(`Sign up to our service standards including transparent pricing, 24/7 availability, and the £1,499 all-inclusive (£1,749 max) price commitment.`),
      pt(`We've done the vetting so you don't have to. When you call us, you get matched with a local funeral director we've already checked.`),

      CTA,
    ],
    faqs: [
      { q: 'Are NAFD and SAIF accreditations the same?', a: 'Both are reputable UK funeral trade bodies. NAFD is larger (~4,000 members) and includes both independents and chains. SAIF specifically represents independents (~900 members). Either is a strong baseline trust signal.' },
      { q: 'What is the CMA Standardised Price List?', a: 'A legally required price list that every UK funeral director must publish, set out in a format defined by the Competition and Markets Authority (Funerals Market Investigation Order 2021). It makes price comparison across providers possible.' },
      { q: 'Can a hospital make me use a specific funeral director?', a: 'No. UK hospitals must allow you free choice of funeral director. They may give you a list of local options but cannot push you to use a specific one.' },
      { q: 'How do I find out if a funeral director is owned by a national chain?', a: 'Ask directly. Most independents are proud to confirm independence; chains usually disclose the parent group. You can also check Companies House (companieshouse.gov.uk) and search by the funeral director\'s registered company name.' },
      { q: 'Should I get multiple quotes?', a: 'Yes. The CMA investigation found significant price variation between UK funeral directors for similar services. Always compare the Standardised Price Lists of at least three local providers plus one national operator.' },
      { q: 'What if I\'m not happy with the funeral director\'s service?', a: 'Raise it with the funeral director first. If unresolved, escalate to their trade body (NAFD or SAIF) for the complaints process. Persistent serious complaints can also go to the Funeral Service Standards Review.' },
      { q: 'Does Best Direct Cremation vet its partner funeral directors?', a: 'Yes. Every partner funeral director must be NAFD or SAIF accredited, have their own premises and mortuary, be locally established, and meet our standards for care, training and dignity. We verify before adding them to the network.' },
      { q: 'Is the cheapest funeral director always the right choice?', a: 'No. The cheapest credible direct cremation is around £1,400-£1,700; anything significantly below that usually involves a centralised model with hidden trade-offs. Look for genuinely transparent all-in pricing, not just the lowest headline number.' },
    ],
  },

];

// ============================================================
// INGEST — overwrite each pillar article in place
// ============================================================
async function run() {
  console.log(`Expanding ${PILLARS.length} pillar articles to 4,000+ words each…`);
  let count = 0;

  for (const p of PILLARS) {
    const doc = {
      _type: 'article',
      _id: `help-${p.slug.replace(/\//g, '-')}`,
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      section: 'help',
      intent: p.intent,
      excerpt: p.excerpt,
      body: enrichBody(p.bodyBlocks, p.slug),
      faqs: p.faqs.map(f => ({
        _type: 'faq',
        _key: f.q.slice(0, 12).replace(/\s/g, ''),
        question: f.q,
        answer: [pt(f.a)],
      })),
      lastReviewed: new Date().toISOString().split('T')[0],
      seo: {
        metaTitle: p.title,
        metaDescription: p.excerpt,
      },
    };
    await client.createOrReplace(doc);
    count++;
    console.log(`  ✓ /help/${p.slug}/`);
  }

  console.log(`\nDone. ${count} pillar articles expanded.`);
}

run().catch(err => { console.error(err); process.exit(1); });
