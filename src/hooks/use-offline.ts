
import { useState, useEffect, useCallback } from 'react';

export function useOffline() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [wasOffline, setWasOffline] = useState<boolean>(false);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(null);
  
  // Function to check if we're online via Capacitor
  const checkNetworkStatus = useCallback(async () => {
    try {
      const Network = await import('@capacitor/network').then(module => module.Network);
      const status = await Network.getStatus();
      return status.connected;
    } catch (error) {
      console.error('Error checking network status:', error);
      
      // Fallback to browser API if Capacitor is not available
      return navigator.onLine;
    }
  }, []);
  
  // Initialize network status
  useEffect(() => {
    const initNetworkStatus = async () => {
      const online = await checkNetworkStatus();
      setIsOnline(online);
      if (online) {
        setLastOnlineTime(new Date());
      }
    };
    
    initNetworkStatus();
  }, [checkNetworkStatus]);
  
  // Set up network status listeners
  useEffect(() => {
    const setupNetworkListeners = async () => {
      try {
        // Try to use Capacitor's Network API
        const Network = await import('@capacitor/network').then(module => module.Network);
        
        // Add network listener
        Network.addListener('networkStatusChange', (status) => {
          const nowOnline = status.connected;
          setIsOnline(nowOnline);
          
          if (!nowOnline && isOnline) {
            setWasOffline(true);
          }
          
          if (nowOnline) {
            setLastOnlineTime(new Date());
          }
        });
        
        // Return cleanup function
        return () => {
          Network.removeAllListeners().catch(err => 
            console.error('Error removing network listeners:', err)
          );
        };
      } catch (error) {
        console.error('Error setting up Capacitor network listeners:', error);
        
        // Fallback to browser events
        const handleOnline = () => {
          setIsOnline(true);
          setLastOnlineTime(new Date());
        };
        
        const handleOffline = () => {
          setIsOnline(false);
          if (isOnline) {
            setWasOffline(true);
          }
        };
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        };
      }
    };
    
    const cleanup = setupNetworkListeners();
    return () => {
      cleanup.then(fn => fn?.());
    };
  }, [isOnline]);
  
  // Reset the "wasOffline" flag after a period of time being online
  useEffect(() => {
    if (isOnline && wasOffline) {
      const timer = setTimeout(() => {
        setWasOffline(false);
      }, 5000); // Reset after 5 seconds of being back online
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);
  
  return {
    isOnline,
    wasOffline,
    lastOnlineTime,
    checkNetworkStatus
  };
}
