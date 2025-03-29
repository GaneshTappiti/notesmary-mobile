
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  value: number;
  goal: number;
  icon: React.ReactNode;
  unit?: string;
  colorClass?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  value,
  goal,
  icon,
  unit = "hours",
  colorClass = "bg-blue-500",
}) => {
  const percentage = Math.min(Math.round((value / goal) * 100), 100);

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${colorClass.replace('bg-', 'bg-opacity-10 text-')}`}>
            {icon}
          </div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xl font-bold">{value} {unit}</span>
          <span className="text-sm text-gray-500">Goal: {goal} {unit}</span>
        </div>
        <Progress 
          value={percentage} 
          className="h-2" 
        />
        <div className="text-xs text-right mt-1 text-gray-500">
          {percentage}% completed
        </div>
      </CardContent>
    </Card>
  );
};
