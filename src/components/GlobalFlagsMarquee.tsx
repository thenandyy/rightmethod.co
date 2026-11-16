import { useState } from 'react';
import { X } from 'lucide-react';

interface FlagCountry {
  code: string;
  name: string;
  hub: string;
  focus: string;
}

const COUNTRIES_ROW_ONE: FlagCountry[] = [
  { code: 'IN', name: 'India', hub: 'Mumbai · Bengaluru · Delhi', focus: 'Category founders, operators & VCs' },
  { code: 'US', name: 'USA', hub: 'San Francisco · New York', focus: 'Venture-backed founders & fund partners' },
  { code: 'UK', name: 'UK', hub: 'London', focus: 'Fintech leaders, advisors & executives' },
  { code: 'AE', name: 'UAE', hub: 'Dubai · Abu Dhabi', focus: 'Global founders, investors & principals' },
  { code: 'AU', name: 'Australia', hub: 'Sydney · Melbourne', focus: 'SaaS founders, coaches & creators' },
  { code: 'SG', name: 'Singapore', hub: 'Singapore', focus: 'APAC venture leaders & operators' },
  { code: 'CA', name: 'Canada', hub: 'Toronto · Vancouver', focus: 'Tech executives & category experts' },
  { code: 'DE', name: 'Germany', hub: 'Berlin · Munich', focus: 'Deep-tech & enterprise founders' },
  { code: 'NL', name: 'Netherlands', hub: 'Amsterdam', focus: 'Product leaders & scale-up founders' },
  { code: 'CH', name: 'Switzerland', hub: 'Zurich · Geneva', focus: 'Private capital & precision founders' },
];

const COUNTRIES_ROW_TWO: FlagCountry[] = [
  { code: 'IL', name: 'Israel', hub: 'Tel Aviv', focus: 'Strong technology founders & investors' },
  { code: 'SE', name: 'Sweden', hub: 'Stockholm', focus: 'Startup founders, tech executives & VCs' },
  { code: 'FR', name: 'France', hub: 'Paris', focus: 'Founders, luxury entrepreneurs & consultants' },
  { code: 'IE', name: 'Ireland', hub: 'Dublin', focus: 'B2B founders & technology executives' },
  { code: 'DK', name: 'Denmark', hub: 'Copenhagen', focus: 'Startup leaders & consultants' },
  { code: 'ES', name: 'Spain', hub: 'Madrid · Barcelona', focus: 'Founders & creators' },
  { code: 'FI', name: 'Finland', hub: 'Helsinki', focus: 'Technology founders & startup ecosystem' },
  { code: 'JP', name: 'Japan', hub: 'Tokyo · Osaka', focus: 'Corporate leaders & entrepreneurs' },
  { code: 'KR', name: 'South Korea', hub: 'Seoul', focus: 'Founders, creators & technology companies' },
  { code: 'SA', name: 'Saudi Arabia', hub: 'Riyadh', focus: 'Visionary founders & executive leaders' },
];

const ALL_COUNTRIES = [...COUNTRIES_ROW_ONE, ...COUNTRIES_ROW_TWO];

