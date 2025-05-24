
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
  
  if (isMobile) {
    // Mobile layout with bottom navigation
    return (
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        <main className="flex-1 overflow-x-hidden pb-20">
          {children}
        </main>
        <HorizontalNavBar />
      </div>
    );
  }
  
  // Desktop layout with sidebar
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden flex flex-col">
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
