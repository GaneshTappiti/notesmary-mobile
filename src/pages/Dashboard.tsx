
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Search,
  BrainCircuit,
  Users,
  Bell,
  Bookmark,
  GraduationCap,
  X,
  ArrowRight,
  MessageSquare,
  Plus
} from 'lucide-react';
import { CreateRoomModal } from '@/components/CreateRoomModal';
import { BrowseRoomsModal } from '@/components/BrowseRoomsModal';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { CalendarCard } from '@/components/dashboard/CalendarCard';
import { StudyProgressCard } from '@/components/dashboard/StudyProgressCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard = () => {
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [browseRoomsModalOpen, setBrowseRoomsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const userName = "Student"; // Would come from user profile in a real app

  // Stats cards data
  const statsCards = [
    { 
      title: 'Notes Uploaded', 
      value: '12', 
      icon: <Upload className="h-5 w-5 text-blue-500" />,
      trend: { value: '10%', isPositive: true }
    },
    { 
      title: 'Notes Saved', 
      value: '45', 
      icon: <Bookmark className="h-5 w-5 text-yellow-500" />,
      trend: { value: '5%', isPositive: true }
    },
    { 
      title: 'AI Answers', 
      value: '28', 
      icon: <BrainCircuit className="h-5 w-5 text-purple-500" />,
      trend: { value: '8%', isPositive: true }
    },
    { 
      title: 'Study Groups', 
      value: '4', 
      icon: <Users className="h-5 w-5 text-green-500" />,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 max-w-7xl mx-auto space-y-6">
        {/* Search bar */}
        <div className="md:hidden relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border-gray-200 rounded-lg"
          />
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
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
            {/* Study Analytics Chart */}
            <AnalyticsCard 
              title="Study Analytics" 
              chartType="line"
            />
            
            {/* Weekly Activity Chart */}
            <AnalyticsCard 
              title="Weekly Activity" 
              chartType="bar"
              filters={["This Week", "Last Week", "Month"]}
            />
          </div>
          
          {/* Side Content - Takes up 1 column */}
          <div className="space-y-5">
            {/* Calendar Card */}
            <CalendarCard />
            
            {/* Study Progress Card */}
            <StudyProgressCard 
              title="Study Progress" 
              items={studyProgressItems}
            />
          </div>
        </div>
        
        {/* Study Rooms Section */}
        <Card className="border-none shadow-sm overflow-hidden bg-white">
          <div className="px-6 py-5 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users size={18} className="text-blue-600" />
              Study Rooms
            </h2>
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => setCreateRoomModalOpen(true)} 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 gap-1 h-9 text-white"
              >
                <Plus size={16} />
                Create Room
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setBrowseRoomsModalOpen(true)} 
                className="gap-1 h-9"
              >
                <Search size={16} />
                Browse
              </Button>
            </div>
          </div>
          
          <CardContent className="px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyRooms.map((room) => (
                <Card 
                  key={room.id} 
                  className="border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer bg-white"
                  onClick={() => navigate(`/study-room/${room.id}`)}
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
                        className="gap-1 text-gray-600"
                      >
                        <MessageSquare size={14} />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* "View All" card */}
              <Card 
                className="border border-dashed border-gray-200 bg-transparent hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-center"
                onClick={() => navigate('/study-rooms')}
              >
                <CardContent className="p-4 text-center flex flex-col items-center">
                  <ArrowRight size={24} className="text-blue-500 mb-2" />
                  <p className="text-sm font-medium text-blue-600">View All Rooms</p>
                </CardContent>
              </Card>
            </div>
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
