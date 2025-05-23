
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { FileCheck, Users, Video, Clock } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { Badge } from '@/components/ui/badge';

// For demo purposes - you'll replace with real data
const mockData = {
  pendingNotes: 12,
  activeStudents: 78,
  liveRooms: 3,
  recentActivities: [
    { id: 1, user: 'Rahul Sharma', action: 'Uploaded notes', subject: 'Database Systems', time: '10 minutes ago' },
    { id: 2, user: 'Priya Singh', action: 'Created study room', subject: 'Algorithm Design', time: '30 minutes ago' },
    { id: 3, user: 'Amit Kumar', action: 'Uploaded notes', subject: 'Computer Networks', time: '1 hour ago' },
    { id: 4, user: 'Neha Gupta', action: 'Joined study room', subject: 'Data Structures', time: '2 hours ago' },
    { id: 5, user: 'Vikram Patel', action: 'Uploaded notes', subject: 'Operating Systems', time: '3 hours ago' }
  ]
};

const CollegeAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const collegeName = user?.email ? user.email.split('@')[1].split('.')[0].charAt(0).toUpperCase() + user.email.split('@')[1].split('.')[0].slice(1) : 'College';

  return (
    <>
      <Helmet>
        <title>College Admin Dashboard | Notex</title>
      </Helmet>
      
      {/* Mobile-optimized header */}
      <MobileHeader 
        title="College Admin" 
        showBackButton={true}
        showNotificationButton={true}
      />
      
      <div className="p-4 space-y-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground text-sm mt-1">{collegeName} Admin Panel</p>
        </div>

        {/* Stats Cards - Mobile-optimized grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            title="Pending Notes"
            value={mockData.pendingNotes.toString()}
            description="Awaiting approval"
            icon={<FileCheck className="h-5 w-5 text-blue-600" />}
          />
          
          <StatsCard
            title="Students"
            value={mockData.activeStudents.toString()}
            description="Currently active"
            icon={<Users className="h-5 w-5 text-green-600" />}
          />
          
          <StatsCard
            title="Study Rooms"
            value={mockData.liveRooms.toString()}
            description="Live sessions"
            icon={<Video className="h-5 w-5 text-purple-600" />}
          />
          
          <StatsCard
            title="Study Hours"
            value="127.5"
            description="This month"
            icon={<Clock className="h-5 w-5 text-amber-600" />}
            trend={{
              value: "+12%",
              isPositive: true
            }}
          />
        </div>
        
        {/* Recent Activity - Mobile-optimized */}
        <Card className="shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-medium">Recent Activity</h2>
          </div>
          <CardContent className="p-0 overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto hide-scrollbar">
              {mockData.recentActivities.map(activity => (
                <div key={activity.id} className="px-4 py-3 border-b border-gray-100 last:border-0">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm">{activity.user}</span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm">{activity.action}</span>
                      <Badge variant="outline" className="text-xs">{activity.subject}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CollegeAdminDashboard;
