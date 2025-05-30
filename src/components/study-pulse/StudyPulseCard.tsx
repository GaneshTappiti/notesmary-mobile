
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, MessageSquare } from 'lucide-react';

interface StudyPulseCardProps {
  id: string;
  title: string;
  host: string;
  type: 'public' | 'private';
  tags: string[];
  usersOnline: number;
  createdAt: string;
  description: string;
  lastMessage: string;
  onJoin: () => void;
}

export const StudyPulseCard = ({
  title,
  host,
  type,
  tags,
  usersOnline,
  createdAt,
  description,
  lastMessage,
  onJoin
}: StudyPulseCardProps) => {
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
      } else if (diffInMinutes < 1440) {
        return `${Math.floor(diffInMinutes / 60)}h ago`;
      } else {
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
      }
    } catch (error) {
      console.warn('Invalid date string:', dateString);
      return 'Recently';
    }
  };

  // Ensure tags is always an array
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={type === 'public' ? 'default' : 'secondary'}>
            {type}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(createdAt)}
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{title || 'Untitled Room'}</CardTitle>
        <p className="text-sm text-muted-foreground">by {host || 'Unknown'}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{description || 'No description available'}</p>
        
        <div className="flex flex-wrap gap-1">
          {safeTags.map((tag, index) => (
            <Badge key={`${tag}-${index}`} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {usersOnline || 0} online
          </div>
          <Button size="sm" onClick={onJoin} className="group-hover:bg-primary/90">
            Join Room
          </Button>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex items-start gap-2">
            <MessageSquare className="h-3 w-3 mt-0.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground line-clamp-2">
              {lastMessage || 'No recent messages'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
