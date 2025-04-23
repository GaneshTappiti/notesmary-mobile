
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeSubscription } from './useRealtime';
import { useAuth } from '@/contexts/AuthContext';
import { RoomMember } from '@/components/studyrooms/RoomMembersList';
import { ChatMessage } from '@/components/studyrooms/ChatMessageList';

interface Room {
  id: string;
  name: string;
  description: string;
  created_by: string;
  is_private: boolean;
  password: string | null;
  created_at: string;
  meet_link: string | null;
}

export function useStudyRoom(roomId: string) {
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();

  // Realtime messages
  const { data: messages, setData: setMessages, isConnected: messagesConnected } = useRealtimeSubscription<ChatMessage>(
    'room_messages',
    {
      filter: 'room_id',
      filterValue: roomId
    }
  );

  // Realtime members
  const { data: members, setData: setMembers, isConnected: membersConnected } = useRealtimeSubscription<RoomMember>(
    'room_members',
    {
      filter: 'room_id',
      filterValue: roomId
    }
  );

  // Fetch initial data
  const fetchRoomData = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch room details
      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', roomId)
        .single();

      if (roomError) throw roomError;
      if (!roomData) throw new Error('Room not found');

      setRoom(roomData);

      // Fetch room messages with user info
      const { data: messagesData, error: messagesError } = await supabase
        .from('room_messages')
        .select(`
          *,
          profiles: user_id (
            full_name,
            email,
            avatar_url
          )
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      // Transform data to match the expected ChatMessage format
      const formattedMessages = messagesData.map(msg => ({
        ...msg,
        user: msg.profiles
      }));

      setMessages(formattedMessages);

      // Fetch room members with user info
      const { data: membersData, error: membersError } = await supabase
        .from('room_members')
        .select(`
          *,
          profiles: user_id (
            full_name,
            email,
            avatar_url
          )
        `)
        .eq('room_id', roomId);

      if (membersError) throw membersError;
      
      setMembers(membersData);

      // Check if current user is admin
      const currentMember = membersData.find(member => member.user_id === user.id);
      setIsAdmin(currentMember?.role === 'admin');

    } catch (err) {
      console.error("Error fetching room data:", err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [roomId, user, setMessages, setMembers]);

  useEffect(() => {
    if (user) {
      fetchRoomData();
    }
  }, [fetchRoomData, user]);

  // Function to leave the room
  const leaveRoom = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('room_members')
        .delete()
        .eq('room_id', roomId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      return true;
    } catch (err) {
      console.error("Error leaving room:", err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      return false;
    }
  };

  // Function to delete the room (admin only)
  const deleteRoom = async () => {
    if (!isAdmin || !user) return false;
    
    try {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', roomId)
        .eq('created_by', user.id);

      if (error) throw error;
      
      return true;
    } catch (err) {
      console.error("Error deleting room:", err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      return false;
    }
  };

  return {
    room,
    messages,
    members,
    isLoading,
    error,
    isAdmin,
    isConnected: messagesConnected && membersConnected,
    refreshData: fetchRoomData,
    leaveRoom,
    deleteRoom
  };
}
