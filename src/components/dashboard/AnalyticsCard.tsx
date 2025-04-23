
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface AnalyticsCardProps {
  title: string;
  chartType: 'bar' | 'line';
  filters: string[];
}

// Sample data - in a real app this would come from props or an API
const data = [
  { name: 'Mon', hours: 4 },
  { name: 'Tue', hours: 3 },
  { name: 'Wed', hours: 5 },
  { name: 'Thu', hours: 2 },
  { name: 'Fri', hours: 4 },
  { name: 'Sat', hours: 6 },
  { name: 'Sun', hours: 3 },
];

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, chartType, filters }) => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={activeFilter === filter ? "bg-blue-600" : ""}
            >
              {filter}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar
                dataKey="hours"
                fill="#4F46E5"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
