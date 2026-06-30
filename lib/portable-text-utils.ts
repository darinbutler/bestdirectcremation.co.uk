/**
 * Helpers for working with Portable Text bodies — extracting headings for
 * "On this page" TOCs, and slugifying text for anchor IDs.
 */

/** URL-safe slug from heading text. Used both for the h2 id attribute and the TOC anchor. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')   // strip accents
    .replace(/[^a-z0-9\s-]/g, '')       // drop punctuation
    .replace(/\s+/g, '-')               // spaces → hyphens
    .replace(/-+/g, '-')                // collapse multiple hyphens
    .replace(/^-|-$/g, '')              // trim leading/trailing hyphens
    .slice(0, 60);                      // cap length
}

/** Extract just the visible text from a Portable Text block. */
function blockToPlainText(block: any): string {
  if (!block?.children) return '';
  return block.children.map((c: any) => c.text || '').join('');
}

export type Heading = { id: string; text: string; level: 2 | 3 };

/**
 * Walk a Portable Text body and return every h2/h3 heading with its slug.
 * Used by TOC components to render the navigation.
 * De-duplicates IDs if two headings share the same text.
 */
export function extractHeadings(body: any[] | undefined, opts: { includeH3?: boolean } = {}): Heading[] {
  if (!Array.isArray(body)) return [];
  const seen = new Map<string, number>();
  const out: Heading[] = [];

  for (const block of body) {
    if (!block || typeof block !== 'object') continue;
    const isH2 = block.style === 'h2';
    const isH3 = block.style === 'h3' && opts.includeH3;
    if (!isH2 && !isH3) continue;

    const text = blockToPlainText(block).trim();
    if (!text) continue;

    const baseSlug = slugifyHeading(text);
    const count = (seen.get(baseSlug) || 0) + 1;
    seen.set(baseSlug, count);
    const id = count === 1 ? baseSlug : `${baseSlug}-${count}`;

    out.push({ id, text, level: isH2 ? 2 : 3 });
  }
  return out;
}
