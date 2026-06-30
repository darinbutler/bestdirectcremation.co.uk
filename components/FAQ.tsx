import Container from './Container';
import { PortableText } from '@portabletext/react';

export type FaqItem = { question: string; answer: any };

/**
 * FAQ accordion.
 * Question + answer elements get `faq-question` / `faq-answer` CSS classes
 * which the Speakable schema in lib/seo.ts references — meaning voice assistants
 * (Google Assistant, Alexa-Siri voice search) can extract the FAQ answers
 * directly when matching a user's spoken query.
 */
export default function FAQ({ items, title = 'Frequently asked questions' }: { items: FaqItem[]; title?: string }) {
  if (!items?.length) return null;
  return (
    <section className="bg-cream border-y border-stone">
      <Container className="py-14 md:py-20 max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">FAQ</p>
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-green mb-8">{title}</h2>
        <div className="divide-y divide-stone bg-white rounded-card shadow-card">
          {items.map((it, i) => (
            <details key={i} className="group p-6">
              <summary className="cursor-pointer font-serif text-lg text-green flex items-start justify-between gap-4 list-none faq-question">
                <span>{it.question}</span>
                <span className="text-gold text-2xl leading-none transition group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3 text-ink/80 text-sm leading-relaxed faq-answer">
                {Array.isArray(it.answer)
                  ? <PortableText value={it.answer} />
                  : <p>{String(it.answer)}</p>}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
