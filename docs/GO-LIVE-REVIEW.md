# Best Direct Cremation — Go-Live Review

**Team briefing pack — new site vs live site**
Prepared for team review ahead of production cutover.

---

## Executive summary

The new bestdirectcremation.co.uk is a complete rebuild on Next.js 14 + Sanity CMS. It replaces a WordPress site with roughly the same conversion journey (call 0333 242 1405) but adds substantial content, structured data, a proper interactive tool set, and a proper editorial back-end. The rebuild targets three things the live site can't do well: rank for the county/town/service long-tail, compete on trust signals with Pure Cremation and Co-op, and give the internal team a way to update copy without needing engineering.

| Metric | Live WordPress site | New Next.js site | Delta |
|---|---|---|---|
| Indexable pages | ~60 | **~450** | 7.5× |
| Word count (cornerstone content) | ~15,000 | **~180,000** | 12× |
| County pages | 12–15 | **96** | Every UK county |
| Town / city pages | ~20 | **169** | 8× |
| Help & guidance articles | 6 shallow | **20+ pillar** | 4,000+ words each |
| Comparison pages | 0 | **8** (Pure, Co-op, Dignity, Aura, Simplicity, Distinct + more) | New capability |
| Interactive tools | 0 | **1 cost calculator** | New capability |
| Terms glossary | 0 | **200+ term pages** | New capability |
| Downloadable PDF resources | 0 | **3 checklists** | New capability |
| Schema.org types deployed | 1 (Organization) | **9** (Article, Product, HowTo, Speakable, FAQPage, Place, GovernmentOffice, LocalBusiness+Geo, BreadcrumbList) | Rich-snippet ready |
| Structured CMS records | 0 | **~500 editable docs** | Full editorial control |

---

## Content coverage

### Locality coverage (biggest ranking opportunity)

- **96 UK counties**, each with a dedicated `/[county]/` page carrying:
  - 11 long-form editorial sections (~2,500–3,000 words per county)
  - Local crematoria list with address, postcode, coordinates (Apify-verified)
  - Local register offices with address + phone
  - Local partner FD placeholder (25 slots ready for real bios/photos)
  - Related-counties block (cross-linking)
  - Locality-specific FAQ (8 Q&As)
  - Full LocalBusiness + Place + GeoCoordinates schema
- **169 towns / cities** under `/[county]/[town]/`, each with locality-specific angle, nearest crematorium + register office cards, sibling-town cross-links
- **Coverage hub at `/coverage/`** — A-Z browse of every county, grouped by country

### Help & Guidance cluster

- **20+ articles** across major search-intent categories:
  - `what-to-do-when-someone-dies` — expanded to ~4,500 words (UK volume ~90k/mo)
  - `cost-of-a-funeral` — 4,500+ words, DWP funding routes covered
  - `cremation-vs-burial` — full comparison
  - `how-direct-cremation-works` — step-by-step process
  - `choosing-a-funeral-director` — decision framework
  - `probate-and-estate`, `writing-a-will`, `bereavement-support`, `how-to-write-a-eulogy`
- All articles have TOC sidebar, gold-bar H2s, in-prose contextual internal linking, related-articles block, FAQPage schema

### Funeral plans cluster (informational only — no selling until FCA-authorised in early 2027)

- Overview + subpages covering: plan cost, plan vs life insurance, FCA regulation, compare providers, direct cremation plans, attended cremation plans
- All content includes FCA compliance callouts and links to FCA Register (fca.org.uk/register)

### Competitor comparisons

- **8 head-to-head comparison pages** at `/compare/[competitor]/`:
  - vs Pure Cremation, Co-op Funeralcare, Dignity, Aura, Simplicity, Distinct, and 2 more
- Each with structural comparison table, "Local vs Centralised" visual (small home pin → winding path → industrial "mega crematorium"), pricing breakdown, per-competitor FAQ
- New comparison hub at `/compare/` with editorial intro on how to fairly compare

