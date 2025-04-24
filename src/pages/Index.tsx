
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { AIExamQuestions } from '@/components/AIExamQuestions';
import { StudyAnalytics } from '@/components/StudyAnalytics';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';
import { ArrowUpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { PageContainer } from '@/components/PageContainer';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });
  
  const bgOpacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgOpacity2 = useTransform(scrollYProgress, [0, 1], [0.5, 0.8]);
  const bgPosition = useTransform(scrollYProgress, [0, 1], ['0% 0%', '100% 100%']);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const backToTopOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  useEffect(() => {
    document.title = "Notex - AI-Powered Learning Platform";
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-50 to-white relative"
      ref={containerRef}
    >
      <motion.div 
        className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-100/50 to-purple-100/30 -z-10"
        style={{ opacity: bgOpacity1, backgroundPosition: bgPosition }}
      />
      <motion.div 
        className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-tr from-indigo-100/30 to-pink-100/20 -z-10"
        style={{ opacity: bgOpacity2 }}
      />
      
      <motion.div 
        className="fixed top-1/4 -left-64 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 -z-10"
        style={{ y: parallaxY }}
      />
      <motion.div 
        className="fixed top-1/3 -right-64 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 -z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }}
      />
      <motion.div 
        className="fixed bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 -z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '40%']) }}
      />

      <motion.div 
        className="fixed right-6 bottom-6 z-50"
        style={{ opacity: backToTopOpacity }}
      >
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
          onClick={scrollToTop}
        >
          <ArrowUpCircle className="h-5 w-5 text-gray-700" />
        </Button>
      </motion.div>

      <Navbar />
      
      <main className="relative z-10 space-y-24 pb-24">
        <Hero />
        <Features />
        <AIExamQuestions />
        <StudyAnalytics />
        <Pricing />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
