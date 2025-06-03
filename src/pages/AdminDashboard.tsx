
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { StatsCards } from '@/components/admin/StatsCards';
import { UsageCharts } from '@/components/admin/UsageCharts';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, School, Calendar, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickAction = (action: string, path: string) => {
    toast({
      title: "Navigating",
      description: `Opening ${action}...`,
    });
    navigate(path);
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Notex</title>
      </Helmet>
      
      <div className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="text-muted-foreground">Monitor system performance and user activity</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleQuickAction("College Management", "/admin/colleges")}>
                <School className="mr-2 h-4 w-4" />
                Manage Colleges
              </Button>
              <Button onClick={() => handleQuickAction("User Management", "/admin/users")} variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View Users
              </Button>
            </div>
          </div>
          
          <StatsCards />
          
          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => handleQuickAction("Events & Announcements", "/admin/events-announcements")}
                >
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Create Event</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => handleQuickAction("College Chat", "/admin/college-chat")}
                >
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-sm">College Chat</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => handleQuickAction("Add College", "/admin/colleges")}
                >
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Add College</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => handleQuickAction("Audit Logs", "/admin/audit-logs")}
                >
                  <Users className="h-6 w-6" />
                  <span className="text-sm">View Logs</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <UsageCharts />
          <RecentActivity />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
