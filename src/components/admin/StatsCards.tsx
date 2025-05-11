
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Video, CalendarDays, School } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const StatsCards: React.FC = () => {
  // In a real app, these would come from an API/database
  const stats = [
    {
      title: "Total Users",
      value: "2,834",
      icon: Users,
      change: "+12.5%",
      changeType: "positive"
    },
    {
      title: "Active Study Rooms",
      value: "42",
      icon: Video,
      change: "+8.2%",
      changeType: "positive"
    },
    {
      title: "Notes Pending Review",
      value: "18",
      icon: BookOpen,
      change: "-3.1%",
      changeType: "negative"
    },
    {
      title: "Events This Week",
      value: "5",
      icon: CalendarDays,
      change: "0.0%",
      changeType: "neutral"
    },
    {
      title: "Colleges",
      value: "24",
      icon: School,
      change: "+4.3%",
      changeType: "positive"
    }
  ];

  // Example loading state (set to false for now)
  const isLoading = false;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p 
                  className={`text-xs ${
                    stat.changeType === "positive" ? "text-green-500" : 
                    stat.changeType === "negative" ? "text-red-500" : 
                    "text-gray-500"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
