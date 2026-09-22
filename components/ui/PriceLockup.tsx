import type { PlanItem } from '@/lib/content';

type Size = 'sm' | 'md' | 'lg';
type Tone = 'dark' | 'light';

const INTEGER_SIZE: Record<Size, string> = {
  sm: 'text-price-sm', // 2.5rem
  md: 'text-price-md', // 3rem
  lg: 'text-price-lg', // 3.5rem
};

/**
 * Universal price lockup.
 *
 * The single place in the codebase that decides how money is rendered:
 * superscript dollar sign, oversized integer (2.5rem - 3.5rem), muted cents,
 * muted cadence. Plans with no published price fall back to a quote line
 * instead of showing a fabricated number.
 */
export function PriceLockup({
  plan,
  size = 'md',
  tone = 'dark',
  cadence = '/mo',
}: {
  plan: PlanItem;
  size?: Size;
  tone?: Tone;
  cadence?: string;
}) {
  const muted = tone === 'dark' ? 'text-slatey-400' : 'text-navy-700/55';
  const solid = tone === 'dark' ? 'text-white' : 'text-navy-700';

  if (typeof plan.price !== 'number') {
    return (
      <div className="flex flex-col gap-1">
        <span className={`font-display text-2xl font-semibold leading-tight ${solid}`}>
          Custom pricing
        </span>
        <span className={`text-sm ${muted}`}>Based on what your area supports</span>
      </div>
    );
  }

  const cents = plan.cents ?? '00';

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-1">
        <span
          className={`mt-[0.45em] font-display text-xl font-semibold leading-none ${muted}`}
          aria-hidden="true"
        >
          $
        </span>

        <span
          className={`font-display font-bold tabular-nums ${INTEGER_SIZE[size]} ${solid}`}
        >
          {plan.price}
        </span>

        <span
          className={`mt-[0.55em] font-display text-lg font-semibold leading-none ${muted}`}
          aria-hidden="true"
        >
          .{cents}
        </span>

        <span className={`mt-[0.95em] ml-1 text-sm font-medium ${muted}`} aria-hidden="true">
          {cadence}
        </span>
      </div>

      {/* One clean string for assistive tech, since the visual lockup is split. */}
      <span className="sr-only">
        {`$${plan.price}.${cents} per month`}
      </span>

      {plan.promoQualifier ? (
        <span className="text-xs font-medium text-sunset-400">{plan.promoQualifier}</span>
      ) : null}
    </div>
  );
}

export default PriceLockup;
