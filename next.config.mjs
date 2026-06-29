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
  },
  async redirects() {
    return [
      // WordPress legacy URLs that change slug in the rebuild
      { source: '/direct-cremations',          destination: '/direct-cremation', permanent: true },
      { source: '/direct-cremations/',         destination: '/direct-cremation', permanent: true },
      { source: '/help-and-guidance',          destination: '/help', permanent: true },
      { source: '/help-and-guidance/',         destination: '/help', permanent: true },
      { source: '/help-and-guidance/:slug*',   destination: '/help/:slug*', permanent: true },
      { source: '/direct-cremation-providers', destination: '/providers', permanent: true },
      { source: '/direct-cremation-providers/', destination: '/providers', permanent: true },
      // County pages keep their slugs in the rebuild — same /[county]/ pattern
      // Add explicit redirects here if any individual county slug changes.
    ];
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
