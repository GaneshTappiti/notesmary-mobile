
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { FileUp, MessageSquare, Users, CalendarPlus } from 'lucide-react';

interface CollegeActivityFeedProps {
  collegeId: string;
}

// Mock data for activity feed
const getCollegeActivity = (collegeId: string) => {
  // In a real app, fetch from API based on collegeId
  return [
    {
      id: 1,
      type: 'note_upload',
      user: {
        name: 'Emma Thompson',
        avatar: '',
        initials: 'ET'
      },
      content: 'Uploaded "Advanced Calculus Notes"',
      time: '10 minutes ago',
      course: 'Mathematics'
    },
    {
      id: 2,
      type: 'study_room',
      user: {
        name: 'Michael Williams',
        avatar: '',
        initials: 'MW'
      },
      content: 'Created study room "Physics Study Group"',
      time: '45 minutes ago',
      participants: 5
    },
    {
      id: 3,
      type: 'message',
      user: {
        name: 'Jessica Brown',
        avatar: '',
        initials: 'JB'
      },
      content: 'Posted question in "Chemistry Help" forum',
      time: '2 hours ago',
      replies: 3
    },
    {
      id: 4,
      type: 'note_upload',
      user: {
        name: 'David Chen',
        avatar: '',
        initials: 'DC'
      },
      content: 'Uploaded "Organic Chemistry Lab Report"',
      time: '3 hours ago',
      course: 'Chemistry'
    },
    {
      id: 5,
      type: 'event',
      user: {
        name: 'Sarah Johnson',
        avatar: '',
        initials: 'SJ'
      },
      content: 'Created event "End of Semester Study Group"',
      time: '5 hours ago',
      attendees: 12
    }
  ];
};

export const CollegeActivityFeed: React.FC<CollegeActivityFeedProps> = ({ collegeId }) => {
  const activities = getCollegeActivity(collegeId);
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'note_upload':
        return <FileUp className="h-4 w-4 text-blue-500" />;
      case 'study_room':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'event':
        return <CalendarPlus className="h-4 w-4 text-amber-500" />;
      default:
        return <FileUp className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'note_upload':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Note Upload</Badge>;
      case 'study_room':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Study Room</Badge>;
      case 'message':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Message</Badge>;
      case 'event':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Event</Badge>;
      default:
        return <Badge>Activity</Badge>;
    }
  };
  
  const getActivityDetail = (activity: any) => {
    switch (activity.type) {
      case 'note_upload':
        return <span className="text-xs text-gray-500 ml-2">Course: {activity.course}</span>;
      case 'study_room':
        return <span className="text-xs text-gray-500 ml-2">Participants: {activity.participants}</span>;
      case 'message':
        return <span className="text-xs text-gray-500 ml-2">Replies: {activity.replies}</span>;
      case 'event':
        return <span className="text-xs text-gray-500 ml-2">Attendees: {activity.attendees}</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{activity.user.name}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{activity.content}</p>
            <div className="flex items-center pt-1">
              <div className="mr-2">{getActivityIcon(activity.type)}</div>
              {getActivityBadge(activity.type)}
              {getActivityDetail(activity)}
            </div>
          </div>
        </div>
      ))}

      {activities.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500">No recent activity to show.</p>
        </div>
      )}
    </div>
  );
};
