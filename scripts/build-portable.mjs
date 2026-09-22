/**
 * Build a portable copy of the site that runs from a plain folder.
 *
 * WHY THIS EXISTS
 * A normal Next static export references everything absolutely — /_next/...,
 * /images/..., /privacy/. That is correct on a web server, but when someone
 * unzips the folder and double-clicks index.html the browser resolves "/" to
 * the FILESYSTEM ROOT. Every stylesheet, script, font and image 404s and they
 * get an unstyled page.
 *
 * Two things are needed, and only doing one of them silently half-works:
 *
 *   1. assetPrefix: '.'   (next.config.mjs, behind PORTABLE=1)
 *      Makes the webpack runtime's publicPath relative. Rewriting the HTML
 *      alone does not reach this — the absolute "/_next/" also lives inside
 *      the JS bundle, where the runtime uses it to fetch chunks.
 *
 *   2. trailingSlash: false
 *      Flattens pages to the output root (privacy.html, not privacy/index.html).
 *      `assetPrefix: '.'` resolves relative to the *document*, so it is only
 *      correct if every page sits at the same depth.
 *
 * This script then rewrites the page-to-page links, which Next still emits
 * absolutely, and fails loudly if anything absolute survives.
 *
 * Output is `portable/`. Relative paths work on a web server too, so this
 * folder is strictly more shareable than the raw export.
 *
 * Run:  npm run build:portable
 */
import { spawnSync } from 'node:child_process';
import { cp, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { basename, join } from 'node:path';

const OUT = 'out';
const DEST = 'portable';

/**
 * Re-declaration of the .bg-responsive rule, injected into each page's <head>.
 *
 * WHY IT IS NEEDED — this is the one that does not announce itself.
 * The responsive backgrounds put their image in a --bg / --bg-sm custom
 * property on the element's inline style, and app/globals.css consumes it with
 * `background-image: var(--bg)`. A relative url() inside a custom property is
 * resolved by Chrome against the stylesheet that CONSUMES the var(), not the
 * element that declares it. The consumer is the emitted CSS chunk, which sits
 * at _next/static/chunks/, so `./images/hero.jpg` was fetched from
 * _next/static/chunks/images/hero.jpg and 404'd — silently, because a missing
 * background paints nothing and throws nothing.
 *
 * The hosting build never hits this: its paths are absolute, so there is no
 * base to resolve against. Going relative for the portable build is what
 * exposed it.
 *
 * Rewriting the paths to climb out of the chunk directory would depend on the
 * chunk nesting depth AND would be wrong in browsers that follow the spec and
 * resolve against the declaring stylesheet. Moving the CONSUMING rule into the
 * document instead makes the base the HTML file in every engine, which is the
 * base the rewritten paths are already written against.
 *
 * Keep in sync with the .bg-responsive block in app/globals.css.
 */
const BG_FIX =
  '<style id="portable-bg-fix">' +
  '.bg-responsive{background-image:var(--bg)}' +
  '@media (max-width:640px){.bg-responsive{background-image:var(--bg-sm,var(--bg))}}' +
  '</style>';

async function walk(dir) {
  const acc = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) acc.push(...(await walk(p)));
    else acc.push(p);
  }
  return acc;
}

