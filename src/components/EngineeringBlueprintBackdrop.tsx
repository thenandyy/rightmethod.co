import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

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

// Top-left concentric caliper & pinion
const TL_GEAR_OUTER = buildGearPath(140, 120, 112, 102, 34);
const TL_GEAR_INNER = buildGearPath(140, 120, 66, 58, 20);
const TL_TICKS = buildDialTicks(140, 120, 290, 120, 10);

// Bottom-left large spoked precision wheel (Z72 · M10)
const BL_GEAR = buildGearPath(340, 810, 360, 342, 72);
const BL_TICKS = buildDialTicks(340, 810, 326, 96, 8);

// Right coaxial engineering assembly
const R_DIAL_TICKS = buildDialTicks(1260, 410, 250, 108, 9);
const R_GEAR_INNER = buildGearPath(1260, 410, 126, 114, 34);

// Bottom-right meshed pinion
const BR_GEAR = buildGearPath(1120, 850, 165, 148, 32);

export default function EngineeringBlueprintBackdrop() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const subtleDriftY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Ultra-thin orthogonal blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.032) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.032) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Whisper-thin global CAD gear schematic */}
      <motion.svg
        style={prefersReducedMotion ? undefined : { y: subtleDriftY }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-[108vh] w-full opacity-[0.22] sm:opacity-[0.25]"
      >
        {/* Orthogonal datum crosshair lines */}
        <g stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" strokeDasharray="5 4">
          <line x1="140" y1="0" x2="140" y2="500" />
          <line x1="0" y1="120" x2="540" y2="120" />
          <line x1="340" y1="360" x2="340" y2="900" />
          <line x1="0" y1="620" x2="880" y2="620" />
          <line x1="1260" y1="70" x2="1260" y2="750" />
          <line x1="940" y1="410" x2="1440" y2="410" />
        </g>

        {/* TOP-LEFT ASSEMBLY: Graduated Caliper & Pinion */}
        <motion.g
          style={{ transformOrigin: '140px 120px' }}
          animate={prefersReducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="140" cy="120" r="290" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.7" />
          <circle cx="140" cy="120" r="218" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" strokeDasharray="3 4" />
          <circle cx="140" cy="120" r="174" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.65" />
          <g>
            {TL_TICKS.map((t, idx) => (
              <line
                key={`tl-t-${idx}`}
                x1={t.x1.toFixed(1)}
                y1={t.y1.toFixed(1)}
                x2={t.x2.toFixed(1)}
                y2={t.y2.toFixed(1)}
                stroke={t.major ? 'rgba(255,255,255,0.36)' : 'rgba(255,255,255,0.16)'}
                strokeWidth={t.major ? '0.8' : '0.55'}
              />
            ))}
          </g>
          <path d={TL_GEAR_OUTER} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
          <path d={TL_GEAR_INNER} fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="0.7" />
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={`tl-hole-${deg}`}
                cx={(140 + Math.cos(rad) * 38).toFixed(1)}
                cy={(120 + Math.sin(rad) * 38).toFixed(1)}
                r="10"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.6"
              />
            );
          })}
        </motion.g>

        {/* BOTTOM-LEFT ASSEMBLY: Large Z72 Spoked Gear Wheel */}
        <motion.g
          style={{ transformOrigin: '340px 810px' }}
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 190, repeat: Infinity, ease: 'linear' }}
        >
          <path d={BL_GEAR} fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="0.8" />
          <circle cx="340" cy="810" r="326" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="0.7" />
          <circle cx="340" cy="810" r="298" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.65" />
          <g>
            {BL_TICKS.map((t, idx) => (
              <line
                key={`bl-t-${idx}`}
                x1={t.x1.toFixed(1)}
                y1={t.y1.toFixed(1)}
                x2={t.x2.toFixed(1)}
                y2={t.y2.toFixed(1)}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.55"
              />
            ))}
          </g>
          {/* Radial Precision Spokes */}
          {[15, 75, 135, 195, 255, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={`bl-spoke-${deg}`}
                x1={(340 + Math.cos(rad) * 76).toFixed(1)}
                y1={(810 + Math.sin(rad) * 76).toFixed(1)}
                x2={(340 + Math.cos(rad) * 296).toFixed(1)}
                y2={(810 + Math.sin(rad) * 296).toFixed(1)}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="0.7"
              />
            );
          })}
          <circle cx="340" cy="810" r="76" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="0.75" />
        </motion.g>

        {/* RIGHT ASSEMBLY: Coaxial Precision Caliper & Inner Pinion */}
        <motion.g
          style={{ transformOrigin: '1260px 410px' }}
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 165, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="1260" cy="410" r="250" fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="0.7" />
          <circle cx="1260" cy="410" r="222" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.65" />
          <circle cx="1260" cy="410" r="188" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" strokeDasharray="2 4" />
          <g>
            {R_DIAL_TICKS.map((t, idx) => (
              <line
                key={`r-t-${idx}`}
                x1={t.x1.toFixed(1)}
                y1={t.y1.toFixed(1)}
                x2={t.x2.toFixed(1)}
                y2={t.y2.toFixed(1)}
                stroke={t.major ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.14)'}
                strokeWidth={t.major ? '0.75' : '0.55'}
              />
            ))}
          </g>
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={`r-hole-${deg}`}
                cx={(1260 + Math.cos(rad) * 168).toFixed(1)}
                cy={(410 + Math.sin(rad) * 168).toFixed(1)}
                r="14"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.6"
              />
            );
          })}
        </motion.g>

        <motion.g
          style={{ transformOrigin: '1260px 410px' }}
          animate={prefersReducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
        >
          <path d={R_GEAR_INNER} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.7" />
          <circle cx="1260" cy="410" r="64" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.65" />
          <circle cx="1260" cy="410" r="24" fill="none" stroke="rgba(44,134,246,0.35)" strokeWidth="0.7" />
        </motion.g>

        {/* BOTTOM-RIGHT ASSEMBLY: Secondary Meshed Gear */}
        <motion.g
          style={{ transformOrigin: '1120px 850px' }}
          animate={prefersReducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
        >
          <path d={BR_GEAR} fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="0.7" />
          <circle cx="1120" cy="850" r="112" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" />
          {[0, 72, 144, 216, 288].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={`br-hole-${deg}`}
                cx={(1120 + Math.cos(rad) * 74).toFixed(1)}
                cy={(850 + Math.sin(rad) * 74).toFixed(1)}
                r="18"
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="0.6"
              />
            );
          })}
        </motion.g>

        {/* Subtle Blueprint Dimension Callouts */}
        <g className="font-mono" fill="rgba(255,255,255,0.32)" fontSize="9.5" letterSpacing="0.16em">
          <polyline
            points="540,564 600,564 662,492"
            fill="none"
            stroke="rgba(255,255,255,0.24)"
            strokeWidth="0.7"
          />
          <circle cx="540" cy="564" r="2" fill="rgba(255,255,255,0.45)" />
          <text x="606" y="556">
            Z72 · M10
          </text>

          <line x1="1010" y1="138" x2="1440" y2="138" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" />
          <text x="1260" y="130" textAnchor="middle">
            Ø 420
          </text>

          <rect x="1352" y="810" width="58" height="36" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
          <text x="1381" y="802" textAnchor="middle" fontSize="8.5">
            HS-02
          </text>
        </g>
      </motion.svg>

      {/* Soft center vignette ensuring zero distraction or contrast loss over foreground copy */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_48%,rgba(0,0,0,0.45)_0%,transparent_88%)]"
      />
    </div>
  );
}
