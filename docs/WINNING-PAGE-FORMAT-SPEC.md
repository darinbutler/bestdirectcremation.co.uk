# Winning page format — beat the UK cremation competition

This is the reference structure every new generic-term page should hit. It's the format that will systematically outperform Pure Cremation, Co-op Funeralcare, Dignity, Aura, Simplicity and Distinct on informational queries — plus the affiliate content mills (Which?, MoneyHelper, government pages) that often outrank operators.

Use this alongside `outputs/competitor-audit-summary.md` (produced by `scripts/audit-competitors.ts`). The audit tells you what the specific top-ranking pages for each term look like; this spec tells you the format that beats them.

---

## Content depth — the non-negotiables

- **Minimum 1,200 words** for any informational term. **2,000+ words** for cornerstone terms (cost, cheap, DWP payment, what happens to ashes, etc). Competitor audits will confirm whether you need to go higher.
- **Every H2 the top 5 competitors cover** — plus 2–3 they don't. The audit summary lists common H2 patterns for each term.
- **UK-specific throughout** — reference NAFD/SAIF, CMA Standardised Price List, FCA Register for funeral plans, DWP Funeral Expenses Payment, the Green Form.
- **Real 2026 pricing.** Every page includes £1,499 all-inclusive and the £1,749 ceiling. Visible price consistently correlates with UK cremation-page performance.
- **Locality-agnostic pages still reference locality.** "Available in every UK county through our network of…" — even a one-line national-coverage callout signals depth.

---

## Page anatomy (top to bottom)

### 1. Hero block
- **H1**: the exact search term, phrased as user question. E.g. "Cheap Cremation UK — what's actually available in 2026?"
- **Eyebrow tagline**: 3–5 words, sets category. E.g. "UK cost guide"
- **Sub-line** with £1,499 + phone number visible immediately.

### 2. Trust signals row (always second, right under Hero)
- **NAFD / SAIF accreditation** + Local independent + Real person 24/7 + Transparent max price.
- Component: `<TrustSignals />` — already handles this.

### 3. Editorial article block (2-column, sticky sidebar on lg+)
Use `<PillarArticleLayout>` — gives us the sidebar with £1,499 phone card + calculator link + trust bullets, and the decorative brand watermark.

Inside the article:
- **Lead paragraph (150-250 words)** answering the query in the first three sentences. Google's featured-snippet logic rewards this.
- **8-12 H2 sections**. Every one carries an in-prose contextual link to a related page (help article, cost calculator, /compare/, /coverage/).
- **~150 words per H2 section minimum**. Deeper sections for cornerstone content.
- **Use lists sparingly** — Google flags list-heavy pages as thin. Prose > bullets for cornerstone content.
- **Include a real data point every 300 words** — a stat, a quote from a governing body, a citation. E.g. "The average UK funeral in 2026 costs £4,510 according to the SunLife Cost of Dying Report."
- **One image every 500-800 words** on longer pieces (illustration or genuine relevant photo).

### 4. Inline `<CostCalculatorCTA variant="card" />`
After the editorial article. Cost / cheap / budget-related terms in particular should drop the calculator inline.

### 5. `<ProcessSteps />` (for how-to terms)
For any term with "how", "arrange", "steps", or "process" in it.

### 6. `<ComparisonStrip />` (for cost / vs-competitor terms)
Fair, honest, UK-focused. Doesn't attack — just states the facts.

### 7. `<PriceBlock />`
Always. Non-negotiable.

### 8. `<WhyBdc />` — the "Local vs Centralised" split card
Contains the mega-crematorium illustration. Reinforces the differentiator.

### 9. `<FAQ items={FAQS} />` — inline FAQ block
- **6–8 Q&As minimum**. 10+ for cornerstone pages.
- Real questions users actually ask (from PAA / autocomplete).
- Answers 40–80 words each — long enough for a featured snippet.
- Wrap with FAQPage schema (already handled by `<FAQ>`).

### 10. Closing green CTA section
- Eyebrow: intent restated ("Ready to arrange today?" / "Need help understanding costs?")
- H2 headline
- Reassurance line
- `<PhoneCTA size="lg" variant="invert" showSubtext pulse />`

### 11. Structured data (JSON-LD via `<JsonLd>`)
On every generic-term page:

- `Article` — with `author` set to a `Person` (needs the Author schema populated first)
- `FAQPage` — from the FAQ block
- `Product` — for cost/pricing terms (declares the £1,499 offer)
- `BreadcrumbList` — always
- `Service` — for service-noun terms

