
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Handle SSR
    if (typeof window === 'undefined') return;

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
      timeoutId = window.setTimeout(checkIfMobile, 100)
    }

    window.addEventListener("resize", handleResize)
    
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}

// This hook lets you respond to orientation changes
export function useOrientation() {
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait')

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
    
    return () => {
      window.removeEventListener('resize', handleOrientationChange)
    }
  }, [])

  return orientation
}
