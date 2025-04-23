import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Search,
  BrainCircuit,
  Users,
  Bell,
  Clock,
  Star,
  CheckCircle,
  Calendar,
  Plus,
  HelpCircle,
  GraduationCap,
  X,
  ArrowRight,
  Bookmark,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CreateRoomModal } from '@/components/CreateRoomModal';
import { BrowseRoomsModal } from '@/components/BrowseRoomsModal';
import { DashboardEmptyState } from '@/components/dashboard/DashboardEmptyState';
import { DashboardStatsCard } from '@/components/dashboard/DashboardStatsCard';
import { QuickAccessCard } from '@/components/dashboard/QuickAccessCard';
import { ActivityItem } from '@/components/dashboard/ActivityItem';
import { StudyRoomCard } from '@/components/dashboard/StudyRoomCard';
import { StatisticsSection } from '@/components/dashboard/StatisticsSection';
import { TasksList } from '@/components/dashboard/TasksList';

const Dashboard = () => {
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [browseRoomsModalOpen, setBrowseRoomsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState("overview");
  const [focusMode, setFocusMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const currentDate = new Date();
  const userName = "Student"; // Would come from user profile in a real app

  const stats = [
    { 
      label: 'Notes Uploaded', 
      description: 'Notes you shared with others',
      value: '12', 
      icon: <Upload className="h-5 w-5 text-blue-500" />, 
      link: '/view-notes',
      color: 'blue'
    },
    { 
      label: 'Notes Saved', 
      description: 'Notes you saved for future use',
      value: '45', 
      icon: <Bookmark className="h-5 w-5 text-yellow-500" />, 
      link: '/view-notes?tab=saved',
      color: 'yellow'
    },
    { 
      label: 'AI Answers', 
      description: 'Total AI queries answered',
      value: '28', 
      icon: <BrainCircuit className="h-5 w-5 text-purple-500" />, 
      link: '/ai-answers',
      color: 'purple'
    },
    { 
      label: 'Study Groups', 
      description: 'Number of joined groups',
      value: '4', 
      icon: <Users className="h-5 w-5 text-green-500" />, 
      link: '/study-rooms',
      color: 'green'
    },
  ];

  const upcomingEvents = [
    { title: 'Physics Study Group', date: 'Saturday, April 5 - 4:00 PM', status: 'Upcoming' },
    { title: 'Math Assignment Due', date: 'Sunday, April 6 - 11:59 PM', status: 'Pending' },
    { title: 'Biology Group Session', date: 'Tuesday, April 8 - 2:00 PM', status: 'Scheduled' },
  ];

  const recentActivities = [
    { action: 'Uploaded notes on Quantum Physics', time: '2 hours ago' },
    { action: 'Saved Math Formulas', time: '5 hours ago' },
    { action: 'Asked AI about Chemical Bonds', time: 'Yesterday' },
  ];

  // Consolidated main actions - no more duplicates
  const quickAccessItems = [
    {
      title: 'Upload Notes',
      description: 'Share your notes with classmates',
      icon: <Upload className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonText: 'Upload Now',
      buttonVariant: 'default' as const,
      onClick: () => navigate('/upload-notes')
    },
    {
      title: 'Find Notes',
      description: 'Discover comprehensive notes from peers',
      icon: <Search className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      buttonText: 'Search Notes',
      buttonVariant: 'outline' as const,
      onClick: () => navigate('/find-notes')
    },
    {
      title: 'AI Answers',
      description: 'Get smart answers to your questions',
      icon: <BrainCircuit className="h-6 w-6 text-green-600" />,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonText: 'Ask AI',
      buttonVariant: 'default' as const,
      onClick: () => navigate('/ai-answers')
    },
    {
      title: 'Mark Answers',
      description: 'Generate structured 2, 5, 10-mark answers',
      icon: <GraduationCap className="h-6 w-6 text-amber-600" />,
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
      buttonText: 'Generate Answers',
      buttonVariant: 'outline' as const,
      onClick: () => navigate('/ai-mark-answers')
    },
  ];

  // Study rooms - consolidated in one place
  const studyRooms = [
    {
      id: '1',
      title: 'Physics Study Session',
      participants: 5,
      date: 'Saturday, April 5 - 4:00 PM',
      status: 'active'
    },
    {
      id: '2',
      title: 'Math Group',
      participants: 3,
      date: 'Sunday, April 6 - 10:00 AM',
      status: 'scheduled'
    }
  ];

  // Filter the quick access items based on the search query
  const filteredQuickAccess = quickAccessItems.filter(item => 
    searchQuery ? 
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.description.toLowerCase().includes(searchQuery.toLowerCase())) : 
    true
  );

  // Get time-based greeting
  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Toggle focus mode
  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    toast({
      title: focusMode ? "Focus mode disabled" : "Focus mode enabled",
      description: focusMode ? "All dashboard features are now visible." : "Showing only essential study items.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">      
      <div className="pb-8 px-4 max-w-7xl mx-auto">
        {/* Greeting section */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-muted-foreground">Here's your study overview for today</p>
          </div>
          
          {/* Focus mode toggle button */}
          <Button
            variant={focusMode ? "default" : "outline"}
            size="sm"
            onClick={toggleFocusMode}
            className={`flex items-center gap-1.5 ${focusMode ? "bg-blue-600 text-white" : ""}`}
          >
            {focusMode ? "Exit Focus Mode" : "Focus Mode"}
          </Button>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search for notes, study materials, topics, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Statistics Section */}
        <StatisticsSection />
        
        {/* Quick Access Cards */}
        {!focusMode && (
          <Card className="border-none shadow-sm mb-8 dark:bg-gray-800/50 overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    <BrainCircuit className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-lg">Quick Access</CardTitle>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {searchQuery && filteredQuickAccess.length === 0 ? (
                <DashboardEmptyState 
                  icon={<Search className="h-8 w-8 text-gray-400" />}
                  title="No results found"
                  description="Try adjusting your search terms"
                  actionLabel="Clear Search"
                  onAction={() => setSearchQuery('')}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredQuickAccess.map((item, index) => (
                    <QuickAccessCard
                      key={index}
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      bgColor={item.bgColor}
                      buttonText={item.buttonText}
                      buttonVariant={item.buttonVariant}
                      onClick={item.onClick}
                      isPrimary={item.buttonVariant === 'default'}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Study Rooms and Tasks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Study Rooms */}
          <Card className="border-none shadow-sm dark:bg-gray-800/50 overflow-hidden">
            <CardHeader className="pb-2 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                    <Users className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <CardTitle className="text-lg">Study Rooms</CardTitle>
                </div>
              
                <div className="flex items-center gap-2">
                  <Button
                    variant="default" 
                    size="sm" 
                    onClick={() => setCreateRoomModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Create Room
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBrowseRoomsModalOpen(true)}
                  >
                    <Search className="h-4 w-4 mr-1" /> Browse
                  </Button>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Create or join virtual study rooms with peers</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Study rooms list */}
              {studyRooms.length > 0 ? (
                <div className="space-y-4">
                  {studyRooms.map((room) => (
                    <StudyRoomCard 
                      key={room.id}
                      id={room.id}
                      title={room.title}
                      participants={room.participants}
                      date={room.date}
                      status={room.status}
                    />
                  ))}
                  
                  {/* View all button */}
                  <div className="text-center pt-2">
                    <Button 
                      variant="ghost" 
                      onClick={() => navigate('/study-rooms')}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      View all study rooms
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <DashboardEmptyState
                  icon={<Users className="h-12 w-12" />}
                  title="No study rooms yet"
                  description="Create a new study room or join an existing one"
                  actionLabel="Create Room"
                  onAction={() => setCreateRoomModalOpen(true)}
                />
              )}
            </CardContent>
          </Card>
          
          {/* Tasks List */}
          <TasksList />
        </div>
        
        {/* Activity & Planning Section */}
        <Card className="border-none shadow-sm mb-6 dark:bg-gray-800/50 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Activity & Planning</CardTitle>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-1">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity Summary */}
                  <div className="space-y-2.5">
                    <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      Recent Activity
                    </h3>
                    {recentActivities.length > 0 ? (
                      recentActivities.slice(0, 2).map((activity, index) => (
                        <ActivityItem 
                          key={index}
                          action={activity.action}
                          time={activity.time}
                          icon={<CheckCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                          iconBgClass="bg-blue-100 dark:bg-blue-900/30"
                        />
                      ))
                    ) : (
                      <DashboardEmptyState
                        icon={<BookOpen className="h-8 w-8" />}
                        title="No recent activity"
                        description="Your activity will appear here"
                        compact
                      />
                    )}
                  </div>
                  
                  {/* Upcoming Events Preview */}
                  <div className="space-y-2.5">
                    <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                      Upcoming Events
                    </h3>
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.slice(0, 2).map((event, index) => (
                        <div key={index} className="flex items-start gap-2.5 py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full">
                            <Calendar className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{event.date}</p>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-medium">
                            {event.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <DashboardEmptyState
                        icon={<Calendar className="h-8 w-8" />}
                        title="No upcoming events"
                        description="Schedule your first study event"
                        compact
                      />
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Upcoming Tab */}
              <TabsContent value="upcoming" className="mt-0">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-2.5 py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full">
                        <Calendar className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{event.date}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-medium">
                        {event.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <DashboardEmptyState
                    icon={<Calendar className="h-12 w-12" />}
                    title="No upcoming events"
                    description="You don't have any events scheduled"
                    actionLabel="Schedule Event"
                  />
                )}
              </TabsContent>
              
              {/* Activity Tab */}
              <TabsContent value="activity" className="mt-0">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <ActivityItem 
                      key={index}
                      action={activity.action}
                      time={activity.time}
                      icon={<CheckCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                      iconBgClass="bg-blue-100 dark:bg-blue-900/30"
                    />
                  ))
                ) : (
                  <DashboardEmptyState
                    icon={<BookOpen className="h-12 w-12" />}
                    title="No recent activity"
                    description="You haven't done anything yet"
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardContent>
            {/* No content needed here since we moved it inside the Tabs component */}
          </CardContent>
        </Card>
        
        {/* Modals */}
        <CreateRoomModal 
          open={createRoomModalOpen} 
          onClose={() => setCreateRoomModalOpen(false)} 
        />
        
        <BrowseRoomsModal 
          open={browseRoomsModalOpen} 
          onClose={() => setBrowseRoomsModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
