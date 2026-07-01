# Best Direct Cremation — Sanity editing manual

The team-facing guide to editing content on the new BDC site without needing engineering. Aimed at editors, marketing, ops.

---

## 1 · What Sanity is (in 30 seconds)

Sanity is the "content brain" behind the new bestdirectcremation.co.uk. When you edit anything in Sanity Studio, the change appears on the website within ~60 seconds (via ISR revalidation). You don't need to touch any code — Sanity handles the whole editorial layer.

**Sanity Studio** is where you edit. It's a web app that lives at the same domain as the site.

---

## 2 · How to access Sanity Studio

### Signing in

1. Go to `https://bestdirectcremation-co-uk.vercel.app/studio/` (or the production URL once cutover happens)
2. Sign in with the account you were invited on (Google, GitHub or email)
3. First-time users: you'll get an email invite — accept it and follow the prompts

### If you can't sign in

You need to be invited to the Sanity project by an admin. Ask Darin or another admin to go to `https://www.sanity.io/manage/project/80kiihr6/members` and invite you as an **Editor** (can edit content) or **Viewer** (read-only).

---

## 3 · Studio layout — what you'll see

Down the left side you'll see the content types organised into folders:

- **🏴 Counties** — all 97 UK county pages
- **🏘 Towns & Cities** — all 370+ town pages
- **🕊 Partner Funeral Directors** — 25 partner FD profile slots
- **📚 Help & Guidance articles** — all help / funeral-plans / comparison articles
- **🎯 Generic-term landers** — ~60 service-type landing pages
- **✍️ Authors** — editorial bylines (Person schema for EEAT)
- **⚙️ Site settings** — global phone, address, price, promise text

Click any folder to see the list of docs inside. Click any doc to edit.

---

## 4 · The Publish button — how changes go live

Every doc has a **Publish** button in the bottom-right.

- **Autosave**: your edits save as drafts automatically. You can leave a doc half-edited and come back later.
- **Publish**: when you click Publish, the change goes live. It appears on the site within ~60 seconds.
- **Preview vs Live**: drafts are only visible to you in Sanity Studio. Only published versions appear on the public site.

If you make a mistake you can:
1. Revert to a previous version (**History** tab, top-right of every doc)
2. Or unpublish (bottom-left menu → Unpublish)

---

## 5 · Editing a county page (e.g. London, Manchester)

**When to edit**: adding local detail, refreshing the SEO title, adding a specific local crematorium, adjusting the Coming-soon status.

1. Click **Counties** in the sidebar
2. Click the county you want (e.g. **London**)
3. You'll see fields down the page. The most-edited are:

### Common fields

- **Coverage status**: choose "✅ Live — FD partner ready" or "⏳ Coming soon — capture call, offer alternative". Drives whether the page shows "live coverage" or "we're expanding here" treatment.
- **Long-form sections** (Section 1 through 11): each section has a **Heading** and a **Body** (Portable Text). Just click into any section to edit — it opens a rich-text editor. Bold, italic, links, headings all work like Word.
- **FAQ**: array of Q&A items. Click **Add item** at the bottom of the FAQ list to add a new one. Each item has a **Question** (string) and an **Answer** (Portable Text).
- **Crematoria** and **Register offices**: populated automatically by Apify enrichment. Don't edit these by hand unless you have specific local knowledge — the Apify script will re-populate them on the next run.
- **Partner FDs**: reference field. Click **Add reference** to link a partner FD doc to this county.

### SEO block (scroll to the bottom)

- **Meta title**: the browser tab title + Google result headline. Keep under 60 chars. Sanity warns you if over.
- **Meta description**: the Google result snippet. Keep under 160 chars.
- **Open Graph image**: 1200×630px ideal. Used for social sharing (Facebook, Twitter, LinkedIn).
- **noIndex**: tick this to hide the page from search engines. Only use for very rare cases (e.g. a temporary draft page).

### After editing

Click **Publish** in the bottom-right. Change is live in ~60 seconds.

---

## 6 · Editing a town page

Same pattern as counties, but with a few town-specific fields:

- **Unique local angle**: 2-3 sentence description of what makes this specific town different. Replace the `[Editor: replace with...]` placeholder.
- **Nearest crematorium** and **Register office**: populated by Apify.
- **Partner FD**: reference to the specific funeral director covering this town.

