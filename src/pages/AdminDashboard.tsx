
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
  Export,
  Info,
  ChevronRight,
  Activity,
  Database,
  Clock,
  HardDrive
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const AdminDashboard = () => {
  // Sample data for charts
  const sessionsData = [
    { name: 'Firewalls', value: 3, percentage: 100 },
    { name: 'Ports', value: 12, percentage: 100 },
    { name: 'Servers', value: 233, percentage: 100 },
  ];

  const eventsData = [
    { month: 'Jan', critical: 12, error: 8, warning: 15 },
    { month: 'Feb', critical: 8, error: 12, warning: 10 },
    { month: 'Mar', critical: 15, error: 6, warning: 18 },
    { month: 'Apr', critical: 10, error: 14, warning: 12 },
    { month: 'May', critical: 18, error: 9, warning: 20 },
    { month: 'Jun', critical: 6, error: 16, warning: 8 },
  ];

  const salesData = [
    { month: 'Feb', online: 15000, offline: 8000, marketing: 12000 },
    { month: 'Mar', online: 18000, offline: 12000, marketing: 8000 },
    { month: 'Apr', online: 12000, offline: 15000, marketing: 18000 },
    { month: 'May', online: 22000, offline: 8000, marketing: 15000 },
    { month: 'Jun', online: 16000, offline: 18000, marketing: 12000 },
    { month: 'Jul', online: 25000, offline: 10000, marketing: 20000 },
    { month: 'Aug', online: 20000, offline: 14000, marketing: 16000 },
  ];

  const pieData = [
    { name: 'Online', value: 23342, color: '#ef4444' },
    { name: 'Offline', value: 13221, color: '#8b5cf6' },
    { name: 'Marketing', value: 1542, color: '#f97316' },
  ];

  const employeeData = [
    { name: 'Connor Chandler', amount: 4909 },
    { name: 'Russell Floyd', amount: 857 },
    { name: 'Douglas White', amount: 612 },
    { name: 'Alta Fletcher', amount: 233 },
    { name: 'Marguerite Pearson', amount: 233 },
    { name: 'Leonard Gutierrez', amount: 35 },
    { name: 'Helen Benson', amount: 43 },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard Overview | Notex Admin</title>
      </Helmet>
      
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">KO</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Kenneth Osborne</h1>
                <p className="text-sm text-gray-500">Your last login: 21h ago from newzealand.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 7 days
            </Button>
            <Button variant="outline" size="sm">
              <Export className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Info className="w-4 h-4 mr-2" />
              Info
            </Button>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions By Channel - Left */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Sessions By Channel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="54" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="12"
                      strokeDasharray={`${75 * 3.39} 339.292`}
                      className="transition-all duration-1000 ease-in-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Score</div>
                      <div className="text-2xl font-bold text-gray-900">75%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {sessionsData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-600">{item.name}({item.value})</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Events - Center */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Events</CardTitle>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Critical</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Error</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span>Warning</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={eventsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis hide />
                  <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="error" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="warning" stroke="#f97316" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Stats - Right */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Device Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Uptime</span>
                </div>
                <span className="text-sm font-medium">195 Days, 8 hours</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">First Seen</span>
                </div>
                <span className="text-sm font-medium">23 Sep 2019, 2:04PM</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Collected time</span>
                </div>
                <span className="text-sm font-medium">23 Sep 2019, 2:04PM</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Memory space</span>
                </div>
                <span className="text-sm font-medium">168.3GB</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '68%'}}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions By Channel - Employee Data */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Sessions By Channel</CardTitle>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>Employee Name</span>
                <span className="ml-auto">This Month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {employeeData.map((employee, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                    {employee.name}
                  </span>
                  <span className="text-sm font-medium">${employee.amount}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sales Analytics */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Sales Analytics</CardTitle>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Online</div>
                  <div className="text-lg font-bold text-red-500">23,342</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Offline</div>
                  <div className="text-lg font-bold text-purple-500">13,221</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Marketing</div>
                  <div className="text-lg font-bold text-orange-500">1,542</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis hide />
                  <Line type="monotone" dataKey="online" stroke="#ef4444" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="offline" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="marketing" stroke="#f97316" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Card Title - Earnings */}
          <div className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Card Title</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-xs text-blue-500 mb-1">Total Earning</div>
                  <div className="text-2xl font-bold text-gray-900">287,493$</div>
                  <div className="text-xs text-gray-500">1.4% Since Last Month</div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-blue-500 mb-1">Total Earning</div>
                  <div className="text-xl font-bold text-gray-900">87,493</div>
                  <div className="text-xs text-gray-500">5.43% Since Last Month</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={salesData.slice(-6)}>
                    <Bar dataKey="online" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
