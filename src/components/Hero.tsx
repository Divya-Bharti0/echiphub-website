import { memo, useEffect, useRef } from 'react'

export const Hero = memo(function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Force muted and play to bypass strict browser autoplay policies
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().catch((e) => console.log('Autoplay prevented:', e))
    }
  }, [])

  return (
    <section
      aria-label="Semiconductor video showcase"
      className="hero relative w-full max-w-full overflow-hidden p-0 m-0 leading-none flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src="https://d2hin4uaa1z4am.cloudfront.net/wordpress-home-vdo.mp4"
        className="w-full max-w-full h-auto block object-cover object-center pointer-events-none select-none p-0 m-0"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    </section>
  )
})

export default Hero
