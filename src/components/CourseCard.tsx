import { useRef, useState, useCallback, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { STATUS_META, COURSE_URL, Course } from '../lib/courseData'
import ChipGraphic from './ChipGraphic'
import { useDeviceTier } from '../hooks/useDeviceTier'

interface CourseCardProps {
  course: Course
  isActive: boolean
}

export default function CourseCard({ course, isActive }: CourseCardProps) {
  const ref = useRef<HTMLElement>(null)
  const { reduced, isMobile } = useDeviceTier()
  const [hover, setHover] = useState(false)
  const [light, setLight] = useState<{ x: number; y: number }>({ x: -300, y: -300 })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [3.5, -3.5]), { stiffness: 150, damping: 20 })
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-3.5, 3.5]), { stiffness: 150, damping: 20 })

  const tiltEnabled = !reduced && !isMobile

  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!tiltEnabled) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px - 0.5)
    my.set(py - 0.5)
    setLight({ x: e.clientX - r.left - 150, y: e.clientY - r.top - 150 })
  }, [mx, my, tiltEnabled])

  const onLeave = useCallback(() => {
    mx.set(0); my.set(0); setHover(false); setLight({ x: -300, y: -300 })
  }, [mx, my])

  const meta = STATUS_META[course.status]

  return (
    <div style={{ perspective: 1200 }}>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        className="pcard pcard-hover relative overflow-hidden h-full"
        style={{ rotateX: tiltEnabled ? rX : 0, rotateY: tiltEnabled ? rY : 0, transformStyle: 'preserve-3d' }}
        animate={{ y: hover && isActive ? -6 : 0, scale: hover && isActive ? 1.02 : 1 }}
        transition={{ type: 'spring' as const, stiffness: 260, damping: 24 }}
      >
        {/* cursor-following light */}
        {tiltEnabled && (
          <div className="pointer-events-none absolute w-[300px] h-[300px] rounded-full z-[1] transition-opacity duration-300"
            style={{
              left: light.x, top: light.y,
              background: 'radial-gradient(circle, rgba(41,171,226,.14) 0%, rgba(34,84,196,.06) 45%, transparent 70%)',
              opacity: hover ? 1 : 0,
            }} />
        )}

        {/* top hairline highlight */}
        <div className="absolute inset-x-0 top-0 h-px z-[2]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34,84,196,.28), transparent)' }} />

        <div className="relative z-[3] flex flex-col items-center text-center px-7 pt-6 pb-7 h-full">
          {/* status badge */}
          <div className="self-end inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold border"
            style={{ color: meta.fg, background: meta.bg, borderColor: meta.bd }}>
            <span className="w-[7px] h-[7px] rounded-full" style={{
              background: meta.dot,
              boxShadow: meta.pulse ? `0 0 0 0 ${meta.dot}` : 'none',
              animation: meta.pulse && !reduced ? 'blip 1.8s ease-in-out infinite' : undefined,
            }} />
            {meta.label}
          </div>

          {/* circular 3D course visual */}
          <div className="relative mt-3 mb-6" style={{ transform: 'translateZ(36px)' }}>
            <div className="visual-ring w-[168px] h-[168px] flex items-center justify-center">
              <motion.div
                animate={{ scale: hover && isActive ? 1.09 : 1, y: hover && isActive ? -4 : 0 }}
                transition={{ type: 'spring' as const, stiffness: 220, damping: 20 }}
                className="w-[128px] h-[128px]"
              >
                <ChipGraphic kind={course.kind} className="w-full h-full" id={`cc-${course.id}`} />
              </motion.div>
            </div>
            {!reduced && (
              <>
                <span className="orbit-dotlet od0" />
                <span className="orbit-dotlet od1" style={{ background: '#7c3aed', boxShadow: '0 0 8px rgba(124,58,237,.7)' }} />
                <span className="orbit-dotlet od2" style={{ background: '#2254C4', boxShadow: '0 0 8px rgba(34,84,196,.7)' }} />
              </>
            )}
          </div>

          {/* title */}
          <h3 className="text-[19px] font-extrabold text-[#0f172a] leading-snug tracking-tight mb-3 line-clamp-2 min-h-[52px]">
            {course.title}
          </h3>

          {/* location */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold text-[#334155] bg-[#f1f5f9] border border-[#e2e8f0] mb-4">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {course.centre}
          </div>

          {/* description */}
          <p className="text-[14px] text-[#64748b] leading-relaxed line-clamp-3 mb-6 flex-1">
            {course.desc}
          </p>

          {/* CTA */}
          <motion.a
            href={COURSE_URL} target="_blank" rel="noopener noreferrer"
            animate={{ y: hover && isActive ? -3 : 0 }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 22 }}
            className="btn-shine w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-[14px] text-white"
            style={{
              background: 'linear-gradient(135deg, #2254C4 0%, #29abe2 100%)',
              boxShadow: hover && isActive ? '0 12px 30px rgba(34,84,196,.38)' : '0 6px 18px rgba(34,84,196,.24)',
              transform: 'translateZ(20px)',
            }}
          >
            Explore Course
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </motion.a>
        </div>
      </motion.article>
    </div>
  )
}
