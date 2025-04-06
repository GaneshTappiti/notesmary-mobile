
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Check, AlertCircle, FileSearch, FilePdf } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

export const UploadModal = ({ open, onClose }: UploadModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter(file => {
        const isValid = file.type === 'application/pdf' || 
                       file.type === 'image/jpeg' || 
                       file.type === 'image/png';
        
        if (!isValid) {
          toast({
            title: "Invalid file format",
            description: `${file.name} is not a supported format. Please upload PDF, JPG, or PNG files.`,
            variant: "destructive"
          });
        }
        return isValid;
      });
      setFiles([...files, ...validFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(file => {
        const isValid = file.type === 'application/pdf' || 
                       file.type === 'image/jpeg' || 
                       file.type === 'image/png';
        
        if (!isValid) {
          toast({
            title: "Invalid file format",
            description: `${file.name} is not a supported format. Please upload PDF, JPG, or PNG files.`,
            variant: "destructive"
          });
        }
        return isValid;
      });
      setFiles([...files, ...validFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploadStatus('uploading');
    setUploadProgress(0);
    
    try {
      // Get current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData.user) {
        throw new Error('You must be logged in to upload files');
      }
      
      const userId = userData.user.id;
      
      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${userId}/${fileName}`;
        
        // Update progress for UI
        setUploadProgress(Math.round((i / files.length) * 50));
        
        // Upload file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('notes')
          .upload(filePath, file);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('notes')
          .getPublicUrl(filePath);
          
        const fileUrl = publicUrlData.publicUrl;
        
        // Save metadata to notes table
        const fileType = file.type === 'application/pdf' ? 'pdf' : 'image';
        
        const { data: noteData, error: noteError } = await supabase
          .from('notes')
          .insert({
            user_id: userId,
            title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
            file_url: fileUrl,
            subject: 'Uploaded via Dashboard',
            content: fileType === 'pdf' ? 'Processing PDF content...' : null,
          })
          .select()
          .single();
          
        if (noteError) {
          throw noteError;
        }
        
        // If it's a PDF, trigger the PDF processing function
        if (fileType === 'pdf') {
          setUploadStatus('processing');
          
          // Call the Supabase Edge Function to process the PDF
          try {
            await supabase.functions.invoke('process-pdf', {
              body: {
                userId,
                noteId: noteData.id,
                fileUrl,
                fileName: file.name
              }
            });
          } catch (processingError) {
            console.error('Error processing PDF:', processingError);
            // Continue anyway, PDF will be available for download even if processing fails
          }
        }
        
        setUploadProgress(Math.round((i + 1) / files.length * 100));
      }
      
      setUploadStatus('success');
      
      // Reset after showing success message
      setTimeout(() => {
        setFiles([]);
        setUploadStatus('idle');
        setUploadProgress(0);
        onClose();
        
        toast({
          title: "Files uploaded successfully",
          description: "Your notes are now available in your library.",
          variant: "default"
        });
      }, 2000);
      
    } catch (error: any) {
      console.error('Error uploading files:', error);
      setUploadStatus('error');
      
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload files. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') {
      return <FilePdf className="h-5 w-5 text-red-500" />;
    }
    return <FileText className="h-5 w-5 text-blue-500" />;
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Upload Your Notes</h2>
                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center ${
                  dragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
                } transition-all duration-200`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mx-auto flex flex-col items-center justify-center">
                  <Upload className="h-12 w-12 text-blue-500" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {dragOver ? 'Drop your files here' : 'Drag & drop your notes here'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Supported formats: PDF, JPG, PNG
                  </p>
                  <label className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium cursor-pointer transition-colors">
                    Browse Files
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Selected Files</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center">
                          {getFileIcon(file)}
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveFile(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          disabled={uploadStatus === 'uploading' || uploadStatus === 'processing'}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
                <div className="mt-6">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {uploadStatus === 'uploading' ? 'Uploading...' : 'Processing PDFs...'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {uploadStatus === 'processing' ? 
                      'Processing PDF content for AI search. This may take a few moments...' : 
                      'Uploading files to secure storage...'}
                  </p>
                </div>
              )}
              
              {uploadStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg flex items-center text-red-800 dark:text-red-400">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">There was an error uploading your files. Please try again.</p>
                </div>
              )}
              
              {uploadStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-lg flex items-center text-green-800 dark:text-green-400">
                  <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">Files uploaded successfully! Processing your notes...</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  disabled={uploadStatus === 'uploading' || uploadStatus === 'processing'}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={files.length === 0 || uploadStatus === 'uploading' || uploadStatus === 'processing'}
                  className="px-4 py-2 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {uploadStatus === 'uploading' || uploadStatus === 'processing' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {uploadStatus === 'processing' ? 'Processing...' : 'Uploading...'}
                    </>
                  ) : 'Upload Files'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
