
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  MessageSquare,
  FileText,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Mic,
  Pin,
  Upload,
  BrainCircuit,
  Clock,
  Calendar,
  ChevronLeft,
  Phone,
  Search,
  UserPlus,
  Settings,
  LogOut,
  X,
  Info,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Format time helper function
const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const StudyRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  
  // Mock data for the room
  const room = {
    id: roomId || '1',
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
    lastActivity: new Date(2025, 4, 2, 14, 35),
    pinnedResources: [
      { id: 1, title: 'Physics Formula Sheet', type: 'PDF', uploadedBy: 'Alex Johnson', date: '2 days ago' },
      { id: 2, title: 'Week 4 Study Plan', type: 'Document', uploadedBy: 'Sarah Chen', date: '5 days ago' },
      { id: 3, title: 'Problem Set Solutions', type: 'PDF', uploadedBy: 'Michael Brown', date: '1 week ago' },
    ]
  };
  
  // Mock chat messages
  const mockMessages = [
    {
      id: "msg1",
      senderId: "user1",
      senderName: "Alex Johnson",
      content: "Hey everyone! I just uploaded some notes on thermodynamics to the resources section.",
      timestamp: new Date(Date.now() - 86400000),
      isRead: true,
      avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random&color=fff"
    },
    {
      id: "msg2",
      senderId: "user2",
      senderName: "Jamie Smith",
      content: "Thanks Alex! Those will be super helpful for the upcoming exam.",
      timestamp: new Date(Date.now() - 36000000),
      isRead: true,
      avatar: "https://ui-avatars.com/api/?name=Jamie+Smith&background=random&color=fff"
    },
    {
      id: "msg3",
      senderId: "current-user",
      senderName: "You",
      content: "I've been struggling with the concept of entropy. Could someone help explain it?",
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
      avatar: ""
    },
    {
      id: "msg4",
      senderId: "user4",
      senderName: "Jordan Lee",
      content: "Sure! Entropy is basically a measure of disorder or randomness in a system. The second law of thermodynamics states that entropy always increases in an isolated system.",
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
      avatar: "https://ui-avatars.com/api/?name=Jordan+Lee&background=random&color=fff"
    },
    {
      id: "msg5",
      senderId: "user1",
      senderName: "Alex Johnson",
      content: "To add to what Jordan said, think of it like your room. It naturally gets messier over time unless you put in energy to clean it. That's entropy increasing!",
      timestamp: new Date(Date.now() - 1800000),
      isRead: true,
      avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random&color=fff"
    }
  ];

  useEffect(() => {
    // Initialize messages with mock data
    setMessages(mockMessages);
  }, []);
  
  // Send message function
  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: `msg${Date.now()}`,
      senderId: "current-user",
      senderName: "You",
      content: message,
      timestamp: new Date(),
      isRead: false,
      avatar: ""
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate response after a delay
    setTimeout(() => {
      const randomMember = room.members.filter(m => m.status === 'online')[Math.floor(Math.random() * room.members.filter(m => m.status === 'online').length)];
      const responseMessage = {
        id: `msg${Date.now() + 1}`,
        senderId: randomMember.id,
        senderName: randomMember.name,
        content: "That's a great point! Let me add that to my notes.",
        timestamp: new Date(),
        isRead: true,
        avatar: randomMember.avatar
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 5000);
  };

  // Go back to room list
  const goToStudyRooms = () => {
    navigate('/study-rooms');
  };
  
  // Leave room functionality
  const handleLeaveRoom = () => {
    toast({
      title: "Left Study Room",
      description: `You have left the "${room.name}" study room.`
    });
    navigate('/study-rooms');
  };

  // Join chat functionality
  const handleJoinChat = () => {
    setActiveTab('chat');
  };

  // Get initials for avatar placeholder
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Handle video call
  const handleVideoCall = () => {
    toast({
      title: "Video call",
      description: "This feature is coming soon."
    });
  };

  // Handle voice call
  const handleVoiceCall = () => {
    toast({
      title: "Voice call",
      description: "This feature is coming soon."
    });
  };

  // Check if is current user's message
  const isCurrentUserMessage = (senderId: string) => {
    return senderId === 'current-user';
  };

  // Handle creating a new room
  const handleCreateRoom = () => {
    navigate('/study-rooms/create');
  };
  
  // Handle joining another room
  const handleJoinRoom = (id: string) => {
    navigate(`/study-room/${id}`);
  };
  
  // Handle downloading a resource
  const handleDownloadResource = (resourceId: string) => {
    toast({
      title: "Download started",
      description: "Your resource is being downloaded."
    });
  };
  
  // Handle viewing a resource
  const handleViewResource = (resourceId: string) => {
    toast({
      title: "Opening resource",
      description: "Resource viewer opening..."
    });
  };

  // Handle uploading a resource
  const handleUploadResource = () => {
    toast({
      title: "Upload Resource",
      description: "This feature is coming soon."
    });
  };

  // Handle joining a session
  const handleJoinSession = () => {
    toast({
      title: "Join Session",
      description: "Session joining feature is coming soon."
    });
  };

  // Handle search in room
  const handleSearchInRoom = () => {
    toast({
      title: "Search",
      description: "Search functionality is coming soon."
    });
  };

  // Handle room settings
  const handleRoomSettings = () => {
    toast({
      title: "Room Settings",
      description: "Settings panel is coming soon."
    });
  };

  // Handle invite members
  const handleInviteMembers = () => {
    toast({
      title: "Invite Members",
      description: "Member invitation feature is coming soon."
    });
  };

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      {/* Left Sidebar - Room List (normally would be separate component) */}
      <div className="hidden md:flex flex-col w-64 border-r bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Button 
            variant="ghost" 
            onClick={goToStudyRooms} 
            className="flex items-center gap-2 w-full justify-start"
          >
            <ChevronLeft size={16} />
            <span>All Study Rooms</span>
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">YOUR STUDY ROOMS</h3>
            <div className="space-y-1">
              {['Advanced Physics', 'Data Structures', 'Organic Chemistry'].map((roomName, i) => (
                <div 
                  key={i} 
                  className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${i === 0 ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  onClick={() => handleJoinRoom(`room-${i + 1}`)}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="truncate">{roomName}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button className="w-full gap-1" size="sm" onClick={handleCreateRoom}>
                <Plus size={14} /> Create Room
              </Button>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="truncate">
              <p className="text-sm font-medium">Your Account</p>
              <p className="text-xs text-muted-foreground">student@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        {/* Room Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={goToStudyRooms}
            >
              <ChevronLeft size={18} />
            </Button>
            <div>
              <h1 className="font-semibold text-lg flex items-center gap-2">
                {room.name}
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/30">Live</Badge>
              </h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 bg-green-500 rounded-full"></span>
                  {room.members.filter(m => m.status === 'online').length} online
                </span>
                <span>•</span>
                <span>{room.subject}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-muted-foreground hidden sm:flex"
              onClick={handleVoiceCall}
            >
              <Phone size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-muted-foreground hidden sm:flex"
              onClick={handleVideoCall}
            >
              <Video size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() => setShowRightSidebar(!showRightSidebar)}
            >
              {showRightSidebar ? <Info size={18} /> : <Users size={18} />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MoreVertical size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Room Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSearchInRoom}>
                  <Search size={14} className="mr-2" />
                  <span>Search in Room</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRoomSettings}>
                  <Settings size={14} className="mr-2" />
                  <span>Room Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleInviteMembers}>
                  <UserPlus size={14} className="mr-2" />
                  <span>Invite Members</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={handleLeaveRoom}
                >
                  <X size={14} className="mr-2" />
                  <span>Leave Room</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="bg-white dark:bg-gray-800 px-4 border-b border-gray-200 dark:border-gray-700">
              <TabsList>
                <TabsTrigger value="chat" className="flex items-center gap-1.5">
                  <MessageSquare size={14} />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-1.5">
                  <FileText size={14} />
                  <span>Notes</span>
                </TabsTrigger>
                <TabsTrigger value="meet" className="flex items-center gap-1.5">
                  <Video size={14} />
                  <span>Meet</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-1.5">
                  <Pin size={14} />
                  <span>Resources</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Chat Tab Content */}
            <TabsContent value="chat" className="flex-1 overflow-hidden p-0 h-full flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => {
                    const isCurrentUser = isCurrentUserMessage(msg.senderId);
                    const senderInitials = msg.senderName
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('');
                    
                    return (
                      <div 
                        key={msg.id}
                        className={`flex gap-2 ${isCurrentUser ? 'justify-end' : ''}`}
                      >
                        {!isCurrentUser && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={msg.avatar} />
                            <AvatarFallback className="text-xs">{senderInitials}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-[80%] ${isCurrentUser ? 'order-1' : 'order-2'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            {!isCurrentUser && <span className="font-medium text-xs">{msg.senderName}</span>}
                            {isCurrentUser && <span className="font-medium text-xs text-indigo-600">{msg.senderName}</span>}
                            <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                          </div>
                          <div 
                            className={`rounded-lg px-3 py-2 ${isCurrentUser 
                              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100' 
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
                          >
                            <p className="break-words text-sm">{msg.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing indicator */}
                  {isTyping && typingUser && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 ml-12">
                      <div className="flex gap-1">
                        <span className="animate-bounce">•</span>
                        <span className="animate-bounce delay-75">•</span>
                        <span className="animate-bounce delay-150">•</span>
                      </div>
                      <span>{typingUser} is typing...</span>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message input area */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2 items-end">
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="min-h-[60px] resize-none"
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={!message.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2 justify-between">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paperclip size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Smile size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notes Tab Content */}
            <TabsContent value="notes" className="flex-1 overflow-hidden p-4 h-full">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md h-full p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Shared Notes</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Save</Button>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Share</Button>
                  </div>
                </div>
                <Textarea 
                  className="min-h-[calc(100%-60px)] resize-none"
                  placeholder="Start typing your shared notes here..."
                  defaultValue="# Quantum Mechanics Session Notes

## Topics Covered
- Wave functions
- Schrödinger equation
- Probability distributions

## Key Formulas
- E = hf
- λ = h/p

## Questions & Answers
1. Q: How do we calculate the probability of finding a particle?
   A: Square the absolute value of the wave function."
                />
              </div>
            </TabsContent>

            {/* Meet Tab Content */}
            <TabsContent value="meet" className="flex-1 overflow-hidden p-0 h-full">
              <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 p-4">
                <Card className="w-full max-w-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Video Meeting</span>
                      <Badge variant="outline">Coming Soon</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-12 space-y-6">
                    <div className="rounded-full bg-gray-200 dark:bg-gray-700 p-6">
                      <Video className="h-12 w-12 text-gray-500" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Start a video meeting</h3>
                      <p className="text-muted-foreground mb-6">Connect face-to-face with your study group</p>
                      <div className="flex gap-3 justify-center">
                        <Button variant="outline">Schedule for Later</Button>
                        <Button onClick={handleVideoCall} className="bg-indigo-600 hover:bg-indigo-700">
                          Start Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Resources Tab Content */}
            <TabsContent value="resources" className="flex-1 overflow-auto p-4 h-full">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Study Resources</CardTitle>
                    <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleUploadResource}>Upload Resource</Button>
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
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                              onClick={() => handleViewResource(resource.id)}
                            >
                              View
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-indigo-700 hover:bg-indigo-50"
                              onClick={() => handleDownloadResource(resource.id)}
                            >
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
          </Tabs>
        </div>
      </div>

      {/* Right Sidebar - Room Info */}
      {showRightSidebar && (
        <div className="hidden lg:block w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden h-full">
          <ScrollArea className="h-full">
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">About this room</h3>
              <p className="text-sm text-muted-foreground mb-6">{room.description}</p>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Physics', 'Quantum', 'Study Group'].map((tag, i) => (
                    <Badge key={i} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <h4 className="text-sm font-medium mb-2">Members ({room.members.length})</h4>
                <div className="space-y-2">
                  {room.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {member.status === 'online' && (
                            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-1 ring-white dark:ring-gray-800" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <Badge variant={member.role === 'admin' ? "default" : "outline"} className="text-xs py-0 h-5">
                            {member.role === 'admin' ? 'Admin' : 'Member'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <h4 className="text-sm font-medium mb-2">Upcoming Session</h4>
                {room.sessions.filter(s => s.status === 'upcoming').length > 0 ? (
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-lg p-3">
                    <h5 className="font-medium text-sm">{room.sessions[0].topic}</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(room.sessions[0].date).toLocaleDateString()} • {room.sessions[0].startTime} - {room.sessions[0].endTime}
                    </p>
                    <Button size="sm" className="mt-3 bg-indigo-600 hover:bg-indigo-700 w-full" onClick={handleJoinSession}>
                      Join Session
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No upcoming sessions</p>
                )}
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
                  onClick={handleLeaveRoom}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Leave Room
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default StudyRoom;
