
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="question" className="text-base font-semibold flex items-center gap-2">
        <FileText className="h-4 w-4 text-purple-600" />
        Exam Question
      </Label>
      <Textarea
        id="question"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your exam question here... e.g., 'Explain the causes and effects of climate change on global ecosystems'"
        rows={4}
        className="text-sm sm:text-base resize-none focus:ring-2 focus:ring-purple-500 border-2"
      />
      <p className="text-xs text-gray-500">Tip: Be specific with your question for better structured answers</p>
    </div>
  );
};
