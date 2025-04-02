
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroActions = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/authentication');
  };

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
      <Button 
        size="lg" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-8 py-3 shadow-lg hover:shadow-xl flex items-center gap-2"
        onClick={handleGetStarted}
      >
        Get Started Free
        <ArrowRight className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="lg" 
        className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 font-medium rounded-lg px-8 py-3 flex items-center gap-2"
        onClick={scrollToFeatures}
      >
        <Play className="h-4 w-4" />
        See How It Works
      </Button>
    </div>
  );
};
