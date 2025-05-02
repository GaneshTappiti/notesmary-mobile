
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Lock, Calendar, Clock } from 'lucide-react';

interface StudyPulseCardProps {
  id: string;
  title: string;
  host: string;
  type: 'public' | 'private';
  tags: string[];
  usersOnline: number;
  createdAt: string;
  description: string;
  onJoin: () => void;
}

export const StudyPulseCard: React.FC<StudyPulseCardProps> = ({
  id,
  title,
  host,
  type,
  tags,
  usersOnline,
  createdAt,
  description,
  onJoin
}) => {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  // Generate random avatars for demo
  const avatars = Array(Math.min(3, usersOnline)).fill(0).map((_, i) => 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(host.split(' ')[0] + i)}&background=random&color=fff`
  );
  
  return (
    <Card className={`border hover:shadow-md transition-all overflow-hidden ${
      type === 'public' ? 'border-purple-200' : 'border-gray-200'
    }`}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-base line-clamp-1">{title}</h3>
          {type === 'private' && (
            <Lock className="h-4 w-4 text-gray-500" />
          )}
        </div>
        
        <div className="text-sm text-gray-500 flex items-center gap-1 mb-2">
          <span>Host: {host}</span>
        </div>
        
        <div className="text-xs text-gray-400 flex items-center gap-1 mb-3">
          <Clock className="h-3 w-3" />
          <span>Started {timeAgo}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 h-10">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-2">
            {avatars.map((avatar, i) => (
              <Avatar key={i} className="border-2 border-white h-6 w-6">
                <AvatarImage src={avatar} alt="User avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Users className="h-3 w-3 mr-1" />
            <span>{usersOnline} online</span>
          </div>
        </div>
        
        <Button
          onClick={onJoin}
          variant={type === 'public' ? 'default' : 'outline'}
          size="sm"
          className={type === 'public' ? 'bg-purple-600 hover:bg-purple-700 hover:shadow-md transition-all' : ''}
        >
          {type === 'public' ? 'Join' : 'Request'}
        </Button>
      </CardFooter>
    </Card>
  );
};
