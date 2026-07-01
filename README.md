# Best Direct Cremation — Next.js + Sanity

This is the rebuild of bestdirectcremation.co.uk on Next.js 14 (App Router) + Sanity Studio, hosted on Vercel.

## Quick start

```bash
# 1. Install
npm install

# 2. Set up env vars
cp .env.local.example .env.local
# Sanity Project ID is already 80kiihr6 — no change needed

# 3. Run locally
npm run dev
# → site at http://localhost:3000
# → Sanity Studio at http://localhost:3000/studio
```

## Architecture

- **Framework:** Next.js 14, App Router, TypeScript
- **CMS:** Sanity Studio embedded at `/studio` (project ID `80kiihr6`)
- **Hosting:** Vercel
- **Styling:** Tailwind CSS with brand tokens matching the existing BDC visual
- **Data fetching:** `next-sanity` client with ISR (every 60s) — content updates in Sanity refresh on the live site without a redeploy

## Editor workflow

1. Editors log in at `/studio` (auth via Sanity Cloud)
2. To add a new town:
   - **Content** → **🏘️  Towns & Cities** → **Create**
   - Fill name, slug, parent county, coverage status (`coming-soon` by default)
   - Save & publish → page exists at `/[county]/[town]/` within 60 seconds
3. To add a new partner FD:
   - **Content** → **🕊️  Partner Funeral Directors** → **Create**
   - Fill name, slug, HQ address, bio, accreditation, towns served
   - Save & publish → profile at `/providers/[slug]/`
4. To flip a town from "coming soon" to "live":
   - Open the town document, change `coverageStatus` → `live`, reference the partner FD, save
   - Page treatment changes automatically (CoveragePendingBanner removed, partner FD section rendered)

## Content scaling (see `bdc-content-plan.xlsx`)

| Tier | Pages | Status |
|---|---|---|
| Tier 1 — Foundation + cornerstone | 16 | Scaffolded |
| Tier 2 — 96 counties | 96 | Ingest stubs via `scripts/ingest-wordpress.ts`, editors extend |
| Tier 3 — 50 Tier-1 cities + 41 generic + 8 comparison + 14 cost/near-me + 25 FD profiles | 138 | Build wave 3 |
| Tier 4 — 130 Tier-2 towns | 130 | Build wave 4 |
| Tier 5 — 24 help articles + funeral plans cluster | ~155 | Build wave 5 |
| Tier 6 — Tier-3 long-tail towns | ~1000 | Phased |

## Ingesting the WordPress content

```bash
# Set a write token (sanity.io/manage → API → Tokens → create with "Editor" rights)
export SANITY_API_WRITE_TOKEN=sk...

# Run the ingester
npx tsx scripts/ingest-wordpress.ts
```

Imports 95 county stubs into Sanity as `coming-soon`. Editors then flip to `live` and write the long-form sections per the content plan brief (see `bdc-content-plan.xlsx` tab "12 — Writer brief").

## Phone CTA pattern

`0333 242 1405` is in `lib/site.ts` only — six placements per page:
1. Header (every page)
2. Hero (every page)
3. Mid-content (every ~600 words on long pages)
4. Sticky mobile call bar (`<MobileCallBar />`, every page on mobile)
5. End-of-page CTA strip (county/town pages)
6. Footer

To change the phone number, edit `lib/site.ts` once — every CTA updates.

## Deploy

This repo is wired to Vercel via GitHub. Every push to `main` deploys.

While we're in build mode (no production domain yet), the live preview is at `*.vercel.app`. When ready to cut over:
- Add `bestdirectcremation.co.uk` as a production domain in Vercel
- Uncomment the production origin entries in `next.config.mjs` `serverActions.allowedOrigins`
- Update `SITE.url` in `lib/site.ts` if needed (already `https://bestdirectcremation.co.uk`)

## Scaffolded file map

