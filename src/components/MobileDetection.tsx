
import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import MobileApp from './MobileApp';
import App from '@/App';

const MobileDetection = () => {
  const [isNativePlatform, setIsNativePlatform] = useState(false);
  const [initializing, setInitializing] = useState(true);
  
  useEffect(() => {
    // Check if running on a native platform (Android/iOS)
    const checkPlatform = async () => {
      const isNative = Capacitor.isNativePlatform();
      setIsNativePlatform(isNative);
      setInitializing(false);
      
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
    };
    
    checkPlatform();
  }, []);

  // Render mobile or web app based on platform
  return isNativePlatform ? <MobileApp initializing={initializing} /> : <App />;
};

export default MobileDetection;
