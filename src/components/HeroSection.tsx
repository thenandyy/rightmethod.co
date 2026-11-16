import { useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import ClientPanorama3D from './ClientPanorama3D';
import GlobalFlagsMarquee from './GlobalFlagsMarquee';
import HeroContentOrbit from './HeroContentOrbit';
import RightMethodLogo from './RightMethodLogo';
import { HERO_PROOF_METRICS } from '../data/rightmethodData';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const highlightRef = useRef<HTMLDivElement>(null);
  const brandLockupRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: highlightScroll } = useScroll({
    target: highlightRef,
    offset: ['start 92%', 'start 48%'],
  });

  const smoothHighlight = useSpring(highlightScroll, {
    stiffness: 180,
    damping: 30,
    mass: 0.35,
  });

  const clipRightPercent = useTransform(smoothHighlight, [0, 1], [100, 0]);
  const whiteLabelClip = useMotionTemplate`inset(0 ${clipRightPercent}% 0 0)`;

  const { scrollYProgress: brandHighlightScroll } = useScroll({
    target: brandLockupRef,
    offset: ['start 86%', 'start 48%'],
  });

  const smoothBrandHighlight = useSpring(brandHighlightScroll, {
    stiffness: 180,
    damping: 30,
    mass: 0.35,
  });

  const brandClipRight = useTransform(smoothBrandHighlight, [0, 1], [100, 0]);
  const brandWhiteLabelClip = useMotionTemplate`inset(0 ${brandClipRight}% 0 0)`;

  const { scrollYProgress: logoHighlightScroll } = useScroll({
    target: brandLockupRef,
    offset: ['start 90%', 'start 54%'],
  });

  const smoothLogoHighlight = useSpring(logoHighlightScroll, {
    stiffness: 180,
    damping: 30,
    mass: 0.35,
  });

  const logoClipRight = useTransform(smoothLogoHighlight, [0, 1], [100, 0]);
  const logoWhiteLabelClip = useMotionTemplate`inset(0 ${logoClipRight}% 0 0)`;

  return (
    <section
      id="hero"
      className="relative bg-transparent pb-8 sm:pb-12 overflow-x-clip editorial-flutes"
    >
      {/* FIRST FOLD: Responsive Editorial Philosophy + Stationary Wordmark Content Orbit */}
      <div className="relative min-h-[calc(100svh-1rem)] flex flex-col justify-between pt-20 sm:pt-24 lg:pt-26 pb-5 sm:pb-8">
        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* LEFT COLUMN: Full-width compact on phone, 6-col flagship editorial split on desktop */}
            <div className="lg:col-span-6 relative z-20">
              <motion.h1
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="text-[21px] min-[375px]:text-[23.5px] sm:text-[42px] lg:text-[48px] xl:text-[54px] font-medium leading-[1.16] sm:leading-[1.08] tracking-[-0.024em] sm:tracking-[-0.028em] text-white"
              >
                <span className="block">
                  Audiences run on{' '}
                  <span className="font-serif-italic font-normal text-[1.09em] text-white">
                    patterns.
                  </span>
                </span>
                <span className="block mt-1">
                  So we engineer content that{' '}
                  <span className="font-serif-italic font-normal text-[1.09em] text-white">
                    speaks
                  </span>{' '}
                  to them.
                </span>
              </motion.h1>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3.5 sm:mt-5 space-y-2 sm:space-y-2.5 w-full sm:max-w-[46ch]"
              >
                <p className="text-[12.5px] min-[375px]:text-[13px] sm:text-[15.5px] leading-[1.55] sm:leading-[1.6] text-white/45 line-through decoration-white/35 decoration-[0.65px] sm:decoration-[0.75px] font-normal">
                  Content isn’t about finding three hacks to crack an algorithm.
                </p>
                <p className="text-[12.5px] min-[375px]:text-[13px] sm:text-[15px] leading-[1.55] sm:leading-[1.65] text-white/80">
                  It’s about understanding what makes people stop, think, feel, remember, and
                  respond. So we engineer content that speaks to them.
                </p>
                {/* Desktop-only trigger placed directly beneath the core hero statement */}
                <div className="hidden lg:block pt-2">
                  <button
                    type="button"
                    onClick={() => setCaseStudiesOpen(true)}
                    className="inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/75 transition-colors hover:border-white/50 hover:bg-white hover:text-black cursor-pointer"
                  >
                    <span>Read all countries’ case studies</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Stationary RIGHTMETHOD Wordmark + Orbiting 9:16 Content Previews */}
            <div className="lg:col-span-6 relative z-10 flex items-center justify-center">
              <HeroContentOrbit />
            </div>
          </div>
        </div>

        {/* COMPACT 2-LAYER GLOBAL FLAGS STRIP BETWEEN ORBIT & PROOF NUMBERS */}
        <div className="relative z-20 mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 mt-4 sm:mt-5">
          <GlobalFlagsMarquee open={caseStudiesOpen} onOpenChange={setCaseStudiesOpen} />
        </div>

        {/* UNIFIED FIRST-FOLD PROOF STRIP: Preserved Figures Only, Zero Duplication */}
        <div className="relative z-20 mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 mt-4 sm:mt-5">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 border border-white/12 divide-y sm:divide-y-0 sm:divide-x divide-white/12 bg-black"
          >
            {HERO_PROOF_METRICS.map((metric) => (
              <div
                key={metric.id}
                className="flex sm:flex-col items-baseline sm:items-start justify-between px-5 sm:px-7 py-4 sm:py-5"
              >
                <p className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium tracking-[-0.03em] leading-none text-white tabular-nums">
                  {metric.value}
                </p>
                <p className="sm:mt-2 font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] text-white/50">
                  {metric.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* STAGE 2: Rising Smoke + Scroll White-Label Reveal + 3D Panorama + Post-Panorama Signature Logo */}
      <div id="hero-showcase" className="relative pt-6 sm:pt-8 overflow-hidden">
        {/* Atmospheric Smoke Rising From Bottom */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-[78%] bg-[radial-gradient(ellipse_75%_65%_at_50%_100%,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.035)_45%,transparent_80%)]" />

          {!prefersReducedMotion && (
            <>
              <motion.div
                initial={{ y: 90, x: -16, scale: 0.9, opacity: 0.15 }}
                animate={{
                  y: [90, -40, -150],
                  x: [-16, 18, -10],
                  scale: [0.9, 1.12, 1.28],
                  opacity: [0.08, 0.36, 0],
                }}
                transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 h-[300px] w-[420px] sm:h-[380px] sm:w-[620px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.04)_48%,transparent_75%)] blur-3xl"
              />

              <motion.div
                initial={{ y: 110, x: -40, scale: 0.85, opacity: 0.08 }}
                animate={{
                  y: [110, -25, -135],
                  x: [-40, 12, -24],
                  scale: [0.85, 1.08, 1.24],
                  opacity: [0.05, 0.28, 0],
                }}
                transition={{ duration: 12, delay: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[-12%] left-[22%] h-[260px] w-[360px] sm:h-[340px] sm:w-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.03)_50%,transparent_75%)] blur-3xl"
              />

              <motion.div
                initial={{ y: 100, x: 30, scale: 0.88, opacity: 0.08 }}
                animate={{
                  y: [100, -35, -145],
                  x: [30, -18, 16],
                  scale: [0.88, 1.1, 1.26],
                  opacity: [0.06, 0.3, 0],
                }}
                transition={{ duration: 11, delay: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[-12%] right-[18%] h-[260px] w-[360px] sm:h-[340px] sm:w-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.03)_50%,transparent_75%)] blur-3xl"
              />
            </>
          )}
        </div>

        {/* Scroll-Step Reveal: Left-to-Right White Label Selection directly above 3D Panorama */}
        <div
          ref={highlightRef}
          className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12"
        >
          <div className="editorial-grain border-t border-white/10 pt-6 sm:pt-8 pb-0 flex flex-col items-center text-center">
            <p className="text-[20px] sm:text-[28px] lg:text-[36px] font-normal leading-[1.15] tracking-[-0.02em] text-white">
              We are India’s 1st
            </p>

            {/* Left-to-Right Scroll-Wiped White Selection Label */}
            <div className="relative my-2 sm:my-2.5 inline-flex items-center justify-center rounded-[6px] sm:rounded-[8px] border border-white/20 px-5 sm:px-8 py-1.5 overflow-hidden">
              <span className="font-serif-italic font-normal text-[32px] sm:text-[48px] lg:text-[58px] leading-[1.08] tracking-[-0.01em] text-white select-none whitespace-nowrap">
                Content Engineering
                <sup className="ml-1 font-sans text-[0.3em] font-medium not-italic align-super">™</sup>
              </span>

              <motion.span
                aria-hidden="true"
                style={prefersReducedMotion ? undefined : { clipPath: whiteLabelClip }}
                className="absolute inset-0 flex items-center justify-center rounded-[6px] sm:rounded-[8px] bg-[#f3f3f3] px-5 sm:px-8 py-1.5 font-serif-italic font-normal text-[32px] sm:text-[48px] lg:text-[58px] leading-[1.08] tracking-[-0.01em] text-black select-none whitespace-nowrap"
              >
                Content Engineering
                <sup className="ml-1 font-sans text-[0.3em] font-medium not-italic align-super">™</sup>
              </motion.span>
            </div>

            <p className="text-[20px] sm:text-[28px] lg:text-[36px] font-normal leading-[1.15] tracking-[-0.02em] text-white">
              Company
            </p>
          </div>
        </div>

        {/* Full Unclipped 3D Cylindrical Photo Panorama */}
        <div className="relative z-10 mt-2 sm:mt-4">
          <ClientPanorama3D />
        </div>
      </div>

      {/* Post-Panorama White-Label Brand Lockup Statement */}
      <div
        ref={brandLockupRef}
        className="relative mx-auto max-w-[1060px] px-5 sm:px-8 lg:px-12 mt-6 sm:mt-8 text-center"
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/10 pt-8 sm:pt-10"
        >
          <p className="text-[20px] sm:text-[28px] lg:text-[36px] font-normal leading-[1.6] tracking-[-0.022em] text-white/90">
            <span>We apply</span>
            <span className="relative inline-flex h-[1.32em] items-center justify-center align-middle -translate-y-[0.06em] mx-1.5 sm:mx-2 rounded-[4px] sm:rounded-[5px] border border-white/20 px-2.5 sm:px-3.5 overflow-hidden">
              <RightMethodLogo
                variant="light-on-dark"
                className="h-[1.78em] w-auto max-w-none shrink-0 translate-y-[0.03em]"
              />
              <motion.span
                aria-hidden="true"
                style={prefersReducedMotion ? undefined : { clipPath: logoWhiteLabelClip }}
                className="absolute inset-0 flex items-center justify-center rounded-[4px] sm:rounded-[5px] bg-[#f4f4f4] px-2.5 sm:px-3.5"
              >
                <RightMethodLogo
                  variant="dark-on-light"
                  className="h-[1.78em] w-auto max-w-none shrink-0 translate-y-[0.03em]"
                />
              </motion.span>
            </span>
            <span>to build</span>
            <span className="relative inline-flex h-[1.32em] items-center justify-center align-middle -translate-y-[0.06em] mx-1.5 sm:mx-2 rounded-[4px] sm:rounded-[5px] border border-white/20 px-2.5 sm:px-3.5 overflow-hidden">
              <span className="font-serif-italic font-normal text-[1.06em] leading-none text-white select-none whitespace-nowrap">
                Profitable Personal Brands
              </span>
              <motion.span
                aria-hidden="true"
                style={prefersReducedMotion ? undefined : { clipPath: brandWhiteLabelClip }}
                className="absolute inset-0 flex items-center justify-center rounded-[4px] sm:rounded-[5px] bg-[#f4f4f4] px-2.5 sm:px-3.5 font-serif-italic font-normal text-[1.06em] leading-none text-black select-none whitespace-nowrap"
              >
                Profitable Personal Brands
              </motion.span>
            </span>
            <span>for the top 1% of founders, coaches, creators and VCs across the world.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
