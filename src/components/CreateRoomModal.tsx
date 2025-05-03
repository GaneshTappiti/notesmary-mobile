
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Users, Lock, Unlock, BookOpen, CheckCircle, Copy, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

interface CreateRoomModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (roomData: any) => void; // Added onCreate prop as optional
}

// Form validation schema
const roomFormSchema = z.object({
  roomName: z.string().min(3, { message: "Room name must be at least 3 characters long" }),
  description: z.string().optional(),
  isPrivate: z.boolean().default(false),
  enableShareLink: z.boolean().default(false),
});

type RoomFormValues = z.infer<typeof roomFormSchema>;

export const CreateRoomModal = ({ open, onClose, onCreate }: CreateRoomModalProps) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [enableShareLink, setEnableShareLink] = useState(false);
  const [step, setStep] = useState<"form" | "preview">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [shareableLink, setShareableLink] = useState("https://study.app/join/room/abc123");

  const suggestedTopics = [
    "Advanced Calculus Study",
    "Physics Problem Solving",
    "Computer Science Algorithms",
    "Data Structures Practice",
    "Chemistry Lab Preparation"
  ];

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate required fields
    if (!roomName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a room name",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Validate emails
    const invalidEmails = inviteEmails.filter(email => !emailRegex.test(email));
    if (invalidEmails.length > 0) {
      toast({
        title: "Invalid Email Addresses",
        description: `Some email addresses are not valid: ${invalidEmails.join(", ")}`,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real implementation, this would send data to a server
      toast({
        title: "Study Room Created",
        description: `"${roomName}" room has been created successfully.`,
      });
      
      // Generate a random ID for the new room
      const mockNewRoomId = Math.floor(Math.random() * 1000).toString();
      
      // Call onCreate if provided
      if (onCreate) {
        const roomData = {
          name: roomName,
          description,
          isPrivate,
          inviteEmails,
          enableShareLink
        };
        onCreate(roomData);
      }
      
      resetForm();
      onClose();
      
      // Navigate to the new room
      navigate(`/study-room/${mockNewRoomId}/info`);
      setIsSubmitting(false);
    }, 1000);
  };

  const resetForm = () => {
    setRoomName("");
    setDescription("");
    setIsPrivate(false);
    setInviteEmails([]);
    setCurrentEmail("");
    setEnableShareLink(false);
    setStep("form");
    setIsSubmitting(false);
  };

  const useSuggestion = (topic: string) => {
    setRoomName(topic);
  };
  
  const addEmail = () => {
    // Validate email
    if (!currentEmail.trim()) {
      return;
    }
    
    if (!emailRegex.test(currentEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    if (currentEmail && !inviteEmails.includes(currentEmail)) {
      setInviteEmails([...inviteEmails, currentEmail]);
      setCurrentEmail("");
    } else if (inviteEmails.includes(currentEmail)) {
      toast({
        title: "Duplicate Email",
        description: "This email has already been added to the invitation list",
        variant: "destructive"
      });
    }
  };
  
  const removeEmail = (email: string) => {
    setInviteEmails(inviteEmails.filter(e => e !== email));
  };
  
  const copyShareableLink = () => {
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast({
          title: "Link Copied",
          description: "Shareable link has been copied to clipboard",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to Copy",
          description: "Could not copy the link to clipboard",
          variant: "destructive"
        });
      });
  };

  const validateForm = () => {
    if (!roomName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a room name",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            {step === "form" ? "Create a Study Room" : "Confirm Room Details"}
          </DialogTitle>
          <DialogDescription>
            {step === "form" 
              ? "Fill out the details below to create a new study room." 
              : "Review your room settings before creating."}
          </DialogDescription>
        </DialogHeader>

        {step === "form" ? (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="roomName">Room Name <span className="text-red-500">*</span></Label>
              <Input 
                id="roomName" 
                value={roomName} 
                onChange={(e) => setRoomName(e.target.value)} 
                placeholder="E.g., Calculus Study Group" 
              />
              {roomName.trim() === "" && (
                <p className="text-sm text-red-500">Room name is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">AI Topic Suggestions</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics.map((topic, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => useSuggestion(topic)}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you'll be studying..."
                className="resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label htmlFor="private-toggle" className="font-medium">Private Room</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Private rooms require approval to join</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-xs text-muted-foreground">
                  {isPrivate ? 
                    "Only invited users can join" : 
                    "Anyone can discover and join"}
                </span>
              </div>
              <Switch 
                id="private-toggle" 
                checked={isPrivate} 
                onCheckedChange={setIsPrivate} 
              />
            </div>

            <div className="space-y-2">
              <Label>Email Invitations (optional)</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter email address"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addEmail();
                    }
                  }}
                  className="flex-1"
                />
                <Button type="button" onClick={addEmail}>Add</Button>
              </div>
              
              {inviteEmails.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {inviteEmails.map((email, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1">
                      {email}
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent"
                        onClick={() => removeEmail(email)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="sharelink-toggle" className="font-medium">Enable Shareable Link</Label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Allow others to join via link
                  </span>
                </div>
                <Switch
                  id="sharelink-toggle"
                  checked={enableShareLink}
                  onCheckedChange={setEnableShareLink}
                />
              </div>
              
              {enableShareLink && (
                <div className="flex items-center gap-2 mt-2">
                  <Input 
                    value={shareableLink} 
                    readOnly
                    className="flex-1 bg-muted"
                  />
                  <Button variant="outline" size="sm" onClick={copyShareableLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button 
                onClick={() => {
                  if (validateForm()) {
                    setStep("preview");
                  }
                }}
                disabled={!roomName.trim()}
              >
                Preview Room
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border p-4 rounded-lg space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Room Name</p>
                <p className="font-semibold text-lg">{roomName}</p>
              </div>
              
              {description && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm">{description}</p>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 p-2 rounded-full">
                  {isPrivate ? (
                    <Lock className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Unlock className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {isPrivate ? "Private Room" : "Public Room"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isPrivate 
                      ? "Only invited participants can join" 
                      : "Anyone can discover and join this room"}
                  </p>
                </div>
              </div>
              
              {inviteEmails.length > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Invited Participants</p>
                  <div className="bg-muted p-2 rounded text-sm">
                    {inviteEmails.map((email, i) => (
                      <div key={i} className="flex items-center gap-2 py-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {enableShareLink && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Shareable Link</p>
                  <p className="text-sm">Enabled - others can join using a link</p>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("form")} disabled={isSubmitting}>
                Back to Edit
              </Button>
              <Button onClick={handleSubmit} className="gap-2" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Creating...</>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Create Room
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
