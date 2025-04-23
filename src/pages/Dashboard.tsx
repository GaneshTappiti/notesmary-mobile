
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = "Tappiti"; // Would come from user profile in a real app
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions = [
    {
      title: 'Upload Notes',
      primaryBadge: true,
      description: 'Share your study materials',
      action: 'Upload',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 12L12 8M12 8L8 12M12 8V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      onClick: () => navigate('/upload-notes')
    },
    {
      title: 'Find Notes',
      description: 'Discover study resources',
      action: 'Search',
      icon: <Search className="w-6 h-6" />,
      onClick: () => navigate('/find-notes')
    },
    {
      title: 'Join Study Room',
      description: 'Study with peers in real-time',
      action: 'Join',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 19.128C15.853 19.3757 16.7368 19.5 17.6361 19.5C19.0609 19.5 20.4177 19.0803 21.5993 18.3205C21.8815 18.1392 22 17.8101 22 17.4559V6.5C22 6.22386 21.7761 6 21.5 6C21.3674 6 21.2402 6.05271 21.1465 6.14645L19.75 7.54289M15 19.128V6.5C15 6.22386 14.7761 6 14.5 6C14.3674 6 14.2402 6.05271 14.1465 6.14645L12.75 7.54289M15 19.128C13.7568 19.5566 12.4118 19.7929 11.0236 19.7929C9.63539 19.7929 8.29044 19.5566 7.04718 19.128M12.75 7.54289L11.3535 6.14645C11.2598 6.05271 11.1326 6 11 6C10.8674 6 10.7402 6.05271 10.6465 6.14645L9.25 7.54289M12.75 7.54289V18M9.25 7.54289L7.85355 6.14645C7.75979 6.05271 7.63261 6 7.5 6C7.22386 6 7 6.22386 7 6.5V18M9.25 7.54289V18M7 18C4.79086 18 3 16.2091 3 14V10C3 7.79086 4.79086 6 7 6M7 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      onClick: () => navigate('/study-rooms')
    },
    {
      title: 'Ask AI',
      description: 'Get instant help with questions',
      action: 'Ask Now',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9H9.01M15 9H15.01M9.5 15C9.82588 15.3326 10.7091 16 12 16C13.2909 16 14.1741 15.3326 14.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      onClick: () => navigate('/ai-answers')
    },
    {
      title: 'Focus Mode',
      description: 'Eliminate distractions',
      action: 'Start Focus',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6V12L16 14M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      onClick: () => {} // Toggle focus mode
    }
  ];

  const studyRooms = [
    {
      title: 'Physics Study Session',
      status: 'Active',
      time: '1h 30m',
      participants: 5,
      schedule: 'Today 2:00 PM',
      extras: 2
    },
    {
      title: 'Math Group',
      status: 'Scheduled',
      time: '45m',
      participants: 3,
      schedule: 'Today 4:00 PM',
      extras: 1
    },
    {
      title: 'Biology Discussion',
      status: 'Scheduled',
      time: '2h',
      participants: 7,
      schedule: 'Today 6:30 PM',
      extras: 4
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Greeting section */}
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            Hello, {userName} <span className="text-2xl">👋</span>
          </h1>
          <p className="text-muted-foreground mt-1">Here's your dashboard for today</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                    {action.icon}
                  </div>
                  {action.primaryBadge && (
                    <Badge variant="default" className="bg-blue-600">
                      Primary
                    </Badge>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
              <Button 
                onClick={action.onClick}
                className="w-full mt-4"
                variant={action.primaryBadge ? "default" : "outline"}
              >
                {action.action}
              </Button>
            </Card>
          ))}
        </div>

        {/* Recent Study Rooms Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 rounded-lg dark:bg-purple-900/20">
                <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C23 16.7909 21.2091 15 19 15H18M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM19 7C19 9.20914 17.2091 11 15 11C14.2316 11 13.5308 10.7748 12.9355 10.3831" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-lg font-semibold">Recent Study Rooms</h2>
            </div>
            <Button variant="link" className="text-blue-600" onClick={() => navigate('/study-rooms')}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyRooms.map((room, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium">{room.title}</h3>
                  <Badge variant={room.status === 'Active' ? 'default' : 'outline'}>
                    {room.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V12L16 14M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {room.time}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C23 16.7909 21.2091 15 19 15H18M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM19 7C19 9.20914 17.2091 11 15 11C14.2316 11 13.5308 10.7748 12.9355 10.3831" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {room.participants} participants
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{room.schedule}</span>
                  <Button variant="default" className="bg-blue-600">
                    Join Again
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
