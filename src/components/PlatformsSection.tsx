import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

type PlatformKey = 'instagram' | 'linkedin' | null;

const REEL_SYSTEMS = [
  {
    id: 'reel-01',
    format: '01 · Visual Essay',
    hook: 'Why 90% of founder content sounds identical — and what breaks the pattern.',
    pacing: '00:00 Hook Tension → 00:08 Visual Cut → 00:24 Contrarian Proof',
  },
  {
    id: 'reel-02',
    format: '02 · First-Principles Breakdown',
    hook: 'The quiet decision behind a category-defining product pivot.',
    pacing: '00:00 Specific Moment → 00:12 Mental Model → 00:35 Takeaway',
  },
  {
    id: 'reel-03',
    format: '03 · Conversational Clip',
    hook: 'What investors listen for in the first ninety seconds of a room.',
    pacing: '00:00 Direct Observation → 00:15 Case Context → 00:30 Precision Close',
  },
];

const LINKEDIN_FORMATS = [
  {
    id: 'li-thesis',
    tabLabel: 'Founder Thesis',
    title: 'Distribution is no longer a marketing function. It is a founder asset.',
    excerpt:
      'When you engineer content around real audience friction and lived operating proof, every post narrows the distance between expertise and trust.',
    signal: 'Saved by founders and operators · High-intent inbound',
  },
  {
    id: 'li-pattern',
    tabLabel: 'Pattern Essay',
    title: 'Why high-conviction ideas fail on LinkedIn before the second sentence.',
    excerpt:
      'Pattern recognition lets us preserve intellectual depth while engineering an entry point the right peer cannot scroll past.',
    signal: 'Peer dialogue · Category authority',
  },
  {
    id: 'li-pov',
    tabLabel: 'Category POV',
    title: 'Being visible in every feed is noisy. Owning one sharp thesis is memorable.',
    excerpt:
      'Consistency isn’t posting daily. Consistency is making sure the market remembers what your name stands for.',
    signal: 'Long-term recall · Advisory and partner deals',
  },
];

