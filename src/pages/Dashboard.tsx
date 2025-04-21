
// Reorganized Dashboard layout based on the requested section order
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { CalendarCard } from '@/components/dashboard/CalendarCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StudyRoomCard } from '@/components/dashboard/StudyRoomCard';
import { QuickAccessCard } from '@/components/dashboard/QuickAccessCard';
import { StudyProgressCard } from '@/components/dashboard/StudyProgressCard';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  TrendingUp,
  BarChart3,
  Calendar,
  ArrowRight,
  Plus,
  Clock,
  Upload,
  Search,
  Brain,
  Timer,
  MessageSquare
} from 'lucide-react';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Notes',
      value: '53',
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      trend: { value: '10%', isPositive: true }
    },
    {
      title: 'Study Sessions',
      value: '28',
      icon: <BarChart3 className="h-5 w-5 text-green-500" />,
      trend: { value: '5%', isPositive: true }
    },
    {
      title: 'AI Answers',
      value: '152',
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
      trend: { value: '8%', isPositive: true }
    },
    {
      title: 'Study Rooms',
      value: '4',
      icon: <Users className="h-5 w-5 text-amber-500" />,
      trend: { value: '2%', isPositive: true }
    },
  ];

  // Sample data for study progress
  const studyProgressItems = [
    { id: 1, title: 'Physics', progress: 85, color: 'blue' },
    { id: 2, title: 'Chemistry', progress: 65, color: 'green' },
    { id: 3, title: 'Mathematics', progress: 75, color: 'purple' },
    { id: 4, title: 'Biology', progress: 45, color: 'yellow' },
  ];

  // Study rooms data
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

  // Upcoming tasks
  const upcomingTasks = [
    { id: 1, title: 'Physics Assignment Due', time: '2:00 PM Today', status: 'urgent' },
    { id: 2, title: 'Math Group Study', time: '4:30 PM Tomorrow', status: 'pending' },
    { id: 3, title: 'Chemistry Lab Report', time: 'Friday, 10:00 AM', status: 'completed' },
    { id: 4, title: 'Biology Research Paper', time: 'Next Monday', status: 'pending' },
  ];

  // Quick access options
  const quickAccessOptions = [
    {
      title: 'Upload Notes',
      description: 'Share your notes with classmates',
      icon: <Upload className="h-6 w-6" />,
      bgColor: 'bg-blue-100',
      isPrimary: true,
      buttonText: 'Upload Now',
      buttonVariant: 'default' as const,
      onClick: () => navigate('/upload-notes')
    },
    {
      title: 'Find Notes',
      description: 'Discover notes from peers',
      icon: <Search className="h-6 w-6" />,
      bgColor: 'bg-purple-100',
      isPrimary: false,
      buttonText: 'Search Notes',
      buttonVariant: 'outline' as const,
      onClick: () => navigate('/find-notes')
    },
    {
      title: 'Join Study Room',
      description: 'Study with others in real-time',
      icon: <Users className="h-6 w-6" />,
      bgColor: 'bg-green-100',
      isPrimary: false,
      buttonText: 'Find Rooms',
      buttonVariant: 'outline' as const,
      onClick: () => navigate('/study-rooms')
    },
    {
      title: 'Ask AI Answer',
      description: 'Get smart answers to your questions',
      icon: <Brain className="h-6 w-6" />,
      bgColor: 'bg-amber-100',
      isPrimary: false,
      buttonText: 'Ask AI',
      buttonVariant: 'outline' as const,
      onClick: () => navigate('/ai-answers')
    },
    {
      title: 'Focus Mode',
      description: 'Eliminate distractions and study better',
      icon: <Timer className="h-6 w-6" />,
      bgColor: 'bg-red-100',
      isPrimary: false,
      buttonText: 'Start Focus',
      buttonVariant: 'outline' as const,
      onClick: () => toast({
        title: "Feature Coming Soon",
        description: "Focus Mode will be available in the next update."
      })
    }
  ];

  // Handle navigation to specific routes
  const handleViewAllTasks = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The Tasks page will be available in the next update.",
    });
  };

  const handleJoinRoom = (roomId: string) => {
    navigate(`/study-room/${roomId}`);
  };

  const handleRoomDetails = (roomId: string) => {
    navigate(`/study-room/${roomId}/chat`);
  };

  const handleViewAllRooms = () => {
    navigate('/study-rooms');
  };

  const handleSyncCalendar = () => {
    toast({
      title: "Calendar synced",
      description: "Your calendar has been updated with the latest events"
    });
  };

  const handleNewTask = () => {
    toast({
      title: "New task created",
      description: "Your task has been added to your list"
    });
  };

  const handleTaskClick = (taskId: number) => {
    toast({
      title: "Task Details",
      description: `You clicked on task #${taskId}`
    });
  };

  const handleViewAnalytics = () => {
    navigate('/study-analytics');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Check your progress and upcoming tasks</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 h-9"
            onClick={handleSyncCalendar}
          >
            <Calendar size={16} />
            Sync Calendar
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 gap-1 h-9 text-white"
            onClick={handleNewTask}
          >
            <Plus size={16} />
            New Task
          </Button>
        </div>
      </div>

      {/* 1. QUICK ACCESS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {quickAccessOptions.map((option, index) => (
          <QuickAccessCard
            key={index}
            title={option.title}
            description={option.description}
            icon={option.icon}
            bgColor={option.bgColor}
            buttonText={option.buttonText}
            buttonVariant={option.buttonVariant}
            onClick={option.onClick}
            isPrimary={option.isPrimary}
          />
        ))}
      </div>

      {/* 2. RECENT STUDY ROOMS SECTION */}
      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="px-6 py-5 flex justify-between items-center border-b border-gray-100">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Users size={18} className="text-blue-600" />
            Recent Study Rooms
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAllRooms}
            className="gap-1 h-9 text-blue-600 border-blue-200 hover:border-blue-400"
          >
            View All Rooms
            <ArrowRight size={16} />
          </Button>
        </CardHeader>

        <CardContent className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyRooms.map((room) => (
              <div 
                key={room.id} 
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-base">{room.title}</h4>
                  {room.status === 'active' ? (
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Active</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">Scheduled</span>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{room.duration}</span>
                  <span className="mx-1.5">•</span>
                  <span>{room.date}</span>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex -space-x-2">
                    {room.avatars?.map((avatar, index) => (
                      <Avatar key={index} className="border-2 border-white h-7 w-7">
                        <AvatarImage src={avatar} alt="User" />
                        <AvatarFallback>U{index}</AvatarFallback>
                      </Avatar>
                    ))}
                    {room.participants > (room.avatars?.length || 0) && (
                      <div className="bg-gray-100 h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                        +{room.participants - (room.avatars?.length || 0)}
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => handleJoinRoom(room.id)}
                  >
                    Join Again
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. CHECK YOUR PROGRESS & UPCOMING TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Check Your Progress</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card, index) => (
              <StatsCard
                key={index}
                title={card.title}
                value={card.value}
                icon={card.icon}
                trend={card.trend}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <Card className="border-none shadow-sm overflow-hidden bg-white h-full">
            <CardHeader className="px-6 py-4 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleTaskClick(task.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2.5 w-2.5 rounded-full ${
                        task.status === 'urgent' ? 'bg-red-500' :
                          task.status === 'completed' ? 'bg-green-500' : 'bg-amber-400'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.time}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-gray-100">
                <Button
                  variant="ghost"
                  className="w-full justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-1.5"
                  onClick={handleViewAllTasks}
                >
                  View All Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2">
          <AnalyticsCard
            title="Weekly Study Activity"
            chartType="bar"
            filters={["This Week", "Last Week", "Month"]}
          />
        </div>

        {/* Study Progress */}
        <StudyProgressCard 
          title="Subject Progress" 
          items={studyProgressItems}
        />
      </div>

      {/* 5. CALENDAR + TODAY'S SCHEDULE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <CalendarCard />
        </div>

        {/* Today's Schedule */}
        <Card className="border-none shadow-sm overflow-hidden bg-white">
          <CardHeader className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock size={18} className="text-blue-600" />
              Today's Schedule
            </CardTitle>
            <Button size="sm" variant="outline" className="h-8">
              <Plus size={16} className="mr-1" />
              Add Event
            </Button>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="text-center">
                  <div className="text-xs text-gray-500">09:00</div>
                  <div className="h-full w-px bg-gray-200 mx-auto my-1"></div>
                  <div className="text-xs text-gray-500">10:30</div>
                </div>
                <div className="flex-1 bg-blue-50 border-l-4 border-blue-500 rounded-md p-3">
                  <h5 className="font-medium text-sm">Physics Class</h5>
                  <p className="text-xs text-gray-500">Room 302</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-center">
                  <div className="text-xs text-gray-500">13:00</div>
                  <div className="h-full w-px bg-gray-200 mx-auto my-1"></div>
                  <div className="text-xs text-gray-500">14:00</div>
                </div>
                <div className="flex-1 bg-purple-50 border-l-4 border-purple-500 rounded-md p-3">
                  <h5 className="font-medium text-sm">Chemistry Lab</h5>
                  <p className="text-xs text-gray-500">Science Building</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-center">
                  <div className="text-xs text-gray-500">16:30</div>
                  <div className="h-full w-px bg-gray-200 mx-auto my-1"></div>
                  <div className="text-xs text-gray-500">18:00</div>
                </div>
                <div className="flex-1 bg-green-50 border-l-4 border-green-500 rounded-md p-3">
                  <h5 className="font-medium text-sm">Study Group</h5>
                  <p className="text-xs text-gray-500">Library - Room 5</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
