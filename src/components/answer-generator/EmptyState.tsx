
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Sparkles } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <Card className="text-center h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardContent className="py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center"
          >
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
          </motion.div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 flex items-center justify-center gap-2">
              Ready to Analyze
              <Sparkles className="h-4 w-4 text-purple-500" />
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
              Upload your study materials to get perfectly structured exam answers
            </p>
          </div>
          <div className="space-y-1 text-xs text-gray-400">
            <p>✓ AI-powered document analysis</p>
            <p>✓ Structured format based on mark value</p>
            <p>✓ Instant feedback and scoring</p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
