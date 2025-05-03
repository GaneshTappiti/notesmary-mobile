
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Video, Mic, MicOff, VideoOff, Phone, Users, Share2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface RoomMeetProps {
  roomId: string;
}

export const RoomMeet = ({ roomId }: RoomMeetProps) => {
  const { toast } = useToast();
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  
  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast({
      title: isAudioEnabled ? "Microphone Muted" : "Microphone Unmuted",
      description: isAudioEnabled ? "Your microphone is now muted" : "Your microphone is now active",
    });
  };
  
  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast({
      title: isVideoEnabled ? "Camera Off" : "Camera On",
      description: isVideoEnabled ? "Your camera is now off" : "Your camera is now active",
    });
  };
  
  const endCall = () => {
    toast({
      title: "Call Ended",
      description: "You've disconnected from the video call",
    });
  };
  
  const shareScreen = () => {
    toast({
      title: "Screen Sharing",
      description: "Screen sharing is not implemented yet",
    });
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex-1 relative">
        {/* Meeting place holder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-medium mb-2">Study Room Video Call</h2>
            <p className="text-gray-400 mb-6">
              This is a placeholder for video conferencing functionality.
            </p>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => {
                toast({
                  title: "Video Call",
                  description: "In a real app, this would initiate a video call",
                });
              }}
            >
              Start Video Call
            </Button>
          </div>
        </div>
      </div>
      
      {/* Video call controls */}
      <div className="bg-gray-800 p-3 flex items-center justify-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white"
          onClick={toggleAudio}
        >
          {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-red-500" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white"
          onClick={toggleVideo}
        >
          {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-red-500" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white"
          onClick={shareScreen}
        >
          <Share2 className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white"
        >
          <Users className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="destructive"
          size="icon" 
          className="rounded-full w-10 h-10"
          onClick={endCall}
        >
          <Phone className="h-5 w-5 rotate-135" />
        </Button>
      </div>
    </div>
  );
};
