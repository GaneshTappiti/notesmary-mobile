
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, MessageCircle, Users, Info, Settings, ArrowRight, FileText, Pin } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';

// Mock data for study room
const mockRoom = {
  id: '1',
  name: 'Advanced Physics Study Group',
  description: 'Collaborative study space for Advanced Physics concepts and problem-solving. We focus on quantum mechanics, relativity, and advanced mathematical methods in physics.',
  subject: 'Physics',
  members: [
    { id: '1', name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=6366F1&color=fff', role: 'admin', status: 'online' },
    { id: '2', name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=22C55E&color=fff', role: 'member', status: 'online' },
    { id: '3', name: 'Alex Johnson', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=F43F5E&color=fff', role: 'member', status: 'offline' },
    { id: '4', name: 'Maria Garcia', avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=8B5CF6&color=fff', role: 'member', status: 'online' },
    { id: '5', name: 'Sam Lee', avatar: 'https://ui-avatars.com/api/?name=Sam+Lee&background=EC4899&color=fff', role: 'member', status: 'offline' }
  ],
  sessions: [
    { id: '1', date: '2025-05-04', startTime: '18:00', endTime: '20:00', topic: 'Quantum Mechanics: Wave Functions', status: 'upcoming' },
    { id: '2', date: '2025-05-07', startTime: '17:30', endTime: '19:30', topic: 'Special Relativity Principles', status: 'upcoming' },
    { id: '3', date: '2025-04-30', startTime: '18:00', endTime: '20:00', topic: 'Electromagnetic Wave Equations', status: 'completed' }
  ],
  resources: [
    { id: '1', name: 'Physics Textbook Chapter 7-9', type: 'pdf', uploadedBy: 'Jane Smith', date: '2025-04-25' },
    { id: '2', name: 'Wave Functions Practice Problems', type: 'pdf', uploadedBy: 'John Doe', date: '2025-04-28' },
    { id: '3', name: 'Quantum Mechanics Summary Notes', type: 'doc', uploadedBy: 'Alex Johnson', date: '2025-04-29' }
  ],
  lastActivity: new Date(2025, 4, 2, 14, 35)
};

const StudyRoomInfo = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, you'd fetch the room data based on roomId
  const room = mockRoom; 
  
  const handleJoinChat = () => {
    navigate(`/study-room/${roomId}/chat`);
  };
  
  const handleLeaveRoom = () => {
    toast({
      title: "Left study room",
      description: "You've successfully left the study room",
    });
    navigate('/study-rooms');
  };
  
  const handleEnterRoom = () => {
    navigate(`/study-room/${roomId}`);
  };
  
  if (!room) {
    return <div>Loading study room...</div>;
  }
  
  return (
    <>
      <Helmet>
        <title>{`${room.name} Info | Notex`}</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/study-rooms')} 
            className="mb-4 hover:bg-gray-100"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Study Rooms
          </Button>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{room.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">{room.subject}</Badge>
                <span className="text-muted-foreground text-sm">
                  {room.members.length} members • Last activity {new Date(room.lastActivity).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleJoinChat} 
                variant="outline"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Join Chat
              </Button>
              <Button onClick={handleEnterRoom} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                <ArrowRight className="h-4 w-4" />
                Enter Room
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/60 p-1">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm">
              <Info className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="members" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm">
              <Users className="h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-2">
            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">About this study room</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{room.description}</p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quick Stats */}
                  <div className="flex flex-col gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
                      <h3 className="font-medium text-blue-800 dark:text-blue-200 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Members
                      </h3>
                      <div className="mt-2 flex -space-x-2">
                        {room.members.slice(0, 5).map(member => (
                          <Avatar key={member.id} className="border-2 border-white dark:border-gray-800 w-8 h-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {room.members.length > 5 && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-xs font-medium border-2 border-white dark:border-gray-800">
                            +{room.members.length - 5}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                        {room.members.filter(m => m.status === 'online').length} online now
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-lg p-4">
                      <h3 className="font-medium text-purple-800 dark:text-purple-200 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Resources
                      </h3>
                      <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">
                        {room.resources.length} shared resources
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 border-purple-200 text-purple-700 hover:bg-purple-50">
                        Browse All Resources
                      </Button>
                    </div>
                  </div>
                  
                  {/* Upcoming sessions preview */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-lg p-4">
                    <h3 className="font-medium text-indigo-800 dark:text-indigo-200 flex items-center gap-2 mb-3">
                      <Pin className="h-4 w-4" />
                      Next Session
                    </h3>
                    
                    {room.sessions.filter(s => s.status === 'upcoming').length > 0 ? (
                      <div className="space-y-1">
                        <h4 className="font-medium">{room.sessions.find(s => s.status === 'upcoming')?.topic}</h4>
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">
                          {new Date(room.sessions.find(s => s.status === 'upcoming')?.date || '').toLocaleDateString()} • {room.sessions.find(s => s.status === 'upcoming')?.startTime} - {room.sessions.find(s => s.status === 'upcoming')?.endTime}
                        </p>
                        <div className="mt-4">
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Join Session</Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                    )}
                    
                    <div className="mt-4 pt-3 border-t border-indigo-100 dark:border-indigo-800/30">
                      <Button variant="ghost" size="sm" className="text-indigo-700 hover:bg-indigo-100/60">
                        View Full Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Study Sessions</CardTitle>
                <CardDescription>Scheduled study sessions for this group</CardDescription>
              </CardHeader>
              <CardContent>
                {room.sessions.filter(s => s.status === 'upcoming').length > 0 ? (
                  <div className="space-y-4">
                    {room.sessions.filter(s => s.status === 'upcoming').map(session => (
                      <div key={session.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{session.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(session.date).toLocaleDateString()} • {session.startTime} - {session.endTime}
                          </p>
                        </div>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Join</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  Schedule New Session
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="members" className="mt-2">
            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Members ({room.members.length})</CardTitle>
                    <CardDescription>People in this study room</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    Invite People
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {room.members.map(member => (
                    <div key={member.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          {member.status === 'online' && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-1 ring-white dark:ring-gray-800" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant={member.role === 'admin' ? "default" : "outline"} className="text-xs py-0 h-5">
                              {member.role === 'admin' ? 'Admin' : 'Member'}
                            </Badge>
                            <span className={`text-xs flex items-center ${member.status === 'online' ? 'text-green-600' : 'text-gray-400'}`}>
                              {member.status === 'online' ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-indigo-700 hover:bg-indigo-50">
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-2">
            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Study Resources</CardTitle>
                    <CardDescription>Shared materials for this study room</CardDescription>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Upload Resource</Button>
                </div>
              </CardHeader>
              <CardContent>
                {room.resources.length > 0 ? (
                  <div className="space-y-3">
                    {room.resources.map(resource => (
                      <div key={resource.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded text-blue-700 dark:text-blue-300">
                              <FileText className="h-4 w-4" />
                            </div>
                            <p className="font-medium">{resource.name}</p>
                            <Badge variant="outline" className="text-xs ml-2">{resource.type.toUpperCase()}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 ml-10">
                            Uploaded by {resource.uploadedBy} on {new Date(resource.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-indigo-700 hover:bg-indigo-50">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No resources shared yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Room Settings</CardTitle>
                <CardDescription>Manage your study room settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Room settings options will appear here for room admins.</p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button onClick={handleLeaveRoom} variant="destructive" className="w-full">
                  Leave Study Room
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default StudyRoomInfo;