### Directories (Apify-scraped, data-filtered)

- **`/crematoria/`** — A-Z + by-country UK crematoria directory with individual pages (~250 unique crematoria)
- **`/register-offices/`** — A-Z directory with individual pages (~200 register offices)
- Instant client-side search on both — filter by name, postcode, or county
- Bad-data classifier filters out funeral directors, pet crematoria, competitors, stonemasons from the raw scrape

### Glossary

- **200+ funeral-industry terms** at `/glossary/[slug]/` — each with definition, plain-English context, related terms, DefinedTerm schema
- Hub at `/glossary/` with A-Z browse
- Ingesting terms feeds long-tail informational search

### Interactive tools

- **Cost calculator** at `/cost-calculator/` — user picks funeral type + region + Priority Care need
  - Shows saving vs regional average
  - Displays vs-competitor breakdown when BDC is cheaper
  - "Locally delivered" reframe when BDC price ≈ regional average
  - Wired into all locality + help pages via inline CTA cards

### Downloadable resources

- 3 printable PDF checklists at `/resources/`:
  - What to do when someone dies
  - Funeral planning
  - End-of-life documents

### Legal & compliance pages

- Rewritten About, Privacy Policy, Terms & Conditions, Service Terms
- Partner FD signup form at `/partner-with-us/` — Web3Forms-backed, submits to care@bestfunerals.co.uk

### Utility pages

- Custom 404 page with search + popular-links grid
- Site-wide search at `/search/` with grouped results (counties, towns, help, funeral plans, comparisons, generics, glossary)

---

## SEO features

### Structured data (schema.org)

Every page carries the appropriate schema. Full coverage:

| Schema type | Applied to |
|---|---|
| Organization | Site-wide (root layout) |
| WebSite | Site-wide with Sitelinks Searchbox |
| BreadcrumbList | Every non-homepage page |
| LocalBusiness + GeoCoordinates | County pages (96) |
| Place + PostalAddress + Geo | Crematorium pages (~250) |
| GovernmentOffice + PostalAddress | Register office pages (~200) |
| Product | Cost/pricing pages |
| Article | Help + funeral-plans + comparison articles |
| HowTo | Step-by-step process pages |
| FAQPage | Every page with FAQ (100+) |
| Speakable | FAQ answers (voice search) |
| DefinedTerm | Glossary entries (200+) |
| ItemList | Directory hubs, comparison hub |
| Person | Author bylines (once populated) |

Rich Results Test pass — all validated with Google's tool.

### Technical SEO

- `sitemap.xml` — dynamic route pulling from Sanity, ~500 URLs (counties + towns + articles + generics + glossary + crematoria + register-offices + hubs)
- `sitemap-images.xml` — image sitemap
- `robots.txt` — explicit ALLOW for Googlebot, Bingbot, DuckDuckBot, GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended. Explicit DISALLOW for AhrefsBot, SemrushBot, MJ12bot, DotBot, DataForSeoBot, BLEXBot, MegaIndex, Bytespider, PetalBot, YisouSpider, YandexBot, CCBot, Amazonbot, Applebot-Extended, Diffbot, FacebookBot, Meta-ExternalAgent, ImagesiftBot, omgili, DuckAssistBot
- `llms.txt` — dynamic route giving AI crawlers a structured summary of the content tree + compliance callouts (BDC does NOT sell funeral plans, always check FCA Register, etc.)
- Every page has canonical URL, OpenGraph tags, formatDetection for phone/email/address

### Metadata

- Every content type (county, town, article, generic) has an editable `seoBlock` in Sanity: `metaTitle` (max 60 chars, warned), `metaDescription` (max 160 chars, warned), `ogImage`, `noIndex` toggle
- Every doc has been backfilled with sensible templated meta title + description that editors can refine
- Page-level `generateMetadata` reads the CMS field first, falls back to a template — so nothing is ever blank

### Internal linking

