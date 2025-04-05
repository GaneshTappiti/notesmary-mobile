
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
  const [showSidebar, setShowSidebar] = useState(true);
  const [showInfoSheet, setShowInfoSheet] = useState(false);
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
    <div className="h-[calc(100vh-70px)] flex overflow-hidden bg-background rounded-lg shadow-sm">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header - WhatsApp Style */}
        <div className="border-b px-4 py-3 bg-background flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={goToRoom}>
              <ChevronLeft size={18} />
            </Button>
            <Avatar className="h-10 w-10 border">
              <AvatarFallback className="bg-primary/10 text-primary">AP</AvatarFallback>
            </Avatar>
            <div className="cursor-pointer" onClick={() => setShowInfoSheet(true)}>
              <h2 className="font-medium text-base flex items-center">
                {roomName}
              </h2>
              <p className="text-xs text-muted-foreground">
                {onlineMembers.filter(m => m.status === 'online').length} online • {onlineMembers.length} members
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
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
            
            {/* Info button that toggles sidebar on desktop */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hidden md:flex" 
                    onClick={() => setShowSidebar(!showSidebar)}
                  >
                    <Info size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{showSidebar ? 'Hide' : 'Show'} Group Info</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Info button that opens sheet on mobile */}
            <Sheet open={showInfoSheet} onOpenChange={setShowInfoSheet}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Info size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-full sm:max-w-sm overflow-y-auto">
                <div className="p-4 space-y-4">
                  <div className="flex justify-center pt-4 pb-2">
                    <Avatar className="h-20 w-20 border">
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">AP</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">{roomName}</h3>
                    <p className="text-sm text-muted-foreground">Created on April 2, 2025</p>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      Collaborative study space for Advanced Physics concepts and problem-solving.
                    </p>
                  </div>
                  
                  {/* Members section */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex justify-between items-center">
                      <span>Members • {onlineMembers.length}</span>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <UserPlus size={14} />
                        <span className="text-xs">Add</span>
                      </Button>
                    </h4>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
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
                              <p className="text-xs text-muted-foreground capitalize">
                                {member.isTyping ? 'typing...' : member.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Pinned Messages */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Pin size={14} />
                      <span>Pinned Messages</span>
                    </h4>
                    <div className="space-y-2">
                      {pinnedMessages.map(pinned => (
                        <div key={pinned.id} className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md border border-amber-100 dark:border-amber-900/30">
                          <p className="text-xs font-medium text-amber-800 dark:text-amber-300">{pinned.sender}</p>
                          <p className="text-sm text-amber-900 dark:text-amber-200 mt-1">{pinned.text}</p>
                          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 text-right">{pinned.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Shared Files */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <FileText size={14} />
                      <span>Shared Files</span>
                    </h4>
                    <div className="space-y-2">
                      {sharedFiles.map(file => (
                        <div key={file.id} className="p-2 bg-background rounded-md border flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="text-xs font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{file.size}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical size={12} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Buttons */}
                  <div className="space-y-2 pt-2">
                    <Button onClick={goToRoom} className="w-full flex items-center gap-2">
                      <Info size={16} />
                      Go to Room Overview
                    </Button>
                    <Button variant="destructive" className="w-full">Leave Group</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
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
                <DropdownMenuItem onClick={goToRoom}>
                  <Info size={16} className="mr-2" />
                  <span>Group Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BrainCircuit size={16} className="mr-2" />
                  <span>AI Chat Summary</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Leave Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Messages Area - WhatsApp Style */}
        <div 
          className="flex-1 overflow-y-auto px-4 py-3 relative"
          style={{ 
            backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFMSURBVEiJ7dVLKwVhGMfxz3Eu5JZQIjtbK1sLKVllYcnadVlY2FnZ2intFFkppGyVKBsrOzs7IbksFDnHceYsiPN/F854NWbOfCzUpqfezlPf3/M+z/uegmmrLqLNQgZpCw+oB+/r3wCRPLxE7B9ZCLrwbsxRSS8+UJvBToNo7exmVaJRMul4Ry/uEznopx9rOEEbShPZyQQiuMAmrrCBT9TjCYdoxz7OQ4DVuMNWKnFA+ZjEK5pQ36996o8tYzee0Yg5lMUCg+qGQ1TgGqX4wlBMvzhk+ToOccF0wEZpGheowgmuMJIKCAKWMItOHGM9DgSZQzmaMYRTdAQBYxtS03/fsRJnIf/OeQ3r2EFtUIlvMYZn1MQDpguOhpG4YBCQOAe9jTwE/cIw2x2byrnbZCe2pNGEnUtjnv4WyXXmvBcTictM9jKC9GK+MeU+72+tu0lrPfkdQwAAAABJRU5ErkJggg==")',
            backgroundRepeat: 'repeat',
            backgroundSize: '25px 25px',
            backgroundColor: 'rgba(240, 240, 240, 0.6)'
          }}
        >
          <div className="space-y-3 max-w-4xl mx-auto">
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
              <span className="text-xs font-medium text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded-full shadow-sm">Today</span>
            </div>
            
            {/* Chat Messages - WhatsApp Style */}
            {messages.map(msg => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.isSelf ? 'justify-end' : ''}`}>
                {!msg.isSelf && (
                  <Avatar className="h-8 w-8 mb-1">
                    <AvatarFallback>{msg.senderInitials}</AvatarFallback>
                  </Avatar>
                )}
                <div 
                  className={`rounded-2xl p-3 max-w-[80%] ${
                    msg.isSelf 
                      ? 'bg-blue-500 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-tl-none shadow-sm'
                  }`}
                >
                  {!msg.isSelf && (
                    <p className="text-xs font-medium mb-1 text-blue-600 dark:text-blue-400">{msg.sender}</p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className={`text-xs ${msg.isSelf ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {msg.time}
                    </span>
                    {msg.isSelf && (
                      <CheckCheck size={12} className="text-blue-100" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator - WhatsApp Style */}
            {onlineMembers.some(m => m.isTyping) && (
              <div className="flex items-end gap-2">
                <Avatar className="h-8 w-8 mb-1">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-4 shadow-sm">
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
        
        {/* Message Input - WhatsApp Style */}
        <div className="px-4 py-3 border-t bg-background">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Smile size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Paperclip size={20} />
            </Button>
            <div className="flex-1 relative">
              <Input 
                placeholder="Type a message..." 
                value={message} 
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                className="rounded-full bg-background pr-12"
              />
              <Button 
                size="icon" 
                disabled={!message.trim()} 
                onClick={handleSendMessage} 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary rounded-full"
              >
                <Send size={16} />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Mic size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Members Sidebar - WhatsApp Style */}
      {showSidebar && (
        <div className="w-80 border-l overflow-y-auto hidden md:block">
          <div className="p-4 space-y-5">
            <div className="flex justify-center pt-4 pb-2">
              <Avatar className="h-20 w-20 border">
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">AP</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{roomName}</h3>
              <p className="text-sm text-muted-foreground">Created on April 2, 2025</p>
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                Collaborative study space for Advanced Physics concepts and problem-solving.
              </p>
            </div>
            
            <div className="relative">
              <Input 
                placeholder="Search members..." 
                className="pl-9"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 flex justify-between items-center">
                <span>Members • {onlineMembers.length}</span>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <UserPlus size={14} />
                  <span className="text-xs">Add</span>
                </Button>
              </h4>
              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
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
                        <p className="text-xs text-muted-foreground capitalize">
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
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Pin size={14} />
                <span>Pinned Messages</span>
              </h4>
              <div className="space-y-2">
                {pinnedMessages.map(pinned => (
                  <div key={pinned.id} className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md border border-amber-100 dark:border-amber-900/30">
                    <p className="text-xs font-medium text-amber-800 dark:text-amber-300">{pinned.sender}</p>
                    <p className="text-sm text-amber-900 dark:text-amber-200 mt-1">{pinned.text}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 text-right">{pinned.time}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <FileText size={14} />
                <span>Shared Files</span>
              </h4>
              <div className="space-y-2">
                {sharedFiles.map(file => (
                  <div key={file.id} className="p-2 bg-background rounded-md border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-xs font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 pt-4">
              <Button onClick={goToRoom} className="w-full flex items-center gap-2">
                <Info size={16} />
                Go to Room Overview
              </Button>
              <Button variant="destructive" className="w-full">Leave Group</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyRoomChat;
