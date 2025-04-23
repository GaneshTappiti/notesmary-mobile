
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: {
    value: string;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <h3 className="text-2xl font-semibold mt-2">{value}</h3>
          </div>
          <div className={`p-2 rounded-full ${trend.isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1">
          {trend.isPositive ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.value}
          </span>
          <span className="text-gray-500 text-sm ml-1">vs last week</span>
        </div>
      </CardContent>
    </Card>
  );
};
