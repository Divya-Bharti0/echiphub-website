import { useEffect, useState } from 'react'

export type DeviceTier = 'loading' | 'high' | 'low' | 'static'

export interface DeviceTierInfo {
  tier: DeviceTier
  isStatic: boolean
  isLow: boolean
  reduced: boolean
  isMobile: boolean
}

// Test WebGL support using ONE shared canvas — never create multiple canvases
let _webglSupported: boolean | null = null
function isWebGLSupported(): boolean {
  if (_webglSupported !== null) return _webglSupported
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    _webglSupported = !!gl
    // Immediately lose the context to free the slot
    if (gl) {
      const ext = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')
      if (ext) ext.loseContext()
    }
  } catch {
    _webglSupported = false
  }
  return _webglSupported
}

function computeTier(): DeviceTier {
  if (typeof window === 'undefined') return 'loading'
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent) || window.innerWidth < 900
  const cores = navigator.hardwareConcurrency || 2
  const hasGL = isWebGLSupported()
  if (reduced || !hasGL) return 'static'
  if (isMobile || cores <= 4) return 'low'
  return 'high'
}

export function useDeviceTier(): DeviceTierInfo {
  const [tier, setTier] = useState<DeviceTier>(() => computeTier())
  const [mobile, setMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent) || window.innerWidth < 900
  })

  useEffect(() => {
    // Re-compute once on mount (handles SSR hydration mismatch)
    const t = computeTier()
    const isMob = /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent) || window.innerWidth < 900
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
