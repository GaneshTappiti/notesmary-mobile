
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Download,
  Info,
  ChevronRight,
  Activity,
  Database,
  Clock,
  HardDrive,
  School,
  Shield,
  BarChart3,
  Eye,
  Plus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
  // Sample data for the new dashboard
  const kpiData = {
    totalColleges: 24,
    activeAdmins: 18,
    notesShared: 15432,
    activeRooms: 127
  };

  const userGrowthData = [
    { month: 'Jan', users: 1200, newUsers: 120 },
    { month: 'Feb', users: 1350, newUsers: 150 },
    { month: 'Mar', users: 1580, newUsers: 230 },
    { month: 'Apr', users: 1820, newUsers: 240 },
    { month: 'May', users: 2100, newUsers: 280 },
    { month: 'Jun', users: 2450, newUsers: 350 },
    { month: 'Jul', users: 2800, newUsers: 350 },
    { month: 'Aug', users: 3200, newUsers: 400 },
  ];

  const recentEvents = [
    { id: 1, event: 'New college registration', college: 'MIT', time: '2 hours ago', type: 'success' },
    { id: 2, event: 'Admin access granted', college: 'Stanford', time: '4 hours ago', type: 'info' },
    { id: 3, event: 'High usage alert', college: 'Harvard', time: '6 hours ago', type: 'warning' },
    { id: 4, event: 'System maintenance completed', college: 'All Colleges', time: '1 day ago', type: 'success' },
    { id: 5, event: 'Storage limit reached', college: 'Cambridge', time: '2 days ago', type: 'error' },
  ];

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Super Admin Dashboard | Notex</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50/30">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">SA</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Super Admin</h1>
                <p className="text-sm text-gray-500">Last login: 2 hours ago from San Francisco, CA</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 days
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Info className="w-4 h-4 mr-2" />
                System Info
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Colleges"
              value={kpiData.totalColleges}
              icon={<School className="h-6 w-6 text-blue-500" />}
              trend="+2 this month"
              trendUp={true}
            />
            <KPICard
              title="Active Admins"
              value={kpiData.activeAdmins}
              icon={<Shield className="h-6 w-6 text-green-500" />}
              trend="+3 this week"
              trendUp={true}
            />
            <KPICard
              title="Notes Shared"
              value={kpiData.notesShared.toLocaleString()}
              icon={<FileText className="h-6 w-6 text-purple-500" />}
              trend="+12% this month"
              trendUp={true}
            />
            <KPICard
              title="Active Rooms"
              value={kpiData.activeRooms}
              icon={<Users className="h-6 w-6 text-orange-500" />}
              trend="+5 today"
              trendUp={true}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Growth Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>User Growth Over Time</span>
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorUsers)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Events</span>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.event}</p>
                        <p className="text-xs text-gray-500">{event.college}</p>
                        <p className="text-xs text-gray-400 mt-1">{event.time}</p>
                      </div>
                      <Badge className={`text-xs ${getEventBadgeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard
              title="Manage Colleges"
              description="View and manage all registered colleges"
              actionText="Go to Colleges"
              href="/admin/colleges"
              icon={<School className="h-6 w-6 text-blue-500" />}
            />
            <ActionCard
              title="System Analytics"
              description="View detailed system analytics and reports"
              actionText="View Analytics"
              href="/admin/analytics"
              icon={<BarChart3 className="h-6 w-6 text-green-500" />}
            />
            <ActionCard
              title="Audit Logs"
              description="Monitor all system activities and changes"
              actionText="View All Logs"
              href="/admin/logs"
              icon={<Activity className="h-6 w-6 text-purple-500" />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

interface KPICardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            <p className={`text-sm mt-2 flex items-center gap-1 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`h-4 w-4 ${trendUp ? 'rotate-0' : 'rotate-180'}`} />
              {trend}
            </p>
          </div>
          <div className="p-3 rounded-full bg-gray-100">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActionCardProps {
  title: string;
  description: string;
  actionText: string;
  href: string;
  icon: React.ReactNode;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, actionText, href, icon }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-gray-100">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
            <Button variant="outline" size="sm" className="mt-3">
              {actionText}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
