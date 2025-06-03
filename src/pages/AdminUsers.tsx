
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search,
  MoreHorizontal,
  UserCheck,
  UserX,
  User,
  PenLine
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

const AdminUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'faculty' | 'alumni' | 'admin'>('all');
  
  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Emma Thompson',
      email: 'emma.thompson@example.edu',
      role: 'student',
      status: 'active',
      joined: '2023-01-15',
      department: 'Computer Science',
      avatar: '',
      lastActive: '2023-04-14T14:30:00'
    },
    {
      id: '2',
      name: 'Michael Williams',
      email: 'michael.williams@example.edu',
      role: 'faculty',
      status: 'active',
      joined: '2022-08-23',
      department: 'Chemistry',
      avatar: '',
      lastActive: '2023-04-13T09:15:00'
    },
    {
      id: '3',
      name: 'Sophia Chen',
      email: 'sophia.chen@example.edu',
      role: 'student',
      status: 'active',
      joined: '2023-02-07',
      department: 'Physics',
      avatar: '',
      lastActive: '2023-04-14T18:45:00'
    },
    {
      id: '4',
      name: 'John Davis',
      email: 'john.davis@example.edu',
      role: 'alumni',
      status: 'active',
      joined: '2021-05-19',
      department: 'English',
      avatar: '',
      lastActive: '2023-04-12T10:20:00'
    },
    {
      id: '5',
      name: 'Jessica Brown',
      email: 'jessica.brown@example.edu',
      role: 'faculty',
      status: 'inactive',
      joined: '2022-11-30',
      department: 'Biology',
      avatar: '',
      lastActive: '2023-03-28T15:10:00'
    },
    {
      id: '6',
      name: 'Daniel Johnson',
      email: 'daniel.johnson@example.edu',
      role: 'admin',
      status: 'active',
      joined: '2022-06-12',
      department: 'Information Technology',
      avatar: '',
      lastActive: '2023-04-14T16:05:00'
    },
  ]);

  // Filter users based on search and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleViewProfile = (userId: string) => {
    toast({
      title: "View Profile",
      description: `Opening profile for user ${userId}`,
    });
    // In a real app, this would navigate to user profile page
    // navigate(`/admin/users/${userId}`);
  };

  const handleEditUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: `Opening edit form for user ${userId}`,
    });
    // In a real app, this would open an edit modal or navigate to edit page
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
    
    const user = users.find(u => u.id === userId);
    toast({
      title: "User Status Updated",
      description: `${user?.name} has been ${user?.status === 'active' ? 'deactivated' : 'activated'}`,
    });
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: 'suspended' }
          : user
      )
    );
    
    const user = users.find(u => u.id === userId);
    toast({
      title: "User Suspended",
      description: `${user?.name} has been suspended`,
      variant: "destructive"
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return null;
    }
  };
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-500">Admin</Badge>;
      case 'faculty':
        return <Badge className="bg-blue-500">Faculty</Badge>;
      case 'student':
        return <Badge variant="outline" className="border-green-500 text-green-500">Student</Badge>;
      case 'alumni':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Alumni</Badge>;
      default:
        return null;
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const formatLastActive = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return formatDate(dateTimeString);
    }
  };

  return (
    <>
      <Helmet>
        <title>User Management | Admin Dashboard</title>
      </Helmet>
      
      <div className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Users Management</h1>
            
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {roleFilter === 'all' ? 'All Roles' : 
                     roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setRoleFilter('all')}>
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('student')}>
                    Student
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('faculty')}>
                    Faculty
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('alumni')}>
                    Alumni
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('admin')}>
                    Admin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No users found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span>{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{formatDate(user.joined)}</TableCell>
                      <TableCell>{formatLastActive(user.lastActive)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View Profile"
                            onClick={() => handleViewProfile(user.id)}
                          >
                            <User className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                                <PenLine className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                {user.status === 'active' ? 'Deactivate' : 'Activate'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    className="text-red-500 focus:text-red-500"
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <UserX className="mr-2 h-4 w-4" />
                                    Suspend
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will suspend the user's account and prevent them from accessing the platform
                                      until you reactivate their account.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-500 hover:bg-red-600"
                                      onClick={() => handleSuspendUser(user.id)}
                                    >
                                      Suspend
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
