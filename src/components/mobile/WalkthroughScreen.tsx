
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Upload, Users, BrainCircuit, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Preferences } from '@capacitor/preferences';

interface WalkthroughScreenProps {
  onComplete: () => void;
}

interface WalkthroughSlide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  illustration?: string;
}

export const WalkthroughScreen = ({ onComplete }: WalkthroughScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides: WalkthroughSlide[] = [
    {
      id: 1,
      title: "Welcome to StudyPulse",
      description: "Your AI-powered learning companion that transforms how you study and collaborate with others.",
      icon: <BookOpen size={60} className="text-white" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Upload & Transform Notes",
      description: "Take photos of handwritten notes and let AI convert them into searchable, organized digital content.",
      icon: <Upload size={60} className="text-white" />,
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Join Study Rooms",
      description: "Collaborate with peers in real-time study sessions. Share knowledge and solve problems together.",
      icon: <Users size={60} className="text-white" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "AI-Powered Assistance",
      description: "Get instant answers to your questions and personalized study recommendations powered by advanced AI.",
      icon: <BrainCircuit size={60} className="text-white" />,
      color: "bg-gradient-to-br from-orange-500 to-red-500"
    }
  ];
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };
  
  const handleComplete = async () => {
    try {
      await Preferences.set({
        key: 'walkthrough-completed',
        value: 'true'
      });
      onComplete();
    } catch (error) {
      console.error('Error saving walkthrough status:', error);
      onComplete();
    }
  };
  
  const handleSkip = () => {
    handleComplete();
  };
  
  const currentSlideData = slides[currentSlide];
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Progress indicator */}
      <div className="w-full px-8 pt-8 flex gap-2 justify-center">
        {slides.map((_, index) => (
          <motion.div 
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-blue-600 w-8' : 
              index < currentSlide ? 'bg-blue-300 w-4' : 'bg-gray-200 dark:bg-gray-700 w-4'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
      
      {/* Skip button */}
      <div className="flex justify-end px-6 pt-4">
        {currentSlide < slides.length - 1 && (
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            className="text-gray-500 dark:text-gray-400"
          >
            Skip
          </Button>
        )}
      </div>
      
      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-sm"
          >
            {/* Icon/Illustration */}
            <motion.div 
              className={`${currentSlideData.color} w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {currentSlideData.icon}
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentSlideData.title}
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentSlideData.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation */}
      <div className="p-8 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentSlide === 0}
          className="rounded-full px-6"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back
        </Button>
        
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        
        <Button 
          onClick={handleNext}
          className={`rounded-full px-6 ${
            currentSlide === slides.length - 1 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {currentSlide === slides.length - 1 ? (
            <>
              Get Started <Check size={16} className="ml-1" />
            </>
          ) : (
            <>
              Next <ChevronRight size={16} className="ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
