
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [showLoader, setShowLoader] = useState(true);
  
  // Add a small delay before showing the loader to prevent flashing
  useEffect(() => {
    let timer: number | undefined;
    if (isLoading) {
      timer = window.setTimeout(() => {
        setShowLoader(true);
      }, 200);
    } else {
      setShowLoader(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);
  
  // Use useEffect for side effects like showing toasts
  useEffect(() => {
    // Only show the toast when we're sure we have an authentication state and need to reject
    if (!isLoading && adminOnly && isAuthenticated && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive"
      });
    }
  }, [isLoading, adminOnly, isAuthenticated, isAdmin, toast]);

  if (isLoading || showLoader) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/authentication" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
