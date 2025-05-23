
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Network } from '@capacitor/network';

interface OfflineErrorScreenProps {
  message?: string;
  isOffline?: boolean;
  onRetry?: () => void;
}

export const OfflineErrorScreen = ({
  message = "Connection error",
  isOffline = true,
  onRetry,
}: OfflineErrorScreenProps) => {
  const navigate = useNavigate();
  
  const handleRetry = async () => {
    if (onRetry) {
      onRetry();
      return;
    }
    
    try {
      const status = await Network.getStatus();
      if (status.connected) {
        // Reload the current page
        window.location.reload();
      }
    } catch (error) {
      console.error('Error checking network status:', error);
      // Attempt reload anyway
      window.location.reload();
    }
  };
  
  const goHome = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <WifiOff size={40} className="text-gray-500 dark:text-gray-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {isOffline ? "You're offline" : "Something went wrong"}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xs mx-auto">
          {isOffline 
            ? "Please check your internet connection and try again" 
            : message || "We encountered an error. Please try again later."}
        </p>
        
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <Button 
            onClick={handleRetry} 
            className="w-full"
          >
            <RefreshCcw size={18} className="mr-2" />
            Retry
          </Button>
          
          <Button 
            variant="outline" 
            onClick={goHome} 
            className="w-full"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
