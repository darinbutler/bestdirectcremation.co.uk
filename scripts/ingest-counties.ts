/**
 * Sanity ingestion v3 — counties with all 11 long-form sections populated.
 *
 * Each of the 91 counties is created with a complete ~2,500-word long-form
 * body so the page is publishable as soon as it's created. Editors can
 * extend with locality-specific facts in Sanity Studio.
 *
 * Usage:
 *   export SANITY_API_WRITE_TOKEN=sk...
 *   npx tsx scripts/ingest-counties.ts
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

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-10-01', useCdn: false, token: TOKEN,
});

type Country = 'England' | 'Wales' | 'Scotland' | 'Northern Ireland';
type County = { name: string; slug: string; country: Country; region: string };

const COUNTIES: County[] = [
  // England (47)
  { name: 'Bedfordshire', slug: 'bedfordshire', country: 'England', region: 'East' },
  { name: 'Berkshire', slug: 'berkshire', country: 'England', region: 'South East' },
  { name: 'Bristol', slug: 'bristol', country: 'England', region: 'South West' },
  { name: 'Buckinghamshire', slug: 'buckinghamshire', country: 'England', region: 'South East' },
  { name: 'Cambridgeshire', slug: 'cambridgeshire', country: 'England', region: 'East' },
  { name: 'Cheshire', slug: 'cheshire', country: 'England', region: 'North West' },
  { name: 'Cornwall', slug: 'cornwall', country: 'England', region: 'South West' },
  { name: 'County Durham', slug: 'county-durham', country: 'England', region: 'North East' },
  { name: 'Cumbria', slug: 'cumbria', country: 'England', region: 'North West' },
  { name: 'Derbyshire', slug: 'derbyshire', country: 'England', region: 'East Midlands' },
  { name: 'Devon', slug: 'devon', country: 'England', region: 'South West' },
  { name: 'Dorset', slug: 'dorset', country: 'England', region: 'South West' },
  { name: 'East Sussex', slug: 'east-sussex', country: 'England', region: 'South East' },
  { name: 'East Yorkshire', slug: 'east-yorkshire', country: 'England', region: 'Yorkshire and Humber' },
  { name: 'Essex', slug: 'essex', country: 'England', region: 'East' },
  { name: 'Gloucestershire', slug: 'gloucestershire', country: 'England', region: 'South West' },
  { name: 'Greater London', slug: 'london', country: 'England', region: 'London' },
  { name: 'Greater Manchester', slug: 'manchester', country: 'England', region: 'North West' },
  { name: 'Hampshire', slug: 'hampshire', country: 'England', region: 'South East' },
  { name: 'Herefordshire', slug: 'herefordshire', country: 'England', region: 'West Midlands' },
  { name: 'Hertfordshire', slug: 'hertfordshire', country: 'England', region: 'East' },
  { name: 'Isle of Wight', slug: 'isle-of-wight', country: 'England', region: 'South East' },
  { name: 'Kent', slug: 'kent', country: 'England', region: 'South East' },
  { name: 'Lancashire', slug: 'lancashire', country: 'England', region: 'North West' },
  { name: 'Leicestershire', slug: 'leicestershire', country: 'England', region: 'East Midlands' },
  { name: 'Lincolnshire', slug: 'lincolnshire', country: 'England', region: 'East Midlands' },
  { name: 'Merseyside', slug: 'merseyside', country: 'England', region: 'North West' },
  { name: 'Norfolk', slug: 'norfolk', country: 'England', region: 'East' },
  { name: 'North Yorkshire', slug: 'north-yorkshire', country: 'England', region: 'Yorkshire and Humber' },
  { name: 'Northamptonshire', slug: 'northamptonshire', country: 'England', region: 'East Midlands' },
  { name: 'Northumberland', slug: 'northumberland', country: 'England', region: 'North East' },
  { name: 'Nottinghamshire', slug: 'nottinghamshire', country: 'England', region: 'East Midlands' },
  { name: 'Oxfordshire', slug: 'oxfordshire', country: 'England', region: 'South East' },
  { name: 'Rutland', slug: 'rutland', country: 'England', region: 'East Midlands' },
  { name: 'Shropshire', slug: 'shropshire', country: 'England', region: 'West Midlands' },
  { name: 'Somerset', slug: 'somerset', country: 'England', region: 'South West' },
  { name: 'South Yorkshire', slug: 'south-yorkshire', country: 'England', region: 'Yorkshire and Humber' },
  { name: 'Staffordshire', slug: 'staffordshire', country: 'England', region: 'West Midlands' },
  { name: 'Suffolk', slug: 'suffolk', country: 'England', region: 'East' },
  { name: 'Surrey', slug: 'surrey', country: 'England', region: 'South East' },
  { name: 'Tyne and Wear', slug: 'tyne-and-wear', country: 'England', region: 'North East' },
  { name: 'Warwickshire', slug: 'warwickshire', country: 'England', region: 'West Midlands' },
  { name: 'West Midlands', slug: 'west-midlands', country: 'England', region: 'West Midlands' },
  { name: 'West Sussex', slug: 'west-sussex', country: 'England', region: 'South East' },
  { name: 'West Yorkshire', slug: 'west-yorkshire', country: 'England', region: 'Yorkshire and Humber' },
  { name: 'Wiltshire', slug: 'wiltshire', country: 'England', region: 'South West' },
  { name: 'Worcestershire', slug: 'worcestershire', country: 'England', region: 'West Midlands' },
  // Wales (21)
  { name: 'Anglesey', slug: 'anglesey', country: 'Wales', region: 'Wales' },
  { name: 'Blaenau Gwent', slug: 'blaenau-gwent', country: 'Wales', region: 'Wales' },
  { name: 'Bridgend', slug: 'bridgend', country: 'Wales', region: 'Wales' },
  { name: 'Caerphilly', slug: 'caerphilly', country: 'Wales', region: 'Wales' },
  { name: 'Cardiff', slug: 'cardiff', country: 'Wales', region: 'Wales' },
  { name: 'Carmarthenshire', slug: 'carmarthenshire', country: 'Wales', region: 'Wales' },
  { name: 'Ceredigion', slug: 'ceredigion', country: 'Wales', region: 'Wales' },
  { name: 'Conwy', slug: 'conwy', country: 'Wales', region: 'Wales' },
  { name: 'Denbighshire', slug: 'denbighshire', country: 'Wales', region: 'Wales' },
  { name: 'Flintshire', slug: 'flintshire', country: 'Wales', region: 'Wales' },
  { name: 'Gwynedd', slug: 'gwynedd', country: 'Wales', region: 'Wales' },
  { name: 'Merthyr Tydfil', slug: 'merthyr-tydfil', country: 'Wales', region: 'Wales' },
  { name: 'Monmouthshire', slug: 'monmouthshire', country: 'Wales', region: 'Wales' },
  { name: 'Neath Port Talbot', slug: 'neath-port-talbot', country: 'Wales', region: 'Wales' },
  { name: 'Pembrokeshire', slug: 'pembrokeshire', country: 'Wales', region: 'Wales' },
  { name: 'Powys', slug: 'powys', country: 'Wales', region: 'Wales' },
  { name: 'Rhondda Cynon Taf', slug: 'rhondda-cynon-taf', country: 'Wales', region: 'Wales' },
  { name: 'Swansea', slug: 'swansea', country: 'Wales', region: 'Wales' },
  { name: 'Torfaen', slug: 'torfaen', country: 'Wales', region: 'Wales' },
  { name: 'Vale of Glamorgan', slug: 'vale-of-glamorgan', country: 'Wales', region: 'Wales' },
  { name: 'Wrexham', slug: 'wrexham', country: 'Wales', region: 'Wales' },
  // Scotland (22)
  { name: 'Aberdeenshire', slug: 'aberdeenshire', country: 'Scotland', region: 'Scotland' },
  { name: 'Angus', slug: 'angus', country: 'Scotland', region: 'Scotland' },
  { name: 'Argyll and Bute', slug: 'argyll-and-bute', country: 'Scotland', region: 'Scotland' },
  { name: 'Ayrshire', slug: 'ayrshire', country: 'Scotland', region: 'Scotland' },
  { name: 'Dumfries and Galloway', slug: 'dumfries-and-galloway', country: 'Scotland', region: 'Scotland' },
  { name: 'Dunbartonshire', slug: 'dunbartonshire', country: 'Scotland', region: 'Scotland' },
  { name: 'Dundee', slug: 'dundee', country: 'Scotland', region: 'Scotland' },
  { name: 'East Lothian', slug: 'east-lothian', country: 'Scotland', region: 'Scotland' },
  { name: 'Edinburgh', slug: 'edinburgh', country: 'Scotland', region: 'Scotland' },
  { name: 'Fife', slug: 'fife', country: 'Scotland', region: 'Scotland' },
  { name: 'Glasgow', slug: 'glasgow', country: 'Scotland', region: 'Scotland' },
  { name: 'Highland', slug: 'highland', country: 'Scotland', region: 'Scotland' },
  { name: 'Inverclyde', slug: 'inverclyde', country: 'Scotland', region: 'Scotland' },
  { name: 'Midlothian', slug: 'midlothian', country: 'Scotland', region: 'Scotland' },
  { name: 'Moray', slug: 'moray', country: 'Scotland', region: 'Scotland' },
  { name: 'North Lanarkshire', slug: 'north-lanarkshire', country: 'Scotland', region: 'Scotland' },
  { name: 'Perth and Kinross', slug: 'perth-and-kinross', country: 'Scotland', region: 'Scotland' },
  { name: 'Renfrewshire', slug: 'renfrewshire', country: 'Scotland', region: 'Scotland' },
  { name: 'Scottish Borders', slug: 'scottish-borders', country: 'Scotland', region: 'Scotland' },
  { name: 'South Lanarkshire', slug: 'south-lanarkshire', country: 'Scotland', region: 'Scotland' },
  { name: 'Stirlingshire & Clackmannanshire', slug: 'stirlingshire-and-clackmannanshire', country: 'Scotland', region: 'Scotland' },
  { name: 'West Lothian', slug: 'west-lothian', country: 'Scotland', region: 'Scotland' },
  // Northern Ireland (6)
  { name: 'Armagh', slug: 'armagh', country: 'Northern Ireland', region: 'Northern Ireland' },
  { name: 'County Antrim', slug: 'county-antrim', country: 'Northern Ireland', region: 'Northern Ireland' },
  { name: 'County Down', slug: 'county-down', country: 'Northern Ireland', region: 'Northern Ireland' },
  { name: 'Fermanagh', slug: 'fermanagh', country: 'Northern Ireland', region: 'Northern Ireland' },
  { name: 'Londonderry', slug: 'londonderry', country: 'Northern Ireland', region: 'Northern Ireland' },
  { name: 'Tyrone', slug: 'tyrone', country: 'Northern Ireland', region: 'Northern Ireland' },
];

// Portable Text helper
const pt = (text: string) => ({ _type: 'block', style: 'normal', children: [{ _type: 'span', text }], markDefs: [] });

function sections(c: County) {
  const N = c.name;
  return [
    {
      _type: 'longFormSection', sectionRole: '01-opening',
      heading: `Direct cremation in ${N} — as it should be`,
      body: [
        pt(`When a loved one dies, the practical decisions arrive all at once. Best Direct Cremation provides simple, dignified direct cremation services for families across ${N}, delivered by independent funeral directors based right here in the county — keeping everything local, as it should be.`),
        pt(`Your loved one will be cared for locally by trained funeral professionals with proper premises and mortuary facilities, not transported long distances to fit a centralised national process. The cremation takes place in a dignified manner at a local crematorium serving ${N}, not at a 24-hour 'super-crematorium' that could be hundreds of miles from your home.`),
        pt(`Best Direct Cremation in ${N} is ${'£'}1,499 all-inclusive — a clear price with no hidden extras. The only optional addition is a ${'£'}250 Priority Care collection fee if the person who has died is at home, a care home or a hospice rather than a hospital or coroner's mortuary. Maximum total under any circumstances: ${'£'}1,749.`),
      ],
    },
    {
      _type: 'longFormSection', sectionRole: '02-what-is',
      heading: `What is a direct cremation in ${N}?`,
      body: [
        pt(`A direct cremation in ${N} is a simple cremation without a service or ceremony at the crematorium. It is sometimes referred to as an unattended cremation or a pure cremation. Around one in every five UK funerals is now a direct cremation — and the most-cited reason families choose this option is the freedom it provides.`),
        pt(`Without a formal service at the crematorium, the cost is lower and the process is simpler. Many families find it gives them the freedom to take time, reflect, and arrange a memorial or celebration of life later — somewhere that holds special meaning to them or to the person who has died. Others choose direct cremation simply because it feels right for them and matches the way they want to say goodbye.`),
        pt(`What's important to understand about a direct cremation in ${N} is that while the service itself is simple, delivering it properly is not. Your loved one still needs to be collected, cared for, and prepared for cremation by trained professionals with the right vehicles, facilities and climate-controlled mortuary care. The paperwork still needs to be completed correctly. And the cremation itself needs to be carried out with dignity, with the ashes returned to you with care and respect.`),
      ],
    },
    {
      _type: 'longFormSection', sectionRole: '03-why-us',
      heading: `Why families in ${N} choose Best Direct Cremation over national providers`,
      body: [
        pt(`Families in ${N} often don't realise how differently national direct cremation providers operate. National providers typically collect the person who has died and transport them — sometimes hundreds of miles — to a centralised mortuary far from home. The cremation is then carried out at a single 'super-crematorium' that the national provider owns or has a relationship with, regardless of where the family actually lives.`),
        pt(`Best Direct Cremation works differently. Every Best Direct Cremation in ${N} is delivered by one of our handpicked Best Funeral Directors — established local independent funeral directors with their own premises, their own staff, their own vehicles, and their own mortuary facilities. Your loved one stays in ${N} throughout, in the care of a small local team you can speak to directly.`),
        pt(`The total cost is the same as the national providers — ${'£'}1,499 all-inclusive — but the level of personal care is something a centralised national operation simply cannot match. And because the funeral director is local, if you decide before the cremation that you want to add a small service, viewing, alternative urn or memorial, your local Best Funeral Director can adapt the arrangements for an appropriate fee. National providers cannot do that.`),
      ],
    },
    {
      _type: 'longFormSection', sectionRole: '04-process',
      heading: `How a Best Direct Cremation in ${N} works — five clear steps`,
      body: [
        pt(`Step one: call us on 0333 242 1405, day or night. A real member of the team takes the details and connects you with your local Best Funeral Director serving ${N}.`),
        pt(`Step two: local funeral care. Your local Best Funeral Director collects your loved one — from a hospital, hospice, care home or family home in ${N} — and brings them into their own professional care at their funeral home.`),
        pt(`Step three: funeral arrangements. The funeral director handles all the necessary paperwork, including registering the death at the local register office in ${N} (if you'd like their help), and arranges the date for the cremation.`),
        pt(`Step four: a local cremation in ${N}. The coffin is driven to a local crematorium in a proper funeral vehicle, where a dignified cremation is carried out — typically first thing in the morning, by appointment.`),
        pt(`Step five: return of ashes. The ashes are returned to you within around five working days, in a respectful container suitable for scattering, keeping at home, or interring at a memorial location. Or, if you prefer, the ashes can be scattered at the crematorium on your behalf.`),
      ],
    },
    {
      _type: 'longFormSection', sectionRole: '05-crematoria',
      heading: `Local crematoria serving ${N}`,
      body: [
        pt(`The cremation itself takes place at a local crematorium serving ${N}, chosen by your local Best Funeral Director based on availability and proximity to your home. ${N} is served by several established crematoria, all regulated under the Cremation (England and Wales) Regulations 2008 or the equivalent legislation in Scotland and Northern Ireland, and all operate to the same statutory standards of dignity and care.`),
        pt(`The choice of crematorium for a direct cremation is usually made by the local funeral director based on availability, distance, and any preference the family expresses. If you have a specific crematorium you would like used — perhaps because a partner or relative was cremated there, or because it is closer to home or has a garden of remembrance where the ashes can be interred — that request is always honoured where the crematorium has capacity.`),
        pt(`The difference between one crematorium and another in ${N} is largely a matter of location, capacity, and the surrounding grounds — the cremation itself follows the same careful, dignified process at every one. If you would like to know which crematorium will be used before the cremation takes place, your local Best Funeral Director will be happy to confirm.`),
      ],
    },
    {
      _type: 'longFormSection', sectionRole: '06-register',
      heading: `Registering a death in ${N}`,
      body: [
        pt(`By UK law, a death must be registered within five days of it occurring (or within five days of being notified by the coroner, if there is a coroner's investigation). The death is registered at the register office for the district in which the death took place. ${N} is served by several local register offices, all bookable online or by phone.`),
        pt(`You will need an appointment with the registrar. Take with you the Medical Certificate of Cause of Death issued by the GP or hospital, the deceased's birth certificate if you have it, their NHS medical card, marriage certificate, and proof of address. The registrar will issue two key documents — the certified copy of the entry of death (the "death certificate"), and the green-coloured Form 9, which authorises burial or cremation.`),
        pt(`We strongly recommend ordering at least five additional copies of the death certificate at the time of registration. Banks, insurers, pension providers and the probate office each typically require an original certificate; ordering them later is more expensive and slower. Once registered, give the green Form 9 to your funeral director — without it the cremation cannot be booked. Your local Best Funeral Director in ${N} can guide you through every step.`),
      ],
    },
    {
      _type: 'longFormSection', sectionRole: '07-partner',
      heading: `Your local funeral director in ${N}`,
      body: [
        pt(`Every Best Direct Cremation in ${N} is delivered by one of our handpicked Best Funeral Directors — an independent, family-owned funeral director with their own funeral home, mortuary facilities and trained staff serving the local community. We choose every partner based on the same five criteria: proven local expertise, professional premises and facilities, fully trained experienced staff, recognised NAFD or SAIF accreditation, and a reputation for outstanding care.`),
        pt(`This is the model we believe in. Direct cremation done properly doesn't mean cremation done at the lowest possible standard — it means cremation done simply, locally, and with the same respect and dignity that families would expect from any funeral. Your loved one stays in ${N} throughout. The funeral director handling their care is one you can meet, call, and trust.`),
        pt(`If you'd like to know which Best Funeral Director will be handling your arrangement in ${N}, please call us on 0333 242 1405. We can confirm the local partner serving your area, their funeral home address, their accreditation, and answer any questions you have about their facilities or experience.`),
      ],
    },
    {
      _type: 'longFormSection', sectionRole: '08-pricing',
      heading: `Pricing and what is included in ${N}`,
      body: [
        pt(`Best Direct Cremation in ${N} costs ${'£'}1,499 all-inclusive. That is the price the family actually pays — there are no hidden fees, no surprise add-ons, and no headline pricing that turns into something different at the point of arranging. The price includes all funeral director fees for the time and care of the local partner FD serving ${N}, collection of the person who has died from a hospital or coroner's mortuary anywhere in the county, professional care in a local mortuary, a suitable coffin for cremation, all the necessary legal paperwork and administration, the cremation itself at a local crematorium, and the return of the ashes to the family or scattering at the crematorium.`),
        pt(`The only optional cost is the ${'£'}250 Priority Care collection fee, which applies if the person who has died is being collected from a private home, hospice or care home rather than from a hospital or coroner's mortuary. That makes the maximum total under any circumstances ${'£'}1,749 — and we will always tell you clearly in advance whether Priority Care will be needed. There are no further charges.`),
        pt(`To put that in context, the average traditional attended funeral in the UK now costs ${'£'}4,510 (SunLife Cost of Dying Report 2026). A Best Direct Cremation in ${N} saves families more than ${'£'}3,000 compared with a traditional funeral, while still delivering the local professional care that families deserve. Pricing is fully compliant with the CMA Funerals Market Investigation Order 2021 — our Standardised Price List is available to download from the footer of this site.`),
      ],
    },
    {
      _type: 'longFormSection', sectionRole: '09-after',
      heading: `Memorials, ashes and what families in ${N} do next`,
      body: [
        pt(`After the cremation, the ashes are returned to the family within around five working days. A direct cremation gives families in ${N} the time, space and freedom to plan a memorial in their own way, on their own timeline — not on the schedule a crematorium chapel slot dictates. Many families find this is exactly what they wanted: a properly handled cremation, with the memorial held later in a place that meant something to the person.`),
        pt(`Families in ${N} take very different approaches to what comes next. Some hold a scattering of ashes at a place of significance — a coastal path, a favourite garden, a stretch of river, or simply somewhere the person who has died loved to walk. Some divide the ashes between family members. Some bury them in a memorial plot at a local cemetery, or in the garden of remembrance at the crematorium that performed the cremation. Some have them turned into jewellery, vinyl records, living memorial trees, or fireworks. There is no rush, and no single right way.`),
        pt(`What matters is that the cremation itself was handled with care, and that the family had the time and the money to organise a memorial that reflects the person they loved. Direct cremation is not a less-than option; for many families in ${N}, it is the modern, considered choice — and the local Best Funeral Director who handled the cremation can also help with any memorial arrangements you might wish to make.`),
      ],
    },
    {
      _type: 'longFormSection', sectionRole: '11-related',
      heading: `Call now to arrange a Best Direct Cremation in ${N}`,
      body: [
        pt(`To arrange a Best Direct Cremation in ${N}, call us on 0333 242 1405. We answer 24 hours a day, every day of the year — a real member of our team, never a chatbot or an answering service. The line is open whenever you need us, including evenings, weekends and bank holidays.`),
        pt(`Best Direct Cremation in ${N}: ${'£'}1,499 all-inclusive, delivered locally by your handpicked Best Funeral Director, with a real person on the phone whenever you need us. Know you're in great care.`),
      ],
    },
  ];
}

function faqs(c: County) {
  const N = c.name;
  return [
    { question: `How much does a direct cremation cost in ${N}?`,           answer: [pt(`A Best Direct Cremation in ${N} costs ${'£'}1,499 all-inclusive. The only optional cost is a ${'£'}250 Priority Care collection fee if the person who has died is at home, in a care home or hospice rather than a hospital. Maximum total under any circumstances: ${'£'}1,749.`)] },
    { question: `Will the cremation be local to ${N}?`,                       answer: [pt(`Yes. Every Best Direct Cremation in ${N} is delivered by a local independent funeral director with their own premises and mortuary, and the cremation itself takes place at a local crematorium serving ${N}. Your loved one is never transported to a centralised national hub.`)] },
    { question: `Who will collect my loved one in ${N}?`,                     answer: [pt(`A local Best Funeral Director serving ${N} will collect your loved one — whether from a hospital, hospice, care home or family home — and bring them into their own professional care at the local funeral home. Collection is handled by trained staff with appropriate vehicles, never by a third-party logistics company.`)] },
    { question: `How long does a direct cremation in ${N} take?`,              answer: [pt(`From the first call to the return of the ashes, a direct cremation in ${N} typically takes between seven and fourteen days. The exact timing depends on how quickly the death can be registered, whether a coroner is involved, and the availability of slots at the local crematorium.`)] },
    { question: `Can I arrange a service alongside a direct cremation in ${N}?`, answer: [pt(`A standard Best Direct Cremation does not include a service at the crematorium. However, because your local Best Funeral Director in ${N} is a proper independent funeral director — not a centralised national operation — they can adapt the arrangements if you decide, before the cremation, that you would like a brief moment of reflection, a viewing, or a small service. There would be an additional fee, which they can discuss with you directly.`)] },
    { question: `What happens to the ashes after the cremation?`,              answer: [pt(`The ashes are returned to you within around five working days of the cremation, in a respectful container. Many families in ${N} keep the ashes at home, scatter them at a meaningful location, bury them in a memorial plot at a local cemetery, or have them turned into jewellery or other memorials. Your local Best Funeral Director can help with any memorial arrangements you'd like to make.`)] },
    { question: `Do you cover all of ${N}?`,                                  answer: [pt(`We work with a growing network of local independent funeral directors across ${N}. If you're unsure whether we currently cover your specific town or postcode, please call us on 0333 242 1405. We'll confirm straight away whether your local Best Funeral Director can take your call, and if we're still expanding into your area we'll recommend a trusted local independent funeral director who meets the same standards of care.`)] },
    { question: `Is the team available 24 hours a day?`,                       answer: [pt(`Yes. Best Direct Cremation answers the phone 24 hours a day, every day of the year — a real person, every time. Call 0333 242 1405 whenever you need us, including evenings, weekends and bank holidays.`)] },
  ];
}

async function run() {
  console.log(`Ingesting ${COUNTIES.length} counties (full 11-section long-form) into ${PROJECT_ID}/${DATASET}…`);
  let preservedCount = 0;
  for (const c of COUNTIES) {
    const _id = `county-${c.slug}`;

    // Preserve Apify-added enrichment: fetch the existing doc so we can carry
    // forward crematoria + registerOffices + partnerFds + cities arrays.
    // Without this step, createOrReplace would wipe them out and the
    // /crematoria/ and /register-offices/ directories would go empty.
    const existing = await client.fetch<any>(
      `*[_id == $id][0]{ crematoria, registerOffices, partnerFds, cities, seo }`,
      { id: _id }
    );

    const doc: any = {
      _type: 'county',
      _id,
      name: c.name,
      slug: { _type: 'slug', current: c.slug },
      country: c.country,
      region: c.region,
      coverageStatus: 'coming-soon' as const,
      longFormSections: sections(c).map(s => ({
        ...s,
        body: enrichBlocks(s.body, c.slug),
      })),
      faqs: faqs(c),
      lastReviewed: new Date().toISOString().split('T')[0],
    };

    // Merge in fields that other scripts / editors own
    if (existing?.crematoria?.length)      { doc.crematoria = existing.crematoria; preservedCount++; }
    if (existing?.registerOffices?.length) { doc.registerOffices = existing.registerOffices; }
    if (existing?.partnerFds?.length)      { doc.partnerFds = existing.partnerFds; }
    if (existing?.cities?.length)          { doc.cities = existing.cities; }
    if (existing?.seo)                     { doc.seo = existing.seo; }

    await client.createOrReplace(doc);
    const enrichNote = existing?.crematoria?.length ? ` [+${existing.crematoria.length} crem, +${existing.registerOffices?.length || 0} RO preserved]` : '';
    console.log(`  ✓ ${c.name.padEnd(38)} (${c.country})${enrichNote}`);
  }
  console.log(`\nDone. ${COUNTIES.length} county docs written. Apify enrichment preserved on ${preservedCount} counties.`);
}

run().catch(err => { console.error(err); process.exit(1); });
