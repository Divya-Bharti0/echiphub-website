import { useState, useEffect } from 'react'

export type DeviceTier = 'loading' | 'high' | 'low' | 'static'

export interface DeviceTierInfo {
  tier: DeviceTier
  isStatic: boolean
  isLow: boolean
  reduced: boolean
  isMobile: boolean
}

export function useDeviceTier(): DeviceTierInfo {
  const [tier, setTier] = useState<DeviceTier>('loading')
  const [mobile, setMobile] = useState<boolean>(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMob = /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent) || window.innerWidth < 900
    const cores = navigator.hardwareConcurrency || 2
    const gl = document.createElement('canvas').getContext('webgl2') || document.createElement('canvas').getContext('webgl')
    let t: DeviceTier = 'high'
    if (reduced || !gl) t = 'static'
    else if (isMob || cores <= 4) t = 'low'
    setTier(t)
    setMobile(isMob)
  }, [])

  return {
    tier,
    isStatic: tier === 'static',
    isLow: tier === 'low',
    reduced: tier === 'static',
    isMobile: mobile,
  }
}
