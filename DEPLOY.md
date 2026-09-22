# Deploying the static site

The whole site builds to plain HTML in `out/`. No Node process is needed to
serve it — any static host works: cPanel, S3 + CloudFront, Netlify, Vercel,
GitHub Pages, or a plain nginx/Apache document root.

## Build

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run build
```

Then upload the **contents of `out/`** to your web root.

`NEXT_PUBLIC_SITE_URL` is baked into every exported HTML file as the Open
Graph / canonical base. It cannot be changed after the export without
rebuilding, so set it before you build. Omitting it leaves the
`https://example.com` placeholder in the markup.

## Preview the export locally

```bash
npm start
```

Serves `out/` on <http://localhost:3000>. (`next start` does **not** work here
— it expects a server build, not a static export.)

## What gets produced

| Path | |
|---|---|
| `index.html` | Landing page |
| `privacy/`, `disclaimer/`, `cookies/`, `tcpa/`, `trademarks/`, `marketing-policy/`, `service-fulfillment/`, `pci-dss/` | The eight legal pages, each as `index.html` |
| `404.html` | Not-found page |
| `_next/` | Hashed CSS and JS — content-hashed, safe to cache forever |
| `images/` | Photography |

About 3.1 MB total (1.0 MB scripts/styles, 588 KB images).

Pages are emitted as `privacy/index.html` rather than `privacy.html`, so
extensionless URLs work on hosts that don't rewrite them.

## Host configuration

- **Serve `404.html` as the not-found page.** Most hosts do this by default.
- **Cache `_next/*` aggressively** (`Cache-Control: public, max-age=31536000,
  immutable`) — the filenames are content-hashed. Serve `*.html` with a short
  TTL or `no-cache` so updates appear immediately.
- **No redirects, rewrites or server config are required** beyond that.

## Before going live

1. **Replace the phone number.** `lib/content.ts` → `site.phone` is
   `(808) 555-0142`, a NANPA-reserved fictional number. It is referenced in one
   place and drives the header, hero, every plan CTA and the footer.
2. **Have counsel review `lib/legal.ts`.** The eight policies are complete
   drafts, not legal advice. Fill in the entity name, postal address and
   privacy contact.
3. **Set `NEXT_PUBLIC_SITE_URL`** as above.

## Rebuilding after a content change

All pricing, plans, fees, coverage, FAQs and copy live in `lib/content.ts`.
Edit that one file, re-run the build, re-upload `out/`.

> If a server feature is ever added — an API route, a server action, ISR,
> middleware, or `next/image` optimisation — remove `output: 'export'` from
> `next.config.mjs`. The build will fail loudly rather than silently drop the
> feature.

## Deploying on Vercel

The repo is ready to import as-is — Vercel auto-detects Next.js and handles the
static export without extra configuration.

1. **New Project → Import** `PavithraEbbali/alohafiber`.
2. Leave Framework Preset, Build Command and Output Directory on their detected
   defaults. `output: 'export'` is in `next.config.mjs`; Vercel picks up the
   `out` directory automatically.
3. Add one **Environment Variable**, for every environment:

   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-production-domain.com` |

   Without it the Open Graph tags keep the `https://example.com` placeholder.
   It is read at **build time**, so changing it later requires a redeploy.
4. Deploy. Every push to `main` redeploys automatically.

Node is pinned to `>=20.9.0` in `package.json` (Next 16's minimum). If the
Vercel project is set to an older Node version, raise it in
**Settings → General → Node.js Version**.


## Sending the site to someone as a zip

`npm run build` produces a folder for a **web server**: every path is absolute
(`/_next/…`, `/images/…`, `/privacy/`). Double-clicking `out/index.html` gives
an unstyled page, because under `file://` a leading `/` means the filesystem
root.

For a copy someone can unzip and simply open:

```bash
npm run build:portable
```

This writes `portable/` — the same site with every path relative, pages
flattened to one level, the React Server Component payloads stripped, and a
`README.txt` for the recipient. It fails the build rather than shipping a
folder that half-works. Zip the `portable/` folder and send it; it needs no
server, no install and no internet connection, and it also works unchanged if
uploaded to a web host.

`portable/` and the zip are gitignored — they are generated from committed
source.

Two notes if you change the site afterwards:

- `scripts/build-portable.mjs` injects a copy of the `.bg-responsive` rule into
  each page's `<head>`. Relative `url()` inside a custom property resolves
  against the stylesheet that *consumes* it, so without this the background
  photographs are fetched from `_next/static/chunks/images/…` and silently do
  not appear. If you edit that rule in `app/globals.css`, update the copy in the
  script too — the build fails if a page using the class is missing it.
- The portable build also writes `out/`, so the script rebuilds `out/` in the
  hosting shape afterwards. Deploy from `out/` only after a plain `npm run build`.
### What is not in the repo

`design/source-images/` — the original generator PNGs, about 28 MB — is
gitignored. Only the optimised JPEGs the site actually serves (736 KB) are
committed. Keeping the PNGs out avoids writing 28 MB into git history
permanently and re-cloning it on every build. They are still on the local
machine; commit them deliberately if you want them backed up.
