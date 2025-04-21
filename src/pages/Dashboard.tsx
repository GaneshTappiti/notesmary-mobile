
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  TrendingUp,
  BarChart3,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { CalendarCard } from '@/components/dashboard/CalendarCard';
import { StudyProgressCard } from '@/components/dashboard/StudyProgressCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

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
      time: '2:00 PM',
      avatar: 'https://ui-avatars.com/api/?name=P&background=4F46E5&color=fff',
    },
    {
      id: '2',
      title: 'Math Group',
      participants: 3,
      time: '4:00 PM',
      avatar: 'https://ui-avatars.com/api/?name=M&background=F59E0B&color=fff',
    },
    {
      id: '3',
      title: 'Biology Discussion',
      participants: 7,
      time: '6:30 PM',
      avatar: 'https://ui-avatars.com/api/?name=B&background=10B981&color=fff',
    }
  ];

  // Upcoming tasks
  const upcomingTasks = [
    { id: 1, title: 'Physics Assignment Due', time: '2:00 PM Today', status: 'urgent' },
    { id: 2, title: 'Math Group Study', time: '4:30 PM Tomorrow', status: 'pending' },
    { id: 3, title: 'Chemistry Lab Report', time: 'Friday, 10:00 AM', status: 'completed' },
    { id: 4, title: 'Biology Research Paper', time: 'Next Monday', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
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
            onClick={() => {
              toast({
                title: "Calendar synced",
                description: "Your calendar has been updated with the latest events"
              });
            }}
          >
            <Calendar size={16} />
            Sync Calendar
          </Button>
          <Button 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 gap-1 h-9 text-white"
            onClick={() => {
              toast({
                title: "New task created",
                description: "Your task has been added to your list"
              });
            }}
          >
            <Plus size={16} />
            New Task
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Analytics Charts - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-5">
          {/* Weekly Activity Chart */}
          <AnalyticsCard 
            title="Weekly Activity" 
            chartType="bar"
            filters={["This Week", "Last Week", "Month"]}
          />
          
          {/* Study Performance */}
          <Card className="border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="px-6 py-5 flex justify-between items-center border-b border-gray-100">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-600" />
                Study Performance
              </CardTitle>
              <Tabs defaultValue="week" className="w-[240px]">
                <TabsList className="grid grid-cols-3 h-8">
                  <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
                  <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                  <TabsTrigger value="year" className="text-xs">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="px-6 py-5">
              <div className="space-y-5">
                {studyProgressItems.map((subject) => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{subject.title}</span>
                      <span className="text-sm font-semibold">{subject.progress}%</span>
                    </div>
                    <Progress 
                      value={subject.progress} 
                      className="h-2 bg-gray-100"
                      indicatorClassName={`bg-${subject.color}-500`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Side Content - Takes up 1 column */}
        <div className="space-y-5">
          {/* Calendar Card */}
          <CalendarCard />
          
          {/* Upcoming Tasks */}
          <Card className="border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="px-6 py-5 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
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
                <Button variant="ghost" className="w-full justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-1.5">
                  View All Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Study Rooms Section */}
      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="px-6 py-5 flex justify-between items-center border-b border-gray-100">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Users size={18} className="text-blue-600" />
            Recent Study Rooms
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.location.href = "/study-rooms"}
            className="gap-1 h-9 text-blue-600 border-blue-200 hover:border-blue-400"
          >
            View All Rooms
            <ArrowRight size={16} />
          </Button>
        </CardHeader>
        
        <CardContent className="px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyRooms.map((room) => (
              <Card 
                key={room.id} 
                className="border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer bg-white"
                onClick={() => window.location.href = `/study-room/${room.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={room.avatar} />
                      <AvatarFallback>{room.title[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">{room.title}</h3>
                      <p className="text-xs text-gray-500">{room.time} • {room.participants} participants</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1 text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                    >
                      <Users size={14} />
                      Join
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/study-room/${room.id}/chat`;
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
