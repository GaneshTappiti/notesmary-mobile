
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { NotificationCard } from '@/components/NotificationCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Bell, BookOpen, Users, AlertCircle, Upload } from 'lucide-react';

// Mock data for notifications matching the expected type
const notificationsMock = [
  {
    id: '1',
    type: 'studyRoom' as const,
    title: 'Study Room Invitation',
    description: 'John Doe invited you to join "Physics Advanced Study" room.',
    timestamp: '2 hours ago',
    isRead: false,
    actionType: 'join' as const,
    actionUrl: '/study-rooms',
    actionText: 'Join Room'
  },
  {
    id: '2',
    type: 'notes' as const,
    title: 'Notes Shared',
    description: 'Sarah shared "Organic Chemistry Notes Ch. 7-9" with you.',
    timestamp: '5 hours ago',
    isRead: true,
    actionType: 'view' as const,
    actionUrl: '/my-notes',
    actionText: 'View Notes'
  },
  {
    id: '3',
    type: 'system' as const,
    title: 'AI Assistant Update',
    description: 'We\'ve updated our AI Assistant with new features for mathematics and physics.',
    timestamp: '1 day ago',
    isRead: true,
    actionType: 'view' as const,
    actionUrl: '/ai-answers',
    actionText: 'Explore Features'
  },
  {
    id: '4',
    type: 'studyRoom' as const,
    title: 'Study Reminder',
    description: 'Your scheduled study session "Final Exam Prep" starts in 30 minutes.',
    timestamp: '1 day ago',
    isRead: false,
    actionType: 'join' as const,
    actionUrl: '/study-analytics',
    actionText: 'Join Session'
  },
  {
    id: '5',
    type: 'notes' as const,
    title: 'Note Upload Complete',
    description: 'Your notes "Advanced Calculus Chapter 5" have been processed and are now searchable.',
    timestamp: '2 days ago',
    isRead: true,
    actionType: 'view' as const,
    actionUrl: '/my-notes',
    actionText: 'View Notes'
  }
];

// Function to get appropriate icon for each notification type
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'studyRoom':
      return <Users className="h-6 w-6 text-blue-500" />;
    case 'notes':
      return <BookOpen className="h-6 w-6 text-green-500" />;
    case 'system':
      return <AlertCircle className="h-6 w-6 text-purple-500" />;
    case 'upload':
      return <Upload className="h-6 w-6 text-orange-500" />;
    default:
      return <Bell className="h-6 w-6 text-gray-500" />;
  }
};

const Notifications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(notificationsMock);
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
    
    toast({
      title: "Notifications updated",
      description: "All notifications marked as read",
    });
  };
  
  const handleClearAll = () => {
    setNotifications([]);
    
    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared",
    });
  };
  
  const handleNotificationAction = (id: string, actionType: string) => {
    if (actionType === 'mark-read') {
      setNotifications(notifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      ));
      
      toast({
        title: "Notification updated",
        description: "Marked as read",
      });
    } else if (actionType === 'delete') {
      setNotifications(notifications.filter(notification => notification.id !== id));
      
      toast({
        title: "Notification deleted",
        description: "The notification has been removed",
      });
    }
  };
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : activeTab === "unread" 
      ? notifications.filter(n => !n.isRead)
      : notifications.filter(n => n.isRead);
  
  return (
    <>
      <Helmet>
        <title>Notifications | Notex</title>
      </Helmet>
      
      <div className="container max-w-4xl mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              disabled={!unreadCount}
            >
              Mark all as read
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearAll}
              disabled={notifications.length === 0}
            >
              Clear all
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-4">
                {filteredNotifications.map(notification => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    icon={getNotificationIcon(notification.type)}
                    onAction={(actionType) => handleNotificationAction(notification.id, actionType)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No notifications found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Notifications;
