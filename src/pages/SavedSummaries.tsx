
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, FileText, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/mobile/EmptyState';

// Mock data structure for saved summaries
interface SavedSummary {
  id: string;
  title: string;
  content: string;
  snippet: string;
  savedAt: Date;
  type: 'text' | 'document' | 'url';
  wordCount: number;
}

// Mock data - in real app this would come from API/storage
const mockSummaries: SavedSummary[] = [
  {
    id: '1',
    title: 'Machine Learning Basics',
    content: 'A comprehensive overview of machine learning fundamentals including supervised learning, unsupervised learning, and reinforcement learning...',
    snippet: 'A comprehensive overview of machine learning fundamentals...',
    savedAt: new Date('2024-01-15'),
    type: 'document',
    wordCount: 1250
  },
  {
    id: '2', 
    title: 'Climate Change Research',
    content: 'Recent studies on climate change impacts and mitigation strategies...',
    snippet: 'Recent studies on climate change impacts and mitigation...',
    savedAt: new Date('2024-01-10'),
    type: 'text',
    wordCount: 890
  }
];

const SavedSummaries = () => {
  const [summaries] = useState<SavedSummary[]>(mockSummaries);
  const [isLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewSummary = (summaryId: string) => {
    // Navigate to a detailed view - for now just show toast
    toast({
      title: "Opening Summary",
      description: "Summary details would be displayed here.",
    });
  };

  const handleDeleteSummary = (summaryId: string) => {
    // In real app, this would delete from storage/API
    toast({
      title: "Summary Deleted",
      description: "The summary has been removed from your saved items.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'url':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-blue-100 text-blue-800';
      case 'url':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your saved summaries...</p>
        </div>
      </div>
    );
  }

  if (summaries.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Summaries</h1>
            <p className="text-gray-600">Access your previously saved summaries</p>
          </div>
          
          <EmptyState
            title="No Saved Summaries"
            description="You haven't saved any summaries yet. Summarize some text to see it here!"
            icon={<BookOpen className="h-12 w-12 text-gray-400" />}
            actionText="Start Summarizing"
            onAction={() => navigate('/ai-answers')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Summaries</h1>
          <p className="text-gray-600">
            {summaries.length} saved {summaries.length === 1 ? 'summary' : 'summaries'}
          </p>
        </div>

        <div className="grid gap-6">
          {summaries.map((summary, index) => (
            <motion.div
              key={summary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                        {summary.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(summary.savedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {summary.wordCount} words
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${getTypeColor(summary.type)} flex items-center gap-1`}
                    >
                      {getTypeIcon(summary.type)}
                      {summary.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                    {summary.snippet}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewSummary(summary.id)}
                      className="flex items-center gap-2"
                    >
                      View Summary
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSummary(summary.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigate('/ai-answers')}
            className="flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Create New Summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavedSummaries;
