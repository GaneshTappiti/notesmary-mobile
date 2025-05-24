
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { WifiOff, AlertTriangle, RefreshCw, Home, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BaseErrorScreenProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  iconColor?: string;
}

const BaseErrorScreen = ({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  iconColor = "text-gray-500"
}: BaseErrorScreenProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-sm w-full"
      >
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className={iconColor}>
            {icon}
          </div>
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-col gap-3">
          {primaryAction && (
            <Button 
              onClick={primaryAction.onClick}
              className="w-full"
              disabled={primaryAction.loading}
            >
              {primaryAction.loading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              {primaryAction.label}
            </Button>
          )}
          
          {secondaryAction && (
            <Button 
              variant="outline" 
              onClick={secondaryAction.onClick}
              className="w-full"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Offline Error Screen
export const OfflineScreen = () => {
  const navigate = useNavigate();
  const [isRetrying, setIsRetrying] = React.useState(false);
  
  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      // Check network status
      const response = await fetch('/api/health-check', { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Network check failed:', error);
      setTimeout(() => setIsRetrying(false), 2000);
    }
  };
  
  return (
    <BaseErrorScreen
      title="You're offline"
      description="Please check your internet connection and try again. Some features may not be available in offline mode."
      icon={<WifiOff size={40} />}
      iconColor="text-red-500"
      primaryAction={{
        label: "Retry Connection",
        onClick: handleRetry,
        loading: isRetrying
      }}
      secondaryAction={{
        label: "Continue Offline",
        onClick: () => navigate('/dashboard')
      }}
    />
  );
};

// 404 Not Found Screen
export const NotFoundScreen = () => {
  const navigate = useNavigate();
  
  return (
    <BaseErrorScreen
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved. Let's get you back on track."
      icon={<Search size={40} />}
      iconColor="text-blue-500"
      primaryAction={{
        label: "Go to Home",
        onClick: () => navigate('/dashboard')
      }}
      secondaryAction={{
        label: "Go Back",
        onClick: () => navigate(-1)
      }}
    />
  );
};

// General Error Screen
export const GeneralErrorScreen = ({ 
  error, 
  resetError 
}: { 
  error?: Error; 
  resetError?: () => void; 
}) => {
  const navigate = useNavigate();
  
  return (
    <BaseErrorScreen
      title="Something went wrong"
      description={error?.message || "We encountered an unexpected error. Please try again or contact support if the problem persists."}
      icon={<AlertTriangle size={40} />}
      iconColor="text-orange-500"
      primaryAction={{
        label: "Try Again",
        onClick: resetError || (() => window.location.reload())
      }}
      secondaryAction={{
        label: "Go Home",
        onClick: () => navigate('/dashboard')
      }}
    />
  );
};

// No Data Screen
export const NoDataScreen = ({ 
  title = "No Data Found",
  description = "We couldn't find what you're looking for.",
  actionLabel = "Refresh",
  onAction
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) => {
  const navigate = useNavigate();
  
  return (
    <BaseErrorScreen
      title={title}
      description={description}
      icon={<Search size={40} />}
      iconColor="text-gray-400"
      primaryAction={onAction ? {
        label: actionLabel,
        onClick: onAction
      } : undefined}
      secondaryAction={{
        label: "Go Back",
        onClick: () => navigate(-1)
      }}
    />
  );
};

// Maintenance Screen
export const MaintenanceScreen = () => {
  return (
    <BaseErrorScreen
      title="Under Maintenance"
      description="We're currently performing maintenance to improve your experience. Please check back in a few minutes."
      icon={<AlertTriangle size={40} />}
      iconColor="text-yellow-500"
      primaryAction={{
        label: "Check Again",
        onClick: () => window.location.reload()
      }}
    />
  );
};
