import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CORE_PILLARS } from '../data/rightmethodData';

function PillarGraphic({ index, active }: { index: number; active: boolean }) {
  const strokeMain = active ? '#ffffff' : 'rgba(255,255,255,0.45)';
  const strokeSub = active ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.14)';

  if (index === 0) {
    return (
      <svg viewBox="0 0 100 60" className="h-12 w-20" fill="none" aria-hidden="true">
        <circle cx="50" cy="30" r="24" stroke={strokeSub} strokeWidth="1" />
        <circle cx="50" cy="30" r="14" stroke={strokeSub} strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="30" r="5" stroke={strokeMain} strokeWidth="1.25" />
        <circle cx="50" cy="30" r="2" fill={active ? '#2c86f6' : strokeMain} />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 100 60" className="h-12 w-20" fill="none" aria-hidden="true">
        <line x1="8" y1="30" x2="92" y2="30" stroke={strokeSub} strokeWidth="1" />
        <path
          d="M12 30 L24 30 L32 14 L42 48 L52 10 L62 42 L70 25 L78 30 L88 30"
          stroke={strokeMain}
          strokeWidth="1.25"
        />
        <circle cx="52" cy="10" r="2.2" fill={active ? '#2c86f6' : strokeMain} />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 100 60" className="h-12 w-20" fill="none" aria-hidden="true">
        <rect x="18" y="10" width="28" height="28" stroke={strokeSub} strokeWidth="1" />
        <rect x="38" y="20" width="28" height="28" stroke={strokeSub} strokeWidth="1" />
        <rect x="38" y="20" width="8" height="18" stroke={strokeMain} strokeWidth="1.25" />
        <circle cx="42" cy="29" r="2.2" fill={active ? '#2c86f6' : strokeMain} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 60" className="h-12 w-20" fill="none" aria-hidden="true">
      <path d="M12 46 L36 36 L60 20 L88 10" stroke={strokeMain} strokeWidth="1.25" />
      <line x1="36" y1="10" x2="36" y2="50" stroke={strokeSub} strokeWidth="1" strokeDasharray="2 3" />
      <line x1="60" y1="10" x2="60" y2="50" stroke={strokeSub} strokeWidth="1" strokeDasharray="2 3" />
      <circle cx="88" cy="10" r="2.6" fill={active ? '#2c86f6' : strokeMain} />
    </svg>
  );
}

export default function PillarsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activePillar, setActivePillar] = useState(3);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const xShift = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <section
      ref={sectionRef}
      id="rightmethods"
      className="relative border-t border-white/10 bg-[#050505]/45 py-10 sm:py-14 overflow-hidden"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/55 mb-2">
              05 · Our Four Core Pillars
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.18] tracking-[-0.02em] text-white max-w-[22ch]">
              Four principles.{' '}
              <span className="font-serif-italic font-normal text-[1.08em]">
                One uncompromising standard.
              </span>
            </h2>
          </div>

          <p className="text-[14px] text-white/65 max-w-[40ch]">
            The RightMethods behind every decision we make.
          </p>
        </div>

        <motion.div
          style={prefersReducedMotion ? undefined : { x: xShift }}
          className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10"
        >
          {CORE_PILLARS.map((pillar, index) => {
            const isActive = activePillar === index;
            return (
              <div
                key={pillar.number}
                onMouseEnter={() => setActivePillar(index)}
                onClick={() => setActivePillar(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePillar(index);
                  }
                }}
                className={`group flex flex-col justify-between border-r border-b border-white/10 p-5 transition-colors duration-200 cursor-pointer focus:outline-none ${
                  isActive ? 'bg-[#0f0f0f]' : 'bg-black hover:bg-[#090909]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`font-mono text-[22px] font-normal tabular-nums leading-none transition-colors ${
                      isActive ? 'text-white' : 'text-white/35 group-hover:text-white/75'
                    }`}
                  >
                    {pillar.number}
                  </span>
                  <PillarGraphic index={index} active={isActive} />
                </div>

                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                    {pillar.title}
                  </p>
                  <h3 className="mt-1.5 text-[16.5px] font-medium leading-[1.3] text-white">
                    {pillar.headline}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.52] text-white/65">{pillar.body}</p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-white/10">
                  <p className="text-[11px] text-white/45">{pillar.mechanic}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
