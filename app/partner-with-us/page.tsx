import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import TrustSignals from '@/components/TrustSignals';
import PartnerSignupForm from '@/components/PartnerSignupForm';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, jsonLdString } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Partner With Us — Join the Best Direct Cremation Funeral Director Network',
  description: 'NAFD- or SAIF-accredited UK funeral directors: join our vetted partner network. Local independent funeral homes only. Submit an enquiry — care@bestfunerals.co.uk.',
  alternates: { canonical: `${SITE.url}/partner-with-us/` },
};

export default function PartnerPage() {
  return (
    <>
      <Hero
        eyebrow="For funeral directors"
        title="Join our partner network"
        subtitle="NAFD- or SAIF-accredited independent UK funeral homes can apply to join our network. Local delivery only — no centralised hubs."
        showCTA={false}
      />

      <TrustSignals />

      <Container className="py-12 md:py-16 max-w-prose-wide">
        <article className="prose prose-lg max-w-none
                            prose-headings:font-serif prose-headings:text-green
                            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gold/30 prose-h2:relative prose-h2:pl-5
                            prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-1 prose-h2:before:bottom-3 prose-h2:before:w-1 prose-h2:before:bg-gold
                            prose-p:text-ink/85 prose-p:leading-relaxed prose-p:my-5
                            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-ink prose-strong:font-bold
                            prose-ul:my-5 prose-li:my-1.5 prose-li:text-ink/85">

          <h2>Who we&apos;re looking for</h2>
          <p>
            Best Direct Cremation is built around a network of vetted local independent funeral directors. We&apos;re
            growing our coverage across the UK and are always looking to add high-quality funeral homes to the network.
          </p>
          <p>
            We&apos;re a good fit for you if you are:
          </p>
          <ul>
            <li>An <strong>independent funeral director</strong> (not a national chain branch).</li>
            <li><strong>NAFD or SAIF accredited</strong>.</li>
            <li>Operating from <strong>your own premises</strong> with <strong>your own mortuary</strong> on site.</li>
            <li>Locally established with a track record in your community.</li>
            <li>Able to handle 24-hour collection for Priority Care cases.</li>
            <li>Committed to delivering direct cremation at our standard service quality.</li>
          </ul>

          <h2>How we work with partners</h2>
          <p>
            We pass referred families to you for direct cremation services. You collect the deceased, care for them
            in your mortuary, handle all the cremation paperwork, conduct the cremation at the closest local
            crematorium, and return the ashes to the family. We pay you per cremation completed at agreed rates.
          </p>
          <p>
            You retain your independence — you continue to handle traditional funerals and your other work as
            normal. The Best Direct Cremation referrals are additional volume for the direct cremation segment
            specifically.
          </p>

          <h2>What you get</h2>
          <ul>
            <li>Steady referral volume for direct cremation, growing with the segment (now ~20% of UK funerals).</li>
            <li>All marketing and customer acquisition done by us — you focus on delivery.</li>
            <li>Centralised handling of customer enquiries via our 24/7 phone team.</li>
            <li>Transparent payment terms — paid per cremation, monthly invoicing.</li>
            <li>Brand association with a national direct cremation operator that emphasises local delivery (we promote local funeral directors as the differentiator).</li>
            <li>No exclusivity — you remain free to work with other operators and direct customers.</li>
          </ul>

          <h2>The signup process</h2>
          <ol>
            <li>Submit the enquiry form below with your funeral home details.</li>
            <li>We respond within 2 working days to schedule an introductory conversation.</li>
            <li>We verify your NAFD or SAIF accreditation, premises and mortuary standards.</li>
            <li>If both sides are happy, we agree commercial terms and onboard you to the network.</li>
            <li>You start receiving direct cremation referrals for your service area.</li>
          </ol>

          <h2>Submit your enquiry</h2>
          <p>
            Fill in the form below and we&apos;ll be in touch. You can also email us directly at{' '}
            <a href="mailto:care@bestfunerals.co.uk">care@bestfunerals.co.uk</a> if you&apos;d prefer.
          </p>
        </article>

        <div className="mt-10">
          <PartnerSignupForm />
        </div>
      </Container>

      <JsonLd raw={jsonLdString(
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Partner with us', path: '/partner-with-us/' }]),
      )} />
    </>
  );
}
