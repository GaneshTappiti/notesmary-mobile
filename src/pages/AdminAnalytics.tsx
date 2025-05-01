
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart, PieChart, ActivitySquare, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UsageCharts } from '@/components/admin/UsageCharts';

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
            <div className="flex flex-wrap items-center justify-between gap-4">
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
            
            <div className="overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 max-w-[600px] mb-4">
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
                
                <TabsContent value="overview" className="space-y-6">
                  <UsageCharts />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Time Distribution</CardTitle>
                      <CardDescription>When users are most active on the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] w-full">
                        <div className="flex items-center justify-center h-full">
                          <p className="text-center text-muted-foreground">
                            Active time heatmap visualization
                            <br />
                            <span className="text-sm">(Displaying data for the selected time period)</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="users" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Active Users</CardTitle>
                        <CardDescription>User growth over the last 5 months</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px] w-full">
                          <div className="flex items-center justify-center h-full">
                            <div className="w-full p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                {monthlyUsersData.map((item, index) => (
                                  <Card key={index} className="overflow-hidden">
                                    <CardContent className="p-4">
                                      <div className="text-2xl font-bold">{item.y}</div>
                                      <p className="text-sm text-muted-foreground">{item.x}</p>
                                      <div className="mt-2 h-2 bg-gray-100 rounded-full">
                                        <div 
                                          className="h-full bg-primary rounded-full" 
                                          style={{ width: `${(item.y / 250) * 100}%` }}
                                        ></div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>User Demographics</CardTitle>
                        <CardDescription>Breakdown of user types and roles</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <div className="flex items-center justify-center h-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                              <Card className="overflow-hidden">
                                <CardContent className="p-4 flex flex-col items-center">
                                  <div className="text-3xl font-bold">1,870</div>
                                  <p className="text-lg">Students</p>
                                </CardContent>
                              </Card>
                              <Card className="overflow-hidden">
                                <CardContent className="p-4 flex flex-col items-center">
                                  <div className="text-3xl font-bold">420</div>
                                  <p className="text-lg">Faculty</p>
                                </CardContent>
                              </Card>
                              <Card className="overflow-hidden">
                                <CardContent className="p-4 flex flex-col items-center">
                                  <div className="text-3xl font-bold">540</div>
                                  <p className="text-lg">Alumni</p>
                                </CardContent>
                              </Card>
                              <Card className="overflow-hidden">
                                <CardContent className="p-4 flex flex-col items-center">
                                  <div className="text-3xl font-bold">4</div>
                                  <p className="text-lg">Admins</p>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Distribution</CardTitle>
                      <CardDescription>Analysis of content types and popularity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 w-full">
                          {notesBySubjectData.map((item, index) => (
                            <Card key={index} className="overflow-hidden">
                              <CardContent className="p-4">
                                <div className="text-xl font-bold">{item.value}%</div>
                                <p className="text-sm truncate">{item.id}</p>
                                <div className="mt-2 h-2 bg-gray-100 rounded-full">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${item.value}%` }}
                                  ></div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Most Popular Notes</CardTitle>
                      <CardDescription>Top downloaded and viewed notes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Most Downloaded</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              <li className="flex justify-between items-center">
                                <span>Advanced Calculus Notes</span>
                                <span className="font-semibold">421</span>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>Data Structures Tutorial</span>
                                <span className="font-semibold">348</span>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>Physics Formulas Cheatsheet</span>
                                <span className="font-semibold">287</span>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>Chemistry Lab Guide</span>
                                <span className="font-semibold">245</span>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>History Exam Prep</span>
                                <span className="font-semibold">198</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Most Viewed</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              <li className="flex justify-between items-center">
                                <span>Programming Basics 101</span>
                                <span className="font-semibold">1,203</span>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>Advanced Calculus Notes</span>
                                <span className="font-semibold">957</span>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>Machine Learning Guide</span>
                                <span className="font-semibold">842</span>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>Physics Formulas Cheatsheet</span>
                                <span className="font-semibold">768</span>
                              </li>
                              <li className="flex justify-between items-center">
                                <span>English Literature Notes</span>
                                <span className="font-semibold">659</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="engagement" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Engagement Metrics</CardTitle>
                      <CardDescription>Key engagement indicators over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Average Session</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center h-32">
                              <div className="text-center">
                                <div className="text-4xl font-bold">24.3</div>
                                <p className="text-muted-foreground">minutes</p>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Daily Active Users</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center h-32">
                              <div className="text-center">
                                <div className="text-4xl font-bold">427</div>
                                <p className="text-muted-foreground">users</p>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Retention Rate</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center h-32">
                              <div className="text-center">
                                <div className="text-4xl font-bold">78%</div>
                                <p className="text-muted-foreground">weekly</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Weekly Activity</CardTitle>
                        <CardDescription>User sessions by day of week</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <div className="grid grid-cols-7 gap-2 h-full items-end p-4">
                            {userActivityData.map((item, i) => (
                              <div key={i} className="flex flex-col items-center justify-end h-full">
                                <div 
                                  className="w-full bg-primary rounded-t-md" 
                                  style={{ height: `${(item.value / 100) * 100}%` }}
                                ></div>
                                <span className="text-xs mt-2">{item.day.substring(0, 3)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Feature Usage</CardTitle>
                        <CardDescription>Most popular platform features</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Note Uploads</span>
                              <span>78%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full">
                              <div className="h-full bg-primary rounded-full" style={{ width: "78%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>AI Answers</span>
                              <span>64%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full">
                              <div className="h-full bg-primary rounded-full" style={{ width: "64%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Study Rooms</span>
                              <span>53%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full">
                              <div className="h-full bg-primary rounded-full" style={{ width: "53%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Note Search</span>
                              <span>42%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full">
                              <div className="h-full bg-primary rounded-full" style={{ width: "42%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Analytics</span>
                              <span>31%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full">
                              <div className="h-full bg-primary rounded-full" style={{ width: "31%" }}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </PageContainer>
      </AdminLayout>
    </>
  );
};

export default AdminAnalytics;