function CountryFlag({ code, name }: { code: string; name: string }) {
  switch (code) {
    case 'IN':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="5.33" y="0" fill="#FF9933" />
          <rect width="24" height="5.34" y="5.33" fill="#FFFFFF" />
          <rect width="24" height="5.33" y="10.67" fill="#138808" />
          <circle cx="12" cy="8" r="2.1" fill="none" stroke="#000080" strokeWidth="0.45" />
          <circle cx="12" cy="8" r="0.45" fill="#000080" />
        </svg>
      );
    case 'US':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#FFFFFF" />
          <rect width="24" height="1.23" y="0" fill="#B22234" />
          <rect width="24" height="1.23" y="2.46" fill="#B22234" />
          <rect width="24" height="1.23" y="4.92" fill="#B22234" />
          <rect width="24" height="1.23" y="7.38" fill="#B22234" />
          <rect width="24" height="1.23" y="9.84" fill="#B22234" />
          <rect width="24" height="1.23" y="12.3" fill="#B22234" />
          <rect width="24" height="1.24" y="14.76" fill="#B22234" />
          <rect width="10.5" height="8.62" fill="#3C3B6E" />
          <g fill="#FFFFFF">
            <circle cx="2" cy="1.8" r="0.42" />
            <circle cx="4.5" cy="1.8" r="0.42" />
            <circle cx="7" cy="1.8" r="0.42" />
            <circle cx="9.2" cy="1.8" r="0.42" />
            <circle cx="3.2" cy="3.5" r="0.42" />
            <circle cx="5.8" cy="3.5" r="0.42" />
            <circle cx="8.2" cy="3.5" r="0.42" />
            <circle cx="2" cy="5.2" r="0.42" />
            <circle cx="4.5" cy="5.2" r="0.42" />
            <circle cx="7" cy="5.2" r="0.42" />
            <circle cx="9.2" cy="5.2" r="0.42" />
            <circle cx="3.2" cy="6.9" r="0.42" />
            <circle cx="5.8" cy="6.9" r="0.42" />
            <circle cx="8.2" cy="6.9" r="0.42" />
          </g>
        </svg>
      );
    case 'UK':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.4" />
          <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="4.4" />
          <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2.5" />
        </svg>
      );
    case 'AE':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="5.33" y="0" fill="#00732F" />
          <rect width="24" height="5.34" y="5.33" fill="#FFFFFF" />
          <rect width="24" height="5.33" y="10.67" fill="#000000" />
          <rect width="6.4" height="16" x="0" fill="#FF0000" />
        </svg>
      );
    case 'AU':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#00008B" />
          <path d="M0 0L12 8M12 0L0 8" stroke="#FFFFFF" strokeWidth="1.6" />
          <path d="M0 0L12 8M12 0L0 8" stroke="#C8102E" strokeWidth="0.7" />
          <path d="M6 0V8M0 4H12" stroke="#FFFFFF" strokeWidth="2.2" />
          <path d="M6 0V8M0 4H12" stroke="#C8102E" strokeWidth="1.2" />
          <g fill="#FFFFFF">
            <circle cx="6" cy="12" r="1.25" />
            <circle cx="18" cy="3.2" r="0.75" />
            <circle cx="15.5" cy="7" r="0.75" />
            <circle cx="20.6" cy="6.4" r="0.75" />
            <circle cx="18" cy="12.2" r="0.85" />
            <circle cx="19.8" cy="9.4" r="0.55" />
          </g>
        </svg>
      );
    case 'SG':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="8" y="0" fill="#EF3340" />
          <rect width="24" height="8" y="8" fill="#FFFFFF" />
          <circle cx="5.2" cy="4" r="2.35" fill="#FFFFFF" />
          <circle cx="6.1" cy="4" r="2.05" fill="#EF3340" />
          <g fill="#FFFFFF">
            <circle cx="7.4" cy="2.5" r="0.45" />
            <circle cx="9.1" cy="3.6" r="0.45" />
            <circle cx="8.5" cy="5.4" r="0.45" />
            <circle cx="6.4" cy="5.4" r="0.45" />
            <circle cx="5.9" cy="3.7" r="0.45" />
          </g>
        </svg>
      );
    case 'CA':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="6" height="16" x="0" fill="#FF0000" />
          <rect width="12" height="16" x="6" fill="#FFFFFF" />
          <rect width="6" height="16" x="18" fill="#FF0000" />
          <path
            d="M12 3.4L12.9 5.6L14.8 5.1L14 7.4L15.8 7.9L13.7 9.6L14.1 10.9L12.3 10.6V12.7H11.7V10.6L9.9 10.9L10.3 9.6L8.2 7.9L10 7.4L9.2 5.1L11.1 5.6Z"
            fill="#FF0000"
          />
        </svg>
      );
    case 'DE':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="5.33" y="0" fill="#000000" />
          <rect width="24" height="5.34" y="5.33" fill="#DD0000" />
          <rect width="24" height="5.33" y="10.67" fill="#FFCE00" />
        </svg>
      );
    case 'NL':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="5.33" y="0" fill="#AE1C28" />
          <rect width="24" height="5.34" y="5.33" fill="#FFFFFF" />
          <rect width="24" height="5.33" y="10.67" fill="#21468B" />
        </svg>
      );
    case 'CH':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#FF0000" />
          <rect x="10.4" y="3.2" width="3.2" height="9.6" fill="#FFFFFF" />
          <rect x="7.2" y="6.4" width="9.6" height="3.2" fill="#FFFFFF" />
        </svg>
      );
    case 'IL':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#FFFFFF" />
          <rect width="24" height="2.4" y="1.8" fill="#0038B8" />
          <rect width="24" height="2.4" y="11.8" fill="#0038B8" />
          <polygon
            points="12,4.8 14.7,9.5 9.3,9.5"
            fill="none"
            stroke="#0038B8"
            strokeWidth="0.65"
          />
          <polygon
            points="12,11.2 14.7,6.5 9.3,6.5"
            fill="none"
            stroke="#0038B8"
            strokeWidth="0.65"
          />
        </svg>
      );
    case 'SE':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#006AA7" />
          <rect x="7" y="0" width="3" height="16" fill="#FECC02" />
          <rect x="0" y="6.5" width="24" height="3" fill="#FECC02" />
        </svg>
      );
    case 'FR':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="8" height="16" x="0" fill="#0055A4" />
          <rect width="8" height="16" x="8" fill="#FFFFFF" />
          <rect width="8" height="16" x="16" fill="#EF4135" />
        </svg>
      );
    case 'IE':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="8" height="16" x="0" fill="#169B62" />
          <rect width="8" height="16" x="8" fill="#FFFFFF" />
          <rect width="8" height="16" x="16" fill="#FF883E" />
        </svg>
      );
    case 'DK':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#C60C30" />
          <rect x="7" y="0" width="2.5" height="16" fill="#FFFFFF" />
          <rect x="0" y="6.75" width="24" height="2.5" fill="#FFFFFF" />
        </svg>
      );
    case 'ES':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="4" y="0" fill="#AA151B" />
          <rect width="24" height="8" y="4" fill="#F1BF00" />
          <rect width="24" height="4" y="12" fill="#AA151B" />
          <rect x="5.5" y="6" width="2.4" height="3.8" rx="0.5" fill="#AA151B" />
          <rect x="6.1" y="6.8" width="1.2" height="2.2" fill="#F1BF00" />
        </svg>
      );
    case 'FI':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#FFFFFF" />
          <rect x="7" y="0" width="3.2" height="16" fill="#002F6C" />
          <rect x="0" y="6.4" width="24" height="3.2" fill="#002F6C" />
        </svg>
      );
    case 'JP':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#FFFFFF" />
          <circle cx="12" cy="8" r="4.2" fill="#BC002D" />
        </svg>
      );
    case 'KR':
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#FFFFFF" />
          <circle cx="12" cy="8" r="3.4" fill="#CD2E3A" />
          <path d="M8.6 8A3.4 3.4 0 0 0 15.4 8A1.7 1.7 0 0 1 12 8A1.7 1.7 0 0 0 8.6 8Z" fill="#0047A0" />
          <g stroke="#000000" strokeWidth="0.7" strokeLinecap="butt">
            <line x1="4.4" y1="4.4" x2="6.6" y2="2.6" />
            <line x1="5.2" y1="5.3" x2="7.4" y2="3.5" />
            <line x1="17.4" y1="2.6" x2="19.6" y2="4.4" />
            <line x1="16.6" y1="3.5" x2="18.8" y2="5.3" />
            <line x1="4.4" y1="11.6" x2="6.6" y2="13.4" />
            <line x1="5.2" y1="10.7" x2="7.4" y2="12.5" />
            <line x1="17.4" y1="13.4" x2="19.6" y2="11.6" />
            <line x1="16.6" y1="12.5" x2="18.8" y2="10.7" />
          </g>
        </svg>
      );
    case 'SA':
    default:
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-label={`${name} flag`}>
          <rect width="24" height="16" fill="#006C35" />
          <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
            <path d="M6.5 6.4H17.5" strokeWidth="1.2" strokeDasharray="2.2 1.2" />
            <path d="M8 4.8H16" strokeWidth="0.9" strokeDasharray="1.5 1.1" />
            <line x1="6.8" y1="10.5" x2="17.2" y2="10.5" strokeWidth="1.15" />
            <line x1="15.8" y1="9.6" x2="15.8" y2="11.4" strokeWidth="0.9" />
          </g>
        </svg>
      );
  }
}

