'use client';

import {
  activeServiceSections,
  coverage,
  coverageBlurb,
  media,
  plansForLine,
} from '@/lib/content';
import { PlanCard } from './PlanCard';
import { ZipChecker } from '@/components/ui/ZipChecker';
import { Reveal, RevealHeading, Stagger, Wipe } from '@/components/ui/primitives';
import { MapPin } from '@/components/ui/Icons';
import { Aurora } from '@/components/ui/Aurora';
import { Spotlight } from '@/components/ui/Spotlight';

/**
 * Renders one section per service line that actually has plans behind it.
 * A line the carrier does not sell produces no markup at all — there is no
 * empty state and no placeholder.
 */
export function ServiceSections() {
  const sections = activeServiceSections();

  return (
    <>
      {sections.map((section, idx) => {
        const linePlans = plansForLine(section.line);

        return (
          <section
            key={section.anchor}
            id={section.anchor}
            className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
          >
            {/* soft ground tint + drifting brand light */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-azure-50 to-transparent"
            />
            <Aurora tone="light" intensity={0.9} />

            <Wipe>
              <div className="shell relative">
                {/* ---- Section head ---- */}
                <div className="max-w-2xl">
                  <Reveal>
                    <span className="eyebrow text-azure-500">
                      <span className="h-px w-8 bg-sunset-400" />
                      {section.eyebrow}
                    </span>
                  </Reveal>

                  <RevealHeading
                    as="h2"
                    delay={80}
                    text={section.heading}
                    className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-navy-700 sm:text-[2.6rem]"
                  />

                  {section.subheading ? (
                    <Reveal delay={200}>
                      <p className="mt-5 text-[1.02rem] leading-relaxed text-navy-700/68">
                        {section.subheading}
                      </p>
                    </Reveal>
                  ) : null}
                </div>

                {/* ---- Plan grid ---- */}
                <Spotlight className="mt-12 grid gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                  {linePlans.map((plan, i) => (
                    <Reveal key={plan.id} delay={i * 110} className="h-full">
                      <PlanCard plan={plan} />
                    </Reveal>
                  ))}
                </Spotlight>

                <Reveal delay={180}>
                  <p className="mt-8 max-w-3xl text-[0.8rem] leading-relaxed text-navy-700/52">
                    Residential plans are best-effort, shared bandwidth and speeds are not
                    guaranteed. Performance depends on line of sight to the nearest tower along
                    with terrain, trees and other obstructions at your address.
                  </p>
                </Reveal>

                {/* ---- Coverage + topology, closing this service block ---- */}
                {idx === sections.length - 1 ? (
                  <div id="coverage" className="mt-20 sm:mt-24">
                    <div className="hairline" />

                    {/* Install banner. Background image so a missing file
                        simply leaves the navy panel. */}
                    <Reveal>
                      <div
                        className="bg-responsive relative mt-14 overflow-hidden rounded-[1.5rem] bg-tide bg-cover"
                        style={{
                          '--bg': `url('${media.coverage.src}')`,
                          '--bg-sm': `url('${media.coverage.srcSm}')`,
                          // This banner crops to a wide letterbox; anchor on the
                          // technician (upper right of frame) rather than centre.
                          backgroundPosition: '72% 38%',
                        } as React.CSSProperties}
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(90deg,rgba(1,33,69,.92) 0%,rgba(1,33,69,.72) 45%,rgba(9,28,48,.35) 100%)',
                          }}
                        />
                        <div className="relative max-w-lg px-7 py-12 sm:px-10 sm:py-16">
                          <p className="text-[0.75rem] lg:text-[0.68rem] font-bold uppercase tracking-[0.17em] text-sunset-400">
                            Professional installation
                          </p>
                          <p className="mt-3 font-display text-[1.35rem] font-bold leading-snug tracking-tight text-white sm:text-[1.6rem]">
                            A technician mounts the antenna, aligns it to the nearest
                            tower and hands off a working Ethernet connection.
                          </p>
                          <p className="mt-3 text-[0.88rem] leading-relaxed text-azure-200">
                            Setup and installation is a one-time $200 charge, due at the
                            time of installation.
                          </p>
                        </div>
                      </div>
                    </Reveal>

                    <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:gap-16">
                      {/* Intro + availability check */}
                      <div className="lg:sticky lg:top-32 lg:self-start">
                        <Reveal>
                          <span className="eyebrow text-azure-500">
                            <span className="h-px w-8 bg-sunset-400" />
                            Coverage
                          </span>
                        </Reveal>

                        <RevealHeading
                          as="h3"
                          delay={80}
                          text="Service areas across Hawaiʻi Island"
                          className="mt-4 font-display text-[1.7rem] font-bold leading-[1.15] tracking-[-0.02em] text-navy-700 sm:text-[2.1rem]"
                        />

                        <Reveal delay={180}>
                          <p className="mt-5 text-[0.98rem] leading-relaxed text-navy-700/68">
                            {coverageBlurb}
                          </p>
                        </Reveal>

                        <Reveal delay={260}>
                          <div className="mt-7">
                            <h4 className="text-[0.75rem] lg:text-[0.7rem] font-bold uppercase tracking-[0.17em] text-navy-700/55">
                              Confirm your ZIP code
                            </h4>
                            <div className="mt-3">
                              <ZipChecker tone="light" />
                            </div>
                          </div>
                        </Reveal>

                        <Reveal delay={340}>
                          <p className="mt-5 max-w-md text-[0.8rem] leading-relaxed text-navy-700/52">
                            Service is delivered over a fixed radio link, so availability
                            depends on line of sight between an antenna at your property and
                            the nearest tower. A ZIP code inside the footprint confirms the
                            area is served; the final check is made at your specific address.
                          </p>
                        </Reveal>
                      </div>

                      {/* Area directory */}
                      <div>
                        <Stagger
                          step={90}
                          className="grid gap-4 sm:grid-cols-2"
                        >
                          {coverage.map((area) => (
                            <div
                              key={area.zip}
                              className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-lift ring-1 ring-azure-150 transition-shadow duration-500 ease-silk hover:shadow-plan"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-azure-50 text-sunset-500 ring-1 ring-inset ring-azure-150">
                                  <MapPin className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <div>
                                  <p className="font-display text-[1.02rem] font-bold leading-none tracking-tight text-navy-700">
                                    {area.district}
                                  </p>
                                  <p className="mt-1 text-[0.75rem] font-semibold tabular-nums tracking-wide text-azure-500">
                                    ZIP {area.zip}
                                  </p>
                                </div>
                              </div>

                              <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                                {area.communities.map((c) => (
                                  <li
                                    key={c}
                                    className="rounded-full bg-azure-50 px-2.5 py-1 text-[0.76rem] font-medium text-navy-700/75 ring-1 ring-inset ring-azure-150"
                                  >
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Stagger>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </Wipe>
          </section>
        );
      })}
    </>
  );
}

export default ServiceSections;
