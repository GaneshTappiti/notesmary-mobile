
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageContainer } from '@/components/PageContainer';

const UploadNotes = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !selectedFile) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Notes Uploaded Successfully",
        description: `"${title}" has been uploaded and is now available for sharing.`,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setSubject('');
      setSelectedFile(null);
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Upload Notes | Notex</title>
      </Helmet>
      
      <PageContainer>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Upload Notes</h1>
            <p className="text-gray-600">
              Share your study materials with the community and help others learn
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload New Notes
              </CardTitle>
              <CardDescription>
                Upload PDF files, images, or documents to share with other students
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a descriptive title for your notes"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide additional details about the content, topics covered, etc."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">File *</Label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      selectedFile 
                        ? 'border-green-400 bg-green-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                    />
                    
                    <div className="flex flex-col items-center">
                      {selectedFile ? (
                        <>
                          <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
                          <h3 className="font-semibold text-green-700 mb-2">File Selected!</h3>
                          <p className="text-sm text-green-600 mb-3">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </>
                      ) : (
                        <>
                          <FileText className="h-12 w-12 text-gray-400 mb-3" />
                          <h3 className="font-semibold text-gray-700 mb-2">Upload Your Notes</h3>
                          <p className="text-sm text-gray-500 mb-3">
                            Drag & drop or click to browse
                          </p>
                          <p className="text-xs text-gray-400">
                            Supported formats: PDF, DOC, PPT, TXT, JPG, PNG (Max 10MB)
                          </p>
                        </>
                      )}
                      
                      <Button 
                        type="button"
                        variant={selectedFile ? "outline" : "default"}
                        size="sm"
                        className="mt-3"
                        onClick={() => document.getElementById('file')?.click()}
                      >
                        {selectedFile ? "Change File" : "Browse Files"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800 mb-1">Upload Guidelines</p>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Ensure content is your own or you have permission to share</li>
                      <li>• Include clear, readable content that will help other students</li>
                      <li>• Use descriptive titles and tags for better discoverability</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setTitle('');
                      setDescription('');
                      setSubject('');
                      setSelectedFile(null);
                    }}
                  >
                    Clear
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={!title || !selectedFile || isUploading}
                    className="min-w-[120px]"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Notes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  );
};

export default UploadNotes;
