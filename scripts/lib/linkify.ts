/**
 * In-prose contextual internal linking.
 *
 * Auto-detects ~150 known phrases in any paragraph text and converts them to
 * embedded Portable Text links (via markDefs). Used by every ingest script's
 * pt() helper so that the long-form content automatically gets contextual
 * internal links to glossary terms, key help articles, the cost calculator,
 * comparison pages, etc.
 *
 * Rules:
 *  - Longest-match-first so "direct cremation funeral plan" beats "direct cremation".
 *  - Case-insensitive matching, but the original case in the text is preserved.
 *  - Word-boundary matching so "cremator" doesn't match inside "cremation".
 *  - Per-article state (passed via a Linkifier instance): link each target at
 *    most once per article, so we don't carpet-bomb the prose.
 *  - Skip very short text (< 30 chars) — too short to safely add links.
 *
 * Output: a Portable Text block ready to drop into Sanity. Shape:
 *   {
 *     _type: 'block',
 *     style: 'normal',
 *     children: [{ _type: 'span', text: '...', marks: [] }, ...],
 *     markDefs: [{ _key: 'lnk0', _type: 'link', href: '/cost-calculator/' }, ...],
 *   }
 */

export type LinkTarget = { phrase: string; href: string };

/** Build the master target list. */
function buildTargets(): LinkTarget[] {
  const targets: LinkTarget[] = [];

  // ============================================================
  // HIGH-PRIORITY service pages (link first occurrence per article)
  // ============================================================
  targets.push(
    { phrase: 'cost calculator',                href: '/cost-calculator/' },
    { phrase: 'funeral cost calculator',        href: '/cost-calculator/' },
    { phrase: 'compare providers',              href: '/compare/' },
    { phrase: 'compare UK direct cremation providers', href: '/compare/' },
    { phrase: 'provider comparison',            href: '/compare/' },
    { phrase: 'funeral terms glossary',         href: '/glossary/' },
    { phrase: 'our glossary',                   href: '/glossary/' },
    { phrase: 'partner with us',                href: '/partner-with-us/' },
    { phrase: 'partner network',                href: '/partner-with-us/' },
    { phrase: 'UK coverage',                    href: '/coverage/' },
    { phrase: 'our coverage',                   href: '/coverage/' },
    { phrase: 'help and guidance',              href: '/help/' },
    { phrase: 'help & guidance',                href: '/help/' },
  );

  // ============================================================
  // HIGH-PRIORITY help pillar articles
  // ============================================================
  targets.push(
    { phrase: 'what to do when someone dies',         href: '/help/what-to-do-when-someone-dies/' },
    { phrase: 'cost of a funeral',                    href: '/help/cost-of-a-funeral/' },
    { phrase: 'cost of a UK funeral',                 href: '/help/cost-of-a-funeral/' },
    { phrase: 'what is a direct cremation',           href: '/help/what-is-direct-cremation/' },
    { phrase: 'what is direct cremation',             href: '/help/what-is-direct-cremation/' },
    { phrase: 'how direct cremation works',           href: '/help/how-direct-cremation-works/' },
    { phrase: 'cremation vs burial',                  href: '/help/cremation-vs-burial/' },
    { phrase: 'choosing a funeral director',          href: '/help/choosing-a-funeral-director/' },
    { phrase: 'arranging a cremation',                href: '/help/arranging-a-cremation/' },
    { phrase: 'cremation paperwork',                  href: '/help/cremation-paperwork/' },
    { phrase: 'bereavement support',                  href: '/help/bereavement-support/' },
    { phrase: 'probate and estate',                   href: '/help/probate-and-estate/' },
    { phrase: 'writing a will',                       href: '/help/writing-a-will/' },
    { phrase: 'organising a memorial',                href: '/help/organising-a-memorial/' },
    { phrase: 'how to write a eulogy',                href: '/help/how-to-write-a-eulogy/' },
    { phrase: 'green funerals',                       href: '/help/green-funerals/' },
    { phrase: 'when someone dies abroad',             href: '/help/when-someone-dies-abroad/' },
    { phrase: 'cost of direct cremation',             href: '/help/cost-of-direct-cremation/' },
    { phrase: 'Priority Care collection',             href: '/help/priority-care-collection/' },
    { phrase: 'Priority Care',                        href: '/help/priority-care-collection/' },
  );

  // ============================================================
  // FUNERAL PLANS cluster — link to pillar articles
  // ============================================================
  targets.push(
    { phrase: 'direct cremation funeral plan',        href: '/funeral-plans/direct-cremation/' },
    { phrase: 'direct cremation funeral plans',       href: '/funeral-plans/direct-cremation/' },
    { phrase: 'attended cremation plan',              href: '/funeral-plans/attended-cremation/' },
    { phrase: 'simple funeral plan',                  href: '/funeral-plans/simple/' },
    { phrase: 'traditional funeral plan',             href: '/funeral-plans/traditional/' },
    { phrase: 'burial funeral plan',                  href: '/funeral-plans/burial/' },
    { phrase: 'funeral plan cost',                    href: '/funeral-plans/cost/' },
    { phrase: 'how much do funeral plans cost',       href: '/funeral-plans/cost/' },
    { phrase: 'funeral plan vs life insurance',       href: '/funeral-plans/vs-life-insurance/' },
    { phrase: 'funeral plan vs savings',              href: '/funeral-plans/vs-savings/' },
    { phrase: 'FCA-regulated funeral plans',          href: '/funeral-plans/fca-regulated/' },
    { phrase: 'FCA-authorised',                       href: '/glossary/fca-authorised/' },
    { phrase: 'FCA Register',                         href: '/glossary/fca-register/' },
    { phrase: 'compare funeral plan providers',       href: '/funeral-plans/compare/' },
  );

  // ============================================================
  // COMPARISON pages — link to head-to-head with competitors
  // ============================================================
  targets.push(
    { phrase: 'Pure Cremation',         href: '/compare/pure-cremation/' },
    { phrase: 'Co-op Funeralcare',      href: '/compare/co-op-funeralcare/' },
    { phrase: 'Dignity',                href: '/compare/dignity/' },
    { phrase: 'Aura',                   href: '/compare/aura/' },
    { phrase: 'Simplicity Cremations',  href: '/compare/simplicity-cremations/' },
    { phrase: 'Cremation Direct',       href: '/compare/cremation-direct/' },
    { phrase: 'Memoria',                href: '/compare/memoria/' },
  );

  // ============================================================
  // GLOSSARY terms — biggest set, all auto-link
  // Keep this list in sync with lib/glossary.ts term slugs.
  // ============================================================
  const GLOSSARY_TERMS: Array<[string, string]> = [
    // Cremation
    ['direct cremation',           'direct-cremation'],
    ['attended cremation',         'attended-cremation'],
    ['unattended cremation',       'unattended-cremation'],
    ['simple cremation',           'simple-cremation'],
    ['cremation only',             'cremation-only'],
    ['cremator',                   'cremator'],
    ['cremulator',                 'cremulator'],
    ['crematorium',                'crematorium'],
    ['crematorium chapel',         'crematorium-chapel'],
    ['cremation fee',              'cremation-fee'],
    ['medical referee',            'medical-referee'],
    ['Form Cremation 4',           'form-cremation-4'],
    ['Form Cremation 5',           'form-cremation-5'],
    ['Form Cremation 6',           'form-cremation-6'],
    ['Form Cremation 10',          'form-cremation-10'],
    // Funeral types
    ['traditional funeral',        'traditional-funeral'],
    ['green funeral',              'green-funeral'],
    ['natural burial',             'natural-burial'],
    ['woodland burial',            'woodland-burial'],
    ['eco funeral',                'eco-funeral'],
    ['memorial service',           'memorial-service'],
    ['celebration of life',        'celebration-of-life'],
    // Professionals
    ['funeral director',           'funeral-director'],
    ['undertaker',                 'undertaker'],
    ['mortician',                  'mortician'],
    ['embalmer',                   'embalmer'],
    ['celebrant',                  'celebrant'],
    ['humanist celebrant',         'humanist-celebrant'],
    ['civil celebrant',            'civil-celebrant'],
    ['minister',                   'minister'],
    ['coroner',                    'coroner'],
    ['registrar',                  'registrar'],
    ['pallbearer',                 'pallbearer'],
    ['end-of-life doula',          'end-of-life-doula'],
    // Legal & paperwork
    ['Death Certificate',          'death-certificate'],
    ['Medical Certificate of Cause of Death', 'medical-certificate-of-cause-of-death'],
    ['MCCD',                       'medical-certificate-of-cause-of-death'],
    ['Green Form',                 'green-form'],
    ['Tell Us Once',               'tell-us-once'],
    ['probate',                    'probate'],
    ['executor',                   'executor'],
    ['intestacy',                  'intestacy'],
    ['Inheritance Tax',            'inheritance-tax'],
    ['estate',                     'estate'],
    ['will',                       'will'],
    ['inquest',                    'inquest'],
    ['Funeral Expenses Payment',   'funeral-expenses-payment'],
    ['Bereavement Support Payment','bereavement-support-payment'],
    ['Public Health Funeral',      'public-health-funeral'],
    ['Standardised Price List',    'standardised-price-list'],
    ['CMA Funerals Market Investigation Order', 'cma-funerals-order'],
    // Funeral plans
    ['funeral plan',               'funeral-plan'],
    ['FSCS',                       'fscs'],
    // Burial
    ['burial plot',                'burial-plot'],
    ['Exclusive Right of Burial',  'exclusive-right-of-burial'],
    ['headstone',                  'headstone'],
    ['cemetery',                   'cemetery'],
    ['churchyard',                 'churchyard'],
    ['columbarium',                'columbarium'],
    ['biodegradable coffin',       'biodegradable-coffin'],
    // Body care
    ['embalming',                  'embalming'],
    ['mortuary',                   'mortuary'],
    ['viewing',                    'viewing'],
    // Ceremonial
    ['eulogy',                     'eulogy'],
    ['order of service',           'order-of-service'],
    ['committal',                  'committal'],
    ['hearse',                     'hearse'],
    ['wake',                       'wake'],
    ['coffin',                     'coffin'],
    ['casket',                     'casket'],
    // Memorial
    ['urn',                        'urn'],
    ['scatter tube',               'scatter-tube'],
    ['Garden of Remembrance',      'garden-of-remembrance'],
    ['ash interment',              'ash-interment'],
    ['memorial jewellery',         'memorial-jewellery'],
    ['memorial tree',              'memorial-tree'],
    // Religious
    ['Christian funeral',          'christian-funeral'],
    ['Catholic funeral',           'catholic-funeral'],
    ['Jewish funeral',             'jewish-funeral'],
    ['Muslim funeral',             'muslim-funeral'],
    ['Hindu funeral',              'hindu-funeral'],
    ['humanist funeral',           'humanist-funeral'],
    // Industry
    ['NAFD',                       'nafd'],
    ['SAIF',                       'saif'],
    ['CMA',                        'cma'],
    ['FBCA',                       'fbca'],
    ['ICCM',                       'iccm'],
    // Bereavement
    ['Cruse Bereavement Support',  'cruse'],
    ['Cruse',                      'cruse'],
    ['Samaritans',                 'samaritans'],
    ['Sands',                      'sands'],
    ['WAY',                        'way'],
    ['Marie Curie',                'marie-curie'],
    ['grief',                      'grief'],
    ['anticipatory grief',         'anticipatory-grief'],
  ];
  GLOSSARY_TERMS.forEach(([phrase, slug]) => {
    targets.push({ phrase, href: `/glossary/${slug}/` });
  });

  // Sort by phrase length descending so longest matches are tried first
  targets.sort((a, b) => b.phrase.length - a.phrase.length);
  return targets;
}

