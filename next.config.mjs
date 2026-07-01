/**
 * Next.js config.
 *
 * - Image CDN allowlist for Sanity's image pipeline
 * - 301 redirects mapping the legacy WordPress URLs to the new structure
 *   (every old URL either keeps its slug or 301s to a single new home)
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'bestdirectcremation.co.uk' },
    ],
    // Serve AVIF where supported, WebP as fallback — smaller files, faster LCP
    formats: ['image/avif', 'image/webp'],
    // Reasonable device + image size breakpoints for our layouts
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384, 512],
    // 30-day cache on the optimised images
    minimumCacheTTL: 2592000,
  },
  // Smaller production runtime + better page load
  poweredByHeader: false,
  compress: true,
  // Treat trailing slashes consistently — we link with trailing slashes throughout
  trailingSlash: true,
  async redirects() {
    // All redirects live in lib/redirects.mjs (plain ESM so it can be imported
    // here at build time without a TypeScript pass). See that file for how to
    // add GSC top-page redirects after running scrape-wp-sitemap.ts.
    const { allRedirects } = await import('./lib/redirects.mjs');
    return allRedirects;
  },
  experimental: {
    // Helps the embedded Sanity Studio at /studio play nice with App Router.
    // We're deploying to a Vercel preview URL first — add the production domain here
    // when we're ready to cut over (bestdirectcremation.co.uk + any preview subdomains).
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        // Vercel preview deployments
        '*.vercel.app',
        // Production domain — uncomment when DNS is pointed at Vercel
        // 'bestdirectcremation.co.uk',
        // 'new.bestdirectcremation.co.uk',
      ],
    },
  },
};

export default nextConfig;
