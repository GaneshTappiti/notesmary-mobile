
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Video, ArrowLeft, Hand } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudyPulseRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<any>(null);
  const [handRaised, setHandRaised] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch room data
    setTimeout(() => {
      // This would be an actual API call in a real application
      if (roomId === '1') {
        setRoom({
          id: '1',
          title: 'Advanced Physics Study Group',
          description: 'Collaborative study space for Advanced Physics concepts and problem-solving.',
          host: 'Pooja Sharma',
          type: 'public',
          tags: ['#Physics', '#Advanced'],
          users: [
            { id: '1', name: 'Pooja S.', avatar: 'https://ui-avatars.com/api/?name=Pooja+S&background=random' },
            { id: '2', name: 'Rahul K.', avatar: 'https://ui-avatars.com/api/?name=Rahul+K&background=random' },
            { id: '3', name: 'Meera N.', avatar: 'https://ui-avatars.com/api/?name=Meera+N&background=random' },
            { id: '4', name: 'Avinash T.', avatar: 'https://ui-avatars.com/api/?name=Avinash+T&background=random' },
            { id: '5', name: 'Divya R.', avatar: 'https://ui-avatars.com/api/?name=Divya+R&background=random' }
          ],
          createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
        });
      } else if (roomId === '2') {
        setRoom({
          id: '2',
          title: 'Data Structures & Algorithms',
          description: 'Practice problems and concepts for DS&A interviews.',
          host: 'Ganesh Tappiti',
          type: 'public',
          tags: ['#DSA', '#Algorithms'],
          users: [
            { id: '1', name: 'Ganesh T.', avatar: 'https://ui-avatars.com/api/?name=Ganesh+T&background=random' },
            { id: '2', name: 'Priya M.', avatar: 'https://ui-avatars.com/api/?name=Priya+M&background=random' },
            { id: '3', name: 'Karthik S.', avatar: 'https://ui-avatars.com/api/?name=Karthik+S&background=random' },
            { id: '4', name: 'Lakshmi P.', avatar: 'https://ui-avatars.com/api/?name=Lakshmi+P&background=random' },
            { id: '5', name: 'Vikram J.', avatar: 'https://ui-avatars.com/api/?name=Vikram+J&background=random' },
            { id: '6', name: 'Sonal R.', avatar: 'https://ui-avatars.com/api/?name=Sonal+R&background=random' },
            { id: '7', name: 'Rajesh K.', avatar: 'https://ui-avatars.com/api/?name=Rajesh+K&background=random' },
            { id: '8', name: 'Nandini V.', avatar: 'https://ui-avatars.com/api/?name=Nandini+V&background=random' }
          ],
          createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        });
      } else if (roomId === '3') {
        setRoom({
          id: '3',
          title: 'Organic Chemistry',
          description: 'Study group for Organic Chemistry final exam preparations.',
          host: 'Ajay Patel',
          type: 'private',
          tags: ['#Chemistry', '#Organic'],
          users: [
            { id: '1', name: 'Ajay P.', avatar: 'https://ui-avatars.com/api/?name=Ajay+P&background=random' },
            { id: '2', name: 'Shreya T.', avatar: 'https://ui-avatars.com/api/?name=Shreya+T&background=random' },
            { id: '3', name: 'Nikhil M.', avatar: 'https://ui-avatars.com/api/?name=Nikhil+M&background=random' }
          ],
          createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
        });
      } else {
        // Default for new rooms or any other ID
        setRoom({
          id: roomId,
          title: 'New Study Room',
          description: 'A newly created study room.',
          host: 'Current User',
          type: 'public',
          tags: ['#Study'],
          users: [
            { id: '1', name: 'You', avatar: 'https://ui-avatars.com/api/?name=You&background=random' }
          ],
          createdAt: new Date().toISOString(),
        });
      }
      setLoading(false);
    }, 800);
  }, [roomId]);
  
  const handleStartMeet = () => {
    toast({
      title: "Starting Video Meet",
      description: "Connecting to video conference..."
    });
    // This would integrate with a video conferencing service in a real app
  };
  
  const handleLeaveRoom = () => {
    toast({
      title: "Left Room",
      description: "You've left the study room"
    });
    navigate('/study-pulse');
  };
  
  const handleRaiseHand = () => {
    setHandRaised(!handRaised);
    toast({
      title: handRaised ? "Hand Lowered" : "Hand Raised",
      description: handRaised 
        ? "Your virtual hand has been lowered" 
        : "Your question has been added to the queue"
    });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-6xl text-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading study room...</p>
      </div>
    );
  }
  
  if (!room) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-6xl text-center">
        <h2 className="text-2xl font-bold mb-2">Room Not Found</h2>
        <p className="text-gray-600 mb-6">The study room you're looking for doesn't exist or has ended.</p>
        <Button onClick={() => navigate('/study-pulse')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to StudyPulse
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Live Pulse Banner */}
      <div className="bg-purple-100 border-l-4 border-purple-600 p-3 flex items-center gap-2 mb-4 rounded-r-md">
        <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-purple-800">
          You're in a {room.type === 'public' ? 'Public' : 'Private'} Pulse Room (Live Study Session)
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/study-pulse')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{room.title}</h1>
              <Badge className={room.type === 'public' ? 'bg-green-500' : 'bg-amber-500'}>
                {room.type === 'public' ? 'Public' : 'Private'}
              </Badge>
            </div>
            <p className="text-muted-foreground">Hosted by {room.host}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            onClick={handleStartMeet}
            className="gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <Video size={16} />
            Start Meet
          </Button>
          <Button
            onClick={handleRaiseHand}
            variant={handRaised ? "default" : "outline"}
            className={handRaised ? "bg-amber-500 hover:bg-amber-600" : ""}
          >
            <Hand size={16} className="mr-1" />
            {handRaised ? "Hand Raised" : "Raise Hand"}
          </Button>
          <Button 
            onClick={handleLeaveRoom}
            variant="outline"
          >
            Leave Room
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {room.tags.map((tag: string, index: number) => (
          <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            {tag}
          </Badge>
        ))}
      </div>
      
      {/* Floating Avatar Stack */}
      <div className="fixed top-20 right-6 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="mb-1">
            <div className="flex -space-x-2">
              {room.users.slice(0, 3).map((user: any) => (
                <Avatar key={user.id} className="border-2 border-white h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {room.users.length > 3 && (
                <div className="h-8 w-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs font-medium text-purple-700">
                  +{room.users.length - 3}
                </div>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-600 font-medium">{room.users.length} online</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue="chat">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="chat" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">
                Notes
              </TabsTrigger>
              <TabsTrigger value="meet" className="flex-1">
                Video Meet
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat">
              <Card className="border-purple-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Group Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md bg-gray-50 border border-purple-100">
                    <p className="text-muted-foreground">Chat functionality will be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card className="border-purple-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Shared Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md bg-gray-50 border border-purple-100">
                    <p className="text-muted-foreground">Collaborative notes editing will be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="meet">
              <Card className="border-purple-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Video Meet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md bg-gray-50 border-2 border-purple-200 animate-pulse">
                    <Button 
                      onClick={handleStartMeet}
                      className="gap-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <Video size={20} />
                      Join Video Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Participants ({room.users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {room.users.map((user: any) => (
                  <div key={user.id} className="flex items-center gap-2.5 hover:bg-purple-50 p-2 rounded-md transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {user.name}
                      {user.name === 'You' || user.name === room.host.split(' ')[0] + ' ' + room.host.split(' ')[1][0] + '.' ? (
                        <span className="text-xs ml-2 text-purple-600 font-normal">
                          {user.name === 'You' ? 'You' : 'Host'}
                        </span>
                      ) : null}
                    </span>
                    {handRaised && user.name === 'You' && (
                      <Hand size={14} className="ml-auto text-amber-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyPulseRoom;
