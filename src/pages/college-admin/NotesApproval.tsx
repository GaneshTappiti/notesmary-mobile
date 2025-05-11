
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
  CheckCircle, 
  XCircle, 
  FileText, 
  Download, 
  Eye, 
  Search, 
  CalendarIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';

// Mock data for demonstration
const mockNotes = [
  {
    id: "1",
    title: "Introduction to Data Structures",
    subject: "Computer Science",
    uploader: "Rahul Sharma",
    email: "rahul.s@college.edu",
    uploadedAt: "2025-05-10T10:30:00",
    fileUrl: "#",
    status: "pending"
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals",
    subject: "Artificial Intelligence",
    uploader: "Priya Singh",
    email: "priya.s@college.edu",
    uploadedAt: "2025-05-09T14:15:00",
    fileUrl: "#",
    status: "approved"
  },
  {
    id: "3",
    title: "Database Normalization",
    subject: "Database Systems",
    uploader: "Amit Kumar",
    email: "amit.k@college.edu",
    uploadedAt: "2025-05-09T09:45:00",
    fileUrl: "#",
    status: "pending"
  },
  {
    id: "4",
    title: "Computer Networks Protocols",
    subject: "Network Engineering",
    uploader: "Sneha Gupta",
    email: "sneha.g@college.edu",
    uploadedAt: "2025-05-08T16:20:00",
    fileUrl: "#",
    status: "rejected"
  },
  {
    id: "5",
    title: "Operating System Architecture",
    subject: "Operating Systems",
    uploader: "Vikram Patel",
    email: "vikram.p@college.edu",
    uploadedAt: "2025-05-08T11:05:00",
    fileUrl: "#",
    status: "pending"
  }
];

const NotesApproval: React.FC = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [viewingNote, setViewingNote] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  // Filter notes based on current tab, search query and date
  const filteredNotes = mockNotes.filter(note => {
    const matchesTab = activeTab === "all" || note.status === activeTab;
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.uploader.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = !selectedDate || 
      new Date(note.uploadedAt).toDateString() === selectedDate.toDateString();
    
    return matchesTab && matchesSearch && matchesDate;
  });

  const handleApprove = (noteId: string) => {
    console.log(`Approving note ${noteId}`);
    // In a real app, you would call an API to update the note status
    // setNotes(notes.map(note => note.id === noteId ? { ...note, status: "approved" } : note));
  };

  const handleReject = (noteId: string) => {
    setShowRejectDialog(true);
    setViewingNote(mockNotes.find(note => note.id === noteId));
  };

  const confirmReject = () => {
    console.log(`Rejecting note ${viewingNote?.id} with reason: ${rejectionReason}`);
    // In a real app, you would call an API to update the note status
    setShowRejectDialog(false);
    setRejectionReason("");
    setViewingNote(null);
  };

  const handleViewNote = (note: any) => {
    setViewingNote(note);
  };

  return (
    <>
      <Helmet>
        <title>Notes Approval | College Admin</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notes Approval</h1>
          <p className="text-muted-foreground mt-1">Review and approve student notes.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by title, subject, or uploader..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-80"
            />
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Filter by date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
                {selectedDate && (
                  <div className="p-3 border-t border-gray-100 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedDate(undefined)}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Tabs and Table */}
        <Card>
          <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6 pt-4 border-b border-gray-100">
              <TabsList className="w-full sm:w-auto grid grid-cols-3 h-9">
                <TabsTrigger value="pending" className="text-xs sm:text-sm">
                  Pending <Badge className="ml-1 bg-amber-500" variant="secondary">{mockNotes.filter(n => n.status === "pending").length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="approved" className="text-xs sm:text-sm">
                  Approved <Badge className="ml-1 bg-green-500" variant="secondary">{mockNotes.filter(n => n.status === "approved").length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="rejected" className="text-xs sm:text-sm">
                  Rejected <Badge className="ml-1 bg-red-500" variant="secondary">{mockNotes.filter(n => n.status === "rejected").length}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="pending" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotes.length > 0 ? (
                      filteredNotes.map(note => (
                        <TableRow key={note.id}>
                          <TableCell className="font-medium">{note.title}</TableCell>
                          <TableCell>{note.subject}</TableCell>
                          <TableCell>
                            <div>{note.uploader}</div>
                            <div className="text-xs text-gray-500">{note.email}</div>
                          </TableCell>
                          <TableCell>{format(new Date(note.uploadedAt), "MMM d, yyyy")}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => handleViewNote(note)}>
                                    <Eye className="h-4 w-4 mr-1" /> View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>{note.title}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                      <div>
                                        <p><strong>Subject:</strong> {note.subject}</p>
                                        <p><strong>Uploaded By:</strong> {note.uploader} ({note.email})</p>
                                      </div>
                                      <div>
                                        <p><strong>Date:</strong> {format(new Date(note.uploadedAt), "PPP")}</p>
                                      </div>
                                    </div>
                                    <div className="border rounded-md p-6 min-h-[300px] flex items-center justify-center">
                                      <div className="text-center">
                                        <FileText className="h-16 w-16 mx-auto text-gray-300" />
                                        <p className="mt-2 text-gray-500">Preview not available</p>
                                        <Button className="mt-4" variant="outline">
                                          <Download className="h-4 w-4 mr-2" /> Download File
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApprove(note.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" /> Approve
                              </Button>
                              
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                onClick={() => handleReject(note.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" /> Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No notes found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="approved" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotes.length > 0 ? (
                      filteredNotes.map(note => (
                        <TableRow key={note.id}>
                          <TableCell className="font-medium">{note.title}</TableCell>
                          <TableCell>{note.subject}</TableCell>
                          <TableCell>
                            <div>{note.uploader}</div>
                            <div className="text-xs text-gray-500">{note.email}</div>
                          </TableCell>
                          <TableCell>{format(new Date(note.uploadedAt), "MMM d, yyyy")}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleViewNote(note)}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No approved notes found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="rejected" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotes.length > 0 ? (
                      filteredNotes.map(note => (
                        <TableRow key={note.id}>
                          <TableCell className="font-medium">{note.title}</TableCell>
                          <TableCell>{note.subject}</TableCell>
                          <TableCell>
                            <div>{note.uploader}</div>
                            <div className="text-xs text-gray-500">{note.email}</div>
                          </TableCell>
                          <TableCell>{format(new Date(note.uploadedAt), "MMM d, yyyy")}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleViewNote(note)}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No rejected notes found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm">
              <p><strong>Title:</strong> {viewingNote?.title}</p>
              <p><strong>Uploaded By:</strong> {viewingNote?.uploader}</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="rejection-reason" className="text-sm font-medium">
                Rejection Reason:
              </label>
              <Textarea
                id="rejection-reason"
                placeholder="Please provide a reason for rejecting this note..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                This reason will be shared with the student to help them understand why their note was rejected.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmReject}
              disabled={!rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotesApproval;
