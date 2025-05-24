
import React from 'react';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from './ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import HorizontalNavBar from './mobile/HorizontalNavBar';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isMobile && <AppSidebar />}
        <main className={cn(
          "flex-1 overflow-x-hidden flex flex-col",
          isMobile && "pb-20" // Increased padding for floating nav
        )}>
          <div className="flex-1">
            {children}
          </div>
          {isMobile && <HorizontalNavBar />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
