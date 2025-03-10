
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse-subtle" />
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-blue-600">
              404
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Page not found</h1>
        
        <p className="text-xl text-gray-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
