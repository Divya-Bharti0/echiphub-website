import React, { JSX } from 'react'

const GRADS = (id: string) => (
  <defs>
    <linearGradient id={`${id}-pkg`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#3b4a63" />
      <stop offset="45%" stopColor="#243247" />
      <stop offset="100%" stopColor="#141d2e" />
    </linearGradient>
    <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#5a6b86" />
      <stop offset="50%" stopColor="#3d4d68" />
      <stop offset="100%" stopColor="#2a3850" />
    </linearGradient>
    <linearGradient id={`${id}-die`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#7dd3fc" />
      <stop offset="45%" stopColor="#2254C4" />
      <stop offset="100%" stopColor="#4c1d95" />
    </linearGradient>
    <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#fde68a" />
      <stop offset="50%" stopColor="#eab308" />
      <stop offset="100%" stopColor="#a16207" />
    </linearGradient>
    <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
    </linearGradient>
    <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#29abe2" stopOpacity="0.55" />
      <stop offset="100%" stopColor="#29abe2" stopOpacity="0" />
    </radialGradient>
    <filter id={`${id}-shadow`} x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f2350" floodOpacity="0.28" />
    </filter>
  </defs>
)

/* Isometric helpers ------------------------------------------------ */
const iso = (x: number, y: number, z: number = 0): [number, number] => [100 + (x - y) * 0.866, 96 + (x + y) * 0.5 - z]
const pts = (arr: [number, number][]): string => arr.map(p => p.join(',')).join(' ')

interface PackageProps {
  id: string
  dieDetail: React.ReactNode
  accent?: string
}

function Package({ id, dieDetail, accent = '#29abe2' }: PackageProps) {
  const S = 34          // half-width of package
  const H = 9           // package thickness
  const top: [number, number][] = [iso(-S, -S), iso(S, -S), iso(S, S), iso(-S, S)]
  const leftF: [number, number][] = [iso(-S, S), iso(S, S), iso(S, S, -H), iso(-S, S, -H)]
  const rightF: [number, number][] = [iso(S, -S), iso(S, S), iso(S, S, -H), iso(S, -S, -H)]

  // gold pins along two visible edges
  const pins = []
  for (let i = -3; i <= 3; i++) {
    const o = i * 9
    pins.push({ a: iso(o - 2.6, S), b: iso(o + 2.6, S), depth: H })
    pins.push({ a: iso(S, o - 2.6), b: iso(S, o + 2.6), depth: H, right: true })
  }

  return (
    <g filter={`url(#${id}-shadow)`}>
      {/* pins */}
      {pins.map((p, i) => (
        <polygon
          key={i}
          points={pts([p.a, p.b, [p.b[0], p.b[1] + 7], [p.a[0], p.a[1] + 7]])}
          fill={`url(#${id}-gold)`}
          opacity="0.95"
        />
      ))}
      {/* side faces */}
      <polygon points={pts(leftF)} fill={`url(#${id}-pkg)`} />
      <polygon points={pts(rightF)} fill={`url(#${id}-pkg)`} opacity="0.82" />
      {/* top face */}
      <polygon points={pts(top)} fill={`url(#${id}-top)`} />
      {/* silicon die */}
      <polygon
        points={pts([iso(-19, -19), iso(19, -19), iso(19, 19), iso(-19, 19)])}
        fill={`url(#${id}-die)`}
        opacity="0.94"
      />
      {/* die detail */}
      <g opacity="0.85">{dieDetail}</g>
      {/* glass highlight */}
      <polygon points={pts(top)} fill={`url(#${id}-glass)`} opacity="0.45" />
      {/* corner index dot */}
      <circle {...(() => { const [cx, cy] = iso(-26, -26); return { cx, cy } })()} r="2.6" fill={accent} opacity="0.9" />
    </g>
  )
}

/* Per-course die artwork ------------------------------------------- */
function dieRTL() {
  const lines = []
  for (let i = -2; i <= 2; i++) {
    lines.push(
      <polyline key={`h${i}`} points={pts([iso(-16, i * 7), iso(4, i * 7), iso(4, i * 7 + 4), iso(16, i * 7 + 4)])}
        fill="none" stroke="#e0f2fe" strokeWidth="1.1" strokeOpacity="0.85" />
    )
  }
  return <>{lines}</>
}

function dieOpenLane() {
  const cells = []
  for (let r = -2; r <= 2; r++) for (let c = -2; c <= 2; c++) {
    if ((r + c) % 2 !== 0) continue
    cells.push(
      <polygon key={`${r}${c}`}
        points={pts([iso(r * 7 - 2.6, c * 7 - 2.6), iso(r * 7 + 2.6, c * 7 - 2.6), iso(r * 7 + 2.6, c * 7 + 2.6), iso(r * 7 - 2.6, c * 7 + 2.6)])}
        fill="#e0f2fe" fillOpacity="0.55" stroke="#bae6fd" strokeWidth="0.5" />
    )
  }
  return <>{cells}</>
}

function dieRISCV() {
  return (
    <>
      {[-8, 0, 8].map((o, i) => (
        <polygon key={i}
          points={pts([iso(-15, o - 2.4), iso(15, o - 2.4), iso(15, o + 2.4), iso(-15, o + 2.4)])}
          fill="#e0f2fe" fillOpacity={0.35 + i * 0.18} stroke="#bae6fd" strokeWidth="0.5" />
      ))}
      <polygon points={pts([iso(-5, -13), iso(5, -13), iso(5, 13), iso(-5, 13)])}
        fill="#fde68a" fillOpacity="0.5" stroke="#fcd34d" strokeWidth="0.6" />
    </>
  )
}

function dieAnalog() {
  const wave: [number, number][] = []
  for (let i = -16; i <= 16; i += 1.6) {
    wave.push(iso(i, Math.sin(i / 4) * 8))
  }
  return (
    <>
      <polyline points={pts(wave)} fill="none" stroke="#fde68a" strokeWidth="1.6" strokeLinecap="round" />
      <polyline points={pts([iso(-16, 13), iso(16, 13)])} fill="none" stroke="#e0f2fe" strokeWidth="0.8" strokeOpacity="0.7" />
      {[-10, 0, 10].map((o, i) => (
        <circle key={i} {...(() => { const [cx, cy] = iso(o, -13); return { cx, cy } })()} r="2" fill="#e0f2fe" fillOpacity="0.8" />
      ))}
    </>
  )
}

function dieTiming() {
  return (
    <>
      <polyline
        points={pts([iso(-16, 6), iso(-8, 6), iso(-8, -6), iso(0, -6), iso(0, 6), iso(8, 6), iso(8, -6), iso(16, -6)])}
        fill="none" stroke="#e0f2fe" strokeWidth="1.4" strokeLinejoin="round" />
      <polyline points={pts([iso(-16, 14), iso(16, 14)])} fill="none" stroke="#fde68a" strokeWidth="1" strokeDasharray="3 3" />
    </>
  )
}

function dieGDS() {
  const rings = [16, 11, 6]
  return (
    <>
      {rings.map((r, i) => (
        <polygon key={i}
          points={pts([iso(-r, -r), iso(r, -r), iso(r, r), iso(-r, r)])}
          fill="none" stroke={i === 0 ? '#fde68a' : '#e0f2fe'} strokeWidth="1" strokeOpacity="0.8" />
      ))}
      <circle {...(() => { const [cx, cy] = iso(0, 0); return { cx, cy } })()} r="3" fill="#fde68a" />
    </>
  )
}

const DIE: Record<string, () => JSX.Element> = {
  rtl: dieRTL, openlane: dieOpenLane, riscv: dieRISCV,
  analog: dieAnalog, timing: dieTiming, gds: dieGDS,
}

interface ChipGraphicProps {
  kind?: string
  className?: string
  id?: string
}

export default function ChipGraphic({ kind = 'rtl', className = '', id }: ChipGraphicProps) {
  const uid = id || `cg-${kind}`
  const Die = DIE[kind] || dieRTL
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`${kind} semiconductor illustration`}>
      {GRADS(uid)}
      <ellipse cx="100" cy="108" rx="62" ry="30" fill={`url(#${uid}-glow)`} />
      <Package id={uid} dieDetail={<Die />} />
    </svg>
  )
}

