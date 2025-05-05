
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Plus, Search, ArrowRight, BookOpen, MessageCircle } from 'lucide-react';
import { CreateRoomModal } from '@/components/CreateRoomModal';
import { useToast } from '@/hooks/use-toast';

const StudyPulse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    navigate(`/study-pulse/${roomId}`);
    toast({
      title: "Room Joined",
      description: "You've successfully joined the study room."
    });
  };
  
  const handleJoinChat = (roomId: string) => {
    navigate(`/study-pulse/${roomId}`);
    toast({
      title: "Chat Opened",
      description: "You're now connected to the room chat."
    });
  };
  
  const handleCreateRoom = (roomData: any) => {
    // In a real app, this would make an API call to create a room
    toast({
      title: "Room Created",
      description: `Your study room "${roomData.name}" has been created successfully.`
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
          <h1 className="text-2xl font-bold mb-1">Study Pulse</h1>
          <p className="text-muted-foreground">Discover and join collaborative study spaces</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 active:scale-95"
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
            className="pl-10 border-gray-200 focus:border-indigo-500"
          />
        </div>
      </div>
      
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRooms.map(room => (
            <Card 
              key={room.id} 
              className="overflow-hidden hover:border-indigo-400 hover:shadow-md transition-all duration-300 border-gray-200"
            >
              <CardHeader className="pb-3 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {room.name}
                      {room.isNew && (
                        <Badge className="ml-1 bg-blue-500 text-white">New</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{room.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3 pt-4">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <BookOpen className="mr-1 h-4 w-4 text-indigo-500" />
                  <span className="font-medium">{room.subject}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative flex -space-x-2">
                      {[...Array(Math.min(3, room.memberCount))].map((_, i) => (
                        <Avatar key={i} className="border-2 border-background w-7 h-7">
                          <AvatarFallback className="text-xs bg-indigo-100 text-indigo-800">
                            {String.fromCharCode(65 + i)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {room.memberCount > 3 && (
                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-xs font-medium border-2 border-background">
                          +{room.memberCount - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      {room.memberCount} members
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className={`text-xs ${room.onlineCount > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      <span className={`mr-1.5 inline-block w-1.5 h-1.5 rounded-full ${room.onlineCount > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {room.onlineCount > 0 ? `${room.onlineCount} online` : 'No one online'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  Active {room.lastActivity}
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all duration-200 active:scale-95"
                    onClick={() => handleJoinChat(room.id)}
                  >
                    <MessageCircle size={14} className="mr-1" />
                    Chat
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-indigo-600 hover:bg-indigo-700 gap-1 transition-all duration-200 active:scale-95" 
                    onClick={() => enterRoom(room.id)}
                  >
                    Enter 
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/40 rounded-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-2">No study rooms yet</h3>
          <p className="text-muted-foreground mb-4">Create a room to start collaborating</p>
          <Button 
            onClick={() => setShowCreateModal(true)} 
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 active:scale-95"
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
        onCreate={handleCreateRoom}
      />
    </div>
  );
};

export default StudyPulse;
