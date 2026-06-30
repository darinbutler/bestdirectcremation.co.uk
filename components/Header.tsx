import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/site';
import { IMG } from '@/lib/images';
import { PRIMARY_NAV } from '@/lib/nav';
import Container from './Container';
import PhoneCTA from './PhoneCTA';
import SearchInput from './SearchInput';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone">
      <Container className="flex items-center justify-between py-3 md:py-4 gap-4">
        <Link href="/" className="flex items-center shrink-0" aria-label={`${SITE.name} home`}>
          <Image src={IMG.logo} alt={`${SITE.name} logo`} width={240} height={48} priority className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm lg:text-base font-medium text-ink/85" aria-label="Primary">
          {PRIMARY_NAV.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-green transition">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Compact search input — desktop only */}
          <div className="hidden lg:block">
            <SearchInput compact />
          </div>
          {/* Search icon — mobile + tablet (links to /search) */}
          <Link
            href="/search/"
            aria-label="Search"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-green hover:bg-cream"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
          <div className="hidden sm:block">
            <PhoneCTA size="sm" variant="green" />
          </div>
          {/* Mobile-only direct dial fallback for sm:hidden */}
          <a
            href={SITE.phoneHref}
            aria-label="Call us"
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-green text-white"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          {/* Hamburger — mobile only */}
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
