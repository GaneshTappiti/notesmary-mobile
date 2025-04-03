import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Mic,
  Users,
  Phone,
  Video,
  Info,
  ChevronLeft,
  Search,
  BookOpen,
  Pin,
  BrainCircuit,
  BookMarked,
  CheckCheck,
  FileText,
  Image as ImageIcon,
  UserPlus
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const StudyRoomChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showMembers, setShowMembers] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock data
  const roomName = 'Advanced Physics Study Group';
  const onlineMembers = [
    { id: 1, name: 'Alex Johnson', avatar: '', status: 'online', isTyping: false },
    { id: 2, name: 'Sarah Chen', avatar: '', status: 'online', isTyping: true },
    { id: 3, name: 'Michael Brown', avatar: '', status: 'away', isTyping: false },
    { id: 4, name: 'Jessica Lee', avatar: '', status: 'offline', isTyping: false },
    { id: 5, name: 'David Wilson', avatar: '', status: 'online', isTyping: false },
  ];
  
  const messages = [
    { id: 1, sender: 'Alex Johnson', senderInitials: 'AJ', text: 'Hey everyone! I just uploaded the notes from today\'s lecture.', time: '10:30 AM', isSelf: false },
    { id: 2, sender: 'You', senderInitials: 'You', text: 'Thanks Alex! I\'ll check them out now.', time: '10:32 AM', isSelf: true },
    { id: 3, sender: 'Sarah Chen', senderInitials: 'SC', text: 'I found some great resources on quantum mechanics that might help with the assignment.', time: '10:35 AM', isSelf: false },
    { id: 4, sender: 'Michael Brown', senderInitials: 'MB', text: 'Could someone explain the concept of wave-particle duality again? I\'m still confused about it.', time: '10:40 AM', isSelf: false },
    { id: 5, sender: 'You', senderInitials: 'You', text: 'Sure! Wave-particle duality refers to the concept that every particle can be described as both a particle and a wave. It\'s one of the central concepts of quantum mechanics.', time: '10:42 AM', isSelf: true },
    { id: 6, sender: 'Jessica Lee', senderInitials: 'JL', text: 'I found this video that explains it really well: [link to video]', time: '10:45 AM', isSelf: false },
    { id: 7, sender: 'Sarah Chen', senderInitials: 'SC', text: 'When are we meeting next to study for the upcoming test?', time: '10:50 AM', isSelf: false },
    { id: 8, sender: 'Alex Johnson', senderInitials: 'AJ', text: 'How about tomorrow at 4pm?', time: '10:52 AM', isSelf: false },
    { id: 9, sender: 'You', senderInitials: 'You', text: 'That works for me!', time: '10:55 AM', isSelf: true },
    { id: 10, sender: 'Michael Brown', senderInitials: 'MB', text: 'I can make it too.', time: '11:00 AM', isSelf: false },
  ];
  
  const pinnedMessages = [
    { id: 1, sender: 'Alex Johnson', text: 'Next study session: Tomorrow at 4pm', time: '10:52 AM' },
    { id: 2, sender: 'Sarah Chen', text: 'Test topics: Quantum mechanics, waves, and particles', time: '10:35 AM' },
  ];
  
  const sharedFiles = [
    { id: 1, name: 'Physics_Lecture_Notes.pdf', type: 'pdf', size: '2.3 MB', sender: 'Alex Johnson', time: '10:30 AM' },
    { id: 2, name: 'Quantum_Mechanics_Diagram.png', type: 'image', size: '1.5 MB', sender: 'Sarah Chen', time: '10:35 AM' },
    { id: 3, name: 'Study_Guide.docx', type: 'doc', size: '582 KB', sender: 'Jessica Lee', time: '10:45 AM' },
  ];
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    console.log('Sending message:', message);
    setMessage('');
    // In a real application, you would send this to your backend
  };
  
  const goToRoom = () => {
    navigate(`/study-room/${id}`);
  };
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };
  
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-4 w-4 text-red-500" />;
      case 'image': return <ImageIcon className="h-4 w-4 text-blue-500" />;
      case 'doc': return <BookMarked className="h-4 w-4 text-indigo-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="h-[calc(100vh-70px)] flex overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow-sm border">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b px-4 py-2 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={goToRoom}>
                <ChevronLeft size={18} />
              </Button>
              <div>
                <h2 className="font-semibold flex items-center gap-2">
                  {roomName}
                  <Badge variant="outline" className="ml-2">Study Group</Badge>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {onlineMembers.filter(m => m.status === 'online').length} online • {onlineMembers.length} members
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setShowMembers(!showMembers)}>
                      <Users size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{showMembers ? 'Hide' : 'Show'} Members</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Phone size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Voice Call</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Video size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Video Call</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={goToRoom}>
                      <Info size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Room Info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Search size={16} className="mr-2" />
                    <span>Search in Chat</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pin size={16} className="mr-2" />
                    <span>View Pinned Messages</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserPlus size={16} className="mr-2" />
                    <span>Add Members</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BrainCircuit size={16} className="mr-2" />
                    <span>AI Chat Summary</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Leave Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="space-y-6">
            {/* AI Suggestion */}
            <Card className="mb-6 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                    <BrainCircuit className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-purple-900 dark:text-purple-300">AI Study Assistant</h3>
                    <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">I noticed you're discussing quantum mechanics. Would you like me to:</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button size="sm" variant="outline" className="bg-white dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700">
                        Generate practice questions
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700">
                        Summarize key concepts
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700">
                        Find relevant resources
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Date Separator */}
            <div className="flex items-center justify-center py-2">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded-full">Today</span>
            </div>
            
            {/* Chat Messages */}
            {messages.map(msg => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.isSelf ? 'justify-end' : ''}`}>
                {!msg.isSelf && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{msg.senderInitials}</AvatarFallback>
                  </Avatar>
                )}
                <div 
                  className={`rounded-lg p-3 max-w-[80%] ${
                    msg.isSelf 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {!msg.isSelf && (
                    <p className="text-sm font-medium mb-1">{msg.sender}</p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className={`text-xs ${msg.isSelf ? 'text-blue-500' : 'text-gray-500'}`}>
                      {msg.time}
                    </span>
                    {msg.isSelf && (
                      <CheckCheck size={12} className="text-blue-500" />
                    )}
                  </div>
                </div>
                {msg.isSelf && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{msg.senderInitials}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {onlineMembers.some(m => m.isTyping) && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-gray-500 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-500 animate-pulse animation-delay-200"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-500 animate-pulse animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Message Input */}
        <div className="border-t px-4 py-3 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip size={18} />
            </Button>
            <Input 
              placeholder="Type a message..." 
              value={message} 
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <Smile size={18} />
            </Button>
            <Button variant="ghost" size="icon">
              <Mic size={18} />
            </Button>
            <Button size="icon" disabled={!message.trim()} onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Members Sidebar */}
      {showMembers && (
        <div className="w-72 border-l overflow-y-auto hidden md:block dark:border-gray-700">
          <div className="p-4">
            <div className="relative">
              <Input 
                placeholder="Search members..." 
                className="pl-9"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Online Members ({onlineMembers.filter(m => m.status === 'online').length})</h3>
              <div className="space-y-3">
                {onlineMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ${getStatusColor(member.status)} ring-1 ring-white`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-500 capitalize">
                          {member.isTyping ? 'typing...' : member.status}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreVertical size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Pin size={14} />
                Pinned Messages
              </h3>
              <div className="space-y-3">
                {pinnedMessages.map(pinned => (
                  <div key={pinned.id} className="p-2 bg-amber-50 rounded-md border border-amber-100">
                    <p className="text-xs font-medium text-amber-800">{pinned.sender}</p>
                    <p className="text-sm text-amber-900 mt-1">{pinned.text}</p>
                    <p className="text-xs text-amber-600 mt-1 text-right">{pinned.time}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FileText size={14} />
                Shared Files
              </h3>
              <div className="space-y-2">
                {sharedFiles.map(file => (
                  <div key={file.id} className="p-2 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-xs font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyRoomChat;
