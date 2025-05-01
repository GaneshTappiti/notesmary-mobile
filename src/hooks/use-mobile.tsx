
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== 'undefined' 
      ? window.innerWidth < MOBILE_BREAKPOINT 
      : false
  )

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Handle initial check
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check
    checkIfMobile();

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
    
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches)
    }
    
    // Try to use the newer addEventListener if available, fall back to older API
    try {
      mql.addEventListener("change", handleMediaChange as any)
    } catch (err) {
      // Fallback for older browsers
      mql.addListener(handleMediaChange as any)
    }
    
    // Initial check with matchMedia too
    handleMediaChange(mql);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
      try {
        mql.removeEventListener("change", handleMediaChange as any)
      } catch (err) {
        // Fallback for older browsers
        mql.removeListener(handleMediaChange as any)
      }
    }
  }, [])

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
    if (typeof window === 'undefined') return;
    
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