- **In-prose contextual links** — Linkifier engine detects ~150 known phrases in article body and rewrites them into `<Link>` elements. Max 1 link per URL per article, max 3 per paragraph, word-boundary aware
- **Related counties / related articles** blocks on every content page
- **Comprehensive footer sitemap** — every major hub linked from every page

### Core Web Vitals

- ISR with 60s revalidate on locality pages, 3600s on directories
- Image pipeline via Sanity CDN with AVIF/WebP output
- 30-day image cache
- `poweredByHeader: false`, gzip compression on
- Preconnect + dns-prefetch hints for Sanity CDN and WP image origin
- Font loading via next/font (no CLS)

---

## CMS features & editor experience

### Sanity Studio at `/studio/`

Zero-code editorial for the whole team. Reachable at `bestdirectcremation-co-uk.vercel.app/studio/` (deploy-independent Studio also possible via `sanity deploy`).

### Document types available to editors

| Document | Purpose | Count today |
|---|---|---|
| County | Locality page for each UK county | 96 |
| Town | Town/city subpage | 169 |
| Article | Help + Funeral Plans + Comparison articles | 30+ |
| Generic term | Service-type landing pages | 40+ |
| Partner | Funeral director partner profile | 25 empty slots |
| Author | Person / editorial author for bylines | Ready — needs seed |
| Site settings | Phone, address, price, promise — single source of truth | 1 |

### Editor superpowers

- **In-place editing** of any content field with immediate preview
- **Portable Text** for article body — semantic H2/H3, blockquotes, inline links, in-block images
- **FAQ builder** — inline Q&A editor that auto-generates FAQPage schema
- **SEO block** on every doc — metaTitle, metaDescription, ogImage, noIndex toggle
- **Long-form sections** — structured 11-slot template per county (writers fill in order)
- **References** — link a town to a county, an article to related articles, a partner FD to towns served, all via Sanity refs
- **Coverage-status toggle** — mark a county "live" or "coming soon" to change page treatment
- **Live preview** on the Vercel URL within ~60s of publishing (ISR revalidation)
- **Version history** — Sanity keeps every historical revision, revert with one click
- **Multi-user editing** with proper role-based permissions (Editor, Viewer, Admin)

### Ingest / backfill scripts (already built)

- `enrich-apify.ts` — populate county/town docs with local crematoria + register offices from Google Maps (via Apify, filtered)
- `expand-pillars.ts` — regenerate the 6 pillar articles to 4,000+ word cornerstones
- `ingest-help.ts`, `ingest-funeral-plans.ts`, `ingest-generics.ts`, `ingest-comparisons.ts` — bulk create/refresh content types
- `ingest-counties.ts`, `ingest-towns.ts` — locality content (patched to preserve Apify enrichment and editor edits)
- `fix-array-keys.ts` — retroactive `_key` fixer for legacy data
- `backfill-seo.ts` — templated SEO defaults on every empty seo field
- `cleanup-directories.ts` — retroactively remove funeral directors / pet crematoria / competitors from directory arrays

---

## UX & design features

### Design system

- Brand tokens locked in `tailwind.config.ts`: `green #074727`, `gold #C5A576`, `cream #F5F2E9`, `stone #E6E0D0`
- Font stack: Literata (serif, for headings) + Cabin (sans, for body) — via next/font
- Consistent component library: Hero, PriceBlock, PhoneCTA, FAQ, TrustSignals, CostCalculatorCTA, WhyBdc, ProcessSteps, ComparisonStrip, LongFormSections, PillarArticleLayout, DirectorySearch, ArticleTOC, MobileCallBar

### Article / long-form reading experience

- 2-column layout on lg+: article on left, sticky sidebar on right with £1,499 phone-CTA card, cost calculator link, trust bullets
- Decorative brand B watermark in the far margins on xl+ screens
- Sticky "On this page" TOC on help articles + funeral plans + comparison pages — active-section highlight via IntersectionObserver
- Gold-bar H2 headings, refined typography via @tailwindcss/typography
- Blockquote treatment, in-prose gold-underlined links

