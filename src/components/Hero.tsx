
import { motion } from 'framer-motion';
import { HeroActions } from '@/components/HeroActions';
import { FileUp, BookOpen, BrainCircuit, Users, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:text-left lg:flex lg:items-center">
            <div>
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
                className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl"
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
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  onClick={() => navigate('/authentication')}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full px-8 py-6 text-lg"
                >
                  Try Notex
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center rounded-full px-6 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                >
                  <Play className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Watch Demo
                </Button>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex items-center gap-x-4"
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
          
          <motion.div 
            className="mt-12 lg:relative lg:mt-0 lg:ml-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0">
              <div className="relative rounded-2xl shadow-xl overflow-hidden glass dark:bg-gray-800/50 dark:backdrop-blur-xl p-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/30 dark:from-blue-900/20 dark:to-purple-900/10 mix-blend-multiply" />
                
                <div className="relative p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                      <FileUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Upload Notes</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Scan or upload your handwritten notes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                      <BrainCircuit className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">AI Processing</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Our AI structures & enhances your notes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                      <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Study Smarter</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Access organized notes on any device</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
                      <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Collaborative Study</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Join study rooms with peers</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl py-3 px-6 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Demo Processing...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Animated floating effect */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut" 
              }}
              className="absolute -bottom-4 -right-4 h-20 w-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 dark:opacity-20"
            />
            
            <motion.div 
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut" 
              }}
              className="absolute -top-4 -left-4 h-16 w-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl opacity-30 dark:opacity-20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
