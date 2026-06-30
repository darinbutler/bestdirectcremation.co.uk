import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Website Terms & Conditions | Best Direct Cremation',
  description: 'Terms and conditions governing use of the Best Direct Cremation website. UK consumer law applies.',
  alternates: { canonical: `${SITE.url}/terms-and-conditions/` },
};

const LAST_UPDATED = '30 June 2026';

export default function TermsPage() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        title="Website Terms & Conditions"
        subtitle={`Terms governing your use of the ${SITE.name} website. Last updated: ${LAST_UPDATED}.`}
        showCTA={false}
      />

      <Container className="py-12 md:py-16 max-w-prose-wide">
        <article className="prose prose-lg max-w-none
                            prose-headings:font-serif prose-headings:text-green
                            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-stone
                            prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-4
                            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-ink prose-strong:font-bold
                            prose-ul:my-4 prose-li:my-1.5 prose-li:text-ink/85">

          <p className="text-sm text-ink/65 italic">
            Last updated: <strong>{LAST_UPDATED}</strong>. These Terms govern your use of the {SITE.name}{' '}
            website. They do not cover our actual funeral service — for that, see our{' '}
            <a href="/service-terms-and-conditions/">Service Terms &amp; Conditions</a>.
          </p>

          <h2>About these terms</h2>
          <p>
            These Website Terms (&quot;Terms&quot;) are between you (the user) and {SITE.publisher}{' '}
            (&quot;we&quot;, &quot;us&quot;). By using this website you agree to these Terms. If you don&apos;t
            agree, please stop using the site.
          </p>

          <h2>Use of this website</h2>
          <ul>
            <li>You may use this website for personal, non-commercial purposes — researching funerals, comparing providers, contacting us about a cremation, or reading our guides.</li>
            <li>You must not use this site to harm others, attempt to gain unauthorised access, scrape content for commercial republication, or breach any applicable law.</li>
            <li>You must not republish or commercially exploit content from this site without our written permission. Brief quotations with attribution and a link are permitted under fair use.</li>
          </ul>

          <h2>Accuracy of information</h2>
          <p>
            We do our best to keep the information on this website accurate and up to date — including pricing,
            comparison data, and guidance. However, the UK funeral industry changes and we cannot guarantee every
            piece of information is current. Always verify critical information directly with the provider before
            making a decision. <strong>The price you actually pay for our service is the price quoted at the time
            you book</strong>, not the price displayed on a page that may be out of date.
          </p>
          <p>
            Comparison data about other UK funeral providers is sourced from publicly available information and
            verified periodically. Dates of last verification appear on comparison pages. We are not affiliated
            with any of the competitors we compare against.
          </p>

          <h2>Not legal, medical or financial advice</h2>
          <p>
            Content on this site is for general information only. It is not legal advice, medical advice, or
            financial advice. We are not authorised by the Financial Conduct Authority to sell or advise on
            prepaid funeral plans (we plan to launch FCA-authorised funeral plans in 2027). Always seek
            professional advice for your specific situation.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All content on this website — text, images, code, design — is the property of {SITE.publisher} or our
            licensors, protected by UK copyright law. You may not copy, republish, or commercially exploit content
            without our written permission. Brief quotations with attribution and a link to the source page are
            permitted.
          </p>

          <h2>Third-party links</h2>
          <p>
            This website contains links to third-party websites (the FCA Register, GOV.UK, Citizens Advice,
            charities like Cruse, etc). We provide these links for your convenience but are not responsible for
            the content of third-party sites.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by UK law, we exclude liability for: indirect or consequential loss arising
            from your use of this website; loss arising from reliance on information that turns out to be
            inaccurate; and downtime or technical issues. Nothing in these Terms limits our liability for fraud,
            personal injury caused by negligence, or any other liability that cannot be excluded under UK law.
          </p>

          <h2>Governing law</h2>
          <p>
            These Terms are governed by the laws of England and Wales. Any dispute will be subject to the
            exclusive jurisdiction of the courts of England and Wales (or Scotland or Northern Ireland if you
            live there).
          </p>

          <h2>Contact</h2>
          <p>
            Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={SITE.phoneHref}>{SITE.phone}</a>.
          </p>
        </article>
      </Container>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Website Terms', path: '/terms-and-conditions/' }]),
      )} />
    </>
  );
}
