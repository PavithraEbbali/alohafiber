/**
 * Grain — a fixed film-grain layer over the whole page.
 *
 * This is the single cheapest thing that separates a site that looks rendered
 * from one that looks designed. Flat digital gradients read as synthetic;
 * a faint noise floor over them reads as printed or photographed.
 *
 * Implemented as an inline SVG feTurbulence data URI, so it costs one small
 * base64 string and no network request. Fixed positioning means it does not
 * repaint on scroll.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="grain-layer pointer-events-none fixed inset-0 z-[60] opacity-[0.16] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE}")`, backgroundRepeat: 'repeat' }}
    />
  );
}

export default Grain;
