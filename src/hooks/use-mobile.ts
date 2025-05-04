
import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkIsMobile();
    
    // Add event listener for window resizing
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  return isMobile;
}
