/**
 * Internal page links.
 *
 * WHY THIS IS NOT `next/link`
 * Two reasons, and the second is the important one.
 *
 * 1. This is a static brochure site. Client-side route transitions buy nothing
 *    here — they only add an RSC payload fetch per navigation — while a plain
 *    anchor gives a normal, reliable page load.
 *
 * 2. `<Link>` hydrates and intercepts clicks using the route path from its
 *    props. In the PORTABLE build (see scripts/build-portable.mjs) the HTML is
 *    rewritten to point at real files — ./tcpa.html — but that rewrite does not
 *    survive hydration: React re-renders from the original prop and the router
 *    navigates to /tcpa, which is not a file on disk. Opening the folder and
 *    clicking a legal link produced a 404. A plain anchor has nothing to
 *    intercept, so the href in the markup is the href that is used.
 *
 * NEXT_PUBLIC_PORTABLE is inlined at build time, so each build emits the right
 * shape of href directly rather than relying on a post-build rewrite.
 */
const PORTABLE = process.env.NEXT_PUBLIC_PORTABLE === '1';

/**
 * Link to a legal page by slug.
 *
 * The hosted form keeps its trailing slash deliberately. The hosting build
 * sets `trailingSlash: true`, so the page on disk is `privacy/index.html`.
 * `<Link>` used to normalise `/privacy` to `/privacy/` for us; a plain anchor
 * is left exactly as written, and `/privacy` without the slash 404s on a host
 * that does not redirect to the directory form.
 */
export const pageHref = (slug: string): string =>
  PORTABLE ? `./${slug}.html` : `/${slug}/`;

/** Link to the landing page. */
export const homeHref = (): string => (PORTABLE ? './index.html' : '/');
