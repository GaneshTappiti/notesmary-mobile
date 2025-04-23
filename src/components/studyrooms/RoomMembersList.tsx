
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, UserMinus, MoreVertical } from 'lucide-react';

export interface RoomMember {
  id: string;
  user_id: string;
  room_id: string;
  role: 'admin' | 'member';
  joined_at: string;
  profiles?: {
    full_name?: string;
    email?: string;
    avatar_url?: string;
  };
  is_online?: boolean;
}

interface RoomMembersListProps {
  members: RoomMember[];
  isAdmin: boolean;
  roomId: string;
  currentUserId: string;
  onMemberRemoved?: () => void;
}

export const RoomMembersList: React.FC<RoomMembersListProps> = ({
  members,
  isAdmin,
  roomId,
  currentUserId,
  onMemberRemoved
}) => {
  const { toast } = useToast();
  
  const removeMember = async (memberId: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('room_members')
        .delete()
        .eq('room_id', roomId)
        .eq('user_id', userId);
        
      if (error) throw error;
      
      toast({
        title: "Member removed",
        description: "The member has been removed from this room."
      });
      
      if (onMemberRemoved) onMemberRemoved();
    } catch (error) {
      console.error("Error removing member:", error);
      toast({
        variant: "destructive",
        title: "Failed to remove member",
        description: "There was an error removing this member."
      });
    }
  };

  const getUserName = (member: RoomMember) => {
    return member.profiles?.full_name || member.profiles?.email || 'Unknown User';
  };
  
  const getUserInitials = (member: RoomMember) => {
    if (member.profiles?.full_name) {
      return member.profiles.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    
    if (member.profiles?.email) {
      return member.profiles.email[0].toUpperCase();
    }
    
    return 'U';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-gray-500" />
        <h3 className="text-lg font-medium">Members ({members.length})</h3>
      </div>
      
      {members.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No members found</div>
      ) : (
        <div className="space-y-3">
          {members.map(member => (
            <div key={member.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={member.profiles?.avatar_url} />
                    <AvatarFallback>{getUserInitials(member)}</AvatarFallback>
                  </Avatar>
                  {member.is_online && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{getUserName(member)}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={member.role === 'admin' ? "default" : "outline"} className="text-xs py-0 px-1.5">
                      {member.role}
                    </Badge>
                    {member.user_id === currentUserId && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800 text-xs py-0 px-1.5">
                        You
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              {isAdmin && member.user_id !== currentUserId && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className="text-red-600 dark:text-red-400 flex items-center gap-2"
                      onClick={() => removeMember(member.id, member.user_id)}
                    >
                      <UserMinus className="h-4 w-4" />
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
