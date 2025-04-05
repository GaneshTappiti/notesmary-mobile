
import React from 'react';
import { Button } from '@/components/ui/button';

interface DashboardEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}

export const DashboardEmptyState: React.FC<DashboardEmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  compact = false
}) => {
  return (
    <div className={`text-center ${compact ? 'py-3' : 'py-8'}`}>
      <div className={`mx-auto ${compact ? 'w-8 h-8' : 'w-16 h-16'} bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3`}>
        {React.cloneElement(icon as React.ReactElement, { 
          className: `${compact ? 'h-4 w-4' : 'h-8 w-8'} text-gray-400`
        })}
      </div>
      <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-medium text-gray-900 dark:text-gray-100`}>
        {title}
      </h3>
      <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-400 mt-1`}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button 
          onClick={onAction} 
          variant="outline" 
          size={compact ? "sm" : "default"}
          className="mt-3"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