```
.
├── app/                              Next.js App Router pages
│   ├── layout.tsx                    Root layout (header / footer / mobile call bar / Org+WebSite JSON-LD)
│   ├── page.tsx                      Homepage (cornerstone copy in code)
│   ├── [county]/page.tsx             Dynamic county page (Sanity)
│   ├── [county]/[town]/page.tsx      Dynamic town page (Sanity)
│   ├── coverage/page.tsx             Coverage hub (lists all counties from Sanity)
│   ├── direct-cremation/page.tsx     "What is direct cremation" cornerstone
│   ├── funeral-plans/page.tsx        Funeral plans pillar (informational, pre-launch)
│   ├── providers/page.tsx            FD partner grid (Sanity)
│   ├── providers/[slug]/page.tsx     FD profile page (Sanity)
│   ├── help/page.tsx                 Article hub
│   ├── help/[slug]/page.tsx          Article (Sanity)
│   ├── services/[slug]/page.tsx      Generic-term lander (Sanity)
│   ├── compare/page.tsx              Provider comparison (cornerstone stub)
│   ├── cost/page.tsx                 Cost guide (cornerstone stub)
│   ├── about/page.tsx, contact/page.tsx
│   ├── studio/[[...tool]]/page.tsx   Embedded Sanity Studio
│   ├── sitemap.ts                    Auto-generated from Sanity
│   ├── robots.ts                     Auto-generated
│   └── llms.txt/route.ts             For LLM crawlers
├── components/                       React components — all reusable
│   ├── Header, Footer
│   ├── PhoneCTA, MobileCallBar
│   ├── Hero, Container
│   ├── ProcessSteps, ComparisonStrip, PriceBlock
│   ├── FAQ, LongFormSections, JsonLd
│   └── CoveragePendingBanner        (for "coming-soon" counties/towns)
├── lib/
│   ├── site.ts                       SITE constants (phone, price, brand)
│   ├── sanity.ts                     next-sanity client + image URL builder
│   ├── queries.ts                    GROQ queries
│   └── seo.ts                        Schema.org JSON-LD generators
├── sanity/
│   ├── schemas/
│   │   ├── index.ts                  Schema registry
│   │   ├── county.ts, town.ts, partner.ts, article.ts, genericTerm.ts, siteSettings.ts
│   │   └── objects/                  faqItem, crematoriumRef, seoBlock, openingHoursDay, longFormSection
├── scripts/
│   └── ingest-wordpress.ts           One-shot WP → Sanity import
├── sanity.config.ts                  Studio config (project ID 80kiihr6)
├── sanity.cli.ts                     CLI config
├── tailwind.config.ts                Tokens reproducing the existing BDC visual
├── next.config.mjs                   301 redirects from legacy WP URLs + image CDN allowlist
├── package.json, tsconfig.json, postcss.config.js
└── README.md
```

## Status & next steps

✅ Foundation scaffolded — Next.js + Sanity Studio at /studio.
✅ 5 Sanity schemas defined (county / town / partner / article / genericTerm) + siteSettings.
✅ Homepage, county template, town template, coverage hub, providers, help — all rendering from Sanity.
✅ Sitemap, robots, llms.txt — all auto-generated.
✅ PhoneCTA pattern (6 placements per page) wired up.

**Next steps:**
1. `npm install` and `npm run dev` — verify locally.
2. Push to GitHub → Vercel auto-deploys to a preview URL.
3. Visit `<preview>.vercel.app/studio`, log in, run the ingestion script to populate the 95 county stubs.
4. Editors flip the "live" counties (Hampshire, Kent, Surrey etc.) to `live` status, reference partner FDs, write long-form sections.
5. Once ~80% of content is migrated, point the production domain at Vercel.

## Documentation

- `docs/TOPLINE-SUMMARY.md` — one-page overview of what the site does
- `docs/SANITY-EDITING-MANUAL.md` — how to edit content in Sanity Studio
- `docs/GO-LIVE-REVIEW.md` — full team briefing pack
- `docs/WINNING-PAGE-FORMAT-SPEC.md` — reference structure for new pages

## Environment

Copy `.env.local.example` → `.env.local` and fill in the tokens. See the example file for what each variable is.

## Sanity Studio

Deployed at `bestdirectcremation-co-uk.vercel.app/studio/`. Sign in with the account you were invited on.
