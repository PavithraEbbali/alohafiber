/**
 * Aurora — an animated mesh-gradient field behind a section.
 *
 * Four overlapping colour fields on long, offset loops that drift AND shift
 * hue, so the light reads as alive rather than as a blurred shape sliding
 * around. Colours are the official Aloha palette; the hue rotation stays
 * inside ±20deg so it never wanders off-brand.
 *
 * Transform/filter only, composited on the GPU, no layout work. Fully
 * suppressed under prefers-reduced-motion by globals.css.
 */
export function Aurora({
  tone = 'dark',
  className = '',
  intensity = 1,
}: {
  /** `dark` for navy sections, `light` for white/azure sections. */
  tone?: 'dark' | 'light';
  className?: string;
  /** Multiplier on the alpha of every field. */
  intensity?: number;
}) {
  const k = tone === 'dark' ? 1 : 0.42;
  const f = (alpha: number) => alpha * intensity * k;

  const fields = [
    {
      // Azure — the anchor field, upper left.
      color: `rgba(0,102,204,${f(0.55)})`,
      cls: 'animate-meshA -left-[22%] -top-[30%] h-[58rem] w-[58rem]',
      style: {},
    },
    {
      // Coral — warm counterweight, lower right.
      color: `rgba(255,75,51,${f(0.4)})`,
      cls: 'animate-meshB -bottom-[34%] -right-[18%] h-[50rem] w-[50rem]',
      style: {},
    },
    {
      // Sunset orange — mid-right, slowest, longest offset.
      color: `rgba(236,108,39,${f(0.3)})`,
      cls: 'animate-meshA right-[6%] top-[22%] h-[38rem] w-[38rem]',
      style: { animationDelay: '-9s', animationDuration: '34s' },
    },
    {
      // Mid blue — fills the centre so the field never looks like three blobs.
      color: `rgba(81,135,194,${f(0.38)})`,
      cls: 'animate-meshB left-[30%] top-[6%] h-[42rem] w-[42rem]',
      style: { animationDelay: '-15s', animationDuration: '40s' },
    },
  ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {fields.map((fld, i) => (
        <div
          key={i}
          className={`aurora-field absolute rounded-full blur-3xl will-change-transform ${fld.cls}`}
          style={{
            background: `radial-gradient(circle, ${fld.color} 0%, transparent 68%)`,
            ...fld.style,
          }}
        />
      ))}
    </div>
  );
}

export default Aurora;
