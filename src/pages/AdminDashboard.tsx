
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { StatsCards } from '@/components/admin/StatsCards';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { UsageCharts } from '@/components/admin/UsageCharts';
import { Helmet } from 'react-helmet-async';

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Notex</title>
      </Helmet>
      
      <PageContainer className="py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="text-muted-foreground">Welcome to the Notex admin dashboard.</p>
            </div>
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
    </>
  );
};

export default AdminDashboard;
