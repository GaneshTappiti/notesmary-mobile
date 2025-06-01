
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Users, 
  FileText, 
  School,
  Shield,
  TrendingUp, 
  Calendar,
  Download,
  Search,
  Bell,
  User,
  ChevronRight,
  Activity,
  BarChart3,
  Eye,
  Info,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('30');
  const [chartType, setChartType] = useState('area');

  // Sample data
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
    { 
      id: 1, 
      title: 'New college registration', 
      source: 'MIT', 
      time: '2 hours ago', 
      status: 'success',
      description: 'Successfully registered new college'
    },
    { 
      id: 2, 
      title: 'Admin access granted', 
      source: 'Stanford', 
      time: '4 hours ago', 
      status: 'info',
      description: 'New admin privileges assigned'
    },
    { 
      id: 3, 
      title: 'High usage alert', 
      source: 'Harvard', 
      time: '6 hours ago', 
      status: 'warning',
      description: 'Storage usage approaching limit'
    },
    { 
      id: 4, 
      title: 'System maintenance completed', 
      source: 'All Colleges', 
      time: '1 day ago', 
      status: 'success',
      description: 'Scheduled maintenance finished successfully'
    },
    { 
      id: 5, 
      title: 'Storage limit reached', 
      source: 'Cambridge', 
      time: '2 days ago', 
      status: 'error',
      description: 'Immediate action required'
    },
  ];

  const getEventIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getEventBadgeColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleExport = () => {
    console.log('Exporting dashboard data...');
  };

  const handleSystemInfo = () => {
    console.log('Opening system info modal...');
  };

  return (
    <>
      <Helmet>
        <title>Super Admin Dashboard | Notex</title>
      </Helmet>
      
      <AdminLayout>
        <div className="flex flex-col h-full bg-gray-50/30">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">SA</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
                  <p className="text-sm text-gray-500">Last login: 2 hours ago from San Francisco, CA</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Global Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search colleges, events, users..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Date Filter */}
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-32">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>

                {/* Export Button */}
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>

                {/* System Info Button */}
                <Button variant="outline" size="sm" onClick={handleSystemInfo}>
                  <Info className="w-4 h-4 mr-2" />
                  System Info
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="relative">
                      <Bell className="w-4 h-4" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-3 border-b">
                      <h4 className="font-medium">Notifications</h4>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {recentEvents.slice(0, 3).map((event) => (
                        <DropdownMenuItem key={event.id} className="p-3">
                          <div className="flex items-start gap-3">
                            {getEventIcon(event.status)}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{event.title}</p>
                              <p className="text-xs text-gray-500">{event.source} • {event.time}</p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/admin/audit-logs')}>
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Avatar */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Total Colleges"
                value={kpiData.totalColleges}
                icon={<School className="h-6 w-6 text-blue-500" />}
                trend="+2 this month"
                trendUp={true}
                onClick={() => navigate('/admin/colleges')}
              />
              <KPICard
                title="Active Admins"
                value={kpiData.activeAdmins}
                icon={<Shield className="h-6 w-6 text-green-500" />}
                trend="+3 this week"
                trendUp={true}
                onClick={() => navigate('/admin/colleges')}
              />
              <KPICard
                title="Notes Shared"
                value={kpiData.notesShared.toLocaleString()}
                icon={<FileText className="h-6 w-6 text-purple-500" />}
                trend="+12% this month"
                trendUp={true}
                onClick={() => navigate('/admin/analytics')}
              />
              <KPICard
                title="Active Rooms"
                value={kpiData.activeRooms}
                icon={<Users className="h-6 w-6 text-orange-500" />}
                trend="+5 today"
                trendUp={true}
                onClick={() => navigate('/admin/study-rooms')}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Growth Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>User Growth Over Time</CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={chartType} onValueChange={setChartType}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="area">Area Chart</SelectItem>
                          <SelectItem value="line">Line Chart</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    {chartType === 'area' ? (
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
                    ) : (
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Events Panel */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Events</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {recentEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        {getEventIcon(event.status)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                              <p className="text-xs text-gray-500">{event.source}</p>
                              <p className="text-xs text-gray-400 mt-1">{event.time}</p>
                            </div>
                            <Badge className={`text-xs ml-2 ${getEventBadgeColor(event.status)}`}>
                              {event.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t mt-4">
                    <Button 
                      variant="ghost" 
                      className="w-full text-sm" 
                      onClick={() => navigate('/admin/events-announcements')}
                    >
                      View All Events
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <QuickAccessCard
                title="Manage Colleges"
                description="View and manage all registered colleges"
                actionText="Go to Colleges"
                href="/admin/colleges"
                icon={<School className="h-6 w-6 text-blue-500" />}
                onClick={() => navigate('/admin/colleges')}
              />
              <QuickAccessCard
                title="System Analytics"
                description="View detailed system analytics and reports"
                actionText="View Analytics"
                href="/admin/analytics"
                icon={<BarChart3 className="h-6 w-6 text-green-500" />}
                onClick={() => navigate('/admin/analytics')}
              />
              <QuickAccessCard
                title="Audit Logs"
                description="Monitor all system activities and changes"
                actionText="View All Logs"
                href="/admin/audit-logs"
                icon={<Activity className="h-6 w-6 text-purple-500" />}
                onClick={() => navigate('/admin/audit-logs')}
              />
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

interface KPICardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  onClick: () => void;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, trendUp, onClick }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105" onClick={onClick}>
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

interface QuickAccessCardProps {
  title: string;
  description: string;
  actionText: string;
  href: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ title, description, actionText, icon, onClick }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={onClick}>
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
