
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
  BarChart3,
  Clock,
  Star,
  CheckCircle,
  Calendar,
  Plus,
  HelpCircle,
  CreditCard,
  MessageSquare,
  BookText,
  GraduationCap,
  X
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CreateRoomModal } from '@/components/CreateRoomModal';
import { BrowseRoomsModal } from '@/components/BrowseRoomsModal';
import { YourRoomsSection } from '@/components/YourRoomsSection';

const Dashboard = () => {
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [browseRoomsModalOpen, setBrowseRoomsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread count
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const currentDate = new Date();
  const userName = "Student"; // Would come from user profile in a real app

  const stats = [
    { label: 'Notes Uploaded', value: '12', icon: <Upload className="h-5 w-5 text-blue-500" />, link: '/view-notes' },
    { label: 'Notes Saved', value: '45', icon: <Star className="h-5 w-5 text-yellow-500" />, link: '/view-notes?tab=saved' },
    { label: 'AI Answers', value: '28', icon: <BrainCircuit className="h-5 w-5 text-purple-500" />, link: '/ai-answers' },
    { label: 'Study Groups', value: '4', icon: <Users className="h-5 w-5 text-green-500" />, link: '/study-rooms' },
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

  // Updated main actions to match the specified layout
  const mainActions = [
    {
      title: 'Upload Notes',
      description: 'Share your notes with classmates',
      icon: <Upload className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonText: 'Upload Now',
      buttonVariant: 'default',
      onClick: () => navigate('/upload-notes')
    },
    {
      title: 'Find Notes',
      description: 'Discover comprehensive notes from peers',
      icon: <Search className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      buttonText: 'Search Notes',
      buttonVariant: 'outline',
      onClick: () => navigate('/find-notes')
    },
    {
      title: 'AI Answers',
      description: 'Get smart answers to your questions',
      icon: <BrainCircuit className="h-6 w-6 text-green-600" />,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonText: 'Ask AI',
      buttonVariant: 'outline',
      onClick: () => navigate('/ai-answers')
    },
    {
      title: 'Mark Answers',
      description: 'Generate structured 2, 5, 10-mark answers',
      icon: <GraduationCap className="h-6 w-6 text-amber-600" />,
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
      buttonText: 'Generate Answers',
      buttonVariant: 'outline',
      onClick: () => navigate('/ai-mark-answers')
    },
    {
      title: 'Study Rooms',
      description: 'Create or join collaborative study groups',
      icon: <Users className="h-6 w-6 text-indigo-600" />,
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      buttonText: 'View Rooms',
      buttonVariant: 'outline',
      onClick: () => navigate('/study-rooms')
    }
  ];

  // Filter the main actions based on the search query
  const filteredMainActions = mainActions.filter(card => 
    searchQuery ? 
    (card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     card.description.toLowerCase().includes(searchQuery.toLowerCase())) : 
    true
  );

  // Get time-based greeting
  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">      
      <div className="pb-8 px-4 max-w-7xl mx-auto">
        {/* Personalized greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-muted-foreground">Here's your study overview for today</p>
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
        
        {/* Stats overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="border-none shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] cursor-pointer overflow-hidden"
              onClick={() => navigate(stat.link)}
            >
              <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.icon.props.className.includes('blue') ? 'bg-blue-50 dark:bg-blue-900/30' : 
                  stat.icon.props.className.includes('yellow') ? 'bg-yellow-50 dark:bg-yellow-900/30' : 
                  stat.icon.props.className.includes('purple') ? 'bg-purple-50 dark:bg-purple-900/30' : 
                  'bg-green-50 dark:bg-green-900/30'}`}>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Quick Access section - keep this as the primary feature access point */}
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
            {searchQuery && filteredMainActions.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No results found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search terms</p>
                <Button 
                  onClick={() => setSearchQuery('')} 
                  variant="outline" 
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {filteredMainActions.map((action, index) => (
                  <Card 
                    key={index} 
                    className={`border shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] dark:bg-gray-800 group ${
                      action.title === 'Upload Notes' ? 'border-blue-300 dark:border-blue-700/50' : ''
                    }`}
                  >
                    <CardHeader className="pb-2 pt-4">
                      <div className="flex items-center gap-3">
                        <div className={`${action.bgColor} dark:bg-opacity-20 p-2.5 rounded-full transition-all duration-300 group-hover:scale-110`}>
                          {action.icon}
                        </div>
                        <CardTitle className="text-base">{action.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                        {action.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="pb-4">
                      <Button 
                        className="w-full" 
                        variant={action.buttonVariant as "default" | "outline"} 
                        onClick={action.onClick}
                        size="sm"
                      >
                        {action.buttonText}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Tabbed content to reduce vertical scrolling */}
        <Card className="border-none shadow-sm mb-6 dark:bg-gray-800/50 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Activity & Planning</CardTitle>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-1">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>
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
                        <div key={index} className="flex items-start gap-2.5 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                            <CheckCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400 text-center py-4">
                        <BookText className="h-8 w-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                        <p className="text-sm">No recent activity yet.</p>
                      </div>
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
                      <div className="text-gray-500 dark:text-gray-400 text-center py-4">
                        <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                        <p className="text-sm">No upcoming events.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
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
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No upcoming events</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">You don't have any events scheduled</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="activity" className="mt-0">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-2.5 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                        <CheckCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BookText className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No recent activity</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">You haven't done anything yet</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardContent>
            {/* No content needed here since we moved it inside the Tabs component */}
          </CardContent>
        </Card>
        
        {/* Study Rooms Section - Consolidated in one place */}
        <Card className="border-none shadow-sm mb-6 dark:bg-gray-800/50 overflow-hidden">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                  <Users className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <CardTitle className="text-lg">Group Study Rooms</CardTitle>
              </div>
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
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                    <Plus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium">Create a Study Room</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">Start a new collaborative study session with classmates.</p>
                <Button 
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all hover:shadow-sm flex items-center justify-center gap-1.5"
                  onClick={() => setCreateRoomModalOpen(true)}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Create Room
                </Button>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-sm transition-all bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full">
                    <Search className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium">Join Existing Room</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">Find and participate in ongoing study groups.</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all hover:shadow-sm flex items-center justify-center gap-1.5"
                  onClick={() => setBrowseRoomsModalOpen(true)}
                >
                  <Users className="h-3.5 w-3.5" />
                  Browse Rooms
                </Button>
              </div>
            </div>
            
            <YourRoomsSection />
          </CardContent>
        </Card>
        
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
