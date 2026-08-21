export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20 pb-10 px-6"
      style={{ background: 'linear-gradient(165deg, #0f2350 0%, #14315f 55%, #0B1220 100%)', color: '#cbd5e1' }}>

      {/* subtle semiconductor circuit pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{
        backgroundImage:
          'linear-gradient(rgba(125,211,252,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.8) 1px, transparent 1px)',
        backgroundSize: '46px 46px',
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.10]" style={{
        backgroundImage: 'radial-gradient(circle, rgba(125,211,252,.9) 1.4px, transparent 1.4px)',
        backgroundSize: '46px 46px', backgroundPosition: '23px 23px',
      }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 22% 15%, rgba(41,171,226,.16) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto grid gap-12"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}>

        <div>
          <h3 className="text-[26px] font-extrabold mb-4 tracking-tight"
            style={{ background: 'linear-gradient(135deg, #7dd3fc 0%, #29abe2 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            eChipHub
          </h3>
          <p className="text-[15px] text-[#94a3b8] leading-[1.85] max-w-[340px]">
            eChipHub provides hands-on training and workshops in electronics and emerging
            technologies to build real-world skills for the semiconductor industry.
          </p>
        </div>

        <div>
          <h4 className="text-white text-[17px] font-bold mb-5 tracking-tight">Quick Links</h4>
          <ul className="space-y-3 text-[15px]">
            {[
              ['Home', '#'],
              ['All Courses', '#courses'],
              ['Community', 'https://community.echiphub.in/'],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                  className="inline-flex items-center gap-2 text-[#cbd5e1] hover:text-[#7dd3fc] transition-all duration-300 hover:translate-x-1">
                  <span className="w-1 h-1 rounded-full bg-[#7dd3fc]/60" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-[17px] font-bold mb-5 tracking-tight">Contact</h4>
          <p className="text-[15px] text-[#94a3b8] leading-[1.85]">
            Block-3, Block A, East Kidwai Nagar,<br />
            Kidwai Nagar, New Delhi,<br />
            Delhi 110023
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto mt-14 pt-7 border-t border-white/10
        flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#64748b]">
        <span>© {new Date().getFullYear()} eChipHub. All rights reserved.</span>
        <span className="font-mono tracking-[0.14em] text-[#7dd3fc]/60">RTL → GDSII</span>
      </div>
    </footer>
  )
}
