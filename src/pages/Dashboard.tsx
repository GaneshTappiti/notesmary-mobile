
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import DashboardStatsCard from '@/components/dashboard/DashboardStatsCard';
import {
  Upload,
  Search,
  Users,
  Brain,
  Timer,
  Plus,
  Clock,
} from 'lucide-react';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Quick access options with updated styling
  const quickAccessOptions = [
    {
      title: 'Upload Notes',
      description: 'Share study materials',
      icon: <Upload className="h-5 w-5" />,
      buttonText: 'Upload',
      primaryAction: true,
      onClick: () => navigate('/upload-notes')
    },
    {
      title: 'Find Notes',
      description: 'Discover study resources',
      icon: <Search className="h-5 w-5" />,
      buttonText: 'Search',
      onClick: () => navigate('/find-notes')
    },
    {
      title: 'Join Study Room',
      description: 'Study with peers in real-time',
      icon: <Users className="h-5 w-5" />,
      buttonText: 'Join',
      onClick: () => navigate('/study-rooms')
    },
    {
      title: 'Ask AI',
      description: 'Get instant help with questions',
      icon: <Brain className="h-5 w-5" />,
      buttonText: 'Ask Now',
      onClick: () => navigate('/ai-answers')
    },
    {
      title: 'Focus Mode',
      description: 'Eliminate distractions',
      icon: <Timer className="h-5 w-5" />,
      buttonText: 'Start Focus',
      onClick: () => toast({
        title: "Coming Soon",
        description: "Focus Mode will be available in the next update."
      })
    }
  ];

  // Study rooms data
  const studyRooms = [
    {
      id: '1',
      title: 'Physics Study Session',
      participants: 5,
      time: '1h 30m',
      date: 'Today 2:00 PM',
      status: 'active'
    },
    {
      id: '2',
      title: 'Math Group',
      participants: 3,
      time: '45m',
      date: 'Today 4:00 PM',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Biology Discussion',
      participants: 7,
      time: '2h',
      date: 'Today 6:30 PM',
      status: 'scheduled'
    }
  ];

  const stats = [
    {
      value: '53',
      label: 'Total Notes',
      trend: '+10%',
      icon: <Upload className="h-5 w-5" />
    },
    {
      value: '28',
      label: 'Study Sessions',
      trend: '+14%',
      icon: <Users className="h-5 w-5" />
    },
    {
      value: '152',
      label: 'AI Answers',
      trend: '+23%',
      icon: <Brain className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Hello, Tappiti 👋</h1>
        <p className="text-muted-foreground">Here's your dashboard for today</p>
      </div>

      {/* Quick Access Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {quickAccessOptions.map((option, index) => (
          <Card key={index} className="border p-6 space-y-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">{option.title}</h3>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
            <Button 
              className="w-full"
              variant={option.primaryAction ? "default" : "secondary"}
              onClick={option.onClick}
            >
              {option.buttonText}
            </Button>
          </Card>
        ))}
      </div>

      {/* Recent Study Rooms Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h2 className="font-semibold">Recent Study Rooms</h2>
          </div>
          <Button 
            variant="link" 
            className="text-purple-600"
            onClick={() => navigate('/study-rooms')}
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyRooms.map((room) => (
            <Card key={room.id} className="border">
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{room.title}</h3>
                    <Badge 
                      variant={room.status === 'active' ? 'default' : 'secondary'}
                      className={room.status === 'active' ? 'bg-green-500' : ''}
                    >
                      {room.status === 'active' ? 'Active' : 'Scheduled'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {room.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {room.participants} participants
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {room.date}
                  </div>
                </div>
                <Button className="w-full">Join Again</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <DashboardStatsCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
