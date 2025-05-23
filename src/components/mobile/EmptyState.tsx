
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  isOffline?: boolean;
  offlineText?: string;
}

export const EmptyState = ({
  title,
  description,
  icon,
  actionText,
  onAction,
  className,
  isOffline = false,
  offlineText = "Some content may not be available offline"
}: EmptyStateProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 h-[60vh]",
        className
      )}
    >
      <div className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center mb-6",
        isOffline ? "bg-amber-50 dark:bg-amber-900/30" : "bg-blue-50 dark:bg-blue-900/30"
      )}>
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
        {description}
      </p>
      
      {isOffline && (
        <div className="mb-4 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 p-2 px-3 rounded-md">
          {offlineText}
        </div>
      )}
      
      {actionText && onAction && (
        <Button 
          onClick={onAction}
          disabled={isOffline && actionText.toLowerCase().includes('create')}
        >
          {actionText}
        </Button>
      )}
    </motion.div>
  );
};
