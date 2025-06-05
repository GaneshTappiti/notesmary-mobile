
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, Trash2, Filter, Settings, BookOpen, Users, AlertTriangle, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'system' | 'user' | 'approval' | 'event' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
  actionText?: string;
}

interface NotificationPanelProps {
  adminType: 'super' | 'college';
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ adminType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const panelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock data - different for each admin type
  useEffect(() => {
    const mockNotifications: Notification[] = adminType === 'super' ? [
      {
        id: '1',
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will begin at 2:00 AM EST',
        timestamp: '5 min ago',
        isRead: false,
        priority: 'high',
        actionUrl: '/admin/system',
        actionText: 'View Details'
      },
      {
        id: '2',
        type: 'user',
        title: 'New College Registration',
        message: 'MIT has requested to join the platform',
        timestamp: '1 hour ago',
        isRead: false,
        priority: 'medium',
        actionUrl: '/admin/colleges',
        actionText: 'Review Application'
      },
      {
        id: '3',
        type: 'alert',
        title: 'High Server Load',
        message: 'Server load is at 85% capacity',
        timestamp: '2 hours ago',
        isRead: true,
        priority: 'high',
        actionUrl: '/admin/analytics',
        actionText: 'View Analytics'
      },
      {
        id: '4',
        type: 'event',
        title: 'Weekly Report Ready',
        message: 'Your weekly platform analytics report is ready',
        timestamp: '1 day ago',
        isRead: true,
        priority: 'low',
        actionUrl: '/admin/reports',
        actionText: 'Download Report'
      }
    ] : [
      {
        id: '1',
        type: 'approval',
        title: 'Notes Awaiting Approval',
        message: '5 new notes submissions need your review',
        timestamp: '10 min ago',
        isRead: false,
        priority: 'medium',
        actionUrl: '/college-admin/notes-approval',
        actionText: 'Review Notes'
      },
      {
        id: '2',
        type: 'user',
        title: 'New User Registration',
        message: 'John Doe has joined your institution',
        timestamp: '30 min ago',
        isRead: false,
        priority: 'low',
        actionUrl: '/college-admin/user-management',
        actionText: 'View User'
      },
      {
        id: '3',
        type: 'event',
        title: 'Study Room Created',
        message: 'New study room "Advanced Physics" was created',
        timestamp: '2 hours ago',
        isRead: true,
        priority: 'low',
        actionUrl: '/college-admin/studyrooms',
        actionText: 'View Room'
      },
      {
        id: '4',
        type: 'system',
        title: 'Analytics Update',
        message: 'Monthly analytics report is now available',
        timestamp: '1 day ago',
        isRead: true,
        priority: 'medium',
        actionUrl: '/college-admin/analytics',
        actionText: 'View Report'
      }
    ];
    
    setNotifications(mockNotifications);
  }, [adminType]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system': return <Settings className="h-4 w-4 text-blue-500" />;
      case 'user': return <Users className="h-4 w-4 text-green-500" />;
      case 'approval': return <BookOpen className="h-4 w-4 text-orange-500" />;
      case 'event': return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50/50';
      case 'low': return 'border-l-green-500 bg-green-50/50';
      default: return 'border-l-gray-300 bg-gray-50/50';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
    toast({
      title: "All notifications marked as read",
      description: "You're all caught up!",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const handleNotificationAction = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      // Handle navigation here
      console.log('Navigate to:', notification.actionUrl);
      toast({
        title: "Opening " + notification.actionText,
        description: "Redirecting to the requested page...",
      });
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Filter Tabs */}
              <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | 'unread')} className="mt-3">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all" className="text-xs">
                    All ({notifications.length})
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs">
                    Unread ({unreadCount})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Notifications List */}
            <ScrollArea className="h-96">
              <div className="p-2">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {filter === 'unread' ? "You're all caught up!" : "No notifications yet"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <AnimatePresence>
                      {filteredNotifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${
                            getPriorityColor(notification.priority)
                          } ${!notification.isRead ? 'bg-blue-50/30 dark:bg-blue-900/20' : ''}`}
                          onClick={() => handleNotificationAction(notification)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className={`text-sm font-medium ${
                                  !notification.isRead 
                                    ? 'text-gray-900 dark:text-white' 
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                  {notification.title}
                                </h4>
                                
                                <div className="flex items-center gap-1 ml-2">
                                  {!notification.isRead && (
                                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                                  )}
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 className="h-3 w-3 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                              
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">
                                  {notification.timestamp}
                                </span>
                                
                                {notification.actionText && (
                                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                    {notification.actionText} →
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to full notifications page
                    console.log('Navigate to full notifications');
                  }}
                >
                  View All Notifications
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
