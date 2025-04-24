import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Edit, Trash, Download, Star, Upload, Plus, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageContainer } from '@/components/PageContainer';

interface Note {
  id: string;
  title: string;
  subject: string;
  semester: string;
  uploadDate: string;
  fileType: string;
  isStarred: boolean;
  downloads: number;
  views: number;
}

const MyNotes = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('uploaded');
  
  const uploadedNotes: Note[] = [
    {
      id: "1",
      title: "Quantum Physics Chapter 3 - Wave Functions",
      subject: "Physics",
      semester: "Semester 5",
      uploadDate: "2023-10-15",
      fileType: "PDF",
      isStarred: true,
      downloads: 45,
      views: 120
    },
    {
      id: "2",
      title: "Data Structures and Algorithms - Linked Lists",
      subject: "Computer Science",
      semester: "Semester 3",
      uploadDate: "2023-09-22",
      fileType: "PDF",
      isStarred: false,
      downloads: 72,
      views: 198
    },
    {
      id: "3",
      title: "Organic Chemistry - Functional Groups",
      subject: "Chemistry",
      semester: "Semester 4",
      uploadDate: "2023-11-05",
      fileType: "DOCX",
      isStarred: true,
      downloads: 36,
      views: 89
    }
  ];
  
  const savedNotes: Note[] = [
    {
      id: "4",
      title: "Calculus II - Integration Techniques",
      subject: "Mathematics",
      semester: "Semester 2",
      uploadDate: "2023-08-10",
      fileType: "PDF",
      isStarred: true,
      downloads: 124,
      views: 310
    },
    {
      id: "5",
      title: "Introduction to Microeconomics",
      subject: "Economics",
      semester: "Semester 1",
      uploadDate: "2023-07-18",
      fileType: "PDF",
      isStarred: false,
      downloads: 56,
      views: 143
    }
  ];
  
  const filteredUploadedNotes = uploadedNotes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredSavedNotes = savedNotes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleToggleStar = (noteId: string, isUploaded: boolean) => {
    toast({
      title: "Note updated",
      description: "This note has been added to your favorites.",
    });
  };
  
  const handleDelete = (noteId: string) => {
    toast({
      title: "Note deleted",
      description: "The note has been successfully deleted.",
      variant: "destructive"
    });
  };
  
  const handleViewNote = (noteId: string) => {
    navigate(`/view-notes/${noteId}`);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const renderNoteList = (notes: Note[], isUploaded: boolean) => {
    if (notes.length === 0) {
      return (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          {isUploaded ? (
            <>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">You haven't uploaded any notes yet</p>
              <Button onClick={() => navigate('/upload-notes')} className="mt-2">
                <Upload className="mr-2 h-4 w-4" />
                Upload Notes
              </Button>
            </>
          ) : (
            <>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">You haven't saved any notes yet</p>
              <Button onClick={() => navigate('/find-notes')} className="mt-2">
                <Search className="mr-2 h-4 w-4" />
                Find Notes
              </Button>
            </>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card key={note.id} className="border shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-700">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg line-clamp-2 hover:line-clamp-none transition-all cursor-pointer" onClick={() => handleViewNote(note.id)}>
                    {note.title}
                  </CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-1">
                    <span>{note.subject}</span>
                    <span className="mx-1">•</span>
                    <span>{note.semester}</span>
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400">
                  {note.fileType}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span>{note.downloads}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  <span>{note.views} views</span>
                </div>
                <div>
                  <span>Uploaded {formatDate(note.uploadDate)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 border-t">
              <Button variant="ghost" size="sm" onClick={() => handleToggleStar(note.id, isUploaded)}>
                <Star className={`h-4 w-4 ${note.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              </Button>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => handleViewNote(note.id)}>
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </Button>
                {isUploaded && (
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/upload-notes?edit=${note.id}`)}>
                    <Edit className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => handleDelete(note.id)}>
                  <Trash className="h-4 w-4 text-red-600 dark:text-red-400" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <PageContainer className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">My Notes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
              Manage your uploaded and saved notes
            </p>
          </div>
          <Button 
            onClick={() => navigate('/upload-notes')} 
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Upload New Note</span>
          </Button>
        </div>
        
        <div className="mb-6 relative">
          <Input
            type="text"
            placeholder="Search your notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-gray-500">
              <Filter size={16} className="mr-1" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="uploaded" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="uploaded" className="flex-1">
              Uploaded Notes ({filteredUploadedNotes.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex-1">
              Saved Notes ({filteredSavedNotes.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="uploaded" className="mt-2">
            {renderNoteList(filteredUploadedNotes, true)}
          </TabsContent>
          
          <TabsContent value="saved" className="mt-2">
            {renderNoteList(filteredSavedNotes, false)}
          </TabsContent>
        </Tabs>
      </PageContainer>
    </div>
  );
};

export default MyNotes;
