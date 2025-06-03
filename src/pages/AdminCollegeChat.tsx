
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Search,
  Send,
  MessageCircle,
  Clock,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CollegeAdmin {
  id: string;
  name: string;
  collegeName: string;
  avatar: string;
  lastActive: string;
  status: 'online' | 'offline' | 'away';
  unreadCount: number;
}

interface Message {
  id: string;
  content: string;
  sender: 'admin' | 'college';
  timestamp: string;
  type: 'message' | 'system';
}

interface Conversation {
  collegeAdminId: string;
  messages: Message[];
}

const AdminCollegeChat = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollegeAdmin, setSelectedCollegeAdmin] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data for college admins
  const [collegeAdmins] = useState<CollegeAdmin[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      collegeName: 'MIT Technology',
      avatar: '',
      lastActive: '2 minutes ago',
      status: 'online',
      unreadCount: 3
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      collegeName: 'Stanford University',
      avatar: '',
      lastActive: '15 minutes ago',
      status: 'away',
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      collegeName: 'Harvard Medical',
      avatar: '',
      lastActive: '1 hour ago',
      status: 'online',
      unreadCount: 1
    },
    {
      id: '4',
      name: 'Prof. David Wilson',
      collegeName: 'Berkeley Engineering',
      avatar: '',
      lastActive: '3 hours ago',
      status: 'offline',
      unreadCount: 0
    }
  ]);

  // Mock conversations
  const [conversations, setConversations] = useState<Record<string, Conversation>>({
    '1': {
      collegeAdminId: '1',
      messages: [
        {
          id: '1',
          content: 'Hello! I need help with the new notes approval system.',
          sender: 'college',
          timestamp: '2023-04-15T10:30:00',
          type: 'message'
        },
        {
          id: '2',
          content: 'Hi Dr. Johnson! I\'d be happy to help. What specific issue are you experiencing?',
          sender: 'admin',
          timestamp: '2023-04-15T10:32:00',
          type: 'message'
        },
        {
          id: '3',
          content: 'Some of the uploaded notes are not showing up in the approval queue.',
          sender: 'college',
          timestamp: '2023-04-15T10:35:00',
          type: 'message'
        }
      ]
    },
    '3': {
      collegeAdminId: '3',
      messages: [
        {
          id: '1',
          content: 'Can you help me understand the user management features?',
          sender: 'college',
          timestamp: '2023-04-15T09:15:00',
          type: 'message'
        }
      ]
    }
  });

  const filteredCollegeAdmins = collegeAdmins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.collegeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedAdmin = collegeAdmins.find(admin => admin.id === selectedCollegeAdmin);
  const currentConversation = selectedCollegeAdmin ? conversations[selectedCollegeAdmin] : null;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedCollegeAdmin) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'admin',
      timestamp: new Date().toISOString(),
      type: 'message'
    };

    setConversations(prev => ({
      ...prev,
      [selectedCollegeAdmin]: {
        collegeAdminId: selectedCollegeAdmin,
        messages: [...(prev[selectedCollegeAdmin]?.messages || []), message]
      }
    }));

    setNewMessage('');
    
    toast({
      title: "Message sent",
      description: `Message sent to ${selectedAdmin?.name}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500 text-white">Online</Badge>;
      case 'away':
        return <Badge className="bg-yellow-500 text-white">Away</Badge>;
      case 'offline':
        return <Badge variant="outline" className="border-gray-500 text-gray-500">Offline</Badge>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Helmet>
        <title>College Admin Chat | Super Admin Dashboard</title>
      </Helmet>
      
      <div className="h-screen flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold tracking-tight">College Admin Chat</h1>
          <p className="text-gray-600">Communicate with college administrators</p>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - College Admin List */}
          <div className="w-80 border-r bg-gray-50 flex flex-col">
            <div className="p-4 border-b bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search college admins..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredCollegeAdmins.map((admin) => (
                  <Card 
                    key={admin.id}
                    className={`mb-2 cursor-pointer transition-all hover:bg-blue-50 ${
                      selectedCollegeAdmin === admin.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedCollegeAdmin(admin.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={admin.avatar} alt={admin.name} />
                            <AvatarFallback>{getInitials(admin.name)}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                            admin.status === 'online' ? 'bg-green-500' :
                            admin.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{admin.name}</h3>
                            {admin.unreadCount > 0 && (
                              <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5">
                                {admin.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 truncate">{admin.collegeName}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{admin.lastActive}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedAdmin ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-white">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedAdmin.avatar} alt={selectedAdmin.name} />
                      <AvatarFallback>{getInitials(selectedAdmin.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{selectedAdmin.name}</h2>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{selectedAdmin.collegeName}</span>
                        {getStatusBadge(selectedAdmin.status)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentConversation?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'admin'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTimestamp(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a College Admin</h3>
                  <p className="text-gray-600">Choose a college administrator to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCollegeChat;
