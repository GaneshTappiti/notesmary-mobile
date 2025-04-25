
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
        email: user?.email 
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
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You don't have admin privileges to access this page.
        </p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
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
