
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FileText, BrainCircuit, Bell, User, Plus } from 'lucide-react';
import { SplashScreen } from '@capacitor/splash-screen';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
}

export const MobileLayout = ({ children, hideBottomNav = false }: MobileLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Hide the splash screen after the component mounts
    const hideSplash = async () => {
      try {
        await SplashScreen.hide();
      } catch (error) {
        console.log('Error hiding splash screen:', error);
      }
    };
    
    // This timeout simulates the app loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
      hideSplash();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { icon: <Home size={24} />, path: '/dashboard', label: 'Home' },
    { icon: <FileText size={24} />, path: '/my-notes', label: 'Notes' },
    { icon: <BrainCircuit size={24} />, path: '/ai-answers', label: 'AI' },
    { icon: <Bell size={24} />, path: '/notifications', label: 'Alerts' },
    { icon: <User size={24} />, path: '/settings', label: 'Profile' },
  ];
  
  const handleFabClick = () => {
    navigate('/upload-notes');
    toast({
      title: "Create Note",
      description: "Upload a new note or create one from scratch",
    });
  };

  if (isLoading) {
    return null; // The splash screen is showing
  }

  return (
    <div className="flex flex-col min-h-[100dvh] pb-16 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {children}
      
      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-20 right-5 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={handleFabClick}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          size="icon"
        >
          <Plus size={24} className="text-white" />
        </Button>
      </motion.div>
      
      {/* Bottom Navigation */}
      {!hideBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t dark:border-gray-800 h-16 z-30">
          <nav className="flex justify-around items-center h-full px-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full text-xs transition-colors",
                  isActive(item.path) 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-500 dark:text-gray-400"
                )}
                onClick={() => navigate(item.path)}
              >
                <div className="mb-1">{item.icon}</div>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};
