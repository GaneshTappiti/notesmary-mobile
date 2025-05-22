
import { motion } from 'framer-motion';
import { HeroActions } from '@/components/HeroActions';
import { Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800"
          >
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase">
              Used by 10k+ Students
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block">AI-Powered Study Buddy.</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Smarter Than Toppers.
            </span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get instant answers, join study rooms, and own your exams. Transform your handwritten notes into organized digital study materials with the power of AI.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={() => navigate('/authentication')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full px-8 py-6 text-lg transition-transform hover:scale-105"
            >
              Try Notex
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center rounded-full px-6 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-transform hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
              Watch Demo
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex items-center justify-center gap-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden bg-blue-${300 + i*100} dark:bg-blue-${500 + i*100}`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col">
              <span className="font-medium text-gray-900 dark:text-gray-300">4,500+ students</span>
              <span>Trust Notex daily</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
