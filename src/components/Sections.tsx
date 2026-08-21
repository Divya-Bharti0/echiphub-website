import { useEffect, useRef, useState, MouseEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS, HIGHLIGHTS, LIFECYCLE, PROGRAMS, PARTNERS, GALLERY } from '../lib/courseData'
import ChipGraphic, { MiniIcon } from './ChipGraphic'
import { useDeviceTier } from '../hooks/useDeviceTier'

interface HeadingProps {
  eyebrow: string
  title: string
  sub?: string
  light?: boolean
}

/* ───────── shared heading ───────── */
export function Heading({ eyebrow, title, sub, light }: HeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55 }}
      className="text-center max-w-[640px] mx-auto mb-14"
    >
      <p className="eyebrow mb-3" style={light ? { color: '#7dd3fc' } : undefined}>{eyebrow}</p>
      <h2 className="h2" style={light ? { color: '#fff' } : undefined}>{title}</h2>
      {sub && <p className={`mt-4 text-[17px] leading-relaxed ${light ? 'text-white/70' : 'text-[#64748b]'}`}>{sub}</p>}
    </motion.div>
  )
}

interface CounterProps { to: number; suffix: string }

/* ───────── 1. Statistics ───────── */
function Counter({ to, suffix }: CounterProps) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [v, setV] = useState(0)
  const { reduced } = useDeviceTier()

  useEffect(() => {
    if (!inView) return
    if (reduced) { setV(to); return }
    let raf: number
    let t0: number | null = null
    const step = (t: number) => {
      if (!t0) t0 = t
      const p = Math.min((t - t0) / 1800, 1)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduced])

  return <span ref={ref}>{v.toLocaleString('en-IN')}{suffix}</span>
}

export function Stats() {
  return (
    <section className="section relative" aria-labelledby="stats-heading">
      <div className="max-w-[1400px] mx-auto px-6">
        <Heading
          eyebrow="At a glance"
          title="Building India's semiconductor workforce"
          sub="Nationwide participation across NIELIT centres, workshops and certification programmes."
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.07, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group pcard pcard-hover p-6 text-center cursor-default"
              style={{ borderRadius: 28 }}
            >
              {/* icon */}
              <div
                className="w-11 h-11 mx-auto mb-4 rounded-2xl flex items-center justify-center text-[#2254C4] transition-all duration-300 group-hover:shadow-[0_4px_16px_rgba(34,84,196,0.28)]"
                style={{
                  background: 'linear-gradient(135deg, #eaf2ff 0%, #e0f2fe 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,.9), 0 4px 12px rgba(34,84,196,.10)',
                }}
              >
                <MiniIcon kind={s.kind} className="w-5 h-5" />
              </div>
              {/* number */}
              <div className="text-[27px] font-extrabold tracking-tight text-[#0f172a] tabular-nums">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              {/* label */}
              <div className="mt-1.5 text-[12px] font-medium text-[#64748b] leading-snug">{s.label}</div>
              {/* hover accent line */}
              <div className="mt-3 h-[3px] rounded-full mx-auto w-0 group-hover:w-10 transition-all duration-500 bg-gradient-to-r from-[#2254C4] to-[#29abe2]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── 2. Key Highlights ───────── */
function IndiaMap() {
  const pins = [
    { x: 46, y: 26, label: 'Ropar' },
    { x: 52, y: 34, label: 'Noida' },
    { x: 62, y: 47, label: 'Patna' },
    { x: 79, y: 51, label: 'Imphal' },
    { x: 44, y: 68, label: 'South' },
  ]
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="ind" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbeafe" /><stop offset="100%" stopColor="#bfdbfe" />
          </linearGradient>
        </defs>
        <path d="M40 14 L56 12 L64 20 L70 18 L78 26 L84 40 L80 52 L72 56 L66 52 L62 60 L58 76 L50 90 L42 74 L34 60 L28 44 L32 28 Z"
          fill="url(#ind)" stroke="#2254C4" strokeWidth="0.7" strokeOpacity="0.45" />
        {pins.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4.5" fill="#2254C4" opacity="0.14">
              <animate attributeName="r" values="3;7;3" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.22;0;0.22" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={p.x} cy={p.y} r="1.9" fill="#2254C4" />
          </g>
        ))}
      </svg>
    </div>
  )
}