Everything else works the same way as counties.

---

## 7 · Editing a help article

**When to edit**: refreshing an article, fixing a typo, adding a new FAQ Q&A, updating the "Last reviewed" date, changing the meta title/description.

1. Click **Help & Guidance articles** in the sidebar
2. Click the article you want
3. Key fields:

- **Title**: the H1 of the article and the default meta title. Keep under 60 chars where possible.
- **Slug**: the URL path. Don't change unless you're moving the article to a new URL (which will break inbound links).
- **Section**: Help / Funeral Plans / Compare (drives which URL prefix the article lives under: `/help/`, `/funeral-plans/`, `/compare/`).
- **Intent**: brief label describing the search intent this article targets.
- **Excerpt**: 155 chars max. Used as the meta description fallback if the SEO block is empty.
- **Hero image**: displayed at the top of the article. Optional.
- **Body**: the article content. Rich Portable Text editor with H2, H3, bold, italic, blockquotes, links, and inline images. Just click and type. Ctrl+B for bold, Ctrl+I for italic.
- **Inline FAQ**: array of Q&A items. Add items at the bottom of the list. Each Q&A auto-generates FAQPage schema on the live page.
- **Related articles**: references to 3 other articles to display at the foot of this one. Click **Add reference** to add.
- **Author**: reference to an Author doc (Person schema for EEAT). At least one Author doc must exist for this to be selectable.
- **Last reviewed**: date field. Update this whenever you refresh the article — displayed on the live page as an EEAT signal.
- **SEO**: same block as county pages.

### Adding a new FAQ Q&A

1. Scroll to the **Inline FAQ** field
2. Click **Add item** at the bottom
3. Type the question in the **Question** field
4. Click into the **Answer** field and type the answer (Portable Text — you can format if you want)
5. Publish the doc

The new Q&A appears on the live page as an accordion item and is added to the FAQPage schema (Google may pick it up as a rich result).

### Formatting the body — Portable Text quick reference

- **Bold**: Ctrl+B (or Cmd+B on Mac)
- **Italic**: Ctrl+I
- **H2 heading**: type text, select it, click "Normal" dropdown, pick "H2"
- **H3 heading**: same, pick "H3"
- **Blockquote**: same, pick "Quote"
- **Link**: select text, click the chain icon in the toolbar, paste URL. Internal links: use `/help/slug/` format (no `https://`)
- **Image**: click the "+" icon in the body area, choose "Image"
- **List**: click the bullet or numbered list buttons in the toolbar

---

## 8 · Editing a generic-term lander (e.g. "cheap direct cremation")

Same pattern as help articles but simpler shape. In the sidebar click **Generic-term landers**, click the doc you want, edit:

- **Title**, **slug**, **modifier**, **serviceNoun**, **intent match**: metadata
- **Long form**: the article body (Portable Text)
- **FAQ**: inline Q&A array
- **SEO**: meta block

Publish when done.

---

## 9 · Editing a partner funeral director profile

**Note**: as of now, all 25 partner FD slots are empty templates awaiting real content. To fill one:

