
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  Search,
  BrainCircuit,
  Users,
  Lightbulb,
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
  SunMoon,
  Sparkles
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CreateRoomModal } from '@/components/CreateRoomModal';
import { BrowseRoomsModal } from '@/components/BrowseRoomsModal';
import { YourRoomsSection } from '@/components/YourRoomsSection';

const Dashboard = () => {
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [browseRoomsModalOpen, setBrowseRoomsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread count
  const [isDarkMode, setIsDarkMode] = useState(false); // Mock dark mode state
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const stats = [
    { label: 'Notes Uploaded', value: '12', icon: <Upload className="h-5 w-5 text-blue-500" /> },
    { label: 'Notes Saved', value: '45', icon: <Star className="h-5 w-5 text-yellow-500" /> },
    { label: 'AI Answers', value: '28', icon: <BrainCircuit className="h-5 w-5 text-purple-500" /> },
    { label: 'Study Groups', value: '4', icon: <Users className="h-5 w-5 text-green-500" /> },
  ];

  const upcomingEvents = [
    { title: 'Physics Study Group', date: 'Today, 4:00 PM', status: 'Upcoming' },
    { title: 'Math Assignment Due', date: 'Tomorrow, 11:59 PM', status: 'Pending' },
    { title: 'Biology Group Session', date: 'Mar 30, 2:00 PM', status: 'Scheduled' },
  ];

  const recentActivities = [
    { action: 'Uploaded notes on Quantum Physics', time: '2 hours ago' },
    { action: 'Saved Math Formulas', time: '5 hours ago' },
    { action: 'Asked AI about Chemical Bonds', time: 'Yesterday' },
  ];

  const mainActions = [
    {
      title: 'Upload Notes',
      description: 'Share your notes with classmates and earn rewards for quality content.',
      icon: <Upload className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonText: 'Upload Now',
      buttonVariant: 'default',
      onClick: () => navigate('/upload-notes')
    },
    {
      title: 'Find Notes',
      description: 'Discover comprehensive notes for your subjects and topics from peers.',
      icon: <Search className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      buttonText: 'Search Notes',
      buttonVariant: 'outline',
      onClick: () => navigate('/find-notes')
    },
    {
      title: 'AI Answers',
      description: 'Get smart answers to your questions using our AI-powered learning assistant.',
      icon: <BrainCircuit className="h-6 w-6 text-green-600" />,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonText: 'Ask AI',
      buttonVariant: 'outline',
      onClick: () => navigate('/ai-answers')
    }
  ];

  const quickAccessCards = [
    {
      title: 'Study Room',
      description: 'Collaborative space for group learning.',
      icon: <Users className="h-6 w-6 text-indigo-600" />,
      bgColor: 'bg-indigo-100',
      buttonText: 'Join Room',
      onClick: () => navigate('/study-room/1')
    },
    {
      title: 'Study Room Chat',
      description: 'Real-time messaging for study groups.',
      icon: <MessageSquare className="h-6 w-6 text-cyan-600" />,
      bgColor: 'bg-cyan-100',
      buttonText: 'Open Chat',
      onClick: () => navigate('/study-room/1/chat')
    },
    {
      title: 'Team Collaboration',
      description: 'Manage study projects and tasks.',
      icon: <Users className="h-6 w-6 text-emerald-600" />,
      bgColor: 'bg-emerald-100',
      buttonText: 'View Teams',
      onClick: () => navigate('/team')
    },
    {
      title: 'AI Study Tips',
      description: 'Personalized learning recommendations.',
      icon: <Lightbulb className="h-6 w-6 text-amber-600" />,
      bgColor: 'bg-amber-100',
      buttonText: 'Get Tips',
      onClick: () => navigate('/ai-study-tips')
    },
    {
      title: 'Subscription',
      description: 'Manage your account and payments.',
      icon: <CreditCard className="h-6 w-6 text-rose-600" />,
      bgColor: 'bg-rose-100',
      buttonText: 'Manage Plan',
      onClick: () => navigate('/subscription')
    },
    {
      title: 'AI Insights',
      description: 'Analytics and performance tracking.',
      icon: <BrainCircuit className="h-6 w-6 text-violet-600" />,
      bgColor: 'bg-violet-100',
      buttonText: 'View Insights',
      onClick: () => navigate('/ai-insights')
    }
  ];

  // Filter cards based on search query
  const filteredQuickAccess = searchQuery 
    ? quickAccessCards.filter(card => 
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        card.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quickAccessCards;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: isDarkMode ? "Light mode activated" : "Dark mode activated",
      description: `You've switched to ${isDarkMode ? "light" : "dark"} mode.`,
      duration: 2000,
    });
    // In a real implementation, you would change the theme here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">      
      <div className="pb-8 px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quick Access</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Manage your notes, study groups, and learning tools</p>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              <SunMoon size={18} />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1.5 relative"
              size={isMobile ? "sm" : "default"}
              onClick={() => navigate('/notifications')}
            >
              <Bell size={16} />
              {!isMobile && "Notifications"}
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        
        {/* Search bar for Quick Access */}
        <div className="mb-6 relative">
          <Input
            type="text"
            placeholder="Search for features, tools or study resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute inset-y-0 right-0 pr-3"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </Button>
          )}
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-full ${stat.icon.props.className.includes('blue') ? 'bg-blue-50' : 
                                                     stat.icon.props.className.includes('yellow') ? 'bg-yellow-50' : 
                                                     stat.icon.props.className.includes('purple') ? 'bg-purple-50' : 
                                                     'bg-green-50'}`}>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Personalized Recommendations */}
        <Card className="border-none shadow-sm mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Recommended for You</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mainActions.map((action, index) => (
                <Card key={index} className="border shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-center gap-3">
                      <div className={`${action.bgColor} p-2.5 rounded-full`}>
                        {action.icon}
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <CardDescription className="text-gray-600 text-sm">
                      {action.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pb-4">
                    <Button 
                      className="w-full" 
                      variant={action.buttonVariant as "default" | "outline"} 
                      onClick={action.onClick}
                    >
                      {action.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Access Cards */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <span>Quick Access</span>
          {searchQuery && <Badge variant="outline" className="ml-2">{filteredQuickAccess.length} results</Badge>}
        </h2>
        
        {filteredQuickAccess.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredQuickAccess.map((card, index) => (
              <Card key={index} className="border shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
                <CardContent className="pt-6 pb-4">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${card.bgColor} p-3 rounded-full mb-4`}>
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{card.description}</p>
                    <Button 
                      onClick={card.onClick}
                      className="w-full"
                    >
                      {card.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No results found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search terms</p>
            <Button 
              onClick={() => setSearchQuery('')} 
              variant="outline" 
              className="mt-4"
            >
              Clear Search
            </Button>
          </div>
        )}
        
        {/* Recent Activity and Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentActivities.length > 0 ? (
                <div className="space-y-2.5">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-2.5 py-2 border-b border-gray-100 last:border-0">
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No recent activity yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 text-xs">Calendar</Button>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-2.5 py-2.5 border-b border-gray-100 last:border-0">
                  <div className="bg-indigo-100 p-1.5 rounded-full">
                    <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium">
                    {event.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Group Study Rooms */}
        <Card className="border-none shadow-sm mb-6">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Group Study Rooms</CardTitle>
              </div>
              <TooltipProvider>
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
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="border border-gray-200 p-4 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all bg-gradient-to-br from-blue-50 to-white">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="bg-blue-100 p-1.5 rounded-full">
                    <Plus className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-medium">Create a Study Room</h3>
                </div>
                <p className="text-gray-600 text-xs mb-3">Start a new collaborative study session with classmates.</p>
                <Button 
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all hover:shadow-sm flex items-center justify-center gap-1.5"
                  onClick={() => setCreateRoomModalOpen(true)}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Create Room
                </Button>
              </div>
              
              <div className="border border-gray-200 p-4 rounded-lg hover:border-purple-300 hover:shadow-sm transition-all bg-gradient-to-br from-purple-50 to-white">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="bg-purple-100 p-1.5 rounded-full">
                    <Search className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="font-medium">Join Existing Room</h3>
                </div>
                <p className="text-gray-600 text-xs mb-3">Find and participate in ongoing study groups.</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 transition-all hover:shadow-sm flex items-center justify-center gap-1.5"
                  onClick={() => setBrowseRoomsModalOpen(true)}
                >
                  <Users className="h-3.5 w-3.5" />
                  Browse Rooms
                </Button>
              </div>
            </div>
            
            {/* Rooms created by the user */}
            <YourRoomsSection />
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
