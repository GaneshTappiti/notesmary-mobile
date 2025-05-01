import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define the form validation schema
const formSchema = z.object({
  branch: z.string().min(1, { message: "Please select a branch" }),
  year: z.string().min(1, { message: "Please select a year" }),
  semester: z.string().min(1, { message: "Please select a semester" }),
  subject: z.string().min(2, { message: "Subject name is required" }),
  chapterNumber: z.string().min(1, { message: "Chapter number is required" }),
  chapterName: z.string().min(2, { message: "Chapter name is required" }),
  description: z.string().optional(),
  // File validation will be handled separately
});

type FormValues = z.infer<typeof formSchema>;

const UploadNotes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: "",
      year: "",
      semester: "",
      subject: "",
      chapterNumber: "",
      chapterName: "",
      description: "",
    },
  });

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile: File | null | undefined) => {
    setFileError('');

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Check file type
    const fileType = selectedFile.type;
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(fileType)) {
      setFileError('Please upload a PDF or DOCX file');
      setFile(null);
      return;
    }

    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError('File size should be less than 10MB');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      validateAndSetFile(droppedFiles[0]);
    }
  };

  // Form submission
  const onSubmit = (data: FormValues) => {
    if (!file) {
      setFileError('Please upload a file');
      return;
    }

    setUploadStatus('uploading');

    // Simulate file upload
    setTimeout(() => {
      console.log('Form data:', data);
      console.log('File:', file);
      
      setUploadStatus('success');
      
      toast({
        title: "Notes Uploaded Successfully!",
        description: "Your notes have been uploaded and will be available for others to search.",
      });

      // Reset form after successful upload
      setTimeout(() => {
        form.reset();
        setFile(null);
        setUploadStatus('idle');
        navigate('/dashboard');
      }, 1500);
    }, 2000);
  };

  // Define branch, year, and semester options
  const branchOptions = [
    { value: "computer-science", label: "Computer Science" },
    { value: "electrical-engineering", label: "Electrical Engineering" },
    { value: "mechanical-engineering", label: "Mechanical Engineering" },
    { value: "civil-engineering", label: "Civil Engineering" },
    { value: "chemical-engineering", label: "Chemical Engineering" },
  ];

  const yearOptions = [
    { value: "1", label: "First Year" },
    { value: "2", label: "Second Year" },
    { value: "3", label: "Third Year" },
    { value: "4", label: "Fourth Year" },
  ];

  const semesterOptions = [
    { value: "1", label: "Semester 1" },
    { value: "2", label: "Semester 2" },
    { value: "3", label: "Semester 3" },
    { value: "4", label: "Semester 4" },
    { value: "5", label: "Semester 5" },
    { value: "6", label: "Semester 6" },
    { value: "7", label: "Semester 7" },
    { value: "8", label: "Semester 8" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="pb-12 px-4 w-full max-w-5xl mx-auto pt-4 md:pt-0">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Upload Notes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Share your knowledge with other students</p>
        </div>
        
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Upload Your Notes</CardTitle>
                <CardDescription>Fill in the details and upload your file</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="mt-1 mb-4">
                  <Label htmlFor="file-upload">Upload File (PDF or DOCX, max 10MB)</Label>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
                      ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'}
                      ${fileError ? 'border-red-300 dark:border-red-800' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                    />
                    
                    {file ? (
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <FileText className="h-8 w-8" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Drag and drop your file here or click to browse</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Only PDF or DOCX files are supported</p>
                      </>
                    )}
                  </div>
                  
                  {fileError && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {fileError}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {branchOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {yearOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {semesterOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Data Structures" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="chapterNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chapter Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="chapterName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chapter Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Linked Lists" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Add any additional information about your notes" 
                          className="resize-none h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe what these notes contain to help others find them
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    disabled={uploadStatus === 'uploading'}
                  >
                    {uploadStatus === 'uploading' ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Uploading...
                      </>
                    ) : uploadStatus === 'success' ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Uploaded Successfully!
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Notes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col items-start text-sm text-gray-600 dark:text-gray-400 border-t mt-4 pt-4">
            <p className="flex items-center mb-2">
              <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
              Your uploaded notes will be accessible to other verified students
            </p>
            <p className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
              Notes are scanned for plagiarism and quality before being published
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UploadNotes;
