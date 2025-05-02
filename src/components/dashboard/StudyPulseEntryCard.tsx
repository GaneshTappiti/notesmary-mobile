
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const StudyPulseEntryCard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Radar className="h-5 w-5" />
          <h3 className="font-semibold text-lg">StudyPulse: Live Study Rooms</h3>
        </div>
        <p className="text-sm mb-4 opacity-90">
          Explore topic-based rooms &amp; meet learners
        </p>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => navigate('/study-pulse')}
            size="sm" 
            variant="secondary" 
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            Join StudyPulse
          </Button>
          <Button 
            onClick={() => navigate('/study-pulse')}
            size="sm"
            variant="secondary"
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            + Create Room
          </Button>
        </div>
      </div>
    </div>
  );
};
