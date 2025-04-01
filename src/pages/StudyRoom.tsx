
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Clock
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const StudyRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [message, setMessage] = useState('');
  
  // Mock data
  const roomDetails = {
    name: 'Advanced Physics Study Group',
    description: 'Collaborative study space for Advanced Physics concepts and problem-solving.',
    members: [
      { id: 1, name: 'Alex Johnson', avatar: '', online: true, role: 'Admin' },
      { id: 2, name: 'Sarah Chen', avatar: '', online: true, role: 'Member' },
      { id: 3, name: 'Michael Brown', avatar: '', online: false, role: 'Member' },
      { id: 4, name: 'Jessica Lee', avatar: '', online: true, role: 'Member' },
    ],
    pinnedResources: [
      { id: 1, title: 'Physics Formula Sheet', type: 'PDF', uploadedBy: 'Alex Johnson', date: '2 days ago' },
      { id: 2, title: 'Week 4 Study Plan', type: 'Document', uploadedBy: 'Sarah Chen', date: '5 days ago' },
      { id: 3, title: 'Problem Set Solutions', type: 'PDF', uploadedBy: 'Michael Brown', date: '1 week ago' },
    ]
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Handle message sending
    console.log('Sending message:', message);
    setMessage('');
    // In a real application, you would send this to your backend
  };
  
  const goToChat = () => {
    navigate(`/study-room/${id}/chat`);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{roomDetails.name}</h1>
          <p className="text-gray-600 text-sm mt-1">{roomDetails.description}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1.5"
            onClick={goToChat}
          >
            <MessageSquare size={16} />
            Open Chat
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-1.5"
          >
            <Video size={16} />
            Start Call
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Room Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Users size={16} className="mr-2" />
                <span>Invite Members</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText size={16} className="mr-2" />
                <span>View Files</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BrainCircuit size={16} className="mr-2" />
                <span>Ask AI for Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Leave Room
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <Users size={16} />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-1.5">
            <FileText size={16} />
            <span>Resources</span>
          </TabsTrigger>
          <TabsTrigger value="quickchat" className="flex items-center gap-1.5">
            <MessageSquare size={16} />
            <span>Quick Chat</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Members Section */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Members ({roomDetails.members.length})</CardTitle>
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <Users size={14} />
                  Invite
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roomDetails.members.map(member => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        {member.online && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={member.role === 'Admin' ? "default" : "outline"} className="text-xs py-0 px-1.5">
                            {member.role}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {member.online ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <Clock size={14} />
                  Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-amber-900">Next Study Session</h3>
                  <p className="text-amber-800 text-sm mt-1">Tomorrow, 4:00 PM - Problem Solving Practice</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="default" className="bg-amber-600 hover:bg-amber-700">Join</Button>
                    <Button size="sm" variant="outline" className="border-amber-300 text-amber-700">Set Reminder</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Study Assistant */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">AI Study Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <BrainCircuit className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900">Study Assistant</h3>
                    <p className="text-purple-800 text-sm mt-1">Get AI-powered study recommendations, summaries, and answers for this group.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Ask a Question</Button>
                  <Button variant="outline" className="w-full border-purple-300 text-purple-700">Summarize Recent Materials</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          {/* Upload New Resource */}
          <Card>
            <CardContent className="pt-6">
              <div className="border-2 border-dashed border-gray-200 rounded-lg py-8 px-4 text-center">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Study Materials</h3>
                <p className="text-gray-500 text-sm mb-4">Drag and drop files or click to browse</p>
                <Button>Upload Files</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Pinned Resources */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Pin size={16} className="text-red-500" />
                  Pinned Resources
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roomDetails.pinnedResources.map(resource => (
                  <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{resource.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Uploaded by {resource.uploadedBy} · {resource.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* AI Document Analysis */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">AI Document Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <BrainCircuit className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-900">Document Assistant</h3>
                    <p className="text-green-800 text-sm mt-1">Get AI summaries, key points, and insights from your study materials.</p>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">Analyze Documents</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quickchat" className="space-y-4">
          <Card className="relative h-[400px] flex flex-col overflow-hidden">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">Quick Chat</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto flex-1 py-4">
              <div className="space-y-4">
                {/* Example messages */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                    <p className="text-sm text-gray-700">Has everyone reviewed the notes for tomorrow's session?</p>
                    <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-blue-700">I've gone through most of it. Still have questions about the quantum tunneling section.</p>
                    <p className="text-xs text-blue-500 mt-1">10:32 AM</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm font-medium text-gray-900">Sarah Chen</p>
                    <p className="text-sm text-gray-700">I can help with that section. Let's discuss it tomorrow.</p>
                    <p className="text-xs text-gray-500 mt-1">10:35 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <div className="p-3 border-t mt-auto">
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
                <Button size="icon" disabled={!message.trim()} onClick={handleSendMessage}>
                  <Send size={18} />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={goToChat}>
                  Go to full chat
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyRoom;
