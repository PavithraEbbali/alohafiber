'use client';

import { assurances, marqueeItems, media, plans, site } from '@/lib/content';
import { ZipChecker } from '@/components/ui/ZipChecker';
import { Aurora } from '@/components/ui/Aurora';
import { Marquee, Reveal, RevealHeading } from '@/components/ui/primitives';

/** Entry price is derived from the data, never hardcoded. */
const entryPrice = plans
  .filter((p): p is typeof p & { price: number } => typeof p.price === 'number')
  .sort((a, b) => a.price - b.price)[0];

/** Stat strip riding the hero's lower edge. */
const STATS = [
  { value: '99.99%', label: 'Published uptime' },
  { value: '5–25 ms', label: 'Typical latency' },
  { value: 'Unlimited', label: 'Data, no caps' },
  { value: '20+ yrs', label: 'Serving Kaʻū' },
];

export function Hero() {
  // The section itself carries no background. It previously had bg-navy-800,
  // which filled the full viewport width behind the stat strip below and made
  // the strip look like it was bleeding edge to edge. The photo panel owns the
  // dark background; the strip floats over the boundary onto the white below.
  return (
    <section id="top" className="relative isolate">
      <div className="relative overflow-hidden bg-navy-800">
        {/* ---------- Photograph ----------
            The frame drifts very slowly, which reads as depth rather than as
            an effect. */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            aria-hidden="true"
            className="bg-responsive absolute inset-0 animate-kenburns bg-cover bg-center bg-no-repeat will-change-transform"
            style={{
              '--bg': `url('${media.hero.src}')`,
              '--bg-sm': `url('${media.hero.srcSm}')`,
              // The source frame is deliberately flat, low-contrast documentary
              // overcast. Graded here rather than baked in, so the original
              // asset stays untouched and the grade is tunable in one place.
              filter: 'saturate(1.35) contrast(1.14) brightness(1.04)',
            } as React.CSSProperties}
          />
        </div>

        {/* Warm horizon wash — lifts the grey sea and ties the frame to the
            brand accent instead of leaving it a flat slate. Screen-blended so
            it adds light rather than a tint layer. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            background:
              'radial-gradient(120% 70% at 78% 62%, rgba(236,108,39,.3) 0%, rgba(255,75,51,.13) 34%, rgba(0,102,204,.16) 62%, transparent 82%)',
          }}
        />

        {/* Neutral left vignette — NOT the blue wash that was removed. It is
            black, it is confined to the copy column, and it is fully clear by
            62% across, so the photograph's colour is untouched. The headline
            sits over pale overcast sky and needs this to hold contrast. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg,rgba(0,0,0,.76) 0%,rgba(0,0,0,.68) 26%,rgba(0,0,0,.5) 46%,rgba(0,0,0,.24) 64%,rgba(0,0,0,.06) 80%,rgba(0,0,0,0) 92%)',
          }}
        />

        {/* Vibrant drifting light. Screen-blended so it adds colour to the
            photograph instead of veiling it. */}
        <div className="absolute inset-0 mix-blend-screen opacity-75">
          <Aurora tone="dark" intensity={0.95} />
        </div>

        {/* Slow-breathing accent orb on the horizon. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[14%] top-[34%] h-[26rem] w-[26rem] animate-breathe rounded-full blur-3xl mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle, rgba(255,75,51,.42) 0%, rgba(236,108,39,.18) 42%, transparent 70%)',
          }}
        />

        {/* ---------- Content ---------- */}
        <div className="shell relative pb-32 pt-14 sm:pb-36 sm:pt-16 lg:pb-40 lg:pt-20">
          <div className="max-w-3xl">
            {/* A standing fact about the operator — NOT an offer. The carrier
                publishes no promotions, so this must never carry urgency
                framing. See the note above `assurances` in lib/content.ts. */}
            <Reveal>
              <div className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-2 rounded-full border border-sunset-400/40 bg-navy-800/55 py-2 pl-4 pr-5 shadow-glowC backdrop-blur-md">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-sunset-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sunset-400" />
                </span>
                <span className="text-[0.82rem] font-semibold tracking-wide text-white">
                  Locally owned and operated in {site.region} for over 20 years
                </span>
              </div>
            </Reveal>

            <RevealHeading
              as="h1"
              delay={100}
              accentFrom={4}
              accentClassName="text-sunset-400"
              text="Reliable high-speed internet for Kaʻū and Puna."
              className="mt-7 font-display text-[2.6rem] font-bold leading-[1.04] tracking-[-0.032em] text-white sm:text-[3.6rem] lg:text-[4.15rem]"
            />

            <Reveal delay={300}>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-white/90 sm:text-[1.08rem]">
                Aloha Broadband operates a locally owned tower network serving communities
                across {site.region}. Residential plans start at{' '}
                <strong className="font-semibold text-white">${entryPrice.price}/mo</strong>{' '}
                with unlimited data, no usage caps, no annual contract, and support from
                technicians based on the island.
              </p>
            </Reveal>

            {/* Availability check is the hero's single action. */}
            <Reveal delay={430}>
              <div className="mt-10 max-w-xl rounded-[1.5rem] border border-white/20 bg-navy-700/55 p-5 shadow-plan backdrop-blur-xl sm:p-6">
                <h2 className="font-display text-[1.05rem] font-bold tracking-tight text-white">
                  See what is available at your address
                </h2>

                <div className="mt-4">
                  <ZipChecker tone="dark" />
                </div>

                <p className="mt-3.5 text-[0.8rem] text-white/70">
                  Free to check · No obligation ·{' '}
                  <a
                    href={site.phoneHref}
                    className="font-semibold text-white underline-offset-4 transition-colors hover:text-sunset-400 hover:underline"
                  >
                    Or speak with our team at {site.phone}
                  </a>
                </p>

                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/12 pt-4">
                  {assurances.map((a) => (
                    <li
                      key={a.label}
                      className="flex items-center gap-1.5 text-[0.76rem] font-medium text-azure-200"
                    >
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-sunset-400" />
                      {a.label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------- Stat strip riding the hero edge ----------
          Overlaps the boundary so the hero does not end on a flat rule, which
          is what made the section read as a stock template block. */}
      <div className="shell relative z-10 -mt-20 pb-2 sm:-mt-24">
        <Reveal delay={200}>
          <div className="overflow-hidden rounded-[1.5rem] border border-white/12 bg-navy-700/80 shadow-plan backdrop-blur-xl">
            <dl className="grid grid-cols-2 divide-white/10 sm:grid-cols-4 sm:divide-x">
              {STATS.map((s) => (
                <div key={s.label} className="px-5 py-6 text-center sm:px-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-[1.6rem] font-bold leading-none tracking-tight text-white sm:text-[1.8rem]">
                      {s.value}
                    </span>
                    <span className="mt-2 block text-[0.75rem] lg:text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-azure-200">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="border-t border-white/10 bg-navy-800/60 py-3">
              <Marquee
                items={marqueeItems}
                duration={58}
                marker="check"
                itemClassName="text-[0.76rem] font-semibold tracking-[0.02em] text-azure-200"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
