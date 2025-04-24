
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
    { day: "Mon", notes: 45, rooms: 12, messages: 134 },
    { day: "Tue", notes: 52, rooms: 15, messages: 148 },
    { day: "Wed", notes: 61, rooms: 18, messages: 162 },
    { day: "Thu", notes: 58, rooms: 16, messages: 157 },
    { day: "Fri", notes: 63, rooms: 20, messages: 179 },
    { day: "Sat", notes: 42, rooms: 10, messages: 103 },
    { day: "Sun", notes: 37, rooms: 8, messages: 89 }
  ];
  
  const monthlyEngagementData = [
    { week: "Week 1", notes: 280, rooms: 75, messages: 823 },
    { week: "Week 2", notes: 310, rooms: 82, messages: 912 },
    { week: "Week 3", notes: 340, rooms: 88, messages: 967 },
    { week: "Week 4", notes: 305, rooms: 80, messages: 885 }
  ];
  
  const userRolesData = [
    { name: "Students", value: 1870 },
    { name: "Faculty", value: 420 },
    { name: "Alumni", value: 540 },
    { name: "Admins", value: 4 }
  ];
  
  const registrationData = [
    { month: "Jan", users: 124 },
    { month: "Feb", users: 158 },
    { month: "Mar", users: 197 },
    { month: "Apr", users: 242 },
    { month: "May", users: 289 },
    { month: "Jun", users: 328 },
    { month: "Jul", users: 354 },
    { month: "Aug", users: 401 },
    { month: "Sep", users: 435 },
    { month: "Oct", users: 478 },
    { month: "Nov", users: 512 },
    { month: "Dec", users: 542 }
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
            <LineChart 
              className="h-[300px]"
              data={period === "weekly" ? weeklyEngagementData : monthlyEngagementData}
              categories={["notes", "rooms", "messages"]}
              colors={["#8b5cf6", "#3b82f6", "#ef4444"]}
              index={period === "weekly" ? "day" : "week"}
            />
          )}
        </CardContent>
      </Card>

      {/* User Roles Chart */}
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">User Registration Trend</CardTitle>
          <CardDescription>
            New user sign-ups over the last year
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <BarChart 
              className="h-[300px]"
              data={registrationData}
              categories={["users"]}
              colors={["#8b5cf6"]}
              index="month"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
