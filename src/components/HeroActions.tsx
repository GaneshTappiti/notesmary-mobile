
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

export const HeroActions = () => {
  // Always call hooks at the top level, unconditionally
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  console.log("HeroActions render:", { isAuthenticated, isLoading });
  
  const handleGetStarted = () => {
    console.log("handleGetStarted clicked:", { isAuthenticated, isLoading });
    
    if (isLoading) {
      toast({
        title: "Loading",
        description: "Please wait while we check your authentication status."
      });
      return;
    }
    
    if (isAuthenticated) {
      navigate('/dashboard');
      toast({
        title: "Welcome Back",
        description: "Redirecting to your dashboard"
      });
    } else {
      // Redirect to the signup tab with proper state
      navigate('/authentication', { state: { activeTab: 'signup' } });
      toast({
        title: "Create an Account",
        description: "Let's get you started with Notex"
      });
    }
  };
  
  const handleLogin = () => {
    console.log("handleLogin clicked:", { isAuthenticated, isLoading });
    
    if (isLoading) {
      toast({
        title: "Loading",
        description: "Please wait while we check your authentication status."
      });
      return;
    }
    
    if (isAuthenticated) {
      navigate('/dashboard');
      toast({
        title: "Already Logged In",
        description: "You're already logged in. Redirecting to your dashboard."
      });
    } else {
      // Redirect to the login tab with proper state
      navigate('/authentication', { state: { activeTab: 'login' } });
    }
  };
  
  return (
    <motion.div 
      className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Button 
        size="lg" 
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 text-sm sm:text-base transition-all duration-300 group"
        onClick={handleGetStarted}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : (
          <>
            Try Notex
            <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
          </>
        )}
      </Button>
      <Button 
        size="lg" 
        variant="outline"
        className="px-5 py-2 text-sm sm:text-base transition-all duration-300 border-blue-200 hover:border-blue-400"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </Button>
    </motion.div>
  );
};
