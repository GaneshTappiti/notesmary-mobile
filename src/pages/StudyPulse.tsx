
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudyPulseCard } from '@/components/study-pulse/StudyPulseCard';
import { CreatePulseModal } from '@/components/study-pulse/CreatePulseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Users, TrendingUp } from 'lucide-react';

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
      createdAt: new Date().toISOString(),
      lastMessage: 'Anyone understand the gravitational field problem?'
    },
    { 
      id: '2', 
      title: 'Data Structures & Algorithms', 
      description: 'Practice problems and concepts for DS&A interviews.',
      host: 'Ganesh Tappiti',
      type: 'public' as const,
      tags: ['#DSA', '#Algorithms'],
      usersOnline: 8,
      createdAt: new Date().toISOString(),
      lastMessage: 'Let me explain how dynamic programming works...'
    }
  ];
  
  const tagFilters = ['all', '#DSA', '#Math', '#AI', '#Physics', '#Chemistry'];
  const trendingTags = ['#ExamPrep', '#LateNightStudy', '#DSA'];
  
  const filteredRooms = studyRooms.filter(room => {
    const matchesSearch = 
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      room.description.toLowerCase().includes(searchQuery.toLowerCase());
    
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
    console.log("Creating room with data:", roomData);
    toast({
      title: "Room Created",
      description: `Your study room "${roomData.title}" has been created successfully.`
    });
    setShowCreateModal(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">StudyPulse</h1>
          <p className="text-muted-foreground">Discover and join topic-based study rooms</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)} 
          className="gap-2 bg-purple-600 hover:bg-purple-700"
        >
          <Plus size={16} />
          Start a Live StudyPulse
        </Button>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search study rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-600">Trending:</span>
          {trendingTags.map(tag => (
            <Badge 
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="cursor-pointer bg-amber-100 text-amber-800 hover:bg-amber-200"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tagFilters.map(tag => (
          <Badge 
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`cursor-pointer ${
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
              lastMessage={room.lastMessage}
              onJoin={() => handleJoinRoom(room.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No study rooms found</h3>
          <p className="text-muted-foreground mb-4">Create a room to start collaborating</p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus size={16} className="mr-2" />
            Start a Live StudyPulse
          </Button>
        </div>
      )}
      
      <CreatePulseModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateRoom}
      />
    </div>
  );
};

export default StudyPulse;
