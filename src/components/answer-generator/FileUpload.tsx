
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, CheckCircle2 } from 'lucide-react';

interface FileUploadProps {
  selectedFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ selectedFile, onFileChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="file" className="text-base font-semibold">Reference Material (Optional)</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center hover:border-purple-400 hover:bg-purple-50 transition-colors">
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={onFileChange}
          accept=".pdf,.doc,.docx,.txt"
        />
        
        {selectedFile ? (
          <div className="space-y-2">
            <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto" />
            <p className="font-medium text-sm sm:text-base break-all">{selectedFile.name}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mx-auto" />
            <p className="text-xs sm:text-sm text-gray-600">Upload reference material or notes</p>
          </div>
        )}
        
        <Button 
          type="button"
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => document.getElementById('file')?.click()}
        >
          {selectedFile ? "Change File" : "Browse Files"}
        </Button>
      </div>
    </div>
  );
};
