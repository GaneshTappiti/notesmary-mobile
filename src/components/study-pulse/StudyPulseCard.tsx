
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Lock, Calendar, Clock, MessageSquare } from 'lucide-react';

interface StudyPulseCardProps {
  id: string;
  title: string;
  host: string;
  type: 'public' | 'private';
  tags: string[];
  usersOnline: number;
  createdAt: string;
  description: string;
  lastMessage?: string;
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
  lastMessage,
  onJoin
}) => {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const isRecent = new Date(createdAt) > new Date(Date.now() - 60 * 60 * 1000); // Within last hour
  
  // Generate random avatars for demo
  const avatars = Array(Math.min(3, usersOnline)).fill(0).map((_, i) => 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(host.split(' ')[0] + i)}&background=random&color=fff`
  );
  
  // Generate tag colors
  const getTagColor = (tag: string) => {
    const colors = {
      '#DSA': 'bg-blue-50 text-blue-700 border-blue-200',
      '#Algorithms': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      '#Math': 'bg-amber-50 text-amber-700 border-amber-200',
      '#Physics': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      '#Chemistry': 'bg-pink-50 text-pink-700 border-pink-200',
      '#Organic': 'bg-rose-50 text-rose-700 border-rose-200',
      '#Advanced': 'bg-violet-50 text-violet-700 border-violet-200',
      '#AI': 'bg-teal-50 text-teal-700 border-teal-200',
      '#ExamPrep': 'bg-orange-50 text-orange-700 border-orange-200',
    };
    
    return colors[tag as keyof typeof colors] || 'bg-purple-50 text-purple-700 border-purple-200';
  };
  
  return (
    <Card className={`border hover:shadow-md transition-all overflow-hidden group hover:scale-[1.02] hover:shadow-lg ${
      type === 'public' ? 'border-purple-200' : 'border-gray-200'
    } hover:border-purple-300 duration-200`}>
      <div className="relative">
        {isRecent && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
            <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
            LIVE
          </div>
        )}
        {type === 'private' && (
          <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 p-1 rounded-full">
            <Lock className="h-3.5 w-3.5" />
          </div>
        )}
      </div>
      
      <CardContent className="p-5 pt-8">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-base line-clamp-1">{title}</h3>
        </div>
        
        <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
          <Avatar className="h-5 w-5 border border-purple-200">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(host)}&background=random&color=fff`} alt={host} />
            <AvatarFallback>{host[0]}</AvatarFallback>
          </Avatar>
          <span>Host: {host}</span>
        </div>
        
        <div className="text-xs text-gray-400 flex items-center gap-1 mb-3">
          <Clock className="h-3 w-3" />
          <span>Started {timeAgo}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 h-10">
          {description}
        </p>
        
        {lastMessage && (
          <div className="bg-gray-50 rounded p-2 mb-3 text-xs text-gray-600 flex items-start gap-1.5">
            <MessageSquare className="h-3.5 w-3.5 mt-0.5 text-gray-500 flex-shrink-0" />
            <p className="line-clamp-2 italic">{lastMessage}</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className={`text-xs ${getTagColor(tag)}`}>
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
          className={`${type === 'public' 
            ? 'bg-purple-600 hover:bg-purple-700 hover:shadow-md transition-all' 
            : ''} group-hover:scale-105 duration-200`}
        >
          {type === 'public' ? 'Join' : 'Request'}
        </Button>
      </CardFooter>
    </Card>
  );
};
