
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  description,
  icon, 
  trend,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden border-none shadow-sm hover:shadow-md transition-all", className)}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <div className="flex items-baseline space-x-2 mt-1.5">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
              {trend && (
                <span className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600",
                )}>
                  {trend.isPositive ? '↑' : '↓'} {trend.value}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            )}
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
