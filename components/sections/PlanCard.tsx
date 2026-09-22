'use client';

import { ctaLabelFor, site, type PlanItem } from '@/lib/content';
import { PriceLockup } from '@/components/ui/PriceLockup';
import { TiltCard } from '@/components/ui/TiltCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Check, Phone, PlanGlyph } from '@/components/ui/Icons';

export function PlanCard({ plan }: { plan: PlanItem }) {
  const featured = Boolean(plan.isPopular);

  return (
    <TiltCard className="h-full">
      {/* The rotating border ring lives on a WRAPPER, not on the article.
          `overflow-hidden` on the article is needed to clip the ambient wash,
          and it would clip the ::before ring along with it. */}
      <div className={`h-full rounded-[1.75rem] ${featured ? 'beam-border' : ''}`}>
        <article
          data-spotlight
          className={`relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-shadow duration-500 ease-silk sm:p-8 ${
            featured
              ? 'bg-tide text-white shadow-plan'
              : 'bg-white text-navy-700 shadow-lift ring-1 ring-azure-150 hover:shadow-plan'
          }`}
        >
        {/* Ambient wash */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-2xl ${
            featured ? 'bg-sunset-400/22' : 'bg-azure-100/70'
          }`}
        />

        <span
          className="spotlight-layer"
          style={{ '--spot-color': featured ? 'rgba(255,75,51,.18)' : 'rgba(0,102,204,.1)' } as React.CSSProperties}
        />

        {featured ? (
          <span className="tilt-layer absolute right-6 top-7 rounded-full bg-ember px-3 py-1 text-[0.75rem] lg:text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white shadow-glowC">
            Most chosen
          </span>
        ) : null}

        <div className="relative flex h-full flex-col">
          {/* Header */}
          <header className="tilt-layer">
            <div className="flex items-center gap-3">
              {plan.icon ? (
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                    featured
                      ? 'bg-sunset-400/15 text-sunset-400 ring-1 ring-inset ring-sunset-400/25'
                      : 'bg-azure-50 text-azure-500 ring-1 ring-inset ring-azure-150'
                  }`}
                >
                  <PlanGlyph name={plan.icon} className="h-5 w-5" />
                </span>
              ) : null}
              <h3
                className={`font-display text-2xl font-bold tracking-tight ${
                  featured ? 'text-white' : 'text-navy-700'
                }`}
              >
                {plan.name}
              </h3>
            </div>
            {plan.tagline ? (
              <p
                className={`mt-3 max-w-[26ch] text-sm leading-snug ${
                  featured ? 'text-slatey-400' : 'text-navy-700/62'
                }`}
              >
                {plan.tagline}
              </p>
            ) : null}
          </header>

          {/* Capability / speed strip */}
          <div
            className={`tilt-layer mt-6 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 ${
              featured ? 'bg-white/[0.07]' : 'bg-azure-50'
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-sunset-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sunset-400" />
            </span>
            <span
              className={`text-[0.82rem] font-semibold ${
                featured ? 'text-azure-100' : 'text-navy-500'
              }`}
            >
              {typeof plan.speedDown === 'number'
                ? `${plan.speedDown} Mbps down${
                    typeof plan.speedUp === 'number' ? ` / ${plan.speedUp} up` : ''
                  }`
                : plan.capability}
            </span>
          </div>

          {/* Price */}
          <div className="tilt-layer mt-7">
            <PriceLockup
              plan={plan}
              size={featured ? 'lg' : 'md'}
              tone={featured ? 'dark' : 'light'}
            />
          </div>

          {/* Terms */}
          <dl
            className={`mt-6 space-y-2 border-y py-4 text-[0.8rem] ${
              featured ? 'border-white/12' : 'border-azure-150'
            }`}
          >
            {[
              ['Data', plan.dataPolicy],
              ['Term', plan.contractTerm],
              ['Equipment', plan.equipmentFee],
            ].map(([label, value]) =>
              value ? (
                <div key={label} className="flex items-baseline justify-between gap-4">
                  <dt className={featured ? 'text-slatey-400' : 'text-navy-700/50'}>{label}</dt>
                  <dd
                    className={`text-right font-medium ${
                      featured ? 'text-azure-100' : 'text-navy-700/85'
                    }`}
                  >
                    {value}
                  </dd>
                </div>
              ) : null,
            )}
          </dl>

          {/* Features */}
          <ul className="mt-6 flex-1 space-y-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 grid h-[1.125rem] w-[1.125rem] shrink-0 place-items-center rounded-full ${
                    featured ? 'bg-sunset-400/18 text-sunset-400' : 'bg-azure-100 text-azure-500'
                  }`}
                >
                  <Check className="h-2.5 w-2.5" aria-hidden="true" />
                </span>
                <span
                  className={`text-[0.87rem] leading-snug ${
                    featured ? 'text-slatey-400' : 'text-navy-700/78'
                  }`}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA — label is derived, never hardcoded */}
          <div className="tilt-layer mt-8 -ml-1.5">
            <MagneticButton
              href={site.phoneHref}
              variant={featured ? 'ember' : 'outline'}
              className="w-full"
              ariaLabel={`${ctaLabelFor(plan)} — ${plan.name} plan`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {ctaLabelFor(plan)}
            </MagneticButton>
          </div>
          </div>
        </article>
      </div>
    </TiltCard>
  );
}

export default PlanCard;
