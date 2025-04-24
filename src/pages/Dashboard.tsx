import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { StudyRoomCard } from '@/components/dashboard/StudyRoomCard';
import { QuickAccessCard } from '@/components/dashboard/QuickAccessCard';
import {
  Upload,
  Search,
  Users,
  Brain,
  Timer,
  Plus,
  CheckSquare,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
    {
      title: 'Focus Mode',
      description: 'Eliminate distractions',
      icon: <Timer className="h-6 w-6" />,
      bgColor: 'bg-red-50',
      isPrimary: false,
      buttonText: 'Start Focus',
      buttonVariant: 'outline' as const,
      onClick: () => toast({
        title: "Coming Soon",
        description: "Focus Mode will be available in the next update."
      })
    }
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

  const [activeTab, setActiveTab] = useState('all');

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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Welcome back, {user?.user_metadata?.full_name || 'Student'}!
        </h1>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {quickAccessOptions.map((option, index) => (
          <QuickAccessCard
            key={index}
            {...option}
            className="hover:shadow-lg transition-all duration-300"
          />
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users size={20} className="text-gray-500" />
              Recent Study Rooms
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/study-rooms')}
              className="text-blue-600 border-blue-200 hover:border-blue-400"
            >
              View All
            </Button>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyRooms.map((room) => (
            <StudyRoomCard key={room.id} {...room} />
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {statsCards.map((card, index) => (
              <StatsCard
                key={index}
                {...card}
              />
            ))}
          </div>
        </div>

        <Card className="border-none shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold flex items-center gap-2">
                <CheckSquare size={18} className="text-gray-500" />
                Tasks
              </h3>
              <Button size="sm" variant="ghost" onClick={handleNewTask}>
                <Plus size={16} className="mr-1" />
                Add Task
              </Button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border ${
                    task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{task.time}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                          {task.subject}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          task.priority === 'high' ? 'bg-red-50 text-red-700' :
                          task.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-green-50 text-green-700'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnalyticsCard
          title="Weekly Study Activity"
          chartType="bar"
          filters={["This Week", "Last Week", "Month"]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
