
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  const checkAdminAccess = async () => {
    if (adminOnly) {
      const { data } = await supabase.rpc('is_admin', { check_email: user?.email });
      return data;
    }
    return true;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to authentication page
    return <Navigate to="/authentication" state={{ from: location }} replace />;
  }

  // If it's an admin-only route, check admin status
  if (adminOnly) {
    const isAdmin = checkAdminAccess();
    if (!isAdmin) {
      // Redirect to a non-admin page or show an error
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
