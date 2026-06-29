import type { Metadata, Viewport } from 'next';
import { Literata, Cabin } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileCallBar from '@/components/MobileCallBar';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { jsonLdString, organizationSchema, webSiteSchema } from '@/lib/seo';

const literata = Literata({ subsets: ['latin'], variable: '--font-literata', display: 'swap' });
const cabin    = Cabin({ subsets: ['latin'], variable: '--font-cabin', display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1F2A44',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.priceLabel} Local Care | UK Direct Cremation`,
    template: `%s | ${SITE.name}`,
  },
  description: 'Direct cremation in the UK from £1,499, delivered locally by a vetted independent funeral director. Call 0333 242 1405 — 24 hours a day.',
  applicationName: SITE.name,
  publisher: SITE.publisher,
  openGraph: {
    type: 'website', locale: 'en_GB', siteName: SITE.name,
    url: SITE.url, title: `${SITE.name} | Know You're In Great Care`,
    description: 'Simple, dignified direct cremation. Always delivered locally by handpicked independent funeral directors. £1,499 all-inclusive.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${literata.variable} ${cabin.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
        <JsonLd raw={jsonLdString(organizationSchema(), webSiteSchema())} />
      </body>
    </html>
  );
}
