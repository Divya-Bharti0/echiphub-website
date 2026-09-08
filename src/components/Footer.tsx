import { ChevronRight, MapPin } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'All Courses', href: '#courses' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Labs', href: '#labs' },
  { label: 'Academic Alliances', href: '#alliances' },
  { label: 'Discuss', href: 'https://community.echiphub.in/', external: true },
  { label: 'HelpDesk', href: '#helpdesk' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-12 pb-7 px-6 sm:px-8 lg:px-12"
      style={{ background: 'linear-gradient(165deg, #091a3e 0%, #0d234d 50%, #07101f 100%)', color: '#cbd5e1' }}
      role="contentinfo"
    >
      {/* subtle semiconductor circuit grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(125,211,252,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.7) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(125,211,252,.8) 1.2px, transparent 1.2px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '20px 20px',
        }}
      />
      {/* subtle ambient blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 50% at 18% 20%, rgba(41,171,226,.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1.1fr] gap-10 md:gap-8 lg:gap-14 items-start">
        {/* COLUMN 1 — eChipHub */}
        <div>
          <h3
            className="text-[26px] font-extrabold mb-3 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #7dd3fc 0%, #29abe2 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            eChipHub
          </h3>
          <p className="text-[14px] text-[#94a3b8] leading-[1.75] max-w-[360px]">
            eChipHub provides hands-on training and workshops in electronics and emerging
            technologies to build real-world skills for the semiconductor industry.
          </p>
          {/* Subtle cyan accent circuit line */}
          <div
            className="w-12 h-[2px] rounded-full mt-4"
            style={{
              background: 'linear-gradient(90deg, #29abe2 0%, #7dd3fc 60%, transparent 100%)',
              opacity: 0.8,
            }}
            aria-hidden="true"
          />
        </div>

        {/* COLUMN 2 — QUICK LINKS */}
        <div>
          <h4 className="text-white text-[16.5px] font-bold mb-3.5 tracking-tight">Quick Links</h4>
          <nav aria-label="Footer Quick Links">
            <ul className="space-y-1.5 text-[14px]">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group inline-flex items-center gap-1.5 text-[#cbd5e1] hover:text-[#7dd3fc] focus-visible:text-[#7dd3fc] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7dd3fc]/40 rounded-sm transition-all duration-200"
                  >
                    <ChevronRight
                      className="w-3.5 h-3.5 text-[#7dd3fc]/50 group-hover:text-[#7dd3fc] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* COLUMN 3 — CONTACT */}
        <div id="contact">
          <h4 className="text-white text-[16.5px] font-bold mb-3.5 tracking-tight">Contact</h4>
          <div className="flex items-start gap-2.5 text-[14px] text-[#94a3b8] leading-[1.75]">
            <MapPin className="w-4 h-4 text-[#7dd3fc] mt-1 flex-shrink-0 opacity-80" aria-hidden="true" />
            <address className="not-italic">
              Block-3, Block A, East Kidwai Nagar,<br />
              Kidwai Nagar, New Delhi,<br />
              Delhi 110023
            </address>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="relative z-10 max-w-[1400px] mx-auto mt-9 pt-5 border-t border-white/[0.08]">
        <div
          className="absolute top-0 left-0 w-24 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, rgba(41,171,226,0.6) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        <p className="text-[13px] text-[#94a3b8] text-left tracking-wide">
          © NIELIT 2026, All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
