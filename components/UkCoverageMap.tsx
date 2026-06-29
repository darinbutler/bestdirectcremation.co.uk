import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import PhoneCTA from './PhoneCTA';
import { IMG } from '@/lib/images';

export default function UkCoverageMap() {
  return (
    <section className="bg-cream border-y border-stone">
      <Container className="py-14 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative w-full aspect-[7/8] max-w-md mx-auto lg:max-w-none">
            <Image src={IMG.ukCoverageMap} alt="Best Direct Cremation coverage map of the UK" fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Coverage</p>
            <h2 className="font-serif text-section text-navy mb-5 leading-tight">Local care, nationwide</h2>
            <p className="text-ink/85 leading-relaxed mb-4">Best Direct Cremation is built around a growing network of independent funeral directors — carefully chosen by us for their professionalism, facilities and standards of care.</p>
            <p className="text-ink/85
cd ~/bestdirectcremation

# 4) components/UkCoverageMap.tsx (NEW)
cat > components/UkCoverageMap.tsx <<'BDC_EOF'
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import PhoneCTA from './PhoneCTA';
import { IMG } from '@/lib/images';

export default function UkCoverageMap() {
  return (
    <section className="bg-cream border-y border-stone">
      <Container className="py-14 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative w-full aspect-[7/8] max-w-md mx-auto lg:max-w-none">
            <Image src={IMG.ukCoverageMap} alt="Best Direct Cremation coverage map of the UK" fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-gold font-semibold mb-3">Coverage</p>
            <h2 className="font-serif text-section text-navy mb-5 leading-tight">Local care, nationwide</h2>
            <p className="text-ink/85 leading-relaxed mb-4">Best Direct Cremation is built around a growing network of independent funeral directors — carefully chosen by us for their professionalism, facilities and standards of care.</p>
            <p className="text-ink/85 leading-relaxed mb-4">We are continuing to expand our network across the UK. At the moment, we can offer Best Direct Cremation services in the areas shown on the map.</p>
            <p className="text-ink/85 leading-relaxed mb-6">If you&apos;re unsure whether we currently cover your area, <strong>please call us</strong>. We&apos;ll confirm straight away whether we can help you, and talk you through the options available to you.</p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <PhoneCTA size="md" variant="gold" />
              <Link href="/coverage/" className="text-gold underline font-medium hover:text-gold-dark">Browse all UK counties →</Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
