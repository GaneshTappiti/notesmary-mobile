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
  
  const getFileTypeBadgeColor = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400';
      case 'docx':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-400';
    }
  };
  
  const renderNoteList = (notes: Note[], isUploaded: boolean) => {
    if (notes.length === 0) {
      return (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          {isUploaded ? (
            <>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">You haven't uploaded any notes yet</p>
              <Button onClick={() => navigate('/upload-notes')} className="mt-2">
                <Upload className="mr-2 h-4 w-4" />
                Upload Notes
              </Button>
            </>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">You haven't saved any notes yet</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24 md:pb-6">
        {notes.map((note) => (
          <Card key={note.id} className="border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1">
            <CardHeader className="pb-3 px-6 pt-6">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle 
                    className="text-lg font-semibold line-clamp-2 hover:line-clamp-none transition-all cursor-pointer text-gray-900 dark:text-gray-100 leading-snug mb-2" 
                    onClick={() => handleViewNote(note.id)}
                  >
                    {note.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{note.subject}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-xs">{note.semester}</span>
                  </CardDescription>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${getFileTypeBadgeColor(note.fileType)} font-medium text-xs px-2 py-1 ml-2 flex-shrink-0`}
                >
                  {note.fileType}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pb-4 px-6">
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  <span className="font-medium">{note.downloads}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span className="font-medium">{note.views}</span>
                </div>
                <div className="text-xs">
                  <span>{formatDate(note.uploadDate)}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between items-center pt-4 border-t bg-gray-50/50 dark:bg-gray-900/50 px-6 pb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleToggleStar(note.id, isUploaded)}
                className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
              >
                <Star className={`h-4 w-4 ${note.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleViewNote(note.id)}
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </Button>
                {isUploaded && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate(`/upload-notes?edit=${note.id}`)}
                    className="hover:bg-green-50 dark:hover:bg-green-900/20"
                  >
                    <Edit className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(note.id)}
                  className="hover:bg-red-50 dark:hover:bg-red-900/20"
                >
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
    <PageContainer className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">My Notes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
            Manage your uploaded and saved notes
          </p>
        </div>
        <Button 
          onClick={() => navigate('/upload-notes')} 
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus size={18} />
          <span>Upload New Note</span>
        </Button>
      </div>
      
      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Search your notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-32 py-4 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-base"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-10 px-4 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg">
            <Filter size={16} className="mr-2" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="h-10 px-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="uploaded" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger 
              value="uploaded" 
              className="px-6 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
            >
              Uploaded Notes ({filteredUploadedNotes.length})
            </TabsTrigger>
            <TabsTrigger 
              value="saved" 
              className="px-6 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
            >
              Saved Notes ({filteredSavedNotes.length})
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="uploaded" className="mt-2">
          {renderNoteList(filteredUploadedNotes, true)}
        </TabsContent>
        
        <TabsContent value="saved" className="mt-2">
          {renderNoteList(filteredSavedNotes, false)}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default MyNotes;
