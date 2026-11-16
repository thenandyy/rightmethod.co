import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  AudioLines,
  Check,
  Fingerprint,
  Layers,
  Radar,
  Scissors,
  Video,
} from 'lucide-react';

const REGULAR_PRODUCTION_STEPS = [
  {
    id: 'reg-record',
    line1: 'Record',
    line2: 'the content.',
    Icon: Video,
    active: true,
    nodeLeftPct: 16.6667,
  },
  {
    id: 'reg-edit',
    line1: 'Make edits.',
    line2: '',
    Icon: Scissors,
    active: true,
    nodeLeftPct: 50,
  },
  {
    id: 'reg-done',
    line1: 'Done.',
    line2: '',
    Icon: Check,
    active: false,
    nodeLeftPct: 83.3333,
  },
] as const;

const ENGINEERED_WAVE_STEPS = [
  {
    id: 'eng-behaviour',
    step: '01',
    kicker: 'BEHAVIOURAL RESEARCH',
    line1: 'Decode human',
    line2: 'behaviour.',
    detail: 'Map psychological tensions, buyer motivations, and niche white space before ideation.',
    Icon: Radar,
    xSvg: 100,
    ySvg: 128,
    xPct: 10,
    yPct: 64,
  },
  {
    id: 'eng-voice',
    step: '02',
    kicker: 'INTELLECTUAL CAPITAL',
    line1: 'Extract capital',
    line2: '& true voice.',
    detail: 'Distill lived experience, contrarian beliefs, and your distinct worldview.',
    Icon: Fingerprint,
    xSvg: 300,
    ySvg: 148,
    xPct: 30,
    yPct: 74,
  },
  {
    id: 'eng-preprod',
    step: '03',
    kicker: 'NARRATIVE & PRE-PRODUCTION',
    line1: 'Architect story',
    line2: '& pre-production.',
    detail: 'Engineer repeatable narrative frameworks, retention hooks, and studio-ready scripts.',
    Icon: Layers,
    xSvg: 500,
    ySvg: 92,
    xPct: 50,
    yPct: 46,
  },
  {
    id: 'eng-production',
    step: '04',
    kicker: 'PRECISION PRODUCTION',
    line1: 'Direct studio',
    line2: 'production.',
    detail: 'Capture high-conviction authority assets calibrated to your natural cadence.',
    Icon: Video,
    xSvg: 700,
    ySvg: 36,
    xPct: 70,
    yPct: 18,
  },
  {
    id: 'eng-compound',
    step: '05',
    kicker: 'POST-PRODUCTION & COMPOUNDING',
    line1: 'Edit, distribute',
    line2: '& compound.',
    detail: 'Retention-led post-production, sequenced distribution, and signal feedback loops.',
    Icon: AudioLines,
    xSvg: 900,
    ySvg: 84,
    xPct: 90,
    yPct: 42,
  },
] as const;

const LEFT_TO_RIGHT_CHAIN = [
  { step: '01', label: 'Behavioural Research' },
  { step: '02', label: 'Intellectual Capital Extraction' },
  { step: '03', label: 'Voice & Positioning' },
  { step: '04', label: 'Narrative & Hook Architecture' },
  { step: '05', label: 'Pre-Production Systems' },
  { step: '06', label: 'Precision Production' },
  { step: '07', label: 'Retention Post-Production' },
  { step: '08', label: 'Compounding Distribution' },
] as const;

const ENGINEERING_WAVE_PATH =
  'M 0 106 C 33.3 113.3, 66.7 121.3, 100 128 C 166.7 141.3, 233.3 148.0, 300 148 C 366.7 148.0, 433.3 114.7, 500 92 C 566.7 69.3, 633.3 36.0, 700 36 C 766.7 36.0, 833.3 54.7, 900 84 C 933.3 92.7, 966.7 98.7, 1000 106';

interface WaveStageProps {
  gradientId: string;
  activeWaveId: string;
  prefersReducedMotion: boolean | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  duplicateAriaHidden?: boolean;
}

