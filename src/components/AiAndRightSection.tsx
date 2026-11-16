import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AI_WORKFLOW_STAGES } from '../data/rightmethodData';

export default function AiAndRightSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<number>(0);

  const current = AI_WORKFLOW_STAGES[activeStage];

  return (
    <section
      id="ai-and-right"
      className="relative border-t border-white/10 bg-transparent py-10 sm:py-14"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Compact Top Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/55 mb-2">
              04 · AI &amp; Right
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.18] tracking-[-0.02em] text-white max-w-[22ch]">
              AI shouldn’t replace your thinking.{' '}
              <span className="font-serif-italic font-normal text-[1.08em]">
                It should multiply your thinking.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[1.65] text-white/75">
              We use intelligence to scale the operation, not manufacture the perspective.
            </p>
          </div>
        </div>

        {/* Preserved Architectural Wave Visual — 6 Stages */}
        <div className="mt-6 sm:mt-7 border border-white/10 bg-[#050505] p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            <h3 className="text-[15px] font-medium text-white">
              Content Engineering™ Intelligence Loop
            </h3>
            <span className="text-[12px] text-white/45">
              Tap 01–06 to inspect Human Insight, Machine Intelligence, and Output
            </span>
          </div>

          <div className="relative mt-4">
            <div className="hidden lg:block relative h-9 mb-2" aria-hidden="true">
              <svg
                viewBox="0 0 1000 36"
                preserveAspectRatio="none"
                className="h-full w-full overflow-visible"
              >
                <path
                  d="M 55 18 Q 160 3, 270 18 T 490 18 T 710 18 T 945 18"
                  fill="none"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1="55"
                  y1="18"
                  x2={55 + (activeStage / (AI_WORKFLOW_STAGES.length - 1)) * 890}
                  y2="18"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {AI_WORKFLOW_STAGES.map((stage, index) => {
                const isActive = activeStage === index;
                const isCompleted = index < activeStage;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStage(index)}
                    aria-pressed={isActive}
                    className={`group flex flex-col items-start text-left border p-3.5 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'border-white bg-[#121212]'
                        : isCompleted
                        ? 'border-white/20 bg-[#080808] hover:border-white/40'
                        : 'border-white/10 bg-black hover:border-white/30'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between mb-2">
                      <span className="font-mono text-[11px] tabular-nums text-white/50">
                        {stage.step}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full transition-colors ${
                          isActive
                            ? 'bg-[#2c86f6]'
                            : isCompleted
                            ? 'bg-white/60'
                            : 'bg-white/15'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[13px] leading-[1.3] font-medium ${
                        isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {stage.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.step}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-white/10 pt-4"
            >
              <div className="border border-white/10 bg-black p-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
                  Human Insight
                </p>
                <p className="mt-1.5 text-[13.5px] leading-[1.55] text-white/90">
                  {current.humanInput}
                </p>
              </div>
              <div className="border border-white/10 bg-black p-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
                  Machine Intelligence
                </p>
                <p className="mt-1.5 text-[13.5px] leading-[1.55] text-white/90">
                  {current.machineLeverage}
                </p>
              </div>
              <div className="border border-white/10 bg-black p-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#2c86f6]">
                  Stage {current.step} Output
                </p>
                <p className="mt-1.5 text-[13.5px] leading-[1.55] text-white">
                  {current.output}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
