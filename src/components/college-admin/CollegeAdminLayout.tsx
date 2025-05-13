
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
  const { user, isAuthenticated, isLoading, isCollegeAdmin, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Check for admin viewing as college admin
  const adminViewingData = React.useMemo(() => {
    try {
      const data = sessionStorage.getItem('adminViewingAs');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error parsing adminViewingAs data:", e);
      return null;
    }
  }, []);
  
  const isAdminViewingAsCollegeAdmin = Boolean(adminViewingData && isAdmin);
  
  // Function to return to admin view
  const handleReturnToAdminView = () => {
    sessionStorage.removeItem('adminViewingAs');
    navigate('/admin/colleges');
  };
  
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/authentication', { state: { from: window.location.pathname } });
      } else if (!isCollegeAdmin && !isAdminViewingAsCollegeAdmin) {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isCollegeAdmin, isLoading, navigate, isAdminViewingAsCollegeAdmin]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 animate-pulse">Verifying college admin privileges...</p>
      </div>
    );
  }

  if (!isCollegeAdmin && !isAdminViewingAsCollegeAdmin && !isLoading) {
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

  // Get the display college name
  const getCollegeName = () => {
    if (adminViewingData) {
      return adminViewingData.viewingCollege.split('.')[0].charAt(0).toUpperCase() + 
             adminViewingData.viewingCollege.split('.')[0].slice(1);
    }
    return user?.email?.split('@')[1]?.split('.')[0].charAt(0).toUpperCase() + 
           user?.email?.split('@')[1]?.split('.')[0].slice(1) || 'Educational Institution';
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <CollegeAdminSidebar />
      <div className="flex flex-col w-full overflow-hidden">
        <CollegeAdminHeader />
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Admin viewing mode banner */}
            {isAdminViewingAsCollegeAdmin && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-amber-800 font-medium">Admin View Mode</h2>
                    <p className="text-sm text-amber-700">
                      You are viewing as a college administrator for {adminViewingData?.viewingCollege}
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleReturnToAdminView} size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Admin
                  </Button>
                </div>
              </div>
            )}
            
            <div className="mb-6 flex items-center justify-between">
              <div>
                <Badge variant="outline" className="font-normal text-xs px-2 py-1 bg-blue-50 text-blue-600 border-blue-200">
                  {adminViewingData?.viewingCollege || user?.email?.split('@')[1] || 'Educational Institution'}
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
