import type { Config } from 'tailwindcss';

/**
 * Aloha Broadband brand palette — OFFICIAL VALUES ONLY.
 *
 * Every hex below was scraped directly from the live carrier stylesheet at
 * https://alohabroadband.com/wp-content/themes/Aloha/style.css
 * and cross-checked against the rendered homepage.
 *
 * There are no derived, interpolated or invented shades. Do not add one — if a
 * new tone is needed, use an opacity modifier on an official colour
 * (e.g. text-navy-700/60) so the underlying hue stays exact.
 */
/**
 * Every integer 0-100 as a valid opacity modifier.
 *
 * Tailwind's default opacity scale is sparse (0,5,10,20,25,30,40,50,60,70,75,
 * 80,90,95,100). Anything off that scale — `border-white/12`, `text-white/45`,
 * `text-navy-700/68` — silently emits NO CSS. It does not warn and it does not
 * fail the build; the element simply renders without the border or tint, which
 * is how a set of hairline rules and muted body colours ended up missing
 * across the site without anything looking broken enough to notice.
 *
 * JIT still only emits the values actually used, so this costs nothing.
 */
const OPACITY = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]),
);

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      opacity: OPACITY,
      colors: {
        navy: {
          800: '#091c30', // deep charcoal-navy (masthead, footer)
          700: '#012145', // primary brand navy
          500: '#123e7a', // mid blue
          400: '#5187c2', // medium blue
        },
        azure: {
          500: '#0066cc', // link / action blue
          200: '#bfd9f0',
          150: '#c2d8eb',
          100: '#dceefd', // the pale blue band on the carrier homepage
          75: '#d9e8f7',
          50: '#f2f7fc',
        },
        // Warm accents, exactly as the carrier uses them.
        sunset: {
          500: '#ec6c27', // brand orange (headings on the carrier site)
          400: '#ff4b33', // brand coral, most-used accent (primary CTA)
        },
        slatey: {
          500: '#8797a7',
          400: '#8fa5b7',
        },
        neutral2: {
          100: '#f9f9f9',
          200: '#f1f1f1',
          300: '#e7e7e7',
          400: '#cfcfcf',
        },
        ink: '#313131', // body copy
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'price-lg': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
        'price-md': ['3rem',   { lineHeight: '1', letterSpacing: '-0.03em'  }],
        'price-sm': ['2.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
      maxWidth: { shell: '1200px' },
      boxShadow: {
        lift:  '0 1px 2px rgba(1,33,69,.06), 0 12px 28px -12px rgba(1,33,69,.22)',
        plan:  '0 2px 6px rgba(1,33,69,.05), 0 28px 60px -28px rgba(1,33,69,.38)',
        glowC: '0 10px 40px -12px rgba(255,75,51,.55)',
        glowB: '0 10px 40px -12px rgba(0,102,204,.5)',
      },
      // Gradients interpolate between official colours only.
      backgroundImage: {
        tide: 'linear-gradient(135deg,#012145 0%,#091c30 100%)',
        lagoon: 'linear-gradient(135deg,#0066cc 0%,#123e7a 100%)',
        ember: 'linear-gradient(135deg,#ff4b33 0%,#ec6c27 100%)',
      },
      keyframes: {
        marquee:   { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
        pulseDot:  { '0%,100%': { opacity: '.35', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.35)' } },
        floaty:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer:   { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },

        /* Slow documentary drift across the hero photograph. */
        kenburns: {
          '0%':   { transform: 'scale(1.06) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.16) translate3d(-1.6%,-1.2%,0)' },
        },
        /* Vibrant brand-colour light drifting behind a section. */
        auroraA: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%':     { transform: 'translate3d(6%,-4%,0) scale(1.14)' },
          '66%':     { transform: 'translate3d(-4%,5%,0) scale(0.94)' },
        },
        auroraB: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1.05)' },
          '40%':     { transform: 'translate3d(-7%,4%,0) scale(0.92)' },
          '75%':     { transform: 'translate3d(5%,-6%,0) scale(1.18)' },
        },
        /* Accent sweep across a gradient-clipped headline word. */
        sheen: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },

        /* Mesh field: drifts AND shifts hue, so the light feels alive rather
           than like a static blur that happens to move.

           The blur MUST be declared inside these keyframes. `filter` is a
           single property: an animating `filter: hue-rotate(...)` replaces the
           element's declared `filter: blur(...)` outright, so the blur-3xl
           utility on the element was being silently discarded for the entire
           life of the animation. The radius comes from --aurora-blur so the
           mobile media query can dial it down. */
        meshA: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)',        filter: 'blur(var(--aurora-blur,64px)) hue-rotate(0deg)' },
          '33%':     { transform: 'translate3d(8%,-6%,0) scale(1.22)',  filter: 'blur(var(--aurora-blur,64px)) hue-rotate(18deg)' },
          '66%':     { transform: 'translate3d(-6%,7%,0) scale(0.9)',   filter: 'blur(var(--aurora-blur,64px)) hue-rotate(-12deg)' },
        },
        meshB: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1.08)',     filter: 'blur(var(--aurora-blur,64px)) hue-rotate(0deg)' },
          '40%':     { transform: 'translate3d(-9%,6%,0) scale(0.88)',  filter: 'blur(var(--aurora-blur,64px)) hue-rotate(-20deg)' },
          '75%':     { transform: 'translate3d(7%,-8%,0) scale(1.26)',  filter: 'blur(var(--aurora-blur,64px)) hue-rotate(14deg)' },
        },
        /* Light travelling around a card border. */
        beam: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        /* Slow swell on a glow orb. */
        breathe: {
          '0%,100%': { opacity: '.45', transform: 'scale(1)' },
          '50%':     { opacity: '.8',  transform: 'scale(1.12)' },
        },
        scrollCue: {
          '0%,100%': { transform: 'translateY(0)',   opacity: '.5' },
          '50%':     { transform: 'translateY(6px)', opacity: '1' },
        },
      },
      animation: {
        marquee:  'marquee var(--marquee-duration,42s) linear infinite',
        pulseDot: 'pulseDot 2.8s ease-in-out infinite',
        floaty:   'floaty 7s ease-in-out infinite',
        shimmer:  'shimmer 6s linear infinite',
        kenburns: 'kenburns 34s ease-in-out infinite alternate',
        auroraA:  'auroraA 26s ease-in-out infinite',
        auroraB:  'auroraB 32s ease-in-out infinite',
        sheen:    'sheen 7s ease-in-out infinite',
        meshA:    'meshA 24s ease-in-out infinite',
        meshB:    'meshB 30s ease-in-out infinite',
        beam:     'beam 6s linear infinite',
        breathe:  'breathe 9s ease-in-out infinite',
        scrollCue:'scrollCue 2.2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(.22,1,.36,1)',
        swoop: 'cubic-bezier(.65,0,.35,1)',
      },
    },
  },
  plugins: [],
};

export default config;
