
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, ChevronLeft, ChevronRight, Hash, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

// Mock data for rooms
const studyRooms = [
  { 
    id: '1', 
    name: 'Advanced Physics', 
    subject: 'Physics',
    memberCount: 5,
    onlineCount: 3,
    isNew: false
  },
  { 
    id: '2', 
    name: 'Data Structures', 
    subject: 'CS',
    memberCount: 8,
    onlineCount: 2,
    isNew: true
  },
  { 
    id: '3', 
    name: 'Organic Chemistry', 
    subject: 'Chemistry',
    memberCount: 6,
    onlineCount: 0,
    isNew: false
  }
];

interface RoomSidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const RoomSidebar = ({ collapsed, toggleSidebar }: RoomSidebarProps) => {
  const { id: currentRoomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCreateRoom = () => {
    toast({
      title: "Create Room",
      description: "Opening room creation dialog",
    });
    navigate('/study-rooms');
  };
  
  const navigateToRoom = (roomId: string) => {
    navigate(`/study-room/${roomId}`);
  };

  return (
    <div className={cn(
      "h-full bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <h2 className="font-semibold text-md">Study Rooms</h2>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-auto" 
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {studyRooms.map((room) => (
          <TooltipProvider key={room.id} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                    currentRoomId === room.id ? "bg-indigo-100 dark:bg-indigo-900/30" : ""
                  )}
                  onClick={() => navigateToRoom(room.id)}
                >
                  {collapsed ? (
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-indigo-500 text-white text-xs">
                        {room.subject}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-indigo-500 text-white text-xs">
                          {room.subject}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 truncate">
                        <p className="text-sm font-medium truncate">{room.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users size={12} />
                          <span>{room.onlineCount} online</span>
                        </div>
                      </div>
                      {room.isNew && (
                        <Badge className="bg-blue-500 text-xs">New</Badge>
                      )}
                    </>
                  )}
                </div>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <div>
                    <p className="font-medium">{room.name}</p>
                    <p className="text-xs text-muted-foreground">{room.onlineCount} online</p>
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleCreateRoom}
                className={cn(
                  "w-full bg-indigo-600 hover:bg-indigo-700 text-white",
                  collapsed ? "justify-center px-0" : ""
                )}
              >
                <Plus size={16} />
                {!collapsed && <span className="ml-1">Create Room</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Create New Room</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
