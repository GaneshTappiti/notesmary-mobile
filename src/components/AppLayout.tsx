
import React from 'react';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from './ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import HorizontalNavBar from './mobile/HorizontalNavBar';

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
          isMobile && "pb-16" // Add padding at the bottom when on mobile to account for the navigation bar
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
