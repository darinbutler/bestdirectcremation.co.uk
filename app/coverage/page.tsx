import type { Metadata } from 'next';
import Link from 'next/link';
import { sanity } from '@/lib/sanity';
import { allCountiesForHubQuery } from '@/lib/queries';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'UK Direct Cremation Coverage — Every County',
  description: `${SITE.name} arranges direct cremation across every UK county. Find direct cremation in your county — call ${SITE.phone}, 24 hours a day.`,
  alternates: { canonical: `${SITE.url}/coverage/` },
};

// Anchor ids so footer links like /coverage/#england work cleanly
const ANCHOR: Record<string, string> = {
  England: 'england',
  Wales: 'wales',
};

// Where we currently operate (live partner FD network)
const ACTIVE_COUNTRIES = ['England', 'Wales'];
// Where we're expanding — pages still indexable, shown under their own section
const PENDING_COUNTRIES = ['Scotland', 'Northern Ireland'];

export default async function CoveragePage() {
  const counties = await sanity.fetch<Array<{ name: string; slug: string; country: string; region?: string }>>(allCountiesForHubQuery);
  const byCountry: Record<string, typeof counties> = {};
  counties.forEach(c => { (byCountry[c.country] ||= []).push(c); });
  Object.values(byCountry).forEach(list => list!.sort((a, b) => a.name.localeCompare(b.name)));

  return (
    <>
      <Hero
        eyebrow="UK coverage"
        title="Direct cremation across England and Wales"
        subtitle="A growing network of independent funeral directors covers every county in England and Wales. Call us 24 hours a day and we'll arrange a Best Direct Cremation for your family."
      />

      <Container className="py-12 md:py-16">
        {/* Country quick-jump — only live countries */}
        <nav aria-label="Jump to country" className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-stone">
          {ACTIVE_COUNTRIES.filter(c => byCountry[c]).map(country => (
            <a key={country} href={`#${ANCHOR[country]}`}
               className="inline-flex items-center px-4 py-2 rounded-full bg-cream text-green text-sm font-medium hover:bg-gold hover:text-white transition">
              {country} <span className="ml-2 text-xs text-ink/50">({byCountry[country]!.length})</span>
            </a>
          ))}
        </nav>

        {ACTIVE_COUNTRIES.filter(c => byCountry[c]).map(country => (
          <section key={country} id={ANCHOR[country]} className="mb-14 scroll-mt-24">
            <h2 className="font-serif text-2xl md:text-3xl text-green mb-2">{country}</h2>
            <p className="text-sm text-ink/70 mb-5">{byCountry[country]!.length} counties covered across {country}.</p>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {byCountry[country]!.map(c => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}/`}
                        className="block bg-cream p-4 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
                    <p className="font-serif text-green">Direct cremation in {c.name}</p>
                    {c.region && <p className="text-xs text-ink/55 mt-1">{c.region}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Pending countries — Scotland + Northern Ireland — softer treatment */}
        {PENDING_COUNTRIES.some(c => byCountry[c]) && (
          <section className="mt-4 mb-10 bg-gold/10 border border-gold/30 rounded-2xl px-6 md:px-10 py-8 md:py-10">
            <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-2">Expanding network</p>
            <h2 className="font-serif text-xl md:text-2xl text-green mb-3">Scotland &amp; Northern Ireland</h2>
            <p className="text-ink/85 leading-relaxed mb-5 text-sm md:text-base">
              {SITE.name} is in the process of partnering with vetted independent funeral directors across Scotland and
              Northern Ireland. If you need to arrange a direct cremation in one of these areas today, please call us —
              we&apos;ll either connect you to an existing partner serving the surrounding area or recommend a trusted local
              independent funeral director who meets our standards of care.
            </p>
            <PhoneCTA size="md" variant="green" />
          </section>
        )}

        {/* Always-on national coverage CTA */}
        <section className="bg-green text-cream rounded-2xl px-6 md:px-10 py-10 md:py-12 text-center mt-8">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">Don&apos;t see your specific town?</h2>
          <p className="text-cream/85 max-w-2xl mx-auto mb-7 leading-relaxed">
            Even where we don&apos;t yet have a named local partner, we can almost always connect you with a vetted
            independent funeral director who meets the same standards of care. Call us 24 hours a day.
          </p>
          <div className="inline-block">
            <PhoneCTA size="lg" variant="invert" />
            <p className="text-sm italic text-cream/90 mt-2">{SITE.promiseSubtext}</p>
          </div>
        </section>
      </Container>
    </>
  );
}
