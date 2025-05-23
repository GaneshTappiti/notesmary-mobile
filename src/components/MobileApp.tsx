
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';
import { SplashScreen } from './mobile/SplashScreen';
import { Onboarding } from './mobile/Onboarding';
import { MobileLayout } from './mobile/MobileLayout';
import { OfflineErrorScreen } from './mobile/OfflineErrorScreen';
import { PushNotificationSettings } from './mobile/PushNotificationSettings';
import { HelpSupportScreen } from './mobile/HelpSupportScreen';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';

// Import your existing screens
import Dashboard from '@/pages/Dashboard';
import MyNotes from '@/pages/MyNotes';
import AIAnswers from '@/pages/AIAnswers';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';
import Authentication from '@/pages/Authentication';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface MobileAppProps {
  initializing: boolean;
}

const MobileApp = ({ initializing }: MobileAppProps) => {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

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
        // Use dynamic import to avoid issues with SSR or environments without Capacitor
        const Network = await import('@capacitor/network').then(module => module.Network);
        const status = await Network.getStatus();
        setIsOnline(status.connected);
        
        // Add network listener
        Network.addListener('networkStatusChange', (status) => {
          setIsOnline(status.connected);
        });
        
        // Return cleanup function
        return () => {
          Network.removeAllListeners().catch(err => 
            console.error('Error removing network listeners:', err)
          );
        };
      } catch (error) {
        console.error('Error checking network status:', error);
      }
    };
    
    checkOnboarding();
    const cleanup = checkNetwork();
    
    // Cleanup
    return () => {
      cleanup?.then(fn => fn?.());
    };
  }, []);
  
  const handleRetryConnection = async () => {
    setIsRetrying(true);
    try {
      const Network = await import('@capacitor/network').then(module => module.Network);
      const status = await Network.getStatus();
      setIsOnline(status.connected);
    } catch (error) {
      console.error('Error retrying connection:', error);
    } finally {
      setTimeout(() => setIsRetrying(false), 1000);
    }
  };

  // Handle rendering states
  if (initializing) {
    return null; // Native splash screen is showing
  }
  
  if (!isOnline) {
    return (
      <OfflineErrorScreen 
        onRetry={handleRetryConnection} 
        isRetrying={isRetrying}
      />
    );
  }
  
  if (onboardingComplete === null) {
    return <SplashScreen onFinish={() => setOnboardingComplete(false)} />;
  }
  
  if (!onboardingComplete) {
    return <Onboarding onComplete={() => setOnboardingComplete(true)} />;
  }
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
        
        {/* New routes for College Admin */}
        <Route path="/college-admin/dashboard" element={
          isAuthenticated ? (
            <MobileLayout hideBottomNav={true}>
              <React.Suspense fallback={<div className="p-4">Loading...</div>}>
                {React.lazy(() => import('@/pages/college-admin/CollegeAdminDashboard'))}
              </React.Suspense>
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
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="mb-6 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default MobileApp;
