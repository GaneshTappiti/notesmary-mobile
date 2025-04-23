
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface GoogleMeetIntegrationProps {
  roomId: string;
  isAdmin: boolean;
  meetLink?: string;
}

export const GoogleMeetIntegration: React.FC<GoogleMeetIntegrationProps> = ({
  roomId,
  isAdmin,
  meetLink
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const createMeeting = async () => {
    if (!user) return;
    
    setIsCreating(true);
    try {
      // Call the edge function to create a Google Meet link
      const { data, error } = await supabase.functions.invoke('create-google-meet', {
        body: {
          roomId,
          userId: user.id,
          summary: `Study Room Meeting (${roomId})`,
          description: 'A collaborative study session'
        }
      });

      if (error) {
        throw error;
      }

      if (data?.meetLink) {
        // Update the room with the meet link
        const { error: updateError } = await supabase
          .from('rooms')
          .update({ meet_link: data.meetLink })
          .eq('id', roomId);

        if (updateError) {
          throw updateError;
        }

        toast({
          title: "Meeting created!",
          description: "Google Meet link has been created and shared with all participants."
        });
      }
    } catch (error) {
      console.error("Error creating Google Meet:", error);
      toast({
        variant: "destructive",
        title: "Failed to create meeting",
        description: "There was an error creating the Google Meet link."
      });
    } finally {
      setIsCreating(false);
    }
  };

  const joinMeeting = () => {
    if (meetLink) {
      window.open(meetLink, '_blank');
    }
  };

  return (
    <div className="flex flex-col">
      {isAdmin && !meetLink ? (
        <Button 
          onClick={createMeeting} 
          disabled={isCreating}
          className="flex gap-2 items-center"
        >
          <Video size={18} />
          {isCreating ? "Creating..." : "Start Google Meet"}
        </Button>
      ) : meetLink ? (
        <Button 
          onClick={joinMeeting}
          variant="default"
          className="flex gap-2 items-center bg-green-600 hover:bg-green-700"
        >
          <ExternalLink size={18} />
          Join Google Meet
        </Button>
      ) : null}
    </div>
  );
};
