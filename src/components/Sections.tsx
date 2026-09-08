import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useDeviceTier } from '../hooks/useDeviceTier'
import { COLLABORATION_ORGS, GALLERY, HIGHLIGHTS, LIFECYCLE, PROGRAMS, STATS } from '../lib/courseData'
import ChipGraphic, { MiniIcon } from './ChipGraphic'

interface HeadingProps {
  eyebrow: string
  title: string
  sub?: string
  light?: boolean
  id?: string
}

/* ───────── shared heading ───────── */
export function Heading({ eyebrow, title, sub, light, id }: HeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55 }}
      className="text-center max-w-[640px] mx-auto mb-14"
    >
      <p className="eyebrow mb-3" style={light ? { color: '#7dd3fc' } : undefined}>{eyebrow}</p>
      <h2 id={id} className="h2" style={light ? { color: '#fff' } : undefined}>{title}</h2>
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
          sub="Nationwide participation across NIELIT centres, workshops, and certification programs."
          id="stats-heading"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
export function Highlights() {
  return (
    <section id="highlights" className="section highlights-section relative bg-white">
      <div className="max-w-[1440px] mx-auto px-6 w-full">
        <Heading
          eyebrow="KEY HIGHLIGHTS"
          title="Why learners choose eChipHub"
          sub="Industry-aligned content, expert mentors and nationwide delivery."
        />
        <div className="highlights-grid">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="pcard pcard-hover highlight-card group"
            >
              <div className="highlight-visual" style={{ background: 'linear-gradient(135deg, #f4f8ff 0%, #eaf4fe 100%)', border: '1px solid #e8eef7' }}>
                <img
                  src={h.image}
                  alt={h.title}
                  className="highlight-image"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className="highlight-copy">
                <div className="highlight-header">
                  <span className="highlight-icon" style={{ background: 'linear-gradient(135deg, #eaf2ff, #e0f2fe)' }}>
                    <MiniIcon kind={h.kind} className="w-[18px] h-[18px]" />
                  </span>
                  <h3 className="highlight-title">{h.title}</h3>
                </div>
                <p className="highlight-text">{h.desc}</p>
              </div>
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
    <section id="opensource" className="section open-source-section relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0f2350 0%, #14315f 55%, #0B1220 100%)' }}>
      <div className="absolute inset-0 pcb-bg opacity-[0.09] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(41,171,226,.16) 0%, transparent 70%)' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 w-full">
        <Heading light eyebrow="Open-Source First" title="An Open-Source First EdTech Platform"
          sub="Advancing semiconductor education and innovation with open EDA toolchains, from RTL design to fabrication ready GDSII." />

        <div className="journey-shell relative">
          <div className="journey-line hidden lg:block" />
          <div className="journey-grid">
            {LIFECYCLE.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.11, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="journey-card"
              >
                <div className="journey-icon-wrap flex items-center justify-center overflow-hidden p-1.5 rounded-full">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      className="w-full h-full object-contain object-center rounded-full"
                      draggable={false}
                    />
                  ) : (
                    <ChipGraphic
                      kind={s.kind || ['rtl', 'timing', 'openlane', 'analog', 'gds'][i]}
                      className="w-[52px] h-[52px] object-contain" id={`lc-${i}`}
                    />
                  )}
                </div>
                <span className="journey-step">{s.n}</span>
                <h3 className="journey-title">{s.name}</h3>
                <p className="journey-desc">{s.desc}</p>
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
          title="Workshops, Courses, and Virtual Labs"
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
              <div className="programs-image-wrap">
                <img
                  src={new URL(`../../Website Image/${p.image}`, import.meta.url).href}
                  alt={p.title}
                  loading="lazy"
                  className="programs-image"
                />
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
  const [isHovering, setIsHovering] = useState(false)

  // Order matching the reference screenshot: AICTE -> DEL TECH (DTU) -> TATA ELECTRONICS -> NSUT
  const orderedOrgs = [
    COLLABORATION_ORGS.find(o => o.name === 'AICTE') || COLLABORATION_ORGS[1],
    COLLABORATION_ORGS.find(o => o.name === 'DTU') || COLLABORATION_ORGS[2],
    COLLABORATION_ORGS.find(o => o.name === 'Tata Electronics') || COLLABORATION_ORGS[3],
    COLLABORATION_ORGS.find(o => o.name === 'NSUT') || COLLABORATION_ORGS[0],
  ]

  // Repeat for continuous seamless horizontal loop
  const collaborationGroup = [
    ...orderedOrgs,
    ...orderedOrgs,
  ]

  return (
    <section id="alliances" className="our-collaborations section relative">
      <div className="our-collaborations-inner">
        <div className="our-collaborations-header">
          <h2 className="our-collaborations-title"><span>Our</span> <strong>Collaborations</strong></h2>
          <div className="collaboration-stat" aria-label="3,901 students trained through our academic & industry collaborations in 2025-2026">
            <strong>3,901</strong>
            <span>Students trained through our academic &amp;<br />industry collaborations in 2025-2026.</span>
          </div>
        </div>

        <div className="collaboration-divider" />

        {/* Collaboration logos continuous marquee */}
        <div
          className={`collaboration-carousel-container ${isHovering ? 'is-paused' : ''}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
          aria-label="Collaboration organizations carousel"
        >
          <div className="collaboration-carousel-track">
            <div className="collaboration-marquee-group">
              {collaborationGroup.map((org, index) => (
                <div key={`collab-item-a-${index}`} className="collaboration-carousel-item">
                  <div className="collaboration-logo-wrapper">
                    <img
                      src={org.src}
                      alt={org.name}
                      loading="lazy"
                      className="collaboration-logo-image"
                      draggable={false}
                    />
                  </div>
                  <div className="collaboration-logo-divider" aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className="collaboration-marquee-group" aria-hidden="true">
              {collaborationGroup.map((org, index) => (
                <div key={`collab-item-b-${index}`} className="collaboration-carousel-item">
                  <div className="collaboration-logo-wrapper">
                    <img
                      src={org.src}
                      alt=""
                      loading="lazy"
                      className="collaboration-logo-image"
                      draggable={false}
                    />
                  </div>
                  <div className="collaboration-logo-divider" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="collaboration-badges" aria-label="Collaboration highlights">
          <span><i className="badge-dot badge-dot-blue" />MeitY Supported Initiative</span>
          <span><i className="badge-dot badge-dot-blue" />NIELIT Certified</span>
          <span><i className="badge-dot badge-dot-green" />Open-Source First</span>
          <span><i className="badge-dot badge-dot-green" />Government of India Backed</span>
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
        <div className="gallery-grid">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="gallery-card"
            >
              <div className="gallery-image-wrap">
                <img
                  src={new URL(`../../Website Image/${g.image}`, import.meta.url).href}
                  alt={g.title}
                  loading="lazy"
                  className="gallery-image"
                />
              </div>

              <figcaption className="gallery-content">
                <div className="gallery-card-body">
                  <div className="gallery-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="gallery-icon-svg" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 12h12" />
                      <path d="M13 5l7 7-7 7" />
                    </svg>
                  </div>

                  <h3 className="gallery-title">{g.title}</h3>
                  <p className="gallery-description">{g.description}</p>
                </div>

                <div className="gallery-footer">
                  <div className="gallery-tag-row">
                    {g.tags.map((tag) => (
                      <span key={`${g.title}-${tag}`} className="gallery-tag">{tag}</span>
                    ))}
                  </div>

                  <span className="gallery-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="gallery-arrow-svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
