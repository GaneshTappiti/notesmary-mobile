
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Pencil, Trash2, Eye } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { AddEditCollegeModal } from './AddEditCollegeModal';

// Mock data - would be replaced with API call
const mockColleges = [
  {
    id: '1',
    name: 'Stanford University',
    domain: 'stanford.edu',
    adminEmail: 'admin@stanford.edu',
    studentsCount: 15000,
    notesCount: 5243,
    activeRooms: 37,
    createdAt: '2024-09-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'MIT',
    domain: 'mit.edu',
    adminEmail: 'admin@mit.edu',
    studentsCount: 12500,
    notesCount: 6120,
    activeRooms: 42,
    createdAt: '2024-08-22',
    status: 'active'
  },
  {
    id: '3',
    name: 'Harvard University',
    domain: 'harvard.edu',
    adminEmail: 'admin@harvard.edu',
    studentsCount: 14200,
    notesCount: 4876,
    activeRooms: 29,
    createdAt: '2024-07-18',
    status: 'inactive'
  },
  {
    id: '4',
    name: 'Cambridge University',
    domain: 'cambridge.ac.uk',
    adminEmail: 'admin@cambridge.ac.uk',
    studentsCount: 10800,
    notesCount: 3215,
    activeRooms: 25,
    createdAt: '2024-09-10',
    status: 'active'
  },
];

export const CollegeList: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCollege, setEditingCollege] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filter colleges based on search term
  const filteredColleges = mockColleges.filter(college => 
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCollege = (id: string) => {
    navigate(`/admin/colleges/${id}`);
  };

  const handleEditCollege = (college: any) => {
    setEditingCollege(college);
    setIsEditModalOpen(true);
  };

  const handleDeleteCollege = (id: string) => {
    toast({
      title: "College Deleted",
      description: "The college has been successfully deleted.",
    });
    // In a real implementation, this would make an API call to delete the college
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Colleges</CardTitle>
          <CardDescription>Manage all colleges in the system</CardDescription>
          <div className="flex items-center mt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search colleges..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Admin Email</TableHead>
                  <TableHead className="text-center">Students</TableHead>
                  <TableHead className="text-center">Notes</TableHead>
                  <TableHead className="text-center">Active Rooms</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredColleges.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No colleges found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredColleges.map((college) => (
                    <TableRow key={college.id}>
                      <TableCell className="font-medium">{college.name}</TableCell>
                      <TableCell>{college.domain}</TableCell>
                      <TableCell>{college.adminEmail}</TableCell>
                      <TableCell className="text-center">{college.studentsCount.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{college.notesCount.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{college.activeRooms}</TableCell>
                      <TableCell>{new Date(college.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={college.status === 'active' ? 'outline' : 'destructive'}
                          className={
                            college.status === 'active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {college.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewCollege(college.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditCollege(college)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteCollege(college.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {editingCollege && (
        <AddEditCollegeModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          collegeData={editingCollege}
        />
      )}
    </>
  );
};
