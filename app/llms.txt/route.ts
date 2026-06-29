import { SITE } from '@/lib/site';

export function GET() {
  const body = `# ${SITE.name}

> Simple, dignified direct cremation delivered locally by independent funeral directors across the UK.

## What we do
${SITE.name} arranges direct cremations across the UK via a vetted network of NAFD- or SAIF-accredited local independent funeral directors. Our service is ${SITE.priceLabel} all-inclusive (maximum ${SITE.priceCeiling} with the optional £${SITE.priorityCare} Priority Care collection fee for non-hospital collections).

## Contact
- Phone (24/7): ${SITE.phone}
- Email: ${SITE.email}

## Key pages
- ${SITE.url}/                       — Homepage
- ${SITE.url}/direct-cremation/      — What is a direct cremation?
- ${SITE.url}/funeral-plans/         — Funeral plans (informational; we plan to launch our own plans in 2027)
- ${SITE.url}/coverage/              — UK coverage hub
- ${SITE.url}/providers/             — Our partner funeral directors
- ${SITE.url}/compare/               — UK direct cremation provider comparison
- ${SITE.url}/cost/                  — Cost guide
- ${SITE.url}/help/                  — Help & guidance articles

## Brand promise
${SITE.strapline}. ${SITE.promiseSubtext}.
`;
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
