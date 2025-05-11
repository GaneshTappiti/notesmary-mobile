
import React from 'react';
import { LineChart } from '@/components/ui/chart';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, Video, Clock } from 'lucide-react';

// Mock data for stats
const getCollegeStats = (collegeId: string) => {
  // In a real app, fetch from API based on collegeId
  return {
    studentsCount: 15000,
    notesCount: 5243,
    activeRooms: 37,
    averageSessionTime: '42 minutes',
    studentsData: [
      { month: 'Jan', students: 14200 },
      { month: 'Feb', students: 14350 },
      { month: 'Mar', students: 14500 },
      { month: 'Apr', students: 14580 },
      { month: 'May', students: 14650 },
      { month: 'Jun', students: 14800 },
      { month: 'Jul', students: 14900 },
      { month: 'Aug', students: 15000 }
    ],
    notesData: [
      { month: 'Jan', notes: 3900 },
      { month: 'Feb', notes: 4100 },
      { month: 'Mar', notes: 4300 },
      { month: 'Apr', notes: 4500 },
      { month: 'May', notes: 4700 },
      { month: 'Jun', notes: 4900 },
      { month: 'Jul', notes: 5100 },
      { month: 'Aug', notes: 5243 }
    ],
    roomsData: [
      { month: 'Jan', rooms: 22 },
      { month: 'Feb', rooms: 25 },
      { month: 'Mar', rooms: 28 },
      { month: 'Apr', rooms: 30 },
      { month: 'May', rooms: 32 },
      { month: 'Jun', rooms: 34 },
      { month: 'Jul', rooms: 36 },
      { month: 'Aug', rooms: 37 }
    ],
    sessionData: [
      { month: 'Jan', minutes: 30 },
      { month: 'Feb', minutes: 32 },
      { month: 'Mar', minutes: 35 },
      { month: 'Apr', minutes: 38 },
      { month: 'May', minutes: 40 },
      { month: 'Jun', minutes: 41 },
      { month: 'Jul', minutes: 42 },
      { month: 'Aug', minutes: 42 }
    ]
  };
};

interface CollegeStatsProps {
  collegeId: string;
}

export const CollegeStats: React.FC<CollegeStatsProps> = ({ collegeId }) => {
  const stats = getCollegeStats(collegeId);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatsCard
          title="Students"
          value={stats.studentsCount.toLocaleString()}
          icon={<Users className="h-4 w-4 text-blue-500" />}
        />
        <StatsCard
          title="Notes"
          value={stats.notesCount.toLocaleString()}
          icon={<FileText className="h-4 w-4 text-purple-500" />}
        />
        <StatsCard
          title="Active Rooms"
          value={stats.activeRooms.toString()}
          icon={<Video className="h-4 w-4 text-green-500" />}
        />
        <StatsCard
          title="Avg. Session"
          value={stats.averageSessionTime}
          icon={<Clock className="h-4 w-4 text-amber-500" />}
        />
      </div>
      
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="rooms">Study Rooms</TabsTrigger>
          <TabsTrigger value="sessions">Study Time</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students">
          <ChartCard
            data={stats.studentsData}
            categories={["students"]}
            index="month"
            colors={["#3b82f6"]}
            title="Student Enrollment"
          />
        </TabsContent>
        
        <TabsContent value="notes">
          <ChartCard
            data={stats.notesData}
            categories={["notes"]}
            index="month"
            colors={["#8b5cf6"]}
            title="Notes Uploaded"
          />
        </TabsContent>
        
        <TabsContent value="rooms">
          <ChartCard
            data={stats.roomsData}
            categories={["rooms"]}
            index="month"
            colors={["#22c55e"]}
            title="Active Study Rooms"
          />
        </TabsContent>
        
        <TabsContent value="sessions">
          <ChartCard
            data={stats.sessionData}
            categories={["minutes"]}
            index="month"
            colors={["#f59e0b"]}
            title="Average Study Session (minutes)"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ChartCardProps {
  data: any[];
  categories: string[];
  index: string;
  colors: string[];
  title: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ data, categories, index, colors, title }) => {
  return (
    <div className="h-[300px] w-full">
      <LineChart 
        className="h-[300px]"
        data={data}
        categories={categories}
        colors={colors}
        index={index}
        valueFormatter={(value: number) => value.toLocaleString()}
        chartLabel={title}
      />
    </div>
  );
};
