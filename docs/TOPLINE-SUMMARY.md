# Best Direct Cremation — one-page summary

## What we built

A complete Next.js 14 + Sanity CMS replacement for the existing WordPress bestdirectcremation.co.uk. Live on Vercel preview at `bestdirectcremation-co-uk.vercel.app`. Ready for domain cutover.

## Numbers

| Old site | New site |
|---|---|
| ~60 pages | **~500 pages** |
| Static WordPress | Dynamic Next.js + Sanity CMS |
| No calculator | Interactive cost calculator |
| No search | Site-wide + directory + coverage search |
| No structured data | 9 schema.org types deployed |
| 6 shallow help articles | 20+ pillar articles (4,000+ words each) |
| 15 county pages | 97 UK counties fully covered |
| 20 town pages | 370+ towns |
| 0 competitor comparisons | 8 head-to-heads |
| 0 generic-term landers | ~60 |
| 0 glossary | 200+ terms |

## What's new for users

- **Every UK county + 370+ towns** each with locality-specific 2,500-word pages, local crematoria + register offices (Apify-verified), local funeral director callout
- **Interactive cost calculator** at `/cost-calculator/` — regional pricing, competitor comparison, honest "locally-delivered fixed-price" messaging when at par with regional average
- **Site-wide search** at `/search/` — instant grouped results across counties, towns, articles, glossary
- **Coverage page with instant filter** — search "Bolton" and jump straight to the town
- **Crematoria + register offices directories** with A-Z + by-country + search
- **8 competitor comparison pages** — fair, honest, with mega-crematorium illustration
- **200-term glossary** — every UK funeral term indexed
- **Downloadable PDF checklists** — what to do when someone dies, planning, end-of-life documents
- **Custom 404 page** — search + popular pages instead of dead-ends
- **Mobile-first CTAs** — sticky phone bar always visible on mobile

## What's new for editors

- **Sanity Studio at `/studio/`** — zero-code editorial for every content type
- **Every doc has an SEO block** — meta title, meta description, OG image, noIndex toggle
- **In-place editing** — change any field, autosaves, live on the site in ~60s (ISR revalidation)
- **Version history** — every change is versioned, revert with one click
- **Author document type** for EEAT bylines (schema built, needs seed authors)
- **Multi-user access** — invite editors with role-based permissions

## What's new for SEO

- **All 9 schema.org types deployed** — Organization, LocalBusiness+Geo, Article, Product, HowTo, FAQPage, Place, GovernmentOffice, BreadcrumbList, DefinedTerm, plus WebSite with Sitelinks Searchbox
- **sitemap.xml** dynamic from Sanity, ~500 URLs
- **llms.txt** dynamic route giving AI crawlers a compliance-annotated content tree
- **robots.txt** — explicit ALLOW for Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot. Explicit DISALLOW for AhrefsBot, SemrushBot, MJ12bot, Bytespider, CCBot, Amazonbot + 20 more scrapers.
- **In-prose contextual internal linking** — the Linkifier engine detects ~150 known phrases in article body and adds gold-underlined internal links (max 1 link per URL per article, max 3 per paragraph)
- **Every page has editable metaTitle + metaDescription** in Sanity, with sensible templated defaults backfilled
- **301 redirect infrastructure** at `lib/redirects.mjs` — WP structural moves already handled; ready for GSC top-page URLs to be added before cutover

## What's new for the sales / phone journey

- **Single phone 0333 242 1405** — displayed 8+ times per page in different variants
- **Real person / 24 hours** messaging throughout
- **Sticky mobile call bar** always visible on mobile
- **Sticky desktop sidebar** on all pillar pages with £1,499 price card + phone + calculator link + trust bullets
- **Personally-vetted local funeral director** is the trust anchor — repeated on every content page
- **Local vs centralised** is the structural differentiator — visualised with the small warm home pin → winding path → industrial "mega crematorium" illustration

## Compliance built in

- **Funeral plans content is informational only** — BDC is NOT yet FCA-authorised (targeted early 2027). Every FP page cites the FCA Register at fca.org.uk/register.
- **CMA Standardised Price List** linked in footer + on comparison pages
- **GDPR-compliant** Terms, Privacy, Service Terms pages
- **AI-crawler policy** in llms.txt spells out that BDC does not sell funeral plans

## What's pending

- **Author documents** — seed at least one "BDC Editorial Team" author before cutover
- **25 partner FD profile pages** — blocked on real bios/photos
- **Domain cutover** — DNS switch to Vercel + populate GSC top-page URLs in `lib/redirects.mjs`
- **Competitor audit gap pages** — batch 3 identified (~30 more terms) but not built

## How to run and edit

See `BDC-SANITY-EDITING-MANUAL.md` for content editing.
Repo at `~/bestdirectcremation` (github.com/darinbutler/bestdirectcremation.co.uk).
Vercel preview auto-deploys on push to `main`.
Sanity Studio: `bestdirectcremation-co-uk.vercel.app/studio/`.
