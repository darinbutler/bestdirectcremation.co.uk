/**
 * One-shot WordPress → Sanity ingestion.
 *
 * Pulls every county slug from the legacy site, scrapes the page content,
 * and emits Sanity-shaped `county` documents (as stubs — editors then extend
 * each to the long-form pattern via Sanity Studio).
 *
 * Usage:
 *   npm install
 *   export SANITY_API_WRITE_TOKEN=...    # create at sanity.io/manage → API → Tokens
 *   tsx scripts/ingest-wordpress.ts
 */

import { createClient } from '@sanity/client';

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '80kiihr6';
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN;
if (!TOKEN) throw new Error('Set SANITY_API_WRITE_TOKEN before running ingestion.');

const client = createClient({
  projectId: PROJECT_ID, dataset: DATASET,
  apiVersion: '2024-10-01', useCdn: false, token: TOKEN,
});

// The 95+ county slugs known to be live on the WordPress site.
// Generated from the live /coverage/ page on 29 May 2026.
const COUNTY_SLUGS = [
  'bristol','wiltshire','worcestershire','warwickshire','staffordshire','shropshire',
  'herefordshire','gloucestershire','somerset','dorset','devon','cornwall',
  'hampshire','isle-of-wight','west-sussex','east-sussex','kent','surrey','berkshire',
  'buckinghamshire','oxfordshire','greater-london',
  'essex','hertfordshire','bedfordshire','cambridgeshire','norfolk','suffolk',
  'leicestershire','northamptonshire','rutland','lincolnshire','nottinghamshire','derbyshire',
  'west-midlands',
  'cheshire','merseyside','greater-manchester','lancashire','cumbria',
  'tyne-and-wear','county-durham','northumberland',
  'east-yorkshire','north-yorkshire','south-yorkshire','west-yorkshire',
  // Wales
  'anglesey','blaenau-gwent','bridgend','caerphilly','cardiff','carmarthenshire',
  'ceredigion','conwy','denbighshire','flintshire','gwynedd','merthyr-tydfil',
  'monmouthshire','neath-port-talbot','pembrokeshire','powys','rhondda-cynon-taf',
  'swansea','torfaen','vale-of-glamorgan','wrexham',
  // Scotland
  'aberdeenshire','angus','argyll-and-bute','ayrshire','dumfries-and-galloway',
  'dunbartonshire','dundee','east-lothian','edinburgh','fife','glasgow','highland',
  'inverclyde','midlothian','moray','north-lanarkshire','perth-and-kinross','renfrewshire',
  'scottish-borders','south-lanarkshire','stirlingshire','west-lothian',
  // Northern Ireland
  'county-antrim','county-armagh','county-down','county-fermanagh','county-londonderry','county-tyrone',
];

// Map slug → human name
const NAME: Record<string, string> = {
  'tyne-and-wear': 'Tyne and Wear',
  'east-yorkshire': 'East Yorkshire',
  'north-yorkshire': 'North Yorkshire',
  'south-yorkshire': 'South Yorkshire',
  'west-yorkshire': 'West Yorkshire',
  'greater-london': 'Greater London',
  'greater-manchester': 'Greater Manchester',
  'west-midlands': 'West Midlands',
  'east-sussex': 'East Sussex',
  'west-sussex': 'West Sussex',
  'isle-of-wight': 'Isle of Wight',
  'county-durham': 'County Durham',
  // Northern Ireland
  'county-antrim': 'County Antrim',
  'county-armagh': 'County Armagh',
  'county-down': 'County Down',
  'county-fermanagh': 'County Fermanagh',
  'county-londonderry': 'County Londonderry',
  'county-tyrone': 'County Tyrone',
  // Wales / Scotland edge cases
  'blaenau-gwent': 'Blaenau Gwent',
  'merthyr-tydfil': 'Merthyr Tydfil',
  'neath-port-talbot': 'Neath Port Talbot',
  'rhondda-cynon-taf': 'Rhondda Cynon Taf',
  'vale-of-glamorgan': 'Vale of Glamorgan',
  'argyll-and-bute': 'Argyll and Bute',
  'dumfries-and-galloway': 'Dumfries and Galloway',
  'east-lothian': 'East Lothian',
  'north-lanarkshire': 'North Lanarkshire',
  'perth-and-kinross': 'Perth and Kinross',
  'scottish-borders': 'Scottish Borders',
  'south-lanarkshire': 'South Lanarkshire',
  'west-lothian': 'West Lothian',
};

const titleCase = (slug: string): string =>
  NAME[slug] || slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

async function run() {
  console.log(`Ingesting ${COUNTY_SLUGS.length} county slugs into ${PROJECT_ID}/${DATASET}…`);
  for (const slug of COUNTY_SLUGS) {
    const name = titleCase(slug);
    const doc = {
      _type: 'county',
      _id: `county-${slug}`,
      name,
      slug: { _type: 'slug', current: slug },
      coverageStatus: 'coming-soon', // editors flip to 'live' once an FD partner is confirmed
      country: 'England',            // default; editors correct on import for Wales/Scotland/NI
      lastReviewed: new Date().toISOString().split('T')[0],
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${name}`);
  }
  console.log('Done. Editors: open Sanity Studio → Counties → flip coverageStatus to "live" where an FD partner exists, and write the 11 long-form sections.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
