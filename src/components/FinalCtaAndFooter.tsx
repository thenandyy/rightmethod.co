import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SITE_CONFIG } from '../data/rightmethodData';
import RightMethodLogo from './RightMethodLogo';

const GROUND_COLUMNS = [18, 34, 52, 72, 88, 96, 82, 64, 46, 28, 16];

export default function FinalCtaAndFooter() {
  const prefersReducedMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const logoOpacity = useTransform(scrollYProgress, [0.1, 0.75], [0.45, 1]);
  const groundBeamHeight = useTransform(scrollYProgress, [0, 1], ['25%', '100%']);

  return (
    <>
      {/* PARTNER WITH US — Compact High-Conviction CTA */}
      <section
        id="partner-cta"
        className="relative border-t border-white/10 bg-transparent py-10 sm:py-14"
      >
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12">
          <div className="border border-white/15 bg-[#070707] p-6 sm:p-8 lg:p-9">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/55 mb-2">
                  Partner With Us
                </p>
                <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.16] tracking-[-0.02em] text-white max-w-[20ch]">
                  Your expertise has a story. Let’s make the{' '}
                  <span className="font-serif-italic font-normal text-[1.08em]">
                    right people listen.
                  </span>
                </h2>

                <p className="mt-3 text-[15px] text-white/80 max-w-[44ch]">
                  We don’t sell 90 days of posting. We engineer 90 days of strategic progress.
                </p>

                <p className="mt-4 inline-block border border-white/20 bg-white/[0.05] px-3.5 py-1.5 text-[13px] font-medium text-white">
                  No generic pitches. Just a thoughtful conversation about your next 90 days.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col lg:items-end gap-3.5">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={SITE_CONFIG.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-[14px] font-medium text-black whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#2c86f6] hover:text-white"
                  >
                    <span>Book a 90-day strategy call</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href={`mailto:${SITE_CONFIG.partnerEmail}?subject=Partnering%20with%20RIGHTMETHOD`}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-[14px] font-normal text-white whitespace-nowrap shrink-0 transition-colors hover:border-white hover:bg-white/10"
                  >
                    <span>Reach out to us</span>
                  </a>
                </div>

                <a
                  href={`mailto:${SITE_CONFIG.partnerEmail}`}
                  className="font-mono text-[12.5px] text-white/60 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.partnerEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Signature Hydration Punch Line */}
          <p className="mt-6 text-center text-[13.5px] text-white/70">
            That’s enough screen time for today, Sweetheart ❤️ Go drink some water and stay hydrated.
          </p>
        </div>
      </section>

      {/* COMPACT GROUND-UP ANIMATED FINALE WITH BALANCED OFFICIAL LOGO */}
      <footer
        ref={footerRef}
        className="relative border-t border-white/10 bg-[#030303]/65 flex flex-col items-center justify-center py-8 sm:py-12 overflow-hidden"
      >
        {/* Architectural Ground-Up Rising Fluted Light Columns */}
        <motion.div
          aria-hidden="true"
          style={prefersReducedMotion ? { height: '100%' } : { height: groundBeamHeight }}
          className="pointer-events-none absolute bottom-0 inset-x-0 grid grid-cols-11 items-end opacity-40"
        >
          {GROUND_COLUMNS.map((pct, i) => (
            <div
              key={i}
              style={{ height: `${pct}%` }}
              className="w-full border-r border-white/[0.04] bg-gradient-to-t from-white/[0.09] via-[#2c86f6]/[0.06] to-transparent"
            />
          ))}
        </motion.div>

        {/* Ground Horizon Illumination Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-44 bg-[radial-gradient(ellipse_75%_90%_at_50%_100%,rgba(255,255,255,0.12)_0%,rgba(44,134,246,0.08)_42%,transparent_80%)]"
        />

        {/* Centered Rising Official Logo + Balanced Descriptor */}
        <motion.div
          style={prefersReducedMotion ? undefined : { y: logoY, opacity: logoOpacity }}
          className="relative z-10 w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center"
        >
          <RightMethodLogo className="w-full max-w-[820px] h-auto mx-auto" />
          <p className="-mt-1 sm:-mt-3 text-[14px] sm:text-[16px] text-[#8a8a8a]">
            India’s first Content Engineering™ company.
          </p>
        </motion.div>

        {/* Crisp Ground Baseline */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />
      </footer>
    </>
  );
}
