
import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';

const Index = () => {
  // Initialize framer-motion scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  useEffect(() => {
    document.title = "NOTES4U - AI-Powered Learning Platform for Students";
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fancy background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-blue-50 to-transparent -z-10" />
      
      {/* Gradient orbs for visual interest */}
      <motion.div 
        className="absolute top-[15%] right-[15%] w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"
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
        className="absolute top-[30%] left-[10%] w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"
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
      
      {/* Main content */}
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
