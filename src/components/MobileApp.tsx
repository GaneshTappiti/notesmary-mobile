
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';
import { Network } from '@capacitor/network';
import { SplashScreen } from './mobile/SplashScreen';
import { Onboarding } from './mobile/Onboarding';
import { MobileLayout } from './mobile/MobileLayout';
import { OfflineErrorScreen } from './mobile/OfflineErrorScreen';
import { PushNotificationSettings } from './mobile/PushNotificationSettings';
import { HelpSupportScreen } from './mobile/HelpSupportScreen';
import { useAuth } from '@/contexts/AuthContext';

// Import your existing screens
import Dashboard from '@/pages/Dashboard';
import MyNotes from '@/pages/MyNotes';
import AIAnswers from '@/pages/AIAnswers';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';
import Authentication from '@/pages/Authentication';

interface MobileAppProps {
  initializing: boolean;
}

const MobileApp = ({ initializing }: MobileAppProps) => {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const { value } = await Preferences.get({ key: 'onboarding-completed' });
        setOnboardingComplete(value === 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setOnboardingComplete(false);
      }
    };
    
    const checkNetwork = async () => {
      try {
        const status = await Network.getStatus();
        setIsOnline(status.connected);
        
        // Add network listener
        Network.addListener('networkStatusChange', (status) => {
          setIsOnline(status.connected);
        });
      } catch (error) {
        console.error('Error checking network status:', error);
      }
    };
    
    checkOnboarding();
    checkNetwork();
    
    // Cleanup
    return () => {
      Network.removeAllListeners();
    };
  }, []);

  // Handle rendering states
  if (initializing) {
    return null; // Native splash screen is showing
  }
  
  if (!isOnline) {
    return <OfflineErrorScreen />;
  }
  
  if (onboardingComplete === null) {
    return <SplashScreen onFinish={() => setOnboardingComplete(false)} />;
  }
  
  if (!onboardingComplete) {
    return <Onboarding onComplete={() => setOnboardingComplete(true)} />;
  }
  
  return (
    <>
      <Routes>
        {/* Authentication routes */}
        <Route path="/authentication" element={
          !isAuthenticated ? (
            <Authentication />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        } />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <MobileLayout>
              <Dashboard />
            </MobileLayout>
          ) : (
            <Navigate to="/authentication" replace />
          )
        } />
        
        <Route path="/my-notes" element={
          isAuthenticated ? (
            <MobileLayout>
              <MyNotes />
            </MobileLayout>
          ) : (
            <Navigate to="/authentication" replace />
          )
        } />
        
        <Route path="/ai-answers" element={
          isAuthenticated ? (
            <MobileLayout>
              <AIAnswers />
            </MobileLayout>
          ) : (
            <Navigate to="/authentication" replace />
          )
        } />
        
        <Route path="/notifications" element={
          isAuthenticated ? (
            <MobileLayout>
              <Notifications />
            </MobileLayout>
          ) : (
            <Navigate to="/authentication" replace />
          )
        } />
        
        <Route path="/settings" element={
          isAuthenticated ? (
            <MobileLayout>
              <Settings />
            </MobileLayout>
          ) : (
            <Navigate to="/authentication" replace />
          )
        } />
        
        {/* New mobile specific screens */}
        <Route path="/push-notification-settings" element={
          isAuthenticated ? (
            <PushNotificationSettings />
          ) : (
            <Navigate to="/authentication" replace />
          )
        } />
        
        <Route path="/help-support" element={
          <HelpSupportScreen />
        } />
        
        {/* Default route */}
        <Route path="/" element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/authentication" replace />
          )
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default MobileApp;
