
import React from 'react';
import { cn } from '@/lib/utils';
import HorizontalNavBar from './HorizontalNavBar';
import { PageTransition } from './PageTransition';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
  className?: string;
  pageTransition?: boolean;
  transitionDirection?: 'left' | 'right' | 'up' | 'down';
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  hideBottomNav = false,
  className,
  pageTransition = true,
  transitionDirection = 'right'
}) => {
  return (
    <div className={cn("min-h-screen flex flex-col w-full bg-gray-50", className)}>
      <main className={cn(
        "flex-1 overflow-x-hidden",
        !hideBottomNav && "pb-20" // Add bottom padding when nav is shown
      )}>
        <div className="px-4 py-4 safe-top">
          <ErrorBoundary>
            {pageTransition ? (
              <PageTransition direction={transitionDirection}>
                {children}
              </PageTransition>
            ) : (
              children
            )}
          </ErrorBoundary>
        </div>
      </main>
      {!hideBottomNav && (
        <ErrorBoundary>
          <HorizontalNavBar />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default MobileLayout;
