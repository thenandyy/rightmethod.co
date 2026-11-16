import { useState } from 'react';
import { motion } from 'motion/react';
import { NINETY_DAY_PLAYBOOK } from '../data/rightmethodData';

export default function PlaybookSection() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section
      id="playbook"
      className="relative border-t border-white/10 bg-transparent py-10 sm:py-14"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/55 mb-2">
              08 · The 90-Day RIGHTMETHOD Playbook
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.18] tracking-[-0.02em] text-white max-w-[22ch]">
              90 days. The right strategy.{' '}
              <span className="font-serif-italic font-normal text-[1.08em]">
                A personal brand built to create opportunities.
              </span>
            </h2>
          </div>

          <p className="lg:col-span-5 text-[14px] leading-[1.6] text-white/65">
            Introducing the 90-Day RIGHTMethods — our methodology for positioning, storytelling, and
            distribution built for sustainable organic growth.
          </p>
        </div>

        <div className="mt-6 sm:mt-7">
          <div className="relative h-px w-full bg-white/15 mb-4">
            <motion.div
              className="absolute top-0 left-0 h-[2px] bg-[#2c86f6]"
              initial={false}
              animate={{ width: `${((activePhase + 1) / 3) * 100}%` }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {NINETY_DAY_PLAYBOOK.map((stage, index) => {
              const isActive = activePhase === index;
              return (
                <div
                  key={stage.days}
                  onMouseEnter={() => setActivePhase(index)}
                  onClick={() => setActivePhase(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivePhase(index);
                    }
                  }}
                  className={`border p-5 transition-colors duration-200 cursor-pointer focus:outline-none ${
                    isActive
                      ? 'border-white/40 bg-[#0d0d0d]'
                      : 'border-white/10 bg-[#050505] hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[11px] tracking-[0.14em] uppercase ${
                        isActive ? 'text-[#2c86f6]' : 'text-white/50'
                      }`}
                    >
                      {stage.days}
                    </span>
                    <span className="font-mono text-[11px] text-white/40">{stage.phase}</span>
                  </div>

                  <h3 className="mt-3 text-[21px] font-medium tracking-[-0.01em] text-white">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-[13.5px] text-white/75">{stage.subtitle}</p>

                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                    {stage.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-white/65">
                        <span className="mt-2 h-1 w-1 rounded-full bg-white/45 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
