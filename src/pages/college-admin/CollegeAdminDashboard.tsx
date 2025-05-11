
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
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">College Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to {collegeName} admin panel.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard
            title="Pending Notes"
            value={mockData.pendingNotes.toString()}
            description="Notes awaiting approval"
            icon={<FileCheck className="h-5 w-5 text-blue-600" />}
          />
          
          <StatsCard
            title="Active Students"
            value={mockData.activeStudents.toString()}
            description="Students currently online"
            icon={<Users className="h-5 w-5 text-green-600" />}
          />
          
          <StatsCard
            title="Live Study Rooms"
            value={mockData.liveRooms.toString()}
            description="Active study sessions"
            icon={<Video className="h-5 w-5 text-purple-600" />}
          />
          
          <StatsCard
            title="Total Study Hours"
            value="127.5"
            description="This month"
            icon={<Clock className="h-5 w-5 text-amber-600" />}
            trend={{
              value: "+12%",
              isPositive: true
            }}
          />
        </div>
        
        {/* Recent Activity */}
        <Card>
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-medium">Recent Activity</h2>
          </div>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.recentActivities.map(activity => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.user}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.subject}</TableCell>
                    <TableCell className="text-muted-foreground">{activity.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CollegeAdminDashboard;
