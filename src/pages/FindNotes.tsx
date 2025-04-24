import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  BookOpen,
  Filter,
  Grid,
  List,
  Download,
  Eye,
  User,
  FileText,
  Calendar,
  Bookmark
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageContainer } from '@/components/PageContainer';

interface NoteItem {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  authorName: string;
  year: string;
  branch: string;
  semester: string;
  uploadDate: string;
  downloads: number;
  fileType: 'pdf' | 'docx';
  thumbnail?: string;
}

const FindNotes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const mockNotes: NoteItem[] = [
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
      fileType: 'pdf'
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
      fileType: 'pdf'
    },
    {
      id: '3',
      title: 'Thermodynamics: Complete Reference',
      subject: 'Mechanical Engineering',
      chapter: 'Chapter 7: Entropy and the Second Law',
      authorName: 'Arjun Patel',
      year: '3rd Year',
      branch: 'Mechanical',
      semester: '6',
      uploadDate: '2024-02-10',
      downloads: 98,
      fileType: 'docx'
    },
    {
      id: '4',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      chapter: 'Chapter 4: Alkene Reactions',
      authorName: 'Neha Singh',
      year: '2nd Year',
      branch: 'Chemistry',
      semester: '4',
      uploadDate: '2024-03-05',
      downloads: 113,
      fileType: 'pdf'
    },
    {
      id: '5',
      title: 'Principles of Economics',
      subject: 'Economics',
      chapter: 'Chapter 2: Market Equilibrium',
      authorName: 'Aditya Kumar',
      year: '1st Year',
      branch: 'Economics',
      semester: '2',
      uploadDate: '2024-02-28',
      downloads: 67,
      fileType: 'pdf'
    },
    {
      id: '6',
      title: 'Digital Logic Design',
      subject: 'Electronics',
      chapter: 'Chapter 6: Sequential Logic',
      authorName: 'Vikram Rao',
      year: '2nd Year',
      branch: 'Electronics',
      semester: '3',
      uploadDate: '2024-01-15',
      downloads: 189,
      fileType: 'pdf'
    }
  ];
  
  // Filter notes based on search query and filters
  const filteredNotes = mockNotes.filter(note => {
    // Search query filter
    if (searchQuery && !note.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !note.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !note.chapter.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Branch filter
    if (selectedBranch && note.branch !== selectedBranch) {
      return false;
    }
    
    // Year filter
    if (selectedYear && !note.year.includes(selectedYear)) {
      return false;
    }
    
    // Semester filter
    if (selectedSemester && note.semester !== selectedSemester) {
      return false;
    }
    
    // Subject filter
    if (selectedSubject && note.subject !== selectedSubject) {
      return false;
    }
    
    return true;
  });
  
  // Unique lists for filters
  const branches = Array.from(new Set(mockNotes.map(note => note.branch)));
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const subjects = Array.from(new Set(mockNotes.map(note => note.subject)));
  
  const handleViewNote = (noteId: string) => {
    navigate(`/view-notes/${noteId}`);
  };
  
  const handleSaveNote = (noteId: string) => {
    toast({
      title: "Note saved",
      description: "Note has been added to your saved collection.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <PageContainer>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Notes</h1>
          <p className="text-gray-600">Discover and view notes from peers across different subjects and topics</p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                className="pl-10 pr-4 py-6 text-base rounded-lg border border-gray-200"
                placeholder="Search by topic, subject, chapter or use natural language like 'Show me 3rd-year Mechanical notes on Thermodynamics'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter size={18} />
              Filters
            </Button>
            <div className="flex items-center gap-2 border-l pl-4 hidden md:flex">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-full"
              >
                <Grid size={18} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-full"
              >
                <List size={18} />
              </Button>
            </div>
          </div>
          
          {/* Filter Panel */}
          {filterOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Branches</SelectItem>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Semesters</SelectItem>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>Semester {semester}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        
        {/* AI Suggestions */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-3">AI Suggested Topics</h2>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer px-3 py-1">
              Mechanical Engineering Thermodynamics
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer px-3 py-1">
              Computer Science Algorithms
            </Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer px-3 py-1">
              Electrical Circuit Theory
            </Badge>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer px-3 py-1">
              Physics Quantum Mechanics
            </Badge>
            <Badge className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer px-3 py-1">
              Organic Chemistry Reactions
            </Badge>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">Showing {filteredNotes.length} results</p>
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-9 px-2.5"
            >
              <Grid size={16} className="mr-1" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-9 px-2.5"
            >
              <List size={16} className="mr-1" />
              List
            </Button>
          </div>
        </div>
        
        {/* Notes Display */}
        {filteredNotes.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredNotes.map((note) => (
              viewMode === 'grid' ? (
                <Card key={note.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-50 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className="bg-blue-600">{note.fileType.toUpperCase()}</Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full" 
                          onClick={() => handleSaveNote(note.id)}
                        >
                          <Bookmark size={16} />
                        </Button>
                      </div>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">{note.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-1">{note.chapter}</p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <User size={14} className="mr-1" />
                        <span>{note.authorName}</span>
                        <span className="mx-2">•</span>
                        <Calendar size={14} className="mr-1" />
                        <span>{note.year}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <FileText size={14} className="mr-1" />
                          <span>{note.subject}</span>
                        </div>
                        <div>
                          <Download size={14} className="mr-1 inline-block" />
                          <span>{note.downloads}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                    <Button 
                      className="w-full flex items-center gap-2"
                      onClick={() => handleViewNote(note.id)}
                    >
                      <Eye size={16} />
                      View
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card key={note.id} className="border-none shadow-md overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-50 p-4 md:w-64 flex flex-col justify-between">
                      <div>
                        <Badge className="bg-blue-600 mb-2">{note.fileType.toUpperCase()}</Badge>
                        <h3 className="font-semibold text-lg mb-1">{note.subject}</h3>
                      </div>
                      <div className="text-sm text-gray-600">
                        <Calendar size={14} className="mr-1 inline-block" />
                        {new Date(note.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{note.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full" 
                          onClick={() => handleSaveNote(note.id)}
                        >
                          <Bookmark size={16} />
                        </Button>
                      </div>
                      <p className="text-gray-600 mb-3">{note.chapter}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <User size={14} className="mr-1" />
                        <span>{note.authorName}</span>
                        <span className="mx-2">•</span>
                        <span>{note.year}</span>
                        <span className="mx-2">•</span>
                        <span>Semester {note.semester}</span>
                        <span className="mx-2">•</span>
                        <span>{note.branch}</span>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Download size={14} className="mr-1" />
                          <span>{note.downloads} downloads</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            className="flex items-center gap-1"
                            size="sm"
                            onClick={() => handleViewNote(note.id)}
                          >
                            <Eye size={14} />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No notes found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedBranch('');
              setSelectedYear('');
              setSelectedSemester('');
              setSelectedSubject('');
            }}>
              Clear all filters
            </Button>
          </div>
        )}
      </PageContainer>
    </div>
  );
};

export default FindNotes;
