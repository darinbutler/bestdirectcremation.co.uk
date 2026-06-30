import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Service Terms & Conditions | Best Direct Cremation',
  description: 'Terms governing the Best Direct Cremation funeral service — what we provide, what it costs, your rights, and how to complain.',
  alternates: { canonical: `${SITE.url}/service-terms-and-conditions/` },
};

const LAST_UPDATED = '30 June 2026';

export default function ServiceTermsPage() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        title="Service Terms & Conditions"
        subtitle={`Terms governing the ${SITE.name} funeral service. Last updated: ${LAST_UPDATED}.`}
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
            Last updated: <strong>{LAST_UPDATED}</strong>. These Service Terms govern the funeral service you
            arrange through {SITE.name}. They are separate from our{' '}
            <a href="/terms-and-conditions/">Website Terms</a>.
          </p>

          <h2>What we provide</h2>
          <p>
            {SITE.name} arranges direct cremation services delivered by a vetted local independent funeral
            director from our network. The service is a simple, dignified cremation with no service or ceremony
            at the crematorium.
          </p>
          <p>
            A standard direct cremation includes: collection of the deceased from a hospital or coroner&apos;s
            mortuary; professional care of the deceased in the local funeral director&apos;s mortuary; a simple
            coffin suitable for cremation; all legal paperwork including the Cremation Forms and Green Form
            authorisation; the cremation at a local crematorium; and the return of ashes in a simple urn or scatter
            tube.
          </p>

          <h2>Price</h2>
          <ul>
            <li><strong>£1,499 all-inclusive</strong> for the standard direct cremation service described above.</li>
            <li><strong>£250 Priority Care collection fee</strong> applies when the deceased is collected from anywhere other than a hospital or coroner&apos;s mortuary (e.g. home, care home, hospice).</li>
            <li><strong>Maximum total: £1,749</strong> when Priority Care is included.</li>
            <li>The price quoted at the time of booking is the price you pay. There are no other fees added at the point of need.</li>
          </ul>

          <h2>What is not included</h2>
          <ul>
            <li>A service or ceremony at the crematorium.</li>
            <li>Attendance by family or friends at the cremation.</li>
            <li>A hearse or limousine for family transport.</li>
            <li>A celebrant or minister.</li>
            <li>Music, readings, or order of service.</li>
            <li>Flowers, alternative urns, embalming, or upgraded coffin.</li>
            <li>Memorial arrangements, formal notices, or wake.</li>
          </ul>

          <h2>How to book</h2>
          <p>
            Book by calling us on <a href={SITE.phoneHref}>{SITE.phone}</a>. Our team is available 24 hours a day,
            every day. A real person answers every call. Once you confirm you want to proceed, we dispatch a local
            funeral director.
          </p>

          <h2>Your right to cancel</h2>
          <p>
            Under UK consumer law (Consumer Contracts Regulations 2013), you have the right to cancel within 14
            days of agreeing to the service, provided no irreversible step (the cremation) has taken place. In
            practice, because funerals must happen within a short timeframe, cancellation is usually only practical
            up to the point the cremation paperwork is approved by the Medical Referee. If you change your mind,
            tell us immediately on <a href={SITE.phoneHref}>{SITE.phone}</a>.
          </p>

          <h2>Refunds</h2>
          <p>
            If you cancel before the cremation paperwork is approved by the Medical Referee, we refund what you
            paid less any costs already incurred by the local funeral director (collection, mortuary care,
            paperwork already raised). The exact refund depends on how far the service has progressed.
          </p>
          <p>
            If you cancel after the cremation has taken place, no refund is possible.
          </p>

          <h2>Our obligations to you</h2>
          <ul>
            <li>Provide the service we have agreed to in a professional and dignified manner.</li>
            <li>Use a NAFD- or SAIF-accredited local independent funeral director for every cremation we arrange.</li>
            <li>Care for the deceased at the local funeral director&apos;s mortuary, not at a centralised facility.</li>
            <li>Use the closest local crematorium.</li>
            <li>Comply with all UK cremation legislation including doctor&apos;s certificates, the Cremation Forms, the Green Form, and Medical Referee approval.</li>
            <li>Return the ashes to you within 5-14 days of the cremation.</li>
            <li>Communicate clearly throughout — a real person, 24 hours a day, every call.</li>
          </ul>

          <h2>Your obligations</h2>
          <ul>
            <li>Pay the agreed price (£1,499 or £1,749 with Priority Care) by the agreed payment terms.</li>
            <li>Register the death at the local register office within the legal timeframe (5 days in England, Wales and Northern Ireland; 8 days in Scotland) and provide the Green Form to the funeral director.</li>
            <li>Sign Form Cremation 10 (Authority to Cremate) when presented to you by the funeral director.</li>
            <li>Be honest and accurate in any information you provide about the deceased, the cause of death, or the family&apos;s wishes.</li>
          </ul>

          <h2>Complaints</h2>
          <p>
            If you are unhappy with our service, please raise it with us first by emailing{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or calling <a href={SITE.phoneHref}>{SITE.phone}</a>.
            We aim to resolve complaints within 28 days.
          </p>
          <p>
            If we cannot resolve a complaint to your satisfaction, you can escalate to the funeral trade body that
            accredits the local funeral director who delivered the service — NAFD (<a href="https://nafd.org.uk" target="_blank" rel="noopener noreferrer">nafd.org.uk</a>)
            or SAIF (<a href="https://saif.org.uk" target="_blank" rel="noopener noreferrer">saif.org.uk</a>). Both
            have established complaints processes.
          </p>

          <h2>Liability</h2>
          <p>
            To the extent permitted by UK law, our liability for any failure of the service is limited to a refund
            of the price paid plus any reasonable consequential costs you incur. Nothing in these Terms limits our
            liability for fraud, personal injury caused by our negligence, or any other liability that cannot be
            excluded under UK consumer law.
          </p>

          <h2>Governing law</h2>
          <p>
            These Service Terms are governed by the laws of England and Wales (or Scotland or Northern Ireland if
            you live there). Disputes are subject to the exclusive jurisdiction of the courts of that jurisdiction.
          </p>

          <h2>Contact</h2>
          <p>
            Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · Phone (24/7) <a href={SITE.phoneHref}>{SITE.phone}</a>.
          </p>
        </article>
      </Container>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Service Terms', path: '/service-terms-and-conditions/' }]),
      )} />
    </>
  );
}
