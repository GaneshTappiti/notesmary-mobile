
import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Clock, ListChecks, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const YoutubeSection = () => {
  const navigate = useNavigate();
  
  const handleTryNow = () => {
    navigate('/authentication');
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            NEW FEATURE
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            AI-Enhanced YouTube Learning
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Turn hours of video lectures into minutes of focused learning with our AI-powered YouTube summarization tool.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-1 relative z-10">
              <div className="bg-gray-900 rounded-t-xl p-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-white text-xs font-medium">YouTube Summarizer</div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r-lg flex items-center">
                      <Youtube className="h-4 w-4 mr-1" />
                      <span>Analyze</span>
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">Video Information</h3>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Calculus</span>
                  </div>
                  
                  <h4 className="text-sm font-medium mb-2">Understanding Derivatives: First Principles</h4>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>42:17 minutes</span>
                    </div>
                    <div className="flex items-center">
                      <Youtube className="h-3 w-3 mr-1 text-red-500" />
                      <span>Stanford Mathematics</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <ListChecks className="h-4 w-4 text-red-500 mr-2" />
                    <span>Key Points Summary</span>
                  </h3>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-red-600">1</span>
                      </div>
                      <span className="text-gray-700">Definition of a derivative as the rate of change of a function at a point</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-red-600">2</span>
                      </div>
                      <span className="text-gray-700">The limit definition of the derivative: f'(x) = lim h→0 [f(x+h) - f(x)]/h</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-red-600">3</span>
                      </div>
                      <span className="text-gray-700">Applications in physics: velocity as the derivative of position</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-red-200 rounded-full blur-2xl opacity-60 z-0"></div>
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-blue-200 rounded-full blur-2xl opacity-60 z-0"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-xl">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Save Hours of Study Time</h3>
                  <p className="text-gray-600">Extract key concepts from lengthy video lectures in minutes instead of watching the entire video.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <BookText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Comprehensive Notes</h3>
                  <p className="text-gray-600">AI generates structured notes with key points, formulas, and examples from the video content.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <ListChecks className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Perfect for Review</h3>
                  <p className="text-gray-600">Quickly review lecture content before exams without rewatching the entire video.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={handleTryNow}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium"
                size="lg"
              >
                Try YouTube Summarizer Now
              </Button>
              <p className="text-sm text-gray-500 mt-3">Works with any educational YouTube video</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
