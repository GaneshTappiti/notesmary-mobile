
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Users,
  MessageSquare,
  FileText,
  Video,
  MoreVertical,
  Pin,
  Upload,
  BrainCircuit,
  Clock,
  Calendar,
  ChevronLeft,
  Phone,
  Share2,
  LinkIcon,
  QrCode,
  Timer,
  Bell,
  Settings,
  PenTool,
  Clipboard,
  CheckSquare,
  BarChart4,
  Bookmark,
  MoveRight,
  Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const StudyRoomInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const roomDetails = {
    name: 'Advanced Physics Study Group',
    description: 'Collaborative study space for Advanced Physics concepts and problem-solving.',
    createdBy: 'Alex Johnson',
    createdAt: 'April 2, 2025',
    subject: 'Physics',
    semester: 'Spring 2025',
    members: [
      { id: 1, name: 'Alex Johnson', avatar: '', online: true, role: 'Admin' },
      { id: 2, name: 'Sarah Chen', avatar: '', online: true, role: 'Member' },
      { id: 3, name: 'Michael Brown', avatar: '', online: false, role: 'Member' },
      { id: 4, name: 'Jessica Lee', avatar: '', online: true, role: 'Member' },
    ],
    pinnedResources: [
      { id: 1, title: 'Physics Formula Sheet', type: 'PDF', uploadedBy: 'Alex Johnson', date: '2 days ago', views: 12 },
      { id: 2, title: 'Week 4 Study Plan', type: 'Document', uploadedBy: 'Sarah Chen', date: '5 days ago', views: 8 },
      { id: 3, title: 'Problem Set Solutions', type: 'PDF', uploadedBy: 'Michael Brown', date: '1 week ago', views: 15 },
    ],
    upcomingSessions: [
      { id: 1, title: 'Problem Solving Practice', date: 'Tomorrow', time: '4:00 PM', description: 'Practice problems from Chapter 5', attendees: 4 },
      { id: 2, title: 'Exam Preparation', date: 'April 9', time: '2:00 PM', description: 'Final review before the midterm exam', attendees: 3 }
    ],
    analytics: {
      totalSessions: 12,
      averageAttendance: 3.5,
      topContributor: 'Sarah Chen',
      totalStudyTime: '32 hours',
      mostActiveDay: 'Wednesday',
      participationRate: 85
    }
  };
  
  const goToChat = () => {
    navigate(`/study-room/${id}/chat`);
  };
  
  const goToStudyRooms = () => {
    navigate('/study-rooms');
  };
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const copyShareLink = () => {
    const shareURL = `${window.location.origin}/study-room/${id}`;
    navigator.clipboard.writeText(shareURL);
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard",
    });
  };

  const [showPomodoroSettings, setShowPomodoroSettings] = useState(false);
  const [pomodoroSettings, setPomodoroSettings] = useState({
    focusDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    autoStartBreaks: true,
    autoStartPomodoros: false,
    notifications: true
  });

  return (
    <div className="container mx-auto px-4 py-0 sm:py-4 max-w-5xl">
      {/* Floating Action Button for Quick Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 items-end z-10">
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex flex-col gap-2 mb-2 border border-purple-100 dark:border-purple-900">
          <Button
            onClick={goToChat}
            size="icon" 
            className="rounded-full bg-purple-600 hover:bg-purple-700 h-10 w-10"
          >
            <MessageSquare size={18} />
          </Button>
          <Button 
            size="icon" 
            className="rounded-full bg-purple-600 hover:bg-purple-700 h-10 w-10"
          >
            <Video size={18} />
          </Button>
          <Button 
            size="icon" 
            className="rounded-full bg-purple-600 hover:bg-purple-700 h-10 w-10"
          >
            <PenTool size={18} />
          </Button>
        </div>
        <Button 
          className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg h-14 w-14 flex items-center justify-center"
          onClick={() => setShowPomodoroSettings(true)}
        >
          <Timer className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Header Section with Room Info and Actions */}
      <div className="flex justify-between items-center mb-6 bg-background sticky top-0 z-10 py-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={goToStudyRooms} className="md:flex">
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border bg-gradient-to-br from-purple-400 to-indigo-500">
              <AvatarFallback className="text-white font-medium">AP</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{roomDetails.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                  {roomDetails.subject}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {roomDetails.members.filter(m => m.online).length} online • {roomDetails.members.length} members
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-purple-200 dark:border-purple-800">
                <Share2 size={14} />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Share study room</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={copyShareLink}>
                <LinkIcon size={16} className="mr-2 text-purple-600" />
                <span>Copy link</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <QrCode size={16} className="mr-2 text-purple-600" />
                <span>Show QR code</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                <Clock size={18} className="mr-2" />
                <span>Start Session</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Start Study Session</DialogTitle>
                <DialogDescription>
                  Choose your session type and settings before starting.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sessionType" className="text-right">
                    Session type
                  </Label>
                  <select id="sessionType" className="col-span-3 p-2 rounded-md border border-purple-200 dark:border-purple-800">
                    <option>Regular Session</option>
                    <option>Pomodoro Session</option>
                    <option>Free Discussion</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <select id="duration" className="col-span-3 p-2 rounded-md border border-purple-200 dark:border-purple-800">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>1 hour 30 minutes</option>
                    <option>2 hours</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notification" className="text-right">
                    Notifications
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch id="notification" defaultChecked />
                    <Label htmlFor="notification">Enable notifications</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                  <Clock size={16} className="mr-2" />
                  <span>Start Now</span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <Info size={16} />
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
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Group Description */}
          <Card className="border border-purple-100 dark:border-purple-900 shadow-sm">
            <CardContent className="pt-6">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-base mb-2 text-purple-800 dark:text-purple-300">About this study room</h3>
                <p className="text-gray-700 dark:text-gray-300">{roomDetails.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                    Subject: {roomDetails.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                    Semester: {roomDetails.semester}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Created by {roomDetails.createdBy} on {roomDetails.createdAt}</p>
              </div>
            </CardContent>
          </Card>
        
          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Next Study Session Card */}
            <Card className="border border-amber-100 dark:border-amber-900/50 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 px-4 py-3 border-b border-amber-200 dark:border-amber-800/50">
                <h3 className="font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Next Session</span>
                </h3>
              </div>
              <CardContent className="pt-4">
                <h4 className="font-medium">{roomDetails.upcomingSessions[0].title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {roomDetails.upcomingSessions[0].date}, {roomDetails.upcomingSessions[0].time}
                </p>
                <p className="text-sm mt-2">{roomDetails.upcomingSessions[0].description}</p>
                <Button size="sm" className="mt-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600">
                  Join Session
                </Button>
              </CardContent>
            </Card>
            
            {/* Active Members Card */}
            <Card className="border border-blue-100 dark:border-blue-900/50 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 px-4 py-3 border-b border-blue-200 dark:border-blue-800/50">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Active Members</span>
                </h3>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  {roomDetails.members
                    .filter(member => member.online)
                    .slice(0, 3)
                    .map(member => (
                      <Avatar key={member.id} className="border-2 border-white dark:border-gray-800">
                        <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  {roomDetails.members.filter(member => member.online).length > 3 && (
                    <Avatar className="bg-blue-100 border-2 border-white dark:border-gray-800">
                      <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        +{roomDetails.members.filter(member => member.online).length - 3}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <p className="text-sm mt-2">
                  {roomDetails.members.filter(m => m.online).length} members online now
                </p>
                <Button size="sm" variant="outline" className="mt-3 border-blue-200 text-blue-700 hover:text-blue-800 dark:border-blue-800 dark:text-blue-300">
                  View All Members
                </Button>
              </CardContent>
            </Card>
            
            {/* Top Resources Card */}
            <Card className="border border-green-100 dark:border-green-900/50 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 px-4 py-3 border-b border-green-200 dark:border-green-800/50">
                <h3 className="font-semibold text-green-800 dark:text-green-300 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Top Resources</span>
                </h3>
              </div>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {roomDetails.pinnedResources
                    .slice(0, 2)
                    .map(resource => (
                      <div key={resource.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 p-1 rounded-full">
                            <FileText className="h-3 w-3 text-green-700" />
                          </div>
                          <span className="text-sm font-medium truncate max-w-[120px]">{resource.title}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{resource.views} views</Badge>
                      </div>
                    ))}
                </div>
                <Button size="sm" variant="outline" className="mt-3 border-green-200 text-green-700 hover:text-green-800 dark:border-green-800 dark:text-green-300">
                  View All Resources
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Members Section */}
          <Card className="border border-purple-100 dark:border-purple-900 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users size={18} />
                  <span>Members ({roomDetails.members.length})</span>
                </CardTitle>
                <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                  <span>Invite</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roomDetails.members.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border border-purple-100 dark:border-purple-900 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        {member.online && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={member.role === 'Admin' ? "default" : "outline"} className={`text-xs py-0 px-1.5 ${member.role === 'Admin' ? 'bg-purple-600' : ''}`}>
                            {member.role}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {member.online ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-600">
                      <MessageSquare size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Analytics Section - For Admins */}
          <Card className="border border-indigo-100 dark:border-indigo-900 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart4 size={18} />
                  <span>Room Analytics</span>
                </CardTitle>
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                  Admin Only
                </Badge>
              </div>
              <CardDescription>
                Performance insights for this study room
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-900">
                  <h4 className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1">TOTAL SESSIONS</h4>
                  <p className="text-2xl font-semibold">{roomDetails.analytics.totalSessions}</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-900">
                  <h4 className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1">TOTAL STUDY TIME</h4>
                  <p className="text-2xl font-semibold">{roomDetails.analytics.totalStudyTime}</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-900">
                  <h4 className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1">PARTICIPATION RATE</h4>
                  <p className="text-2xl font-semibold">{roomDetails.analytics.participationRate}%</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-900">
                  <h4 className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1">AVG ATTENDANCE</h4>
                  <p className="text-2xl font-semibold">{roomDetails.analytics.averageAttendance}</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-900">
                  <h4 className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1">TOP CONTRIBUTOR</h4>
                  <p className="text-xl font-semibold">{roomDetails.analytics.topContributor}</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-900">
                  <h4 className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1">MOST ACTIVE DAY</h4>
                  <p className="text-xl font-semibold">{roomDetails.analytics.mostActiveDay}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          {/* Upload New Resource */}
          <Card className="border border-purple-100 dark:border-purple-900 shadow-sm">
            <CardContent className="pt-6">
              <div className="border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-lg py-8 px-4 text-center bg-purple-50 dark:bg-purple-900/20">
                <Upload className="h-10 w-10 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300 mb-1">Upload Study Materials</h3>
                <p className="text-purple-600 dark:text-purple-400 text-sm mb-4">Drag and drop files or click to browse</p>
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">Upload Files</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Pinned Resources */}
          <Card className="border border-purple-100 dark:border-purple-900 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Pin size={18} />
                  <span>Pinned Resources</span>
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-purple-200 dark:border-purple-800">
                    <span>Sort</span>
                  </Button>
                  <Button variant="outline" size="sm" className="border-purple-200 dark:border-purple-800">
                    <span>Filter</span>
                  </Button>
                </div>
              </div>
              <CardDescription>
                Important resources pinned by room admins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roomDetails.pinnedResources.map(resource => (
                  <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border border-purple-100 dark:border-purple-900 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{resource.title}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                            {resource.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Uploaded by {resource.uploadedBy} • {resource.date}
                          </span>
                          <span className="text-xs text-purple-600 dark:text-purple-400">{resource.views} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-600">
                        <LinkIcon size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-600">
                        <MoreVertical size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* AI Document Analysis */}
              <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800/50 rounded-lg p-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 p-2 rounded-full">
                    <BrainCircuit className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 dark:text-purple-200">AI Document Assistant</h3>
                    <p className="text-purple-800 dark:text-purple-300 text-sm mt-1">
                      Get AI summaries, key points, and insights from your study materials.
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 mt-2">
                  <BrainCircuit size={16} className="mr-2" />
                  <span>Analyze Documents</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card className="border border-purple-100 dark:border-purple-900 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar size={18} /> 
                  <span>Study Sessions</span>
                </CardTitle>
                <Button className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                  <Calendar size={14} />
                  <span>New Session</span>
                </Button>
              </div>
              <CardDescription>
                Scheduled and upcoming study sessions for this group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upcoming session */}
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-amber-900 dark:text-amber-200">{roomDetails.upcomingSessions[0].title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm text-amber-800 dark:text-amber-300">
                          {roomDetails.upcomingSessions[0].date}, {roomDetails.upcomingSessions[0].time}
                        </span>
                      </div>
                      <p className="text-sm text-amber-700 dark:text-amber-400 mt-2">
                        {roomDetails.upcomingSessions[0].description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm text-amber-800 dark:text-amber-300">{roomDetails.upcomingSessions[0].attendees} attendees</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-amber-600 dark:text-amber-400">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600">
                      <Bell size={14} className="mr-1" />
                      <span>Join</span>
                    </Button>
                    <Button size="sm" variant="outline" className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300">
                      <Bell size={14} className="mr-1" />
                      <span>Set Reminder</span>
                    </Button>
                  </div>
                </div>
                
                {/* Future session */}
                <div className="bg-background border border-purple-100 dark:border-purple-900 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{roomDetails.upcomingSessions[1].title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {roomDetails.upcomingSessions[1].date}, {roomDetails.upcomingSessions[1].time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {roomDetails.upcomingSessions[1].description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{roomDetails.upcomingSessions[1].attendees} attendees</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                      <Bell size={14} className="mr-1" />
                      <span>Set Reminder</span>
                    </Button>
                    <Button size="sm" variant="outline" className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                      <LinkIcon size={14} className="mr-1" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
                
                {/* Add new session button */}
                <Button variant="outline" className="w-full border-dashed border-2 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 py-6 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  <Calendar size={16} className="mr-2" />
                  <span>Schedule Another Session</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Pomodoro Timer Dialog */}
      <Dialog open={showPomodoroSettings} onOpenChange={setShowPomodoroSettings}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pomodoro Timer Settings</DialogTitle>
            <DialogDescription>
              Customize your study session timing preferences
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="focusLength" className="text-right">
                Focus time
              </Label>
              <Input
                id="focusLength"
                type="number"
                className="col-span-3"
                value={pomodoroSettings.focusDuration}
                onChange={(e) => setPomodoroSettings({...pomodoroSettings, focusDuration: parseInt(e.target.value)})}
                min={1}
                max={60}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="breakLength" className="text-right">
                Break time
              </Label>
              <Input
                id="breakLength"
                type="number"
                className="col-span-3"
                value={pomodoroSettings.breakDuration}
                onChange={(e) => setPomodoroSettings({...pomodoroSettings, breakDuration: parseInt(e.target.value)})}
                min={1}
                max={30}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="autoStart" className="text-right">
                Auto start
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="autoStart"
                  checked={pomodoroSettings.autoStartPomodoros}
                  onCheckedChange={(checked) => setPomodoroSettings({...pomodoroSettings, autoStartPomodoros: checked})}
                />
                <Label htmlFor="autoStart">Auto start next session</Label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notifications" className="text-right">
                Notifications
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="notifications"
                  checked={pomodoroSettings.notifications}
                  onCheckedChange={(checked) => setPomodoroSettings({...pomodoroSettings, notifications: checked})}
                />
                <Label htmlFor="notifications">Enable audio alerts</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
              <Clock size={16} className="mr-2" />
              <span>Start Timer</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudyRoomInfo;

