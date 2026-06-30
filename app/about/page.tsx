import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import TrustSignals from '@/components/TrustSignals';
import WhyBdc from '@/components/WhyBdc';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Best Direct Cremation — Local Funeral Director Network UK',
  description: 'Best Direct Cremation arranges direct cremation across the UK through a vetted network of NAFD- and SAIF-accredited local independent funeral directors. £1,499 all-inclusive.',
  alternates: { canonical: `${SITE.url}/about/` },
};

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About us"
        title="Local funeral directors, nationwide service"
        subtitle={`${SITE.name} arranges direct cremation across the UK through a vetted network of NAFD- and SAIF-accredited local independent funeral directors. £1,499 all-inclusive, delivered with dignity and care.`}
      />

      <TrustSignals />

      <Container className="py-12 md:py-16 max-w-prose-wide">
        <article className="prose prose-lg max-w-none
                            prose-headings:font-serif prose-headings:text-green
                            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                            prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                            prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-ink prose-strong:font-bold">
          <h2>What we do</h2>
          <p>
            {SITE.name} arranges simple, dignified direct cremations across England and Wales through a growing
            network of vetted, independent local funeral directors. We&apos;re expanding into Scotland and Northern
            Ireland. Every cremation we arrange is delivered <strong>locally</strong> — your loved one is never
            transported to a centralised hub, and the cremation takes place at a local crematorium near home.
          </p>
          <p>
            Our service costs <strong>£1,499 all-inclusive</strong>. The only optional cost is a £250 Priority
            Care collection fee if the person who has died is not at a hospital or coroner&apos;s mortuary —
            maximum total £1,749. There are no other fees added at the point of need.
          </p>

          <h2>How we&apos;re different</h2>
          <p>
            Most UK direct cremation providers operate centralised models. Their collection drivers cover the UK
            from regional bases, your loved one is transported to a single mortuary (sometimes hundreds of miles
            from home), and the cremation takes place at a corporate-owned crematorium. This keeps costs lower at
            scale, but it means your loved one is moved a long way from where they rested.
          </p>
          <p>
            We chose a different model. Every cremation we arrange is delivered by an independent funeral director
            who lives and works in your community. Their premises, their mortuary, their vehicles, their reputation
            — all local. The cremation takes place at the closest local crematorium, often within 10–15 miles of
            where your loved one lived.
          </p>

          <h2>How we vet our partner funeral directors</h2>
          <p>
            Every funeral director in our network must meet four standards before we add them. They must be{' '}
            <strong>NAFD or SAIF accredited</strong> — the two main UK funeral trade bodies, both of which require
            professional standards, a code of practice, and a complaints process. They must have <strong>their own
            premises and mortuary</strong> — not a shared facility or a third-party arrangement. They must be{' '}
            <strong>locally established</strong> with a track record in their community. And they must meet our
            standards for staff training, vehicle quality, and dignity in care.
          </p>
          <p>
            We&apos;ve done the vetting so you don&apos;t have to. When you call us, you&apos;re matched with a
            local funeral director we&apos;ve already checked.
          </p>

          <h2>Our brand promise</h2>
          <p>
            <strong>{SITE.strapline}.</strong> {SITE.promiseSubtext}. Call us on{' '}
            <a href={SITE.phoneHref}>{SITE.phone}</a> — a real person, 24 hours a day, every call.
          </p>

          <h2>Funeral plans (launching 2027)</h2>
          <p>
            We do not currently sell prepaid funeral plans. We plan to launch our own direct cremation funeral
            plans in early 2027, once FCA-authorised. Until then, our funeral plans content is informational only —
            we explain how plans work, what to look for in an FCA-regulated provider, and how to compare options,
            without selling anything ourselves.
          </p>

          <h2>Contact</h2>
          <p>
            <strong>Phone (24/7):</strong> <a href={SITE.phoneHref}>{SITE.phone}</a><br />
            <strong>Email:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <p>
            If you&apos;re a funeral director interested in joining our partner network, please visit our{' '}
            <a href="/partner-with-us/">Partner with us</a> page.
          </p>
        </article>
      </Container>

      <WhyBdc />

      <section className="bg-green text-cream">
        <Container className="py-14 md:py-20 text-center">
          <h2 className="font-serif text-section text-white mb-4">Need to arrange a direct cremation?</h2>
          <p className="text-cream/85 mb-8 max-w-2xl mx-auto">£1,499 all-inclusive, delivered locally by a vetted independent funeral director. Call 24 hours a day.</p>
          <div className="inline-block"><PhoneCTA size="lg" variant="invert" showSubtext pulse /></div>
        </Container>
      </section>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }]),
      )} />
    </>
  );
}
