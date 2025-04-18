
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StudyProgressItem {
  id: number;
  title: string;
  progress: number;
  color: string;
}

interface StudyProgressCardProps {
  title: string;
  items: StudyProgressItem[];
  className?: string;
}

// Function to get the appropriate color class based on the color name
const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
    teal: "bg-teal-500",
    indigo: "bg-indigo-500",
  };

  return colorMap[color] || "bg-gray-500";
};

export const StudyProgressCard: React.FC<StudyProgressCardProps> = ({
  title,
  items,
  className
}) => {
  return (
    <Card className={cn("border-none overflow-hidden shadow-sm", className)}>
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-sm text-gray-500">{item.progress}%</span>
              </div>
              <Progress 
                value={item.progress} 
                max={100}
                className="h-2 bg-gray-100 dark:bg-gray-700"
                indicatorClassName={getColorClass(item.color)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
