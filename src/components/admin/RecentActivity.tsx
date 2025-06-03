
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const recentActivities = [
  {
    id: '1',
    user: 'John Doe',
    action: 'uploaded new notes',
    subject: 'Computer Science',
    time: '2 minutes ago',
    avatar: '',
    type: 'upload'
  },
  {
    id: '2',
    user: 'Jane Smith',
    action: 'joined study room',
    subject: 'Mathematics',
    time: '5 minutes ago',
    avatar: '',
    type: 'join'
  },
  {
    id: '3',
    user: 'Mike Wilson',
    action: 'created announcement',
    subject: 'System Maintenance',
    time: '10 minutes ago',
    avatar: '',
    type: 'announcement'
  },
  {
    id: '4',
    user: 'Sarah Johnson',
    action: 'approved notes',
    subject: 'Physics',
    time: '15 minutes ago',
    avatar: '',
    type: 'approval'
  }
];

export const RecentActivity = () => {
  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'upload':
        return <Badge className="bg-blue-100 text-blue-800">Upload</Badge>;
      case 'join':
        return <Badge className="bg-green-100 text-green-800">Join</Badge>;
      case 'announcement':
        return <Badge className="bg-purple-100 text-purple-800">Announcement</Badge>;
      case 'approval':
        return <Badge className="bg-orange-100 text-orange-800">Approval</Badge>;
      default:
        return <Badge variant="outline">Activity</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback>{getInitials(activity.user)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user} {activity.action}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.subject}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getActivityBadge(activity.type)}
                <div className="text-sm text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