function InstagramLogoSvg({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInLogoSvg({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" />
      <path d="M8 10.5V16.5" strokeLinecap="round" />
      <circle cx="8" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
      <path d="M12 16.5V10.5M12 12.5C12 11.1 13.1 10.3 14.4 10.3C15.7 10.3 16.5 11.2 16.5 12.7V16.5" strokeLinecap="round" />
    </svg>
  );
}

export default function PlatformsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey>(null);
  const [activeReel, setActiveReel] = useState(0);
  const [activeLinkedIn, setActiveLinkedIn] = useState(0);

  return (
    <section
      id="growth-systems"
      className="relative border-t border-white/10 bg-[#050505]/45 py-10 sm:py-14 overflow-hidden"
    >
      {/* Subtle monochrome background grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/50 mb-2">
              03 · Platform Engineering
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.18] tracking-[-0.02em] text-white max-w-[24ch]">
              Different platforms. Different behaviours.{' '}
              <span className="font-serif-italic font-normal text-[1.08em]">
                One engineered presence.
              </span>
            </h2>
          </div>

          <p className="text-[14px] leading-[1.6] text-white/60 max-w-[44ch]">
            Select Instagram or LinkedIn to explore how we engineer growth around each platform’s
            native psychology.
          </p>
        </div>

        <div className="mt-6 sm:mt-7">
          <AnimatePresence mode="wait">
            {selectedPlatform === null && (
              <motion.div
                key="overview"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
              >
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('instagram')}
                  className="group relative text-left border border-white/12 bg-black p-5 sm:p-7 transition-all duration-200 hover:border-white/50 hover:bg-[#090909] cursor-pointer flex flex-col justify-between min-h-[185px] overflow-hidden"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 text-white">
                      <InstagramLogoSvg className="h-7 w-7 transition-transform duration-200 group-hover:scale-105" />
                      <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-white/80">
                        Instagram
                      </span>
                    </div>
                    <span className="font-mono text-[12px] text-white/45 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white">
                      Open story →
                    </span>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-[20px] sm:text-[24px] font-medium leading-[1.25] text-white">
                      Attention is earned in seconds.{' '}
                      <span className="font-serif-italic font-normal">Trust is built over time.</span>
                    </h3>
                    <p className="mt-2 text-[13.5px] text-white/60">
                      Visual storytelling · Short-form vertical reels · Shareable frameworks
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlatform('linkedin')}
                  className="group relative text-left border border-white/12 bg-black p-5 sm:p-7 transition-all duration-200 hover:border-white/50 hover:bg-[#090909] cursor-pointer flex flex-col justify-between min-h-[185px] overflow-hidden"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 text-white">
                      <LinkedInLogoSvg className="h-7 w-7 transition-transform duration-200 group-hover:scale-105" />
                      <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-white/80">
                        LinkedIn
                      </span>
                    </div>
                    <span className="font-mono text-[12px] text-white/45 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white">
                      Open story →
                    </span>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-[20px] sm:text-[24px] font-medium leading-[1.25] text-white">
                      Your expertise should travel{' '}
                      <span className="font-serif-italic font-normal">
                        further than your network.
                      </span>
                    </h3>
                    <p className="mt-2 text-[13.5px] text-white/60">
                      Founder theses · Industry intelligence · Compounding credibility
                    </p>
                  </div>
                </button>
              </motion.div>
            )}

            {selectedPlatform === 'instagram' && (
              <motion.div
                key="instagram-story"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/15 bg-black p-5 sm:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPlatform(null)}
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1 text-[12px] text-white/75 hover:border-white/50 hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back</span>
                    </button>
                    <InstagramLogoSvg className="h-5 w-5 text-white" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
                      Instagram Story
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('linkedin')}
                    className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-white/15 px-3.5 py-1 text-[12px] text-white/75 hover:border-white/50 hover:text-white cursor-pointer"
                  >
                    <LinkedInLogoSvg className="h-4 w-4" />
                    <span>Switch to LinkedIn →</span>
                  </button>
                </div>

                <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-[24px] sm:text-[28px] font-medium leading-[1.24] text-white">
                      Attention is earned in seconds.{' '}
                      <span className="font-serif-italic font-normal">
                        Trust is built over time.
                      </span>
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-white/65">
                      We engineer visual storytelling, short-form video, and audience-native content
                      that makes expertise discoverable, memorable, and shareable.
                    </p>

                    <div className="pt-2 space-y-2">
                      {REEL_SYSTEMS.map((reel, idx) => (
                        <button
                          key={reel.id}
                          type="button"
                          onClick={() => setActiveReel(idx)}
                          className={`w-full text-left border px-4 py-3 transition-colors cursor-pointer ${
                            activeReel === idx
                              ? 'border-white bg-[#101010] text-white'
                              : 'border-white/10 bg-transparent text-white/60 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                            {reel.format}
                          </span>
                          <p className="mt-1 text-[13px] line-clamp-1">{reel.hook}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
                    <div className="sm:col-span-6 border border-white/15 bg-[#070707] p-5 flex flex-col justify-between min-h-[260px]">
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                        <span>{REEL_SYSTEMS[activeReel].format}</span>
                        <span>9:16 REEL</span>
                      </div>
                      <div className="my-6 space-y-3">
                        <div className="h-px w-8 bg-[#2c86f6]" />
                        <p className="text-[16px] font-medium leading-[1.35] text-white">
                          “{REEL_SYSTEMS[activeReel].hook}”
                        </p>
                      </div>
                      <p className="font-mono text-[11px] text-white/50">
                        {REEL_SYSTEMS[activeReel].pacing}
                      </p>
                    </div>

                    <div className="sm:col-span-6 border border-white/10 bg-[#0b0b0b] p-5 flex flex-col justify-between">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                          Profile Architecture
                        </p>
                        <p className="mt-2 text-[14px] text-white/85 leading-[1.55]">
                          Every reel connects back to a cohesive profile grid designed to convert
                          curious viewers into followers who stay for your perspective.
                        </p>
                      </div>
                      <div className="mt-5 grid grid-cols-3 gap-1.5">
                        {[0, 1, 2].map((cell) => (
                          <div
                            key={cell}
                            className={`aspect-[3/4] border ${
                              activeReel === cell
                                ? 'border-white bg-[#171717]'
                                : 'border-white/10 bg-black'
                            } p-2 flex items-end`}
                          >
                            <span className="font-mono text-[9px] text-white/45">
                              0{cell + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedPlatform === 'linkedin' && (
              <motion.div
                key="linkedin-story"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/15 bg-black p-5 sm:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPlatform(null)}
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1 text-[12px] text-white/75 hover:border-white/50 hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back</span>
                    </button>
                    <LinkedInLogoSvg className="h-5 w-5 text-white" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
                      LinkedIn Story
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('instagram')}
                    className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-white/15 px-3.5 py-1 text-[12px] text-white/75 hover:border-white/50 hover:text-white cursor-pointer"
                  >
                    <InstagramLogoSvg className="h-4 w-4" />
                    <span>Switch to Instagram →</span>
                  </button>
                </div>

                <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-[24px] sm:text-[28px] font-medium leading-[1.24] text-white">
                      Your expertise should travel{' '}
                      <span className="font-serif-italic font-normal">
                        further than your network.
                      </span>
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-white/65">
                      We turn professional insight, founder perspectives, and industry intelligence
                      into thought leadership that attracts the right people and creates
                      opportunities.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {LINKEDIN_FORMATS.map((item, idx) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveLinkedIn(idx)}
                          className={`min-h-[36px] rounded-full px-3.5 py-1 text-[12px] transition-colors cursor-pointer ${
                            activeLinkedIn === idx
                              ? 'bg-white text-black font-medium'
                              : 'border border-white/15 text-white/65 hover:text-white'
                          }`}
                        >
                          {item.tabLabel}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <div className="border border-white/15 bg-[#080808] p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2c86f6]">
                        {LINKEDIN_FORMATS[activeLinkedIn].tabLabel}
                      </p>
                      <h4 className="mt-2.5 text-[18px] font-medium leading-[1.35] text-white">
                        {LINKEDIN_FORMATS[activeLinkedIn].title}
                      </h4>
                      <p className="mt-3 text-[14px] leading-[1.6] text-white/70">
                        {LINKEDIN_FORMATS[activeLinkedIn].excerpt}
                      </p>
                      <p className="mt-4 pt-3 border-t border-white/10 text-[12px] text-white/50">
                        {LINKEDIN_FORMATS[activeLinkedIn].signal}
                      </p>
                    </div>

                    <div className="border border-white/10 bg-[#0b0b0b] p-4 flex items-center justify-between gap-4">
                      <span className="text-[12px] text-white/65">
                        Compounding Authority Trajectory
                      </span>
                      <svg viewBox="0 0 180 42" className="h-9 w-36 shrink-0" aria-hidden="true">
                        <line x1="0" y1="38" x2="180" y2="38" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                        <path
                          d="M4 35 C 44 34, 78 28, 112 20 C 138 14, 158 8, 176 4"
                          fill="none"
                          stroke="rgba(255,255,255,0.85)"
                          strokeWidth="1.5"
                        />
                        <circle cx="176" cy="4" r="2.8" fill="#2c86f6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
