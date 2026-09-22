'use client';

import { features, media, site } from '@/lib/content';
import { FeatureGlyph, Phone } from '@/components/ui/Icons';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Aurora } from '@/components/ui/Aurora';
import { Reveal, RevealHeading, Wipe } from '@/components/ui/primitives';

/**
 * Why Aloha.
 *
 * Six statistics given equal weight is a dashboard, not a brand moment — the
 * flaw every previous version shared, whether the cells were cards, a bento or
 * a ruled table. Changing the container never fixed it, because the problem was
 * that nothing was ranked. Uniform cells also strand dead space, since a short
 * figure cannot fill a column sized for the longest one.
 *
 * The figures are ranked instead. The three that actually sell the service run
 * large and open across the full width, separated by rules rather than boxed.
 * The remaining three drop to one compact line each. The heading splits across
 * two columns so the top of the section is not a left-weighted block with empty
 * space beside it.
 *
 * The figures are NOT animated. A count-up renders "0.00%" for its opening
 * frames, and on a page whose argument is uptime a statistic that can
 * momentarily read zero is worse than no animation — it shipped that way twice.
 */

const PRIMARY = features.slice(0, 3);
const SECONDARY = features.slice(3);

export function WhyAloha() {
  return (
    <section id="why-aloha" className="relative isolate overflow-hidden bg-tide text-white">
      <Aurora tone="dark" intensity={0.95} />

      <Wipe>
        <div className="shell relative py-20 sm:py-24 lg:py-28">
          {/* ---------------- Heading, split across the width ---------------- */}
          <Reveal>
            <span className="eyebrow text-sunset-400">
              <span className="h-px w-8 bg-sunset-400" />
              The network
            </span>
          </Reveal>

          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <RevealHeading
              as="h2"
              delay={80}
              accentFrom={3}
              text="Why customers choose Aloha Broadband"
              className="font-display text-[2.1rem] font-bold leading-[1.06] tracking-[-0.028em] text-white sm:text-[2.8rem]"
            />

            <Reveal delay={200}>
              <p className="max-w-md text-[1rem] leading-relaxed text-azure-200 lg:pb-2">
                Two decades of investment in a locally owned tower network, engineered for
                the terrain of Hawaiʻi Island.
              </p>
            </Reveal>
          </div>

          {/* ---------------- The three figures that sell it ---------------- */}
          <div className="mt-14 grid border-t border-white/12 sm:mt-16 lg:grid-cols-3">
            {PRIMARY.map((f, i) => (
              <Reveal key={f.title} delay={i * 90} className="h-full">
                <div
                  className={`group h-full border-b border-white/12 py-9 lg:border-b-0 lg:py-10 ${
                    i === 0 ? 'lg:pr-10' : 'lg:border-l lg:border-white/12 lg:pl-10 lg:pr-10'
                  } ${i === PRIMARY.length - 1 ? 'lg:pr-0' : ''}`}
                >
                  <FeatureGlyph
                    name={f.icon}
                    className="h-5 w-5 text-sunset-400 transition-transform duration-500 ease-silk group-hover:-translate-y-0.5"
                  />

                  <p className="mt-7 font-display text-[2.2rem] font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-[2.4rem]">
                    {f.stat}
                  </p>

                  <p className="mt-3 text-[0.75rem] lg:text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-sunset-400">
                    {f.statLabel}
                  </p>

                  <p className="mt-5 max-w-[30ch] text-[0.96rem] font-medium leading-snug text-white/90">
                    {f.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---------------- Supporting three, one line each ---------------- */}
          <Reveal delay={140}>
            <ul className="grid gap-x-10 gap-y-4 border-t border-white/12 py-7 sm:grid-cols-2 lg:grid-cols-3">
              {SECONDARY.map((f) => (
                <li key={f.title} className="flex items-baseline gap-3">
                  <FeatureGlyph
                    name={f.icon}
                    className="h-4 w-4 shrink-0 translate-y-0.5 text-sunset-400"
                  />
                  <span className="font-display text-[1.05rem] font-bold tracking-tight text-white">
                    {f.stat}
                  </span>
                  <span className="text-[0.88rem] text-azure-200">{f.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---------------- Cinematic band ---------------- */}
          <Reveal delay={120}>
            <figure
              className="bg-responsive relative mt-8 aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-navy-800 bg-cover sm:aspect-[21/9]"
              style={{
                '--bg': `url('${media.whyAloha.src}')`,
                '--bg-sm': `url('${media.whyAloha.srcSm}')`,
                backgroundPosition: '58% 52%',
              } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg,rgba(1,33,69,.94) 0%,rgba(1,33,69,.78) 34%,rgba(1,33,69,.28) 66%,rgba(1,33,69,.1) 100%)',
                }}
              />
              <figcaption className="relative flex h-full max-w-xl flex-col justify-center p-8 sm:p-12">
                <span className="inline-flex w-fit rounded-full bg-sunset-400 px-3 py-1 text-[0.75rem] lg:text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white">
                  Locally owned
                </span>
                <p className="mt-5 font-display text-[1.45rem] font-bold leading-tight tracking-tight text-white sm:text-[1.9rem]">
                  Every tower on this network belongs to Aloha Broadband.
                </p>
                <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed text-azure-200">
                  No leased space, no shared capacity, and no queue behind another
                  carrier&rsquo;s traffic.
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* ---------------- Closing CTA ---------------- */}
          <Reveal delay={160}>
            <div className="beam-border mt-6 rounded-[1.5rem] bg-navy-700/85 backdrop-blur-md">
              <div className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-9">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Ready to get connected?
                  </h3>
                  <p className="mt-1.5 text-[0.92rem] text-azure-200">
                    Order in a single call. {site.hours}.
                  </p>
                </div>

                <div className="-ml-1.5 shrink-0 sm:ml-0">
                  <MagneticButton href={site.phoneHref} variant="ember" ariaLabel="Call to order">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call to order
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Wipe>
    </section>
  );
}

export default WhyAloha;
