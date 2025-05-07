
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudyPulseCard } from '@/components/study-pulse/StudyPulseCard';
import { CreatePulseModal } from '@/components/study-pulse/CreatePulseModal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Users } from 'lucide-react';

const StudyPulse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTag, setActiveTag] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data for study rooms
  const studyRooms = [
    { 
      id: '1', 
      title: 'Advanced Physics Study Group', 
      description: 'Collaborative study space for Advanced Physics concepts and problem-solving.',
      host: 'Pooja Sharma',
      type: 'public' as const,
      tags: ['#Physics', '#Advanced'],
      usersOnline: 5,
      createdAt: new Date(Date.now() - 10 * 60000).toISOString(), // 10 minutes ago
    },
    { 
      id: '2', 
      title: 'Data Structures & Algorithms', 
      description: 'Practice problems and concepts for DS&A interviews.',
      host: 'Ganesh Tappiti',
      type: 'public' as const,
      tags: ['#DSA', '#Algorithms'],
      usersOnline: 8,
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    },
    { 
      id: '3', 
      title: 'Organic Chemistry', 
      description: 'Study group for Organic Chemistry final exam preparations.',
      host: 'Ajay Patel',
      type: 'private' as const,
      tags: ['#Chemistry', '#Organic'],
      usersOnline: 3,
      createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
    }
  ];
  
  const tagFilters = ['all', '#DSA', '#Math', '#AI', '#Physics', '#Chemistry'];
  
  const filteredRooms = studyRooms.filter(room => {
    // Filter by search query
    const matchesSearch = 
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.host.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tag
    const matchesTag = activeTag === 'all' || room.tags.some(tag => tag === activeTag);
    
    return matchesSearch && matchesTag;
  });
  
  const handleJoinRoom = (roomId: string) => {
    navigate(`/study-pulse/${roomId}`);
    toast({
      title: "Room Joined",
      description: "You've successfully joined the study room."
    });
  };
  
  const handleCreateRoom = (roomData: any) => {
    // In a real app, this would make an API call to create a room
    console.log("Creating room with data:", roomData);
    toast({
      title: "Room Created",
      description: `Your study room "${roomData.title}" has been created successfully.`
    });
    setShowCreateModal(false);
    // Simulate navigation to the new room after creation
    setTimeout(() => {
      navigate(`/study-pulse/new-room-id`);
    }, 500);
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">StudyPulse</h1>
          <p className="text-muted-foreground">Discover and join topic-based study rooms</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="gap-2 bg-purple-600 hover:bg-purple-700 transition-all duration-200"
          >
            <Plus size={16} />
            Create StudyPulse Room
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search study rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 focus:border-purple-500"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {tagFilters.map(tag => (
          <Badge 
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`cursor-pointer px-3 py-1 ${
              activeTag === tag 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {tag === 'all' ? 'All' : tag}
          </Badge>
        ))}
      </div>
      
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
              onJoin={() => handleJoinRoom(room.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/40 rounded-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-2">No study rooms found</h3>
          <p className="text-muted-foreground mb-4">Create a room to start collaborating</p>
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <Plus size={16} />
            Create StudyPulse Room
          </Button>
        </div>
      )}
      
      {/* Create Room Modal */}
      <CreatePulseModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateRoom}
      />
    </div>
  );
};

export default StudyPulse;
