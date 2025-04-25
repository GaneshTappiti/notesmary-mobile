import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatsCards } from '@/components/admin/StatsCards';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { UsageCharts } from '@/components/admin/UsageCharts';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const AdminDashboard = () => {
  const { isAdmin, isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminCheckComplete, setAdminCheckComplete] = useState(false);

  useEffect(() => {
    // Double-check admin status on component mount
    if (!isLoading) {
      setAdminCheckComplete(true);
      console.log("Admin status check:", { 
        isAdmin, 
        isAuthenticated, 
        email: user?.email,
        userData: user
      });

      if (isAuthenticated && !isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges to access this page.",
          variant: "destructive"
        });
        navigate('/dashboard');
      }
    }
  }, [isAdmin, isAuthenticated, isLoading, navigate, toast, user]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 animate-pulse">Verifying admin privileges...</p>
      </div>
    );
  }

  if (adminCheckComplete && !isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6">
        <Alert variant="destructive" className="max-w-md w-full">
          <ShieldAlert className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">Access Denied</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">
              You don't have admin privileges to access this dashboard. Only users with admin role can view this page.
            </p>
            <p className="text-sm opacity-75 mb-4">
              Current user: {user?.email || "Not logged in"}
              <br/>
              Admin status: {isAdmin ? "Yes" : "No"}
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
    <>
      <Helmet>
        <title>Admin Dashboard | Notex</title>
      </Helmet>
      
      <AdminLayout>
        <PageContainer className="py-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
            </div>
            
            <StatsCards />
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <UsageCharts />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </div>
        </PageContainer>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
