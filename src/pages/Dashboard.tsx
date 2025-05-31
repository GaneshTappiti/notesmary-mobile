
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, Search, Users, Brain, ShieldCheck, School, WifiOff } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { QuickAccessCard } from '@/components/dashboard/QuickAccessCard';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { TasksSection } from '@/components/dashboard/TasksSection';
import { StudyRoomsSection } from '@/components/dashboard/StudyRoomsSection';
import { PageContainer } from '@/components/PageContainer';
import { StudyPulseEntryCard } from '@/components/dashboard/StudyPulseEntryCard';
import { DashboardLoadingState } from '@/components/dashboard/DashboardLoadingState';
import { DashboardEmptyState } from '@/components/dashboard/DashboardEmptyState';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useOffline } from '@/hooks/use-offline';
import { OfflineManager, CACHE_KEYS } from '@/utils/offlineManager';
import { NotesService } from '@/services/NotesService';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/components/AppLayout';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout, isAdmin, isCollegeAdmin } = useAuth();
  const { isOnline, wasOffline } = useOffline();
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const isMobile = useIsMobile();

  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Sync offline notes when coming back online
  useEffect(() => {
    const syncNotesIfNeeded = async () => {
      if (isOnline && wasOffline && user) {
        try {
          const result = await NotesService.syncOfflineNotes(user.id);
          if (result.count > 0) {
            setLastSyncTime(new Date());
          }
        } catch (error) {
          console.error('Error syncing offline notes:', error);
        }
      }
    };
    
    syncNotesIfNeeded();
  }, [isOnline, wasOffline, user]);

  // Load last sync time
  useEffect(() => {
    const loadLastSyncTime = async () => {
      const timestamp = await OfflineManager.getLastUpdated(CACHE_KEYS.NOTES);
      if (timestamp) {
        setLastSyncTime(timestamp);
      }
    };
    
    loadLastSyncTime();
  }, []);

  const quickAccessOptions = [
    {
      title: 'Upload Notes',
      description: 'Share your study materials',
      icon: <Upload className="h-6 w-6" />,
      bgColor: 'bg-blue-50',
      isPrimary: true,
      buttonText: 'Upload',
      buttonVariant: 'default' as const,
      onClick: () => navigate('/upload-notes')
    },
    {
      title: 'Find Notes',
      description: 'Discover study resources',
      icon: <Search className="h-6 w-6" />,
      bgColor: 'bg-purple-50',
      isPrimary: false,
      buttonText: 'Search',
      buttonVariant: 'outline' as const,
      onClick: () => navigate('/find-notes')
    },
    {
      title: 'Join Study Room',
      description: 'Study with peers in real-time',
      icon: <Users className="h-6 w-6" />,
      bgColor: 'bg-green-50',
      isPrimary: false,
      buttonText: 'Join',
      buttonVariant: 'outline' as const,
      onClick: () => navigate('/study-rooms')
    },
    {
      title: 'Ask AI',
      description: 'Get instant help with questions',
      icon: <Brain className="h-6 w-6" />,
      bgColor: 'bg-amber-50',
      isPrimary: false,
      buttonText: 'Ask Now',
      buttonVariant: 'outline' as const,
      onClick: () => navigate('/ai-answers')
    },
    ...(isAdmin ? [{
      title: 'Admin Panel',
      description: 'Access administrative controls',
      icon: <ShieldCheck className="h-6 w-6" />,
      bgColor: 'bg-red-50',
      isPrimary: false,
      buttonText: 'Access Admin',
      buttonVariant: 'default' as const,
      onClick: () => navigate('/admin')
    }] : [])
  ];

  const statsCards = [
    {
      title: 'Total Notes',
      value: '53',
      icon: <Upload className="h-5 w-5 text-blue-500" />,
      trend: { value: '10%', isPositive: true }
    },
    {
      title: 'Study Sessions',
      value: '28',
      icon: <Users className="h-5 w-5 text-green-500" />,
      trend: { value: '5%', isPositive: true }
    },
    {
      title: 'AI Answers',
      value: '152',
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      trend: { value: '8%', isPositive: true }
    }
  ];

  const studyRooms = [
    {
      id: '1',
      title: 'Physics Study Session',
      participants: 5,
      date: 'Today 2:00 PM',
      status: 'active',
      duration: '1h 30m',
      avatars: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg']
    },
    {
      id: '2',
      title: 'Math Group',
      participants: 3,
      date: 'Today 4:00 PM',
      status: 'scheduled',
      duration: '45m',
      avatars: ['/placeholder.svg', '/placeholder.svg']
    },
    {
      id: '3',
      title: 'Biology Discussion',
      participants: 7,
      date: 'Today 6:30 PM',
      status: 'scheduled',
      duration: '2h',
      avatars: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg']
    }
  ];

  const tasks = [
    { id: 1, title: 'Physics Assignment Due', time: '2:00 PM Today', subject: 'Physics', priority: 'high', completed: false },
    { id: 2, title: 'Math Group Study', time: '4:30 PM Tomorrow', subject: 'Math', priority: 'medium', completed: false },
    { id: 3, title: 'Chemistry Lab Report', time: 'Friday, 10:00 AM', subject: 'Chemistry', priority: 'low', completed: true },
    { id: 4, title: 'Biology Research Paper', time: 'Next Monday', subject: 'Biology', priority: 'medium', completed: false }
  ];

  const handleNewTask = () => {
    toast({
      title: "Add New Task",
      description: "Task creation modal will be implemented in the next update."
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const CollegeAdminSection = () => {
    if (!isCollegeAdmin) return null;
    
    return (
      <Card className="shadow-sm transition-all hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">College Admin Panel</CardTitle>
            <School className="h-5 w-5 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            You have access to the college administrator dashboard.
          </p>
          <Button 
            onClick={() => navigate('/college-admin/dashboard')} 
            variant="outline" 
            className="w-full mt-2"
          >
            Access Admin Panel
          </Button>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className={isMobile ? "px-4 py-6" : ""}>
          <PageContainer className={isMobile ? "p-0" : "py-6"}>
            <div className="space-y-6">
              <Helmet>
                <title>Dashboard | StudyPulse</title>
              </Helmet>
              
              {isMobile && (
                <MobileHeader
                  title="Dashboard"
                  showSearchButton={true}
                  showNotificationButton={true}
                  onSearchClick={() => navigate('/find-notes')}
                />
              )}
              
              <DashboardLoadingState type="general" count={1} />
              
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>

              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
                <div className={isMobile ? 'space-y-6' : 'lg:col-span-2 space-y-6'}>
                  <DashboardLoadingState type="rooms" count={3} />
                  <DashboardLoadingState type="general" count={1} />
                </div>
                
                <div className="space-y-6">
                  <DashboardLoadingState type="stats" count={3} />
                  <DashboardLoadingState type="general" count={1} />
                </div>
              </div>
            </div>
          </PageContainer>
        </div>
      </AppLayout>
    );
  }

  const dashboardContent = (
    <>
      <Helmet>
        <title>Dashboard | StudyPulse</title>
      </Helmet>
      
      <div className="space-y-6 animate-fade-in">
        {isMobile && (
          <MobileHeader
            title="Dashboard"
            showSearchButton={true}
            showNotificationButton={true}
            onSearchClick={() => navigate('/find-notes')}
          />
        )}
        
        <WelcomeHeader 
          userName={user?.user_metadata?.full_name}
          onLogout={() => setShowLogoutDialog(true)}
          isAdmin={isAdmin}
          onAdminClick={() => navigate('/admin')}
        />
        
        {/* Logout Confirmation Dialog */}
        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign Out</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to sign out? You'll need to enter your credentials again to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Sign Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        {!isOnline && (
          <Alert className="bg-amber-50 border-amber-200">
            <WifiOff className="h-4 w-4 text-amber-600" />
            <AlertTitle>You're offline</AlertTitle>
            <AlertDescription>
              You're currently viewing cached data. Some features may be limited until you reconnect.
            </AlertDescription>
          </Alert>
        )}
        
        {isOnline && wasOffline && (
          <Alert className="bg-green-50 border-green-200">
            <AlertTitle>Back online</AlertTitle>
            <AlertDescription>
              Your connection has been restored. Any changes made while offline have been synced.
            </AlertDescription>
          </Alert>
        )}
        
        {lastSyncTime && (
          <div className="text-xs text-muted-foreground mt-2 text-right">
            Last updated: {lastSyncTime.toLocaleString()}
          </div>
        )}

        <div className="space-y-4">
          <h2 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}>Quick Actions</h2>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {quickAccessOptions.map((option, index) => (
              <QuickAccessCard
                key={index}
                {...option}
                className="transition-all duration-300 hover:shadow-lg"
              />
            ))}
          </div>
        </div>

        <StudyPulseEntryCard />

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          <div className={isMobile ? 'space-y-6' : 'lg:col-span-2 space-y-6'}>
            {studyRooms.length > 0 ? (
              <StudyRoomsSection 
                rooms={studyRooms}
                onViewAll={() => navigate('/study-rooms')}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Study Rooms</CardTitle>
                </CardHeader>
                <CardContent>
                  <DashboardEmptyState
                    icon={<Users />}
                    title="No active study rooms"
                    description="Join or create a study room to collaborate with peers"
                    actionLabel="Browse Rooms"
                    onAction={() => navigate('/study-rooms')}
                    compact={true}
                  />
                </CardContent>
              </Card>
            )}
            
            <AnalyticsCard
              title="Weekly Study Activity"
              chartType="bar"
              filters={["This Week", "Last Week", "Month"]}
            />
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Your Progress</h2>
              <div className="space-y-3">
                {statsCards.map((card, index) => (
                  <StatsCard key={index} {...card} />
                ))}
              </div>
            </div>

            <TasksSection 
              tasks={tasks}
              onNewTask={handleNewTask}
            />
            
            <CollegeAdminSection />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <AppLayout>
      {isMobile ? (
        <div className="px-4 py-6">
          {dashboardContent}
        </div>
      ) : (
        <PageContainer className="py-6">
          {dashboardContent}
        </PageContainer>
      )}
    </AppLayout>
  );
};

export default Dashboard;
