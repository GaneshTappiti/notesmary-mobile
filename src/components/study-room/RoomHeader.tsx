
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, MessageCircle, Users, Video, Settings, Lock, Unlock, Share2, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RoomHeaderProps {
  room: {
    id: string;
    name: string;
    subject: string;
    isPrivate: boolean;
    memberCount: number;
    onlineCount: number;
  };
}

export const RoomHeader = ({ room }: RoomHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLeaveRoom = () => {
    toast({
      title: "Left study room",
      description: "You've successfully left the study room",
    });
    navigate('/study-rooms');
  };
  
  const handleShareRoom = () => {
    toast({
      title: "Room link copied",
      description: "Room invitation link has been copied to clipboard",
    });
  };
  
  const handleRoomSettings = () => {
    toast({
      title: "Room settings",
      description: "Opening room settings",
    });
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            {room.name}
            {room.isPrivate ? (
              <Lock className="h-4 w-4 text-amber-500" />
            ) : (
              <Unlock className="h-4 w-4 text-green-500" />
            )}
          </h1>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200">{room.subject}</Badge>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{room.onlineCount} online</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          className="hidden md:flex items-center gap-1"
          onClick={handleShareRoom}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Room Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleRoomSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Room Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShareRoom}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Room Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
              onClick={handleLeaveRoom}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Leave Room
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
