
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PageContainer } from '@/components/PageContainer';
import { StudyPulseCard } from '@/components/study-pulse/StudyPulseCard';
import { CreatePulseModal } from '@/components/study-pulse/CreatePulseModal';
import { useToast } from '@/hooks/use-toast';

// Define the type for study rooms
interface StudyRoom {
  id: string;
  title: string;
  host: string;
  type: 'public' | 'private'; // Fixed: Using proper union type
  tags: string[];
  usersOnline: number;
  createdAt: string;
  description: string;
  duration: string;
}

// Mock data for study rooms
const mockStudyRooms: StudyRoom[] = [
  {
    id: '1',
    title: 'DSA Doubt Solving',
    host: 'Ganesh Tappiti',
    type: 'public',
    tags: ['#DSA', '#Recursion'],
    usersOnline: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    description: 'We are solving recursion problems together and clarifying doubts.',
    duration: '2 hours'
  },
  {
    id: '2',
    title: 'AI Fundamentals Discussion',
    host: 'Pooja Mehta',
    type: 'public',
    tags: ['#AI', '#MachineLearning'],
    usersOnline: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    description: 'Understanding the basics of neural networks and machine learning algorithms.',
    duration: '1 hour'
  },
  {
    id: '3',
    title: 'Math Group Study',
    host: 'Ajay Singh',
    type: 'private',
    tags: ['#Math', '#Calculus'],
    usersOnline: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    description: 'Group study session for the upcoming calculus exam.',
    duration: '2 hours'
  },
  {
    id: '4',
    title: 'Physics Problem Solving',
    host: 'Rahul Sharma',
    type: 'public',
    tags: ['#Physics', '#Mechanics'],
    usersOnline: 7,
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 mins ago
    description: 'Working through mechanics problems from last year\'s exam.',
    duration: 'Ongoing'
  },
  {
    id: '5',
    title: 'Database Systems Review',
    host: 'Neha Gupta',
    type: 'public',
    tags: ['#CSE', '#Database'],
    usersOnline: 9,
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // 20 mins ago
    description: 'Reviewing SQL queries and database design principles.',
    duration: '3 hours'
  }
];

// Get all unique tags from the mock data
const allTags = Array.from(
  new Set(mockStudyRooms.flatMap(room => room.tags.map(tag => tag.substring(1))))
);

const StudyPulse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filteredRooms, setFilteredRooms] = useState<StudyRoom[]>(mockStudyRooms);

  // Handle filtering based on active tab and search query
  useEffect(() => {
    let rooms = [...mockStudyRooms];
    
    // Filter by tab
    if (activeTab !== 'all' && activeTab !== 'popular') {
      rooms = rooms.filter(room => 
        room.tags.some(tag => tag.toLowerCase().includes(activeTab.toLowerCase()))
      );
    }

    // Filter by popularity if on popular tab
    if (activeTab === 'popular') {
      rooms.sort((a, b) => b.usersOnline - a.usersOnline);
      rooms = rooms.slice(0, 3); // Top 3 most popular
    }
    
    // Filter by search query
    if (searchQuery) {
      rooms = rooms.filter(room => 
        room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredRooms(rooms);
  }, [activeTab, searchQuery]);

  const handleCreateRoom = (roomData: any) => {
    toast({
      title: "Room Created",
      description: `Your room "${roomData.title}" has been created successfully.`
    });
    setIsModalOpen(false);
    // Simulate navigation to the new room
    setTimeout(() => {
      navigate(`/study-pulse/new-room-id`);
    }, 500);
  };

  const handleJoinRoom = (roomId: string, isPrivate: boolean) => {
    if (isPrivate) {
      toast({
        title: "Request Sent",
        description: "Your request to join has been sent to the host."
      });
    } else {
      // Navigate to the room
      navigate(`/study-pulse/${roomId}`);
    }
  };

  const handleShowFilters = () => {
    toast({
      title: "Filters",
      description: "Advanced filtering options coming soon."
    });
  };

  return (
    <>
      <Helmet>
        <title>StudyPulse | Notex</title>
      </Helmet>
      
      <PageContainer>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">StudyPulse</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={handleShowFilters}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                <span>Create Room</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="w-full sm:w-auto">
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 overflow-x-auto flex flex-nowrap sm:flex-wrap max-w-full pb-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="popular">Popular Today</TabsTrigger>
              {allTags.map(tag => (
                <TabsTrigger key={tag} value={tag}>{`#${tag}`}</TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRooms.map(room => (
                  <StudyPulseCard
                    key={room.id}
                    id={room.id}
                    title={room.title}
                    host={room.host}
                    type={room.type}
                    tags={room.tags}
                    usersOnline={room.usersOnline}
                    createdAt={room.createdAt}
                    description={room.description}
                    onJoin={() => handleJoinRoom(room.id, room.type === 'private')}
                  />
                ))}
              </div>
              
              {filteredRooms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No study rooms found. Create a new one!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="fixed bottom-6 right-6 sm:hidden">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700 p-0 shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </PageContainer>
      
      {/* Modal for creating new study rooms */}
      <CreatePulseModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateRoom}
      />
    </>
  );
};

export default StudyPulse;
