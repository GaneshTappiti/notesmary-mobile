
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatsCards } from '@/components/admin/StatsCards';
import { UsageCharts } from '@/components/admin/UsageCharts';
import { RecentActivity } from '@/components/admin/RecentActivity';

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Notex</title>
      </Helmet>
      
      <div className="p-6">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground">Monitor system performance and user activity</p>
          </div>
          
          <StatsCards />
          <UsageCharts />
          <RecentActivity />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
