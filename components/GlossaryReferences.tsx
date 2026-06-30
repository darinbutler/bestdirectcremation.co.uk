import Link from 'next/link';
import Container from './Container';
import { GLOSSARY, GlossaryTerm } from '@/lib/glossary';

/**
 * Glossary references block — shown at the bottom of help articles.
 * Maps each help-article slug to a curated set of relevant glossary
 * terms so readers can click through to the term definitions.
 *
 * Falls back to a generic "browse the glossary" CTA if no curated
 * mapping exists for the article.
 */

const ARTICLE_GLOSSARY_MAP: Record<string, string[]> = {
  'what-to-do-when-someone-dies': [
    'death-certificate', 'medical-certificate-of-cause-of-death', 'green-form', 'tell-us-once',
    'registrar', 'coroner', 'probate', 'funeral-director',
  ],
  'cost-of-a-funeral': [
    'direct-cremation', 'attended-cremation', 'cremation-fee', 'standardised-price-list',
    'cma-funerals-order', 'funeral-expenses-payment', 'public-health-funeral', 'bereavement-support-payment',
  ],
  'what-is-direct-cremation': [
    'direct-cremation', 'unattended-cremation', 'simple-cremation', 'cremator', 'crematorium',
    'priority-care', 'ashes',
  ],
  'cremation-vs-burial': [
    'direct-cremation', 'natural-burial', 'woodland-burial', 'burial-plot', 'cemetery',
    'churchyard', 'columbarium', 'cremator',
  ],
  'how-direct-cremation-works': [
    'collection', 'priority-care', 'mortuary', 'form-cremation-4', 'form-cremation-5',
    'medical-referee', 'cremator', 'ashes',
  ],
  'choosing-a-funeral-director': [
    'funeral-director', 'nafd', 'saif', 'cma-funerals-order', 'standardised-price-list',
    'cma', 'mortuary',
  ],
  'cost-of-direct-cremation': [
    'direct-cremation', 'priority-care', 'cremation-fee', 'standardised-price-list',
    'collection',
  ],
  'arranging-a-cremation': [
    'collection', 'form-cremation-4', 'form-cremation-5', 'form-cremation-6', 'form-cremation-10',
    'medical-referee', 'crematorium', 'green-form',
  ],
  'cremation-paperwork': [
    'form-cremation-4', 'form-cremation-5', 'form-cremation-6', 'form-cremation-10',
    'medical-referee', 'green-form', 'death-certificate',
  ],
  'priority-care-collection': [
    'priority-care', 'collection', 'mortuary', 'funeral-director',
  ],
  'bereavement-support': [
    'grief', 'anticipatory-grief', 'cruse', 'samaritans', 'sands', 'way', 'marie-curie',
  ],
  'probate-and-estate': [
    'probate', 'executor', 'intestacy', 'inheritance-tax', 'estate', 'death-certificate',
  ],
  'writing-a-will': [
    'will', 'executor', 'intestacy', 'probate', 'inheritance-tax',
  ],
  'organising-a-memorial': [
    'memorial-service', 'celebration-of-life', 'ashes', 'urn', 'scatter-tube',
  ],
  'celebrant-vs-minister': [
    'celebrant', 'humanist-celebrant', 'civil-celebrant', 'minister', 'humanist-funeral',
  ],
  'funeral-without-religion': [
    'humanist-funeral', 'humanist-celebrant', 'celebrant', 'civil-celebrant',
  ],
  'how-to-write-a-eulogy': [
    'eulogy', 'order-of-service', 'celebrant', 'memorial-service',
  ],
  'ashes-what-to-do': [
    'ashes', 'urn', 'scatter-tube', 'columbarium', 'garden-of-remembrance', 'ash-interment',
    'memorial-jewellery', 'memorial-tree',
  ],
  'green-funerals': [
    'green-funeral', 'natural-burial', 'woodland-burial', 'biodegradable-coffin', 'eco-funeral',
  ],
};

export default function GlossaryReferences({ articleSlug }: { articleSlug: string }) {
  const termSlugs = ARTICLE_GLOSSARY_MAP[articleSlug] || [];
  const terms: GlossaryTerm[] = termSlugs
    .map(s => GLOSSARY.find(t => t.slug === s))
    .filter((t): t is GlossaryTerm => Boolean(t));

  if (terms.length === 0) {
    // Generic fallback — link to the glossary hub
    return (
      <section className="bg-cream/40 border-y border-stone">
        <Container className="py-10 md:py-12">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-2">Funeral terms glossary</p>
              <h3 className="font-serif text-xl text-green">{GLOSSARY.length}+ UK funeral terms explained in plain English</h3>
            </div>
            <Link href="/glossary/" className="inline-flex items-center gap-2 bg-green text-cream px-5 py-2.5 rounded-full font-semibold hover:bg-green-dark transition">
              Browse the glossary
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-cream/40 border-y border-stone">
      <Container className="py-12 md:py-16">
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Terms referenced in this guide</p>
        <h2 className="font-serif text-section text-green mb-3">From our funeral glossary</h2>
        <p className="text-ink/75 mb-6 max-w-2xl">
          Definitions of the key terms used in this article. Tap any term for the full definition and related guidance.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {terms.map(t => (
            <li key={t.slug}>
              <Link href={`/glossary/${t.slug}/`} className="block bg-white p-4 rounded-card shadow-card hover:shadow-lift transition border border-transparent hover:border-gold">
                <p className="font-serif text-green text-sm">{t.term}</p>
                <p className="text-xs text-ink/65 mt-1 line-clamp-2">{t.shortDef}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/glossary/" className="inline-flex items-center gap-1.5 text-gold font-semibold hover:text-gold-dark transition">
          Browse all {GLOSSARY.length}+ glossary terms
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </Container>
    </section>
  );
}
