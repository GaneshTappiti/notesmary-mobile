
import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export const PageContainer = ({ 
  children, 
  className, 
  fullWidth = false,
  noPadding = false,
  ...props 
}: PageContainerProps) => {
  return (
    <div 
      className={cn(
        "container mx-auto",
        !noPadding && "py-6 px-4 md:px-6",
        fullWidth ? "max-w-full" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
