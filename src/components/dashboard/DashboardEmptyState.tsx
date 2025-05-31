
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface DashboardEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
  illustration?: React.ReactNode;
}

export const DashboardEmptyState: React.FC<DashboardEmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  compact = false,
  illustration
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`text-center ${compact ? 'py-4' : 'py-8'}`}
    >
      {illustration || (
        <div className={`mx-auto ${compact ? 'w-12 h-12' : 'w-20 h-20'} bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-800`}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: `${compact ? 'h-6 w-6' : 'h-10 w-10'} text-blue-500 dark:text-blue-400`
          })}
        </div>
      )}
      
      <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold text-gray-900 dark:text-gray-100 mb-2`}>
        {title}
      </h3>
      <p className={`${compact ? 'text-sm' : 'text-base'} text-gray-500 dark:text-gray-400 mb-4 max-w-sm mx-auto leading-relaxed`}>
        {description}
      </p>
      
      {actionLabel && onAction && (
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={onAction} 
            variant={compact ? "outline" : "default"}
            size={compact ? "sm" : "default"}
            className="mt-2"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
