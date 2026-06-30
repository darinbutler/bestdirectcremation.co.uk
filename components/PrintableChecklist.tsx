'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/site';

/**
 * Print-friendly checklist wrapper.
 *
 * On-screen: shows a clean cream-themed page with a sticky "Print or save as
 * PDF" button + "Back to resources" link, plus the standard site header/footer
 * via the root layout.
 *
 * When printed (Ctrl/Cmd+P): header, footer, navigation, and the print button
 * itself are hidden. Only the heading + checklist content prints, sized to
 * A4 with clean typography and tick-box-friendly spacing.
 */
export default function PrintableChecklist({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <>
      {/* Print-specific styles — hide all chrome, optimise the checklist for A4 */}
      <style>{`
        @media print {
          @page { size: A4; margin: 18mm 18mm 22mm 18mm; }
          body { background: white !important; color: black !important; font-size: 11pt; line-height: 1.4; }
          header, footer, nav, [data-print-hide], .print-hide { display: none !important; }
          main { padding: 0 !important; }
          a { color: black !important; text-decoration: none !important; }
          .print-checklist h1 { font-size: 22pt; margin: 0 0 6mm; }
          .print-checklist h2 { font-size: 14pt; margin: 8mm 0 3mm; page-break-after: avoid; }
          .print-checklist h3 { font-size: 12pt; margin: 5mm 0 2mm; page-break-after: avoid; }
          .print-checklist p  { margin: 0 0 3mm; }
          .print-checklist ul { margin: 0 0 4mm; padding-left: 6mm; }
          .print-checklist li { margin: 0 0 1.5mm; page-break-inside: avoid; }
          .print-checklist .tick {
            display: inline-block;
            width: 4mm; height: 4mm;
            border: 1px solid #333;
            margin-right: 2.5mm;
            vertical-align: -0.5mm;
          }
          .print-checklist .checklist-footer {
            margin-top: 12mm;
            padding-top: 4mm;
            border-top: 1px solid #999;
            font-size: 9pt;
            color: #555;
          }
        }
      `}</style>

      <div className="bg-cream min-h-screen py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 md:px-8">

          {/* On-screen toolbar — hidden when printed */}
          <div className="print-hide mb-8 flex items-center justify-between flex-wrap gap-3">
            <Link href="/resources/" className="inline-flex items-center gap-1.5 text-sm text-green font-semibold hover:text-gold transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              All resources
            </Link>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-green text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-dark transition shadow-lift"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print or save as PDF
            </button>
          </div>

          {/* Printable content */}
          <article className="print-checklist bg-white p-8 md:p-12 rounded-2xl shadow-card border border-stone">
            <h1 className="font-serif text-3xl md:text-4xl text-green mb-2 leading-tight">{title}</h1>
            {subtitle && <p className="text-ink/70 mb-8 leading-relaxed">{subtitle}</p>}
            <div className="prose prose-lg max-w-none
                            prose-headings:font-serif prose-headings:text-green prose-headings:leading-tight
                            prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-stone
                            prose-h3:text-base md:prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2 prose-h3:text-ink
                            prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-3
                            prose-ul:my-3 prose-li:my-1.5 prose-li:text-ink/85 prose-li:leading-snug">
              {children}
            </div>

            <p className="checklist-footer text-xs text-ink/55 italic mt-10 pt-5 border-t border-stone">
              From {SITE.name} ({SITE.url}). For help arranging a UK direct cremation, call {SITE.phone} — 24 hours a day.
            </p>
          </article>

          {/* Bottom toolbar repeat for long checklists */}
          <div className="print-hide mt-8 text-center">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-green text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-dark transition shadow-lift"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print or save as PDF
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
