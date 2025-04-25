
import React, { useEffect } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatsCards } from '@/components/admin/StatsCards';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { UsageCharts } from '@/components/admin/UsageCharts';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Double-check admin status on component mount
    if (!isLoading && isAuthenticated && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges to access this page.",
        variant: "destructive"
      });
      navigate('/dashboard');
    }
  }, [isAdmin, isAuthenticated, isLoading, navigate]);

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
