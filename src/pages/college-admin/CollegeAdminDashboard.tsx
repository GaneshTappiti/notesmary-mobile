
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { FileCheck, Users, Video, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { Badge } from '@/components/ui/badge';

// Memoized mock data to prevent re-creation on renders
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
} as const;

// Memoized activity item component to prevent unnecessary re-renders
const ActivityItem = React.memo<{
  activity: typeof mockData.recentActivities[0];
}>(({ activity }) => (
  <div className="px-4 py-3 border-b border-gray-100 last:border-0">
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
));

ActivityItem.displayName = 'ActivityItem';

const CollegeAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Memoize expensive computations
  const collegeName = useMemo(() => {
    if (!user?.email) return 'College';
    const domain = user.email.split('@')[1];
    if (!domain) return 'College';
    const name = domain.split('.')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, [user?.email]);

  // Memoize stats data to prevent re-creation
  const statsData = useMemo(() => [
    {
      title: "Pending Notes",
      value: mockData.pendingNotes.toString(),
      description: "Awaiting approval",
      icon: <FileCheck className="h-5 w-5 text-blue-600" />
    },
    {
      title: "Students",
      value: mockData.activeStudents.toString(),
      description: "Currently active",
      icon: <Users className="h-5 w-5 text-green-600" />
    },
    {
      title: "Study Rooms",
      value: mockData.liveRooms.toString(),
      description: "Live sessions",
      icon: <Video className="h-5 w-5 text-purple-600" />
    },
    {
      title: "Study Hours",
      value: "127.5",
      description: "This month",
      icon: <Clock className="h-5 w-5 text-amber-600" />,
      trend: {
        value: "+12%",
        isPositive: true
      }
    }
  ], []);

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
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>
        
        {/* Recent Activity - Mobile-optimized */}
        <Card className="shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-medium">Recent Activity</h2>
          </div>
          <CardContent className="p-0 overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto hide-scrollbar">
              {mockData.recentActivities.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default React.memo(CollegeAdminDashboard);