async function main() {
  console.log('\n  building with PORTABLE=1 ...');
  const build = spawnSync('npx', ['next', 'build'], {
    stdio: ['ignore', 'ignore', 'inherit'],
    env: { ...process.env, PORTABLE: '1', NEXT_PUBLIC_PORTABLE: '1' },
    shell: true,
  });
  if (build.status !== 0) {
    console.error('\n  build failed\n');
    process.exit(1);
  }

  await rm(DEST, { recursive: true, force: true });
  await cp(OUT, DEST, { recursive: true });

  // The README must be copied in, not authored into portable/ by hand: this
  // script wipes the folder before every build, so anything left there is lost.
  await cp(join('scripts', 'portable-README.txt'), join(DEST, 'README.txt'));

  const files = await walk(DEST);
  const html = files.filter((f) => f.endsWith('.html'));
  const pages = new Set(
    html.map((f) => f.replace(/\\/g, '/').replace(`${DEST}/`, '').replace(/\.html$/, '')),
  );

  for (const file of html) {
    let s = await readFile(file, 'utf8');

    // Page links already come out relative — lib/links.ts emits ./slug.html
    // when NEXT_PUBLIC_PORTABLE=1, which is the only form that survives
    // hydration. This pass only catches asset paths Next still emits
    // absolutely (/images/..., and anything in a src attribute).
    s = s.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (_m, attr, p) => `${attr}="./${p}"`);

    // CSS url() inside inline style attributes (the responsive backgrounds,
    // which carry their image in a --bg / --bg-sm custom property).
    //
    // Match only the OPENING `url(<quote>/` and leave the closing alone. The
    // quote arrives HTML-escaped and the escape used is not predictable:
    // React serialises the style attribute with &#x27; for a single quote,
    // and earlier passes here that spelled out one specific form (&quot;, or a
    // bare ') silently matched nothing and shipped four dead photographs.
    // Anchoring on the opening covers every spelling at once.
    s = s.replace(/url\((&quot;|&#x27;|&#39;|'|")?\/(?!\/)/g, (_m, q) => `url(${q ?? ''}./`);


    // Must land AFTER the stylesheet link so it wins on cascade order — the
    // selector is identical, so the later rule is the one that applies.
    // </head> is the reliable anchor for that.
    if (s.includes('bg-responsive')) s = s.replace('</head>', `${BG_FIX}</head>`);

    await writeFile(file, s, 'utf8');
  }

  // Strip React Server Component payloads and route manifests. Internal links
  // are plain anchors (see lib/links.ts), so there is no client-side routing
  // and nothing ever fetches these: ~850KB of dead weight, and unfetchable
  // under file:// in any case.
  // basename() rather than splitting on a separator by hand: join() produces
  // BACKSLASH paths on Windows, so a hand-written split has to escape the
  // backslash inside the character class, and an escape lost in editing fails
  // silently — pop() returns the whole path, which still answers endsWith()
  // and startsWith() plausibly enough to delete the README and keep the
  // payloads. basename() is separator-correct on both platforms.
  for (const f of files) {
    const name = basename(f);
    const isPayload =
      (name.endsWith('.txt') && name !== 'README.txt') || name.startsWith('__next.');
    if (isPayload) await rm(f, { force: true });
  }

  // ONLY NOW are the per-page directories empty, which is why this runs after
  // the strip and not before it. An empty privacy/ folder sitting next to
  // privacy.html looks broken to whoever opens the zip.
  //
  // This prunes RECURSIVELY and bottom-up. A top-level-only pass cannot do it:
  // Next emits the payload inside a nested marker directory, so privacy/ holds
  // an empty privacy/__next.$d$slug/ and does not itself read as empty until
  // that child is gone. Deleting depth-first collapses the whole chain, and
  // also clears _next/<buildId>/ once the .txt payloads are stripped out of it.
  async function prune(dir) {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (e.isDirectory()) await prune(join(dir, e.name));
    }
    if (dir !== DEST && (await readdir(dir)).length === 0) {
      await rm(dir, { recursive: true, force: true });
    }
  }
  await prune(DEST);

  // Verify. A folder that silently half-works is worse than a failed build.
  let htmlAbs = 0;
  let bgFixMissing = 0;
  for (const f of html) {
    const s = await readFile(f, 'utf8');
    // Attributes AND url(), because they fail differently and only one of
    // them used to be checked. A dead url() does not throw, does not show in
    // the DOM and does not change the layout — the photograph simply is not
    // there — so a verifier that skips it reports a perfect build.
    htmlAbs += (s.match(/(href|src)="\/(?!\/)/g) || []).length;
    htmlAbs += (s.match(/url\((?:&quot;|&#x27;|&#39;|'|")?\/(?!\/)/g) || []).length;
    // A page that uses the responsive backgrounds but did not receive the
    // re-declaration would render with no photographs and no error. Count it.
    if (s.includes('bg-responsive') && !s.includes('portable-bg-fix')) bgFixMissing += 1;
  }
  // Look for an absolute path being CONSTRUCTED, i.e. "/_next/static/...".
  // A bare "/_next/" literal is not evidence of a problem: the runtime also
  // uses it with indexOf() to locate that segment inside an already-resolved
  // script URL, purely for error reporting. Flagging that produced a false
  // failure on a build that was actually correct.
  let jsAbs = 0;
  for (const f of files.filter((f) => f.endsWith('.js'))) {
    const s = await readFile(f, 'utf8');
    jsAbs += (s.match(/"\/_next\/static\//g) || []).length;
  }

  console.log(`\n  portable/  ${html.length} pages`);
  console.log(`  absolute paths in HTML     : ${htmlAbs}`);
  console.log(`  constructed "/_next/static/": ${jsAbs}`);
  console.log(`  pages missing the bg fix    : ${bgFixMissing}`);

  if (htmlAbs > 0 || jsAbs > 0 || bgFixMissing > 0) {
    console.error('\n  FAILED — absolute paths remain; double-click would break.\n');
    process.exit(1);
  }
  console.log('  all paths relative — opens by double-click, and works on a host\n');

  // The portable build writes to out/ as well. Leave out/ in the HOSTING shape
  // so a later deploy cannot accidentally ship the flattened variant.
  console.log('  restoring out/ to the hosting build ...');
  const restore = spawnSync('npx', ['next', 'build'], {
    stdio: ['ignore', 'ignore', 'inherit'],
    env: { ...process.env },
    shell: true,
  });
  if (restore.status !== 0) {
    console.error('  WARNING: out/ is still the portable variant. Run `npm run build`.');
    process.exit(1);
  }
  console.log('  done');
}

main();
