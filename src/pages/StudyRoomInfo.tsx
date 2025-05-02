
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, MessageCircle, Users, Info, Settings, ArrowRight } from 'lucide-react';
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
          <Button variant="ghost" size="sm" onClick={() => navigate('/study-rooms')} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Study Rooms
          </Button>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{room.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">{room.subject}</Badge>
                <span className="text-muted-foreground text-sm">
                  {room.members.length} members • Last activity {new Date(room.lastActivity).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleJoinChat} className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Join Chat
              </Button>
              <Button variant="outline" onClick={handleEnterRoom} className="gap-2">
                <ArrowRight className="h-4 w-4" />
                Enter Room
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="gap-2">
              <Info className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="members" className="gap-2">
              <Users className="h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About this study room</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{room.description}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Study Sessions</CardTitle>
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
                        <Button size="sm">Join</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Schedule New Session</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Study Resources</CardTitle>
                <CardDescription>Shared materials for this study room</CardDescription>
              </CardHeader>
              <CardContent>
                {room.resources.length > 0 ? (
                  <div className="space-y-3">
                    {room.resources.map(resource => (
                      <div key={resource.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded by {resource.uploadedBy} on {new Date(resource.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No resources shared yet</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Share Resource</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Members ({room.members.length})</CardTitle>
                <CardDescription>People in this study room</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {room.members.map(member => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {member.role === 'admin' ? 'Admin' : 'Member'}
                            </Badge>
                            <span className={`text-xs flex items-center ${member.status === 'online' ? 'text-green-600' : 'text-gray-400'}`}>
                              <span className={`w-2 h-2 rounded-full mr-1 ${member.status === 'online' ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                              {member.status === 'online' ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Message</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Invite Members</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Room Settings</CardTitle>
                <CardDescription>Manage your study room settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Room settings options will appear here for room admins.</p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button onClick={handleLeaveRoom} variant="destructive" className="w-full">Leave Study Room</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default StudyRoomInfo;
