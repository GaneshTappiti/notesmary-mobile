
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Check, 
  Upload, 
  Users, 
  BrainCircuit, 
  BookOpen,
  Target,
  Sparkles,
  ArrowRight,
  Skip
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  image?: string;
}

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welcome to StudyPulse",
      subtitle: "Your AI-powered study companion",
      description: "Transform your learning experience with cutting-edge AI technology and collaborative study tools.",
      icon: <Sparkles size={48} className="text-white" />,
      gradient: "from-blue-600 to-purple-600",
      features: ["Smart note organization", "AI-powered insights", "Real-time collaboration"],
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 2,
      title: "Upload & Transform Notes",
      subtitle: "Digitize your handwritten notes instantly",
      description: "Upload handwritten notes and transform them into organized, searchable digital study materials with AI assistance.",
      icon: <Upload size={48} className="text-white" />,
      gradient: "from-green-500 to-teal-600",
      features: ["OCR text recognition", "Auto-categorization", "Smart formatting"],
      image: "photo-1649972904349-6e44c42644a7"
    },
    {
      id: 3,
      title: "Join Study Rooms",
      subtitle: "Collaborate with your peers",
      description: "Connect with classmates in virtual study rooms to solve problems, share knowledge, and learn together in real-time.",
      icon: <Users size={48} className="text-white" />,
      gradient: "from-orange-500 to-red-600",
      features: ["Real-time chat", "Screen sharing", "Group problem solving"],
      image: "photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 4,
      title: "AI-Powered Learning",
      subtitle: "Get instant answers and insights",
      description: "Leverage advanced AI to get explanations, solve complex problems, and receive personalized study recommendations.",
      icon: <BrainCircuit size={48} className="text-white" />,
      gradient: "from-purple-600 to-pink-600",
      features: ["Instant Q&A", "Smart recommendations", "Personalized insights"],
      image: "photo-1721322800607-8c38375eef04"
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleComplete = () => {
    navigate('/dashboard');
  };
  
  const handleSkip = () => {
    navigate('/dashboard');
  };
  
  const currentStepData = steps[currentStep];
  
  return (
    <>
      <Helmet>
        <title>Welcome to StudyPulse | Get Started</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Skip Button */}
        <div className="absolute top-6 right-6 z-40">
          <Button variant="ghost" onClick={handleSkip} className="text-gray-600 hover:text-gray-800">
            <Skip className="h-4 w-4 mr-2" />
            Skip Tour
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Side - Content */}
          <div className="flex-1 flex flex-col justify-center p-6 lg:p-12">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Icon and Badge */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentStepData.gradient} flex items-center justify-center shadow-lg`}>
                      {currentStepData.icon}
                    </div>
                    <Badge variant="secondary" className="px-3 py-1">
                      Step {currentStep + 1} of {steps.length}
                    </Badge>
                  </div>

                  {/* Title and Subtitle */}
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                      {currentStepData.title}
                    </h1>
                    <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">
                      {currentStepData.subtitle}
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {currentStepData.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    {currentStepData.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
              >
                <Card className="overflow-hidden shadow-2xl">
                  <CardContent className="p-0">
                    <div className={`h-64 bg-gradient-to-br ${currentStepData.gradient} flex items-center justify-center relative overflow-hidden`}>
                      {currentStepData.image && (
                        <img
                          src={`https://images.unsplash.com/${currentStepData.image}?w=600&h=400&fit=crop`}
                          alt={currentStepData.title}
                          className="w-full h-full object-cover opacity-30"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                          className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm"
                        >
                          {currentStepData.icon}
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white dark:bg-gray-800">
                      <div className="flex justify-center space-x-2 mb-4">
                        {steps.map((_, index) => (
                          <motion.div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              index === currentStep 
                                ? 'bg-blue-600 w-8' 
                                : index < currentStep 
                                  ? 'bg-green-500 w-2' 
                                  : 'bg-gray-200 dark:bg-gray-600 w-2'
                            }`}
                            layoutId={`indicator-${index}`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                        {currentStep + 1} of {steps.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="opacity-50 hover:opacity-100 disabled:opacity-30"
            >
              Previous
            </Button>

            <div className="flex gap-3">
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                  size="lg"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8"
                  size="lg"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingScreen;
