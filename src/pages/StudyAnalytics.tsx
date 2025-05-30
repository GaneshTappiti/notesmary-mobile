
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudyTimeChart } from '@/components/analytics/StudyTimeChart';
import { StudyStreakCard } from '@/components/analytics/StudyStreakCard';
import { ProgressCard } from '@/components/analytics/ProgressCard';
import { InsightCard } from '@/components/analytics/InsightCard';
import { AchievementBadge } from '@/components/analytics/AchievementBadge';
import { Calendar, Clock, Target, TrendingUp, Award, Brain } from 'lucide-react';

const StudyAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // Mock data for analytics
  const studyStats = {
    totalHours: 34.5,
    streak: 7,
    completedGoals: 12,
    totalGoals: 15,
    averageSession: 2.3,
    productivity: 85
  };
  
  const weeklyData = [
    { day: 'Mon', hours: 3.5, subject: 'Physics' },
    { day: 'Tue', hours: 2.8, subject: 'Math' },
    { day: 'Wed', hours: 4.2, subject: 'Chemistry' },
    { day: 'Thu', hours: 1.9, subject: 'Biology' },
    { day: 'Fri', hours: 3.7, subject: 'Physics' },
    { day: 'Sat', hours: 5.1, subject: 'Math' },
    { day: 'Sun', hours: 2.3, subject: 'Review' }
  ];
  
  const achievements = [
    { id: 1, title: 'Study Streak Master', description: '7 days in a row', icon: '🔥', earned: true },
    { id: 2, title: 'Night Owl', description: 'Studied after 10 PM', icon: '🦉', earned: true },
    { id: 3, title: 'Early Bird', description: 'Studied before 7 AM', icon: '🌅', earned: false },
    { id: 4, title: 'Subject Explorer', description: 'Studied 5+ subjects', icon: '🎯', earned: true },
    { id: 5, title: 'Focus Champion', description: '3+ hour session', icon: '⚡', earned: true },
    { id: 6, title: 'Weekend Warrior', description: 'Studied on weekends', icon: '🛡️', earned: true }
  ];
  
  const insights = [
    {
      title: 'Best Study Time',
      description: 'You\'re most productive between 2-4 PM',
      type: 'positive' as const,
      action: 'Schedule more sessions during this time'
    },
    {
      title: 'Consistency Opportunity',
      description: 'Try studying for shorter periods more frequently',
      type: 'suggestion' as const,
      action: 'Aim for 30-45 minute focused sessions'
    },
    {
      title: 'Subject Balance',
      description: 'Great balance across different subjects this week',
      type: 'positive' as const,
      action: 'Keep up the varied study approach'
    }
  ];
  
  return (
    <>
      <Helmet>
        <title>Study Analytics | Notex</title>
      </Helmet>
      
      <div className="container max-w-7xl mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Study Analytics</h1>
            <p className="text-muted-foreground">Track your learning progress and insights</p>
          </div>
          
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="capitalize"
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{studyStats.totalHours}h</p>
                  <p className="text-sm text-muted-foreground">This week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{studyStats.streak}</p>
                  <p className="text-sm text-muted-foreground">Day streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{studyStats.productivity}%</p>
                  <p className="text-sm text-muted-foreground">Productivity</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{studyStats.completedGoals}/{studyStats.totalGoals}</p>
                  <p className="text-sm text-muted-foreground">Goals completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StudyTimeChart data={weeklyData} />
              </div>
              <div className="space-y-4">
                <StudyStreakCard streak={studyStats.streak} />
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Study Session
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Target className="mr-2 h-4 w-4" />
                      Set Weekly Goal
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Brain className="mr-2 h-4 w-4" />
                      Take Focus Test
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProgressCard 
                title="Weekly Goal" 
                current={studyStats.totalHours} 
                target={40} 
                unit="hours"
              />
              <ProgressCard 
                title="Monthly Streak" 
                current={studyStats.streak} 
                target={30} 
                unit="days"
              />
              <ProgressCard 
                title="Subject Mastery" 
                current={12} 
                target={20} 
                unit="topics"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insights.map((insight, index) => (
                <InsightCard key={index} {...insight} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} {...achievement} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default StudyAnalytics;
