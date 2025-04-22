
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

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    // Add layoutEffect: false to prevent the warning
    layoutEffect: false
  });
  
  // Transform values for the gradient background
  const bgOpacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgOpacity2 = useTransform(scrollYProgress, [0, 1], [0.5, 0.8]);
  const bgPosition = useTransform(scrollYProgress, [0, 1], ['0% 0%', '100% 100%']);

  // Back to top visibility
  const backToTopOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  useEffect(() => {
    document.title = "Notex - AI-Powered Learning Platform";
    
    // Don't redirect on the index page even if authenticated
    // This allows both logged-in and logged-out users to see the landing page
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If still loading auth state, don't render anything until we know
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-blue-500">Loading...</div>
    </div>;
  }

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-50 to-white relative"
      ref={containerRef}
    >
      {/* Animated gradient backgrounds */}
      <motion.div 
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-100/50 to-purple-100/30 -z-10"
        style={{ opacity: bgOpacity1, backgroundPosition: bgPosition }}
      />
      <motion.div 
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-tr from-indigo-100/30 to-pink-100/20 -z-10"
        style={{ opacity: bgOpacity2 }}
      />
      
      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 -z-10"></div>

      {/* Back to top button */}
      <motion.div 
        className="fixed right-4 bottom-4 z-50"
        style={{ opacity: backToTopOpacity }}
      >
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
          onClick={scrollToTop}
        >
          <ArrowUpCircle size={20} />
        </Button>
      </motion.div>

      <Navbar />
      
      <main>
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
