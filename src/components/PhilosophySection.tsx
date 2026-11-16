import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { PHILOSOPHY_PRINCIPLES } from '../data/rightmethodData';

function PrincipleDiagram({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 180 70" className="h-12 w-32" fill="none" aria-hidden="true">
        <line x1="0" y1="35" x2="180" y2="35" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <circle cx="48" cy="35" r="16" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <circle cx="90" cy="35" r="24" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
        <circle cx="132" cy="35" r="16" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <circle cx="90" cy="35" r="3" fill="#2c86f6" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 180 70" className="h-12 w-32" fill="none" aria-hidden="true">
        <path
          d="M8 54 C 34 54, 46 16, 70 16 C 96 16, 106 50, 130 50 C 150 50, 162 14, 174 14"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.25"
        />
        <circle cx="70" cy="16" r="2.5" fill="#2c86f6" />
        <circle cx="174" cy="14" r="2.5" fill="#ffffff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 180 70" className="h-12 w-32" fill="none" aria-hidden="true">
      <line x1="16" y1="14" x2="164" y2="14" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="16" y1="35" x2="164" y2="35" stroke="rgba(255,255,255,0.55)" strokeWidth="1.25" />
      <line x1="16" y1="56" x2="164" y2="56" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <circle cx="124" cy="35" r="4" fill="#000000" stroke="#2c86f6" strokeWidth="1.5" />
    </svg>
  );
}

export default function PhilosophySection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const xShift = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative border-t border-white/10 bg-transparent py-10 sm:py-14 overflow-hidden"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/55 mb-2">
              06 · The RIGHTMETHOD Philosophy
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.18] tracking-[-0.02em] text-white max-w-[24ch]">
              We don’t follow the feed.{' '}
              <span className="font-serif-italic font-normal text-[1.08em]">
                We study the people
              </span>{' '}
              behind it.
            </h2>
          </div>

          <p className="text-[14px] text-white/60 max-w-[40ch]">
            Decisions built from first principles, observation, and pattern recognition.
          </p>
        </div>

        <motion.div
          style={prefersReducedMotion ? undefined : { x: xShift }}
          className="mt-6 sm:mt-7 grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {PHILOSOPHY_PRINCIPLES.map((principle, idx) => (
            <article
              key={principle.number}
              className="border border-white/12 bg-[#070707] p-5 flex flex-col justify-between transition-colors hover:border-white/30"
            >
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/60">
                    {principle.number} · {principle.label}
                  </span>
                  <PrincipleDiagram index={idx} />
                </div>

                <h3 className="mt-4 text-[19px] sm:text-[20px] font-medium leading-[1.28] text-white">
                  {principle.headline}
                </h3>

                <p className="mt-2.5 text-[14px] leading-[1.58] text-white/65">
                  {principle.summary}
                </p>
              </div>

              <p className="mt-4 pt-3 border-t border-white/10 font-mono text-[11px] text-white/45">
                {principle.questionPrompt}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
