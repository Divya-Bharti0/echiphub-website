import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Download,
  Eye,
  Filter,
  Globe,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  User,
  Users,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'

// --- Data Definitions ---

export interface TrendDataPoint {
  date: string
  visitors: number
  pageviews: number
  sessions: number
}

export const VISITOR_30D_DATA: TrendDataPoint[] = [
  { date: 'Aug 7', visitors: 850, pageviews: 2450, sessions: 920 },
  { date: 'Aug 8', visitors: 520, pageviews: 1680, sessions: 580 },
  { date: 'Aug 9', visitors: 420, pageviews: 1340, sessions: 470 },
  { date: 'Aug 10', visitors: 1320, pageviews: 3890, sessions: 1450 },
  { date: 'Aug 11', visitors: 1100, pageviews: 3200, sessions: 1210 },
  { date: 'Aug 12', visitors: 1080, pageviews: 3150, sessions: 1190 },
  { date: 'Aug 13', visitors: 980, pageviews: 2890, sessions: 1070 },
  { date: 'Aug 14', visitors: 960, pageviews: 2810, sessions: 1050 },
  { date: 'Aug 15', visitors: 480, pageviews: 1490, sessions: 530 },
  { date: 'Aug 16', visitors: 380, pageviews: 1210, sessions: 420 },
  { date: 'Aug 17', visitors: 1760, pageviews: 5120, sessions: 1940 },
  { date: 'Aug 18', visitors: 1680, pageviews: 4920, sessions: 1850 },
  { date: 'Aug 19', visitors: 1840, pageviews: 5380, sessions: 2020 },
  { date: 'Aug 20', visitors: 1380, pageviews: 4050, sessions: 1520 },
  { date: 'Aug 21', visitors: 1250, pageviews: 3680, sessions: 1380 },
  { date: 'Aug 22', visitors: 780, pageviews: 2310, sessions: 860 },
  { date: 'Aug 23', visitors: 300, pageviews: 980, sessions: 330 },
  { date: 'Aug 24', visitors: 560, pageviews: 1720, sessions: 620 },
  { date: 'Aug 25', visitors: 1780, pageviews: 5240, sessions: 1960 },
  { date: 'Aug 26', visitors: 1100, pageviews: 3280, sessions: 1210 },
  { date: 'Aug 27', visitors: 2320, pageviews: 6840, sessions: 2550 },
  { date: 'Aug 28', visitors: 1790, pageviews: 5290, sessions: 1970 },
  { date: 'Aug 29', visitors: 890, pageviews: 2650, sessions: 980 },
  { date: 'Aug 30', visitors: 950, pageviews: 2810, sessions: 1040 },
  { date: 'Aug 31', visitors: 1620, pageviews: 4790, sessions: 1780 },
  { date: 'Sep 1', visitors: 880, pageviews: 2620, sessions: 970 },
  { date: 'Sep 2', visitors: 720, pageviews: 2150, sessions: 790 },
  { date: 'Sep 3', visitors: 790, pageviews: 2340, sessions: 870 },
  { date: 'Sep 4', visitors: 420, pageviews: 1290, sessions: 460 },
  { date: 'Sep 5', visitors: 325, pageviews: 1020, sessions: 360 },
]

export interface CountryStat {
  rank: number
  country: string
  flag: string
  code: string
  visitors: number
  share: number
  change: string
  color: string
}

export const ALL_COUNTRY_DATA: CountryStat[] = [
  { rank: 1, country: 'India', flag: '🇮🇳', code: 'IN', visitors: 61701, share: 99.88, change: '+14.6%', color: '#00a2e8' },
  { rank: 2, country: 'Taiwan (TW)', flag: '🇹🇼', code: 'TW', visitors: 12, share: 0.02, change: '+20.0%', color: '#f97316' },
  { rank: 3, country: 'United States', flag: '🇺🇸', code: 'US', visitors: 8, share: 0.01, change: '+12.5%', color: '#22c55e' },
  { rank: 4, country: 'Netherlands', flag: '🇳🇱', code: 'NL', visitors: 6, share: 0.01, change: '+0.0%', color: '#a855f7' },
  { rank: 5, country: 'Brazil', flag: '🇧🇷', code: 'BR', visitors: 3, share: 0.01, change: '+50.0%', color: '#ef4444' },
  { rank: 6, country: 'Germany', flag: '🇩🇪', code: 'DE', visitors: 3, share: 0.01, change: '+33.3%', color: '#eab308' },
  { rank: 7, country: 'Singapore', flag: '🇸🇬', code: 'SG', visitors: 2, share: 0.01, change: '+0.0%', color: '#06b6d4' },
  { rank: 8, country: 'United Kingdom', flag: '🇬🇧', code: 'GB', visitors: 2, share: 0.01, change: '+100.0%', color: '#ec4899' },
]