---

## Copy patterns that reliably outperform

### Opening line templates
| Term type | Opening pattern |
|---|---|
| Cost / price | "A [type] cremation in the UK costs [range] in 2026. The most transparent all-in price is [our number], with a maximum of [ceiling] once Priority Care is added." |
| Comparison ("vs") | "In the UK in 2026, [A] costs around £X and [B] costs around £Y. The real difference isn't price — it's [structural difference]." |
| How-to | "You can arrange a [X] in the UK in three steps: [step 1], [step 2], [step 3]. This page walks through each in detail." |
| What-is / synonym | "[Term] is another name for [canonical concept]. It's used interchangeably with [related terms] in the UK." |
| DWP / funding | "If you're on a qualifying benefit, the DWP Funeral Expenses Payment can cover [X]. Here's what qualifies, how to claim, and what to do if you're not eligible." |

### H2 sections that Google rewards
- "How much does it cost?" — direct answer + range
- "What's included / what's not"
- "Who is it right for?"
- "Step by step"
- "Common misconceptions"
- "How to arrange"
- "After the cremation — [ashes / memorial / next steps]"
- "Related [topic] guides"

### Words / phrases to include (semantic completeness)
- "all-inclusive"
- "24 hours a day"
- "NAFD / SAIF accredited"
- "local independent funeral director" (not "provider" alone)
- "CMA Standardised Price List"
- "FCA Register" (for funeral plans)
- "collection from home / hospital / care home / hospice"
- "the Green Form" / "Certificate for Burial or Cremation"
- The exact competitor names where relevant (Pure, Co-op, Dignity, Aura, Simplicity, Distinct)

### Words / phrases to avoid
- "Cheap" as a positive descriptor of our service — use "affordable" / "transparent"
- "Basic" — use "simple"
- Superlatives without qualification ("the best" without "for X families in X circumstances")
- Any wording that could be read as selling a funeral plan (until we're FCA-authorised)

---

## E-E-A-T checkpoints

Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trust) matters more for funeral content than almost any category. Non-negotiables:

- **Author byline** at the top of the article. Real name, job title, credentials. Uses the Author document type. `Person` schema in JSON-LD.
- **Last reviewed date** visible at the top. "Last reviewed: [date]" — updated at least quarterly.
- **Fact citations** — data-point-per-300-words rule above. Cite SunLife, DWP, MoneyHelper, gov.uk where relevant.
- **Editorial standards footer link** — link to a `/editorial-standards/` page (build if we don't have it) that explains how content is written, reviewed, and updated. Google likes seeing this.
- **Author bio** at the article foot — one paragraph, plus a link to any professional profile.

---

## Technical checkpoints (before pushing a page live)

- Meta title ≤ 60 chars, includes the search term
- Meta description ≤ 160 chars, includes £1,499 and 0333 242 1405
- Canonical URL set
- OpenGraph title + description set (fall back to meta if empty)
- All JSON-LD validates in the Google Rich Results Test
- No broken internal links (run `next build` — it flags 404 links in the Vercel deploy)
- Images have alt text
- Page loads under 2s on mobile (should be fine given the site's baseline)
- Mobile responsiveness verified (sticky sidebar hidden on md and below, MobileCallBar visible)

---

## The workflow to spin up a new page

1. **Run the audit** for the term you're targeting:
   ```
   APIFY_API_TOKEN=... npx tsx scripts/audit-competitors.ts
   ```
   Skim `outputs/competitor-audit-summary.md` — note the median word count target and the H2 patterns.

2. **Draft the page** following this spec. Add it to `scripts/ingest-generics.ts` as a new object in the TERMS array. Include:
   - slug
   - title (meta title)
   - modifier
   - serviceNoun
   - intentMatch
   - body (Portable Text blocks — `pt()` + `h2()` + `h3()`)
   - faqs (Q&A objects)

3. **Ingest** — `SANITY_API_WRITE_TOKEN=... npx tsx scripts/ingest-generics.ts`

4. **Verify** — hit the URL on Vercel preview. Check that:
   - Meta title / description look right (view source)
   - JSON-LD passes Rich Results Test
   - FAQ block renders with the toggle
   - PillarArticleLayout sidebar sticks correctly on desktop

5. **Track** — after 4-6 weeks, check GSC to see impressions + position for the target keyword. If we're not in the top 5 by week 8, iterate: add depth, add H2 sections, add more contextual links, or shift the internal linking from other high-authority pages.
