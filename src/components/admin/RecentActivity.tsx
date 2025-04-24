
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export const RecentActivity: React.FC = () => {
  // In a real app, these would come from an API/database
  const activities = [
    {
      id: 1,
      type: "note_upload",
      user: {
        name: "Emma Thompson",
        avatar: "",
        initials: "ET"
      },
      content: "Uploaded 'Advanced Calculus Notes'",
      course: "Mathematics",
      time: "10 minutes ago"
    },
    {
      id: 2,
      type: "flagged_message",
      user: {
        name: "John Davis",
        avatar: "",
        initials: "JD"
      },
      content: "Message flagged for review",
      room: "Physics Study Group",
      time: "45 minutes ago"
    },
    {
      id: 3,
      type: "new_user",
      user: {
        name: "Sophia Chen",
        avatar: "",
        initials: "SC"
      },
      content: "Joined the platform",
      role: "Student",
      time: "2 hours ago"
    },
    {
      id: 4,
      type: "note_upload",
      user: {
        name: "Michael Williams",
        avatar: "",
        initials: "MW"
      },
      content: "Uploaded 'Organic Chemistry Lab Report'",
      course: "Chemistry",
      time: "3 hours ago"
    },
    {
      id: 5,
      type: "flagged_message",
      user: {
        name: "Jessica Brown",
        avatar: "",
        initials: "JB"
      },
      content: "Message flagged for review",
      room: "History Discussion",
      time: "5 hours ago"
    }
  ];

  // Example loading state
  const isLoading = false;

  const getBadgeForActivityType = (type: string) => {
    switch (type) {
      case "note_upload":
        return <Badge className="bg-blue-500">Note Upload</Badge>;
      case "flagged_message":
        return <Badge variant="destructive">Flagged Message</Badge>;
      case "new_user":
        return <Badge variant="outline" className="border-green-500 text-green-500">New User</Badge>;
      default:
        return <Badge variant="secondary">Activity</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[500px]">
        {isLoading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.user.name}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{activity.content}</p>
                  <div className="flex items-center pt-1">
                    {getBadgeForActivityType(activity.type)}
                    {activity.course && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Course: {activity.course}</span>
                    )}
                    {activity.room && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Room: {activity.room}</span>
                    )}
                    {activity.role && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Role: {activity.role}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
