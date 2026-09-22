'use client';

import { useState } from 'react';
import { faqs, media, site } from '@/lib/content';
import { ChevronDown, Phone } from '@/components/ui/Icons';
import { Aurora } from '@/components/ui/Aurora';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal, RevealHeading, Wipe } from '@/components/ui/primitives';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <Aurora tone="light" intensity={0.85} />

      <Wipe>
        <div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
          {/* Left rail */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="eyebrow text-azure-500">
                <span className="h-px w-8 bg-sunset-400" />
                Questions
              </span>
            </Reveal>

            <RevealHeading
              as="h2"
              delay={80}
              text="The things people ask before they order"
              className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-navy-700 sm:text-[2.4rem]"
            />

            <Reveal delay={200}>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-navy-700/68">
                Speeds, routers, installation day and what happens if something breaks.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-7 -ml-1.5">
                <MagneticButton href={site.phoneHref} variant="outline" ariaLabel="Call to order">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call to order
                </MagneticButton>
              </div>
            </Reveal>

            {/* Supporting photo. Background image so a missing file leaves a
                plain tinted panel rather than a broken frame. */}
            <Reveal delay={360}>
              <div
                className="bg-responsive mt-9 hidden aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-azure-100 bg-cover bg-center ring-1 ring-azure-150 lg:block"
                style={{
                  '--bg': `url('${media.faq.src}')`,
                  '--bg-sm': `url('${media.faq.srcSm}')`,
                } as React.CSSProperties}
                role="img"
                aria-label={media.faq.alt}
              />
            </Reveal>
          </div>

          {/* Accordion */}
          <Reveal delay={120}>
            <div className="divide-y divide-azure-150 border-y border-azure-150">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={item.q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-trigger-${i}`}
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={`font-display text-[1.02rem] font-semibold leading-snug tracking-tight transition-colors duration-300 sm:text-[1.1rem] ${
                            isOpen ? 'text-sunset-500' : 'text-navy-700 group-hover:text-azure-500'
                          }`}
                        >
                          {item.q}
                        </span>

                        <span
                          className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-inset transition-all duration-[400ms] ease-silk ${
                            isOpen
                              ? 'rotate-180 bg-ember text-white ring-transparent'
                              : 'bg-white text-navy-700/60 ring-azure-200 group-hover:ring-azure-500/50'
                          }`}
                        >
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      className={`grid transition-all duration-500 ease-silk ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[62ch] pb-7 pr-10 text-[0.94rem] leading-relaxed text-navy-700/72">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Wipe>
    </section>
  );
}

export default Faq;
