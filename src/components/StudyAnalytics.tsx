
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, PieChart, TrendingUp, UserCheck, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const StudyAnalytics = () => {
  const navigate = useNavigate();
  
  const handleTryNow = () => {
    navigate('/authentication');
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            PERSONALIZED INSIGHTS
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            AI-Powered Study Analytics
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Get personalized insights and recommendations to optimize your study habits and improve performance.
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
                <div className="text-white text-xs font-medium">Study Performance Dashboard</div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-medium text-gray-900">Weekly Study Overview</h3>
                    <p className="text-xs text-gray-500">Last updated: Today at 10:23 AM</p>
                  </div>
                  <select className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white">
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-blue-600 font-semibold text-xl">12.5h</div>
                    <div className="text-xs text-gray-600">Study Time</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-green-600 font-semibold text-xl">87%</div>
                    <div className="text-xs text-gray-600">Retention</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-purple-600 font-semibold text-xl">4</div>
                    <div className="text-xs text-gray-600">Topics Mastered</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                    <LineChart className="h-4 w-4 mr-1 text-blue-500" />
                    Study Time Distribution
                  </h4>
                  
                  <div className="bg-gray-50 rounded-lg p-4 h-40 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Simplified chart representation */}
                      <div className="absolute bottom-0 left-[10%] w-[10%] bg-blue-500 rounded-t-sm" style={{height: '30%'}}></div>
                      <div className="absolute bottom-0 left-[25%] w-[10%] bg-blue-500 rounded-t-sm" style={{height: '45%'}}></div>
                      <div className="absolute bottom-0 left-[40%] w-[10%] bg-blue-500 rounded-t-sm" style={{height: '20%'}}></div>
                      <div className="absolute bottom-0 left-[55%] w-[10%] bg-blue-500 rounded-t-sm" style={{height: '80%'}}></div>
                      <div className="absolute bottom-0 left-[70%] w-[10%] bg-blue-500 rounded-t-sm" style={{height: '60%'}}></div>
                      <div className="absolute bottom-0 left-[85%] w-[10%] bg-blue-500 rounded-t-sm" style={{height: '35%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3 text-gray-700 flex items-center">
                    <Target className="h-4 w-4 mr-1 text-purple-500" />
                    Focus Areas Recommendation
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-xs text-gray-700">Organic Chemistry - Reactions</span>
                      </div>
                      <span className="text-xs font-medium text-red-600">High Priority</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                        <span className="text-xs text-gray-700">Calculus - Integration</span>
                      </div>
                      <span className="text-xs font-medium text-amber-600">Medium Priority</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-xs text-gray-700">Physics - Kinematics</span>
                      </div>
                      <span className="text-xs font-medium text-green-600">Low Priority</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-blue-200 rounded-full blur-2xl opacity-60 z-0"></div>
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-purple-200 rounded-full blur-2xl opacity-60 z-0"></div>
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
                <div className="bg-blue-100 p-3 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Performance Analytics</h3>
                  <p className="text-gray-600">Track your study patterns, quiz results, and knowledge retention across subjects.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Adaptive Learning Paths</h3>
                  <p className="text-gray-600">AI customizes your learning journey based on your strengths and areas needing improvement.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Personalized Study Schedules</h3>
                  <p className="text-gray-600">Get AI-generated study plans optimized for your learning style and availability.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={handleTryNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                size="lg"
              >
                Access Your Analytics Dashboard
              </Button>
              <p className="text-sm text-gray-500 mt-3">Optimize your study approach with AI insights</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
