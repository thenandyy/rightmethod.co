import { SITE_CONFIG, SPECIALIST_TEAM } from '../data/rightmethodData';

export default function TeamSection() {
  const marqueeRoles = [...SPECIALIST_TEAM, ...SPECIALIST_TEAM];

  return (
    <section
      id="team"
      className="relative border-t border-white/10 bg-[#050505]/45 py-10 sm:py-14 overflow-hidden"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Header Split: Senior Specialist Credibility */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/55 mb-2">
              09 · The Minds Behind It
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.16] tracking-[-0.02em] text-white max-w-[24ch]">
              Creative minds. Extraordinary thinkers.{' '}
              <span className="font-serif-italic font-normal text-[1.08em]">
                4–5+ years of industry specialists.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-white/75">
              Every personal brand we engineer is backed by a dedicated bench of seasoned
              researchers, writers, directors, and editors who have spent years shaping voices at
              the highest level.
            </p>
          </div>
        </div>
      </div>

      {/* Single-Line Right-to-Left Moving Roles Marquee */}
      <div className="relative mt-6 sm:mt-8 border-y border-white/10 bg-black overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-20 bg-gradient-to-r from-[#050505] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-20 bg-gradient-to-l from-[#050505] to-transparent"
        />

        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
          {marqueeRoles.map((member, idx) => (
            <div
              key={`${member.index}-${idx}`}
              aria-hidden={idx >= SPECIALIST_TEAM.length}
              className="w-[240px] sm:w-[270px] shrink-0 border-r border-white/10 px-5 py-5 flex flex-col justify-center transition-colors duration-200 hover:bg-[#0c0c0c]"
            >
              <h3 className="text-[15px] sm:text-[16px] font-medium leading-[1.3] text-white whitespace-nowrap">
                {member.roleTitle}
              </h3>
              <p className="mt-1.5 text-[12px] leading-[1.45] text-white/55">
                {member.craftFocus}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Understated One-Line Talent Invite */}
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <div className="mt-5 flex flex-wrap items-center gap-3 text-[13.5px] text-white/65">
          <p>
            Want to be part of it? Write us your story{' '}
            <span aria-hidden="true" className="mx-1 text-white/35">
              →
            </span>
            <a
              href={`mailto:${SITE_CONFIG.careersEmail}?subject=My%20Story%20%E2%80%94%20RIGHTMETHOD`}
              className="font-mono text-[13px] text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-[#2c86f6] hover:decoration-[#2c86f6]"
            >
              {SITE_CONFIG.careersEmail}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
