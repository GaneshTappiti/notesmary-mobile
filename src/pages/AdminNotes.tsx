
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AdminLayout } from '@/components/admin/AdminLayout';
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
import { 
  Check, 
  Eye, 
  FileText, 
  MoreHorizontal, 
  Search, 
  Trash, 
  X 
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

const AdminNotes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  
  // Mock data for uploaded notes
  const notes = [
    {
      id: '1',
      title: 'Advanced Calculus Notes',
      course: 'Mathematics 401',
      uploader: 'Emma Thompson',
      uploadDate: '2023-04-15',
      status: 'pending',
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Organic Chemistry Lab Report',
      course: 'Chemistry 302',
      uploader: 'Michael Williams',
      uploadDate: '2023-04-14',
      status: 'approved',
      type: 'PDF',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Quantum Mechanics Study Guide',
      course: 'Physics 505',
      uploader: 'Sophia Chen',
      uploadDate: '2023-04-13',
      status: 'rejected',
      type: 'DOCX',
      size: '3.2 MB'
    },
    {
      id: '4',
      title: 'American Literature Analysis',
      course: 'English 301',
      uploader: 'John Davis',
      uploadDate: '2023-04-12',
      status: 'pending',
      type: 'PDF',
      size: '1.5 MB'
    },
    {
      id: '5',
      title: 'Human Anatomy Diagrams',
      course: 'Biology 201',
      uploader: 'Jessica Brown',
      uploadDate: '2023-04-11',
      status: 'approved',
      type: 'PDF',
      size: '4.7 MB'
    },
  ];

  // Filter notes based on search and status filter
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.uploader.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending Review</Badge>;
      default:
        return null;
    }
  };
  
  const handleApprove = (id: string) => {
    console.log(`Approving note with id: ${id}`);
    // In a real app, this would make an API call to update the status
  };
  
  const handleReject = (id: string) => {
    console.log(`Rejecting note with id: ${id}`);
    // In a real app, this would make an API call to update the status
  };
  
  const handleDelete = (id: string) => {
    console.log(`Deleting note with id: ${id}`);
    // In a real app, this would make an API call to delete the note
  };
  
  const handleViewNote = (id: string) => {
    console.log(`Viewing note with id: ${id}`);
    // In a real app, this would open the note for viewing
  };

  return (
    <>
      <Helmet>
        <title>Manage Notes | Admin Dashboard</title>
      </Helmet>
      
      <AdminLayout>
        <div className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-bold tracking-tight">Uploaded Notes</h1>
              
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search notes..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {statusFilter === 'all' ? 'All Status' : 
                       statusFilter === 'pending' ? 'Pending' :
                       statusFilter === 'approved' ? 'Approved' : 'Rejected'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                      All Status
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('approved')}>
                      Approved
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('rejected')}>
                      Rejected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Title</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Uploader</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type/Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No notes found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredNotes.map((note) => (
                      <TableRow key={note.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{note.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{note.course}</TableCell>
                        <TableCell>{note.uploader}</TableCell>
                        <TableCell>{new Date(note.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium">{note.type}</span>
                            <span className="text-xs text-muted-foreground">{note.size}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(note.status)}</TableCell>
                        <TableCell className="text-right">
                          {note.status === 'pending' ? (
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewNote(note.id)}
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-500 hover:text-green-600 hover:bg-green-50"
                                onClick={() => handleApprove(note.id)}
                                title="Approve"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleReject(note.id)}
                                title="Reject"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewNote(note.id)}
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
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
                                  {note.status === 'approved' ? (
                                    <DropdownMenuItem onClick={() => handleReject(note.id)}>
                                      Reject
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem onClick={() => handleApprove(note.id)}>
                                      Approve
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem
                                        className="text-red-500 focus:text-red-500"
                                        onSelect={(e) => e.preventDefault()}
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete the notes
                                          and remove the data from the server.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          className="bg-red-500 hover:bg-red-600"
                                          onClick={() => handleDelete(note.id)}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminNotes;
