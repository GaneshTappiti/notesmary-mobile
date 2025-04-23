
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

interface CalendarCardProps {
  className?: string;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({ className }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample events for demonstration
  const events = [
    {
      id: 1, 
      title: 'Physics Study Group',
      time: '2:00 PM',
      avatar: 'https://ui-avatars.com/api/?name=P&background=4F46E5&color=fff',
      type: 'upcoming',
    },
    {
      id: 2, 
      title: 'Chemistry Notes Review',
      time: '3:30 PM',
      avatar: 'https://ui-avatars.com/api/?name=C&background=10B981&color=fff',
      type: 'scheduled',
    },
    {
      id: 3, 
      title: 'Math Group Meeting',
      time: '5:00 PM',
      avatar: 'https://ui-avatars.com/api/?name=M&background=F59E0B&color=fff',
      type: 'scheduled',
    },
  ];
  
  return (
    <Card className={cn("border-none shadow-sm overflow-hidden", className)}>
      <CardHeader className="px-6 pt-6 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <CalendarIcon size={18} className="text-blue-600" />
            Calendar
          </CardTitle>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {date ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="px-6 pb-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border p-3"
          />
        </div>
        
        <div className="pt-4 pb-2 px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Today's Schedule</h3>
            <Button size="sm" variant="outline" className="h-8 gap-1 text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700">
              <Plus size={14} />
              <span>Add Event</span>
            </Button>
          </div>
          
          <div className="space-y-3">
            {events.map(event => (
              <div 
                key={event.id} 
                className={cn(
                  "flex items-center p-3 rounded-lg transition-all",
                  event.type === 'upcoming' ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                )}
              >
                <Avatar className="h-9 w-9 mr-3">
                  <AvatarImage src={event.avatar} />
                  <AvatarFallback>{event.title[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                </div>
                {event.type === 'upcoming' && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400">
                    Next
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
