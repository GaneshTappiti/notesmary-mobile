
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, FileText, CheckCircle2, BookOpen } from 'lucide-react';

interface DocumentUploadProps {
  selectedFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ selectedFile, onFileChange }) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="document" className="text-base font-semibold flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-purple-600" />
        Upload Study Materials
      </Label>
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="border-2 border-dashed border-purple-300 rounded-xl p-6 sm:p-8 text-center hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 cursor-pointer"
        onClick={() => document.getElementById('document')?.click()}
      >
        <input
          id="document"
          type="file"
          className="hidden"
          onChange={onFileChange}
          accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
        />
        
        {selectedFile ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto" />
            </motion.div>
            <div>
              <p className="font-semibold text-sm sm:text-base text-gray-800 break-all mb-1">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button 
                type="button"
                variant="outline"
                size="sm"
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                Change Document
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-purple-400 mx-auto" />
            </motion.div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                Upload Your Study Materials
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                PDF, Word docs, PowerPoint, or text files
              </p>
              <div className="text-xs text-gray-400 space-y-1">
                <p>✓ Lecture notes & textbooks</p>
                <p>✓ Study guides & handouts</p>
                <p>✓ Research papers & articles</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <p className="text-xs text-gray-500 text-center">
        Our AI will analyze your materials and generate structured exam answers
      </p>
    </div>
  );
};
