
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Check, Upload, Users, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Preferences } from '@capacitor/preferences';

interface OnboardingProps {
  onComplete: () => void;
}

interface OnboardingScreen {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  
  const screens: OnboardingScreen[] = [
    {
      title: "Upload & Transform",
      description: "Upload your handwritten notes and transform them into organized digital study materials with the power of AI.",
      icon: <Upload size={48} className="text-white" />,
      color: "bg-blue-600"
    },
    {
      title: "Join Study Rooms",
      description: "Collaborate with peers in virtual study rooms to solve problems and share knowledge in real-time.",
      icon: <Users size={48} className="text-white" />,
      color: "bg-green-600"
    },
    {
      title: "AI-Powered Learning",
      description: "Get instant answers to questions and receive AI assistance for all your study needs.",
      icon: <BrainCircuit size={48} className="text-white" />,
      color: "bg-purple-600"
    }
  ];
  
  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(prev => prev + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleComplete = async () => {
    try {
      await Preferences.set({
        key: 'onboarding-completed',
        value: 'true'
      });
      onComplete();
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      // Proceed anyway
      onComplete();
    }
  };
  
  const handleSkip = () => {
    handleComplete();
  };
  
  const currentItem = screens[currentScreen];
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Progress indicator */}
      <div className="w-full px-8 pt-8 flex gap-2 justify-center">
        {screens.map((_, index) => (
          <div 
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentScreen ? 'bg-blue-600 w-8' : 'bg-gray-200 dark:bg-gray-700 w-4'
            }`}
          />
        ))}
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm"
        >
          <div className={`${currentItem.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8`}>
            {currentItem.icon}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {currentItem.title}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {currentItem.description}
          </p>
        </motion.div>
      </div>
      
      <div className="p-8 flex justify-between items-center">
        {currentScreen < screens.length - 1 ? (
          <>
            <Button 
              variant="ghost" 
              onClick={handleSkip}
              className="text-gray-500"
            >
              Skip
            </Button>
            
            <Button 
              onClick={handleNext} 
              className="rounded-full px-6"
            >
              Next <ChevronRight size={16} className="ml-1" />
            </Button>
          </>
        ) : (
          <>
            <div />
            <Button 
              onClick={handleComplete} 
              className="rounded-full px-6 bg-green-600 hover:bg-green-700"
            >
              Get Started <Check size={16} className="ml-1" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
