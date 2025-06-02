
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  Clock,
  Settings,
  LogOut,
  Server,
  Database,
  Cpu
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('30');
  const [chartType, setChartType] = useState('area');
  const [systemInfoOpen, setSystemInfoOpen] = useState(false);

  // Enhanced sample data
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
      description: 'Successfully registered new college with 245 students'
    },
    { 
      id: 2, 
      title: 'Admin access granted', 
      source: 'Stanford University', 
      time: '4 hours ago', 
      status: 'info',
      description: 'New admin privileges assigned to Dr. Sarah Johnson'
    },
    { 
      id: 3, 
      title: 'High usage alert', 
      source: 'Harvard University', 
      time: '6 hours ago', 
      status: 'warning',
      description: 'Storage usage approaching 85% limit (8.5GB of 10GB)'
    },
    { 
      id: 4, 
      title: 'System maintenance completed', 
      source: 'All Colleges', 
      time: '1 day ago', 
      status: 'success',
      description: 'Scheduled database optimization finished successfully'
    },
    { 
      id: 5, 
      title: 'Storage limit reached', 
      source: 'Cambridge University', 
      time: '2 days ago', 
      status: 'error',
      description: 'Storage limit exceeded - immediate action required'
    },
    { 
      id: 6, 
      title: 'New study room created', 
      source: 'Yale University', 
      time: '3 days ago', 
      status: 'info',
      description: 'Advanced Mathematics study room created by Prof. Williams'
    },
  ];

  const systemInfo = {
    version: '2.1.4',
    uptime: '15 days, 4 hours',
    serverHealth: 'Excellent',
    dbConnections: 42,
    activeUsers: 1247,
    memoryUsage: '68%',
    cpuUsage: '23%',
    lastBackup: '2 hours ago'
  };

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
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleExportCSV = () => {
    const csvData = [
      ['Metric', 'Value', 'Date'],
      ['Total Colleges', kpiData.totalColleges, new Date().toISOString()],
      ['Active Admins', kpiData.activeAdmins, new Date().toISOString()],
      ['Notes Shared', kpiData.notesShared, new Date().toISOString()],
      ['Active Rooms', kpiData.activeRooms, new Date().toISOString()],
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Dashboard data exported to CSV file.",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "PDF export functionality would generate a comprehensive dashboard report.",
    });
  };

  const handleGlobalSearch = (term: string) => {
    if (term.trim()) {
      toast({
        title: "Search",
        description: `Searching for "${term}" across colleges, events, and users...`,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Super Admin Dashboard | Notex</title>
      </Helmet>
      
      <AdminLayout>
        <div className="h-full bg-gray-50/30">
          {/* Enhanced Header Section */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-lg">SA</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
                  <p className="text-sm text-gray-500">Welcome back! Last login: 2 hours ago from San Francisco, CA</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Enhanced Global Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search colleges, events, users..."
                    className="pl-10 w-72 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGlobalSearch(searchTerm)}
                  />
                </div>

                {/* Enhanced Date Filter */}
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-40 border-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                {/* Export Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleExportCSV}>
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportPDF}>
                      Export as PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* System Info Dialog */}
                <Dialog open={systemInfoOpen} onOpenChange={setSystemInfoOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <Info className="w-4 h-4 mr-2" />
                      System Info
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-blue-500" />
                        System Information
                      </DialogTitle>
                      <DialogDescription>
                        Current system status and performance metrics
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-600">Version</p>
                          <p className="text-gray-900">{systemInfo.version}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Uptime</p>
                          <p className="text-gray-900">{systemInfo.uptime}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Health Status</p>
                          <Badge className="bg-green-100 text-green-800">{systemInfo.serverHealth}</Badge>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Active Users</p>
                          <p className="text-gray-900">{systemInfo.activeUsers.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">DB Connections</p>
                          <p className="text-gray-900">{systemInfo.dbConnections}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Last Backup</p>
                          <p className="text-gray-900">{systemInfo.lastBackup}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Memory Usage</span>
                          <span className="text-sm text-gray-900">{systemInfo.memoryUsage}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: systemInfo.memoryUsage }}></div>
                        </div>
                        <div className="flex items-center justify-between mt-3 mb-2">
                          <span className="text-sm font-medium text-gray-600">CPU Usage</span>
                          <span className="text-sm text-gray-900">{systemInfo.cpuUsage}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: systemInfo.cpuUsage }}></div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Enhanced Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="relative border-gray-300">
                      <Bell className="w-4 h-4" />
                      <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">3</span>
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-96">
                    <div className="p-4 border-b">
                      <h4 className="font-semibold text-gray-900">Recent Notifications</h4>
                      <p className="text-sm text-gray-500">3 unread notifications</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {recentEvents.slice(0, 4).map((event) => (
                        <div key={event.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-start gap-3">
                            {getEventIcon(event.status)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{event.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-400">{event.source} • {event.time}</p>
                                <Badge className={`text-xs ${getEventBadgeColor(event.status)}`}>
                                  {event.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t bg-gray-50">
                      <Button 
                        variant="ghost" 
                        className="w-full text-sm justify-center" 
                        onClick={() => navigate('/admin/audit-logs')}
                      >
                        View All Notifications
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Enhanced User Avatar */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <User className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-3 py-2 border-b">
                      <p className="text-sm font-medium">Super Admin</p>
                      <p className="text-xs text-gray-500">admin@notex.com</p>
                    </div>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      System Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto">
            {/* Enhanced Interactive KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Total Colleges"
                value={kpiData.totalColleges}
                icon={<School className="h-6 w-6 text-blue-500" />}
                trend="+2 this month"
                trendUp={true}
                bgGradient="from-blue-50 to-blue-100"
                onClick={() => navigate('/admin/colleges')}
              />
              <KPICard
                title="Active Admins"
                value={kpiData.activeAdmins}
                icon={<Shield className="h-6 w-6 text-green-500" />}
                trend="+3 this week"
                trendUp={true}
                bgGradient="from-green-50 to-green-100"
                onClick={() => navigate('/admin/users')}
              />
              <KPICard
                title="Notes Shared"
                value={kpiData.notesShared.toLocaleString()}
                icon={<FileText className="h-6 w-6 text-purple-500" />}
                trend="+12% this month"
                trendUp={true}
                bgGradient="from-purple-50 to-purple-100"
                onClick={() => navigate('/admin/analytics')}
              />
              <KPICard
                title="Active Rooms"
                value={kpiData.activeRooms}
                icon={<Users className="h-6 w-6 text-orange-500" />}
                trend="+5 today"
                trendUp={true}
                bgGradient="from-orange-50 to-orange-100"
                onClick={() => navigate('/admin/analytics')}
              />
            </div>

            {/* Enhanced Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enhanced User Growth Chart */}
              <Card className="lg:col-span-2 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">User Growth Over Time</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Track platform adoption across all colleges</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={chartType} onValueChange={setChartType}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="area">Area Chart</SelectItem>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm" onClick={() => navigate('/admin/analytics')}>
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
                    {chartType === 'area' ? (
                      <AreaChart data={userGrowthData}>
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <Area 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#3b82f6" 
                          fillOpacity={1} 
                          fill="url(#colorUsers)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    ) : chartType === 'line' ? (
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
                        />
                      </LineChart>
                    ) : (
                      <BarChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Enhanced Recent Events Panel */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Recent Events</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Latest platform activities</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/admin/audit-logs')}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[320px] overflow-y-auto">
                    {recentEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer group">
                        <div className="mt-0.5">
                          {getEventIcon(event.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-2">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                {event.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{event.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <p className="text-xs text-gray-400">{event.source}</p>
                                <span className="text-xs text-gray-300">•</span>
                                <p className="text-xs text-gray-400">{event.time}</p>
                              </div>
                            </div>
                            <Badge className={`text-xs ml-2 ${getEventBadgeColor(event.status)}`}>
                              {event.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t mt-4">
                    <Button 
                      variant="ghost" 
                      className="w-full text-sm justify-center hover:bg-blue-50 hover:text-blue-600" 
                      onClick={() => navigate('/admin/events-announcements')}
                    >
                      View All Events
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <QuickAccessCard
                title="Manage Colleges"
                description="View and manage all registered colleges and their administrators"
                actionText="Go to Colleges"
                icon={<School className="h-6 w-6 text-blue-500" />}
                bgGradient="from-blue-50 to-blue-100"
                onClick={() => navigate('/admin/colleges')}
              />
              <QuickAccessCard
                title="System Analytics"
                description="View detailed analytics, usage trends, and performance data"
                actionText="View Analytics"
                icon={<BarChart3 className="h-6 w-6 text-green-500" />}
                bgGradient="from-green-50 to-green-100"
                onClick={() => navigate('/admin/analytics')}
              />
              <QuickAccessCard
                title="Audit Logs"
                description="Monitor all system activities, changes, and security events"
                actionText="View All Logs"
                icon={<Activity className="h-6 w-6 text-purple-500" />}
                bgGradient="from-purple-50 to-purple-100"
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
  bgGradient: string;
  onClick: () => void;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, trendUp, bgGradient, onClick }) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 transform group shadow-lg" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">{value}</p>
            <p className={`text-sm mt-2 flex items-center gap-1 font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`h-4 w-4 ${trendUp ? 'rotate-0' : 'rotate-180'}`} />
              {trend}
            </p>
          </div>
          <div className={`p-4 rounded-full bg-gradient-to-br ${bgGradient} group-hover:scale-110 transition-transform`}>
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
  icon: React.ReactNode;
  bgGradient: string;
  onClick: () => void;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ title, description, actionText, icon, bgGradient, onClick }) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group shadow-lg" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-4 rounded-full bg-gradient-to-br ${bgGradient} group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700">{description}</p>
            <Button variant="outline" size="sm" className="mt-4 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600">
              {actionText}
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
