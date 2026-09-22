/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Static HTML export.
   *
   * `next build` now emits a complete static site to ./out — real .html files
   * plus hashed CSS/JS — deployable to any static host (S3, cPanel, Netlify,
   * GitHub Pages, a plain nginx root). No Node process is required to serve it.
   *
   * Nothing is lost by exporting: this site has no API routes, no server
   * actions and no runtime-dynamic rendering. Every animation, gradient, glow
   * and interaction is CSS or client-side JS, so it ships unchanged.
   *
   * If a server feature is ever added (API route, server action, ISR,
   * middleware, next/image optimisation), this line must come out — the build
   * will fail loudly rather than silently degrade.
   */
  output: 'export',

  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * Emit `privacy/index.html` rather than `privacy.html`, so the site works
   * from a filesystem root on hosts that do not rewrite extensionless URLs.
   */
  trailingSlash: true,
};

export default nextConfig;
