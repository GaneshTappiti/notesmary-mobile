
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from 'lucide-react';

interface DashboardStatsCardProps {
  label: string;
  description: string;
  value: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

export const DashboardStatsCard: React.FC<DashboardStatsCardProps> = ({ 
  label, 
  description,
  value, 
  icon, 
  link,
  color
}) => {
  const navigate = useNavigate();
  
  // Map color string to the appropriate Tailwind classes
  const getBgColorClass = () => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-50 dark:bg-blue-900/30',
      green: 'bg-green-50 dark:bg-green-900/30',
      yellow: 'bg-yellow-50 dark:bg-yellow-900/30',
      purple: 'bg-purple-50 dark:bg-purple-900/30',
      amber: 'bg-amber-50 dark:bg-amber-900/30',
      red: 'bg-red-50 dark:bg-red-900/30',
    };
    
    return colorMap[color] || 'bg-gray-50 dark:bg-gray-800';
  };

  return (
    <Card 
      className="border-none shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] cursor-pointer overflow-hidden"
      onClick={() => navigate(link)}
    >
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex">
                  <HelpCircle className="h-3 w-3 text-gray-400" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">{description}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-2xl md:text-3xl font-bold mt-1 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${getBgColorClass()}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};
