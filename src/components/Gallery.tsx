import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Cpu, Layers, Maximize2, Sparkles, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export interface GalleryItem {
  id: string
  title: string
  subtitle?: string
  category: string
  stage: string
  description: string
  image: string
  tools: string[]
  specs?: string
  isFeatured?: boolean
  gridSpan?: string
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gds-flow',
    title: 'ChipCraft Virtual Lab: RTL-to-GDSII Complete Flow',
    subtitle: 'Automated ASIC Physical Design Pipeline',
    category: 'VIRTUAL LAB',
    stage: 'STG-01 · AUTOMATED EDA FLOW',
    description: 'End-to-end open-source silicon implementation from RTL specification to DRC-clean GDSII layout ready for SkyWater 130nm fabrication.',
    image: '/images/courses/Neon OpenLane EDA Flow Chip Infographic.png',
    tools: ['OpenLane', 'Yosys', 'Magic', 'Sky130 PDK'],
    specs: 'SkyWater 130nm · DRC/LVS Clean',
    isFeatured: true,
    gridSpan: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 'rtl-sim',
    title: 'RTL Simulation & Waveform Verification',
    subtitle: 'SystemVerilog Logic Verification',
    category: 'RTL DESIGN',
    stage: 'STG-02 · FRONT-END VERIFICATION',
    description: 'Hardware description simulation, testbench assertion monitoring, and multi-channel waveform analysis.',
    image: '/images/general/RTL-1.jpeg',
    tools: ['Icarus Verilog', 'GTKWave', 'Verilator'],
    specs: '100% Code Coverage · Functional Sign-off',
    gridSpan: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'logic-synth',
    title: 'Logic Synthesis & Technology Mapping',
    subtitle: 'Gate-Level Netlist Optimization',
    category: 'SYNTHESIS',
    stage: 'STG-03 · GATE MAPPING',
    description: 'Translating behavioral RTL code into optimized standard cell gate-level netlists with timing constraints.',
    image: '/images/general/Asset-1.png',
    tools: ['Yosys', 'ABC Logic', 'Liberty SCL'],
    specs: 'Target: Standard Cell Lib · Area Optimized',
    gridSpan: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'riscv-core',
    title: 'RISC-V 32-Bit Microarchitecture Core',
    subtitle: 'Pipelined CPU Implementation',
    category: 'RISC-V ARCH',
    stage: 'STG-04 · PROCESSOR DESIGN',
    description: '5-stage pipelined RV32I processor core with hazard detection, branch prediction, and bus interface logic.',
    image: '/images/courses/Risc-v.png',
    tools: ['RV32I ISA', 'Verilog', 'OpenLane'],
    specs: 'RV32I Core · Pipelined Architecture',
    gridSpan: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'analog-ams',
    title: 'Analog & Mixed-Signal IC Design',
    subtitle: 'AMS Modeling & SPICE Simulation',
    category: 'ANALOG & AMS',
    stage: 'STG-05 · MIXED-SIGNAL FLOW',
    description: 'Transistor-level SPICE modeling, operational amplifier layout, and parametric sweep analysis.',
    image: '/images/courses/Neon Mixed-Signal IC Design Infographic.png',
    tools: ['Ngspice', 'Qflow', 'Magic Layout'],
    specs: 'AMS Macro · DRC/LVS Verified',
    gridSpan: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'timing-sta',
    title: 'Static Timing Analysis & DFT Scan Chains',
    subtitle: 'Corner Constraints & Slack Analysis',
    category: 'TIMING & STA',
    stage: 'STG-06 · SIGN-OFF VERIFICATION',
    description: 'Multi-corner setup and hold slack verification, clock tree balancing, and scan insertion.',
    image: '/images/general/DFT.jpeg',
    tools: ['OpenSTA', 'Fault DFT', 'SDC Constraints'],
    specs: 'Zero Setup/Hold Violations · WNS: +0.42ns',
    gridSpan: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'gdsii-tapeout',
    title: 'Final GDSII Tape-out & Silicon Mask Export',
    subtitle: 'Tape-out Ready Silicon Geometry',
    category: 'GDSII TAPE-OUT',
    stage: 'STG-07 · FABRICATION READY',
    description: 'High-density multi-metal layer layout with complete DRC and LVS physical verification for foundry manufacturing.',
    image: '/images/general/tile1-1024x683.jpeg',
    tools: ['KLayout', 'Netgen LVS', 'Magic DRC'],
    specs: 'GDSII Stream · 6 Metal Layers · Tape-out Sign-off',
    gridSpan: 'lg:col-span-1 lg:row-span-1',
  },
  {
    id: 'cloud-workstation',
    title: 'ChipCraft Cloud Workstations & EDA Lab',
    subtitle: 'Remote Linux Virtual Lab Pods',
    category: 'EDA TOOLS',
    stage: 'STG-08 · CLOUD INFRASTRUCTURE',
    description: 'Pre-configured cloud EDA instances enabling interactive GUI simulations across nationwide NIELIT centres.',
    image: '/images/general/Course BG 1.png',
    tools: ['Linux EDA Stack', 'WebGUI', 'Docker'],
    specs: 'Zero-Install · Nationwide Access',
    gridSpan: 'lg:col-span-2 lg:row-span-1',
  },
]

