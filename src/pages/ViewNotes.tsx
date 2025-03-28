
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Calendar, BookOpen, Shield, FileText, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock note data (in a real app, this would come from an API)
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
    content: '/placeholder.svg', // This would be a URL to the actual document
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
  // Add more mock notes as needed...
];

const ViewNotes = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(true);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading the note data
    setLoading(true);
    
    // Find the note by ID in our mock data
    const foundNote = mockNotes.find(n => n.id === noteId);
    
    // Simulate an API delay
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
          {/* Note Info */}
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
                  
                  <div className="pt-2">
                    <Button 
                      className="w-full"
                      onClick={handleSaveNote}
                    >
                      Save to Collection
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Note Content */}
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
                    {/* Document Viewer - In a real app, this would be a PDF/DOCX viewer */}
                    <img 
                      src={note.content} 
                      alt="Document preview" 
                      className="w-full h-full object-cover"
                      style={{ 
                        pointerEvents: 'none', // Prevents right click to save
                        userSelect: 'none'  // Prevents text selection
                      }}
                    />
                    {/* This is a placeholder. In a real app, you'd integrate a document viewer 
                        component that disables downloading, like PDF.js with download disabled */}
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
    </div>
  );
};

export default ViewNotes;
