
import React from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, CheckCircle, HelpCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const AIExamQuestions = () => {
  const navigate = useNavigate();
  
  const handleTryNow = () => {
    navigate('/authentication');
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-red-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            EXAM PREPARATION
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            AI-Created Exam Question Bank
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Our AI analyzes your study materials and predicts likely exam questions to help you prepare effectively.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <FileQuestion className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Predictive Question Generation</h3>
                  <p className="text-gray-600">Our AI analyzes your course materials to generate questions that are likely to appear on your exams.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Comprehensive Answer Keys</h3>
                  <p className="text-gray-600">Each question comes with detailed explanations and step-by-step solutions to help you understand concepts better.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Focus on Weak Areas</h3>
                  <p className="text-gray-600">The system identifies topics you struggle with and generates more questions in those areas for targeted practice.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={handleTryNow}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium"
                size="lg"
              >
                Generate Practice Questions Now
              </Button>
              <p className="text-sm text-gray-500 mt-3">Works with any uploaded course material</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
                <div className="text-white text-xs font-medium">AI Exam Question Generator</div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-medium text-gray-900">Organic Chemistry - Chapter 4</h3>
                    <p className="text-xs text-gray-500">Based on your uploaded lecture notes</p>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">15 Questions</span>
                </div>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-purple-600">1</span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">Which of the following reactions would be classified as an electrophilic aromatic substitution?</p>
                        
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                            <span className="text-sm text-gray-700">Friedel-Crafts alkylation of benzene</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                            <span className="text-sm text-gray-700">SN2 reaction of bromoethane with hydroxide</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border border-purple-500 bg-purple-500"></div>
                            <span className="text-sm text-gray-700">Nitration of benzene with nitric acid</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                            <span className="text-sm text-gray-700">Hydrogenation of cyclohexene</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 ml-9">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800">Correct Answer: Nitration of benzene with nitric acid</p>
                          <p className="text-xs text-green-700 mt-1">Nitration of benzene involves the attack of an electrophile (NO2+) on the aromatic ring, making it an electrophilic aromatic substitution reaction.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-purple-600">2</span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">Draw the major product of the following reaction: Benzene + Cl2 in the presence of FeCl3.</p>
                        
                        <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                          <span className="text-sm text-gray-500">Drawing interface not available in preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" size="sm" className="text-gray-600">
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">1</span>
                    <span className="text-sm text-gray-400">/</span>
                    <span className="text-sm text-gray-600">15</span>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Next
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-purple-200 rounded-full blur-2xl opacity-60 z-0"></div>
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-blue-200 rounded-full blur-2xl opacity-60 z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