const CATEGORIES = ['All', 'Virtual Lab', 'RTL Design', 'Synthesis', 'RISC-V Arch', 'Analog & AMS', 'GDSII Tape-out']

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null)

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'All') return true
    return item.category.toLowerCase().includes(selectedCategory.toLowerCase())
  })

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activeItem) return
      if (e.key === 'Escape') {
        setActiveItem(null)
      } else if (e.key === 'ArrowRight') {
        const idx = filteredItems.findIndex((i) => i.id === activeItem.id)
        if (idx !== -1) {
          setActiveItem(filteredItems[(idx + 1) % filteredItems.length])
        }
      } else if (e.key === 'ArrowLeft') {
        const idx = filteredItems.findIndex((i) => i.id === activeItem.id)
        if (idx !== -1) {
          setActiveItem(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length])
        }
      }
    },
    [activeItem, filteredItems]
  )

  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeItem, handleKeyDown])

  return (
    <section
      id="gallery"
      className="section relative overflow-hidden bg-[#ffffff] border-y border-[#e2e8f0]/80"
      aria-label="Inside the ChipCraft Virtual Labs Gallery"
    >
      {/* Semiconductor circuit & wafer background grid */}
      <div className="absolute inset-0 pcb-bg opacity-[0.45] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(41, 171, 226, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-[780px] mx-auto mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2254C4]/[0.07] border border-[#2254C4]/20 mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#2254C4] animate-pulse" />
            <span className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#2254C4]">
              Gallery
            </span>
          </div>

          <h2 className="h2 text-[#0f172a] tracking-tight">
            Inside the <span className="text-[#2254C4]">ChipCraft Virtual Labs</span>
          </h2>

          <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-[#64748b]">
            Real design flows executed by learners on open-source EDA toolchains — from behavioral RTL entry to fabrication-ready GDSII tape-out.
          </p>

          {/* Microchip status badges bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[#475569]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#f8fafc] border border-[#e2e8f0]">
              <Cpu className="w-3.5 h-3.5 text-[#2254C4]" />
              <strong>PDK:</strong> SkyWater 130nm &amp; SCL 180nm
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#f8fafc] border border-[#e2e8f0]">
              <Layers className="w-3.5 h-3.5 text-[#06b6d4]" />
              <strong>Flow:</strong> RTL → Netlist → DEF → GDSII
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#f8fafc] border border-[#e2e8f0]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
              <strong>Validation:</strong> DRC &amp; LVS Clean
            </span>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-sm">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2254C4] text-white shadow-md shadow-[#2254C4]/25'
                      : 'text-[#475569] hover:text-[#2254C4] hover:bg-[#f1f5f9]'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Asymmetric Masonry Showcase Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[290px] sm:auto-rows-[310px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                onClick={() => setActiveItem(item)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-[#e2e8f0] bg-white shadow-[0_4px_20px_rgba(16,32,64,0.06)] hover:shadow-[0_16px_40px_rgba(34,84,196,0.16)] hover:border-[#2254C4]/40 transition-all duration-300 flex flex-col justify-between ${
                  item.isFeatured && selectedCategory === 'All' ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {/* Background Image with Layer Zoom */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle technical gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09152b] via-[#09152b]/55 to-[#09152b]/15 transition-opacity duration-300 group-hover:opacity-90" />

                  {/* EDA crosshair corner marks */}
                  <div className="absolute top-3 left-3 text-white/30 font-mono text-[10px] pointer-events-none select-none">
                    + {item.stage.split(' · ')[0]}
                  </div>
                  <div className="absolute top-3 right-3 text-white/30 font-mono text-[10px] pointer-events-none select-none">
                    [SKY130]
                  </div>
                </div>

                {/* Top Bar inside Card */}
                <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/95 text-[#2254C4] shadow-sm backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2254C4]" />
                    {item.category}
                  </span>

                  <button
                    type="button"
                    aria-label={`View full details for ${item.title}`}
                    className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:bg-[#2254C4] group-hover:scale-110 transition-all duration-200"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10 p-5 sm:p-6 text-white flex flex-col justify-end">
                  <span className="text-[11px] font-mono tracking-widest text-[#7dd3fc] uppercase font-semibold mb-1">
                    {item.stage}
                  </span>

                  <h3
                    className={`font-extrabold tracking-tight leading-snug text-white group-hover:text-[#7dd3fc] transition-colors duration-200 ${
                      item.isFeatured && selectedCategory === 'All'
                        ? 'text-[21px] sm:text-[25px] line-clamp-2'
                        : 'text-[17px] sm:text-[18px] line-clamp-2'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-white/80 leading-relaxed mt-2 text-[13px] sm:text-[14px] ${
                      item.isFeatured && selectedCategory === 'All' ? 'line-clamp-3' : 'line-clamp-2'
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Tools & CTA pill row */}
                  <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.tools.slice(0, item.isFeatured ? 4 : 3).map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded text-[10.5px] font-mono font-medium bg-white/15 text-white/90 border border-white/10"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#7dd3fc] group-hover:translate-x-0.5 transition-transform">
                      Inspect Flow <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer Sub-Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0f2350] via-[#14315f] to-[#0b1b36] border border-[#2254C4]/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2254C4]/40 border border-[#7dd3fc]/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#7dd3fc]" />
            </div>
            <div>
              <h4 className="text-[18px] font-bold text-white tracking-tight">
                Want to execute your own silicon designs?
              </h4>
              <p className="text-[14px] text-white/75 mt-0.5">
                Access pre-configured cloud EDA workstations and complete the 90-hour ChipCraft RTL-to-GDSII curriculum.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="#courses"
              className="w-full md:w-auto text-center px-6 py-3 rounded-full text-[14px] font-extrabold text-[#0f172a] bg-[#7dd3fc] hover:bg-white shadow-lg transition-all duration-200"
            >
              Explore Courses
            </a>
            <a
              href="https://community.echiphub.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto text-center px-6 py-3 rounded-full text-[14px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
            >
              Join Community
            </a>
          </div>
        </div>
      </div>

      {/* ── Interactive Lightbox / Modal ── */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0f172a] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[92vh]"
            >
              {/* Image Preview Container */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[280px] lg:min-h-[500px]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-contain max-h-[60vh] lg:max-h-[85vh] p-3"
                />

                {/* Left/Right controls inside modal */}
                <button
                  type="button"
                  onClick={() => {
                    const idx = filteredItems.findIndex((i) => i.id === activeItem.id)
                    setActiveItem(filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length])
                  }}
                  aria-label="Previous showcase"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#2254C4] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const idx = filteredItems.findIndex((i) => i.id === activeItem.id)
                    setActiveItem(filteredItems[(idx + 1) % filteredItems.length])
                  }}
                  aria-label="Next showcase"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#2254C4] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Info */}
              <div className="w-full lg:w-[380px] p-6 sm:p-8 bg-[#0b1324] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#2254C4] text-white">
                      {activeItem.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveItem(null)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs font-mono text-[#7dd3fc] tracking-wider block mb-1">
                    {activeItem.stage}
                  </span>

                  <h3 id="lightbox-title" className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {activeItem.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {activeItem.description}
                  </p>

                  {/* Technical Specs box */}
                  <div className="mt-6 p-4 rounded-2xl bg-white/[0.05] border border-white/10 space-y-3">
                    <div className="text-xs font-mono text-slate-400">
                      <strong className="text-white block mb-1">EDA Toolchain Stack:</strong>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {activeItem.tools.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/10 text-white text-[11px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {activeItem.specs && (
                      <div className="pt-2 border-t border-white/10 text-xs font-mono text-slate-400">
                        <strong className="text-[#7dd3fc] block mb-0.5">Silicon Parameters:</strong>
                        <span>{activeItem.specs}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Press Esc to close</span>
                  <a
                    href="https://echiphub.in/all-courses/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#7dd3fc] hover:underline font-bold"
                  >
                    Lab Details <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
