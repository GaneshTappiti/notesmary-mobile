
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

interface ProgressItem {
  id: number;
  title: string;
  progress: number;
  color: string;
}

interface StudyProgressCardProps {
  title: string;
  items: ProgressItem[];
  className?: string;
}

export const StudyProgressCard: React.FC<StudyProgressCardProps> = ({ 
  title, 
  items,
  className 
}) => {
  // Function to get the appropriate color class for progress bars
  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
    };
    
    return colors[color] || 'bg-blue-500';
  };

  return (
    <Card className={cn("border-none shadow-sm", className)}>
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <FileText size={18} className="text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.title}</span>
                <span className="text-sm font-semibold">{item.progress}%</span>
              </div>
              <Progress 
                value={item.progress} 
                max={100} 
                className="h-2.5 bg-gray-100 dark:bg-gray-800"
                indicatorClassName={getColorClass(item.color)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
