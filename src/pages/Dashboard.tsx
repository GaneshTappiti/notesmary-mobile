
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, Search, Users, Brain, Timer, ShieldCheck } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { QuickAccessCard } from '@/components/dashboard/QuickAccessCard';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { TasksSection } from '@/components/dashboard/TasksSection';
import { StudyRoomsSection } from '@/components/dashboard/StudyRoomsSection';
import { PageContainer } from '@/components/PageContainer';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

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
    // Admin Panel QuickAccess card that is conditionally added for admin users
    ...(isAdmin ? [{
      title: 'Admin Panel',
      description: 'Access administrative controls',
      icon: <ShieldCheck className="h-6 w-6" />,
      bgColor: 'bg-red-50',
      isPrimary: false,
      buttonText: 'Access Admin',
      buttonVariant: 'default' as const,
      onClick: () => navigate('/admin')
    }] : []),
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
    <PageContainer>
      <div className="space-y-6 animate-fade-in">
        <WelcomeHeader 
          userName={user?.user_metadata?.full_name}
          onLogout={handleLogout}
          isAdmin={isAdmin}
          onAdminClick={() => navigate('/admin')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickAccessOptions.map((option, index) => (
            <QuickAccessCard
              key={index}
              {...option}
              className="hover:shadow-lg transition-all duration-300"
            />
          ))}
        </div>

        <StudyRoomsSection 
          rooms={studyRooms}
          onViewAll={() => navigate('/study-rooms')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {statsCards.map((card, index) => (
                <StatsCard key={index} {...card} />
              ))}
            </div>
          </div>

          <TasksSection 
            tasks={tasks}
            onNewTask={handleNewTask}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AnalyticsCard
            title="Weekly Study Activity"
            chartType="bar"
            filters={["This Week", "Last Week", "Month"]}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
