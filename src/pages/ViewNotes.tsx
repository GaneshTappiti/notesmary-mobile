
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Calendar, BookOpen, Shield, FileText, Eye, EyeOff, Copy, Share2, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const mockNotes = [
  {
    id: '1',
    title: 'Introduction to Quantum Mechanics',
    subject: 'Physics',
    chapter: 'Chapter 3: Wave Functions',
    authorName: 'Priya Sharma',
    year: '3rd Year',
    branch: 'Physics',
    semester: '5',
    uploadDate: '2023-12-15',
    downloads: 128,
    fileType: 'pdf',
    content: '/placeholder.svg',
    description: 'Comprehensive notes covering wave functions and their applications in quantum mechanics. Includes solved examples and key theorems.'
  },
  {
    id: '2',
    title: 'Data Structures and Algorithms',
    subject: 'Computer Science',
    chapter: 'Chapter 5: Graph Theory',
    authorName: 'Rahul Gupta',
    year: '2nd Year',
    branch: 'Computer Science',
    semester: '3',
    uploadDate: '2024-01-22',
    downloads: 245,
    fileType: 'pdf',
    content: '/placeholder.svg',
    description: 'Detailed notes on graph algorithms including DFS, BFS, Dijkstra\'s algorithm, and practical implementations.'
  },
];

const ViewNotes = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const [isSharingDialogOpen, setIsSharingDialogOpen] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    setLoading(true);
    
    const foundNote = mockNotes.find(n => n.id === noteId);
    
    if (foundNote) {
      const baseUrl = window.location.origin;
      setShareableLink(`${baseUrl}/view-notes/${foundNote.id}?shared=true`);
    }
    
    setTimeout(() => {
      setNote(foundNote || null);
      setLoading(false);
    }, 1000);
  }, [noteId]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleToggleContent = () => {
    setShowContent(!showContent);
  };
  
  const handleSaveNote = () => {
    toast({
      title: "Note saved",
      description: "Note has been added to your saved collection.",
    });
  };
  
  const handleCopyShareableLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast({
      title: "Link copied!",
      description: "Shareable link has been copied to clipboard.",
    });
  };
  
  const handleShareClick = () => {
    setIsSharingDialogOpen(true);
  };
  
  const isSharedAccess = new URLSearchParams(window.location.search).get('shared') === 'true';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (isSharedAccess && !isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <Navbar />
        <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
          <div className="text-center py-10">
            <Shield className="h-16 w-16 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Sign up to view this note</h3>
            <p className="text-gray-500 mb-6">This content is available only to registered users</p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => navigate('/authentication')}>
                Sign up / Log in
              </Button>
              <Button variant="outline" onClick={handleGoBack}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <Navbar />
        <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <Navbar />
        <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
          <div className="text-center py-10">
            <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Note not found</h3>
            <p className="text-gray-500 mb-6">The note you're looking for doesn't exist or has been removed</p>
            <Button onClick={handleGoBack}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <Navbar />
      
      <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={handleGoBack}
        >
          <ArrowLeft size={18} />
          Back to search
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-br from-blue-100 to-indigo-50 pb-4">
                <Badge className="w-fit mb-2 bg-blue-600">{note.fileType.toUpperCase()}</Badge>
                <CardTitle className="text-xl">{note.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-500 text-sm">Subject</h3>
                    <p className="font-medium">{note.subject}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Chapter</h3>
                    <p className="font-medium">{note.chapter}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-blue-600" />
                    <div>
                      <h3 className="text-gray-500 text-sm">Author</h3>
                      <p className="font-medium">{note.authorName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <div>
                      <h3 className="text-gray-500 text-sm">Uploaded</h3>
                      <p className="font-medium">{new Date(note.uploadDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-blue-600" />
                    <div>
                      <h3 className="text-gray-500 text-sm">Course Details</h3>
                      <p className="font-medium">{note.branch}, {note.year}, Semester {note.semester}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-gray-500 text-sm">Description</h3>
                    <p className="text-sm mt-1">{note.description}</p>
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <Button 
                      className="w-full"
                      onClick={handleSaveNote}
                    >
                      Save to Collection
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleShareClick}
                    >
                      <Share2 size={16} className="mr-2" />
                      Share this note
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-1 lg:col-span-2">
            <Card className="border-none shadow-md h-full">
              <CardHeader className="flex-row justify-between items-center pb-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-500" />
                  <p className="text-sm font-medium text-gray-700">
                    Content is protected. Downloads are disabled.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={handleToggleContent}
                >
                  {showContent ? (
                    <>
                      <EyeOff size={14} className="mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye size={14} className="mr-1" />
                      Show
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {showContent ? (
                  <div className="bg-gray-100 rounded-lg aspect-[3/4] w-full overflow-hidden">
                    <img 
                      src={note.content} 
                      alt="Document preview" 
                      className="w-full h-full object-cover"
                      style={{ 
                        pointerEvents: 'none', 
                        userSelect: 'none' 
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                      <div className="text-center p-6">
                        <FileText size={48} className="mx-auto text-blue-500 mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Protected Content</h3>
                        <p className="text-gray-600 mb-4">
                          This document preview is protected. In a real application, this would be a secure 
                          document viewer that prevents downloads.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg aspect-[3/4] w-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <EyeOff size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700">Content hidden</h3>
                      <p className="text-gray-500">Click "Show" to view the document</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Dialog open={isSharingDialogOpen} onOpenChange={setIsSharingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this note</DialogTitle>
            <DialogDescription>
              Share this link with others. They will need to sign up or log in to view the content.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <div className="flex items-center border rounded-md pl-3">
                <Link size={16} className="text-gray-400 mr-2" />
                <Input
                  value={shareableLink}
                  readOnly
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <p className="text-xs text-gray-500">
                Anyone with this link will need to create an account to view the note.
              </p>
            </div>
            <Button size="sm" className="px-3" onClick={handleCopyShareableLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Share on social media</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Button>
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Button>
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </Button>
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </Button>
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewNotes;
