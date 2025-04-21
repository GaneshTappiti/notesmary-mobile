
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Info } from 'lucide-react';

interface StudyRoomCardProps {
  id: string;
  title: string;
  participants: number;
  date: string;
  status: string;
}

export const StudyRoomCard: React.FC<StudyRoomCardProps> = ({
  id,
  title,
  participants,
  date,
  status
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
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-medium text-base mb-1">{title}</h4>
          <div className="flex flex-wrap text-sm text-gray-500 dark:text-gray-400 gap-x-4 gap-y-1">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {participants} participants
            </div>
            <div className="flex items-center">
              <span className="text-xs">{date}</span>
            </div>
          </div>
          <div className="mt-2">
            {getStatusBadge()}
          </div>
        </div>
        
        <div className="flex sm:flex-col gap-2 self-end sm:self-auto">
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
              className="flex-1"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleInfo}
              className="flex-1"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
