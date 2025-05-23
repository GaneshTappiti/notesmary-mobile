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
import { MobileHeader } from '@/components/mobile/MobileHeader';

const StudyRooms = () => {
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
    },
    { 
      id: '4', 
      name: 'Calculus III', 
      description: 'Study group focusing on multivariable calculus and vector analysis.',
      subject: 'Mathematics',
      memberCount: 4,
      onlineCount: 1,
      lastActivity: '3 hours ago',
      isNew: false
    }
  ];
  
  const filteredRooms = studyRooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const enterRoom = (roomId: string) => {
    navigate(`/study-room/${roomId}`);
  };
  
  const handleJoinChat = (roomId: string) => {
    // Navigate to the room with chat tab active
    navigate(`/study-room/${roomId}?tab=chat`);
  };
  
  const handleCreateRoom = (roomData: any) => {
    // In a real app, this would make an API call to create a room
    toast({
      title: "Room Created",
      description: `Your study room "${roomData.name}" has been created successfully.`
    });
    setShowCreateModal(false);
    
    // Navigate to the new room after creation with a small delay for toast visibility
    setTimeout(() => {
      navigate(`/study-room/new-room-id`);
    }, 800);
  };
  
  return (
    <div className="pb-20">
      {/* Mobile-optimized header with search functionality */}
      <MobileHeader 
        title="Study Rooms" 
        showBackButton={true}
        rightElement={
          <Button
            onClick={() => setShowCreateModal(true)}
            size="icon"
            className="h-9 w-9 rounded-full bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus size={16} />
          </Button>
        }
      />
      
      {/* Search bar optimized for mobile */}
      <div className="p-4">
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>
        
        {filteredRooms.length > 0 ? (
          <div className="space-y-4">
            {filteredRooms.map(room => (
              <Card 
                key={room.id} 
                className="overflow-hidden border-gray-200 hover:border-indigo-400 transition-all duration-300"
              >
                <CardHeader className="pb-3 bg-gray-50/50 dark:bg-gray-800/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base flex items-center gap-1">
                        {room.name}
                        {room.isNew && (
                          <Badge variant="default" className="ml-1 text-xs py-0 h-5 bg-blue-500 text-white">New</Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-xs line-clamp-2">{room.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3 pt-2">
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <BookOpen className="mr-1 h-3 w-3 text-indigo-500" />
                    <span className="font-medium">{room.subject}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative flex -space-x-2">
                        {[...Array(Math.min(3, room.memberCount))].map((_, i) => (
                          <Avatar key={i} className="border-2 border-background w-6 h-6">
                            <AvatarFallback className="text-xs bg-indigo-100 text-indigo-800">
                              {String.fromCharCode(65 + i)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {room.memberCount > 3 && (
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium border-2 border-background">
                            +{room.memberCount - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">
                        {room.memberCount} members
                      </span>
                    </div>
                    <Badge variant="outline" className={`text-xs ${room.onlineCount > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      <span className={`mr-1 inline-block w-1.5 h-1.5 rounded-full ${room.onlineCount > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {room.onlineCount > 0 ? `${room.onlineCount} online` : 'No one online'}
                    </Badge>
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
                      className="text-indigo-600 hover:bg-indigo-50 py-1 h-7 text-xs"
                      onClick={() => handleJoinChat(room.id)}
                    >
                      <MessageCircle size={14} className="mr-1" />
                      Chat
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-indigo-600 hover:bg-indigo-700 gap-1 py-1 h-7 text-xs" 
                      onClick={() => enterRoom(room.id)}
                    >
                      Enter 
                      <ArrowRight size={12} />
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
            <h3 className="text-lg font-medium mb-2">No study rooms found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or create a new room</p>
            <Button 
              onClick={() => setShowCreateModal(true)} 
              className="gap-2 bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus size={16} />
              Create New Room
            </Button>
          </div>
        )}
      </div>
      
      {/* Create Room Modal */}
      <CreateRoomModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateRoom}
      />
    </div>
  );
};

export default StudyRooms;
