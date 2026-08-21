import { ArrowRight, CircuitBoard, Cpu, Gauge, Layers3, LockKeyhole, MonitorPlay, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const PATHS = [
  { title: 'RTL Design', desc: 'Build synthesizable digital systems from architecture to clean RTL.', meta: 'Beginner · 4 weeks', icon: CircuitBoard, tone: 'from-blue-50 to-cyan-50' },
  { title: 'Verification', desc: 'Create robust SystemVerilog testbenches, assertions and coverage plans.', meta: 'Intermediate · 6 weeks', icon: Gauge, tone: 'from-cyan-50 to-sky-50' },
  { title: 'RISC-V', desc: 'Understand instruction sets, pipelines, hazards and FPGA bring-up.', meta: 'Intermediate · 8 weeks', icon: Cpu, tone: 'from-indigo-50 to-blue-50' },
  { title: 'Physical Design', desc: 'Move from synthesized netlist through floorplan, route and sign-off.', meta: 'Advanced · 8 weeks', icon: Layers3, tone: 'from-sky-50 to-blue-50' },
  { title: 'EDA Foundations', desc: 'Learn the open-source toolchain behind repeatable chip design workflows.', meta: 'Beginner · 3 weeks', icon: MonitorPlay, tone: 'from-blue-50 to-indigo-50' },
  { title: 'Tape-out Readiness', desc: 'Practice the checks and decisions that make a design fabrication-ready.', meta: 'Advanced · 10 weeks', icon: LockKeyhole, tone: 'from-cyan-50 to-blue-50' },
]

const LABS = [
  ['RTL Simulator', 'Write, simulate and inspect your first design.'],
  ['Verilog Playground', 'Prototype modules with instant feedback.'],
  ['OpenLane Flow', 'Run a complete RTL-to-GDSII flow.'],
  ['GDSII Viewer', 'Inspect layouts and understand sign-off geometry.'],
]

export default function LearningPaths() {
  return (
    <>
      <section id="learning-paths" className="section relative overflow-hidden bg-white">
        <div className="absolute inset-0 pcb-bg opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">Learning paths</p>
              <h2 className="h2">A clear route from first RTL to tape-out</h2>
              <p className="mt-4 text-base leading-7 text-[#64748b] sm:text-lg">Choose a focused path, build practical confidence, and keep every milestone connected to the real semiconductor workflow.</p>
            </div>
            <a href="#courses" className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-[#dbe5f2] px-4 text-sm font-bold text-[#2254C4] transition-colors hover:bg-[#f1f6ff] sm:self-auto">View all courses <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PATHS.map(({ title, desc, meta, icon: Icon, tone }, index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="group rounded-2xl border border-[#e5edf7] bg-white p-5 shadow-[0_8px_24px_rgba(16,32,64,.05)] transition-all hover:-translate-y-1 hover:border-[#b9d2f4] hover:shadow-[0_18px_36px_rgba(34,84,196,.11)]">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-[#2254C4]`}><Icon className="h-6 w-6" /></div>
                <h3 className="text-lg font-extrabold tracking-tight text-[#0f172a]">{title}</h3>
                <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#64748b]">{desc}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#eef3f8] pt-4"><span className="text-xs font-bold text-[#64748b]">{meta}</span><a href="#courses" className="text-sm font-extrabold text-[#2254C4]">Start <ArrowRight className="ml-1 inline h-4 w-4" /></a></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="virtual-lab" className="section relative overflow-hidden bg-[#07152d] text-white">
        <div className="absolute inset-0 pcb-bg opacity-[0.1] pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="mb-10 max-w-2xl"><p className="eyebrow mb-3 text-[#7dd3fc]">Virtual labs</p><h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Practice with the tools the industry uses</h2><p className="mt-4 text-base leading-7 text-white/65 sm:text-lg">Cloud-ready workflows, guided experiments and a workspace designed for repeated practice.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LABS.map(([title, desc], index) => <motion.a key={title} href="https://echiphub.in/all-courses/" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition-colors hover:bg-white/[0.11]"><div className="mb-8 flex items-center justify-between"><span className="font-mono text-xs font-bold tracking-[0.18em] text-[#7dd3fc]">LAB 0{index + 1}</span><Sparkles className="h-5 w-5 text-[#29abe2]" /></div><h3 className="text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{desc}</p><span className="mt-5 inline-flex items-center text-sm font-bold text-[#7dd3fc]">Open lab <ArrowRight className="ml-1 h-4 w-4" /></span></motion.a>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#eaf4ff] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 rounded-3xl border border-[#cfe2f8] bg-white/70 p-7 shadow-[0_20px_50px_rgba(34,84,196,.08)] backdrop-blur-md sm:p-10 lg:flex-row lg:items-center"><div><p className="eyebrow mb-3">Your next build starts here</p><h2 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">Start your semiconductor journey</h2><p className="mt-3 max-w-2xl text-base leading-7 text-[#64748b]">Join a growing community learning the complete flow through practical, open-source tools.</p></div><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><a href="#courses" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2254C4] px-6 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(34,84,196,.2)]">Explore Courses</a><a href="https://echiphub.in/wp-login.php?action=register" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#c9d9ee] px-6 text-sm font-extrabold text-[#2254C4]">Join eChipHub</a></div></div>
      </section>
    </>
  )
}
