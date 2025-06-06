
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  // Always call all hooks at the top level, regardless of conditions
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const { toast } = useToast();
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  
  console.log("PublicRoute render:", { isAuthenticated, isLoading, initialCheckDone });

  // Add a small delay before showing the loader
  useEffect(() => {
    let timer: number | undefined;
    
    if (isLoading) {
      // Only show loader after a small delay
      timer = window.setTimeout(() => {
        setShowLoader(true);
      }, 300);
    } else {
      setShowLoader(false);
      setInitialCheckDone(true);
    }
    
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isLoading]);

  // Check for persistent login on mount
  useEffect(() => {
    const checkPersistentLogin = async () => {
      // This will be handled by the AuthProvider, we just need to wait for it
      console.log("PublicRoute: Checking for persistent login...");
    };
    
    checkPersistentLogin();
  }, []);

  // Effect to handle redirection and notify user
  useEffect(() => {
    if (isAuthenticated && !isLoading && initialCheckDone) {
      toast({
        title: "Already Logged In",
        description: "Redirecting to your dashboard",
      });
    }
  }, [isAuthenticated, isLoading, initialCheckDone, toast]);

  // Conditional rendering logic AFTER all hooks have been called
  if (isLoading && showLoader) {
    console.log("PublicRoute: Loading state with loader");
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 animate-pulse">Checking authentication status...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log("PublicRoute: Already authenticated, redirecting");
    // Get the intended destination from location state or default to dashboard
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  console.log("PublicRoute: Rendering children");
  return <>{children}</>;
};
