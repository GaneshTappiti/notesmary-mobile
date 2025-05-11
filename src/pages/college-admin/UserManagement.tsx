
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  Mail,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.s@college.edu",
    department: "Computer Science",
    year: "3rd",
    status: "active",
    role: "student",
    avatarUrl: ""
  },
  {
    id: "2",
    name: "Priya Singh",
    email: "priya.s@college.edu",
    department: "Artificial Intelligence",
    year: "4th",
    status: "active",
    role: "moderator",
    avatarUrl: ""
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.k@college.edu",
    department: "Database Systems",
    year: "2nd",
    status: "suspended",
    role: "student",
    avatarUrl: ""
  },
  {
    id: "4",
    name: "Sneha Gupta",
    email: "sneha.g@college.edu",
    department: "Network Engineering",
    year: "3rd",
    status: "active",
    role: "student",
    avatarUrl: ""
  },
  {
    id: "5",
    name: "Vikram Patel",
    email: "vikram.p@college.edu",
    department: "Operating Systems",
    year: "1st",
    status: "active",
    role: "student",
    avatarUrl: ""
  }
];

const departments = ["All Departments", "Computer Science", "Artificial Intelligence", "Database Systems", "Network Engineering", "Operating Systems"];
const years = ["All Years", "1st", "2nd", "3rd", "4th"];
const statuses = ["All Statuses", "Active", "Suspended"];
const roles = ["All Roles", "Student", "Moderator"];

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [selectedUserForRole, setSelectedUserForRole] = useState<any>(null);
  const [newRole, setNewRole] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<"suspend" | "activate" | "reset">("suspend");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "All Departments" || user.department === selectedDepartment;
    const matchesYear = selectedYear === "All Years" || user.year === selectedYear;
    const matchesStatus = selectedStatus === "All Statuses" || 
      (selectedStatus.toLowerCase() === user.status);
    const matchesRole = selectedRole === "All Roles" || 
      (selectedRole.toLowerCase() === user.role);
    
    return matchesSearch && matchesDepartment && matchesYear && matchesStatus && matchesRole;
  });

  const handleRoleChange = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setSelectedUserForRole(user);
      setNewRole(user.role);
      setShowRoleDialog(true);
    }
  };

  const handleConfirmRoleChange = () => {
    console.log(`Changing role of user ${selectedUserForRole?.id} to ${newRole}`);
    // In a real app, you would call an API to update the user role
    setShowRoleDialog(false);
  };

  const handleAction = (type: "suspend" | "activate" | "reset", userId: string) => {
    setActionType(type);
    setSelectedUsers([userId]);
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = () => {
    console.log(`Performing action ${actionType} on users:`, selectedUsers);
    // In a real app, you would call an API to perform the action
    setShowConfirmDialog(false);
    setSelectedUsers([]);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const getActionButtonLabel = () => {
    switch (actionType) {
      case "suspend": return "Suspend Users";
      case "activate": return "Activate Users";
      case "reset": return "Reset Passwords";
    }
  };

  return (
    <>
      <Helmet>
        <title>User Management | College Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-1">Manage students and their access levels.</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="default"
              onClick={() => {
                setActionType("suspend");
                if (selectedUsers.length > 0) setShowConfirmDialog(true);
              }}
              disabled={selectedUsers.length === 0}
            >
              <UserX className="mr-2 h-4 w-4" />
              Suspend Selected
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="min-w-[100px]"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilterMenu && (
          <Card className="animate-in fade-in-50 slide-in-from-top-2 duration-200">
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(department => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-1 sm:col-span-3 flex justify-end gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSelectedDepartment("All Departments");
                    setSelectedYear("All Years");
                    setSelectedStatus("All Statuses");
                    setSelectedRole("All Roles");
                  }}
                >
                  Reset Filters
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => setShowFilterMenu(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Users Table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={toggleAllUsers}
                      aria-label="Select all users"
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                          aria-label={`Select ${user.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.year} Year</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.role === "moderator"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {user.role === "moderator" ? "Moderator" : "Student"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "active" ? "default" : "destructive"}
                          className={
                            user.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {user.status === "active" ? "Active" : "Suspended"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleRoleChange(user.id)}>
                              <Shield className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "active" ? (
                              <DropdownMenuItem 
                                onClick={() => handleAction("suspend", user.id)}
                                className="text-red-600"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleAction("activate", user.id)}
                                className="text-green-600"
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate User
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleAction("reset", user.id)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No users found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Change Role Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Update the role for {selectedUserForRole?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <RadioGroup value={newRole} onValueChange={setNewRole}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderator" id="moderator" />
                <Label htmlFor="moderator">Moderator</Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRoleChange}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "suspend" ? "Suspend Users" : 
               actionType === "activate" ? "Activate Users" : 
               "Reset Passwords"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "suspend" && "This will prevent selected users from accessing the platform."}
              {actionType === "activate" && "This will restore access for selected users."}
              {actionType === "reset" && "Password reset emails will be sent to selected users."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm font-medium">
              You are about to {actionType === "suspend" ? "suspend" : 
                               actionType === "activate" ? "activate" : 
                               "reset passwords for"} {selectedUsers.length} users.
            </p>
            {actionType === "reset" && (
              <p className="text-sm text-muted-foreground mt-2">
                Users will receive an email with instructions to set a new password.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmAction}
              variant={actionType === "suspend" ? "destructive" : "default"}
            >
              {getActionButtonLabel()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserManagement;
