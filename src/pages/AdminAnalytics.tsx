
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { BarChart, LineChart, PieChart, ActivitySquare, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for analytics
const userActivityData = [
  { day: 'Monday', value: 65 },
  { day: 'Tuesday', value: 59 },
  { day: 'Wednesday', value: 80 },
  { day: 'Thursday', value: 81 },
  { day: 'Friday', value: 56 },
  { day: 'Saturday', value: 40 },
  { day: 'Sunday', value: 30 },
];

const monthlyUsersData = [
  { x: 'Jan', y: 120 },
  { x: 'Feb', y: 170 },
  { x: 'Mar', y: 210 },
  { x: 'Apr', y: 190 },
  { x: 'May', y: 250 },
];

const notesBySubjectData = [
  { id: 'Computer Science', value: 35 },
  { id: 'Mathematics', value: 25 },
  { id: 'Physics', value: 15 },
  { id: 'Chemistry', value: 10 },
  { id: 'Biology', value: 8 },
  { id: 'Other', value: 7 },
];

const activeTimeData = [
  { id: '00:00', data: [{ x: 'Mon', y: 2 }, { x: 'Tue', y: 1 }, { x: 'Wed', y: 3 }, { x: 'Thu', y: 0 }, { x: 'Fri', y: 1 }, { x: 'Sat', y: 5 }, { x: 'Sun', y: 4 }] },
  { id: '04:00', data: [{ x: 'Mon', y: 0 }, { x: 'Tue', y: 1 }, { x: 'Wed', y: 0 }, { x: 'Thu', y: 1 }, { x: 'Fri', y: 0 }, { x: 'Sat', y: 2 }, { x: 'Sun', y: 3 }] },
  { id: '08:00', data: [{ x: 'Mon', y: 10 }, { x: 'Tue', y: 8 }, { x: 'Wed', y: 12 }, { x: 'Thu', y: 9 }, { x: 'Fri', y: 7 }, { x: 'Sat', y: 3 }, { x: 'Sun', y: 2 }] },
  { id: '12:00', data: [{ x: 'Mon', y: 14 }, { x: 'Tue', y: 11 }, { x: 'Wed', y: 13 }, { x: 'Thu', y: 15 }, { x: 'Fri', y: 10 }, { x: 'Sat', y: 7 }, { x: 'Sun', y: 8 }] },
  { id: '16:00', data: [{ x: 'Mon', y: 16 }, { x: 'Tue', y: 18 }, { x: 'Wed', y: 15 }, { x: 'Thu', y: 19 }, { x: 'Fri', y: 20 }, { x: 'Sat', y: 14 }, { x: 'Sun', y: 12 }] },
  { id: '20:00', data: [{ x: 'Mon', y: 8 }, { x: 'Tue', y: 9 }, { x: 'Wed', y: 10 }, { x: 'Thu', y: 7 }, { x: 'Fri', y: 12 }, { x: 'Sat', y: 15 }, { x: 'Sun', y: 11 }] },
];

const growthData = [
  {
    id: "Users",
    data: [
      { x: "Jan", y: 100 },
      { x: "Feb", y: 120 },
      { x: "Mar", y: 135 },
      { x: "Apr", y: 160 },
      { x: "May", y: 210 },
    ]
  },
  {
    id: "Notes",
    data: [
      { x: "Jan", y: 250 },
      { x: "Feb", y: 300 },
      { x: "Mar", y: 320 },
      { x: "Apr", y: 380 },
      { x: "May", y: 440 },
    ]
  },
  {
    id: "AI Queries",
    data: [
      { x: "Jan", y: 50 },
      { x: "Feb", y: 80 },
      { x: "Mar", y: 110 },
      { x: "Apr", y: 140 },
      { x: "May", y: 180 },
    ]
  }
];

const AdminAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  
  return (
    <>
      <Helmet>
        <title>Analytics | Admin Dashboard</title>
      </Helmet>
      
      <AdminLayout>
        <PageContainer className="py-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">Monitor platform usage and performance metrics.</p>
              </div>
              
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground mr-2">Time Range:</p>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Last 24 Hours</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-[600px]">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <ActivitySquare className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span>Users</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span>Content</span>
                </TabsTrigger>
                <TabsTrigger value="engagement" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  <span>Engagement</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Growth</CardTitle>
                      <CardDescription>Users, notes, and AI usage over time</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="h-[300px]">
                        <ResponsiveLine
                          data={growthData}
                          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                          xScale={{ type: 'point' }}
                          yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false,
                            reverse: false
                          }}
                          yFormat=" >-.2f"
                          axisTop={null}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Month',
                            legendOffset: 36,
                            legendPosition: 'middle'
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Count',
                            legendOffset: -40,
                            legendPosition: 'middle'
                          }}
                          colors={{ scheme: 'category10' }}
                          pointSize={10}
                          pointColor={{ theme: 'background' }}
                          pointBorderWidth={2}
                          pointBorderColor={{ from: 'serieColor' }}
                          pointLabelYOffset={-12}
                          useMesh={true}
                          legends={[
                            {
                              anchor: 'bottom',
                              direction: 'row',
                              justify: false,
                              translateX: 0,
                              translateY: 50,
                              itemsSpacing: 0,
                              itemDirection: 'left-to-right',
                              itemWidth: 80,
                              itemHeight: 20,
                              itemOpacity: 0.75,
                              symbolSize: 12,
                              symbolShape: 'circle',
                              symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            }
                          ]}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily User Activity</CardTitle>
                      <CardDescription>User sessions by day of week</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="h-[300px]">
                        <ResponsiveBar
                          data={userActivityData}
                          keys={['value']}
                          indexBy="day"
                          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                          padding={0.3}
                          colors={{ scheme: 'purple_blue' }}
                          axisTop={null}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Day',
                            legendPosition: 'middle',
                            legendOffset: 32
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Sessions',
                            legendPosition: 'middle',
                            legendOffset: -40
                          }}
                          labelSkipWidth={12}
                          labelSkipHeight={12}
                          role="application"
                          ariaLabel="User activity chart"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes by Subject</CardTitle>
                      <CardDescription>Distribution of notes across subjects</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="h-[300px]">
                        <ResponsivePie
                          data={notesBySubjectData}
                          margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
                          innerRadius={0.5}
                          padAngle={0.7}
                          cornerRadius={3}
                          activeOuterRadiusOffset={8}
                          colors={{ scheme: 'category10' }}
                          borderWidth={1}
                          borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]]
                          }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor="#333333"
                          arcLinkLabelsThickness={2}
                          arcLinkLabelsColor={{ from: 'color' }}
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor="#ffffff"
                          legends={[
                            {
                              anchor: 'bottom',
                              direction: 'row',
                              justify: false,
                              translateX: 0,
                              translateY: 50,
                              itemsSpacing: 0,
                              itemWidth: 100,
                              itemHeight: 18,
                              itemTextColor: '#999',
                              itemDirection: 'left-to-right',
                              itemOpacity: 1,
                              symbolSize: 18,
                              symbolShape: 'circle'
                            }
                          ]}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Time Heatmap</CardTitle>
                      <CardDescription>When users are most active on the platform</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="h-[400px]">
                        <ResponsiveHeatMap
                          data={activeTimeData}
                          margin={{ top: 40, right: 20, bottom: 60, left: 60 }}
                          valueFormat=">-.2f"
                          axisTop={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -90,
                            legend: '',
                            legendOffset: 46
                          }}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Day of Week',
                            legendPosition: 'middle',
                            legendOffset: 36
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Time of Day',
                            legendPosition: 'middle',
                            legendOffset: -40
                          }}
                          colors={{
                            type: 'sequential',
                            scheme: 'purples'
                          }}
                          emptyColor="#eeeeee"
                          legends={[
                            {
                              anchor: 'bottom',
                              translateX: 0,
                              translateY: 30,
                              length: 400,
                              thickness: 8,
                              direction: 'row',
                              tickPosition: 'after',
                              tickSize: 3,
                              tickSpacing: 4,
                              tickOverlap: false,
                              tickFormat: '>-.2f',
                              title: 'Activity Score →',
                              titleAlign: 'start',
                              titleOffset: 4
                            }
                          ]}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="users" className="mt-6">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Active Users</CardTitle>
                      <CardDescription>User growth over the last 5 months</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="h-[400px]">
                        <ResponsiveBar
                          data={monthlyUsersData}
                          keys={['y']}
                          indexBy="x"
                          margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                          padding={0.3}
                          valueScale={{ type: 'linear' }}
                          indexScale={{ type: 'band', round: true }}
                          colors={{ scheme: 'category10' }}
                          borderColor={{
                            from: 'color',
                            modifiers: [['darker', 1.6]]
                          }}
                          axisTop={null}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Month',
                            legendPosition: 'middle',
                            legendOffset: 32
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Users',
                            legendPosition: 'middle',
                            legendOffset: -40
                          }}
                          labelSkipWidth={12}
                          labelSkipHeight={12}
                          labelTextColor={{
                            from: 'color',
                            modifiers: [['darker', 1.6]]
                          }}
                          role="application"
                          ariaLabel="Monthly active users"
                          barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in month: "+e.indexValue}}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* More user-specific charts would go here */}
                </div>
              </TabsContent>
              
              <TabsContent value="content" className="mt-6">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Distribution</CardTitle>
                      <CardDescription>Analysis of content types and popularity</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="h-[400px]">
                        <ResponsivePie
                          data={notesBySubjectData}
                          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                          innerRadius={0.5}
                          padAngle={0.7}
                          cornerRadius={3}
                          activeOuterRadiusOffset={8}
                          colors={{ scheme: 'nivo' }}
                          borderWidth={1}
                          borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]]
                          }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor="#333333"
                          arcLinkLabelsThickness={2}
                          arcLinkLabelsColor={{ from: 'color' }}
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [['darker', 2]]
                          }}
                          legends={[
                            {
                              anchor: 'bottom',
                              direction: 'row',
                              justify: false,
                              translateX: 0,
                              translateY: 56,
                              itemsSpacing: 0,
                              itemWidth: 100,
                              itemHeight: 18,
                              itemTextColor: '#999',
                              itemDirection: 'left-to-right',
                              itemOpacity: 1,
                              symbolSize: 18,
                              symbolShape: 'circle'
                            }
                          ]}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* More content-specific charts would go here */}
                </div>
              </TabsContent>
              
              <TabsContent value="engagement" className="mt-6">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Engagement Metrics</CardTitle>
                      <CardDescription>Key engagement indicators over time</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="h-[400px]">
                        <ResponsiveLine
                          data={growthData}
                          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                          xScale={{ type: 'point' }}
                          yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false,
                            reverse: false
                          }}
                          yFormat=" >-.2f"
                          axisTop={null}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Month',
                            legendOffset: 36,
                            legendPosition: 'middle'
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Count',
                            legendOffset: -40,
                            legendPosition: 'middle'
                          }}
                          pointSize={10}
                          pointColor={{ theme: 'background' }}
                          pointBorderWidth={2}
                          pointBorderColor={{ from: 'serieColor' }}
                          pointLabelYOffset={-12}
                          useMesh={true}
                          legends={[
                            {
                              anchor: 'bottom-right',
                              direction: 'column',
                              justify: false,
                              translateX: 100,
                              translateY: 0,
                              itemsSpacing: 0,
                              itemDirection: 'left-to-right',
                              itemWidth: 80,
                              itemHeight: 20,
                              itemOpacity: 0.75,
                              symbolSize: 12,
                              symbolShape: 'circle',
                              symbolBorderColor: 'rgba(0, 0, 0, .5)',
                              effects: [
                                {
                                  on: 'hover',
                                  style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                  }
                                }
                              ]
                            }
                          ]}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* More engagement-specific charts would go here */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </PageContainer>
      </AdminLayout>
    </>
  );
};

export default AdminAnalytics;
