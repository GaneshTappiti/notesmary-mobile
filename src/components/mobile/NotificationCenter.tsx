
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BookOpen, Users, AlertCircle, Trash2, Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileHeader } from './MobileHeader';
import { EmptyState } from './EmptyState';

interface NotificationItem {
  id: string;
  type: 'note' | 'room' | 'system' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  priority: 'high' | 'medium' | 'low';
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'room',
      title: 'Study Room Invitation',
      message: 'John invited you to join "Advanced Physics" study room',
      timestamp: '2 min ago',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'note',
      title: 'Note Processed',
      message: 'Your Chemistry notes have been successfully processed',
      timestamp: '1 hour ago',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You\'ve completed 5 study sessions this week',
      timestamp: '2 hours ago',
      isRead: false,
      priority: 'low'
    },
    {
      id: '4',
      type: 'system',
      title: 'Maintenance Notice',
      message: 'System maintenance scheduled for tonight at 2 AM',
      timestamp: '1 day ago',
      isRead: true,
      priority: 'medium'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'room': return <Users className="h-5 w-5 text-purple-500" />;
      case 'note': return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'system': return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'achievement': return <Bell className="h-5 w-5 text-green-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <MobileHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
        showBackButton={true}
        rightElement={
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
          >
            <Filter className="h-5 w-5" />
          </Button>
        }
      />

      {/* Action buttons */}
      <div className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="flex gap-2 justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All ({notifications.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </Button>
          </div>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <Trash2 className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications list */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <EmptyState
            title="No notifications"
            description={filter === 'unread' ? "You're all caught up!" : "No notifications yet"}
            icon={<Bell className="h-12 w-12 text-gray-400" />}
          />
        ) : (
          <div className="p-4 space-y-3">
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.isRead ? 'shadow-md border-2 border-blue-100 dark:border-blue-900' : 'shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 ml-2">
                          {!notification.isRead && (
                            <Badge variant="default" className="text-xs px-2 py-0.5">
                              New
                            </Badge>
                          )}
                          
                          <div className="flex gap-1">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-600"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
