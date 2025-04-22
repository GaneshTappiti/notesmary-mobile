
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, FileText, Calendar, BookOpen, GraduationCap, Clock, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { NotesService } from '@/services/NotesService';

const subjects = ["All Subjects", "Physics", "Chemistry", "Mathematics", "Computer Science", "Electronics"];
const years = ["All Years", "1st Year", "2nd Year", "3rd Year", "4th Year"];
const fileTypes = ["PDF", "DOCX"];
const difficulties = ["Easy", "Medium", "Hard"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

const FindNotes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const navigate = useNavigate();

  // AI Suggestions based on recent searches
  const suggestions = [
    "3rd year Mechanical notes",
    "Electronics PDFs",
    "Latest Computer Science",
    "Easy Physics tutorials",
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement debounced search logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Search Section */}
          <div className="relative">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search notes or try 'Show me 3rd-year Mechanical notes on Thermodynamics'"
                  className="w-full pl-10 pr-4 py-6 text-lg rounded-xl border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm hover:border-purple-200 transition-all focus:ring-2 focus:ring-purple-200"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              {/* Filters Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 px-4 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                  >
                    <Filter size={18} />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[90vw] sm:max-w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filter Notes</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    {/* Subject Filter */}
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map(subject => (
                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Year Filter */}
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* File Type Filter */}
                    <div className="space-y-2">
                      <Label>File Type</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {fileTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={type}
                              checked={selectedFileTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedFileTypes([...selectedFileTypes, type]);
                                } else {
                                  setSelectedFileTypes(selectedFileTypes.filter(t => t !== type));
                                }
                              }}
                            />
                            <Label htmlFor={type}>{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {difficulties.map(level => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                              id={level}
                              checked={selectedDifficulty.includes(level)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedDifficulty([...selectedDifficulty, level]);
                                } else {
                                  setSelectedDifficulty(selectedDifficulty.filter(d => d !== level));
                                }
                              }}
                            />
                            <Label htmlFor={level}>{level}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-1 border border-gray-200">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-purple-100 text-purple-700' : ''}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-purple-100 text-purple-700' : ''}
                >
                  <List size={18} />
                </Button>
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] bg-white/70 backdrop-blur-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Suggestions */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 left-0 right-0 mt-2 p-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-100"
              >
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 rounded-md hover:bg-purple-50 transition-colors flex items-center gap-2 text-gray-700"
                      onClick={() => setSearchQuery(suggestion)}
                    >
                      <Search size={14} className="text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {selectedSubject !== 'All Subjects' && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                {selectedSubject} ×
              </Badge>
            )}
            {selectedYear !== 'All Years' && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                {selectedYear} ×
              </Badge>
            )}
            {selectedFileTypes.map(type => (
              <Badge key={type} variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                {type} ×
              </Badge>
            ))}
            {selectedDifficulty.map(level => (
              <Badge key={level} variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                {level} ×
              </Badge>
            ))}
          </div>

          {/* Results Count & Mobile View Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">24 results found</p>
            <div className="sm:hidden flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} className="mr-1" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List size={16} className="mr-1" />
                List
              </Button>
            </div>
          </div>

          {/* Results Grid/List */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {/* Placeholder Note Cards */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className={`bg-white/70 backdrop-blur-sm border-gray-100 shadow-sm hover:shadow-md transition-all ${
                viewMode === 'list' ? 'flex gap-4' : ''
              }`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-purple-100 text-purple-700">PDF</Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      2 days ago
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Introduction to Quantum Mechanics</h3>
                  <p className="text-gray-600 text-sm mb-4">Comprehensive notes covering wave functions and quantum states</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-gray-600">Physics</Badge>
                    <Badge variant="outline" className="text-gray-600">3rd Year</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <BarChart2 size={14} className="mr-1" />
                      Medium
                    </div>
                    <div className="flex items-center">
                      <BookOpen size={14} className="mr-1" />
                      24 pages
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindNotes;
