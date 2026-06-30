import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | Best Direct Cremation',
  description: 'How Best Direct Cremation collects, uses, and protects your personal data. Compliant with UK GDPR and the Data Protection Act 2018.',
  alternates: { canonical: `${SITE.url}/privacy-policy/` },
};

const LAST_UPDATED = '30 June 2026';

export default function PrivacyPage() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={`How ${SITE.name} collects, uses, and protects your personal data. Last updated: ${LAST_UPDATED}.`}
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
            Last updated: <strong>{LAST_UPDATED}</strong>. This Privacy Policy explains how {SITE.name}{' '}
            (&quot;we&quot;, &quot;us&quot;) collects, uses and protects your personal data when you use our website
            or services. We comply with the UK General Data Protection Regulation (UK GDPR) and the Data
            Protection Act 2018.
          </p>

          <h2>Who we are</h2>
          <p>
            {SITE.publisher} operates the {SITE.name} service. You can contact us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={SITE.phoneHref}>{SITE.phone}</a>.
          </p>

          <h2>What personal data we collect</h2>
          <ul>
            <li><strong>When you call us:</strong> your name, contact details, and details of the person who has died (so we can dispatch a funeral director). We may record calls for training and quality purposes.</li>
            <li><strong>When you enquire via our website:</strong> your name, email, phone number, and any details you provide in a form.</li>
            <li><strong>When you visit our website:</strong> standard server log data (IP address, browser, pages visited, referrer), and cookies for site functionality and basic analytics.</li>
          </ul>

          <h2>Why we collect it (lawful basis)</h2>
          <ul>
            <li><strong>To deliver the funeral service you arrange with us</strong> — lawful basis: contract.</li>
            <li><strong>To respond to enquiries</strong> — lawful basis: legitimate interests (responding to your enquiry).</li>
            <li><strong>To comply with legal obligations</strong> — e.g. cremation certification, retention of funeral records — lawful basis: legal obligation.</li>
            <li><strong>To improve our website and service</strong> — lawful basis: legitimate interests, with anonymous/aggregated data wherever possible.</li>
          </ul>

          <h2>Who we share data with</h2>
          <p>
            We share personal data only as necessary to deliver the funeral service:
          </p>
          <ul>
            <li><strong>The local funeral director</strong> assigned to your case (to enable collection, care, paperwork and the cremation).</li>
            <li><strong>The crematorium and Medical Referee</strong> (as required by UK cremation legislation).</li>
            <li><strong>Doctors</strong> issuing cremation certificates.</li>
            <li><strong>HMRC, the registrar, the coroner</strong> where legally required.</li>
            <li><strong>Service providers</strong> who help us operate (hosting, email, analytics) — under contract, only for the purposes we specify.</li>
          </ul>
          <p>
            We do not sell personal data. We do not share data for marketing purposes with third parties.
          </p>

          <h2>How long we keep data</h2>
          <ul>
            <li>Funeral records (legally required): minimum 50 years under UK cremation regulations.</li>
            <li>Enquiry data where no service was provided: 2 years from last contact, then deleted.</li>
            <li>Marketing email subscribers (if you opt in): until you unsubscribe.</li>
            <li>Server logs: 30 days, then anonymised or deleted.</li>
          </ul>

          <h2>Your rights under UK GDPR</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccurate or incomplete data.</li>
            <li>Request deletion of your data (where we don&apos;t have a legal obligation to retain it).</li>
            <li>Object to processing for marketing purposes.</li>
            <li>Restrict processing in certain circumstances.</li>
            <li>Data portability (receive your data in a structured machine-readable format).</li>
            <li>Withdraw consent at any time (where consent is our lawful basis).</li>
          </ul>
          <p>
            To exercise any of these rights, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We&apos;ll
            respond within 30 days.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website uses minimal cookies — strictly necessary cookies for site functionality, and basic
            analytics cookies (anonymised) to understand traffic patterns. We do not use advertising cookies or
            cross-site tracking. You can disable cookies in your browser settings; the site will still function.
          </p>

          <h2>Complaints</h2>
          <p>
            If you have a complaint about how we handle your personal data, please contact us first at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. You also have the right to complain to the UK
            Information Commissioner&apos;s Office (ICO) — <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>{' '}
            or 0303 123 1113.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of
            the page shows when this version took effect. If we make material changes, we&apos;ll notify users
            via the website or by email where appropriate.
          </p>
        </article>
      </Container>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy/' }]),
      )} />
    </>
  );
}
