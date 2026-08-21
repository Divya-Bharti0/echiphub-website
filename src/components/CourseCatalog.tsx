import { AnimatePresence, Transition, motion } from 'framer-motion'
import { PointerEvent as ReactPointerEvent, TouchEvent as ReactTouchEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDeviceTier } from '../hooks/useDeviceTier'
import { COURSES, Course, FILTERS, FilterItem } from '../lib/courseData'
import CourseCard from './CourseCard'

const SPRING: Transition = { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 }

interface CourseCatalogProps {
  modalOpen: boolean
}

export default function CourseCatalog({ modalOpen }: CourseCatalogProps) {
  const { isMobile, reduced } = useDeviceTier()
  const [filter, setFilter] = useState<FilterItem['key']>('all')
  const [active, setActive] = useState(0)
  const paused = useRef(false)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const drag = useRef<{ on: boolean; x: number; t: number }>({ on: false, x: 0, t: 0 })

  const visible: Course[] = useMemo(
    () => COURSES.filter(c => filter === 'all' || c.status === filter),
    [filter]
  )

  const counts = useMemo(() => ({
    all: COURSES.length,
    live: COURSES.filter(c => c.status === 'live').length,
    upcoming: COURSES.filter(c => c.status === 'upcoming').length,
    completed: COURSES.filter(c => c.status === 'completed').length,
  }), [])

  useEffect(() => {
    setActive(a => Math.min(a, Math.max(visible.length - 1, 0)))
  }, [visible.length])

  const go = useCallback((dir: number) => {
    setActive(a => {
      const n = visible.length
      if (n === 0) return 0
      return (a + dir + n) % n
    })
  }, [visible.length])

  /* ── single controlled auto-scroll timer ── */
  const stop = useCallback(() => {
    if (timer.current) { clearInterval(timer.current); timer.current = null }
  }, [])

  const start = useCallback(() => {
    stop()
    if (reduced || modalOpen || visible.length < 2) return
    timer.current = setInterval(() => {
      if (!paused.current) setActive(a => (a + 1) % visible.length)
    }, 5000)
  }, [stop, reduced, modalOpen, visible.length])

  useEffect(() => { start(); return stop }, [start, stop])

  useEffect(() => {
    const onVis = () => { document.hidden ? stop() : start() }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [start, stop])

  /* ── keyboard ── */
  const stageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalOpen) return
      const el = stageRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const inView = r.top < window.innerHeight * 0.8 && r.bottom > 0
      if (!inView) return
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); go(-1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, modalOpen])

  /* ── drag / swipe ── */
  const onDown = (e: ReactPointerEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>) => {
    const x = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX ?? 0
    drag.current = { on: true, x, t: Date.now() }
    paused.current = true
  }
  const onUp = (e: ReactPointerEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>) => {
    if (!drag.current.on) return
    drag.current.on = false
    const x = 'clientX' in e ? e.clientX : e.changedTouches?.[0]?.clientX ?? 0
    const dx = x - drag.current.x
    const v = Math.abs(dx) / Math.max(Date.now() - drag.current.t, 1)
    if (Math.abs(dx) > 45 || v > 0.35) go(dx < 0 ? 1 : -1)
    paused.current = false
  }

  const onFilter = (k: FilterItem['key']) => { setFilter(k); setActive(0) }

  /* ── coverflow geometry ── */
  const slotFor = (i: number) => {
    const n = visible.length
    let d = i - active
    if (n > 2) {
      if (d > n / 2) d -= n
      if (d < -n / 2) d += n
    }
    const abs = Math.abs(d)
    if (abs > 1) return null
    return {
      d,
      x: d * (isMobile ? 78 : 104),
      scale: 1,
      opacity: d === 0 ? 1 : 0.88,
      z: 100 - abs * 10,
      rotateY: 0,
      translateZ: 0,
    }
  }

  return (
    <section id="courses" className="section relative overflow-hidden">
      {/* soft institutional backdrop */}
      <div className="absolute inset-0 pcb-bg opacity-60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(41,171,226,.10) 0%, transparent 70%)' }} />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55 }}
          className="text-center max-w-[620px] mx-auto mb-10"
        >
          <p className="eyebrow mb-3">Interactive Course Catalog</p>
          <h2 className="h2">Semiconductor &amp; EDA Design Courses</h2>
          <p className="mt-4 text-[#64748b] text-[17px] leading-relaxed">
            Explore cutting-edge semiconductor and EDA design courses delivered across NIELIT centres.
          </p>
        </motion.div>

        {/* filter pills */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center items-center gap-1.5 p-1.5 rounded-full bg-white border border-[#e6ecf5]"
            style={{ boxShadow: '0 4px 16px rgba(16,32,64,.06)' }}>
            {FILTERS.map(f => {
              const on = filter === f.key
              return (
                <button key={f.key} onClick={() => onFilter(f.key)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-bold transition-all duration-300 ${
                    on ? 'text-white' : 'text-[#475569] hover:bg-[#f1f5f9] hover:text-[#2254C4]'
                  }`}
                  style={on ? {
                    background: 'linear-gradient(135deg, #2254C4 0%, #29abe2 100%)',
                    boxShadow: '0 6px 18px rgba(34,84,196,.32)',
                  } : undefined}
                >
                  {f.label}
                  <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-extrabold ${on ? 'bg-white/25' : 'bg-[#e8eef7] text-[#2254C4]'}`}>
                    {counts[f.key]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── coverflow stage ── */}
        <div
          ref={stageRef}
          className="course-catalog-stage relative select-none overflow-hidden"
          style={{ height: isMobile ? 'min(600px, 154vw)' : 620, perspective: 1600 }}
          onMouseEnter={() => { paused.current = true }}
          onMouseLeave={() => { paused.current = false; drag.current.on = false }}
          onPointerDown={onDown}
          onPointerUp={onUp}
          onTouchStart={onDown}
          onTouchEnd={onUp}
          role="region"
          aria-roledescription="carousel"
          aria-label="Course catalog"
        >
          <AnimatePresence initial={false}>
            {visible.map((c, i) => {
              const s = slotFor(i)
              if (!s) return null
              return (
                <motion.div
                  key={c.id}
                  className="course-catalog-card absolute top-0 left-1/2"
                  style={{
                    width: isMobile ? 'min(86vw, 360px)' : 380,
                    marginLeft: isMobile ? 'min(-43vw, -180px)' : -190,
                    zIndex: s.z,
                    transformStyle: 'preserve-3d',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: s.opacity,
                    scale: s.scale,
                    x: `${s.x}%`,
                    rotateY: s.rotateY,
                    z: s.translateZ,
                    filter: 'blur(0px)',
                  }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.25 } }}
                  transition={SPRING}
                >
                  <div className={s.d === 0 ? '' : 'pointer-events-none'}>
                    <CourseCard course={c} isActive={s.d === 0} />
                  </div>
                  {/* click-catcher for side cards */}
                  {s.d !== 0 && (
                    <button
                      onClick={() => setActive(i)}
                      aria-label={`Show ${c.title}`}
                      className="absolute inset-0 cursor-pointer"
                      style={{ background: 'transparent' }}
                    />
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* prev / next */}
          <button onClick={() => go(-1)} aria-label="Previous course"
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-[200] w-12 h-12 rounded-full bg-white border border-[#e6ecf5] text-[#2254C4] flex items-center justify-center transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:border-[#2254C4]/30"
            style={{ boxShadow: '0 6px 20px rgba(16,32,64,.10)' }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button onClick={() => go(1)} aria-label="Next course"
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-[200] w-12 h-12 rounded-full bg-white border border-[#e6ecf5] text-[#2254C4] flex items-center justify-center transition-all duration-300 hover:-translate-y-[calc(50%+2px)] hover:border-[#2254C4]/30"
            style={{ boxShadow: '0 6px 20px rgba(16,32,64,.10)' }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>

        {/* dots */}
        <div className="flex justify-center items-center gap-2.5 mt-2" role="tablist" aria-label="Select course">
          {visible.map((c, i) => {
            const on = i === active
            return (
              <button key={c.id} role="tab" aria-selected={on} aria-label={c.title}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-500"
                style={{
                  width: on ? 34 : 9, height: 9,
                  background: on ? 'linear-gradient(90deg, #2254C4, #29abe2)' : '#cbd5e1',
                  boxShadow: on ? '0 2px 10px rgba(34,84,196,.45)' : 'none',
                }} />
            )
          })}
        </div>
      </div>
    </section>
  )
}
