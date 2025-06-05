
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './MobileSidebar';
import { MobileSidebarTrigger } from './MobileSidebarTrigger';
import { PageTransition } from './PageTransition';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
  className?: string;
  pageTransition?: boolean;
  transitionDirection?: 'left' | 'right' | 'up' | 'down';
  showSidebarTrigger?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  hideSidebar = false,
  className,
  pageTransition = true,
  transitionDirection = 'right',
  showSidebarTrigger = true
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={cn("min-h-screen flex flex-col w-full bg-gray-50", className)}>
      {/* Sidebar Trigger - Fixed to top left */}
      {showSidebarTrigger && !hideSidebar && (
        <div className="fixed top-4 left-4 z-30 safe-top">
          <MobileSidebarTrigger onClick={() => setSidebarOpen(true)} />
        </div>
      )}

      <main className="flex-1 overflow-x-hidden">
        <div className={cn(
          "px-4 py-4 safe-top",
          showSidebarTrigger && !hideSidebar && "pt-16" // Add top padding when trigger is shown
        )}>
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

      {/* Mobile Sidebar */}
      {!hideSidebar && (
        <ErrorBoundary>
          <MobileSidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default MobileLayout;
