
import React from 'react';
import { cn } from '@/lib/utils';
import HorizontalNavBar from './HorizontalNavBar';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
  className?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  hideBottomNav = false,
  className 
}) => {
  return (
    <div className={cn("min-h-screen flex flex-col w-full bg-gray-50", className)}>
      <main className={cn(
        "flex-1 overflow-x-hidden",
        !hideBottomNav && "pb-20" // Add bottom padding when nav is shown
      )}>
        <div className="px-4 py-6">
          {children}
        </div>
      </main>
      {!hideBottomNav && <HorizontalNavBar />}
    </div>
  );
};

export default MobileLayout;
