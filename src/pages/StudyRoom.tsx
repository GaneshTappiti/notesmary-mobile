
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useStudyRoom } from '@/hooks/useStudyRoom';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessageList } from '@/components/studyrooms/ChatMessageList';
import { ChatInput } from '@/components/studyrooms/ChatInput';
import { RoomMembersList } from '@/components/studyrooms/RoomMembersList';
import { GoogleMeetIntegration } from '@/components/GoogleMeetIntegration';
import {
  Users,
  MessageSquare,
  FileText,
  Video,
  MoreVertical,
  ChevronLeft,
  Search,
  UserPlus,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const StudyRoom = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const {
    room,
    messages,
    members,
    isLoading,
    error,
    isAdmin,
    refreshData,
    leaveRoom,
    deleteRoom
  } = useStudyRoom(id || '');

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  }, [error, toast]);

  const handleLeaveRoom = async () => {
    const success = await leaveRoom();
    if (success) {
      toast({
        title: "Left Room",
        description: `You have left the "${room?.name}" study room.`
      });
      navigate('/study-rooms');
    }
  };

  const handleDeleteRoom = async () => {
    const success = await deleteRoom();
    if (success) {
      toast({
        title: "Room Deleted",
        description: `The study room "${room?.name}" has been deleted.`
      });
      navigate('/study-rooms');
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!room || !user) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Room not found</h2>
          <p className="mb-6">This study room may have been deleted or you don't have access to it.</p>
          <Button onClick={() => navigate('/study-rooms')}>
            Back to Study Rooms
          </Button>
        </div>
      </div>
    );
  }

  const roomName = room.name || "Study Room";
  const onlineCount = members.filter(m => m.is_online).length || 0;
  const memberCount = members.length || 0;

  return (
    <div className="container mx-auto px-4 py-0 sm:py-4 max-w-5xl">
      {/* Room Header */}
      <div className="flex justify-between items-center mb-6 bg-background sticky top-0 z-10 py-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/study-rooms')} className="md:flex">
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {roomName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{roomName}</h1>
              <p className="text-sm text-muted-foreground">
                {onlineCount} online • {memberCount} members
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <GoogleMeetIntegration 
            roomId={room.id} 
            isAdmin={isAdmin} 
            meetLink={room.meet_link}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Room Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Search size={16} className="mr-2" />
                <span>Search in Room</span>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem>
                  <Settings size={16} className="mr-2" />
                  <span>Room Settings</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <UserPlus size={16} className="mr-2" />
                <span>Invite Members</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {isAdmin ? (
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <X size={16} className="mr-2" />
                  <span>Delete Room</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => setShowLeaveDialog(true)}
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Leave Room</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Room Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="chat" className="flex items-center gap-1.5">
            <MessageSquare size={16} />
            <span>Chat</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-1.5">
            <Users size={16} />
            <span>Members</span>
          </TabsTrigger>
          <TabsTrigger value="files" className="flex items-center gap-1.5">
            <FileText size={16} />
            <span>Files</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Chat Tab */}
        <TabsContent value="chat" className="space-y-6">
          <Card className="border rounded-lg overflow-hidden">
            <div className="flex flex-col h-[70vh]">
              <ChatMessageList messages={messages} loading={isLoading} />
              <ChatInput roomId={room.id} onMessageSent={refreshData} />
            </div>
          </Card>
        </TabsContent>
        
        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <RoomMembersList 
                members={members}
                isAdmin={isAdmin}
                roomId={room.id}
                currentUserId={user.id}
                onMemberRemoved={refreshData}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Files Tab */}
        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={18} />
                <span>Shared Files</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">No files have been shared in this room yet</p>
                <Button size="sm" className="mt-2">
                  Upload a File
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Leave Room Confirmation Dialog */}
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Study Room</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave this study room? You can rejoin later if it's a public room.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLeaveRoom}>Leave</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete Room Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Study Room</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this study room? This action cannot be undone and will remove all messages, files, and member information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteRoom}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudyRoom;
