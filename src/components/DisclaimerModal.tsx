import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChipGraphic from './ChipGraphic'

interface DisclaimerModalProps {
  open: boolean
  onClose: () => void
}

export default function DisclaimerModal({ open, onClose }: DisclaimerModalProps) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const agree = () => {
    onClose()
    window.location.href = 'https://echiphub.in/wp-login.php?action=register'
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog" aria-modal="true" aria-labelledby="disclaimer-title"
          className="fixed inset-0 z-[99999] overflow-y-auto flex items-start justify-center p-4 md:p-8"
          style={{ background: 'rgba(8,17,38,.72)', backdropFilter: 'blur(10px)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.965 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-[1080px] my-6 overflow-hidden"
            style={{
              borderRadius: 32,
              background: 'linear-gradient(150deg, #29abe2 0%, #1e77d4 48%, #1e4fa8 100%)',
              border: '1px solid rgba(255,255,255,.20)',
              boxShadow: '0 40px 100px rgba(8,17,38,.55), 0 0 0 1px rgba(255,255,255,.08) inset',
            }}
          >
            {/* subtle circuit texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.10]" style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.9) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }} />

            {/* close */}
            <button onClick={onClose} aria-label="Close disclaimer"
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center
                         text-white text-[22px] leading-none transition-all duration-300 hover:rotate-90"
              style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.26)' }}>
              ×
            </button>

            <div className="relative z-10 p-8 md:p-14">
              {/* badge */}
              <div className="text-center mb-9">
                <h2 id="disclaimer-title"
                  className="inline-block font-black italic uppercase tracking-[3px] text-[#FFE600]"
                  style={{
                    fontSize: 'clamp(19px, 3.6vw, 30px)',
                    padding: '14px 44px',
                    borderRadius: 999,
                    border: '3px solid #FFE600',
                    background: 'linear-gradient(135deg, #1a4a6b 0%, #0d2d42 100%)',
                    boxShadow: 'inset 0 4px 12px rgba(0,0,0,.42), 0 8px 24px rgba(0,0,0,.30), 0 0 44px rgba(255,230,0,.22)',
                  }}>
                  Important Disclaimer
                </h2>
              </div>

              <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
                {/* text */}
                <div className="space-y-5">
                  <p className="leading-[1.9] text-[17px] text-white text-justify">
                    The <strong>ChipCraft Virtual Lab</strong> Environment is developed as part of an
                    educational initiative under a MeitY-supported project, jointly implemented by
                    NIELIT and SoCTeamup Semiconductors Pvt. Ltd.
                  </p>
                  <p className="leading-[1.9] text-[17px] text-white text-justify">
                    This platform hosts various open-source Electronic Design Automation (EDA) tools
                    and workflows, including but not limited to ventilator, Yosys, OpenLane, Qflow,
                    Magic, Netgen, Klayout, OpenSTA etc.
                  </p>
                </div>

                {/* 3D chip illustration */}
                <div className="hidden lg:flex items-center justify-center shrink-0">
                  <div className="w-[210px] h-[210px] rounded-full flex items-center justify-center relative"
                    style={{ background: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,.20), rgba(255,255,255,.04))', border: '1px solid rgba(255,255,255,.24)' }}>
                    <div className="absolute inset-3 rounded-full border border-dashed border-white/25"
                      style={{ animation: 'spin 22s linear infinite' }} />
                    <ChipGraphic kind="openlane" className="w-[150px] h-[150px] relative z-10" id="modal-chip" />
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-11">
                <button onClick={agree}
                  className="btn-shine w-full sm:w-auto px-16 py-[18px] rounded-full text-white text-[17px] font-bold
                             transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #ff8c42 0%, #e55a1f 100%)', boxShadow: '0 10px 26px rgba(229,90,31,.36)' }}>
                  I Agree &amp; Continue
                </button>
                <button onClick={onClose}
                  className="w-full sm:w-auto px-10 py-[18px] rounded-full text-white/90 text-[16px] font-semibold
                             transition-all duration-300 hover:bg-white/12"
                  style={{ border: '1px solid rgba(255,255,255,.32)' }}>
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
