import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import TrustSignals from '@/components/TrustSignals';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Downloadable Resources — UK Funeral Checklists & Guides',
  description: 'Print-friendly UK funeral checklists. What to do when someone dies, funeral planning checklist, end-of-life planning. Free PDF downloads.',
  alternates: { canonical: `${SITE.url}/resources/` },
};

const RESOURCES = [
  {
    slug: 'what-to-do-when-someone-dies-checklist',
    label: 'What to Do When Someone Dies — Printable Checklist',
    description: 'The complete UK practical checklist: what to do in the first 24 hours, the first week, the first month. Tick boxes you can print or save.',
    pages: '2 pages · A4 · printable',
  },
  {
    slug: 'funeral-planning-checklist',
    label: 'Funeral Planning Checklist — Plan Ahead in 30 Minutes',
    description: 'A clear checklist for planning your own funeral in advance — what to write down, who to tell, what to leave for the family.',
    pages: '2 pages · A4 · printable',
  },
  {
    slug: 'end-of-life-document-checklist',
    label: 'End-of-Life Document Checklist',
    description: 'Every document your family will need — where it lives, what it does, and how to make it easy to find.',
    pages: '1 page · A4 · printable',
  },
];

export default function ResourcesHub() {
  return (
    <>
      <Hero
        eyebrow="Free resources"
        title="Print-friendly UK funeral checklists"
        subtitle="Practical, plain-English checklists you can print or save as PDF. Free, no email required, no signup."
      />

      <TrustSignals />

      <Container className="py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES.map(r => (
            <Link key={r.slug} href={`/resources/${r.slug}/`}
                  className="block bg-cream p-6 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold group">
              <p className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">{r.pages}</p>
              <h3 className="font-serif text-lg text-green mb-2 leading-snug">{r.label}</h3>
              <p className="text-sm text-ink/70 leading-relaxed mb-4">{r.description}</p>
              <p className="text-sm font-semibold text-gold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Open checklist
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-gold/10 border border-gold/30 rounded-2xl p-6 text-sm text-ink/85 leading-relaxed">
          <p className="font-semibold text-gold-dark mb-2">How to save as PDF</p>
          <p>
            Open any checklist, then use your browser&apos;s print menu (Ctrl/Cmd+P) and choose
            &quot;Save as PDF&quot; as the destination. The pages are designed to print cleanly to A4 — no
            navigation, no footer, just the checklist content with tick boxes.
          </p>
        </div>
      </Container>

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Need to arrange a direct cremation?</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">£1,499 all-inclusive, delivered locally by a vetted independent funeral director. Call 24 hours a day.</p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources/' }]),
      )} />
    </>
  );
}
