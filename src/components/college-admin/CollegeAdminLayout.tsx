
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CollegeAdminSidebar } from './CollegeAdminSidebar';
import { CollegeAdminHeader } from './CollegeAdminHeader';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CollegeAdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, isCollegeAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/authentication', { state: { from: window.location.pathname } });
      } else if (!isCollegeAdmin) {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isCollegeAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 animate-pulse">Verifying college admin privileges...</p>
      </div>
    );
  }

  if (!isCollegeAdmin && !isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6">
        <Alert variant="destructive" className="max-w-md w-full">
          <ShieldAlert className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">Access Denied</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">
              You don't have college admin privileges to access this dashboard.
              Only users with educational email domains can view this page.
            </p>
            <p className="text-sm opacity-75 mb-4">
              Current user: {user?.email || "Not logged in"}
              <br/>
              Email domain: {user?.email?.split('@')[1] || "N/A"}
            </p>
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <CollegeAdminSidebar />
      <div className="flex flex-col w-full overflow-hidden">
        <CollegeAdminHeader />
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <Badge variant="outline" className="font-normal text-xs px-2 py-1 bg-blue-50 text-blue-600 border-blue-200">
                  {user?.email?.split('@')[1] || 'Educational Institution'}
                </Badge>
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
