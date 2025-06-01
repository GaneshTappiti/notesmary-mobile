
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PageContainer } from '@/components/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Download, Calendar, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Enhanced mock data with more realistic audit logs
const mockAuditLogs = [
  {
    id: '1',
    username: 'john.doe',
    email: 'john.doe@stanford.edu',
    role: 'Student',
    action: 'Login',
    actionType: 'login',
    details: 'Successful login from Chrome browser',
    timestamp: '2024-12-01 14:30:25',
    device: 'Chrome 120.0 (Windows 11)',
    ip: '192.168.1.15',
    status: 'success'
  },
  {
    id: '2',
    username: 'admin.smith',
    email: 'admin@stanford.edu',
    role: 'College Admin',
    action: 'Data Update',
    actionType: 'data_update',
    details: 'Updated user profile for student ID 12345',
    timestamp: '2024-12-01 13:45:12',
    device: 'Firefox 119.0 (macOS Sonoma)',
    ip: '10.0.0.25',
    status: 'success'
  },
  {
    id: '3',
    username: 'jane.wilson',
    email: 'jane.wilson@harvard.edu',
    role: 'Student',
    action: 'Login Failed',
    actionType: 'error',
    details: 'Failed login attempt - incorrect password (3rd attempt)',
    timestamp: '2024-12-01 12:15:33',
    device: 'Safari 17.1 (iOS 17.1)',
    ip: '172.16.0.8',
    status: 'error'
  },
  {
    id: '4',
    username: 'superadmin',
    email: 'superadmin@notex.com',
    role: 'Super Admin',
    action: 'Data Update',
    actionType: 'data_update',
    details: 'Created new college: MIT (mit.edu)',
    timestamp: '2024-12-01 11:20:18',
    device: 'Chrome 120.0 (Ubuntu 22.04)',
    ip: '203.0.113.10',
    status: 'success'
  },
  {
    id: '5',
    username: 'mike.brown',
    email: 'mike.brown@yale.edu',
    role: 'Student',
    action: 'Logout',
    actionType: 'logout',
    details: 'User logged out normally',
    timestamp: '2024-12-01 10:55:47',
    device: 'Chrome 120.0 (Windows 11)',
    ip: '198.51.100.5',
    status: 'success'
  },
  {
    id: '6',
    username: 'system',
    email: 'system@notex.com',
    role: 'System',
    action: 'Error',
    actionType: 'error',
    details: 'Database connection timeout during backup operation',
    timestamp: '2024-12-01 02:30:00',
    device: 'Server (Linux Ubuntu 22.04)',
    ip: '127.0.0.1',
    status: 'error'
  }
];

const AdminAuditLogs = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionTypeFilter, setActionTypeFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateeTo] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-purple-100 text-purple-800';
      case 'College Admin':
        return 'bg-blue-100 text-blue-800';
      case 'Student':
        return 'bg-gray-100 text-gray-800';
      case 'System':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionTypeColor = (actionType: string) => {
    switch (actionType) {
      case 'login':
        return 'bg-green-100 text-green-800';
      case 'logout':
        return 'bg-blue-100 text-blue-800';
      case 'data_update':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Enhanced filtering logic
  const filteredLogs = mockAuditLogs.filter(log => {
    // Search by username, email, or action
    const matchesSearch = 
      log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesActionType = actionTypeFilter === 'all' || log.actionType === actionTypeFilter;
    const matchesRole = roleFilter === 'all' || log.role === roleFilter;
    
    // Date filtering
    let matchesDateRange = true;
    if (dateFrom || dateTo) {
      const logDate = new Date(log.timestamp.split(' ')[0]);
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        matchesDateRange = matchesDateRange && logDate >= fromDate;
      }
      if (dateTo) {
        const toDate = new Date(dateTo);
        matchesDateRange = matchesDateRange && logDate <= toDate;
      }
    }
    
    return matchesSearch && matchesActionType && matchesRole && matchesDateRange;
  });

  const handleExportCSV = () => {
    const csvContent = [
      ['Username', 'Email', 'Role', 'Action', 'Details', 'Timestamp', 'Device', 'IP Address', 'Status'],
      ...filteredLogs.map(log => [
        log.username,
        log.email,
        log.role,
        log.action,
        log.details,
        log.timestamp,
        log.device,
        log.ip,
        log.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Audit logs exported to CSV file.",
    });
  };

  const handleExportPDF = () => {
    // In a real implementation, this would generate a PDF
    toast({
      title: "PDF Export",
      description: "PDF export functionality would be implemented here.",
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActionTypeFilter('all');
    setRoleFilter('all');
    setDateFrom('');
    setDateeTo('');
  };

  return (
    <>
      <Helmet>
        <title>Audit Logs | Super Admin</title>
      </Helmet>
      
      <AdminLayout>
        <PageContainer className="py-6">
          <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
                <p className="text-muted-foreground">Monitor all system activities and user actions</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleExportCSV} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button onClick={handleExportPDF} variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </div>

            {/* Enhanced Filters */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Search & Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {/* Enhanced Search */}
                  <div className="relative lg:col-span-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or action..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Action Type Filter */}
                  <Select value={actionTypeFilter} onValueChange={setActionTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Action Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="logout">Logout</SelectItem>
                      <SelectItem value="data_update">Data Update</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Role Filter */}
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="College Admin">College Admin</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="System">System</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Date Range Filters */}
                  <Input
                    type="date"
                    placeholder="From Date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                  
                  <Input
                    type="date"
                    placeholder="To Date"
                    value={dateTo}
                    onChange={(e) => setDateeTo(e.target.value)}
                  />
                </div>
                
                {/* Filter Summary */}
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  Showing {filteredLogs.length} of {mockAuditLogs.length} audit logs
                  {(searchTerm || actionTypeFilter !== 'all' || roleFilter !== 'all' || dateFrom || dateTo) && (
                    <span className="text-blue-600">with active filters</span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Audit Logs Table */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Device Info</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="h-24 text-center">
                            No audit logs found matching your criteria.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="font-medium">{log.username}</TableCell>
                            <TableCell className="text-sm">{log.email}</TableCell>
                            <TableCell>
                              <Badge className={getRoleColor(log.role)}>
                                {log.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">{log.action}</span>
                                <Badge className={getActionTypeColor(log.actionType)} variant="outline">
                                  {log.actionType.replace('_', ' ')}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <div className="truncate" title={log.details}>
                                {log.details}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm font-mono">{log.timestamp}</TableCell>
                            <TableCell className="text-sm">{log.device}</TableCell>
                            <TableCell className="text-sm font-mono">{log.ip}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(log.status)}>
                                {log.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </AdminLayout>
    </>
  );
};

export default AdminAuditLogs;
