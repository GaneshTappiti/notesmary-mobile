
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Upload, File } from 'lucide-react';

const UploadNotes = () => {
  return (
    <>
      <Helmet>
        <title>Upload Notes | Notex</title>
      </Helmet>
      
      <PageContainer>
        <h1 className="text-3xl font-bold mb-6">Upload Notes</h1>
        
        <Card className="bg-white p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter a title for your notes" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Semester 1</SelectItem>
                    <SelectItem value="2">Semester 2</SelectItem>
                    <SelectItem value="3">Semester 3</SelectItem>
                    <SelectItem value="4">Semester 4</SelectItem>
                    <SelectItem value="5">Semester 5</SelectItem>
                    <SelectItem value="6">Semester 6</SelectItem>
                    <SelectItem value="7">Semester 7</SelectItem>
                    <SelectItem value="8">Semester 8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chapter">Chapter/Topic</Label>
                <Input id="chapter" placeholder="Enter chapter or topic" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Add a short description for your notes" rows={3} />
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              <File className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">Drag and drop your file here, or click to browse</p>
              <p className="text-xs text-gray-400 mb-4">Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG</p>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Choose File
              </Button>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Upload Notes</Button>
            </div>
          </form>
        </Card>
      </PageContainer>
    </>
  );
};

export default UploadNotes;
