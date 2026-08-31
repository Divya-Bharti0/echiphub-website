export const COURSE_URL = 'https://echiphub.in/all-courses/'

export interface Course {
  id: number
  status: 'live' | 'upcoming' | 'completed'
  centre: string
  kind: string
  img: string
  title: string
  desc: string
}

export const COURSES: Course[] = [
  {
    id: 1, status: 'completed', centre: 'Noida Center', kind: 'rtl',
    img: new URL('../../Website Image/verilog.png', import.meta.url).href,
    title: 'RTL Design and Verification using Verilog and SystemVerilog',
    desc: 'Master digital logic design, Verilog simulation, testbench creation, and synthesis workflows with hands-on projects.',
  },
  {
    id: 2, status: 'live', centre: 'Ropar Center', kind: 'openlane',
    img: new URL('../../Website Image/Neon OpenLane EDA Flow Chip Infographic.png', import.meta.url).href,
    title: 'Physical Design and OpenLane EDA Flow',
    desc: 'Hands-on ASIC physical design flow from RTL synthesis to GDSII layout using OpenLane and Magic tools.',
  },
  {
    id: 3, status: 'upcoming', centre: 'Imphal Center', kind: 'riscv',
    img: new URL('../../Website Image/Risc-v.png', import.meta.url).href,
    title: 'RISC-V Microarchitecture and Processor Design',
    desc: 'Learn RISC-V ISA specification, pipelined core design, hazard management, and FPGA prototyping techniques.',
  },
  {
    id: 4, status: 'live', centre: 'Patna Center', kind: 'analog',
    img: new URL('../../Website Image/Neon Mixed-Signal IC Design Infographic.png', import.meta.url).href,
    title: 'Analog and Mixed-Signal IC Design with Qflow',
    desc: 'Explore analog circuit modeling, SPICE simulation, amplifier layout, and DRC and LVS physical verification.',
  },
]

export interface StatusMeta {
  label: string
  dot: string
  fg: string
  bg: string
  bd: string
  pulse?: boolean
}

export const STATUS_META: Record<Course['status'], StatusMeta> = {
  live:      { label: 'Live Now',  dot: '#e11d48', fg: '#be123c', bg: '#fff1f2', bd: '#fecdd3', pulse: true },
  completed: { label: 'Completed', dot: '#16a34a', fg: '#15803d', bg: '#f0fdf4', bd: '#bbf7d0' },
  upcoming:  { label: 'Upcoming',  dot: '#2254C4', fg: '#1d4ed8', bg: '#eff6ff', bd: '#bfdbfe' },
}

export interface FilterItem {
  key: 'all' | 'live' | 'upcoming' | 'completed'
  label: string
}

