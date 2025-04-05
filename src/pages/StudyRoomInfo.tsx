
import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Users, 
  UserPlus, 
  Copy, 
  AlertTriangle, 
  Trash2, 
  LogOut, 
  MessageSquare, 
  BookOpen, 
  FileText,
  CheckCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
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

const StudyRoomInfo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [inviteEmail, setInviteEmail] = useState("");
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Mock data for the room
  const room = {
    id,
    name: "Advanced Physics Study Group",
    description: "A collaborative space for discussing advanced physics concepts, problem-solving, and exam preparation.",
    isPrivate: true,
    shareableLink: "https://study.app/join/room/abc123",
    isAdmin: true,
    createdAt: "2023-03-15T12:00:00Z"
  };

  // Mock data for room members
  const members = [
    { id: "1", name: "Alex Johnson", email: "alex@example.com", role: "Admin", isOnline: true, avatarUrl: "" },
    { id: "2", name: "Jamie Smith", email: "jamie@example.com", role: "Member", isOnline: true, avatarUrl: "" },
    { id: "3", name: "Taylor Brown", email: "taylor@example.com", role: "Member", isOnline: false, avatarUrl: "" },
    { id: "4", name: "Jordan Lee", email: "jordan@example.com", role: "Member", isOnline: false, avatarUrl: "" },
  ];

  // Mock data for resources
  const resources = [
    { id: "1", name: "Physics Formulas.pdf", type: "pdf", size: "2.4 MB", uploadedBy: "Alex Johnson", uploadedAt: "2023-03-16T14:30:00Z" },
    { id: "2", name: "Quantum Mechanics Notes.docx", type: "docx", size: "1.8 MB", uploadedBy: "Jamie Smith", uploadedAt: "2023-03-17T09:15:00Z" },
    { id: "3", name: "Thermodynamics Examples.pdf", type: "pdf", size: "3.7 MB", uploadedBy: "Jordan Lee", uploadedAt: "2023-03-18T16:45:00Z" },
  ];

  const copyInviteLink = () => {
    navigator.clipboard.writeText(room.shareableLink);
    toast({
      title: "Link copied",
      description: "Invitation link copied to clipboard",
    });
  };

  const sendInvite = () => {
    if (!inviteEmail) return;
    
    // In a real app, this would send an API request
    toast({
      title: "Invitation sent",
      description: `Invitation email sent to ${inviteEmail}`,
    });
    setInviteEmail("");
  };

  const leaveRoom = () => {
    // In a real app, this would send an API request
    toast({
      title: "Left room",
      description: "You have successfully left the room",
    });
    setShowLeaveDialog(false);
    navigate("/study-rooms");
  };

  const deleteRoom = () => {
    // In a real app, this would send an API request
    toast({
      title: "Room deleted",
      description: "The study room has been permanently deleted",
    });
    setShowDeleteDialog(false);
    navigate("/study-rooms");
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/study-rooms")}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{room.name}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Room description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                About this Room
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{room.description}</p>
            </CardContent>
          </Card>

          {/* Members section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Members ({members.length})
              </CardTitle>
              <Button size="sm" className="gap-2" onClick={() => document.getElementById('invite-section')?.scrollIntoView({ behavior: 'smooth' })}>
                <UserPlus className="h-4 w-4" />
                Invite
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {members.map(member => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatarUrl} />
                        <AvatarFallback className="bg-primary/10">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{member.name}</p>
                          <Badge variant={member.role === "Admin" ? "default" : "outline"} className="text-xs">
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${member.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invite section */}
          <Card id="invite-section">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-blue-500" />
                Invite Others
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Email Invitation</p>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter email address" 
                    value={inviteEmail} 
                    onChange={(e) => setInviteEmail(e.target.value)} 
                    className="flex-1"
                  />
                  <Button onClick={sendInvite}>Send Invite</Button>
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <p className="text-sm font-medium">Shareable Link</p>
                <div className="flex gap-2">
                  <Input value={room.shareableLink} readOnly className="flex-1" />
                  <Button variant="outline" onClick={copyInviteLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone with this link can {room.isPrivate ? 'request to join' : 'join'} this study room
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Group actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Group Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button 
                  variant="outline" 
                  className="gap-2 text-amber-600 border-amber-200 hover:bg-amber-50 w-full sm:w-auto"
                  onClick={() => setShowLeaveDialog(true)}
                >
                  <LogOut className="h-4 w-4" />
                  Leave Room
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  You will no longer have access to this room's resources and chats
                </p>
              </div>
              
              {room.isAdmin && (
                <div>
                  <Button 
                    variant="destructive" 
                    className="gap-2 w-full sm:w-auto"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Room
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    This will permanently delete the room and all its data
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Shared Resources
              </CardTitle>
              <Button size="sm">Upload Resource</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {resources.map(resource => (
                  <div key={resource.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {resource.size} • Uploaded by {resource.uploadedBy}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <Card className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Chat with Group Members</h3>
            <p className="text-muted-foreground mb-4 text-center max-w-md">
              Start real-time discussions, share resources, and collaborate with your study group members
            </p>
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => navigate(`/study-room/${id}/chat`)}
            >
              <MessageSquare className="h-5 w-5" />
              Open Chat
            </Button>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Leave Room Dialog */}
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave this study room?</AlertDialogTitle>
            <AlertDialogDescription>
              You will no longer have access to this room's resources and chat history.
              You can rejoin later if you are invited again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-amber-600 hover:bg-amber-700"
              onClick={leaveRoom}
            >
              Leave Room
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Room Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this study room?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the room and all
              resources, messages, and other data associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={deleteRoom}
            >
              Delete Room
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudyRoomInfo;
