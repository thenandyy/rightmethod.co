import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MYTHS_VS_REALITY } from '../data/rightmethodData';

export default function MythsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = MYTHS_VS_REALITY[selectedIndex];

  return (
    <section
      id="our-thinking"
      className="relative border-t border-white/10 bg-[#050505]/45 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/55 mb-2">
              07 · Unlearning the Feed
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.18] tracking-[-0.02em] text-white max-w-[24ch]">
              The content industry has enough advice.{' '}
              <span className="font-serif-italic font-normal text-[1.08em]">
                It needs better thinking.
              </span>
            </h2>
          </div>

          <p className="text-[14px] text-white/55 max-w-[38ch]">
            Select any conventional assumption to contrast it with our engineered truth.
          </p>
        </div>

        <div className="mt-6 sm:mt-7 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: Conventional Noise List */}
          <div className="lg:col-span-6 divide-y divide-white/10 border-y border-white/10">
            {MYTHS_VS_REALITY.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  aria-pressed={isSelected}
                  className={`group w-full text-left py-2.5 px-3.5 transition-colors duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected ? 'bg-[#101010]' : 'bg-transparent hover:bg-[#0a0a0a]'
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`font-mono text-[10px] tracking-[0.14em] uppercase shrink-0 ${
                        isSelected ? 'text-[#2c86f6]' : 'text-white/40 group-hover:text-white/60'
                      }`}
                    >
                      {item.index}
                    </span>
                    <p
                      className={`text-[15px] sm:text-[16px] font-medium leading-[1.35] transition-colors ${
                        isSelected ? 'text-white' : 'text-white/60 group-hover:text-white/85'
                      }`}
                    >
                      “{item.myth}”
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`font-mono text-[12px] ${
                      isSelected ? 'text-white' : 'text-white/30'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Engineered Truth Reveal */}
          <div className="lg:col-span-6 flex">
            <div className="w-full border border-white/15 bg-black p-5 sm:p-6 flex flex-col justify-between min-h-[210px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#2c86f6]">
                      Engineered Truth · {current.index}
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-white/45">
                      0{selectedIndex + 1} / 0{MYTHS_VS_REALITY.length}
                    </span>
                  </div>

                  <p className="mt-4 text-[13px] text-white/45 line-through decoration-white/25">
                    {current.myth}
                  </p>

                  <h3 className="mt-3 text-[20px] sm:text-[24px] font-medium leading-[1.3] text-white">
                    {current.reality}
                  </h3>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[12.5px] text-white/70">
                  <span className="text-white/45 mr-1.5">Principle:</span>
                  {current.rightmethodPrinciple}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev === 0 ? MYTHS_VS_REALITY.length - 1 : prev - 1
                      )
                    }
                    aria-label="Previous item"
                    className="h-8 w-8 rounded-full border border-white/15 text-white/70 hover:border-white/50 hover:text-white cursor-pointer"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((prev) => (prev + 1) % MYTHS_VS_REALITY.length)
                    }
                    aria-label="Next item"
                    className="h-8 w-8 rounded-full border border-white/15 text-white/70 hover:border-white/50 hover:text-white cursor-pointer"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
