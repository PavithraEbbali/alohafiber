/**
 * PORTABLE=1 builds a copy that runs from a plain folder (double-click
 * index.html) as well as from a web server. See scripts/make-portable.mjs.
 */
const PORTABLE = process.env.PORTABLE === '1';

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
   *
   * PORTABLE=1 flips this off, which flattens every page to the output root
   * (privacy.html, tcpa.html, ...). That matters because `assetPrefix: '.'`
   * resolves relative to the *document*: at a uniform depth it is correct for
   * every page, whereas with nested directories `./_next/` from /privacy/
   * would look for /privacy/_next/. Flattening is what makes a single relative
   * prefix safe.
   */
  trailingSlash: !PORTABLE,

  /**
   * PORTABLE=1 also makes the webpack runtime's publicPath relative. Without
   * it the runtime carries a hardcoded "/_next/" and any chunk it fetches at
   * runtime resolves to the filesystem root under file://. Rewriting the HTML
   * alone does not reach that string — it lives inside the JS bundle.
   */
  ...(PORTABLE ? { assetPrefix: '.' } : {}),
};

export default nextConfig;