export interface StateStat {
  id: string
  name: string
  tier: 'top' | 'high' | 'medium' | 'low' | 'nodata'
  visitors: number
  percentage: string
  activeUsers: number
  path: string
}

export const STATE_ANALYTICS: StateStat[] = [
  {
    id: 'MH',
    name: 'Maharashtra',
    tier: 'high',
    visitors: 12450,
    percentage: '20.2%',
    activeUsers: 4,
    path: 'M 135,295 C 195,288 238,312 232,365 C 215,405 155,412 138,375 C 122,345 125,312 135,295 Z',
  },
  {
    id: 'KA',
    name: 'Karnataka',
    tier: 'top',
    visitors: 9820,
    percentage: '15.9%',
    activeUsers: 3,
    path: 'M 152,375 C 202,368 215,412 208,465 C 195,502 165,495 148,458 C 138,422 140,392 152,375 Z',
  },
  {
    id: 'DL',
    name: 'Delhi NCR & Haryana',
    tier: 'high',
    visitors: 8760,
    percentage: '14.2%',
    activeUsers: 3,
    path: 'M 198,150 C 218,150 225,162 222,180 C 215,195 195,198 185,185 C 180,172 188,158 198,150 Z',
  },
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    tier: 'high',
    visitors: 7430,
    percentage: '12.0%',
    activeUsers: 2,
    path: 'M 222,168 C 268,162 312,192 315,228 C 305,252 260,255 235,238 C 215,220 212,188 222,168 Z',
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    tier: 'medium',
    visitors: 6890,
    percentage: '11.2%',
    activeUsers: 2,
    path: 'M 195,475 C 235,465 242,518 215,575 C 195,585 182,545 188,505 C 190,488 192,478 195,475 Z',
  },
  {
    id: 'RJ',
    name: 'Rajasthan',
    tier: 'medium',
    visitors: 5820,
    percentage: '9.4%',
    activeUsers: 1,
    path: 'M 125,162 C 160,150 185,168 185,200 C 182,235 145,260 115,245 C 95,225 105,182 125,162 Z',
  },
  {
    id: 'TS',
    name: 'Telangana',
    tier: 'high',
    visitors: 5420,
    percentage: '8.8%',
    activeUsers: 2,
    path: 'M 215,355 C 255,348 268,375 258,412 C 242,432 215,425 205,398 C 200,378 205,362 215,355 Z',
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    tier: 'medium',
    visitors: 5120,
    percentage: '8.3%',
    activeUsers: 1,
    path: 'M 88,235 C 125,232 145,252 140,292 C 125,325 85,315 72,282 C 65,258 75,242 88,235 Z',
  },
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    tier: 'medium',
    visitors: 3950,
    percentage: '6.4%',
    activeUsers: 1,
    path: 'M 175,235 C 235,228 275,252 268,295 C 255,325 195,332 165,305 C 150,282 155,250 175,235 Z',
  },
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    tier: 'medium',
    visitors: 3620,
    percentage: '5.9%',
    activeUsers: 1,
    path: 'M 248,378 C 285,365 292,412 265,475 C 242,488 230,448 238,412 C 240,395 242,385 248,378 Z',
  },
  {
    id: 'WB',
    name: 'West Bengal',
    tier: 'high',
    visitors: 2840,
    percentage: '4.6%',
    activeUsers: 1,
    path: 'M 362,225 C 382,228 375,255 365,285 C 350,305 338,285 345,255 C 350,238 355,228 362,225 Z',
  },
  {
    id: 'KL',
    name: 'Kerala',
    tier: 'low',
    visitors: 2780,
    percentage: '4.5%',
    activeUsers: 1,
    path: 'M 165,488 C 185,485 190,528 178,575 C 168,578 158,545 162,512 C 162,498 165,490 165,488 Z',
  },
]