export function Highlights() {
  return (
    <section id="highlights" className="section relative bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <Heading
          eyebrow="Key Highlights"
          title="Why learners choose eChipHub"
          sub="Industry-aligned content, expert mentors and nationwide delivery."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="pcard pcard-hover p-8 group"
            >
              <div
                className="relative h-[132px] mb-6 rounded-3xl overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f4f8ff 0%, #eaf4fe 100%)', border: '1px solid #e8eef7' }}
              >
                {h.kind === 'centers' ? (
                  <div className="w-[110px] h-[110px] transition-transform duration-500 group-hover:scale-105"><IndiaMap /></div>
                ) : (
                  <div className="w-[112px] h-[112px] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                    <ChipGraphic kind={h.kind === 'courses' ? 'rtl' : 'riscv'} className="w-full h-full" id={`hl-${i}`} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center text-[#2254C4]"
                  style={{ background: 'linear-gradient(135deg, #eaf2ff, #e0f2fe)' }}>
                  <MiniIcon kind={h.kind} className="w-[18px] h-[18px]" />
                </span>
                <h3 className="text-[19px] font-extrabold text-[#0f172a] tracking-tight">{h.title}</h3>
              </div>
              <p className="text-[14.5px] text-[#64748b] leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── 3. Open-Source Lifecycle ───────── */
export function OpenSource() {
  return (
    <section id="opensource" className="section relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0f2350 0%, #14315f 55%, #0B1220 100%)' }}>
      <div className="absolute inset-0 pcb-bg opacity-[0.09] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(41,171,226,.16) 0%, transparent 70%)' }} />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <Heading light eyebrow="Open-Source First" title="An Open-Source First EdTech Platform"
          sub="Advancing semiconductor education & innovation with open EDA toolchains — from RTL entry to fabrication-ready GDSII." />

        <div className="relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-[46px] left-[10%] right-[10%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(125,211,252,.45) 15%, rgba(125,211,252,.45) 85%, transparent)' }} />

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
            {LIFECYCLE.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.11, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="relative rounded-[28px] p-6 text-center"
                style={{
                  background: 'rgba(255,255,255,.055)',
                  border: '1px solid rgba(255,255,255,.11)',
                  backdropFilter: 'blur(14px)',
                  boxShadow: '0 18px 40px rgba(0,0,0,.24)',
                }}
              >
                <div className="w-[74px] h-[74px] mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ background: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,.14), rgba(255,255,255,.03))', border: '1px solid rgba(125,211,252,.26)' }}>
                  <ChipGraphic
                    kind={['rtl', 'timing', 'openlane', 'analog', 'gds'][i]}
                    className="w-[54px] h-[54px]" id={`lc-${i}`}
                  />
                </div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#7dd3fc]">{s.n}</span>
                <h3 className="text-[16px] font-extrabold text-white mt-1 mb-1.5 tracking-tight">{s.name}</h3>
                <p className="text-[12.5px] text-white/60 leading-snug">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── 4. Programs ───────── */
export function Programs() {
  return (
    <section id="labs" className="section relative bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <Heading
          eyebrow="Programmes"
          title="Workshops, Courses & Virtual Labs"
          sub="Three complementary tracks that take learners from fundamentals to fabrication readiness."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {PROGRAMS.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="pcard pcard-hover overflow-hidden group block"
            >
              <div className="relative h-[168px] overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f0f6ff 0%, #e4f1fd 100%)' }}>
                <div className="absolute inset-0 pcb-bg opacity-50" />
                <div className="relative w-[124px] h-[124px] transition-transform duration-[600ms] ease-out group-hover:scale-110 group-hover:-translate-y-1.5">
                  <ChipGraphic kind={['timing', 'rtl', 'openlane'][i]} className="w-full h-full" id={`pg-${i}`} />
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center text-[#2254C4]"
                    style={{ background: 'linear-gradient(135deg, #eaf2ff, #e0f2fe)' }}>
                    <MiniIcon kind={p.kind} className="w-[18px] h-[18px]" />
                  </span>
                  <h3 className="text-[19px] font-extrabold text-[#0f172a] tracking-tight">{p.title}</h3>
                </div>
                <p className="text-[14.5px] text-[#64748b] leading-relaxed mb-5">{p.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#2254C4] transition-transform duration-300 group-hover:translate-x-1">
                  {p.cta}
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── 5. Collaborations ───────── */
export function Collaborations() {
  return (
    <section id="alliances" className="section relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <Heading
          eyebrow="Alliances"
          title="Institutional Collaborations"
          sub="Delivered under a MeitY-supported project in partnership with national institutions."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {PARTNERS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="pcard pcard-hover flex flex-col items-center justify-center gap-4 px-6 py-9 group"
              style={{ borderRadius: 28 }}
            >
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                className="h-[52px] w-auto object-contain transition-all duration-500 group-hover:scale-[1.06]"
                style={{ filter: 'saturate(.82) contrast(.96)' }}
                onMouseEnter={(e: MouseEvent<HTMLImageElement>) => { e.currentTarget.style.filter = 'saturate(1.06) contrast(1)' }}
                onMouseLeave={(e: MouseEvent<HTMLImageElement>) => { e.currentTarget.style.filter = 'saturate(.82) contrast(.96)' }}
              />
              <span className="text-[13px] font-semibold text-[#64748b] group-hover:text-[#2254C4] transition-colors">{p.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── 6. Gallery ───────── */
export function Gallery() {
  return (
    <section id="gallery" className="section relative bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <Heading
          eyebrow="Gallery"
          title="Inside the ChipCraft Virtual Labs"
          sub="Real design flows executed by learners on open-source EDA toolchains."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.title}
              initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: (i % 3) * 0.09, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="pcard pcard-hover overflow-hidden group"
              style={{ borderRadius: 28 }}
            >
              <div className="relative h-[188px] overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #eef5ff 0%, #e2eefb 100%)' }}>
                <div className="absolute inset-0 pcb-bg opacity-60" />
                <div className="relative w-[130px] h-[130px] transition-transform duration-[650ms] ease-out group-hover:scale-[1.12] group-hover:-translate-y-1">
                  <ChipGraphic kind={g.kind} className="w-full h-full" id={`gl-${i}`} />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'linear-gradient(to top, rgba(15,35,80,.55) 0%, transparent 55%)' }} />
              </div>
              <figcaption className="px-6 py-5 text-[15px] font-bold text-[#0f172a] tracking-tight">{g.title}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
