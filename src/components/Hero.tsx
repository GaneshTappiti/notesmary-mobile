
import { motion } from 'framer-motion';
import { HeroActions } from '@/components/HeroActions';
import { FileUp, BookOpen, BrainCircuit } from 'lucide-react';

export const Hero = () => {
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
                className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full bg-blue-50 border border-blue-100"
              >
                <span className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                  AI-Powered Study Notes
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="block">Study Smarter</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  Not Harder
                </span>
              </motion.h1>
              
              <motion.p 
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Transform your handwritten notes into beautifully organized digital study materials with the power of AI. Get summaries and collaborative study features—all from your own notes.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <HeroActions />
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
                      className={`w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-blue-${300 + i*100}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 flex flex-col">
                  <span className="font-medium text-gray-900">4,500+ students</span>
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
              <div className="relative rounded-2xl shadow-xl overflow-hidden bg-white p-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white mix-blend-multiply" />
                
                <div className="relative p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <FileUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Upload Notes</h3>
                      <p className="text-sm text-gray-500">Scan or upload your handwritten notes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <BrainCircuit className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">AI Processing</h3>
                      <p className="text-sm text-gray-500">Our AI structures & enhances your notes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Study Smarter</h3>
                      <p className="text-sm text-gray-500">Access organized notes on any device</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <div className="bg-gray-100 rounded-xl py-3 px-6 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-medium text-gray-700">AI Demo Processing...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
