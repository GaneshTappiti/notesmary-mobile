
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Handle initial check
    const checkIfMobile = () => {
      // Check both width and user agent for better detection
      const mobileByWidth = window.innerWidth < MOBILE_BREAKPOINT
      const mobileByAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobileByWidth || mobileByAgent)
      if (!isInitialized) setIsInitialized(true)
    }

    // Check immediately on component mount
    checkIfMobile()

    // Set up resize listener with debounce for performance
    let timeoutId: number | undefined
    const handleResize = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      timeoutId = window.setTimeout(() => {
        checkIfMobile()
      }, 100) // Debounce resize events
    }

    // Set up event listener
    window.addEventListener("resize", handleResize)
    
    // Use matchMedia for better compatibility 
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const handleMediaChange = (e: MediaQueryListEvent) => {
      const mobileByAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(e.matches || mobileByAgent)
    }
    
    // Try to use the newer addEventListener if available, fall back to older API
    try {
      mql.addEventListener("change", handleMediaChange)
    } catch (err) {
      // Fallback for older browsers
      mql.addListener(handleMediaChange as any)
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
      try {
        mql.removeEventListener("change", handleMediaChange)
      } catch (err) {
        // Fallback for older browsers
        mql.removeListener(handleMediaChange as any)
      }
    }
  }, [isInitialized])

  return isMobile
}

// This hook lets you respond to orientation changes
export function useOrientation() {
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>(
    typeof window !== 'undefined' 
      ? window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      : 'portrait' // Default for SSR
  )

  React.useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      )
    }

    // Check on mount and set up listeners
    handleOrientationChange()
    window.addEventListener('resize', handleOrientationChange)
    
    // Try to use orientation change event if available
    if (typeof window.orientation !== 'undefined') {
      window.addEventListener('orientationchange', handleOrientationChange)
    }

    return () => {
      window.removeEventListener('resize', handleOrientationChange)
      if (typeof window.orientation !== 'undefined') {
        window.removeEventListener('orientationchange', handleOrientationChange)
      }
    }
  }, [])

  return orientation
}
