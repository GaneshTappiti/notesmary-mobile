
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
import { Search, Filter, Download, Calendar } from 'lucide-react';

// Mock data
const mockAuditLogs = [
  {
    id: '1',
    user: 'admin@stanford.edu',
    userType: 'College Admin',
    action: 'User Created',
    details: 'Created new student account for john.doe@stanford.edu',
    date: '2024-12-01 14:30:25',
    device: 'Chrome/Windows',
    ip: '192.168.1.1',
    status: 'success'
  },
  {
    id: '2',
    user: 'superadmin@notex.com',
    userType: 'Super Admin',
    action: 'College Added',
    details: 'Added new college: MIT (mit.edu)',
    date: '2024-12-01 13:15:42',
    device: 'Firefox/MacOS',
    ip: '10.0.0.1',
    status: 'success'
  },
  {
    id: '3',
    user: 'student@harvard.edu',
    userType: 'Student',
    action: 'Login Failed',
    details: 'Failed login attempt - incorrect password',
    date: '2024-12-01 12:45:18',
    device: 'Safari/iOS',
    ip: '172.16.0.1',
    status: 'warning'
  },
  {
    id: '4',
    user: 'admin@mit.edu',
    userType: 'College Admin',
    action: 'Notes Approved',
    details: 'Approved 5 pending notes for Computer Science',
    date: '2024-12-01 11:20:33',
    device: 'Chrome/Windows',
    ip: '192.168.2.1',
    status: 'success'
  },
  {
    id: '5',
    user: 'system@notex.com',
    userType: 'System',
    action: 'Backup Created',
    details: 'Daily database backup completed successfully',
    date: '2024-12-01 02:00:00',
    device: 'Server/Linux',
    ip: '127.0.0.1',
    status: 'success'
  }
];

const AdminAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
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

  // Filter logs based on search and filters
  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUserType = userTypeFilter === 'all' || log.userType === userTypeFilter;
    const matchesAction = actionFilter === 'all' || log.action.includes(actionFilter);
    
    return matchesSearch && matchesUserType && matchesAction;
  });

  const handleExport = () => {
    // In a real implementation, this would export the audit logs
    console.log('Exporting audit logs...');
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
                <p className="text-muted-foreground">Monitor all system activities and changes</p>
              </div>
              <Button onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Logs
              </Button>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="User Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All User Types</SelectItem>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="College Admin">College Admin</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="System">System</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={actionFilter} onValueChange={setActionFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Action Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="Login">Login Actions</SelectItem>
                      <SelectItem value="User">User Actions</SelectItem>
                      <SelectItem value="College">College Actions</SelectItem>
                      <SelectItem value="Notes">Notes Actions</SelectItem>
                      <SelectItem value="Backup">Backup Actions</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Audit Logs Table */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>User Type</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No audit logs found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="font-medium">{log.user}</TableCell>
                            <TableCell>
                              <Badge className={getUserTypeColor(log.userType)}>
                                {log.userType}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">{log.action}</TableCell>
                            <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                            <TableCell className="text-sm">{log.date}</TableCell>
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