const TIER_COLORS = {
  nodata: '#e0f2fe',
  low: '#93c5fd',
  medium: '#3b82f6',
  high: '#1d4ed8',
  top: '#172554',
}

const TIER_LABELS = [
  { key: 'nodata', label: 'No data', color: '#e0f2fe', text: '#334155' },
  { key: 'low', label: 'Low', color: '#93c5fd', text: '#1e3a8a' },
  { key: 'medium', label: 'Medium', color: '#3b82f6', text: '#ffffff' },
  { key: 'high', label: 'High', color: '#1d4ed8', text: '#ffffff' },
  { key: 'top', label: 'Top', color: '#172554', text: '#ffffff' },
]

// Smooth Catmull-Rom to cubic Bezier curve generator
function generateSmoothPath(points: [number, number][]): string {
  if (points.length === 0) return ''
  if (points.length === 1) return `M ${points[0][0]},${points[0][1]}`

  let path = `M ${points[0][0]},${points[0][1]}`

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6

    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6

    path += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`
  }

  return path
}

export default function SiteAnalytics() {
  // Metric toggles & filters
  const [metricTab, setMetricTab] = useState<'visitors' | 'pageviews' | 'sessions'>('visitors')
  const [timeRange, setTimeRange] = useState<'30D' | '14D' | '7D'>('30D')
  const [countrySearch, setCountrySearch] = useState('')
  const [showAllCountries, setShowAllCountries] = useState(false)
  const [hoveredTrendIdx, setHoveredTrendIdx] = useState<number | null>(null)
  const [hoveredState, setHoveredState] = useState<StateStat | null>(null)
  const [selectedState, setSelectedState] = useState<StateStat | null>(null)
  const [stateModalOpen, setStateModalOpen] = useState(false)
  const [exportedNotice, setExportedNotice] = useState(false)

  // Filter trend data by time range
  const filteredTrendData = useMemo(() => {
    if (timeRange === '7D') return VISITOR_30D_DATA.slice(-7)
    if (timeRange === '14D') return VISITOR_30D_DATA.slice(-14)
    return VISITOR_30D_DATA
  }, [timeRange])

  // Filter countries by search query
  const filteredCountries = useMemo(() => {
    return ALL_COUNTRY_DATA.filter((c) =>
      c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
    )
  }, [countrySearch])

  const displayedCountries = showAllCountries ? filteredCountries : filteredCountries.slice(0, 5)

  // Top 5 states ranking
  const topStates = useMemo(() => {
    return [...STATE_ANALYTICS].sort((a, b) => b.visitors - a.visitors).slice(0, 5)
  }, [])

  // Chart coordinate calculations
  const width = 1000
  const height = 300
  const padLeft = 60
  const padRight = 30
  const padTop = 30
  const padBottom = 60

  const maxVal = useMemo(() => {
    const vals = filteredTrendData.map((d) => d[metricTab])
    const m = Math.max(...vals, 100)
    return Math.ceil(m / 500) * 500
  }, [filteredTrendData, metricTab])

  const yTicks = useMemo(() => {
    const step = maxVal / 5
    return [maxVal, step * 4, step * 3, step * 2, step * 1, 0].map(Math.round)
  }, [maxVal])

  const points: [number, number][] = useMemo(() => {
    const chartW = width - padLeft - padRight
    const chartH = height - padTop - padBottom
    const step = chartW / (filteredTrendData.length - 1)

    return filteredTrendData.map((d, i) => {
      const x = padLeft + i * step
      const y = padTop + chartH - (d[metricTab] / maxVal) * chartH
      return [x, y]
    })
  }, [filteredTrendData, metricTab, maxVal, width, height, padLeft, padRight, padTop, padBottom])

  const linePath = useMemo(() => generateSmoothPath(points), [points])

  const areaPath = useMemo(() => {
    if (points.length === 0) return ''
    const bottomY = height - padBottom
    const startX = points[0][0]
    const endX = points[points.length - 1][0]
    return `${linePath} L ${endX},${bottomY} L ${startX},${bottomY} Z`
  }, [linePath, points, height, padBottom])

  const hoveredPoint = hoveredTrendIdx !== null && points[hoveredTrendIdx] ? points[hoveredTrendIdx] : null
  const hoveredData = hoveredTrendIdx !== null && filteredTrendData[hoveredTrendIdx] ? filteredTrendData[hoveredTrendIdx] : null

  const handleExport = () => {
    setExportedNotice(true)
    setTimeout(() => setExportedNotice(false), 3000)
  }

  return (
    <section className="section py-16 bg-[#f8fafc] border-y border-[#e2e8f0]/80" aria-labelledby="site-analytics-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Top Sticky-Style Header & Live Counter ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#e2e8f0]">
          <div>
            <div className="flex items-center gap-3">
              <h2 id="site-analytics-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                Site Analytics Dashboard
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                14 Active Now
              </span>
            </div>
            <p className="mt-1 text-sm text-[#64748b]">
              Real-time platform traffic, audience engagement, and geographical distribution.
            </p>
          </div>

          {/* Date Range Quick Filter & Export Controls */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Range Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
              {(['7D', '14D', '30D'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    timeRange === r
                      ? 'bg-[#2254C4] text-white shadow-xs'
                      : 'text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]'
                  }`}
                >
                  {r === '30D' ? 'Last 30 Days' : r === '14D' ? 'Last 14 Days' : 'Last 7 Days'}
                </button>
              ))}
            </div>

            {/* Export Button */}
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] text-xs font-bold text-[#0f172a] shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              {exportedNotice ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5 text-[#2254C4]" />}
              {exportedNotice ? 'Exported CSV' : 'Export Data'}
            </button>
          </div>
        </div>

        {/* ── 4 Modern KPI Summary Cards with Micro-Sparklines ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {/* KPI 1: Total Visitors */}
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(34,84,196,0.08)] hover:border-[#2254C4]/30 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#2254C4]/10 text-[#2254C4] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ArrowUpRight className="w-3 h-3" /> +14.8%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              61,724
            </div>
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mt-1">
              Total Visitors
            </div>
            <div className="mt-3 pt-3 border-t border-[#f1f5f9] text-[11px] text-[#94a3b8] flex items-center justify-between">
              <span>vs. prior 30 days</span>
              <span className="font-semibold text-emerald-600">+7,980 new</span>
            </div>
          </div>

          {/* KPI 2: Daily Visitors (Sep 5) */}
          <div className="bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white rounded-2xl p-5 shadow-[0_8px_24px_rgba(2,132,199,0.24)] hover:shadow-[0_14px_32px_rgba(2,132,199,0.32)] transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center backdrop-blur-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-white/20 text-white border border-white/20">
                Sep 5 · Today
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              325
            </div>
            <div className="text-xs font-bold text-white/85 uppercase tracking-wider mt-1">
              Visitors Today
            </div>
            <div className="mt-3 pt-3 border-t border-white/15 text-[11px] text-white/75 flex items-center justify-between">
              <span>Peak hour: 14:00 IST</span>
              <span className="font-semibold text-white">+8.2% vs avg</span>
            </div>
          </div>

          {/* KPI 3: Avg Session Duration */}
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(34,84,196,0.08)] hover:border-[#2254C4]/30 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ArrowUpRight className="w-3 h-3" /> +12.4%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              4m 32s
            </div>
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mt-1">
              Avg. Session Duration
            </div>
            <div className="mt-3 pt-3 border-t border-[#f1f5f9] text-[11px] text-[#94a3b8] flex items-center justify-between">
              <span>Course lab engagement</span>
              <span className="font-semibold text-indigo-600">High Depth</span>
            </div>
          </div>

          {/* KPI 4: Bounce Rate */}
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(34,84,196,0.08)] hover:border-[#2254C4]/30 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ArrowDownRight className="w-3 h-3" /> -3.1%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              28.4%
            </div>
            <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mt-1">
              Bounce Rate
            </div>
            <div className="mt-3 pt-3 border-t border-[#f1f5f9] text-[11px] text-[#94a3b8] flex items-center justify-between">
              <span>Industry benchmark: 42%</span>
              <span className="font-semibold text-emerald-600">Optimal</span>
            </div>
          </div>
        </div>

        {/* ── Interactive Visitor Trend Chart Card ── */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#e2e8f0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8 overflow-hidden">
          {/* Chart Header & Metric Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2254C4]/10 text-[#2254C4] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a]">
                  Traffic Dynamics &amp; Trend
                </h3>
                <span className="text-xs text-[#64748b]">
                  Showing {metricTab === 'visitors' ? 'Unique Visitors' : metricTab === 'pageviews' ? 'Total Pageviews' : 'Active Sessions'} across selected timeline
                </span>
              </div>
            </div>

            {/* Metric Selector Tabs */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#f1f5f9] border border-[#e2e8f0]">
              {(
                [
                  { key: 'visitors', label: 'Visitors' },
                  { key: 'pageviews', label: 'Pageviews' },
                  { key: 'sessions', label: 'Sessions' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setMetricTab(tab.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    metricTab === tab.key
                      ? 'bg-white text-[#2254C4] shadow-xs'
                      : 'text-[#64748b] hover:text-[#0f172a]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Interactive Area Chart */}
          <div className="relative w-full overflow-x-auto select-none">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto min-w-[700px] overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="visitorDynamicGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.32" />
                  <stop offset="60%" stopColor="#0284c7" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.00" />
                </linearGradient>

                <filter id="areaLineGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.28" />
                </filter>
              </defs>

              {/* Horizontal Gridlines & Y-Axis Markers */}
              {yTicks.map((tick) => {
                const y = padTop + (height - padTop - padBottom) - (tick / maxVal) * (height - padTop - padBottom)
                return (
                  <g key={tick}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={width - padRight}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      strokeDasharray={tick === 0 ? '0' : '3 3'}
                    />
                    <text
                      x={padLeft - 12}
                      y={y + 4}
                      textAnchor="end"
                      fill="#94a3b8"
                      fontSize="11.5"
                      fontFamily="Inter, system-ui, sans-serif"
                    >
                      {tick.toLocaleString('en-US')}
                    </text>
                  </g>
                )
              })}

              {/* Dynamic Gradient Area */}
              <motion.path
                key={`area-${metricTab}-${timeRange}`}
                d={areaPath}
                fill="url(#visitorDynamicGrad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Dynamic Line Path */}
              <motion.path
                key={`line-${metricTab}-${timeRange}`}
                d={linePath}
                fill="none"
                stroke="#0284c7"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#areaLineGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />

              {/* Interactive Data Hotspots */}
              {points.map(([x, y], idx) => {
                const isHovered = hoveredTrendIdx === idx
                return (
                  <g key={idx} className="cursor-pointer">
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="transparent"
                      onMouseEnter={() => setHoveredTrendIdx(idx)}
                      onMouseLeave={() => setHoveredTrendIdx(null)}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? '5.5' : '3'}
                      fill={isHovered ? '#0284c7' : '#ffffff'}
                      stroke="#0284c7"
                      strokeWidth={isHovered ? '2.5' : '1.8'}
                      className="transition-all duration-150 pointer-events-none"
                    />
                  </g>
                )
              })}

              {/* X-Axis Date Labels */}
              {points.map(([x], idx) => {
                const item = filteredTrendData[idx]
                const y = height - padBottom + 16
                return (
                  <text
                    key={idx}
                    x={x}
                    y={y}
                    transform={`rotate(-45, ${x}, ${y})`}
                    textAnchor="end"
                    fill="#94a3b8"
                    fontSize="10.5"
                    fontWeight="500"
                    fontFamily="Inter, system-ui, sans-serif"
                    className="select-none"
                  >
                    {item.date}
                  </text>
                )
              })}

              {/* Floating Custom HTML-style SVG Tooltip */}
              {hoveredPoint && hoveredData && (
                <g className="pointer-events-none">
                  <line
                    x1={hoveredPoint[0]}
                    y1={padTop}
                    x2={hoveredPoint[0]}
                    y2={height - padBottom}
                    stroke="#0284c7"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />

                  <g
                    transform={`translate(${Math.min(
                      Math.max(hoveredPoint[0] - 65, padLeft),
                      width - padRight - 130
                    )}, ${Math.max(hoveredPoint[1] - 56, padTop - 10)})`}
                  >
                    <rect
                      width="130"
                      height="46"
                      rx="8"
                      fill="#0f172a"
                      fillOpacity="0.94"
                      className="drop-shadow-lg"
                    />
                    <text
                      x="65"
                      y="16"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9.5"
                      fontWeight="600"
                      fontFamily="Inter, system-ui, sans-serif"
                    >
                      {hoveredData.date}
                    </text>
                    <text
                      x="65"
                      y="34"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="13"
                      fontWeight="800"
                      fontFamily="Inter, system-ui, sans-serif"
                    >
                      {hoveredData[metricTab].toLocaleString()}{' '}
                      <tspan fontSize="9" fill="#7dd3fc" fontWeight="600">
                        {metricTab}
                      </tspan>
                    </text>
                  </g>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* ── Geographic & Regional Analytics ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Country Breakdown Widget */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div>
              {/* Header & Search Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#0284c7]" />
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a]">
                    Country Distribution
                  </h3>
                </div>

                {/* Country Search */}
                <div className="relative w-full sm:w-44">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  />
                </div>
              </div>

              {/* Segmented Top Summary Bar */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between text-xs mb-2 font-bold">
                  <span className="text-slate-600">Primary Audience Concentration:</span>
                  <span className="text-[#0284c7]">99.88% (India)</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#00a2e8]" style={{ width: '99.88%' }} title="India: 99.88%" />
                  <div className="h-full bg-[#f97316]" style={{ width: '0.05%' }} title="Taiwan: 0.02%" />
                  <div className="h-full bg-[#22c55e]" style={{ width: '0.04%' }} title="USA: 0.01%" />
                  <div className="h-full bg-[#a855f7]" style={{ width: '0.03%' }} title="Others: 0.05%" />
                </div>
              </div>

              {/* Country Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e2e8f0] text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                      <th className="py-2.5 px-3 w-10">#</th>
                      <th className="py-2.5 px-3">Country</th>
                      <th className="py-2.5 px-3 text-right">Visitors</th>
                      <th className="py-2.5 px-3 text-right w-28">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9] text-xs">
                    {displayedCountries.map((row) => (
                      <tr key={row.rank} className="hover:bg-[#f8fafc] transition-colors">
                        <td className="py-3 px-3 font-semibold text-[#64748b]">{row.rank}</td>
                        <td className="py-3 px-3 font-bold text-[#0f172a]">
                          <span className="mr-2 text-sm">{row.flag}</span>
                          {row.country}
                        </td>
                        <td className="py-3 px-3 text-right font-extrabold text-[#0f172a]">
                          {row.visitors.toLocaleString('en-US')}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-12 h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden shrink-0">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${Math.max(row.share, 4)}%`,
                                  backgroundColor: row.color,
                                }}
                              />
                            </div>
                            <span className="text-[11px] font-semibold text-[#64748b] w-7">
                              {row.share > 1 ? `${row.share}%` : '<0.1%'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Accordion / Expand Button */}
            {filteredCountries.length > 5 && (
              <div className="pt-4 border-t border-slate-100 text-center mt-2">
                <button
                  type="button"
                  onClick={() => setShowAllCountries(!showAllCountries)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:underline cursor-pointer"
                >
                  {showAllCountries ? 'Show Less Countries' : `View All ${filteredCountries.length} Countries`}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllCountries ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </div>

          {/* Card 2: Interactive India State-wise Map & Top 5 Leaderboard */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div>
              {/* Header with Flag & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇮🇳</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a]">
                      India — Regional Analytics
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStateModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-white bg-[#f97316] hover:bg-[#ea580c] shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    State Details
                  </button>
                </div>
              </div>

              {/* Grid: Map on Left + Top 5 States on Right */}
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-4 items-center">
                {/* Map Display with Interactive Overlay */}
                <div className="relative w-full h-[280px] sm:h-[300px] flex items-center justify-center bg-white rounded-2xl border border-[#eef2f8] p-2 overflow-hidden group/map">
                  <img
                    src="/images/general/india-map-stat.png"
                    alt="India State-wise Visitor Map"
                    className="w-full h-full max-h-[290px] object-contain select-none drop-shadow-sm transition-transform duration-300 group-hover/map:scale-[1.02]"
                  />

                  {/* SVG Hotspots Overlay */}
                  <svg
                    viewBox="50 15 450 580"
                    className="absolute inset-0 w-full h-full max-h-[290px] my-auto pointer-events-auto"
                  >
                    {STATE_ANALYTICS.map((state) => {
                      const isHovered = hoveredState?.id === state.id || selectedState?.id === state.id

                      return (
                        <path
                          key={state.id}
                          d={state.path}
                          fill="transparent"
                          stroke={isHovered ? '#00f0ff' : 'transparent'}
                          strokeWidth="2.5"
                          className="transition-all duration-150 cursor-pointer"
                          onMouseEnter={() => setHoveredState(state)}
                          onMouseLeave={() => setHoveredState(null)}
                          onClick={() => setSelectedState(selectedState?.id === state.id ? null : state)}
                        >
                          <title>{`${state.name}: ${state.visitors.toLocaleString()} visitors (${state.percentage})`}</title>
                        </path>
                      )
                    })}
                  </svg>

                  {/* Floating Hover Badge */}
                  {hoveredState && (
                    <div className="absolute top-3 right-3 pointer-events-none bg-[#0f172a]/95 backdrop-blur-md text-white px-3 py-2 rounded-xl border border-white/15 shadow-xl text-left z-20">
                      <div className="text-[10.5px] font-bold text-[#7dd3fc] uppercase tracking-wider">
                        {hoveredState.name}
                      </div>
                      <div className="text-[14px] font-black text-white">
                        {hoveredState.visitors.toLocaleString()} <span className="text-[10px] font-normal text-slate-300">visitors</span>
                      </div>
                      <div className="text-[9.5px] font-mono text-slate-400">
                        Share: {hoveredState.percentage} · Tier: {hoveredState.tier.toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Top 5 Leaderboard List */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Top Regions:
                  </div>
                  {topStates.map((st, i) => {
                    const isSelected = selectedState?.id === st.id || hoveredState?.id === st.id
                    return (
                      <div
                        key={st.id}
                        onMouseEnter={() => setHoveredState(st)}
                        onMouseLeave={() => setHoveredState(null)}
                        onClick={() => setSelectedState(selectedState?.id === st.id ? null : st)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50 border-[#0284c7] shadow-xs'
                            : 'bg-slate-50/70 border-slate-100 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-white border border-slate-200 text-[10px] font-black text-slate-600 flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800 line-clamp-1">{st.name}</span>
                        </div>
                        <span className="text-xs font-extrabold text-[#0284c7] shrink-0">
                          {st.visitors.toLocaleString()}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Density Legend */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5">
                {TIER_LABELS.map((t) => (
                  <div
                    key={t.key}
                    className="px-3 py-1 rounded-md text-[11px] font-bold shadow-xs border border-black/5"
                    style={{ backgroundColor: t.color, color: t.text }}
                  >
                    {t.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── State Details Full Ranking Modal ── */}
      {stateModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇮🇳</span>
                <h3 className="text-xl font-extrabold text-[#0f172a]">All Indian States &amp; Regions Breakdown</h3>
              </div>
              <button
                type="button"
                onClick={() => setStateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3">State / Region</th>
                    <th className="py-2.5 px-3 text-right">Visitors</th>
                    <th className="py-2.5 px-3 text-right">Share</th>
                    <th className="py-2.5 px-3 text-center">Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {STATE_ANALYTICS.sort((a, b) => b.visitors - a.visitors).map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-[#0f172a]">{st.name}</td>
                      <td className="py-3 px-3 text-right font-extrabold text-[#0284c7]">
                        {st.visitors.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-slate-600">{st.percentage}</td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase"
                          style={{
                            backgroundColor: TIER_COLORS[st.tier],
                            color: st.tier === 'low' || st.tier === 'nodata' ? '#1e293b' : '#ffffff',
                          }}
                        >
                          {st.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
