
import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Zap, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AnswerFormatSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const AnswerFormatSelector: React.FC<AnswerFormatSelectorProps> = ({
  value,
  onValueChange
}) => {
  const formats = [
    { value: '2', label: '2-Mark Answer', description: 'Brief & Concise', color: 'bg-blue-50 border-blue-200' },
    { value: '5', label: '5-Mark Answer', description: 'Structured & Detailed', color: 'bg-purple-50 border-purple-200' },
    { value: '10', label: '10-Mark Answer', description: 'Comprehensive', color: 'bg-indigo-50 border-indigo-200' }
  ];

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold flex items-center gap-2">
        <Zap className="h-4 w-4 text-purple-600" />
        Answer Format
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Choose the mark value to get appropriately structured answers</p>
          </TooltipContent>
        </Tooltip>
      </Label>
      
      <RadioGroup value={value} onValueChange={onValueChange} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {formats.map((format) => (
          <motion.div
            key={format.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
              value === format.value ? format.color : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value={format.value} id={format.value} />
              <div className="flex-1">
                <Label htmlFor={format.value} className="font-medium cursor-pointer text-sm sm:text-base">
                  {format.label}
                </Label>
                <p className="text-xs text-gray-500 mt-1">{format.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </RadioGroup>
    </div>
  );
};
