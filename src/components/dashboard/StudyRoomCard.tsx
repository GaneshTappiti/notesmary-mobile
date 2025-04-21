
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageSquare, Info, Clock } from 'lucide-react';

interface StudyRoomCardProps {
  id: string;
  title: string;
  participants: number;
  date: string;
  status: string;
  duration?: string;
  avatars?: string[];
}

export const StudyRoomCard: React.FC<StudyRoomCardProps> = ({
  id,
  title,
  participants,
  date,
  status,
  duration,
  avatars = []
}) => {
  const navigate = useNavigate();
  
  const getStatusBadge = () => {
    if (status === 'active') {
      return <Badge className="bg-green-500">Active</Badge>;
    } else if (status === 'scheduled') {
      return <Badge variant="outline" className="text-amber-600 border-amber-300">Scheduled</Badge>;
    } else {
      return <Badge variant="secondary">Completed</Badge>;
    }
  };
  
  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/study-room/${id}`);
  };
  
  const handleChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/study-room/${id}/chat`);
  };
  
  const handleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/study-room/${id}/info`);
  };
  
  return (
    <div 
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all cursor-pointer"
      onClick={() => navigate(`/study-room/${id}`)}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-base">{title}</h4>
        {getStatusBadge()}
      </div>
      
      <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
        {duration && (
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{duration}</span>
          </div>
        )}
        <span className="mx-1">•</span>
        <div className="flex items-center">
          <Users className="h-3.5 w-3.5 mr-1" />
          <span>{participants} participants</span>
        </div>
        <span className="mx-1">•</span>
        <div className="flex items-center">
          <span className="text-xs">{date}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex -space-x-2">
          {avatars.map((avatar, index) => (
            <Avatar key={index} className="border-2 border-white h-7 w-7">
              <AvatarImage src={avatar} alt="User" />
              <AvatarFallback>U{index}</AvatarFallback>
            </Avatar>
          ))}
          {participants > avatars.length && (
            <div className="bg-gray-100 dark:bg-gray-800 h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-900">
              +{participants - avatars.length}
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleJoin}
            className="flex items-center"
          >
            <Users className="mr-1 h-4 w-4" />
            Join
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleChat}
              className="flex-1 px-2"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleInfo}
              className="flex-1 px-2"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