function WaveStage({
  gradientId,
  activeWaveId,
  prefersReducedMotion,
  onSelect,
  onHover,
  duplicateAriaHidden = false,
}: WaveStageProps) {
  return (
    <div aria-hidden={duplicateAriaHidden || undefined}>
      {/* Wave SVG + Vertical Dashed Drop Lines + Glowing HTML Nodes */}
      <div className="relative w-full h-[155px] sm:h-[188px]">
        <svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="block h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.98)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.45)" />
            </linearGradient>
          </defs>

          {/* Vertical dashed guide lines from each wave node down to the icon ring */}
          {ENGINEERED_WAVE_STEPS.map((step) => {
            const isActive = activeWaveId === step.id;
            return (
              <line
                key={`${step.id}-drop`}
                x1={step.xSvg}
                y1={step.ySvg}
                x2={step.xSvg}
                y2={200}
                stroke={isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.18)'}
                strokeWidth={isActive ? '1.3' : '1'}
                strokeDasharray="2.5 3"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {/* Subtle soft glow halo beneath the wave */}
          <path
            d={ENGINEERING_WAVE_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="6"
            vectorEffect="non-scaling-stroke"
          />

          {/* Main continuous Content Engineering™ trajectory curve */}
          <path
            d={ENGINEERING_WAVE_PATH}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />

          {/* Continuous animated beam moving left-to-right along the curve */}
          {!prefersReducedMotion && (
            <motion.path
              d={ENGINEERING_WAVE_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.98)"
              strokeWidth="2.3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="110 930"
              animate={{ strokeDashoffset: [0, -1040] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </svg>

        {/* Perfectly circular glowing HTML anchor dots synced to exact SVG coordinates */}
        {ENGINEERED_WAVE_STEPS.map((step) => {
          const isActive = activeWaveId === step.id;
          return (
            <span
              key={`${step.id}-dot`}
              aria-hidden="true"
              style={{ left: `${step.xPct}%`, top: `${step.yPct}%` }}
              className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white transition-shadow duration-200 ${
                isActive
                  ? 'shadow-[0_0_16px_4px_rgba(255,255,255,0.95)]'
                  : 'shadow-[0_0_10px_2px_rgba(255,255,255,0.6)]'
              }`}
            />
          );
        })}
      </div>

      {/* Bottom 5-Column Aligned Icons & Labels */}
      <div className="grid grid-cols-5 items-start mt-1">
        {ENGINEERED_WAVE_STEPS.map((step) => {
          const Icon = step.Icon;
          const isActive = activeWaveId === step.id;
          return (
            <button
              key={step.id}
              type="button"
              tabIndex={duplicateAriaHidden ? -1 : 0}
              onClick={() => onSelect(step.id)}
              onMouseEnter={() => onHover(step.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(step.id)}
              onBlur={() => onHover(null)}
              className="group flex flex-col items-center text-center px-1.5 cursor-pointer focus:outline-none"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 ${
                  isActive
                    ? 'border-white/60 bg-white/10 text-white'
                    : 'border-white/15 bg-white/[0.03] text-white/75 group-hover:border-white/40 group-hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 stroke-[1.5]" aria-hidden="true" />
              </div>
              <p
                className={`mt-3 min-h-[2.7em] text-[12px] sm:text-[12.5px] leading-[1.35] font-medium transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/75 group-hover:text-white'
                }`}
              >
                <span className="block">{step.line1}</span>
                {step.line2 && <span className="block">{step.line2}</span>}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Generates crisp trapezoidal CAD gear tooth geometry centered at (cx, cy). */
function buildGearPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  teeth: number
): string {
  const step = (Math.PI * 2) / teeth;
  const pts: string[] = [];

  for (let i = 0; i < teeth; i++) {
    const base = i * step;
    const angles = [
      { a: base + step * 0.08, r: innerR },
      { a: base + step * 0.22, r: outerR },
      { a: base + step * 0.48, r: outerR },
      { a: base + step * 0.62, r: innerR },
    ];
    angles.forEach((pt, idx) => {
      const x = cx + Math.cos(pt.a) * pt.r;
      const y = cy + Math.sin(pt.a) * pt.r;
      pts.push(`${i === 0 && idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    });
  }

  return `${pts.join(' ')} Z`;
}

/** Generates radial graduated dial tick segments around (cx, cy). */
function buildDialTicks(
  cx: number,
  cy: number,
  radius: number,
  count: number,
  majorEvery: number
): Array<{ x1: number; y1: number; x2: number; y2: number; major: boolean }> {
  const ticks: Array<{ x1: number; y1: number; x2: number; y2: number; major: boolean }> = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const major = i % majorEvery === 0;
    const inner = radius - (major ? 10 : 5);
    ticks.push({
      x1: cx + Math.cos(angle) * inner,
      y1: cy + Math.sin(angle) * inner,
      x2: cx + Math.cos(angle) * radius,
      y2: cy + Math.sin(angle) * radius,
      major,
    });
  }
  return ticks;
}

const PRIMARY_GEAR_OUTER = buildGearPath(820, 220, 152, 140, 44);
const PRIMARY_GEAR_INNER = buildGearPath(820, 220, 96, 86, 26);
const PRIMARY_DIAL_TICKS = buildDialTicks(820, 220, 206, 96, 8);

const SECONDARY_GEAR_PATH = buildGearPath(410, 108, 104, 93, 32);
const SECONDARY_DIAL_TICKS = buildDialTicks(410, 108, 132, 60, 5);

const TERTIARY_GEAR_PATH = buildGearPath(150, 390, 156, 143, 46);
const TERTIARY_DIAL_TICKS = buildDialTicks(150, 390, 192, 72, 6);

export default function ContentEngineeringSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedStepId, setSelectedStepId] = useState<string>(ENGINEERED_WAVE_STEPS[0].id);
  const [hoveredStepId, setHoveredStepId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const activeWaveId = hoveredStepId ?? selectedStepId;
  const activeWaveStep =
    ENGINEERED_WAVE_STEPS.find((step) => step.id === activeWaveId) ?? ENGINEERED_WAVE_STEPS[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const blueprintShiftX = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section
      ref={sectionRef}
      id="content-engineering"
      className="relative border-t border-white/10 bg-[#050505]/45 py-10 sm:py-14 overflow-hidden"
    >
      {/* Running CAD Engineering Gears & Blueprint System Visuals */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[440px] sm:h-[490px] overflow-hidden select-none"
        style={{
          maskImage: 'linear-gradient(to bottom, black 68%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 68%, transparent 100%)',
        }}
      >
        <motion.svg
          style={prefersReducedMotion ? undefined : { x: blueprintShiftX }}
          viewBox="0 0 1200 480"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full opacity-75 sm:opacity-85"
        >
          {/* Orthogonal Blueprint Datum Axis Lines */}
          <g stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" strokeDasharray="4 4">
            <line x1="0" y1="220" x2="1200" y2="220" />
            <line x1="820" y1="0" x2="820" y2="480" />
            <line x1="410" y1="0" x2="410" y2="340" />
          </g>

          {/* ASSEMBLY 1: Primary Calibrated Engineering Dial & Concentric Gear System (Right/Center) */}
          <motion.g
            style={{ transformOrigin: '820px 220px' }}
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 84, repeat: Infinity, ease: 'linear' }}
          >
            {/* Outer Precision Caliper Rings */}
            <circle
              cx="820"
              cy="220"
              r="214"
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="0.9"
            />
            <circle
              cx="820"
              cy="220"
              r="206"
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1"
            />
            <circle
              cx="820"
              cy="220"
              r="182"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.8"
              strokeDasharray="3 5"
            />

            {/* Radial Graduated Degree Ticks */}
            <g>
              {PRIMARY_DIAL_TICKS.map((t, idx) => (
                <line
                  key={`p-tick-${idx}`}
                  x1={t.x1.toFixed(1)}
                  y1={t.y1.toFixed(1)}
                  x2={t.x2.toFixed(1)}
                  y2={t.y2.toFixed(1)}
                  stroke={t.major ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.18)'}
                  strokeWidth={t.major ? '1.1' : '0.75'}
                />
              ))}
            </g>

            {/* Primary Toothed Gear Wheel */}
            <path
              d={PRIMARY_GEAR_OUTER}
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.05"
            />
            <circle
              cx="820"
              cy="220"
              r="128"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.9"
            />

            {/* Symmetric Bearing Cutouts */}
            {[0, 90, 180, 270].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const bx = 820 + Math.cos(rad) * 112;
              const by = 220 + Math.sin(rad) * 112;
              return (
                <circle
                  key={`hole-${deg}`}
                  cx={bx.toFixed(1)}
                  cy={by.toFixed(1)}
                  r="11"
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.85"
                />
              );
            })}
          </motion.g>

          {/* Counter-Rotating Inner Pinion inside Primary Assembly */}
          <motion.g
            style={{ transformOrigin: '820px 220px' }}
            animate={prefersReducedMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          >
            <path
              d={PRIMARY_GEAR_INNER}
              fill="none"
              stroke="rgba(255,255,255,0.34)"
              strokeWidth="1.05"
            />
            <circle
              cx="820"
              cy="220"
              r="62"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.9"
            />
            <circle
              cx="820"
              cy="220"
              r="28"
              fill="none"
              stroke="rgba(44,134,246,0.5)"
              strokeWidth="1"
            />
            <line x1="782" y1="220" x2="858" y2="220" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
            <line x1="820" y1="182" x2="820" y2="258" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
          </motion.g>

          {/* ASSEMBLY 2: Upper-Left Meshed Pinion Gear */}
          <motion.g
            style={{ transformOrigin: '410px 108px' }}
            animate={prefersReducedMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="410"
              cy="108"
              r="138"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.8"
              strokeDasharray="2 5"
            />
            <g>
              {SECONDARY_DIAL_TICKS.map((t, idx) => (
                <line
                  key={`s-tick-${idx}`}
                  x1={t.x1.toFixed(1)}
                  y1={t.y1.toFixed(1)}
                  x2={t.x2.toFixed(1)}
                  y2={t.y2.toFixed(1)}
                  stroke={t.major ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)'}
                  strokeWidth="0.75"
                />
              ))}
            </g>
            <path
              d={SECONDARY_GEAR_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.24)"
              strokeWidth="0.95"
            />
            <circle
              cx="410"
              cy="108"
              r="68"
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="0.85"
            />
            {[0, 72, 144, 216, 288].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const bx = 410 + Math.cos(rad) * 48;
              const by = 108 + Math.sin(rad) * 48;
              return (
                <circle
                  key={`sec-hole-${deg}`}
                  cx={bx.toFixed(1)}
                  cy={by.toFixed(1)}
                  r="9"
                  fill="none"
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth="0.8"
                />
              );
            })}
            <circle
              cx="410"
              cy="108"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.24)"
              strokeWidth="0.9"
            />
          </motion.g>

          {/* ASSEMBLY 3: Lower-Left Partial Precision Wheel */}
          <motion.g
            style={{ transformOrigin: '150px 390px' }}
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 76, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="150"
              cy="390"
              r="196"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.9"
            />
            <g>
              {TERTIARY_DIAL_TICKS.map((t, idx) => (
                <line
                  key={`t-tick-${idx}`}
                  x1={t.x1.toFixed(1)}
                  y1={t.y1.toFixed(1)}
                  x2={t.x2.toFixed(1)}
                  y2={t.y2.toFixed(1)}
                  stroke={t.major ? 'rgba(255,255,255,0.34)' : 'rgba(255,255,255,0.14)'}
                  strokeWidth="0.8"
                />
              ))}
            </g>
            <path
              d={TERTIARY_GEAR_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
            />
            <circle
              cx="150"
              cy="390"
              r="116"
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="0.85"
            />
          </motion.g>

          {/* CAD Dimension Callout Annotations (Monospace Blueprint Leaders) */}
          <g className="font-mono" fill="rgba(255,255,255,0.42)" fontSize="9.5" letterSpacing="0.14em">
            {/* Callout 1: Z44 · M10 */}
            <polyline
              points="550,248 592,248 622,220"
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="0.85"
            />
            <circle cx="622" cy="220" r="2.2" fill="rgba(255,255,255,0.55)" />
            <rect
              x="472"
              y="238"
              width="76"
              height="20"
              fill="#050505"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.8"
            />
            <text x="510" y="251.5" textAnchor="middle">
              Z44 · M10
            </text>

            {/* Callout 2: SYS 4.9 */}
            <polyline
              points="1008,82 1044,82 1068,108"
              fill="none"
              stroke="rgba(255,255,255,0.26)"
              strokeWidth="0.85"
            />
            <circle cx="1068" cy="108" r="2.2" fill="rgba(44,134,246,0.8)" />
            <rect
              x="958"
              y="72"
              width="50"
              height="20"
              fill="#050505"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.8"
            />
            <text x="983" y="85.5" textAnchor="middle">
              4.9
            </text>
          </g>
        </motion.svg>

        {/* Subtle Left-Side Readability Scrim Over Blueprint Gears */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#050505]/45 to-transparent"
        />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Main Editorial Stage Layered Cleanly Over Blueprint Gears */}
        <div className="relative py-2 sm:py-4">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-[680px]"
          >
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/55 mb-3">
              01 · What is Content Engineering™?
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.2] tracking-[-0.02em] text-white max-w-[26ch]">
              We don’t just shape narratives. We take ownership of how they’re{' '}
              <span className="font-serif-italic font-normal text-[1.08em]">
                built, distributed and remembered.
              </span>
            </h2>

            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/80 max-w-[58ch]">
              Content Engineering™ is the process of decoding an individual’s intellectual capital,
              their lived experiences, contrarian beliefs, expertise and unique way of seeing the
              world, and engineering it into a distinctive narrative that travels beyond their
              immediate network.
            </p>

            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
              India to Global Distribution
            </p>
          </motion.div>
        </div>

        {/* Two-Card Comparison Visual: Regular Content Production vs Content Engineering™ */}
        <div className="relative z-10 mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.72fr)] gap-4 sm:gap-5 items-stretch">
          {/* LEFT CARD: Regular Content Production (Linear Flat Drop-Off) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[14px] sm:rounded-[16px] border border-white/[0.09] bg-gradient-to-b from-[#171717]/95 via-[#0d0d0d]/95 to-[#070707]/95 pt-6 sm:pt-7 pb-6 sm:pb-8 backdrop-blur-[2px]"
          >
            {/* Subtle corner dot-matrix shading */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 0.75px, transparent 0.75px)',
                backgroundSize: '10px 10px',
                maskImage: 'radial-gradient(ellipse 80% 70% at 85% 95%, black 10%, transparent 75%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 80% 70% at 85% 95%, black 10%, transparent 75%)',
              }}
            />

            <div className="relative z-10 px-6 sm:px-7">
              <h3 className="text-[19px] sm:text-[22px] font-medium tracking-[-0.02em] text-white">
                Regular Content Production
              </h3>
            </div>

            <div className="relative z-10 mt-8 sm:mt-12 flex flex-col justify-end">
              {/* Flat Linear Horizon + 3 Nodes */}
              <div className="relative h-[84px] sm:h-[112px] w-full overflow-hidden">
                <svg
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  {/* Base horizontal hairline */}
                  <line
                    x1="0"
                    y1="10"
                    x2="300"
                    y2="10"
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* Subtle active connecting glow between step 1 and step 2 */}
                  <line
                    x1="50"
                    y1="10"
                    x2="150"
                    y2="10"
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth="1.4"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* Continuous animated horizontal light beam traveling left-to-right */}
                  {!prefersReducedMotion && (
                    <>
                      <motion.line
                        x1="0"
                        y1="10"
                        x2="300"
                        y2="10"
                        stroke="rgba(255,255,255,0.22)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        strokeDasharray="65 280"
                        animate={{ strokeDashoffset: [0, -345] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.line
                        x1="0"
                        y1="10"
                        x2="300"
                        y2="10"
                        stroke="rgba(255,255,255,0.96)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        strokeDasharray="65 280"
                        animate={{ strokeDashoffset: [0, -345] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                      />
                    </>
                  )}
                </svg>

                {REGULAR_PRODUCTION_STEPS.map((step, idx) => (
                  <span
                    key={`${step.id}-dot`}
                    aria-hidden="true"
                    style={{ left: `${step.nodeLeftPct}%` }}
                    className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      idx === 0
                        ? 'h-2.5 w-2.5 bg-white shadow-[0_0_12px_2px_rgba(255,255,255,0.8)]'
                        : idx === 1
                          ? 'h-2 w-2 bg-white/85 shadow-[0_0_8px_1px_rgba(255,255,255,0.45)]'
                          : 'h-2 w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              {/* Bottom 3-step Icons & Labels */}
              <div className="grid grid-cols-3 px-3 sm:px-5 mt-1">
                {REGULAR_PRODUCTION_STEPS.map((step) => {
                  const Icon = step.Icon;
                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center text-center px-1"
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                          step.active
                            ? 'border-white/15 bg-white/[0.03] text-white/75'
                            : 'border-white/10 bg-white/[0.015] text-white/35'
                        }`}
                      >
                        <Icon className="h-4 w-4 stroke-[1.5]" aria-hidden="true" />
                      </div>
                      <p
                        className={`mt-3 text-[12px] sm:text-[13.5px] leading-[1.35] font-medium ${
                          step.active ? 'text-white/90' : 'text-white/40 font-normal'
                        }`}
                      >
                        <span className="block">{step.line1}</span>
                        {step.line2 && <span className="block">{step.line2}</span>}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* RIGHT CARD: Content Engineering™ (Flowing 5-Node System Wave) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[14px] sm:rounded-[16px] border border-white/[0.09] bg-gradient-to-b from-[#171717]/95 via-[#0d0d0d]/95 to-[#070707]/95 pt-6 sm:pt-7 pb-6 sm:pb-8 backdrop-blur-[2px]"
          >
            {/* Subtle Radial Atmospheric Depth Orbs */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-8 left-[6%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
              <div className="absolute top-2 right-[8%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.055)_0%,transparent_70%)]" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 0.75px, transparent 0.75px)',
                  backgroundSize: '10px 10px',
                  maskImage: 'radial-gradient(ellipse 75% 65% at 50% 95%, black 10%, transparent 75%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 75% 65% at 50% 95%, black 10%, transparent 75%)',
                }}
              />
            </div>

            <div className="relative z-10 px-6 sm:px-8 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[19px] sm:text-[22px] font-medium tracking-[-0.02em] text-white">
                Content Engineering
                <sup className="ml-0.5 text-[0.52em] font-normal text-white/75 align-super">™</sup>
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                Intellectual Capital → Narrative → Distribution
              </span>
            </div>

            {/* Mobile Only (< sm): Auto-gliding continuously to the right side with zero scrollbar */}
            <div className="relative z-10 mt-2 overflow-hidden sm:hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-20 w-7 bg-gradient-to-r from-[#0d0d0d] to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-20 w-7 bg-gradient-to-l from-[#0d0d0d] to-transparent"
              />
              <div className="flex w-max animate-ce-wave-right hover:[animation-play-state:paused]">
                {[0, 1].map((dup) => (
                  <div key={dup} className="w-[560px] shrink-0">
                    <WaveStage
                      gradientId={`ce-wave-grad-mob-${dup}`}
                      activeWaveId={activeWaveId}
                      prefersReducedMotion={prefersReducedMotion}
                      onSelect={setSelectedStepId}
                      onHover={setHoveredStepId}
                      duplicateAriaHidden={dup > 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tablet & Desktop (sm+): Static full-width edge-to-edge wave stage */}
            <div className="relative z-10 mt-3 hidden sm:block">
              <WaveStage
                gradientId="ce-wave-grad-desktop"
                activeWaveId={activeWaveId}
                prefersReducedMotion={prefersReducedMotion}
                onSelect={setSelectedStepId}
                onHover={setHoveredStepId}
              />
            </div>

            {/* Static Fixed-Height Process Readout inside Content Engineering™ Card */}
            <div className="relative z-10 mx-6 sm:mx-8 mt-4 pt-3.5 border-t border-white/[0.08] h-[72px] sm:h-[60px] flex flex-col justify-center overflow-hidden">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2c86f6] truncate">
                {activeWaveStep.step} · {activeWaveStep.kicker}
              </p>
              <p className="mt-1 text-[12.5px] leading-[1.4] text-white/70 line-clamp-2">
                {activeWaveStep.detail}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Continuous Right-to-Left Moving Production & Strategy Pipeline Track */}
        <div
          aria-label="Content Engineering right-to-left system sequence: Behavioural Research, Intellectual Capital Extraction, Voice and Positioning, Narrative and Hook Architecture, Pre-Production Systems, Precision Production, Retention Post-Production, Compounding Distribution"
          className="relative z-10 mt-6 overflow-hidden border-y border-white/10 bg-black/60 py-3.5"
        >
          {/* Right-to-left traveling hairline light beam */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              animate={{ x: ['125%', '-25%'] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
              className="pointer-events-none absolute top-0 left-0 h-px w-48 bg-gradient-to-r from-transparent via-[#2c86f6] to-transparent"
            />
          )}

          <div className="relative z-10 flex w-max animate-marquee-left hover:[animation-play-state:paused]">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center shrink-0">
                {LEFT_TO_RIGHT_CHAIN.map((item) => (
                  <div key={`${dup}-${item.step}`} className="flex items-center shrink-0">
                    <div className="flex items-center gap-2.5 px-2">
                      <span className="font-mono text-[10px] tracking-[0.12em] text-[#2c86f6] tabular-nums">
                        {item.step}
                      </span>
                      <span className="text-[13px] sm:text-[14px] font-medium tracking-[-0.01em] text-white/90 whitespace-nowrap">
                        {item.label}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mx-3 sm:mx-4 font-mono text-[11px] text-white/25 select-none"
                    >
                      →
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Edge fades */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 sm:w-16 bg-gradient-to-r from-[#050505] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 sm:w-16 bg-gradient-to-l from-[#050505] to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
