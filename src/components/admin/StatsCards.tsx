
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, School, FileText, Activity } from 'lucide-react';

export const StatsCards = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Colleges',
      value: '43',
      change: '+3%',
      icon: School,
      color: 'text-green-600'
    },
    {
      title: 'Notes Shared',
      value: '15,234',
      change: '+23%',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      title: 'Study Sessions',
      value: '892',
      change: '+8%',
      icon: Activity,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
