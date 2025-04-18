
import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';
import { AIExamQuestions } from '@/components/AIExamQuestions';
import { StudyAnalytics } from '@/components/StudyAnalytics';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Notex - AI-Powered Learning Platform";
    
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 opacity-50 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-blue-400/20 dark:bg-blue-500/10 blur-3xl"
        style={{ opacity }}
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-purple-400/20 dark:bg-purple-500/10 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div 
        className="absolute top-1/3 left-1/3 w-36 h-36 rounded-full bg-green-400/20 dark:bg-green-500/10 blur-3xl"
        animate={{
          x: [0, 15, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <AIExamQuestions />
        <StudyAnalytics />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