1. Click **Partner Funeral Directors** in the sidebar
2. Click any doc (they're numbered `partner-01` through `partner-25`)
3. Fill in:
   - **Name**: e.g. "Best Funeral Directors, Manchester"
   - **Slug**: URL slug (auto-generated from name)
   - **Established**: year the business was founded
   - **HQ address**: street, postcode, latitude, longitude, and a **town** reference
   - **Towns served**: array of town references (link to towns in your county)
   - **Accreditation**: NAFD, SAIF, both
   - **Facilities**: list of facilities (chapel of rest, private viewing, garden of remembrance)
   - **Bio**: Portable Text article — 400-800 words about the funeral director
   - **Photos**: hero + 3-5 supporting photos
   - **Opening hours**: array of day-by-day opening times
   - **SEO**: meta block

Publish when done.

---

## 10 · Editing site-wide settings

**When to edit**: the phone number changes, the address moves, the price changes, or you want to update a global brand line.

1. Click **Site settings** in the sidebar (there's only one doc)
2. Edit:
   - **Site name**: "Best Direct Cremation"
   - **Phone**: 0333 242 1405
   - **Email**: care@bestfunerals.co.uk
   - **Price label**: "£1,499"
   - **Price ceiling**: "£1,749"
   - **Priority Care price**: "£250"
   - **Strapline**: "Know You're In Great Care" or similar
   - **Promise subtext**: "Here whenever you need us — 24 hours a day"
   - **Address**: registered UK address for schema.org
3. Publish

Changes propagate to every page on the site.

---

## 11 · Creating an Author document

**When to create**: you want a real editorial byline on articles. At minimum create one "BDC Editorial Team" author as the fallback.

1. Click **Authors** in the sidebar
2. Click the **+** button in the bottom-right to create a new doc
3. Fill in:
   - **Full name**: e.g. "BDC Editorial Team" or a real person's name
   - **Slug**: URL slug (auto-generated)
   - **Job title**: e.g. "Head of Editorial" or "Funeral Director (NAFD)"
   - **Credentials**: optional but recommended for EEAT (e.g. "NAFD Diploma, 12 years experience")
   - **Bio**: 150-300 word bio
   - **Photo**: headshot (square, 400×400px minimum)
   - **LinkedIn URL**: professional profile
   - **Editorial-team fallback author?**: tick this on the "BDC Editorial Team" doc so scripts can find it automatically
4. Publish

Then on any article, use the **Author** field to reference this Author. The name, job title, and photo will appear as a byline at the top of the article, and Person schema is added to the JSON-LD for EEAT.

---

## 12 · Adding an image

Anywhere Sanity asks for an image (hero image, body image, OG image, headshot):

1. Click the image field or the "+" icon
2. Either drag-and-drop the file, or click **Upload** and choose the file
3. Once uploaded, you can crop / focus the "hotspot" — click and drag the crosshair to set the focal point (Sanity crops around this point on different-sized displays)
4. Add **alt text** if the image is decorative you can leave blank, but for content images add descriptive alt text (helps accessibility and SEO)
5. Publish the doc

**Image size guidance**:
- Hero images: 1920×1080px or larger
- Body images: 1200px wide minimum
- OG image: exactly 1200×630px if possible
- Author headshots: square, 400×400px minimum

Sanity auto-optimises via its CDN — serves AVIF/WebP to modern browsers and scales images for the requesting device size.

---

## 13 · Adding an inline link in an article body

1. Select the text you want to make a link
2. Click the chain icon in the toolbar (or press Ctrl+K)
3. In the URL field:
   - For internal links (to another page on our site): type `/help/slug/` or `/counties/london/` or `/services/eco-cremation-uk/` — just the path, no `https://`
   - For external links (to gov.uk, FCA Register, etc.): type the full `https://...` URL
4. Click **Confirm**

Internal links will get automatic gold underline styling on the live page.

---

## 14 · Common editing tasks

### Refresh the "Last reviewed" date on all pillar articles

1. Click **Help & Guidance articles**
2. Click each pillar article (cost-of-a-funeral, what-to-do-when-someone-dies, cremation-vs-burial, etc.)
3. Update the **Last reviewed** date to today
4. Publish

The date appears on the live page as an EEAT signal to Google and users.

### Add a new town coverage note to a county page

1. Click the county in Sanity
2. Scroll to any of the long-form sections (e.g. Section 4 or 9)
3. Click into the section body and add a paragraph about the specific town
4. Publish

Or if it's substantial, create a new **Town** doc under Towns & Cities and reference it from the county.

### Change a page's meta title

1. Click the doc
2. Scroll to the **SEO** block at the bottom
3. Type new meta title (max 60 chars)
4. Publish
5. Wait ~60 seconds and refresh the live page — meta title is now live

### Update a phone number sitewide

1. Click **Site settings** in the sidebar
2. Change the **Phone** field
3. Publish

Every page on the site now shows the new number within ~60 seconds.

### Hide a page from search engines

1. Click the doc
2. Scroll to the **SEO** block
3. Tick **Hide from search engines (noindex)**
4. Publish

Google will de-index the page within days.

---

## 15 · Troubleshooting

### "Missing keys" warning at the top of a list

The array item is missing its unique `_key` string — a technical Sanity requirement. If you see this, either click **Add missing keys** (Sanity will auto-fix), or ask a developer to run `SANITY_API_WRITE_TOKEN=... npx tsx scripts/fix-array-keys.ts` in the repo.

### The change I made isn't showing on the live site

- Did you click **Publish** (not just save)?
- Wait 60 seconds and hard-refresh (Cmd+Shift+R or Ctrl+F5)
- Some pages have longer cache (up to 1 hour for directories) — check `/coverage/`, `/crematoria/`, `/register-offices/`
- If still stuck: ask a developer to trigger a manual Vercel redeploy

### I published a draft by accident

1. Open the doc in Sanity
2. Click the **History** tab in the top-right
3. Find the earlier version you want
4. Click **Restore this revision**
5. Publish

### I want to delete a page

1. Open the doc in Sanity
2. Bottom-left menu → **Delete document**
3. Confirm

**Note**: deleting a page permanently — the URL will return 404 unless a redirect is added. Ask a developer to add a redirect in `lib/redirects.mjs` before deleting a well-linked page.

### Someone else is editing the same doc

Sanity shows you their avatar in the top-right of the doc. Changes are merged in real-time. If both of you edit the same field at the same time, whoever publishes last wins — coordinate via Slack or email if you're both working on the same page.

---

## 16 · What NOT to do

- **Don't change slugs on pages that are already ranking.** Changing the slug changes the URL, which breaks Google's index. If you must change a slug, coordinate with a developer to add a 301 redirect in `lib/redirects.mjs` at the same time.
- **Don't edit schema types or the CMS structure.** That's a developer task in the repo, not an editor task in Sanity Studio.
- **Don't add "SELL" language to funeral plans content until BDC is FCA-authorised.** BDC is not yet approved to sell funeral plans (targeted early 2027). All funeral-plans content must be informational only, citing the FCA Register at fca.org.uk/register.
- **Don't publish partner FD profiles with fake bios or stock photos.** Wait until you have real bios and photos of the actual partner funeral director.
- **Don't remove the CMA Standardised Price List link from the footer.** It's a legal requirement.

---

## 17 · Managing users and permissions

Sanity project admins can invite editors:

1. Go to https://www.sanity.io/manage/project/80kiihr6/members
2. Click **Invite** in the top-right
3. Enter email + choose role:
   - **Administrator**: full control (create/delete docs, manage users, manage schema)
   - **Editor**: can create/edit/publish content (recommended for most team members)
   - **Viewer**: read-only (for stakeholders who want to review but not edit)
4. Send

The invitee gets an email with a sign-up link.

---

## 18 · Version history and undo

Every published change is versioned. To see the history of a doc:

1. Open the doc in Sanity
2. Click the **⏱ History** icon in the top-right
3. Scroll through past versions — each has a timestamp and the editor who made the change
4. Click **Restore** on any version to roll back

You can also see the diff between two versions to understand exactly what changed.

---

## 19 · Sanity Studio keyboard shortcuts

| Shortcut | What it does |
|---|---|
| Cmd/Ctrl + S | Save draft |
| Cmd/Ctrl + Enter | Publish |
| Cmd/Ctrl + K | Insert link in body |
| Cmd/Ctrl + B | Bold |
| Cmd/Ctrl + I | Italic |
| Cmd/Ctrl + Z | Undo |
| Cmd/Ctrl + Shift + Z | Redo |
| Esc | Close current doc |
| / | Quick search across all docs |

---

## 20 · When to ask for developer help

Most content editing you can do yourself. Ask a developer for:

- Adding a new content type (e.g. "we need a blog section")
- Changing the URL structure of existing pages
- Adding a new page template (e.g. a landing page layout)
- Bulk import of new content (e.g. adding 50 more towns)
- Any error message you don't understand
- Anything that requires touching `.env.local` or the terminal
- Domain cutover / DNS changes
- Vercel deployment issues

---

## Contact

Content editing questions: reach out to the current site admin (currently Darin Butler).
Technical / infrastructure questions: same.
Bereaved family calls: 0333 242 1405 — always redirect to this number, never handle a bereavement call yourself unless you're on the call team.

---

**Last updated**: June 2026
**Sanity project**: 80kiihr6
**Studio URL**: bestdirectcremation-co-uk.vercel.app/studio/
