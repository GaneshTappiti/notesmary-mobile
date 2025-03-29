
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { 
  Bell, 
  BookOpen, 
  Users, 
  BrainCircuit, 
  DollarSign,
  Search,
  RefreshCw,
  Check,
  X,
  ArrowRight,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { NotificationCard } from '@/components/NotificationCard';
import { useToast } from '@/hooks/use-toast';

// Import the types from NotificationCard
import type { NotificationType, ActionType } from '@/components/NotificationCard';

// Mock notification data - this would come from your Supabase database in a real implementation
const mockNotifications = [
  {
    id: '1',
    type: 'studyRoom' as NotificationType,
    title: 'Study Room Invite',
    description: 'You have been invited to the "AI & ML Study Group" by Sarah.',
    timestamp: '30 minutes ago',
    isRead: false,
    actionType: 'join' as ActionType,
    actionUrl: '/room/123',
    actionText: 'Join Now'
  },
  {
    id: '2',
    type: 'notes' as NotificationType,
    title: 'New Notes Available',
    description: 'New notes for "Data Structures" have been uploaded.',
    timestamp: '1 hour ago',
    isRead: false,
    actionType: 'view' as ActionType,
    actionUrl: '/view-notes/456',
    actionText: 'View Notes'
  },
  {
    id: '3',
    type: 'collaboration' as NotificationType,
    title: 'Collaboration Request',
    description: 'Alex wants to add you to their study team.',
    timestamp: '3 hours ago',
    isRead: true,
    actionType: 'accept' as ActionType,
    secondaryActionType: 'decline' as ActionType,
    actionUrl: '/profile/789',
    actionText: 'Accept',
    secondaryActionText: 'Decline'
  },
  {
    id: '4',
    type: 'system' as NotificationType,
    title: 'AI Study Suggestion',
    description: 'Based on your recent activity, we recommend reviewing "Neural Networks".',
    timestamp: '5 hours ago',
    isRead: true,
    actionType: 'view' as ActionType,
    actionUrl: '/ai-answers?topic=neural-networks',
    actionText: 'View Suggestion'
  },
  {
    id: '5',
    type: 'payment' as NotificationType,
    title: 'Subscription Expiring',
    description: 'Your team study subscription expires in 3 days.',
    timestamp: '1 day ago',
    isRead: false,
    actionType: 'renew' as ActionType,
    actionUrl: '/subscriptions',
    actionText: 'Renew Now'
  },
  {
    id: '6',
    type: 'notes' as NotificationType,
    title: 'AI-Generated Insights',
    description: 'AI has analyzed your "Physics" notes and has suggestions.',
    timestamp: '2 days ago',
    isRead: true,
    actionType: 'view' as ActionType,
    actionUrl: '/view-notes/678?ai=true',
    actionText: 'View Insights'
  },
  {
    id: '7',
    type: 'studyRoom' as NotificationType,
    title: 'Study Room Activity',
    description: 'New discussion in "Chemistry Group" requires your attention.',
    timestamp: '3 days ago',
    isRead: true,
    actionType: 'join' as ActionType,
    actionUrl: '/room/234',
    actionText: 'Join Discussion'
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filteredNotifications, setFilteredNotifications] = useState(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Filter notifications based on search query and active filter
    let filtered = notifications;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(notification => 
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        notification.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply type filter
    if (activeFilter !== 'all' && activeFilter !== 'unread') {
      filtered = filtered.filter(notification => notification.type === activeFilter);
    } else if (activeFilter === 'unread') {
      filtered = filtered.filter(notification => !notification.isRead);
    }
    
    setFilteredNotifications(filtered);
  }, [searchQuery, activeFilter, notifications]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
    
    toast({
      title: "Notifications Updated",
      description: "All notifications marked as read.",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been removed.",
    });
  };

  const refreshNotifications = () => {
    // In a real app, this would fetch fresh notifications from the server
    toast({
      title: "Refreshing Notifications",
      description: "Checking for new notifications...",
    });
    
    // Simulate a refresh delay
    setTimeout(() => {
      toast({
        title: "Up to Date",
        description: "Your notifications are now up to date.",
      });
    }, 1500);
  };

  const handleNotificationAction = (id: string, actionType: ActionType, url?: string) => {
    // Mark the notification as read
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
    
    // Handle different action types
    if (actionType === 'join' || actionType === 'view' || actionType === 'renew' || actionType === 'accept') {
      if (url) {
        navigate(url);
      }
    } else if (actionType === 'decline') {
      setNotifications(notifications.filter(notification => notification.id !== id));
      toast({
        title: "Request Declined",
        description: "The collaboration request has been declined.",
      });
    }
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'studyRoom':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'notes':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case 'collaboration':
        return <Users className="h-5 w-5 text-purple-500" />;
      case 'system':
        return <BrainCircuit className="h-5 w-5 text-amber-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <Navbar />
      
      <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-gray-600 mt-1">Stay updated with all your study activities</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={markAllAsRead}
              className="flex items-center gap-2"
              disabled={unreadCount === 0}
            >
              <Check size={16} />
              Mark All Read
            </Button>
            <Button 
              variant="outline" 
              onClick={clearAllNotifications}
              className="flex items-center gap-2"
              disabled={notifications.length === 0}
            >
              <X size={16} />
              Clear All
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="md:col-span-1">
            <Card className="shadow-md border-none">
              <CardContent className="p-4">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search notifications..." 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium text-sm text-gray-500 mb-2">FILTER BY TYPE</h3>
                  
                  <Button 
                    variant={activeFilter === 'all' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('all')}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    All Notifications
                    <Badge className="ml-auto">{notifications.length}</Badge>
                  </Button>
                  
                  <Button 
                    variant={activeFilter === 'studyRoom' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('studyRoom')}
                  >
                    <Bell className="mr-2 h-4 w-4 text-blue-500" />
                    Study Rooms
                    <Badge className="ml-auto">
                      {notifications.filter(n => n.type === 'studyRoom').length}
                    </Badge>
                  </Button>
                  
                  <Button 
                    variant={activeFilter === 'notes' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('notes')}
                  >
                    <BookOpen className="mr-2 h-4 w-4 text-green-500" />
                    Notes Updates
                    <Badge className="ml-auto">
                      {notifications.filter(n => n.type === 'notes').length}
                    </Badge>
                  </Button>
                  
                  <Button 
                    variant={activeFilter === 'collaboration' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('collaboration')}
                  >
                    <Users className="mr-2 h-4 w-4 text-purple-500" />
                    Collaboration
                    <Badge className="ml-auto">
                      {notifications.filter(n => n.type === 'collaboration').length}
                    </Badge>
                  </Button>
                  
                  <Button 
                    variant={activeFilter === 'system' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('system')}
                  >
                    <BrainCircuit className="mr-2 h-4 w-4 text-amber-500" />
                    AI & System
                    <Badge className="ml-auto">
                      {notifications.filter(n => n.type === 'system').length}
                    </Badge>
                  </Button>
                  
                  <Button 
                    variant={activeFilter === 'payment' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('payment')}
                  >
                    <DollarSign className="mr-2 h-4 w-4 text-red-500" />
                    Payments
                    <Badge className="ml-auto">
                      {notifications.filter(n => n.type === 'payment').length}
                    </Badge>
                  </Button>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-sm text-gray-500 mb-2">FILTER BY STATUS</h3>
                  <Button 
                    variant={activeFilter === 'unread' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('unread')}
                  >
                    <Badge variant="destructive" className="mr-2" />
                    Unread Only
                    <Badge className="ml-auto">
                      {notifications.filter(n => !n.isRead).length}
                    </Badge>
                  </Button>
                </div>
                
                <Button 
                  className="w-full mt-6 flex items-center gap-2"
                  onClick={refreshNotifications}
                >
                  <RefreshCw size={16} />
                  Refresh Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content - Notification List */}
          <div className="md:col-span-3">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                {filteredNotifications.length > 0 ? (
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onAction={handleNotificationAction}
                        icon={getTypeIcon(notification.type)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bell className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {notifications.length === 0 ? 
                        "You've cleared all your notifications." : 
                        "No notifications match your current filters."}
                    </p>
                    {notifications.length === 0 && (
                      <Button
                        className="mt-4"
                        onClick={refreshNotifications}
                      >
                        Check for new notifications
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