export const FILTERS: FilterItem[] = [
  { key: 'all',       label: 'All Courses' },
  { key: 'live',      label: 'Live' },
  { key: 'upcoming',  label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
]

export interface StatItem {
  to: number
  suffix: string
  label: string
  kind: string
}

export const STATS: StatItem[] = [
  { to: 12500, suffix: '+', label: 'Total Registered Candidates', kind: 'users' },
  { to: 5200,  suffix: '+', label: 'Total Certified Candidates',  kind: 'badge' },
  { to: 48,    suffix: '',  label: 'Workshops',                   kind: 'deck' },
  { to: 6,     suffix: '',  label: 'Upcoming Workshops',          kind: 'clock' },
  { to: 3,     suffix: '',  label: 'Live Workshops',              kind: 'live' },
  { to: 39,    suffix: '',  label: 'Completed Workshops',         kind: 'check' },
]

export interface HighlightItem {
  kind: string
  title: string
  desc: string
  image: string
}

export const HIGHLIGHTS: HighlightItem[] = [
  {
    kind: 'courses',
    title: 'Digital Smart Courses',
    desc: 'Structured, industry-aligned semiconductor courses delivered online with cloud-hosted virtual labs and reproducible lab demonstrations.',
    image: new URL('../../Website Image/Course BG 1.png', import.meta.url).href,
  },
  {
    kind: 'experts',
    title: 'Industry Experts',
    desc: 'Learn directly from practising semiconductor engineers and academic mentors with real tape-out and EDA tool experience.',
    image: new URL('../../Website Image/Event 02.jpeg', import.meta.url).href,
  },
  {
    kind: 'centers',
    title: 'Multiple Centers',
    desc: 'NIELIT centres across India, including Noida, Ropar, Imphal, and Patna, deliver the program nationwide.',
    image: new URL('../../Website Image/nielit6.jpeg', import.meta.url).href,
  },
]

export interface LifecycleItem {
  n: string
  name: string
  desc: string
  image?: string
  kind?: string
}

export const LIFECYCLE: LifecycleItem[] = [
  { n: '01', name: 'RTL',             desc: 'Verilog and SystemVerilog design entry',       kind: 'rtl',      image: new URL('../../Website Image/verilog.png', import.meta.url).href },
  { n: '02', name: 'Verification',    desc: 'Testbenches, coverage, and formal checks',     kind: 'timing',   image: new URL('../../Website Image/DFT.jpeg', import.meta.url).href },
  { n: '03', name: 'Synthesis',       desc: 'Yosys RTL to gate level netlist',              kind: 'riscv',    image: new URL('../../Website Image/Asset-1.png', import.meta.url).href },
  { n: '04', name: 'Physical Design', desc: 'Floorplanning, placement, and routing via OpenLane', kind: 'openlane', image: new URL('../../Website Image/05-1.jpg', import.meta.url).href },
  { n: '05', name: 'GDSII',           desc: 'Sign off and layout ready for fabrication',   kind: 'gds',      image: new URL('../../Website Image/08.png', import.meta.url).href },
]

export interface ProgramItem {
  kind: string
  title: string
  desc: string
  href: string
  cta: string
  image: string
}

export const PROGRAMS: ProgramItem[] = [
  {
    kind: 'workshops',
    title: 'Workshops',
    desc: 'Live and recorded sessions with industry engineers covering EDA flows, verification, and tape out readiness.',
    href: 'https://echiphub.in/all-courses/',
    cta: 'View Workshops',
    image: 'Workshop BG Final (1).jpg',
  },
  {
    kind: 'courses',
    title: 'Courses',
    desc: 'NSQF-aligned bootcamps and the 90-hour ChipCraft course taking learners through the complete RTL to GDSII flow.',
    href: 'https://echiphub.in/all-courses/',
    cta: 'Browse Courses',
    image: 'new-course.jpeg',
  },
  {
    kind: 'labs',
    title: 'Labs',
    desc: 'ChipCraft Virtual Labs provide cloud-hosted, pre-configured open-source EDA toolchains accessible from anywhere.',
    href: 'https://echiphub.in/all-courses/',
    cta: 'Enter Labs',
    image: 'SOC.jpeg',
  },
]

export interface PartnerItem {
  name: string
  src: string
  href: string
}

export const PARTNERS: PartnerItem[] = [
  { name: 'MeitY',      src: 'https://echiphub.in/wp-content/uploads/2026/06/miety.png',        href: 'https://www.meity.gov.in/' },
  { name: 'NIELIT',     src: 'https://echiphub.in/wp-content/uploads/2026/06/NIELIT.png',       href: 'https://www.nielit.gov.in/' },
  { name: 'SoCTeamup',  src: 'https://echiphub.in/wp-content/uploads/2026/02/SOC-300x106.png',  href: 'https://www.socteamup.com/' },
  { name: 'SCL Mohali', src: 'https://echiphub.in/wp-content/uploads/2026/07/scllogo1.png',     href: 'https://www.scl.gov.in/' },
]

export interface GalleryItem {
  title: string
  kind: string
  image: string
  description: string
  tags: string[]
}

export const GALLERY: GalleryItem[] = [
  {
    title: 'RTL Simulation Lab',
    kind: 'rtl',
    image: 'RTL-1.jpeg',
    description: 'Covers logic entry in Verilog and VHDL and verifying hardware behavioral models before physical implementation.',
    tags: ['RTL', 'Verification'],
  },
  {
    title: 'OpenLane Physical Design',
    kind: 'openlane',
    image: '05-1.jpg',
    description: 'An automated RTL to GDSII flow performing synthesis, floorplanning, placement, clock tree synthesis, and routing using open-source EDA tools.',
    tags: ['OpenLane', 'PD'],
  },
  {
    title: 'RISC-V Core Bring-up',
    kind: 'riscv',
    image: 'SOC.jpeg',
    description: 'Design, simulation, and software execution on open-standard RISC-V CPU core pipelines.',
    tags: ['RISC-V', 'SoC'],
  },
  {
    title: 'Analog and Mixed-Signal',
    kind: 'analog',
    image: 'tile1-1024x683.jpeg',
    description: 'Simulating non-digital interfaces, such as ADCs, DACs, and Phase-Locked Loops.',
    tags: ['AMS', 'SPICE'],
  },
  {
    title: 'Timing Sign-off',
    kind: 'timing',
    image: 'DFT.jpeg',
    description: 'Static Timing Analysis to check path delays, crosstalk, setup, and hold time constraints across corners.',
    tags: ['STA', 'Timing'],
  },
  {
    title: 'GDSII Tape-out',
    kind: 'gds',
    image: '08.png',
    description: 'Final DRC and LVS physical verification and export to standard GDSII layout format ready for foundry manufacturing.',
    tags: ['GDSII', 'Tape-out'],
  },
]

export interface AnnouncementItem {
  tag: string
  text: string
  href: string
}

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    tag: 'INTERNSHIP UPDATE',
    text: 'Certification exam results for eChipHub Internship Program 2026 (Attempt 1)',
    href: 'https://echiphub.in/wp-content/uploads/2026/08/eChipHub_Internship_Provisional_List_5June_to_31July_2026.pdf',
  },
  {
    tag: 'EXAM SCHEDULE',
    text: 'eChipHub 8-Week Internship Certification Examination Schedule',
    href: 'https://echiphub.in/wp-content/uploads/2026/08/eChiphub_examination.pdf',
  },
  {
    tag: 'SELECTED CANDIDATES',
    text: 'eChipHub Internship Program (Summer 2026) list of selected candidates',
    href: 'https://echiphub.in/wp-content/uploads/2026/06/Selected-Candidate-List-eChipHub-Internship-Program-Summer-2026.pdf',
  },
  {
    tag: 'GUIDELINES',
    text: 'Internship Completion and Certification Guidelines',
    href: 'https://echiphub.in/wp-content/uploads/2026/07/Internship-Certification-Guidelines.pdf',
  },
]
