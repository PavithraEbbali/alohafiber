# Image assets

**Status: all five assets are in place.** They are wired up in `lib/content.ts`
under the `media` export.

Originals as delivered (PNG, 1408x768, 28.7 MB total) are kept outside the
served folder in `design/source-images/`. The files here are the optimised
derivatives actually shipped: watermark cropped off, converted to progressive
mozjpeg at q82, **572 KB total**.

To replace an image later, drop the new source into `design/source-images/`
and re-run the conversion documented at the bottom of this file. Until a file
exists, its slot degrades gracefully to the gradient/navy treatment rather
than showing a broken image.

| # | Filename | Size (px) | Where it appears |
|---|----------|-----------|------------------|
| 1 | `hero-kau-coastline.jpg` | 1250 × 768 · 70 KB | Hero background, full bleed |
| 2 | `tower-ridge-dusk.jpg` | 1250 × 768 · 79 KB | "Why customers choose Aloha Broadband" parallax backdrop |
| 3 | `antenna-install.jpg` | 1250 × 768 · 135 KB | "Professional installation" banner in the Coverage block |
| 4 | `home-connected.jpg` | 1250 × 768 · 178 KB | FAQ sidebar (4:3 panel) |
| 5 | `og-share.jpg` | 1200 × 630 · 110 KB | Social share preview (Open Graph / Twitter) |

## Rules that matter

- **Format:** JPEG, sRGB, quality ~80. Keep each file under ~400 KB
  (hero under ~550 KB). These are CSS backgrounds and are not run through
  Next.js image optimisation, so the exported size is the shipped size.
- **1, 2, 3 and 5 sit under a dark navy scrim.** Shoot/generate them
  darker and lower-contrast than feels right — detail in the highlights
  survives, detail in the shadows does not.
- **Composition for 1 and 3:** keep the **left third visually quiet**. Headline
  and body copy sit there. Put the subject right of centre.
- **No text, logos, watermarks or brand marks** anywhere in the frame.
- **No identifiable faces** unless you hold a model release. Backs of heads,
  hands, mid-distance figures and over-the-shoulder framing are all fine.
- **No fake hardware branding.** Antennas and routers must be generic.

## Realism

The brief for every prompt is documentary photography, not a product render.
Ask for a named camera and lens, natural available light, and real-world
imperfection — dust, worn paint, uneven vegetation, overcast haze. Avoid
"cinematic", "8k", "hyperrealistic", "award winning" and heavy colour grading;
those are what make an image read as AI-generated.

Full prompts are in the handover notes for this build.

## Re-running the optimisation

The generator stamps a watermark into the bottom-right corner, which is why the
crop width is 1250 rather than the full 1408. From the project root:

```bash
node -e "
const sharp=require('./node_modules/sharp');
const f='hero-kau-coastline';
sharp('design/source-images/'+f+'.png')
  .extract({left:0,top:0,width:1250,height:768})
  .jpeg({quality:82,progressive:true,mozjpeg:true,chromaSubsampling:'4:4:4'})
  .toFile('public/images/'+f+'.jpg');
"
```

`og-share.jpg` additionally needs an exact 1200x630 Open Graph ratio: extract
`{left:0, top:56, width:1250, height:656}` then `.resize(1200,630)`.

sharp ships with Next.js, so no extra dependency is required.
