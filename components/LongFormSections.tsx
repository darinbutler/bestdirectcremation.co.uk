import { PortableText } from '@portabletext/react';
import Container from './Container';

export type LongFormSection = {
  sectionRole: string;
  heading?: string;
  body?: any;
};

const ORDER = [
  '01-opening','02-what-is','03-why-us','04-process','05-crematoria',
  '06-register','07-partner','08-pricing','09-after','11-related',
];

export default function LongFormSections({ sections }: { sections: LongFormSection[] }) {
  if (!sections?.length) return null;
  // Sort by the section role prefix so editors can add them in any order
  const sorted = [...sections].sort((a, b) =>
    ORDER.indexOf(a.sectionRole) - ORDER.indexOf(b.sectionRole)
  );
  return (
    <article className="bg-white border-y border-stone">
      <Container className="py-14 md:py-20 max-w-prose-wide">
        <div className="space-y-12">
          {sorted.map((s, i) => (
            <section key={i} className="">
              {s.heading && <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">{s.heading}</h2>}
              <div className="prose-longform text-ink/85 text-base leading-relaxed">
                {s.body && <PortableText value={s.body} />}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
