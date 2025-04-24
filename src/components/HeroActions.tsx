
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const HeroActions = () => {
  return (
    <motion.div 
      className="mt-8 flex flex-wrap gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Link to="/authentication">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Get Started
        </Button>
      </Link>
      <Button size="lg" variant="outline">
        Learn More
      </Button>
    </motion.div>
  );
};
