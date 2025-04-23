
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

export interface ChatMessage {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user?: {
    full_name?: string;
    email?: string;
    avatar_url?: string;
  };
}

interface ChatMessageListProps {
  messages: ChatMessage[];
  loading?: boolean;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  loading = false
}) => {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // Group messages by date
  const getMessageDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'MMMM dd, yyyy');
    }
  };

  const groupedMessages: Record<string, ChatMessage[]> = {};
  messages.forEach(msg => {
    const dateKey = getMessageDate(msg.created_at);
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(msg);
  });

  // Get user initials for avatar fallback
  const getUserInitials = (msg: ChatMessage) => {
    if (msg.user?.full_name) {
      return msg.user.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    
    if (msg.user?.email) {
      return msg.user.email[0].toUpperCase();
    }
    
    return 'U';
  };

  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto flex-1">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <p className="text-lg font-medium">No messages yet</p>
          <p className="text-sm">Start the conversation!</p>
        </div>
      ) : (
        Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date} className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs">
                {date}
              </div>
            </div>
            
            {msgs.map(msg => {
              const isCurrentUser = msg.user_id === user?.id;
              
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={msg.user?.avatar_url} />
                      <AvatarFallback className="bg-blue-500 text-white text-xs">
                        {getUserInitials(msg)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div 
                    className={`max-w-[75%] md:max-w-[60%] p-3 rounded-lg ${
                      isCurrentUser 
                        ? 'bg-blue-500 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-gray-800 rounded-tl-none'
                    }`}
                  >
                    {!isCurrentUser && (
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                        {msg.user?.full_name || msg.user?.email || 'Unknown User'}
                      </p>
                    )}
                    <p className="break-words">{msg.content}</p>
                    <div className={`flex justify-end items-center gap-1 mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                      <span className="text-[10px]">{format(new Date(msg.created_at), 'h:mm a')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
