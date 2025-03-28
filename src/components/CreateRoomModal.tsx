
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
import { HelpCircle, Users, Lock, Unlock, BookOpen, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateRoomModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateRoomModal = ({ open, onClose }: CreateRoomModalProps) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");
  const [step, setStep] = useState<"form" | "preview">("form");
  const { toast } = useToast();

  const suggestedTopics = [
    "Advanced Calculus Study",
    "Physics Problem Solving",
    "Computer Science Algorithms",
    "Data Structures Practice",
    "Chemistry Lab Preparation"
  ];

  const handleSubmit = () => {
    // In a real implementation, this would send data to a server
    toast({
      title: "Study Room Created",
      description: `"${roomName}" room has been created successfully.`,
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setRoomName("");
    setDescription("");
    setIsPrivate(false);
    setInviteEmails("");
    setStep("form");
  };

  const useSuggestion = (topic: string) => {
    setRoomName(topic);
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
              <Label htmlFor="roomName">Room Name</Label>
              <Input 
                id="roomName" 
                value={roomName} 
                onChange={(e) => setRoomName(e.target.value)} 
                placeholder="E.g., Calculus Study Group" 
              />
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
              <Label htmlFor="inviteEmails">
                Invite Participants (optional)
              </Label>
              <Textarea 
                id="inviteEmails" 
                value={inviteEmails} 
                onChange={(e) => setInviteEmails(e.target.value)}
                placeholder="Enter email addresses separated by commas..."
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple email addresses with commas
              </p>
            </div>

            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button 
                onClick={() => setStep("preview")}
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
              
              {inviteEmails && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Invited Participants</p>
                  <div className="bg-muted p-2 rounded text-sm">
                    {inviteEmails.split(',').map((email, i) => (
                      <div key={i} className="flex items-center gap-2 py-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{email.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("form")}>
                Back to Edit
              </Button>
              <Button onClick={handleSubmit} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Create Room
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