const TARGETS = buildTargets();

/**
 * Linkifier — per-article state holder.
 * Create one instance per article (or per major content block).
 * Call .pt(text) for each paragraph to get back a Portable Text block.
 */
export class Linkifier {
  private usedHrefs = new Set<string>();
  private maxLinksPerHref: number;
  private currentSlug?: string;  // current article slug — don't self-link

  constructor(opts: { currentSlug?: string; maxLinksPerHref?: number } = {}) {
    this.currentSlug = opts.currentSlug;
    this.maxLinksPerHref = opts.maxLinksPerHref ?? 1;
  }

  /** Plain paragraph block — no auto-linking. Useful for short text. */
  ptPlain(text: string) {
    return { _type: 'block', style: 'normal', children: [{ _type: 'span', text, marks: [] }], markDefs: [] };
  }

  /** H2 heading block — no auto-linking. */
  h2(text: string) {
    return { _type: 'block', style: 'h2', children: [{ _type: 'span', text, marks: [] }], markDefs: [] };
  }

  /** H3 heading block — no auto-linking. */
  h3(text: string) {
    return { _type: 'block', style: 'h3', children: [{ _type: 'span', text, marks: [] }], markDefs: [] };
  }

  /** Auto-linkified paragraph block. */
  pt(text: string) {
    if (text.length < 30) return this.ptPlain(text);

    // Find all match positions across all targets
    type Match = { start: number; end: number; href: string; matched: string };
    const matches: Match[] = [];

    for (const target of TARGETS) {
      // Skip if already linked in this article
      if (this.usedHrefs.has(target.href)) continue;
      // Skip self-links
      if (this.currentSlug && target.href.includes(`/${this.currentSlug}/`)) continue;

      // Word-boundary, case-insensitive regex
      const escaped = target.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`(?<!\\w)${escaped}(?!\\w)`, 'i');
      const m = re.exec(text);
      if (!m || m.index === undefined) continue;

      // Skip if overlaps with an already-found match
      const overlaps = matches.some(existing =>
        (m.index! < existing.end && m.index! + m[0].length > existing.start)
      );
      if (overlaps) continue;

      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        href: target.href,
        matched: m[0],
      });

      // Mark this href as used for this article
      this.usedHrefs.add(target.href);

      // Cap matches per paragraph to avoid carpet-linking
      if (matches.length >= 3) break;
    }

    if (matches.length === 0) return this.ptPlain(text);

    // Sort by position
    matches.sort((a, b) => a.start - b.start);

    // Build spans + markDefs
    const children: any[] = [];
    const markDefs: any[] = [];
    let cursor = 0;

    matches.forEach((m, i) => {
      // Span before the match
      if (m.start > cursor) {
        children.push({ _type: 'span', text: text.slice(cursor, m.start), marks: [] });
      }
      // Linked span
      const key = `lnk${i}_${Math.random().toString(36).slice(2, 7)}`;
      markDefs.push({ _key: key, _type: 'link', href: m.href });
      children.push({ _type: 'span', text: m.matched, marks: [key] });
      cursor = m.end;
    });
    // Trailing span after the last match
    if (cursor < text.length) {
      children.push({ _type: 'span', text: text.slice(cursor), marks: [] });
    }

    return { _type: 'block', style: 'normal', children, markDefs };
  }
}

/** Convenience: one-off linkify for a single paragraph without per-article state. */
export function linkifyParagraph(text: string, currentSlug?: string) {
  return new Linkifier({ currentSlug }).pt(text);
}
