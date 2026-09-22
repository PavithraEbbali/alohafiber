'use client';

import { finePrint, finePrintDisclaimers, type FinePrintRow } from '@/lib/content';
import { Reveal, RevealHeading, Wipe } from '@/components/ui/primitives';
import { IncludedIcon, OneTimeIcon, OptionalIcon } from '@/components/ui/Icons';
import { Aurora } from '@/components/ui/Aurora';
import { Spotlight } from '@/components/ui/Spotlight';
import type { ComponentType, SVGProps } from 'react';

const GROUPS: { kind: FinePrintRow['kind']; title: string; note: string }[] = [
  { kind: 'included', title: 'Included at no charge', note: 'Standard on every residential plan.' },
  { kind: 'onetime', title: 'One-time charges', note: 'Billed once, only when they apply.' },
  { kind: 'optional', title: 'Optional add-ons', note: 'Added only on request.' },
];

const GROUP_ICON: Record<FinePrintRow['kind'], ComponentType<SVGProps<SVGSVGElement>>> = {
  included: IncludedIcon,
  onetime: OneTimeIcon,
  optional: OptionalIcon,
};

const ICON_TONE: Record<FinePrintRow['kind'], string> = {
  included: 'bg-azure-50 text-azure-500 ring-azure-150',
  onetime: 'bg-sunset-400/10 text-sunset-500 ring-sunset-400/25',
  optional: 'bg-azure-50 text-navy-400 ring-azure-150',
};

const ACCENT: Record<FinePrintRow['kind'], string> = {
  included: 'text-azure-500',
  onetime: 'text-sunset-500',
  optional: 'text-navy-400',
};

export function FinePrintGrid() {
  return (
    <section
      id="included"
      className="relative overflow-hidden bg-azure-50 py-20 sm:py-24 lg:py-28"
    >
      <Aurora tone="light" intensity={1.1} />

      <Wipe>
        <div className="shell relative">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow text-azure-500">
                <span className="h-px w-8 bg-sunset-400" />
                Fees and inclusions
              </span>
            </Reveal>

            <RevealHeading
              as="h2"
              delay={80}
              text="Pricing, fees and inclusions"
              className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-navy-700 sm:text-[2.6rem]"
            />

            <Reveal delay={200}>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-navy-700/68">
                A complete breakdown of what is included with every residential plan, which
                charges apply once, and which add-ons remain optional.
              </p>
            </Reveal>
          </div>

          <Spotlight className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-3 lg:gap-6">
            {GROUPS.map((group, gi) => {
              const rows = finePrint.filter((r) => r.kind === group.kind);
              if (!rows.length) return null;

              return (
                <Reveal key={group.kind} delay={gi * 120} className="h-full">
                  <div
                    data-spotlight
                    className="relative flex h-full flex-col rounded-[1.5rem] bg-white p-7 shadow-lift ring-1 ring-azure-150 transition-shadow duration-500 ease-silk hover:shadow-plan"
                  >
                    <span
                      className="spotlight-layer"
                      style={{ '--spot-color': 'rgba(0,102,204,.09)' } as React.CSSProperties}
                    />
                    <header className="relative border-b border-azure-150 pb-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 ring-inset ${ICON_TONE[group.kind]}`}
                        >
                          {(() => {
                            const Glyph = GROUP_ICON[group.kind];
                            return <Glyph className="h-5 w-5" aria-hidden="true" />;
                          })()}
                        </span>
                        <h3 className="font-display text-lg font-bold tracking-tight text-navy-700">
                          {group.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-[0.8rem] text-navy-700/55">{group.note}</p>
                    </header>

                    <dl className="relative mt-5 flex-1 space-y-5">
                      {rows.map((row) => (
                        <div key={row.label}>
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="text-[0.92rem] font-medium text-navy-700">
                              {row.label}
                            </dt>
                            <dd
                              className={`shrink-0 font-display text-[1.05rem] font-bold tabular-nums ${ACCENT[group.kind]}`}
                            >
                              {row.value}
                            </dd>
                          </div>
                          {row.note ? (
                            <p className="mt-1 max-w-[34ch] text-[0.78rem] leading-snug text-navy-700/52">
                              {row.note}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              );
            })}
          </Spotlight>

          <Reveal delay={200}>
            <ul className="mt-10 space-y-2 border-t border-azure-200 pt-7">
              {finePrintDisclaimers.map((line) => (
                <li
                  key={line}
                  className="flex gap-2.5 text-[0.8rem] leading-relaxed text-navy-700/55"
                >
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slatey-400" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Wipe>
    </section>
  );
}

export default FinePrintGrid;
