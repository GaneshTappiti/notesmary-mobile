
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BarChart3, Calendar, Clock, BookOpen, Star, Award, BrainCircuit, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudyTimeChart } from "@/components/analytics/StudyTimeChart";
import { ProgressCard } from "@/components/analytics/ProgressCard";
import { StudyStreakCard } from "@/components/analytics/StudyStreakCard";
import { InsightCard } from "@/components/analytics/InsightCard";
import { AchievementBadge } from "@/components/analytics/AchievementBadge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const StudyAnalytics = () => {
  const [isSetup, setIsSetup] = useState(true);
  const [setupCompleted, setSetupCompleted] = useState(false);
  
  // Mock data for study time by subject
  const studyTimeData = [
    { name: "Mathematics", hours: 12, color: "#8b5cf6" },
    { name: "Computer Science", hours: 15, color: "#3b82f6" },
    { name: "Physics", hours: 8, color: "#10b981" },
    { name: "Chemistry", hours: 5, color: "#f97316" },
    { name: "Biology", hours: 7, color: "#ec4899" },
    { name: "English", hours: 3, color: "#6366f1" },
  ];

  // Mock data for weekly study time
  const weeklyData = [
    { name: "Mon", hours: 2 },
    { name: "Tue", hours: 3 },
    { name: "Wed", hours: 1.5 },
    { name: "Thu", hours: 4 },
    { name: "Fri", hours: 2.5 },
    { name: "Sat", hours: 5 },
    { name: "Sun", hours: 3 },
  ];

  // Mock data for subject distribution
  const subjectDistribution = [
    { name: "Mathematics", value: 25 },
    { name: "Computer Science", value: 30 },
    { name: "Physics", value: 15 },
    { name: "Chemistry", value: 10 },
    { name: "Biology", value: 15 },
    { name: "English", value: 5 },
  ];

  // Mock data for heatmap
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 90);

    for (let i = 0; i < 90; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Random value between 0 and 6
      const value = Math.random() > 0.3 ? Math.floor(Math.random() * 6) : 0;
      
      data.push({
        date: date.toISOString().split('T')[0],
        value,
      });
    }
    
    return data;
  };

  const heatmapData = generateHeatmapData();

  // Colors for the pie chart
  const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f97316", "#ec4899", "#6366f1"];

  // Mock AI insights
  const aiInsights = [
    {
      title: "You're consistently studying Computer Science",
      description: "Your focus on Computer Science is paying off! You've studied this subject for 15 hours this week.",
      actionText: "View learning path",
      type: "achievement",
    },
    {
      title: "Physics might need more attention",
      description: "We noticed your study time for Physics has decreased by 30% in the last two weeks.",
      actionText: "Find study materials",
      type: "warning",
    },
    {
      title: "Try early morning study sessions",
      description: "Based on your activity patterns, you're most productive during morning hours (6-9 AM).",
      actionText: "Set up reminders",
      type: "tip",
    },
  ];

  // Achievement badges
  const achievements = [
    {
      title: "Night Owl",
      description: "Studied late-night for 5+ days",
      type: "nightOwl" as const,
      unlocked: true,
    },
    {
      title: "Consistency King",
      description: "Completed study goal for 7 days straight",
      type: "consistency" as const,
      unlocked: true,
    },
    {
      title: "Note Taker",
      description: "Uploaded 10+ notes",
      type: "noteTaker" as const,
      unlocked: false,
    },
    {
      title: "Collaborator",
      description: "Joined 5+ study groups",
      type: "collaborator" as const,
      unlocked: true,
    },
    {
      title: "Top Learner",
      description: "In the top 10% of active users",
      type: "topLearner" as const,
      unlocked: false,
    },
    {
      title: "Streak Master",
      description: "Maintained a 14-day study streak",
      type: "streakMaster" as const,
      unlocked: false,
    },
  ];

  const handleSetupComplete = () => {
    setIsSetup(false);
    setSetupCompleted(true);
  };

  if (isSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <Navbar />
        <div className="pt-20 pb-8 px-4 max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Set Up Study Analytics</h1>
            <p className="text-gray-600">
              Customize your analytics to get personalized insights about your study patterns
            </p>
          </div>

          <Card className="border-none shadow-md mb-8">
            <CardContent className="pt-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSetupComplete();
              }}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Enable Analytics</h3>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">Track my study patterns</p>
                        <p className="text-sm text-gray-500">
                          Allow the app to collect data about your study habits
                        </p>
                      </div>
                      <div className="form-control">
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Study Goals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Daily study hours goal</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>1 hour</option>
                          <option>2 hours</option>
                          <option selected>3 hours</option>
                          <option>4 hours</option>
                          <option>5+ hours</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Weekly study days goal</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>3 days</option>
                          <option>4 days</option>
                          <option selected>5 days</option>
                          <option>6 days</option>
                          <option>7 days</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Subjects of Interest</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {["Mathematics", "Physics", "Chemistry", "Computer Science", "Biology", "English", "History", "Economics"].map((subject) => (
                        <label key={subject} className="flex items-center space-x-2">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" defaultChecked={["Mathematics", "Computer Science", "Physics", "Chemistry"].includes(subject)} />
                          <span>{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Notification Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
                        <span>Daily goal reminders</span>
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
                        <span>Weekly progress reports</span>
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
                        <span>Study streak alerts</span>
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">AI-Driven Insights</h3>
                    <div className="p-3 bg-purple-50 rounded-md border border-purple-100">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <BrainCircuit className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Enable personalized AI recommendations</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Our AI will analyze your study patterns and provide personalized recommendations to improve your learning
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700" type="submit">
                      Complete Setup
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <Navbar />
      <div className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Study Analytics</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Track your study patterns and get personalized insights
            </p>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Calendar size={16} />
              Last 30 Days
              <ChevronDown size={14} />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-6 bg-gray-100 p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="time-tracker" className="data-[state=active]:bg-white">
              <Clock className="h-4 w-4 mr-2" />
              Study Time
            </TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:bg-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white">
              <Award className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-white">
              <Lightbulb className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Main Dashboard Content - Left Column */}
              <div className="md:col-span-8 space-y-6">
                {/* Progress Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ProgressCard
                    title="Study Time"
                    value={21}
                    goal={30}
                    icon={<Clock className="h-4 w-4" />}
                    unit="hours"
                    colorClass="bg-blue-500"
                  />
                  <ProgressCard
                    title="Notes Viewed"
                    value={45}
                    goal={50}
                    icon={<BookOpen className="h-4 w-4" />}
                    unit="notes"
                    colorClass="bg-purple-500"
                  />
                  <ProgressCard
                    title="Weekly Streak"
                    value={5}
                    goal={7}
                    icon={<Star className="h-4 w-4" />}
                    unit="days"
                    colorClass="bg-amber-500"
                  />
                </div>

                {/* Study Time Chart */}
                <StudyTimeChart 
                  data={studyTimeData} 
                  title="Study Time by Subject (This Week)"
                />

                {/* Weekly Trend */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md font-medium">Weekly Study Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 w-full">
                      <ChartContainer
                        config={{
                          hours: { color: "#8b5cf6" },
                        }}
                      >
                        <LineChart
                          data={weeklyData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                nameKey="name"
                                formatter={(value) => [`${value} hours`, "Study Time"]}
                              />
                            }
                          />
                          <Line
                            type="monotone"
                            dataKey="hours"
                            stroke="var(--color-hours, #8b5cf6)"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Right Column */}
              <div className="md:col-span-4 space-y-6">
                {/* Study Streak */}
                <StudyStreakCard 
                  streakDays={42}
                  currentStreak={7}
                  heatmapData={heatmapData}
                />

                {/* Subject Distribution */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md font-medium">Subject Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ChartContainer
                        config={{
                          Mathematics: { color: "#8b5cf6" },
                          "Computer Science": { color: "#3b82f6" },
                          Physics: { color: "#10b981" },
                          Chemistry: { color: "#f97316" },
                          Biology: { color: "#ec4899" },
                          English: { color: "#6366f1" },
                        }}
                      >
                        <PieChart>
                          <Pie
                            data={subjectDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {subjectDistribution.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                nameKey="name"
                                formatter={(value) => [`${value}%`, "Time Spent"]}
                              />
                            }
                          />
                          <Legend />
                        </PieChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Top AI Insight */}
                <InsightCard 
                  title={aiInsights[0].title}
                  description={aiInsights[0].description}
                  actionText={aiInsights[0].actionText}
                  type={aiInsights[0].type as "tip" | "achievement" | "warning"}
                />
              </div>
            </div>
          </TabsContent>

          {/* Study Time Tab */}
          <TabsContent value="time-tracker">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Study Time Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StudyTimeChart 
                      data={studyTimeData} 
                      title="Study Time by Subject (This Month)"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-4">
                <StudyStreakCard 
                  streakDays={42}
                  currentStreak={7}
                  heatmapData={heatmapData}
                />
              </div>
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notes Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Notes Viewed</span>
                        <span className="text-sm font-medium">45/50</span>
                      </div>
                      <Progress value={90} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Notes Uploaded</span>
                        <span className="text-sm font-medium">12/20</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Notes Shared</span>
                        <span className="text-sm font-medium">8/15</span>
                      </div>
                      <Progress value={53} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Study Group Participation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Groups Joined</span>
                        <span className="text-sm font-medium">4/5</span>
                      </div>
                      <Progress value={80} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Active Discussions</span>
                        <span className="text-sm font-medium">7/10</span>
                      </div>
                      <Progress value={70} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Study Sessions</span>
                        <span className="text-sm font-medium">5/8</span>
                      </div>
                      <Progress value={62} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <AchievementBadge
                  key={index}
                  title={achievement.title}
                  description={achievement.description}
                  type={achievement.type}
                  unlocked={achievement.unlocked}
                />
              ))}
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <InsightCard
                  key={index}
                  title={insight.title}
                  description={insight.description}
                  actionText={insight.actionText}
                  type={insight.type as "tip" | "achievement" | "warning"}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyAnalytics;
