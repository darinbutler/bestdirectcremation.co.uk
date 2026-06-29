/**
 * Bare layout for the embedded Sanity Studio — overrides the site layout
 * so the Studio renders full-screen without the BDC header/footer.
 */
export const metadata = { title: 'Best Direct Cremation — Sanity Studio' };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ height: '100vh' }}>{children}</div>;
}
