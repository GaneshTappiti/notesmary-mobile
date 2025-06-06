
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ContextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ContextInput: React.FC<ContextInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="context" className="text-base font-semibold flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-purple-600" />
        Additional Context (Optional)
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Add specific requirements, marking criteria, or context</p>
          </TooltipContent>
        </Tooltip>
      </Label>
      <Textarea
        id="context"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add any specific requirements, marking criteria, or additional context..."
        rows={3}
        className="resize-none text-sm sm:text-base"
      />
    </div>
  );
};
