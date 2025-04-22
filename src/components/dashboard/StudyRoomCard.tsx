
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Clock } from 'lucide-react';

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
      return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
    } else if (status === 'scheduled') {
      return <Badge variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50">Scheduled</Badge>;
    } else {
      return <Badge variant="secondary">Completed</Badge>;
    }
  };
  
  return (
    <div 
      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-300 bg-white"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-base text-gray-900">{title}</h4>
        {getStatusBadge()}
      </div>
      
      <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 mb-3">
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
            <div className="bg-gray-100 h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
              +{participants - avatars.length}
            </div>
          )}
        </div>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => navigate(`/study-room/${id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
        >
          Join Again
        </Button>
      </div>
    </div>
  );
};
