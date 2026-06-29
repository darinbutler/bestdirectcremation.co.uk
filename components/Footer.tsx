import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import { SITE } from '@/lib/site';
import { IMG } from '@/lib/images';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-cream/85 mt-12 pb-16 md:pb-12">
      <Container className="py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Image src={IMG.logoWhite} alt={`${SITE.name} logo`} width={280} height={56} className="h-12 w-auto mb-4" />
            <p className="text-sm text-cream/70 leading-relaxed max-w-md mb-4">Simple, dignified direct cremation. Always delivered locally by our handpicked, independent BEST Funeral Directors. {SITE.strapline}</p>
            <div className="flex gap-3 items-center">
              <a href="http://www.facebook.com/bestfuneral" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cream/15 hover:bg-gold transition">
                <svg className="w-4 h-4 text-cream" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="https://www.instagram.com/bestfunerals/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cream/15 hover:bg-gold transition">
                <svg className="w-4 h-4 text-cream" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="font-serif text-white mb-3 text-sm uppercase tracking-wider">Pages</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/direct-cremation/" className="hover:text-white">What is a Direct Cremation?</Link></li>
              <li><Link href="/funeral-plans/"    className="hover:text-white">Funeral Plans</Link></li>
              <li><Link href="/coverage/"          className="hover:text-white">Coverage</Link></li>
              <li><Link href="/help/"              className="hover:text-white">Help and Guidance</Link></li>
              <li><Link href="/providers/"         className="hover:text-white">Direct Cremation Providers</Link></li>
              <li><a href="https://bestdirectcremation.co.uk/wp-content/uploads/2026/05/Standardised-Price-List-2.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white">CMA Standardised Price List</a></li>
            </ul>
          </div>
          <div>
            <p className="font-serif text-white mb-3 text-sm uppercase tracking-wider">Get in touch</p>
            <ul className="space-y-2 text-sm">
              <li><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
              <li><a href={SITE.phoneHref} className="hover:text-white">{SITE.phone}</a></li>
            </ul>
            <p className="font-serif text-white mt-6 mb-3 text-sm uppercase tracking-wider">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy/"  className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions/" className="hover:text-white">Website Terms</Link></li>
              <li><Link href="/service-terms-and-conditions/" className="hover:text-white">Service Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 pt-8 text-xs text-cream/60 leading-relaxed space-y-3">
          <p>{SITE.name} works with a UK network of NAFD or SAIF accredited independent funeral directors. Every cremation is delivered locally, never centralised. Our pricing is transparent — {SITE.priceLabel} all-inclusive, with a maximum of {SITE.priceCeiling} where a Priority Care collection is required.</p>
          <p className="pt-2">© {year} {SITE.publisher}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
