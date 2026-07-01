/**
 * Ingest Tier 1 + Tier 2 UK towns (~180 records) into Sanity as town documents.
 * Each town gets full 11-section long-form (~2,000-2,500 words).
 * Run AFTER ingest-counties.ts so the county references resolve.
 *
 * Usage:  npx tsx scripts/ingest-towns.ts
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

type Town = { name: string; slug: string; countySlug: string; pop?: number };
const TOWNS: Town[] = [
  // Tier 1 — top 50 UK cities
  { name: 'London',              slug: 'london-city',         countySlug: 'london', pop: 9000000 },
  { name: 'Birmingham',          slug: 'birmingham',          countySlug: 'west-midlands', pop: 1150000 },
  { name: 'Manchester',          slug: 'manchester-city',     countySlug: 'manchester', pop: 550000 },
  { name: 'Liverpool',           slug: 'liverpool',           countySlug: 'merseyside', pop: 500000 },
  { name: 'Leeds',               slug: 'leeds',               countySlug: 'west-yorkshire', pop: 790000 },
  { name: 'Glasgow',             slug: 'glasgow-city',        countySlug: 'glasgow', pop: 635000 },
  { name: 'Sheffield',           slug: 'sheffield',           countySlug: 'south-yorkshire', pop: 580000 },
  { name: 'Newcastle upon Tyne', slug: 'newcastle-upon-tyne', countySlug: 'tyne-and-wear', pop: 300000 },
  { name: 'Bristol',             slug: 'bristol-city',        countySlug: 'bristol', pop: 470000 },
  { name: 'Belfast',             slug: 'belfast',             countySlug: 'county-antrim', pop: 345000 },
  { name: 'Edinburgh',           slug: 'edinburgh-city',      countySlug: 'edinburgh', pop: 525000 },
  { name: 'Cardiff',             slug: 'cardiff-city',        countySlug: 'cardiff', pop: 365000 },
  { name: 'Coventry',            slug: 'coventry',            countySlug: 'west-midlands', pop: 345000 },
  { name: 'Bradford',            slug: 'bradford',            countySlug: 'west-yorkshire', pop: 540000 },
  { name: 'Stoke-on-Trent',      slug: 'stoke-on-trent',      countySlug: 'staffordshire', pop: 260000 },
  { name: 'Wolverhampton',       slug: 'wolverhampton',       countySlug: 'west-midlands', pop: 265000 },
  { name: 'Plymouth',            slug: 'plymouth',            countySlug: 'devon', pop: 265000 },
  { name: 'Nottingham',          slug: 'nottingham',          countySlug: 'nottinghamshire', pop: 330000 },
  { name: 'Southampton',         slug: 'southampton',         countySlug: 'hampshire', pop: 270000 },
  { name: 'Reading',             slug: 'reading',             countySlug: 'berkshire', pop: 175000 },
  { name: 'Derby',               slug: 'derby',               countySlug: 'derbyshire', pop: 260000 },
  { name: 'Portsmouth',          slug: 'portsmouth',          countySlug: 'hampshire', pop: 210000 },
  { name: 'Brighton',            slug: 'brighton',            countySlug: 'east-sussex', pop: 290000 },
  { name: 'Hull',                slug: 'hull',                countySlug: 'east-yorkshire', pop: 270000 },
  { name: 'Aberdeen',            slug: 'aberdeen',            countySlug: 'aberdeenshire', pop: 200000 },
  { name: 'Preston',             slug: 'preston',             countySlug: 'lancashire', pop: 145000 },
  { name: 'Northampton',         slug: 'northampton',         countySlug: 'northamptonshire', pop: 250000 },
  { name: 'Luton',               slug: 'luton',               countySlug: 'bedfordshire', pop: 215000 },
  { name: 'Milton Keynes',       slug: 'milton-keynes',       countySlug: 'buckinghamshire', pop: 270000 },
  { name: 'Norwich',             slug: 'norwich',             countySlug: 'norfolk', pop: 145000 },
  { name: 'Dundee',              slug: 'dundee-city',         countySlug: 'dundee', pop: 150000 },
  { name: 'Oxford',              slug: 'oxford',              countySlug: 'oxfordshire', pop: 160000 },
  { name: 'Bournemouth',         slug: 'bournemouth',         countySlug: 'dorset', pop: 200000 },
  { name: 'Cambridge',           slug: 'cambridge',           countySlug: 'cambridgeshire', pop: 145000 },
  { name: 'Sunderland',          slug: 'sunderland',          countySlug: 'tyne-and-wear', pop: 275000 },
  { name: 'Swansea',             slug: 'swansea-city',        countySlug: 'swansea', pop: 245000 },
  { name: 'York',                slug: 'york',                countySlug: 'north-yorkshire', pop: 215000 },
  { name: 'Peterborough',        slug: 'peterborough',        countySlug: 'cambridgeshire', pop: 215000 },
  { name: 'Ipswich',             slug: 'ipswich',             countySlug: 'suffolk', pop: 145000 },
  { name: 'Telford',             slug: 'telford',             countySlug: 'shropshire', pop: 175000 },
  { name: 'Slough',              slug: 'slough',              countySlug: 'berkshire', pop: 165000 },
  { name: 'Watford',             slug: 'watford',             countySlug: 'hertfordshire', pop: 130000 },
  { name: 'Warrington',          slug: 'warrington',          countySlug: 'cheshire', pop: 215000 },
  { name: 'Blackpool',           slug: 'blackpool',           countySlug: 'lancashire', pop: 140000 },
  { name: 'Stockport',           slug: 'stockport',           countySlug: 'manchester', pop: 140000 },
  { name: 'Bolton',              slug: 'bolton',              countySlug: 'manchester', pop: 195000 },
  { name: 'Walsall',             slug: 'walsall',             countySlug: 'west-midlands', pop: 285000 },
  { name: 'Maidstone',           slug: 'maidstone',           countySlug: 'kent', pop: 115000 },
  { name: 'Lancaster',           slug: 'lancaster',           countySlug: 'lancashire', pop: 50000 },
  { name: 'Worcester',           slug: 'worcester',           countySlug: 'worcestershire', pop: 105000 },

  // Tier 2 — next 130 towns
  { name: 'Doncaster',           slug: 'doncaster',           countySlug: 'south-yorkshire' },
  { name: 'Wakefield',           slug: 'wakefield',           countySlug: 'west-yorkshire' },
  { name: 'Rotherham',           slug: 'rotherham',           countySlug: 'south-yorkshire' },
  { name: 'Huddersfield',        slug: 'huddersfield',        countySlug: 'west-yorkshire' },
  { name: 'Halifax',             slug: 'halifax',             countySlug: 'west-yorkshire' },
  { name: 'Harrogate',           slug: 'harrogate',           countySlug: 'north-yorkshire' },
  { name: 'Middlesbrough',       slug: 'middlesbrough',       countySlug: 'north-yorkshire' },
  { name: 'Lincoln',             slug: 'lincoln',             countySlug: 'lincolnshire' },
  { name: 'Carlisle',            slug: 'carlisle',            countySlug: 'cumbria' },
  { name: 'Gloucester',          slug: 'gloucester',          countySlug: 'gloucestershire' },
  { name: 'Cheltenham',          slug: 'cheltenham',          countySlug: 'gloucestershire' },
  { name: 'Exeter',              slug: 'exeter',              countySlug: 'devon' },
  { name: 'Bath',                slug: 'bath',                countySlug: 'somerset' },
  { name: 'Salisbury',           slug: 'salisbury',           countySlug: 'wiltshire' },
  { name: 'Winchester',          slug: 'winchester',          countySlug: 'hampshire' },
  { name: 'Canterbury',          slug: 'canterbury',          countySlug: 'kent' },
  { name: 'Dover',               slug: 'dover',               countySlug: 'kent' },
  { name: 'Folkestone',          slug: 'folkestone',          countySlug: 'kent' },
  { name: 'Margate',             slug: 'margate',             countySlug: 'kent' },
  { name: 'Tunbridge Wells',     slug: 'tunbridge-wells',     countySlug: 'kent' },
  { name: 'Aylesbury',           slug: 'aylesbury',           countySlug: 'buckinghamshire' },
  { name: 'Bedford',             slug: 'bedford',             countySlug: 'bedfordshire' },
  { name: 'St Albans',           slug: 'st-albans',           countySlug: 'hertfordshire' },
  { name: 'Hemel Hempstead',     slug: 'hemel-hempstead',     countySlug: 'hertfordshire' },
  { name: 'Stevenage',           slug: 'stevenage',           countySlug: 'hertfordshire' },
  { name: 'Welwyn Garden City',  slug: 'welwyn-garden-city',  countySlug: 'hertfordshire' },
  { name: 'Hatfield',            slug: 'hatfield',            countySlug: 'hertfordshire' },
  { name: 'Hitchin',             slug: 'hitchin',             countySlug: 'hertfordshire' },
  { name: 'Letchworth',          slug: 'letchworth',          countySlug: 'hertfordshire' },
  { name: 'Borehamwood',         slug: 'borehamwood',         countySlug: 'hertfordshire' },
  { name: 'Chelmsford',          slug: 'chelmsford',          countySlug: 'essex' },
  { name: 'Colchester',          slug: 'colchester',          countySlug: 'essex' },
  { name: 'Southend-on-Sea',     slug: 'southend-on-sea',     countySlug: 'essex' },
  { name: 'Basildon',            slug: 'basildon',            countySlug: 'essex' },
  { name: 'Harlow',              slug: 'harlow',              countySlug: 'essex' },
  { name: 'Brentwood',           slug: 'brentwood',           countySlug: 'essex' },
  { name: 'Braintree',           slug: 'braintree',           countySlug: 'essex' },
  { name: 'Clacton-on-Sea',      slug: 'clacton-on-sea',      countySlug: 'essex' },
  { name: 'Maidenhead',          slug: 'maidenhead',          countySlug: 'berkshire' },
  { name: 'Wokingham',           slug: 'wokingham',           countySlug: 'berkshire' },
  { name: 'Bracknell',           slug: 'bracknell',           countySlug: 'berkshire' },
  { name: 'Newbury',             slug: 'newbury',             countySlug: 'berkshire' },
  { name: 'Windsor',             slug: 'windsor',             countySlug: 'berkshire' },
  { name: 'Crawley',             slug: 'crawley',             countySlug: 'west-sussex' },
  { name: 'Worthing',            slug: 'worthing',            countySlug: 'west-sussex' },
  { name: 'Horsham',             slug: 'horsham',             countySlug: 'west-sussex' },
  { name: 'Chichester',          slug: 'chichester',          countySlug: 'west-sussex' },
  { name: 'Bognor Regis',        slug: 'bognor-regis',        countySlug: 'west-sussex' },
  { name: 'Eastbourne',          slug: 'eastbourne',          countySlug: 'east-sussex' },
  { name: 'Hastings',            slug: 'hastings',            countySlug: 'east-sussex' },
  { name: 'Hove',                slug: 'hove',                countySlug: 'east-sussex' },
  { name: 'Lewes',               slug: 'lewes',               countySlug: 'east-sussex' },
  { name: 'Guildford',           slug: 'guildford',           countySlug: 'surrey' },
  { name: 'Woking',              slug: 'woking',              countySlug: 'surrey' },
  { name: 'Epsom',               slug: 'epsom',               countySlug: 'surrey' },
  { name: 'Reigate',             slug: 'reigate',             countySlug: 'surrey' },
  { name: 'Camberley',           slug: 'camberley',           countySlug: 'surrey' },
  { name: 'Farnham',             slug: 'farnham',             countySlug: 'surrey' },
  { name: 'Leatherhead',         slug: 'leatherhead',         countySlug: 'surrey' },
  { name: 'Dorking',             slug: 'dorking',             countySlug: 'surrey' },
  { name: 'Esher',               slug: 'esher',               countySlug: 'surrey' },
  { name: 'Walton-on-Thames',    slug: 'walton-on-thames',    countySlug: 'surrey' },
  { name: 'Weybridge',           slug: 'weybridge',           countySlug: 'surrey' },
  { name: 'Redhill',             slug: 'redhill',             countySlug: 'surrey' },
  { name: 'Basingstoke',         slug: 'basingstoke',         countySlug: 'hampshire' },
  { name: 'Andover',             slug: 'andover',             countySlug: 'hampshire' },
  { name: 'Eastleigh',           slug: 'eastleigh',           countySlug: 'hampshire' },
  { name: 'Romsey',              slug: 'romsey',              countySlug: 'hampshire' },
  { name: 'Fareham',             slug: 'fareham',             countySlug: 'hampshire' },
  { name: 'Gosport',             slug: 'gosport',             countySlug: 'hampshire' },
  { name: 'Havant',              slug: 'havant',              countySlug: 'hampshire' },
  { name: 'Aldershot',           slug: 'aldershot',           countySlug: 'hampshire' },
  { name: 'Farnborough',         slug: 'farnborough',         countySlug: 'hampshire' },
  { name: 'Alton',               slug: 'alton',               countySlug: 'hampshire' },
  { name: 'Taunton',             slug: 'taunton',             countySlug: 'somerset' },
  { name: 'Yeovil',              slug: 'yeovil',              countySlug: 'somerset' },
  { name: 'Bridgwater',          slug: 'bridgwater',          countySlug: 'somerset' },
  { name: 'Frome',               slug: 'frome',               countySlug: 'somerset' },
  { name: 'Wells',               slug: 'wells',               countySlug: 'somerset' },
  { name: 'Weston-super-Mare',   slug: 'weston-super-mare',   countySlug: 'somerset' },
  { name: 'Poole',               slug: 'poole',               countySlug: 'dorset' },
  { name: 'Weymouth',            slug: 'weymouth',            countySlug: 'dorset' },
  { name: 'Dorchester',          slug: 'dorchester',          countySlug: 'dorset' },
  { name: 'Christchurch',        slug: 'christchurch',        countySlug: 'dorset' },
  { name: 'Wimborne Minster',    slug: 'wimborne-minster',    countySlug: 'dorset' },
  { name: 'Torquay',             slug: 'torquay',             countySlug: 'devon' },
  { name: 'Paignton',            slug: 'paignton',            countySlug: 'devon' },
  { name: 'Exmouth',             slug: 'exmouth',             countySlug: 'devon' },
  { name: 'Newton Abbot',        slug: 'newton-abbot',        countySlug: 'devon' },
  { name: 'Tiverton',            slug: 'tiverton',            countySlug: 'devon' },
  { name: 'Barnstaple',          slug: 'barnstaple',          countySlug: 'devon' },
  { name: 'Bideford',            slug: 'bideford',            countySlug: 'devon' },
  { name: 'Honiton',             slug: 'honiton',             countySlug: 'devon' },
  { name: 'Sidmouth',            slug: 'sidmouth',            countySlug: 'devon' },
  { name: 'Truro',               slug: 'truro',               countySlug: 'cornwall' },
  { name: 'Penzance',            slug: 'penzance',            countySlug: 'cornwall' },
  { name: 'St Austell',          slug: 'st-austell',          countySlug: 'cornwall' },
  { name: 'Falmouth',            slug: 'falmouth',            countySlug: 'cornwall' },
  { name: 'Newquay',             slug: 'newquay',             countySlug: 'cornwall' },
  { name: 'Bodmin',              slug: 'bodmin',              countySlug: 'cornwall' },
  { name: 'Camborne',            slug: 'camborne',            countySlug: 'cornwall' },
  { name: 'Redruth',             slug: 'redruth',             countySlug: 'cornwall' },
  { name: 'Helston',             slug: 'helston',             countySlug: 'cornwall' },
  { name: 'Saltash',             slug: 'saltash',             countySlug: 'cornwall' },
  { name: 'St Ives',             slug: 'st-ives',             countySlug: 'cornwall' },
  { name: 'Birkenhead',          slug: 'birkenhead',          countySlug: 'merseyside' },
  { name: 'St Helens',           slug: 'st-helens',           countySlug: 'merseyside' },
  { name: 'Southport',           slug: 'southport',           countySlug: 'merseyside' },
  { name: 'Bootle',              slug: 'bootle',              countySlug: 'merseyside' },
  { name: 'Wallasey',            slug: 'wallasey',            countySlug: 'merseyside' },
  { name: 'Crosby',              slug: 'crosby',              countySlug: 'merseyside' },
  { name: 'Salford',             slug: 'salford',             countySlug: 'manchester' },
  { name: 'Wigan',               slug: 'wigan',               countySlug: 'manchester' },
  { name: 'Rochdale',            slug: 'rochdale',            countySlug: 'manchester' },
  { name: 'Oldham',              slug: 'oldham',              countySlug: 'manchester' },
  { name: 'Bury',                slug: 'bury',                countySlug: 'manchester' },
  { name: 'Altrincham',          slug: 'altrincham',          countySlug: 'manchester' },
  { name: 'Sale',                slug: 'sale',                countySlug: 'manchester' },
  { name: 'Chester',             slug: 'chester',             countySlug: 'cheshire' },
  { name: 'Crewe',               slug: 'crewe',               countySlug: 'cheshire' },
  { name: 'Macclesfield',        slug: 'macclesfield',        countySlug: 'cheshire' },
  { name: 'Northwich',           slug: 'northwich',           countySlug: 'cheshire' },
  { name: 'Ellesmere Port',      slug: 'ellesmere-port',      countySlug: 'cheshire' },
];

const pt = (text: string) => ({ _type: 'block', style: 'normal', children: [{ _type: 'span', text }], markDefs: [] });

function sections(t: Town, countyName: string) {
  const N = t.name; const C = countyName;
  return [
    { _type: 'longFormSection', sectionRole: '01-opening', heading: `Direct cremation in ${N} — local care, done properly`,
      body: [
        pt(`When a loved one dies in ${N}, the practical decisions arrive all at once. Best Direct Cremation provides simple, dignified direct cremation services for families in ${N} and across ${C} — delivered by independent funeral directors based locally, keeping everything close to home as it should be.`),
        pt(`Your loved one stays in ${N} throughout. Cared for by trained funeral professionals in their own funeral home, with proper premises, vehicles and mortuary facilities. Never transported hundreds of miles to a centralised national hub.`),
        pt(`A Best Direct Cremation in ${N} is ${'£'}1,499 all-inclusive. The only optional addition is a ${'£'}250 Priority Care collection fee if the person who has died is at home, a care home or a hospice rather than a hospital. Maximum total under any circumstances: ${'£'}1,749. Clear pricing. No hidden extras.`),
      ] },
    { _type: 'longFormSection', sectionRole: '02-what-is', heading: `What is a direct cremation in ${N}?`,
      body: [
        pt(`A direct cremation in ${N} is a simple cremation without a service or ceremony at the crematorium. Sometimes called an unattended cremation or a pure cremation. Around one in five UK funerals is now a direct cremation, and most families choose it for two reasons: the lower cost and the freedom to plan a memorial later, on their own timeline.`),
        pt(`Without a formal service at the crematorium, the cost drops by more than ${'£'}3,000 compared to the average traditional funeral (${'£'}4,510 — SunLife Cost of Dying Report 2026). Many families in ${N} use the saving to fund a personal celebration of life at a meaningful local venue rather than a crematorium chapel slot.`),
        pt(`What matters is that while the direct cremation service in ${N} is simple, delivering it properly is not. Your loved one still needs to be collected, prepared, and cremated by trained professionals — and with Best Direct Cremation that work is done locally by your handpicked Best Funeral Director in ${N}, not centrally by a remote logistics operation.`),
      ] },
    { _type: 'longFormSection', sectionRole: '03-why-us', heading: `Why families in ${N} choose Best Direct Cremation`,
      body: [
        pt(`Families in ${N} often don't realise how differently national direct cremation providers operate. National providers will typically collect the person who has died and transport them hundreds of miles to a centralised mortuary. The cremation is then carried out at a single 'super-crematorium' owned or used exclusively by the national provider — regardless of where the family in ${N} actually lives.`),
        pt(`Best Direct Cremation in ${N} works the opposite way. Every cremation is delivered by a handpicked local Best Funeral Director, an established independent funeral director with their own premises, trained staff and mortuary in or near ${N}. Your loved one stays close to home throughout. The funeral director is one you can call, meet, and trust — not a remote call centre.`),
        pt(`The price is the same as the national providers — ${'£'}1,499 all-inclusive — but the personal care is something a centralised national operation simply cannot match. And because your funeral director in ${N} is a proper independent operator, they can adapt the arrangements before the cremation if you decide you'd like a brief moment of reflection, a viewing, or a small service. National providers can't do that.`),
      ] },
    { _type: 'longFormSection', sectionRole: '04-process', heading: `How a Best Direct Cremation in ${N} works`,
      body: [
        pt(`Step one — the call. Phone 0333 242 1405, day or night. A real member of the team takes the details and connects you with your local Best Funeral Director serving ${N}.`),
        pt(`Step two — local collection. The funeral director collects your loved one from the hospital, hospice, care home or family home in ${N}, and brings them into their own professional care at the local funeral home.`),
        pt(`Step three — paperwork. The funeral director walks you through registering the death at the local register office, signs the necessary cremation papers (Form Cremation 4), and books the cremation at the local crematorium serving ${N}.`),
        pt(`Step four — the cremation. The coffin travels to a local crematorium in a proper funeral vehicle. The cremation is carried out with the same care and respect as any attended funeral — typically first thing in the morning by appointment.`),
        pt(`Step five — return of ashes. Within around five working days the ashes are returned to you in a respectful container, ready for scattering, keeping at home, burying in a memorial plot or whatever feels right. Or scattered at the crematorium on your behalf.`),
      ] },
    { _type: 'longFormSection', sectionRole: '05-crematoria', heading: `Local crematoria serving ${N}`,
      body: [
        pt(`The cremation itself takes place at a local crematorium serving ${N} or the surrounding area of ${C}. The choice of crematorium is made by your local Best Funeral Director based on availability and proximity to your home. Every crematorium is regulated under the same statutory standards and operates to the same level of dignity and care.`),
        pt(`If you have a specific crematorium you'd like used — perhaps because a partner or relative was cremated there, or because it has a garden of remembrance where you'd like to inter the ashes — that preference is always honoured where the crematorium has capacity. Your funeral director will confirm the venue before the cremation takes place.`),
      ] },
    { _type: 'longFormSection', sectionRole: '06-register', heading: `Registering a death in ${N}`,
      body: [
        pt(`By UK law a death must be registered within five days at the local register office for the district in which the death took place. For families in ${N}, that's the local register office serving the area — appointments can usually be made online or by phone.`),
        pt(`Take with you the Medical Certificate of Cause of Death issued by the GP or hospital, the deceased's birth certificate if you have it, their NHS medical card and proof of address. The registrar will issue the death certificate and the green-coloured Form 9 that authorises cremation. We strongly recommend ordering at least five additional copies of the death certificate at the same time — banks, insurers, pension providers and the probate office each need an original.`),
        pt(`Once registered, the green Form 9 goes to your funeral director — without it the cremation cannot proceed. Your local Best Funeral Director in ${N} can guide you through every step of the registration process.`),
      ] },
    { _type: 'longFormSection', sectionRole: '07-partner', heading: `Your local funeral director in ${N}`,
      body: [
        pt(`Every Best Direct Cremation in ${N} is delivered by one of our handpicked Best Funeral Directors — an established local independent funeral director with their own funeral home, mortuary and trained staff. We choose every partner based on five criteria: proven local expertise, professional premises, fully trained staff, NAFD or SAIF accreditation, and a reputation for outstanding care in the local community.`),
        pt(`This model is what makes the difference. Direct cremation in ${N} done properly doesn't mean cremation at the lowest possible standard — it means cremation done simply, locally, by a small professional team you can speak to. To know which Best Funeral Director will be serving your part of ${N}, call 0333 242 1405 and we'll confirm immediately.`),
      ] },
    { _type: 'longFormSection', sectionRole: '08-pricing', heading: `Direct cremation cost in ${N}: ${'£'}1,499 all-inclusive`,
      body: [
        pt(`A Best Direct Cremation in ${N} costs ${'£'}1,499 all-inclusive. That includes all funeral director fees, collection from a hospital or coroner's mortuary anywhere in ${C}, professional care in a local mortuary, a suitable coffin for cremation, all the necessary legal paperwork, the cremation at a local crematorium, and the return of ashes to the family.`),
        pt(`The only optional cost is a ${'£'}250 Priority Care collection fee — applied only if the person who has died is at a private home, hospice or care home rather than a hospital. Maximum total under any circumstances: ${'£'}1,749. There are no surprise weekend fees, no fuel levies, no out-of-area charges, and no upsells.`),
        pt(`To put this in context: the average traditional attended funeral in the UK now costs ${'£'}4,510 (SunLife Cost of Dying Report 2026). A Best Direct Cremation in ${N} saves families more than ${'£'}3,000 while still delivering the local professional care families deserve. Pricing is fully CMA-compliant and our Standardised Price List is available to download from the footer.`),
      ] },
    { _type: 'longFormSection', sectionRole: '09-after', heading: `After the cremation — memorials and ashes`,
      body: [
        pt(`The ashes are returned within around five working days. Families in ${N} take very different approaches to what comes next — some scatter at a place of significance, some divide between family members, some bury in a memorial plot at a local cemetery or in the crematorium's garden of remembrance. Some have them turned into jewellery, vinyl records or living memorial trees.`),
        pt(`A direct cremation gives families in ${N} the time, space and freedom to plan a memorial that genuinely reflects the person. There's no rush, no single right way, and no formal service schedule to work around. Your local Best Funeral Director can help with any memorial arrangements you'd like to make — from a simple urn through to a fully personalised celebration of life.`),
      ] },
    { _type: 'longFormSection', sectionRole: '11-related', heading: `Call to arrange a Best Direct Cremation in ${N}`,
      body: [
        pt(`To arrange a Best Direct Cremation in ${N}, call 0333 242 1405. We answer 24 hours a day, every day of the year. A real member of our team, never a chatbot. Best Direct Cremation in ${N}: ${'£'}1,499 all-inclusive, delivered locally by a handpicked independent funeral director. Know you're in great care.`),
      ] },
  ];
}

function faqs(t: Town, countyName: string) {
  const N = t.name; const C = countyName;
  return [
    { question: `How much does a direct cremation cost in ${N}?`,    answer: [pt(`${'£'}1,499 all-inclusive. The only optional cost is a ${'£'}250 Priority Care collection fee. Maximum total: ${'£'}1,749.`)] },
    { question: `Will the cremation be local to ${N}?`,                answer: [pt(`Yes. Your loved one stays in ${N} / ${C} throughout, and the cremation takes place at a local crematorium chosen by your local Best Funeral Director.`)] },
    { question: `Who is my local Best Funeral Director in ${N}?`,      answer: [pt(`A vetted independent funeral director with their own funeral home and mortuary serving ${N}. Call 0333 242 1405 and we'll confirm the partner serving your specific address.`)] },
    { question: `Can I arrange a small service alongside the cremation?`, answer: [pt(`A standard direct cremation doesn't include a service, but because your local Best Funeral Director in ${N} is a proper independent operator they can adapt the arrangements for an additional fee — a brief moment of reflection, a viewing, or a small attended service. National providers cannot do this.`)] },
    { question: `How long does a direct cremation in ${N} take?`,       answer: [pt(`From the first call to the return of the ashes, typically seven to fourteen days, depending on how quickly the death can be registered and the availability of slots at the local crematorium.`)] },
    { question: `Do you offer funeral plans in ${N}?`,                  answer: [pt(`Not yet. Best Direct Cremation does not currently sell prepaid funeral plans, but we plan to launch our own direct cremation funeral plans in early 2027. Our funeral plans guide explains everything to look for in an FCA-regulated provider in the meantime.`)] },
    { question: `What happens with the ashes after the cremation?`,    answer: [pt(`Returned to you within around five working days, or scattered at the crematorium if you prefer. Your local Best Funeral Director in ${N} can help with any memorial arrangements.`)] },
    { question: `Is the team available 24 hours a day?`,                answer: [pt(`Yes. A real person answers 24 hours a day on 0333 242 1405 — every day of the year, including evenings, weekends and bank holidays.`)] },
  ];
}

const COUNTY_NAMES: Record<string,string> = {
  'bedfordshire':'Bedfordshire','berkshire':'Berkshire','bristol':'Bristol','buckinghamshire':'Buckinghamshire',
  'cambridgeshire':'Cambridgeshire','cheshire':'Cheshire','cornwall':'Cornwall','county-durham':'County Durham',
  'cumbria':'Cumbria','derbyshire':'Derbyshire','devon':'Devon','dorset':'Dorset','east-sussex':'East Sussex',
  'east-yorkshire':'East Yorkshire','essex':'Essex','gloucestershire':'Gloucestershire','london':'Greater London',
  'manchester':'Greater Manchester','hampshire':'Hampshire','herefordshire':'Herefordshire','hertfordshire':'Hertfordshire',
  'isle-of-wight':'Isle of Wight','kent':'Kent','lancashire':'Lancashire','leicestershire':'Leicestershire',
  'lincolnshire':'Lincolnshire','merseyside':'Merseyside','norfolk':'Norfolk','north-yorkshire':'North Yorkshire',
  'northamptonshire':'Northamptonshire','northumberland':'Northumberland','nottinghamshire':'Nottinghamshire',
  'oxfordshire':'Oxfordshire','rutland':'Rutland','shropshire':'Shropshire','somerset':'Somerset',
  'south-yorkshire':'South Yorkshire','staffordshire':'Staffordshire','suffolk':'Suffolk','surrey':'Surrey',
  'tyne-and-wear':'Tyne and Wear','warwickshire':'Warwickshire','west-midlands':'West Midlands','west-sussex':'West Sussex',
  'west-yorkshire':'West Yorkshire','wiltshire':'Wiltshire','worcestershire':'Worcestershire',
  'cardiff':'Cardiff','swansea':'Swansea','edinburgh':'Edinburgh','glasgow':'Glasgow','aberdeenshire':'Aberdeenshire',
  'dundee':'Dundee','county-antrim':'County Antrim',
};

async function run() {
  console.log(`Ingesting ${TOWNS.length} towns into ${PROJECT_ID}/${DATASET}…`);
  for (const t of TOWNS) {
    const countyName = COUNTY_NAMES[t.countySlug] || t.countySlug;
    const doc = {
      _type: 'town',
      _id: `town-${t.slug}`,
      name: t.name,
      slug: { _type: 'slug', current: t.slug },
      county: { _type: 'reference', _ref: `county-${t.countySlug}` },
      population: t.pop,
      coverageStatus: 'coming-soon' as const,
      uniqueLocalAngle: `[Editor: replace with a 2-3 sentence locality-specific angle for ${t.name} — e.g. notable landmark, major employer, historical character, or community feature. This paragraph must only appear on this page.]`,
      longFormSections: sections(t, countyName).map(s => ({
        ...s,
        body: enrichBlocks(s.body, t.slug),
      })),
      faqs: faqs(t, countyName),
      lastReviewed: new Date().toISOString().split('T')[0],
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${t.name.padEnd(28)} (${countyName})`);
  }
  console.log(`\nDone. ${TOWNS.length} town docs created.`);
}
run().catch(err => { console.error(err); process.exit(1); });
