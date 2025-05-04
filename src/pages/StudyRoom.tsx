
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
  Clock,
  Calendar,
  ChevronLeft,
  Phone,
  Search,
  UserPlus,
  Settings,
  LogOut,
  X
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

const StudyRoom = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
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
  
  const goToChat = () => {
    navigate(`/study-room/${id}/chat`);
  };
  
  const goToStudyRooms = () => {
    navigate('/study-rooms');
  };
  
  const leaveRoom = () => {
    // In a real app, this would make an API call to remove the user from the room
    toast({
      title: "Left Study Room",
      description: `You have left the "${roomDetails.name}" study room.`
    });
    navigate('/study-rooms');
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Handle action buttons that don't have implementations yet
  const handleFeatureNotImplemented = (featureName: string) => {
    toast({
      title: `${featureName} not implemented`,
      description: `The ${featureName} feature is not implemented yet.`
    });
  };
  
  const handleSearchInRoom = () => handleFeatureNotImplemented("Search in room");
  const handleRoomSettings = () => handleFeatureNotImplemented("Room settings");
  const handleInviteMembers = () => handleFeatureNotImplemented("Invite members");
  const handleScheduleSession = () => handleFeatureNotImplemented("Schedule session");
  const handleSetReminder = () => handleFeatureNotImplemented("Set reminder");
  const handleJoinSession = () => handleFeatureNotImplemented("Join session");
  const handleVideoCall = () => handleFeatureNotImplemented("Video call");
  const handleVoiceCall = () => handleFeatureNotImplemented("Voice call");
  const handleUploadFiles = () => handleFeatureNotImplemented("Upload files");
  const handleAskQuestion = () => handleFeatureNotImplemented("Ask AI question");
  const handleAnalyzeDocuments = () => handleFeatureNotImplemented("Analyze documents");
  const handleSummarizeMaterials = () => handleFeatureNotImplemented("Summarize materials");

  return (
    <div className="container mx-auto px-4 py-0 sm:py-4 max-w-5xl">
      {/* WhatsApp Style Header */}
      <div className="flex justify-between items-center mb-6 bg-background sticky top-0 z-10 py-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={goToStudyRooms} className="md:flex">
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarFallback className="bg-primary/10 text-primary text-lg">AP</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{roomDetails.name}</h1>
              <p className="text-sm text-muted-foreground">
                {roomDetails.members.filter(m => m.online).length} online • {roomDetails.members.length} members
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground"
            onClick={handleVoiceCall}
          >
            <Phone size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground"
            onClick={handleVideoCall}
          >
            <Video size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={goToChat}
            className="text-muted-foreground"
          >
            <MessageSquare size={20} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Room Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSearchInRoom}>
                <Search size={16} className="mr-2" />
                <span>Search in Room</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRoomSettings}>
                <Settings size={16} className="mr-2" />
                <span>Room Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleInviteMembers}>
                <UserPlus size={16} className="mr-2" />
                <span>Invite Members</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive"
                onClick={leaveRoom}
              >
                <X size={16} className="mr-2" />
                <span>Leave Room</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* WhatsApp Style Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <Users size={16} />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-1.5">
            <FileText size={16} />
            <span>Resources</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span>Schedule</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab - WhatsApp Style */}
        <TabsContent value="overview" className="space-y-6">
          {/* Group Description */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium text-base mb-2">About this group</h3>
              <p className="text-muted-foreground text-sm">{roomDetails.description}</p>
              <p className="text-xs text-muted-foreground mt-2">Created on April 2, 2025</p>
            </CardContent>
          </Card>
        
          {/* Members Section - WhatsApp Style */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users size={18} />
                  <span>Members ({roomDetails.members.length})</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1.5"
                  onClick={handleInviteMembers}
                >
                  <UserPlus size={14} />
                  Invite
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roomDetails.members.map(member => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
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
                          <span className="text-xs text-muted-foreground">
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
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock size={18} />
                  <span>Upcoming Sessions</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1.5"
                  onClick={handleScheduleSession}
                >
                  <Calendar size={14} />
                  Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 flex items-start gap-4">
                <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-medium text-amber-900 dark:text-amber-200">Next Study Session</h3>
                  <p className="text-amber-800 dark:text-amber-300 text-sm mt-1">Tomorrow, 4:00 PM - Problem Solving Practice</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="default" className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600" onClick={handleJoinSession}>Join</Button>
                    <Button size="sm" variant="outline" className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300" onClick={handleSetReminder}>Set Reminder</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Study Assistant */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BrainCircuit size={18} />
                <span>AI Study Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 rounded-lg p-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full">
                    <BrainCircuit className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 dark:text-purple-200">Study Assistant</h3>
                    <p className="text-purple-800 dark:text-purple-300 text-sm mt-1">Get AI-powered study recommendations, summaries, and answers for this group.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button onClick={handleAskQuestion} className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">Ask a Question</Button>
                  <Button onClick={handleSummarizeMaterials} variant="outline" className="w-full border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300">Summarize Recent Materials</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Resources Tab - WhatsApp Style */}
        <TabsContent value="resources" className="space-y-6">
          {/* Upload New Resource */}
          <Card>
            <CardContent className="pt-6">
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg py-8 px-4 text-center">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">Upload Study Materials</h3>
                <p className="text-muted-foreground text-sm mb-4">Drag and drop files or click to browse</p>
                <Button onClick={handleUploadFiles}>Upload Files</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Pinned Resources */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Pin size={18} />
                  <span>Pinned Resources</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roomDetails.pinnedResources.map(resource => (
                  <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{resource.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
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
              <CardTitle className="text-lg flex items-center gap-2">
                <BrainCircuit size={18} />
                <span>AI Document Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-lg p-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                    <BrainCircuit className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-900 dark:text-green-200">Document Assistant</h3>
                    <p className="text-green-800 dark:text-green-300 text-sm mt-1">Get AI summaries, key points, and insights from your study materials.</p>
                  </div>
                </div>
                <Button onClick={handleAnalyzeDocuments} className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">Analyze Documents</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Schedule Tab - WhatsApp Style */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar size={18} /> 
                  <span>Study Sessions</span>
                </CardTitle>
                <Button onClick={handleScheduleSession} className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  New Session
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upcoming session */}
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-amber-900 dark:text-amber-200">Problem Solving Practice</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm text-amber-800 dark:text-amber-300">Tomorrow, 4:00 PM</span>
                      </div>
                      <p className="text-sm text-amber-700 dark:text-amber-400 mt-2">
                        Practice problems from Chapter 5: Quantum Mechanics
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm text-amber-800 dark:text-amber-300">4 attendees</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-amber-600 dark:text-amber-400">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleFeatureNotImplemented("Edit session")}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSetReminder}>Set Reminder</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFeatureNotImplemented("Share session")}>Share</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleFeatureNotImplemented("Cancel session")}>Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600" onClick={handleJoinSession}>Join</Button>
                    <Button size="sm" variant="outline" className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300" onClick={handleSetReminder}>Set Reminder</Button>
                  </div>
                </div>
                
                {/* Future session */}
                <div className="bg-background border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Exam Preparation</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Friday, April 9, 2:00 PM</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Final review before the midterm exam
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">3 attendees</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleFeatureNotImplemented("Edit session")}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSetReminder}>Set Reminder</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFeatureNotImplemented("Share session")}>Share</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleFeatureNotImplemented("Cancel session")}>Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={handleSetReminder}>Set Reminder</Button>
                  </div>
                </div>
                
                {/* Past session */}
                <div className="bg-muted/30 border rounded-lg p-4 opacity-75">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Concept Discussion</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Monday, April 1, 3:00 PM</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Discussed core concepts from Chapter 4
                      </p>
                      <Badge variant="outline" className="mt-2">Completed</Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleFeatureNotImplemented("View notes")}>View Notes</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFeatureNotImplemented("View recording")}>View Recording</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Quick Chat Button - Fixed to Bottom Right */}
      <div className="fixed bottom-6 right-6">
        <Button 
          onClick={goToChat} 
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg" 
        >
          <MessageSquare size={24} />
        </Button>
      </div>
    </div>
  );
};

export default StudyRoom;
