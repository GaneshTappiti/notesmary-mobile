
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Plus, Search, ArrowRight, BookOpen } from 'lucide-react';
import { CreateRoomModal } from '@/components/CreateRoomModal';

const StudyRooms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  
  // Mock data for study rooms
  const studyRooms = [
    { 
      id: '1', 
      name: 'Advanced Physics Study Group', 
      description: 'Collaborative study space for Advanced Physics concepts and problem-solving.',
      subject: 'Physics',
      memberCount: 5,
      onlineCount: 3,
      lastActivity: '10 minutes ago',
      isNew: false
    },
    { 
      id: '2', 
      name: 'Data Structures & Algorithms', 
      description: 'Practice problems and concepts for DS&A interviews.',
      subject: 'Computer Science',
      memberCount: 8,
      onlineCount: 2,
      lastActivity: '2 hours ago',
      isNew: true
    },
    { 
      id: '3', 
      name: 'Organic Chemistry', 
      description: 'Study group for Organic Chemistry final exam preparations.',
      subject: 'Chemistry',
      memberCount: 6,
      onlineCount: 0,
      lastActivity: 'Yesterday',
      isNew: false
    }
  ];
  
  const filteredRooms = studyRooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const enterRoom = (roomId: string) => {
    // Update to navigate to room info page instead of directly to the room
    navigate(`/study-room/${roomId}/info`);
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Study Rooms</h1>
          <p className="text-muted-foreground">Join or create collaborative study spaces</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="gap-2"
          >
            <Plus size={16} />
            Create New Room
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
            className="pl-10"
          />
        </div>
      </div>
      
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map(room => (
            <Card key={room.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {room.name}
                      {room.isNew && (
                        <Badge className="ml-2 bg-blue-500">New</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{room.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>{room.subject}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{room.memberCount} members</span>
                  </div>
                  <div className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                    {room.onlineCount > 0 ? `${room.onlineCount} online` : 'No one online'}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => enterRoom(room.id)}
                >
                  Enter 
                  <ArrowRight size={14} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/40 rounded-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No study rooms yet</h3>
          <p className="text-muted-foreground mb-4">Create a room to start collaborating</p>
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="gap-2"
          >
            <Plus size={16} />
            Create New Room
          </Button>
        </div>
      )}
      
      {/* Create Room Modal */}
      <CreateRoomModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </div>
  );
};

export default StudyRooms;
