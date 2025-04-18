
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
    document.title = "Notex - AI-Powered Learning Platform for Students";
    
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Responsive background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gradient-to-b from-blue-50 to-transparent -z-10" />
      
      {/* Responsive gradient orbs */}
      <motion.div 
        className="absolute top-[15%] right-[15%] w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full bg-blue-500/20 blur-2xl sm:blur-3xl"
        style={{ opacity }}
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div 
        className="absolute top-[30%] left-[10%] w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 rounded-full bg-purple-500/10 blur-xl sm:blur-2xl md:blur-3xl"
        animate={{
          x: [0, -15, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Main content with responsive container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
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
