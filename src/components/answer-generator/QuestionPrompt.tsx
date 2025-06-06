
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, Lightbulb } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface QuestionPromptProps {
  value: string;
  onChange: (value: string) => void;
}

export const QuestionPrompt: React.FC<QuestionPromptProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="question-prompt" className="text-base font-semibold flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-purple-600" />
        Question or Topic (Optional)
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Specify a particular topic or question you want the AI to focus on from your materials</p>
          </TooltipContent>
        </Tooltip>
      </Label>
      <Textarea
        id="question-prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 'Explain photosynthesis process' or 'Climate change effects' or leave blank for general summary"
        rows={3}
        className="text-sm sm:text-base resize-none focus:ring-2 focus:ring-purple-500 border-2"
      />
      <p className="text-xs text-gray-500">
        💡 Leave blank to get a comprehensive answer covering all key topics from your materials
      </p>
    </div>
  );
};
