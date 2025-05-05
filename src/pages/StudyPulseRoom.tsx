
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageContainer } from '@/components/PageContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Users, MessageCircle, FileText, Video, Mic, MicOff, VideoOff, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for the rooms
const findRoom = (id: string) => {
  const mockRooms = [
    {
      id: '1',
      title: 'DSA Doubt Solving',
      host: 'Ganesh Tappiti',
      type: 'public',
      tags: ['#DSA', '#Recursion'],
      usersOnline: 12,
      description: 'We are solving recursion problems together and clarifying doubts.',
      duration: '2 hours',
      participants: [
        { id: '1', name: 'Ganesh Tappiti', avatar: 'https://ui-avatars.com/api/?name=Ganesh&background=random&color=fff', isHost: true, hasVideo: true, hasMic: true },
        { id: '2', name: 'Pooja Mehta', avatar: 'https://ui-avatars.com/api/?name=Pooja&background=random&color=fff', isHost: false, hasVideo: false, hasMic: true },
        { id: '3', name: 'Ajay Singh', avatar: 'https://ui-avatars.com/api/?name=Ajay&background=random&color=fff', isHost: false, hasVideo: true, hasMic: false }
      ],
      messages: [
        { id: '1', sender: 'Ganesh Tappiti', text: 'Welcome everyone to our recursion session!', time: '10:30 AM' },
        { id: '2', sender: 'Pooja Mehta', text: 'I\'m having trouble with the base case in this problem.', time: '10:32 AM' },
        { id: '3', sender: 'Ajay Singh', text: 'Let me share my approach...', time: '10:33 AM' },
      ],
      notes: "# Recursion Session Notes\n\n## Topics Covered\n- Base cases\n- Recursive step\n- Call stack visualization\n\n## Example Problems\n1. Factorial\n2. Fibonacci\n3. Tower of Hanoi"
    }
  ];
  
  return mockRooms.find(room => room.id === id);
};

const StudyPulseRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const room = findRoom(roomId || '');
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [meetJoined, setMeetJoined] = useState(false);
  
  if (!room) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-xl font-medium mb-4">Room not found</h1>
          <Button onClick={() => navigate('/study-pulse')}>
            Go Back to StudyPulse
          </Button>
        </div>
      </PageContainer>
    );
  }
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the room."
    });
    
    setMessage('');
  };
  
  const handleJoinMeet = () => {
    setMeetJoined(true);
    toast({
      title: "Meet Joined",
      description: "You have joined the video meeting."
    });
  };
  
  const handleLeaveMeet = () => {
    setMeetJoined(false);
    toast({
      title: "Meet Left",
      description: "You have left the video meeting."
    });
  };
  
  const handleLeaveRoom = () => {
    toast({
      title: "Left Room",
      description: "You have left the study room."
    });
    navigate('/study-pulse');
  };
  
  const handleAddParticipants = () => {
    toast({
      title: "Invite Participants",
      description: "Invitation feature coming soon."
    });
  };
  
  return (
    <>
      <Helmet>
        <title>{room.title} | StudyPulse</title>
      </Helmet>
      
      <PageContainer>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/study-pulse')}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              
              <Badge className="bg-purple-600">StudyPulse</Badge>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddParticipants}
              className="gap-1"
            >
              <Plus size={14} />
              Invite
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{room.title}</h1>
              <p className="text-gray-500">Hosted by {room.host} • {room.duration}</p>
            </div>
            
            <div className="flex gap-2 items-center">
              <div className="flex -space-x-2 mr-2">
                {room.participants.slice(0, 3).map((participant) => (
                  <Avatar key={participant.id} className="border-2 border-white">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {room.participants.length > 3 && (
                  <div className="bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                    +{room.participants.length - 3}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-500">
                <Users className="h-4 w-4 inline mr-1" />
                {room.usersOnline} online
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {room.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div>
            <p className="text-gray-600">{room.description}</p>
          </div>
          
          {!meetJoined ? (
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                <Video className="h-12 w-12 text-purple-500" />
                <h3 className="text-lg font-medium">Join the video meeting</h3>
                <p className="text-gray-500 text-center">Connect with others in this study room via video</p>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 transition-transform active:scale-95"
                  onClick={handleJoinMeet}
                >
                  Join Video Meeting
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="bg-gray-900 rounded-lg h-72 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Video className="h-12 w-12 mx-auto mb-2" />
                    <p>Video meeting active</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 text-white border-white hover:bg-gray-800 transition-transform active:scale-95"
                      onClick={handleLeaveMeet}
                    >
                      Leave Meeting
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4 gap-2">
                  <Button variant="outline" size="sm">
                    <Mic className="h-4 w-4 mr-1" />
                    Mute
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Stop Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="chat" className="flex-1 md:flex-initial">
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="participants" className="flex-1 md:flex-initial">
                <Users className="h-4 w-4 mr-1" />
                Participants
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex-1 md:flex-initial">
                <FileText className="h-4 w-4 mr-1" />
                Shared Notes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="h-64 overflow-y-auto mb-4 border rounded-md p-3 space-y-3">
                    {room.messages.map((msg) => (
                      <div key={msg.id} className="mb-3">
                        <div className="flex gap-2 items-start">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{msg.sender}</span>
                              <span className="text-xs text-gray-500">{msg.time}</span>
                            </div>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button type="submit" disabled={!message.trim()} className="transition-transform active:scale-95">Send</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="participants" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {room.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={participant.avatar} alt={participant.name} />
                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            {participant.isHost && (
                              <Badge variant="outline" className="text-xs">Host</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {participant.hasMic ? (
                            <Mic className="h-4 w-4 text-green-500" />
                          ) : (
                            <MicOff className="h-4 w-4 text-gray-400" />
                          )}
                          {participant.hasVideo ? (
                            <Video className="h-4 w-4 text-green-500" />
                          ) : (
                            <VideoOff className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="border rounded-md p-3 min-h-[300px]">
                    <div className="prose max-w-none">
                      {room.notes.split('\n').map((line, i) => (
                        <div key={i}>
                          {line.startsWith('#') ? (
                            <h1>{line.replace('#', '').trim()}</h1>
                          ) : line.startsWith('##') ? (
                            <h2>{line.replace('##', '').trim()}</h2>
                          ) : line.startsWith('-') ? (
                            <ul>
                              <li>{line.replace('-', '').trim()}</li>
                            </ul>
                          ) : line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') ? (
                            <ol>
                              <li>{line.replace(/\d\./, '').trim()}</li>
                            </ol>
                          ) : (
                            <p>{line}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    These are shared notes that everyone in the room can see.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 transition-transform active:scale-95"
              onClick={handleLeaveRoom}
            >
              Leave Room
            </Button>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default StudyPulseRoom;
