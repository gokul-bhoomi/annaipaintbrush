import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Static HTML export. Produces plain files in `out/` with no server runtime,
   * which is what lets us keep deploying to the existing Firebase Hosting
   * project (`annai-paint-brush`) with no Functions and no billing change.
   */
  output: 'export',

  /**
   * next/image's default loader optimizes on demand at request time, which
   * needs a server. On a static host there isn't one, so we pre-generate
   * responsive AVIF/WebP variants at build time instead — see
   * scripts/optimize-images.mjs and components/ResponsiveImage.tsx.
   */
  images: {
    unoptimized: true,
  },

  /**
   * Emit `about/index.html` rather than `about.html` so Firebase serves
   * clean URLs without needing rewrites.
   */
  trailingSlash: true,

  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
