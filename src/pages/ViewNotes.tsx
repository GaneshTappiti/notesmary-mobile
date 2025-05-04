
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Share, Bookmark, ThumbsUp } from 'lucide-react';

const ViewNotes = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Helmet>
        <title>View Notes | Notex</title>
      </Helmet>
      
      <PageContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Physics Quantum Mechanics Notes</h1>
            <p className="text-gray-600">Uploaded by Alex Johnson • 3 days ago</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>25</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-white p-6 mb-6">
              <div className="border border-gray-200 rounded-md h-[600px] bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Note content preview would appear here</p>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-white p-4">
              <h3 className="text-lg font-semibold mb-4">Note Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">Physics</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Chapter</p>
                  <p className="font-medium">Quantum Mechanics</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Semester</p>
                  <p className="font-medium">Semester 5</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Views</p>
                  <p className="font-medium">125</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Downloads</p>
                  <p className="font-medium">42</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white p-4">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-gray-700">
                These comprehensive notes cover the fundamentals of Quantum Mechanics including wave functions, Schrödinger's equation, and quantum states. 
                Includes solved examples and practice problems.
              </p>
            </Card>
            
            <Card className="bg-white p-4">
              <h3 className="text-lg font-semibold mb-4">Related Notes</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded">
                    <span className="font-medium text-blue-600">PDF</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">Quantum Mechanics Chapter 2</p>
                    <p className="text-xs text-gray-500">Physics • Semester 5</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded">
                    <span className="font-medium text-blue-600">PDF</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">Wave Functions Explained</p>
                    <p className="text-xs text-gray-500">Physics • Semester 5</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default ViewNotes;
