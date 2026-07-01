/**
 * Seed the missing Newport (Wales) county doc.
 *
 * Wales has 22 unitary authorities — we had 21 in Sanity (Newport was omitted
 * from the original ingest-counties.ts). This one-off script creates the
 * Newport county doc so expand-towns.ts can reference `countySlug: 'newport'`.
 *
 * Idempotent — uses createIfNotExists.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... npx tsx scripts/seed-newport-county.ts
 */
import { createClient } from '@sanity/client';
import { randomBytes } from 'crypto';

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6';
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;
if (!TOKEN) throw new Error('Set SANITY_API_WRITE_TOKEN before running.');

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-10-01', useCdn: false, token: TOKEN,
});

function k(): string { return randomBytes(6).toString('hex'); }
const pt = (text: string) => ({ _type: 'block', _key: k(), style: 'normal', children: [{ _type: 'span', _key: k(), text }], markDefs: [] });
const h2 = (text: string) => ({ _type: 'block', _key: k(), style: 'h2', children: [{ _type: 'span', _key: k(), text }], markDefs: [] });

const N = 'Newport';

const doc = {
  _type: 'county',
  _id: 'county-newport',
  name: N,
  slug: { _type: 'slug', current: 'newport' },
  country: 'Wales',
  region: 'Wales',
  coverageStatus: 'coming-soon' as const,
  longFormSections: [
    { _key: k(), _type: 'longFormSection', sectionRole: '01-intro',
      heading: `Direct cremation in ${N}, Wales`,
      body: [
        pt(`Direct cremation in ${N} is delivered locally by a vetted independent Best Funeral Director working in and around the city, at £1,499 all-inclusive (maximum £1,749 with Priority Care). Best Direct Cremation covers ${N} — Wales's third-largest city — through a UK-wide network of NAFD- or SAIF-accredited local partners. Your loved one stays close to home throughout: no centralised national mortuary, no long transport.`),
        pt(`${N} has a rich industrial and maritime heritage, from its dockside history to its modern role as a commercial and cultural hub of south-east Wales. Our local funeral directors serving ${N} understand the community and are locally accountable — you're not dealing with a national brand's regional office. This page explains what a direct cremation costs in ${N}, how the process works, and which crematorium serves the area.`),
      ],
    },
    { _key: k(), _type: 'longFormSection', sectionRole: '02-price',
      heading: `${N} direct cremation cost — from £1,499 all-inclusive`,
      body: [
        pt(`Our price in ${N} is the same £1,499 all-inclusive as everywhere else in the UK. If collection is from home, a care home or a hospice rather than a hospital mortuary, a £250 Priority Care fee applies — taking the maximum total to £1,749. There is no Welsh regional supplement, no hidden fee at the point of need, and no upsell.`),
        pt(`For context, the average traditional funeral in Wales in 2026 costs around £4,325 (SunLife Cost of Dying Report). A direct cremation saves roughly £2,800 versus a traditional funeral — money many families put toward a memorial service later, at a venue and time that means something to them.`),
      ],
    },
    { _key: k(), _type: 'longFormSection', sectionRole: '03-process',
      heading: `How arranging a direct cremation in ${N} works`,
      body: [
        pt(`When you call us from ${N} on 0333 242 1405, a real person answers 24 hours a day. We take the essential details — where your loved one is, next-of-kin, any specific requests — and appoint your local Best Funeral Director. They contact you directly to confirm collection.`),
        pt(`You register the death at ${N} Register Office within 5 days (only the next of kin can do this in person). The local funeral director handles everything else: paperwork, the cremation at your closest local crematorium (typically Gwent Crematorium at Croesyceiliog or another local option depending on availability), and the return of the ashes to you. From start to finish, expect roughly 10–21 days.`),
      ],
    },
    { _key: k(), _type: 'longFormSection', sectionRole: '04-local-team',
      heading: `Your local funeral director in ${N}`,
      body: [
        pt(`Best Direct Cremation partners with vetted independent funeral directors across ${N} and the surrounding Gwent area. Every partner is a member of the NAFD or SAIF (or both), locally based, and accountable to the community they serve. We check standards continuously — this is not a franchise or a re-badge of a national operator.`),
        pt(`If we do not yet have a named partner in your specific ${N} suburb, we source a nearby vetted independent who meets the same standards. Call us on 0333 242 1405 and we will confirm the specific coverage for your postcode within minutes.`),
      ],
    },
    { _key: k(), _type: 'longFormSection', sectionRole: '05-crematoria',
      heading: `Crematoria serving ${N}`,
      body: [
        pt(`Direct cremations arranged in ${N} typically take place at Gwent Crematorium in Croesyceiliog, near Cwmbran — the main crematorium serving south-east Wales. It is operated to the standards of the Cremation (England and Wales) Regulations 2008 and is run by a joint committee of local councils. Your local funeral director books the closest available slot and handles all paperwork with the crematorium directly.`),
      ],
    },
  ],
  faqs: [
    { _key: k(), _type: 'faqItem',
      question: `Do you cover ${N} for direct cremation?`,
      answer: [pt(`Yes. Best Direct Cremation covers ${N} and the surrounding parts of Gwent via a network of vetted local independent funeral directors. Call 0333 242 1405 to confirm the specific coverage for your postcode.`)],
    },
    { _key: k(), _type: 'faqItem',
      question: `How much does a direct cremation cost in ${N}?`,
      answer: [pt(`£1,499 all-inclusive nationally, with a maximum of £1,749 if Priority Care collection is needed. Our pricing does not vary by region — the price in ${N} is the same as anywhere else in the UK.`)],
    },
    { _key: k(), _type: 'faqItem',
      question: `Which crematorium is used for ${N} direct cremations?`,
      answer: [pt(`Typically Gwent Crematorium in Croesyceiliog, near Cwmbran — the main crematorium serving south-east Wales. Your local funeral director chooses the closest available slot.`)],
    },
    { _key: k(), _type: 'faqItem',
      question: `Where is ${N} Register Office?`,
      answer: [pt(`${N} Register Office is at the Civic Centre, Godfrey Road, ${N}, NP20 4UR. You must register the death within 5 days. Bring the Medical Certificate of Cause of Death, plus the deceased's personal details.`)],
    },
    { _key: k(), _type: 'faqItem',
      question: `Is direct cremation less dignified than a traditional funeral in ${N}?`,
      answer: [pt(`No. Direct cremation strips out only the ceremonial service at the crematorium — the care itself is identical to a traditional cremation. Your loved one is treated with the same professional dignity by a local funeral director, in a proper coffin, at a proper crematorium. Many families in ${N} choose to hold their own memorial afterwards, at a venue and time that means something to them.`)],
    },
    { _key: k(), _type: 'faqItem',
      question: `Can family attend a direct cremation in ${N}?`,
      answer: [pt(`A pure direct cremation has no attendance at the crematorium. However, we can arrange an "attended direct cremation" — a small unhurried gathering of up to 20 people at Gwent Crematorium if you ask when you call. There is a small additional cost from the crematorium which we pass through at cost.`)],
    },
  ],
  seo: {
    metaTitle: 'Direct Cremation in Newport, Wales — from £1,499',
    metaDescription: '£1,499 all-inclusive direct cremation in Newport, Wales, delivered locally by a vetted independent funeral director. Max £1,749 with Priority Care. Call 0333 242 1405.',
  },
  lastReviewed: new Date().toISOString().split('T')[0],
};

async function run() {
  console.log('Seeding Newport (Wales) county doc…');
  const existing = await client.fetch(`*[_id == "county-newport"][0]`);
  if (existing) {
    console.log('  ✗ Newport county already exists — skipping (safe to re-run).');
    return;
  }
  await client.create(doc);
  console.log('  ✓ Newport (Wales) county doc created.');
  console.log('  → https://bestdirectcremation-co-uk.vercel.app/newport/ will be live after next Vercel rebuild.');
}

run().catch(err => { console.error(err); process.exit(1); });