interface MiniIconProps {
  kind: string
  className?: string
}

export function MiniIcon({ kind, className = 'w-7 h-7' }: MiniIconProps) {
  const common: React.SVGProps<SVGSVGElement> = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
  };
  const paths: Record<string, JSX.Element> = {
    users:   <><path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 20v-2a4 4 0 0 0-3.87-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    badge:   <><circle cx="12" cy="8" r="6" /><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" /></>,
    deck:    <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 20h8M12 18v2" /></>,
    clock:   <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    live:    <><circle cx="12" cy="12" r="3" /><path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" /></>,
    check:   <><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 4.5-5" /></>,
    courses: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M8 7h8M8 11h6" /></>,
    experts: <><circle cx="12" cy="7" r="4" /><path d="M5.5 21a6.5 6.5 0 0 1 13 0" /><path d="M18 4.5 19.5 3M20 8h2" /></>,
    centers: <><path d="M12 21s-7-5.2-7-11a7 7 0 1 1 14 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
    workshops: <><rect x="2.5" y="5" width="19" height="12" rx="2" /><path d="M8 21h8M12 17v4" /><path d="m10 9 4 2-4 2z" /></>,
    labs:    <><path d="M9 3v6.2L4.5 17A2 2 0 0 0 6.2 20h11.6a2 2 0 0 0 1.7-3L15 9.2V3" /><path d="M8 3h8M7.5 14h9" /></>,
  }
  return <svg className={className} {...common}>{paths[kind] || paths.check}</svg>
}
