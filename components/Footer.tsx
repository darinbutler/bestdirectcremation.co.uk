import Link from 'next/link';
import Container from './Container';
import { SITE } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-cream/85 mt-12 pb-16 md:pb-12">
      <Container className="py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <p className="font-serif text-2xl text-white mb-3">{SITE.name}</p>
            <p className="text-sm text-cream/70 leading-relaxed max-w-md mb-4">
              Simple, dignified direct cremation. Always delivered locally by our handpicked,
              independent BEST Funeral Directors. {SITE.strapline}
            </p>
            <p className="text-xs text-cream/55 leading-relaxed">
              Call us 24 hours a day · {SITE.phone}
            </p>
          </div>

          <div>
            <p className="font-serif text-white mb-3 text-sm uppercase tracking-wider">Direct Cremation</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/direct-cremation/" className="hover:text-white">What is direct cremation?</Link></li>
              <li><Link href="/coverage/"          className="hover:text-white">UK coverage</Link></li>
              <li><Link href="/providers/"         className="hover:text-white">Our partner funeral directors</Link></li>
              <li><Link href="/compare/"           className="hover:text-white">Compare providers</Link></li>
              <li><Link href="/cost/"              className="hover:text-white">Cost guide</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-serif text-white mb-3 text-sm uppercase tracking-wider">More</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/funeral-plans/"   className="hover:text-white">Funeral plans</Link></li>
              <li><Link href="/help/"            className="hover:text-white">Help &amp; guidance</Link></li>
              <li><Link href="/about/"           className="hover:text-white">About us</Link></li>
              <li><Link href="/contact/"         className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy-policy/"  className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms-and-conditions/" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-8 text-xs text-cream/60 leading-relaxed space-y-3">
          <p>
            {SITE.name} works with a UK network of NAFD or SAIF accredited independent funeral directors. Every cremation is
            delivered locally, never centralised. Our pricing is transparent — {SITE.priceLabel} all-inclusive,
            with a maximum of {SITE.priceCeiling} where a Priority Care collection is required.
          </p>
          <p className="pt-2">© {year} {SITE.publisher}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