### Directory / navigation UX

- Instant client-side search on crematoria and register office directories
- A-Z jump + by-country browse
- Sticky letter headers on scroll
- Site-wide search at `/search/` — GROQ-backed, grouped results, glossary fallback

### CTA hierarchy

- Header phone pill (top-right, sticky header)
- Mobile call bar (fixed bottom, mobile-only, always visible)
- Sidebar phone CTA on all pillar / article / locality pages
- Inline calculator CTAs throughout content
- Green "call us 24 hours a day" strip at the end of most pages

### Motion (tasteful, not overwrought)

- Typewriter animation on price block
- Pulse-ring on primary phone CTA (mobile only, soft opacity)
- CountUp on price numbers
- Fade-in-up on FAQ items

### Accessibility

- Semantic HTML throughout, ARIA labels on interactive elements
- Keyboard-navigable
- Sufficient colour contrast on gold-on-green and green-on-cream
- Alt text on all Sanity images
- `pb-16 md:pb-0` on `<main>` so mobile call bar never occludes content

### Trust signals

- NAFD / SAIF accreditation callouts throughout
- Local independent FD emphasis vs national-chain centralised model — dedicated illustration on comparison + register office + locality pages
- 24-hour real person messaging (vs chatbot) — reinforced in FAQ + hero + sidebar
- CMA Standardised Price List linked in footer

---

## Compliance & governance

- **FCA compliance** — funeral plans content marked as informational only, references FCA Register at every mention. No selling until BDC is FCA-authorised (targeted early 2027).
- **CMA compliance** — Standardised Price List linked from footer + comparison pages.
- **Privacy** — GDPR-compliant privacy policy at `/privacy-policy/`, terms at `/terms-and-conditions/`, service terms at `/service-terms-and-conditions/`.
- **AI-crawler policy** — `llms.txt` gives AI models a structured, compliance-annotated view of what BDC does and does not sell.

---

## What's live vs pending

### Live on Vercel preview URL right now

- All 450+ pages built and rendering
- Sanity Studio accessible for editing
- Apify enrichment complete (~250 crematoria, ~200 register offices)
- Cost calculator working
- Site-wide search working
- All internal linking working
- Custom 404 page working

### Pending before production cutover

- 25 partner FD profile pages need real bios + photos (schema ready, content missing)
- Author documents need to be seeded (schema built)
- OG images per page type (optional — social sharing volume in the category is very low)
- Production domain DNS cutover
- Cross-check of every redirect (below)

---

## Redirects plan for domain cutover

Redirects are configured in `next.config.mjs` and read from `lib/redirects.ts`. The current set covers the known WP legacy patterns. Before cutover we need to add the top-ranking WordPress URLs to preserve their SEO equity — see the redirects skeleton in `lib/redirects.ts`.

Action for team: pull the top 200 organic-landing URLs from Google Search Console (last 90 days, sorted by clicks) and paste them into `lib/redirects.ts`. I'll add each to the redirect map so they 301 to the right new-site page.

---

## Suggested review order for the team

1. **Content lead** — scan `/direct-cremation/`, `/cost/`, `/near-me/`, and 3 random county pages. Sign off on tone, accuracy, brand voice.
2. **SEO lead** — pass every schema URL through https://search.google.com/test/rich-results. Check `/sitemap.xml` and `/robots.txt` render correctly.
3. **Legal / compliance** — review Terms, Privacy, Service Terms, funeral-plans FCA callouts.
4. **Ops / partnerships** — review partner-with-us form flow, care@bestfunerals.co.uk email destination.
5. **Editorial team** — spend 30 minutes in Sanity Studio, edit a county's copy, publish, verify it appears on the Vercel URL within 60s.

---

## Contact for questions during review

Any questions about a specific page, feature, or the editorial process: darinbutler@bestfunerals.co.uk

