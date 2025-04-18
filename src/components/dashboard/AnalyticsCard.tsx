
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BarChart, LineChart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';

interface AnalyticsCardProps {
  title: string;
  filters?: string[];
  chartType: 'line' | 'bar';
  className?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ 
  title,
  filters = ["Week", "Month", "Year", "All"],
  chartType,
  className
}) => {
  const [activeFilter, setActiveFilter] = React.useState(filters[0]);
  
  // Sample data for demo
  const lineData = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 25 },
    { name: "Apr", value: 55 },
    { name: "May", value: 40 },
    { name: "Jun", value: 65 },
    { name: "Jul", value: 60 },
    { name: "Aug", value: 75 },
    { name: "Sep", value: 85 },
    { name: "Oct", value: 70 },
    { name: "Nov", value: 90 },
    { name: "Dec", value: 100 }
  ];
  
  const barData = [
    { name: "Mon", value: 12 },
    { name: "Tue", value: 19 },
    { name: "Wed", value: 15 },
    { name: "Thu", value: 22 },
    { name: "Fri", value: 18 },
    { name: "Sat", value: 10 },
    { name: "Sun", value: 8 }
  ];
  
  return (
    <Card className={cn("overflow-hidden border-none shadow-sm", className)}>
      <CardHeader className="px-6 pt-6 pb-0 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex items-center space-x-1">
          {filters.map((filter) => (
            <Button 
              key={filter}
              variant={activeFilter === filter ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "text-xs h-7 px-3",
                activeFilter === filter 
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-gray-600 dark:text-gray-300"
              )}
            >
              {filter}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pt-6 pb-4 h-[250px]">
        {chartType === 'line' ? (
          <LineChart 
            data={lineData} 
            categories={["value"]}
            colors={["#3b82f6"]} 
            className="h-full w-full"
            showLegend={false}
            showAnimation={true}
            showYAxis={false}
            showTooltip={true}
            showGridLines={false}
            index="name"
          />
        ) : (
          <BarChart 
            data={barData} 
            categories={["value"]}
            colors={["#3b82f6"]} 
            className="h-full w-full"
            showLegend={false}
            showAnimation={true}
            showYAxis={false}
            showTooltip={true}
            showGridLines={false}
            index="name"
          />
        )}
      </CardContent>
    </Card>
  );
};
