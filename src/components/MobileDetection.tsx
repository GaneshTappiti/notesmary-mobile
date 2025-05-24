
import React, { useState, useEffect } from 'react';
import App from '@/App';

const MobileDetection = () => {
  const [isNativePlatform, setIsNativePlatform] = useState(false);
  const [initializing, setInitializing] = useState(true);
  
  useEffect(() => {
    // Check if running on a native platform (Android/iOS)
    const checkPlatform = async () => {
      try {
        // Only try to import Capacitor if we're actually in a Capacitor environment
        if (window.Capacitor) {
          const { Capacitor } = await import('@capacitor/core');
          const isNative = Capacitor.isNativePlatform();
          setIsNativePlatform(isNative);
          
          // Add appropriate classes to body
          if (isNative) {
            document.body.classList.add('capacitor-app');
            
            // Add platform-specific classes
            if (Capacitor.getPlatform() === 'ios') {
              document.body.classList.add('ios');
            } else if (Capacitor.getPlatform() === 'android') {
              document.body.classList.add('android');
            }
          }
        } else {
          // We're on web, not native
          setIsNativePlatform(false);
        }
      } catch (error) {
        console.error('Error initializing Capacitor:', error);
        setIsNativePlatform(false);
      } finally {
        setInitializing(false);
      }
    };
    
    checkPlatform();
  }, []);

  // For now, always render the web app since MobileApp component doesn't exist
  // If you want native mobile support, you'll need to create the MobileApp component
  if (initializing) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  return <App />;
};

export default MobileDetection;
