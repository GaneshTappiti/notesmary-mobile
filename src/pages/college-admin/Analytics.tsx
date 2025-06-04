
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Users, 
  FileText, 
  Clock, 
  Brain,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  Activity
} from 'lucide-react';
import { LineChart, BarChart } from '@/components/ui/chart';
import { Heatmap } from '@/components/ui/heatmap';

// Mock data for analytics
const kpiData = {
  totalLogins: { value: 2847, change: '+12%', trend: 'up' },
  notesUploaded: { value: 1543, change: '+23%', trend: 'up' },
  avgStudyTime: { value: '4.2h', change: '-3%', trend: 'down' },
  aiUsageRate: { value: '68%', change: '+15%', trend: 'up' }
};

const dailyActivityData = [
  { name: 'Mon', logins: 240, uploads: 45 },
  { name: 'Tue', logins: 198, uploads: 38 },
  { name: 'Wed', logins: 320, uploads: 52 },
  { name: 'Thu', logins: 285, uploads: 41 },
  { name: 'Fri', logins: 189, uploads: 33 },
  { name: 'Sat', logins: 156, uploads: 28 },
  { name: 'Sun', logins: 142, uploads: 25 }
];

const departmentData = [
  { name: 'Computer Science', notes: 425 },
  { name: 'Engineering', notes: 312 },
  { name: 'Business', notes: 268 },
  { name: 'Mathematics', notes: 189 },
  { name: 'Physics', notes: 156 },
  { name: 'Chemistry', notes: 134 }
];

const heatmapData = [
  { date: '2024-12-01', value: 3 },
  { date: '2024-12-02', value: 5 },
  { date: '2024-12-03', value: 2 },
  { date: '2024-12-04', value: 7 },
  { date: '2024-12-05', value: 4 },
  { date: '2024-12-06', value: 6 },
  { date: '2024-12-07', value: 3 }
];

const topContributors = [
  { name: 'Sarah Johnson', department: 'CS', uploads: 45, roomHours: 28, aiInteractions: 156 },
  { name: 'Mike Chen', department: 'ENG', uploads: 38, roomHours: 32, aiInteractions: 142 },
  { name: 'Emily Davis', department: 'BUS', uploads: 34, roomHours: 25, aiInteractions: 128 },
  { name: 'Alex Rodriguez', department: 'MATH', uploads: 29, roomHours: 22, aiInteractions: 98 },
  { name: 'Lisa Wang', department: 'PHY', uploads: 27, roomHours: 19, aiInteractions: 87 }
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');

  const handleExportData = () => {
    console.log('Exporting analytics data...');
    // Implementation for exporting data
  };

  const KPICard = ({ title, icon: Icon, value, change, trend }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend === 'up' ? (
            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
          )}
          <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
            {change}
          </span>
          <span className="ml-1">from last period</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Analytics | College Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Track user engagement and platform usage across your institution
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="90">This Semester</SelectItem>
                <SelectItem value="365">This Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={handleExportData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Logins"
            icon={Users}
            value={kpiData.totalLogins.value.toLocaleString()}
            change={kpiData.totalLogins.change}
            trend={kpiData.totalLogins.trend}
          />
          <KPICard
            title="Notes Uploaded"
            icon={FileText}
            value={kpiData.notesUploaded.value.toLocaleString()}
            change={kpiData.notesUploaded.change}
            trend={kpiData.notesUploaded.trend}
          />
          <KPICard
            title="Avg. Study Time"
            icon={Clock}
            value={kpiData.avgStudyTime.value}
            change={kpiData.avgStudyTime.change}
            trend={kpiData.avgStudyTime.trend}
          />
          <KPICard
            title="AI Usage Rate"
            icon={Brain}
            value={kpiData.aiUsageRate.value}
            change={kpiData.aiUsageRate.change}
            trend={kpiData.aiUsageRate.trend}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Daily Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Activity Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={dailyActivityData}
                    categories={['logins', 'uploads']}
                    colors={['#3b82f6', '#10b981']}
                    index="name"
                    className="h-80"
                  />
                </CardContent>
              </Card>

              {/* Department Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Notes by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={departmentData}
                    categories={['notes']}
                    colors={['#8b5cf6']}
                    index="name"
                    className="h-80"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Uploads</TableHead>
                      <TableHead>Room Hours</TableHead>
                      <TableHead>AI Interactions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topContributors.map((contributor, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{contributor.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{contributor.department}</Badge>
                        </TableCell>
                        <TableCell>{contributor.uploads}</TableCell>
                        <TableCell>{contributor.roomHours}h</TableCell>
                        <TableCell>{contributor.aiInteractions}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Upload Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={dailyActivityData}
                    categories={['uploads']}
                    colors={['#f59e0b']}
                    index="name"
                    className="h-80"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={departmentData}
                    categories={['notes']}
                    colors={['#ef4444']}
                    index="name"
                    className="h-64"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Study Activity Heatmap</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Hours studied per day over the last 3 months
                  </p>
                </CardHeader>
                <CardContent>
                  <Heatmap 
                    data={heatmapData}
                    className="w-full"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Daily Active Users</span>
                    <Badge>85%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Session Duration</span>
                    <Badge variant="outline">45 min avg</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Feature Adoption</span>
                    <Badge>72%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Study Room Usage</span>
                    <Badge variant="outline">68%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Analytics;
