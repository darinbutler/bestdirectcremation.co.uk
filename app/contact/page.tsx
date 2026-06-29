import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import PhoneCTA from '@/components/PhoneCTA';
import { SITE } from '@/lib/site';

export const metadata: Metadata = { title: 'Contact Best Direct Cremation' };

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title={<>Get in <span className="text-gold">touch</span></>}
        subtitle="A real person answers, 24 hours a day. Call us — we're here to help."
      />
      <Container className="py-14 max-w-prose-wide">
        <PhoneCTA size="lg" variant="gold" showSubtext pulse />
        <p className="mt-6 text-ink/85">
          For editorial enquiries or feedback, email{' '}
          <a className="text-gold underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </Container>
    </>
  );
}
