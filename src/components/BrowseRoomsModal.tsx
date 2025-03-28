
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, Users, Lock, BookOpen, Clock, Filter, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BrowseRoomsModalProps {
  open: boolean;
  onClose: () => void;
}

// Sample data for the rooms
const sampleRooms = [
  {
    id: 1,
    name: "Calculus Study Group",
    creator: "Sarah Johnson",
    participants: 6,
    topic: "Integration Techniques",
    isPrivate: false,
    createdAt: "1 hour ago"
  },
  {
    id: 2,
    name: "Physics Problem Solving",
    creator: "Michael Chen",
    participants: 4,
    topic: "Mechanics and Motion",
    isPrivate: false,
    createdAt: "2 hours ago"
  },
  {
    id: 3,
    name: "Computer Science Algorithms",
    creator: "Emma Wilson",
    participants: 8,
    topic: "Sorting Algorithms",
    isPrivate: true,
    createdAt: "3 hours ago"
  },
  {
    id: 4,
    name: "Data Structures Practice",
    creator: "Alex Thompson",
    participants: 5,
    topic: "Trees and Graphs",
    isPrivate: false,
    createdAt: "5 hours ago"
  },
  {
    id: 5,
    name: "Chemistry Lab Preparation",
    creator: "Jessica Kim",
    participants: 3,
    topic: "Titration Experiments",
    isPrivate: true,
    createdAt: "1 day ago"
  }
];

export const BrowseRoomsModal = ({ open, onClose }: BrowseRoomsModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  // Filter rooms based on search query and filter
  const filteredRooms = sampleRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         room.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.topic.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "public") return matchesSearch && !room.isPrivate;
    if (filter === "private") return matchesSearch && room.isPrivate;
    return matchesSearch;
  });

  const handleJoinRoom = (roomId: number, isPrivate: boolean) => {
    // In a real implementation, this would send a request to join the room
    if (isPrivate) {
      toast({
        title: "Access Requested",
        description: "Your request to join this private room has been sent to the owner.",
      });
    } else {
      toast({
        title: "Room Joined",
        description: "You have successfully joined the study room.",
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        setSearchQuery("");
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Browse Study Rooms
          </DialogTitle>
          <DialogDescription>
            Discover and join study rooms created by other students.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by room name, creator, or topic..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-sm mb-2 block">Filter Rooms</Label>
            <ToggleGroup type="single" value={filter} onValueChange={(value) => value && setFilter(value)}>
              <ToggleGroupItem value="all" aria-label="All Rooms" className="gap-1">
                <Filter className="h-4 w-4" />
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="public" aria-label="Public Rooms" className="gap-1">
                <Users className="h-4 w-4" />
                Public
              </ToggleGroupItem>
              <ToggleGroupItem value="private" aria-label="Private Rooms" className="gap-1">
                <Lock className="h-4 w-4" />
                Private
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-3 mt-4">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <div 
                  key={room.id} 
                  className="border rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-base flex items-center gap-2">
                        {room.isPrivate && <Lock className="h-4 w-4 text-amber-500" />}
                        {room.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <User className="h-3 w-3" />
                        Created by {room.creator}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant={room.isPrivate ? "outline" : "default"}
                      onClick={() => handleJoinRoom(room.id, room.isPrivate)}
                      className={room.isPrivate ? "border-amber-300 text-amber-700" : ""}
                    >
                      {room.isPrivate ? "Request Access" : "Join Room"}
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm mt-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>{room.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-purple-500" />
                      <span>{room.topic}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{room.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-muted-foreground">No study rooms found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
