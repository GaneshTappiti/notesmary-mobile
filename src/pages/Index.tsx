
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Features } from '@/components/Features';
import { Upload, MessageSquare, BrainCircuit, Users, FileText, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    document.title = "Notex - AI-Powered Learning Platform";
    
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate, isAuthenticated, isLoading]);

  // If still loading auth state, show minimal loading
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="relative z-10">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full bg-purple-50 border border-purple-100"
                >
                  <span className="text-xs font-semibold tracking-wide text-purple-600 uppercase">
                    AI-Driven Study Platform
                  </span>
                </motion.div>
                
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <span className="block">AI-Powered Study</span>
                  <span className="block">Buddy. </span>
                  <span className="block text-purple-600">Smarter Than Toppers.</span>
                </motion.h1>
                
                <motion.p 
                  className="mt-3 text-lg text-gray-600 sm:mt-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Get instant answers, join study rooms, and own your exams. Transform your handwritten notes into organized digital study materials.
                </motion.p>
                
                <motion.div 
                  className="mt-8 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Button 
                    size="lg"
                    onClick={() => navigate('/authentication')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Try Notex
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                  >
                    Watch Demo
                  </Button>
                </motion.div>

                <motion.div 
                  className="mt-6 flex items-center gap-2 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600"
                      />
                    ))}
                  </div>
                  <span>10K+ students already learning</span>
                </motion.div>
              </div>

              <motion.div 
                className="mt-12 lg:mt-0 relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="bg-purple-50 rounded-3xl p-8 relative overflow-hidden">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="p-3 rounded-lg bg-purple-100">
                        <Upload className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Upload Notes</h3>
                        <p className="text-sm text-gray-500">Transform your handwritten notes</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="p-3 rounded-lg bg-blue-100">
                        <BrainCircuit className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">AI Processing</h3>
                        <p className="text-sm text-gray-500">Let AI structure your notes</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="p-3 rounded-lg bg-green-100">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Study Together</h3>
                        <p className="text-sm text-gray-500">Join study rooms with peers</p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="bg-purple-100/50 rounded-xl py-3 px-6 flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium text-purple-900">AI Processing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Sections */}
        <Features />
      </main>
    </div>
  );
};

export default Index;
