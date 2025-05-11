
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

export const UsageCharts: React.FC = () => {
  const [period, setPeriod] = useState("weekly");
  
  // Example loading state
  const isLoading = false;
  
  // Demo data for charts
  const weeklyEngagementData = [
    { day: "Mon", notes: 45, rooms: 12, messages: 134, colleges: 22 },
    { day: "Tue", notes: 52, rooms: 15, messages: 148, colleges: 22 },
    { day: "Wed", notes: 61, rooms: 18, messages: 162, colleges: 23 },
    { day: "Thu", notes: 58, rooms: 16, messages: 157, colleges: 23 },
    { day: "Fri", notes: 63, rooms: 20, messages: 179, colleges: 24 },
    { day: "Sat", notes: 42, rooms: 10, messages: 103, colleges: 24 },
    { day: "Sun", notes: 37, rooms: 8, messages: 89, colleges: 24 }
  ];
  
  const monthlyEngagementData = [
    { week: "Week 1", notes: 280, rooms: 75, messages: 823, colleges: 20 },
    { week: "Week 2", notes: 310, rooms: 82, messages: 912, colleges: 21 },
    { week: "Week 3", notes: 340, rooms: 88, messages: 967, colleges: 23 },
    { week: "Week 4", notes: 305, rooms: 80, messages: 885, colleges: 24 }
  ];
  
  const userRolesData = [
    { name: "Students", value: 1870 },
    { name: "Faculty", value: 420 },
    { name: "Alumni", value: 540 },
    { name: "Admins", value: 4 }
  ];
  
  const registrationData = [
    { month: "Jan", users: 124, colleges: 16 },
    { month: "Feb", users: 158, colleges: 17 },
    { month: "Mar", users: 197, colleges: 18 },
    { month: "Apr", users: 242, colleges: 19 },
    { month: "May", users: 289, colleges: 20 },
    { month: "Jun", users: 328, colleges: 21 },
    { month: "Jul", users: 354, colleges: 22 },
    { month: "Aug", users: 401, colleges: 22 },
    { month: "Sep", users: 435, colleges: 23 },
    { month: "Oct", users: 478, colleges: 23 },
    { month: "Nov", users: 512, colleges: 24 },
    { month: "Dec", users: 542, colleges: 24 }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {/* Engagement Chart */}
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">User Engagement</CardTitle>
              <CardDescription>
                Activity over time
              </CardDescription>
            </div>
            <Tabs defaultValue="weekly" className="w-[200px]" onValueChange={setPeriod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px] w-full">
              <LineChart 
                className="h-[300px]"
                data={period === "weekly" ? weeklyEngagementData : monthlyEngagementData}
                categories={["notes", "rooms", "messages", "colleges"]}
                colors={["#8b5cf6", "#3b82f6", "#ef4444", "#10b981"]}
                index={period === "weekly" ? "day" : "week"}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Registration Trend */}
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Registration Trends</CardTitle>
          <CardDescription>
            New users and colleges over the last year
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px] w-full">
              <BarChart 
                className="h-[300px]"
                data={registrationData}
                categories={["users", "colleges"]}
                colors={["#8b5cf6", "#10b981"]}
                index="month"
                valueFormatter={(value: number, category?: string) => {
                  if (category === "colleges") {
                    return value.toString();
                  }
                  return value.toLocaleString();
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
