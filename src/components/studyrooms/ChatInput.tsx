
import React, { useState, KeyboardEvent } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, PaperclipIcon, Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ChatInputProps {
  roomId: string;
  onMessageSent?: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  roomId,
  onMessageSent
}) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const sendMessage = async () => {
    if (!message.trim() || !user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('room_messages')
        .insert({
          room_id: roomId,
          user_id: user.id,
          content: message.trim()
        });

      if (error) throw error;
      
      setMessage('');
      if (onMessageSent) onMessageSent();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-end gap-2">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Smile className="h-5 w-5 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="text-center py-2 text-sm text-gray-500">
                Emoji picker will be implemented here
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <PaperclipIcon className="h-5 w-5 text-gray-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full justify-start">
                  <PaperclipIcon className="mr-2 h-4 w-4" />
                  Document
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PaperclipIcon className="mr-2 h-4 w-4" />
                  Image
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
          
        <div className="flex-1">
          <Textarea
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[44px] max-h-[120px] py-2.5 px-3 rounded-2xl resize-none"
            disabled={isSubmitting}
          />
        </div>
          
        <Button 
          onClick={sendMessage}
          disabled={!message.trim() || isSubmitting}
          size="icon"
          className="rounded-full h-10 w-10 bg-blue-500 hover:bg-blue-600"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
