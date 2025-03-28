
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LogOut, 
  Upload, 
  Search, 
  BrainCircuit, 
  Users, 
  BookOpen, 
  Bell, 
  BarChart3, 
  Clock, 
  Star,
  CheckCircle,
  Calendar,
  Plus,
  HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CreateRoomModal } from '@/components/CreateRoomModal';
import { BrowseRoomsModal } from '@/components/BrowseRoomsModal';
import { YourRoomsSection } from '@/components/YourRoomsSection';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [browseRoomsModalOpen, setBrowseRoomsModalOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread count
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <Navbar />
      
      <div className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Dashboard</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Track your progress, manage notes, and collaborate</p>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
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
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="flex items-center gap-1.5"
              size={isMobile ? "sm" : "default"}
            >
              <LogOut size={16} />
              {!isMobile && "Logout"}
            </Button>
          </div>
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
        
        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {mainActions.map((action, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
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
        
        {/* Analytics */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Study Analytics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-5">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-gray-500 text-sm mb-2">Analytics will track your study patterns and progress.</p>
              <Button variant="outline" size="sm">Set Up Analytics</Button>
            </div>
          </CardContent>
        </Card>
      </div>

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
  );
};

export default Dashboard;
