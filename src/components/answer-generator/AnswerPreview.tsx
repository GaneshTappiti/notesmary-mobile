
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

interface GeneratedAnswer {
  question: string;
  markType: number;
  structuredAnswer: {
    introduction: string;
    mainPoints: string[];
    conclusion: string;
    keyTerms: string[];
  };
  estimatedScore: number;
  feedback: Array<{
    type: 'strength' | 'improvement';
    text: string;
  }>;
}

interface AnswerPreviewProps {
  generatedAnswer: GeneratedAnswer;
  onCopy: () => void;
  onReset: () => void;
}

export const AnswerPreview: React.FC<AnswerPreviewProps> = ({
  generatedAnswer,
  onCopy,
  onReset
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Score Card */}
      <Card className="text-center bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardHeader className="pb-3">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-3"
          >
            <span className="text-lg sm:text-2xl font-bold text-white">
              {generatedAnswer.estimatedScore}/{generatedAnswer.markType}
            </span>
          </motion.div>
          <CardTitle className="text-base sm:text-lg">Estimated Score</CardTitle>
        </CardHeader>
      </Card>

      {/* Generated Answer */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg flex items-center justify-between">
            Structured Answer
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={onCopy}>
                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={onReset}>
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-3 bg-blue-50 rounded-lg"
          >
            <p className="text-xs sm:text-sm font-medium text-blue-800 mb-1">Introduction</p>
            <p className="text-xs sm:text-sm">{generatedAnswer.structuredAnswer.introduction}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <p className="text-xs sm:text-sm font-medium">Main Points:</p>
            {generatedAnswer.structuredAnswer.mainPoints.map((point, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-2 bg-gray-50 rounded text-xs sm:text-sm"
              >
                <strong>{index + 1}.</strong> {point}
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-3 bg-green-50 rounded-lg"
          >
            <p className="text-xs sm:text-sm font-medium text-green-800 mb-1">Conclusion</p>
            <p className="text-xs sm:text-sm">{generatedAnswer.structuredAnswer.conclusion}</p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg">AI Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {generatedAnswer.feedback.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`p-3 rounded-lg border-l-4 ${
                item.type === 'strength' 
                  ? 'bg-green-50 border-green-400' 
                  : 'bg-yellow-50 border-yellow-400'
              }`}
            >
              <div className="flex items-start gap-2">
                {item.type === 'strength' && <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5" />}
                {item.type === 'improvement' && <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mt-0.5" />}
                <p className="text-xs sm:text-sm">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};
