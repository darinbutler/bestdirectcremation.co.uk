import type { PortableTextComponents } from '@portabletext/react';
import { slugifyHeading } from '@/lib/portable-text-utils';

/**
 * Custom Portable Text serialisers.
 *
 * Key job: assign deterministic `id` attributes to h2/h3 headings so that
 * "On this page" TOC anchors work (#slug-of-heading-text). Also opens
 * external links in a new tab and styles internal links.
 */

// Track h2 occurrence count per render to handle duplicates
function makeHeadingComponents() {
  const seen = new Map<string, number>();
  const idFor = (text: string) => {
    const base = slugifyHeading(text);
    const count = (seen.get(base) || 0) + 1;
    seen.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  };

  return {
    h2: ({ children, value }: any) => {
      const text = (value?.children || []).map((c: any) => c.text || '').join('');
      return <h2 id={idFor(text)} className="scroll-mt-24">{children}</h2>;
    },
    h3: ({ children, value }: any) => {
      const text = (value?.children || []).map((c: any) => c.text || '').join('');
      // h3 ids use a different counter so they don't collide with h2 ids
      const base = slugifyHeading(text);
      return <h3 id={`h3-${base}`} className="scroll-mt-24">{children}</h3>;
    },
  };
}

/**
 * Build a PortableTextComponents config for an article render.
 * Call this once per article (so the headings counter is fresh).
 */
export function makePortableTextComponents(): PortableTextComponents {
  const headings = makeHeadingComponents();
  return {
    block: {
      ...headings,
    },
    marks: {
      // Internal link mark — rendered as <a>, styled by the prose plugin
      link: ({ children, value }: any) => {
        const href = value?.href || '#';
        const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
        if (isExternal) {
          return <a href={href} target={href.startsWith('mailto:') || href.startsWith('tel:') ? undefined : '_blank'} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a>;
        }
        return <a href={href}>{children}</a>;
      },
      strong: ({ children }: any) => <strong>{children}</strong>,
      em: ({ children }: any) => <em>{children}</em>,
    },
  };
}
