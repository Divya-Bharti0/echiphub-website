import { motion } from 'framer-motion'
import { ArrowRight, CircuitBoard, Cpu, Gauge, Layers3, LockKeyhole, MonitorPlay, Sparkles } from 'lucide-react'

const WORKSHOPS = [
  {
    title: 'RTL Design',
    desc: 'Build digital systems from architecture to clean synthesizable RTL.',
    meta: 'Beginner • 4 weeks',
    icon: CircuitBoard,
    href: 'https://echiphub.in/all-courses/',
  },
  {
    title: 'Verification',
    desc: 'Build SystemVerilog testbenches and learn assertions and coverage.',
    meta: 'Intermediate • 6 weeks',
    icon: Gauge,
    href: 'https://echiphub.in/all-courses/',
  },
  {
    title: 'RISC-V',
    desc: 'Learn instruction sets pipelines hazards and FPGA bring-up.',
    meta: 'Intermediate • 8 weeks',
    icon: Cpu,
    href: 'https://echiphub.in/all-courses/',
  },
  {
    title: 'Physical Design',
    desc: 'Take a synthesized design through floorplanning placement routing and sign-off.',
    meta: 'Advanced • 8 weeks',
    icon: Layers3,
    href: 'https://echiphub.in/all-courses/',
  },
  {
    title: 'EDA Foundations',
    desc: 'Learn the open-source tools used in practical chip design workflows.',
    meta: 'Beginner • 3 weeks',
    icon: MonitorPlay,
    href: 'https://echiphub.in/all-courses/',
  },
  {
    title: 'Tape-out Readiness',
    desc: 'Learn the checks needed to prepare a design for fabrication.',
    meta: 'Advanced • 10 weeks',
    icon: LockKeyhole,
    href: 'https://echiphub.in/all-courses/',
  },
]

const LABS = [
  {
    step: 'LAB 01',
    title: 'RTL Simulator',
    desc: 'Write, simulate, and inspect your first design.',
    href: 'https://echiphub.in/all-courses/',
  },
  {
    step: 'LAB 02',
    title: 'Verilog Playground',
    desc: 'Prototype modules with instant feedback.',
    href: 'https://echiphub.in/all-courses/',
  },
  {
    step: 'LAB 03',
    title: 'OpenLane Flow',
    desc: 'Run a complete RTL to GDSII flow.',
    href: 'https://echiphub.in/all-courses/',
  },
  {
    step: 'LAB 04',
    title: 'GDSII Viewer',
    desc: 'Inspect layouts and understand sign-off geometry.',
    href: 'https://echiphub.in/all-courses/',
  },
]

export default function LearningPaths() {
  return (
    <>
      <section id="workshops" className="relative overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="absolute inset-0 pcb-bg opacity-30 pointer-events-none" />
        
        {/* Subtle radial ambient highlight */}
        <div 
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 65% 45% at 50% 15%, rgba(34,84,196,0.04) 0%, transparent 70%)'
          }}
        />

        <div className="relative mx-auto max-w-[1400px] w-full">
          {/* Header row with Title & CTA */}
          <div className="mb-8 md:mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow mb-2.5 text-[#2254C4] font-bold text-xs uppercase tracking-[0.2em]">Workshops</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl leading-tight">
                Hands-on workshops for real-world chip design
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#64748b] sm:text-base sm:leading-7">
                Build practical semiconductor skills through guided workshops in RTL design verification RISC-V physical design EDA tools and tape-out readiness.
              </p>
            </div>
            <a
              href="https://echiphub.in/all-courses/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-[#dbe5f2] bg-white px-4 text-sm font-bold text-[#2254C4] shadow-sm transition-all duration-200 hover:bg-[#f1f6ff] hover:border-[#b9d2f4] hover:shadow sm:self-auto shrink-0"
            >
              View all workshops <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* 6 Cards Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORKSHOPS.map(({ title, desc, meta, icon: Icon, href }, index) => (
              <motion.a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                className="group relative flex flex-col justify-between h-full rounded-2xl border border-[#e2eaf4] bg-white p-6 shadow-[0_4px_20px_rgba(16,32,64,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b4cfee] hover:shadow-[0_16px_36px_rgba(34,84,196,0.09)] focus:outline-none focus:ring-2 focus:ring-[#2254C4] focus:ring-offset-2"
              >
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/70 text-[#2254C4] transition-all duration-300 group-hover:scale-105 group-hover:border-blue-200 group-hover:shadow-[0_0_14px_rgba(34,84,196,0.12)]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-extrabold tracking-tight text-[#0f172a] transition-colors duration-200 group-hover:text-[#2254C4]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                    {desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-[#64748b] tracking-wide">
                    {meta}
                  </span>
                  <span className="inline-flex items-center text-sm font-extrabold text-[#2254C4] transition-colors">
                    Start <ArrowRight className="ml-1 inline h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="virtual-lab" className="relative overflow-hidden bg-[#07152d] px-5 py-14 sm:px-8 sm:py-16 lg:py-20 text-white">
        {/* Subtle PCB pattern backdrop */}
        <div className="absolute inset-0 pcb-bg opacity-[0.07] pointer-events-none" />
        
        {/* Subtle radial ambient glow for depth */}
        <div 
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(34,84,196,0.16) 0%, rgba(6,182,212,0.05) 45%, transparent 75%)'
          }}
        />

        <div className="relative mx-auto max-w-[1400px] w-full">
          {/* Header */}
          <div className="mb-8 md:mb-10 max-w-2xl">
            <p className="eyebrow mb-2.5 text-[#38bdf8] tracking-[0.2em] font-bold text-xs uppercase">Virtual labs</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl leading-tight">
              Practice with the tools the industry uses
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base sm:leading-7">
              Cloud-ready workflows, guided experiments, and a workspace designed for repeated practice.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LABS.map(({ step, title, desc, href }, index) => (
              <motion.a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/[0.08] bg-[#0c1e3d]/75 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/40 hover:bg-[#0f254c]/90 hover:shadow-[0_14px_36px_rgba(0,0,0,0.38),0_0_24px_rgba(56,189,248,0.1)]"
              >
                {/* Top subtle highlight */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-[0.18em] text-[#38bdf8]">
                      {step}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-[#38bdf8] transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-white tracking-tight transition-colors duration-300 group-hover:text-cyan-200">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center">
                  <span className="inline-flex items-center text-sm font-bold text-[#38bdf8] transition-colors duration-300 group-hover:text-cyan-300">
                    Open lab <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#eaf4ff] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 rounded-3xl border border-[#cfe2f8] bg-white/70 p-7 shadow-[0_20px_50px_rgba(34,84,196,.08)] backdrop-blur-md sm:p-10 lg:flex-row lg:items-center"><div><p className="eyebrow mb-3">Your next build starts here</p><h2 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">Start your semiconductor journey</h2><p className="mt-3 max-w-2xl text-base leading-7 text-[#64748b]">Join a growing community learning the complete flow through practical, open-source tools.</p></div><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><a href="#courses" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2254C4] px-6 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(34,84,196,.2)]">Explore Courses</a><a href="https://echiphub.in/wp-login.php?action=register" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#c9d9ee] px-6 text-sm font-extrabold text-[#2254C4]">Join eChipHub</a></div></div>
      </section>
    </>
  )
}
