
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { NotificationCard } from '@/components/NotificationCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data for notifications
const notificationsMock = [
  {
    id: '1',
    title: 'Study Room Invitation',
    message: 'John Doe invited you to join "Physics Advanced Study" room.',
    time: '2 hours ago',
    read: false,
    type: 'invite',
    actionUrl: '/study-rooms'
  },
  {
    id: '2',
    title: 'Notes Shared',
    message: 'Sarah shared "Organic Chemistry Notes Ch. 7-9" with you.',
    time: '5 hours ago',
    read: true,
    type: 'share',
    actionUrl: '/my-notes'
  },
  {
    id: '3',
    title: 'AI Assistant Update',
    message: 'We\'ve updated our AI Assistant with new features for mathematics and physics.',
    time: '1 day ago',
    read: true,
    type: 'update',
    actionUrl: '/ai-answers'
  },
  {
    id: '4',
    title: 'Study Reminder',
    message: 'Your scheduled study session "Final Exam Prep" starts in 30 minutes.',
    time: '1 day ago',
    read: false,
    type: 'reminder',
    actionUrl: '/study-analytics'
  },
  {
    id: '5',
    title: 'Note Upload Complete',
    message: 'Your notes "Advanced Calculus Chapter 5" have been processed and are now searchable.',
    time: '2 days ago',
    read: true,
    type: 'upload',
    actionUrl: '/my-notes'
  }
];

const Notifications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(notificationsMock);
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
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
  
  const handleNotificationAction = (id: string, action: string) => {
    if (action === 'mark-read') {
      setNotifications(notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      ));
      
      toast({
        title: "Notification updated",
        description: "Marked as read",
      });
    } else if (action === 'delete') {
      setNotifications(notifications.filter(notification => notification.id !== id));
      
      toast({
        title: "Notification deleted",
        description: "The notification has been removed",
      });
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : activeTab === "unread" 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.read);
  
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
                    onAction={(action) => handleNotificationAction(notification.id, action)}
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