function FlagStripRow({
  items,
  direction,
  onSelectCountry,
}: {
  items: FlagCountry[];
  direction: 'left-to-right' | 'right-to-left';
  onSelectCountry: () => void;
}) {
  // Duplicate into 4 sets (2 identical halves) for gapless looping across wide displays
  const doubled = [...items, ...items, ...items, ...items];
  const animationClass =
    direction === 'left-to-right' ? 'animate-marquee-right' : 'animate-marquee-left';

  return (
    <div className="overflow-hidden">
      <div className={`flex w-max items-center ${animationClass} hover:[animation-play-state:paused]`}>
        {doubled.map((country, idx) => (
          <button
            key={`${direction}-${country.code}-${idx}`}
            type="button"
            onClick={onSelectCountry}
            aria-hidden={idx >= items.length}
            tabIndex={idx >= items.length ? -1 : 0}
            className="group flex flex-col items-center justify-center px-3.5 sm:px-5 shrink-0 cursor-pointer focus:outline-none"
          >
            <div className="h-[14px] w-[21px] sm:h-[16px] sm:w-[24px] overflow-hidden rounded-[2px] ring-1 ring-white/20 shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:ring-white/60">
              <CountryFlag code={country.code} name={country.name} />
            </div>
            <span className="mt-1 font-mono text-[9px] sm:text-[9.5px] tracking-[0.08em] text-white/55 transition-colors group-hover:text-white whitespace-nowrap">
              {country.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface GlobalFlagsMarqueeProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function GlobalFlagsMarquee({
  open: controlledOpen,
  onOpenChange,
}: GlobalFlagsMarqueeProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const modalOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setModalOpen = (next: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  const handleExploreRightOnes = () => {
    setModalOpen(false);
    const el = document.querySelector('#the-right-ones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div
        aria-label="Global client countries served"
        className="relative w-full overflow-hidden py-1 select-none"
      >
        {/* Mobile & Tablet Label: Desktop displays this button directly beneath the hero statement */}
        <div className="mb-3 flex lg:hidden items-center justify-center">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-white/[0.03] px-3 py-1 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-white/75 transition-colors hover:border-white/50 hover:bg-white hover:text-black cursor-pointer"
          >
            <span>Read all countries’ case studies</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="relative overflow-hidden">
          {/* Left/Right edge fades blending cleanly into pure black */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-20 bg-gradient-to-r from-black to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-20 bg-gradient-to-l from-black to-transparent"
          />

          <div className="space-y-2.5 sm:space-y-3">
            {/* Layer 1: First 10 starting from India (Right to Left) */}
            <FlagStripRow
              items={COUNTRIES_ROW_ONE}
              direction="right-to-left"
              onSelectCountry={() => setModalOpen(true)}
            />
            {/* Layer 2: Second 10 (Left to Right) */}
            <FlagStripRow
              items={COUNTRIES_ROW_TWO}
              direction="left-to-right"
              onSelectCountry={() => setModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* 20-Country Case Studies Overview Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="global-case-studies-title"
        >
          <div className="w-full max-w-3xl max-h-[84vh] flex flex-col border border-white/15 bg-[#080808]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 sm:px-6 py-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  Global Presence · 20 Markets
                </p>
                <h3
                  id="global-case-studies-title"
                  className="mt-1 text-[17px] sm:text-[19px] font-medium text-white"
                >
                  Countries &amp; Founder Case Studies
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close global case studies modal"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_COUNTRIES.map((country) => (
                  <div
                    key={country.code}
                    className="flex items-start gap-3.5 border border-white/10 bg-black p-3.5"
                  >
                    <div className="mt-0.5 h-[16px] w-[24px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-white/20">
                      <CountryFlag code={country.code} name={country.name} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className="text-[14px] font-medium text-white">{country.name}</p>
                        <span className="font-mono text-[10px] text-white/45">{country.hub}</span>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-[1.45] text-white/65">
                        {country.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 sm:px-6 py-4 bg-black">
              <p className="text-[12px] text-white/50">
                Organic personal branding engineered across 20 global ecosystems.
              </p>
              <button
                type="button"
                onClick={handleExploreRightOnes}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12.5px] font-medium text-black hover:bg-[#2c86f6] hover:text-white transition-colors shrink-0 cursor-pointer"
              >
                <span>Explore client showcase</span>
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
