import Link from 'next/link';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import SearchInput from '@/components/SearchInput';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Page not found | Best Direct Cremation',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Hero
        eyebrow="404"
        title="Page not found"
        subtitle="The page you were looking for doesn't exist or may have moved. Search below, browse the popular links, or call us 24 hours a day."
        showCTA={false}
      />

      <Container className="py-12 md:py-16">

        <div className="max-w-2xl mx-auto mb-12">
          <SearchInput />
        </div>

        <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3 text-center">Popular pages</p>
        <h2 className="font-serif text-2xl md:text-3xl text-green mb-8 text-center">Where would you like to go?</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { href: '/',                          label: 'Homepage',                       sub: 'Direct cremation £1,499 all-inclusive' },
            { href: '/coverage/',                 label: 'UK coverage',                    sub: 'Every English & Welsh county' },
            { href: '/cost-calculator/',          label: 'Cost calculator',                sub: 'See your saving by region' },
            { href: '/help/what-to-do-when-someone-dies/', label: 'What to do when someone dies', sub: 'Step-by-step practical guide' },
            { href: '/help/cost-of-a-funeral/',   label: 'Cost of a funeral',              sub: 'Full UK 2026 pricing breakdown' },
            { href: '/compare/',                  label: 'Compare UK providers',           sub: 'vs Pure Cremation, Co-op, Dignity & more' },
            { href: '/help/',                     label: 'Help & guidance',                sub: '24 in-depth UK funeral guides' },
            { href: '/glossary/',                 label: 'Funeral terms glossary',         sub: '124 UK funeral terms explained' },
            { href: '/funeral-plans/',            label: 'Funeral plans guide',            sub: '152 articles on UK funeral plans' },
          ].map(link => (
            <Link key={link.href} href={link.href} className="block bg-cream p-5 rounded-card shadow-card hover:shadow-lift hover:bg-white transition border border-transparent hover:border-gold">
              <p className="font-serif text-green leading-snug mb-1">{link.label}</p>
              <p className="text-xs text-ink/65">{link.sub}</p>
            </Link>
          ))}
        </div>
      </Container>

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Need to arrange a direct cremation right now?</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">
            Call us 24 hours a day — a real person, every call. £1,499 all-inclusive, delivered locally.
          </p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>
    </>
  );
}
