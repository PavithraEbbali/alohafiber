import type { FeatureIcon, PlanIcon } from '@/lib/content';
import type { SVGProps } from 'react';

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

export const Phone = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M6.6 3.5h2.2l1.4 3.5-1.8 1.3a11.5 11.5 0 0 0 5.3 5.3l1.3-1.8 3.5 1.4v2.2a2.1 2.1 0 0 1-2.3 2.1A15.6 15.6 0 0 1 4.5 5.8 2.1 2.1 0 0 1 6.6 3.5Z" />
  </svg>
);

export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="m4.5 12.5 4.6 4.5L19.5 7" />
  </svg>
);

export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M4.5 12h15m0 0-5.5-5.5M19.5 12 14 17.5" />
  </svg>
);

export const MapPin = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

const Shield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 5.8v5.4c0 4.3 2.9 8.2 7 9.3 4.1-1.1 7-5 7-9.3V5.8Z" />
    <path d="m9 12 2.2 2.2L15.4 10" />
  </svg>
);

const Gauge = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M4 17a8.5 8.5 0 1 1 16 0" />
    <path d="m12 14 4-4.2" />
    <circle cx="12" cy="15" r="1.4" />
  </svg>
);

const Infinity8 = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M7 15.5a3.5 3.5 0 1 1 3-5.3l4 3.6a3.5 3.5 0 1 0 3-5.3 3.5 3.5 0 0 0-3 1.7l-4 3.6a3.5 3.5 0 0 1-3 1.7Z" />
  </svg>
);

const Tower = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12 8.5 8 21m4-12.5L16 21M9.2 14.5h5.6" />
    <path d="M7.7 7.2a6 6 0 0 1 0-4.2M16.3 3a6 6 0 0 1 0 4.2" />
    <circle cx="12" cy="5.1" r="1.6" />
  </svg>
);

const Wrench = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M15.4 3.6a5 5 0 0 0-6.2 6.2L3.9 15a2 2 0 1 0 2.8 2.8l5.2-5.2a5 5 0 0 0 6.2-6.2l-2.7 2.7-2.6-.6-.6-2.6Z" />
  </svg>
);

const Heart = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12 20s-7.4-4.6-7.4-9.6a4.1 4.1 0 0 1 7.4-2.5 4.1 4.1 0 0 1 7.4 2.5c0 5-7.4 9.6-7.4 9.6Z" />
  </svg>
);

const FEATURE_ICONS: Record<FeatureIcon, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  shield: Shield,
  gauge: Gauge,
  infinity: Infinity8,
  tower: Tower,
  wrench: Wrench,
  heart: Heart,
};

export function FeatureGlyph({ name, ...rest }: { name: FeatureIcon } & SVGProps<SVGSVGElement>) {
  const Glyph = FEATURE_ICONS[name];
  return <Glyph aria-hidden="true" {...rest} />;
}

/* ---------------------------------------------------------------------------
 *  Plan tier glyphs — filled bars indicate the tier, empty bars the headroom
 *  above it, so the three cards read as a ladder at a glance.
 * ------------------------------------------------------------------------ */
const TIER_BARS: Record<PlanIcon, number> = {
  'signal-1': 1,
  'signal-2': 2,
  'signal-3': 3,
};

export function PlanGlyph({
  name,
  className = '',
}: {
  name: PlanIcon;
  className?: string;
}) {
  const filled = TIER_BARS[name];
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      {[0, 1, 2].map((i) => {
        const h = 6 + i * 5.5;
        return (
          <rect
            key={i}
            x={3 + i * 7}
            y={20 - h}
            width="4.5"
            height={h}
            rx="1.4"
            fill="currentColor"
            opacity={i < filled ? 1 : 0.24}
          />
        );
      })}
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 *  Fine-print category glyphs.
 * ------------------------------------------------------------------------ */
export const IncludedIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.4 12.2 2.4 2.4 4.8-5" strokeWidth={1.9} />
  </svg>
);

export const OneTimeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M5.5 4.5h13v15l-2.2-1.5-2.1 1.5-2.2-1.5-2.2 1.5-2.1-1.5-2.2 1.5Z" />
    <path d="M9 9h6M9 12.5h4" />
  </svg>
);

export const OptionalIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" strokeDasharray="3 3" />
    <path d="M12 8.6v6.8M8.6 12h6.8" strokeWidth={1.9} />
  </svg>
);
