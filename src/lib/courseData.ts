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
    img: 'https://echiphub.in/wp-content/uploads/2026/02/microchip.png',
    title: 'RTL Design & Verification using Verilog & SystemVerilog',
    desc: 'Master digital logic design, Verilog simulation, testbench creation, and synthesis workflows with hands-on projects.',
  },
  {
    id: 2, status: 'live', centre: 'Ropar Center', kind: 'openlane',
    img: 'https://echiphub.in/wp-content/uploads/2026/02/technology-1.png',
    title: 'Physical Design & OpenLane EDA Flow',
    desc: 'Hands-on ASIC physical design flow from RTL synthesis to GDSII layout using OpenLane and Magic tools.',
  },
  {
    id: 3, status: 'upcoming', centre: 'Imphal Center', kind: 'riscv',
    img: 'https://echiphub.in/wp-content/uploads/2026/02/team.png',
    title: 'RISC-V Microarchitecture & Processor Design',
    desc: 'Learn RISC-V ISA specification, pipelined core design, hazard management, and FPGA prototyping techniques.',
  },
  {
    id: 4, status: 'live', centre: 'Patna Center', kind: 'analog',
    img: 'https://echiphub.in/wp-content/uploads/2026/02/graduation.png',
    title: 'Analog & Mixed-Signal IC Design with Qflow',
    desc: 'Explore analog circuit modeling, SPICE simulation, amplifier layout, and DRC/LVS physical verification.',
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
}

export const HIGHLIGHTS: HighlightItem[] = [
  {
    kind: 'courses',
    title: 'Digital Smart Courses',
    desc: 'Structured, industry-aligned semiconductor courses delivered online with cloud-hosted virtual labs and reproducible lab demonstrations.',
  },
  {
    kind: 'experts',
    title: 'Industry Experts',
    desc: 'Learn directly from practising semiconductor engineers and academic mentors with real tape-out and EDA tool experience.',
  },
  {
    kind: 'centers',
    title: 'Multiple Centers',
    desc: 'NIELIT centres across India — Noida, Ropar, Imphal, Patna and more — deliver the programme nationwide.',
  },
]

export interface LifecycleItem {
  n: string
  name: string
  desc: string
}

export const LIFECYCLE: LifecycleItem[] = [
  { n: '01', name: 'RTL',             desc: 'Verilog / SystemVerilog design entry' },
  { n: '02', name: 'Verification',    desc: 'Testbenches, coverage & formal checks' },
  { n: '03', name: 'Synthesis',       desc: 'Yosys RTL → gate-level netlist' },
  { n: '04', name: 'Physical Design', desc: 'Floorplan, place & route via OpenLane' },
  { n: '05', name: 'GDSII',           desc: 'Sign-off and layout ready for fabrication' },
]

export interface ProgramItem {
  kind: string
  title: string
  desc: string
  href: string
  cta: string
}

export const PROGRAMS: ProgramItem[] = [
  {
    kind: 'workshops',
    title: 'Workshops',
    desc: 'Live and recorded sessions with industry engineers covering EDA flows, verification and tape-out readiness.',
    href: 'https://echiphub.in/all-courses/',
    cta: 'View Workshops',
  },
  {
    kind: 'courses',
    title: 'Courses',
    desc: 'NSQF-aligned bootcamps and the 90-hour ChipCraft course taking learners through the complete RTL-to-GDSII flow.',
    href: 'https://echiphub.in/all-courses/',
    cta: 'Browse Courses',
  },
  {
    kind: 'labs',
    title: 'Labs',
    desc: 'ChipCraft Virtual Labs provide cloud-hosted, pre-configured open-source EDA toolchains accessible from anywhere.',
    href: 'https://echiphub.in/all-courses/',
    cta: 'Enter Labs',
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
}

export const GALLERY: GalleryItem[] = [
  { title: 'RTL Simulation Lab',      kind: 'rtl' },
  { title: 'OpenLane Physical Design', kind: 'openlane' },
  { title: 'RISC-V Core Bring-up',    kind: 'riscv' },
  { title: 'Analog & Mixed-Signal',   kind: 'analog' },
  { title: 'Timing Sign-off',         kind: 'timing' },
  { title: 'GDSII Tape-out',          kind: 'gds' },
]

export interface AnnouncementItem {
  tag: string
  text: string
  href: string
}

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    tag: 'INTERNSHIP UPDATE',
    text: 'Certification exam results for eChipHub Internship Program-2026 (Attempt 1)',
    href: 'https://echiphub.in/wp-content/uploads/2026/08/eChipHub_Internship_Provisional_List_5June_to_31July_2026.pdf',
  },
  {
    tag: 'EXAM SCHEDULE',
    text: 'eChipHub 8-Week Internship Certification Examination Schedule',
    href: 'https://echiphub.in/wp-content/uploads/2026/08/eChiphub_examination.pdf',
  },
  {
    tag: 'SELECTED CANDIDATES',
    text: 'eChipHub Internship Program (Summer 2026) — list of Selected candidates',
    href: 'https://echiphub.in/wp-content/uploads/2026/06/Selected-Candidate-List-eChipHub-Internship-Program-Summer-2026.pdf',
  },
  {
    tag: 'GUIDELINES',
    text: 'Internship Completion and Certification Guidelines',
    href: 'https://echiphub.in/wp-content/uploads/2026/07/Internship-Certification-Guidelines.pdf',
  },
]
