import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/site';
import { IMG } from '@/lib/images';
import Container from './Container';
import PhoneCTA from './PhoneCTA';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone">
      <Container className="flex items-center justify-between py-3 md:py-4 gap-4">
        <Link href="/" className="flex items-center" aria-label={`${SITE.name} home`}>
          <Image src={IMG.logo} alt={`${SITE.name} logo`} width={240} height={48} priority className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink/80">
          <Link href="/direct-cremation/" className="hover:text-navy">What is a Direct Cremation?</Link>
          <Link href="/funeral-plans/"    className="hover:text-navy">Funeral Plans</Link>
          <Link href="/help/"              className="hover:text-navy">Help and Guidance</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <PhoneCTA size="sm" variant="green" />
          </div>
          <a
            href={SITE.phoneHref}
            aria-label="Call us"
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-green text-white"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </div>
      </Container>
    </header>
  );
}
