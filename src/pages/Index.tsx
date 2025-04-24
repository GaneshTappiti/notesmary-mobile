
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HeroActions } from '@/components/HeroActions';
import { FileUp, BookOpen, BrainCircuit, Users, Play, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    document.title = "Notex - AI-Powered Learning Platform";
    
    // Check if the user is already logged in
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate, isAuthenticated]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const bgOpacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgOpacity2 = useTransform(scrollYProgress, [0, 1], [0.5, 0.8]);
  const bgPosition = useTransform(scrollYProgress, [0, 1], ['0% 0%', '100% 100%']);

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-50 to-white relative"
      ref={containerRef}
    >
      {/* Background gradients */}
      <motion.div 
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-100/50 to-purple-100/30 -z-10"
        style={{ opacity: bgOpacity1, backgroundPosition: bgPosition }}
      />
      <motion.div 
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-tr from-indigo-100/30 to-pink-100/20 -z-10"
        style={{ opacity: bgOpacity2 }}
      />

      <Navbar />
      
      <main>
        <section className="pt-32 pb-16">
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
                    <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                      Used by 10k+ Students
                    </span>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <span className="block">AI-Powered Study Buddy.</span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                      Smarter Than Toppers.
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Get instant answers, join study rooms, and own your exams. Transform your handwritten notes into organized digital study materials with the power of AI.
                  </motion.p>
                  
                  <HeroActions />
                </div>
              </div>
              
              <motion.div 
                className="mt-12 lg:relative lg:mt-0 lg:ml-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0">
                  <div className="relative rounded-2xl shadow-xl overflow-hidden p-6 bg-white/80 backdrop-blur-sm">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                          <FileUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Upload Notes</h3>
                          <p className="text-sm text-gray-500">Transform your handwritten notes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-xl">
                          <BrainCircuit className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">AI Processing</h3>
                          <p className="text-sm text-gray-500">Let AI structure your notes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-xl">
                          <BookOpen className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Smart Study</h3>
                          <p className="text-sm text-gray-500">Access organized notes anywhere</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 p-3 rounded-xl">
                          <Users className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Study Rooms</h3>
                          <p className="text-sm text-gray-500">Learn together with peers</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <div className="bg-gray-100 rounded-xl py-3 px-6 flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm font-medium text-gray-700">AI Processing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
