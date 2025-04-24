
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const HeroActions = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/authentication');
    }
  };
  
  return (
    <motion.div 
      className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Button 
        size="lg" 
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 text-sm sm:text-base"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
      <Button 
        size="lg" 
        variant="outline"
        className="px-5 py-2 text-sm sm:text-base"
      >
        Learn More
      </Button>
    </motion.div>
  );
};
