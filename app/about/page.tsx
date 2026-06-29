import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Container from '@/components/Container';

export const metadata: Metadata = { title: 'About Best Direct Cremation' };

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About"
        title={<>About <span className="text-gold">Best Direct Cremation</span></>}
        subtitle="Simple, dignified direct cremation, delivered locally by independent funeral directors across the UK."
      />
      <Container className="py-14 max-w-prose-wide prose-longform">
        <p>Best Direct Cremation works with a vetted network of NAFD- or SAIF-accredited independent funeral directors. Every cremation is delivered locally — never centralised.</p>
        <p>This page is being expanded with company history, accreditation evidence and the editorial standards behind every Best Funeral Director partnership.</p>
      </Container>
    </>
  );
}
