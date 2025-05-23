
import React from 'react';
import { AppSidebar } from './AppSidebar';
import MobileDetection from './MobileDetection';
import { SidebarProvider } from './ui/sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <MobileDetection>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 overflow-x-hidden">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </MobileDetection>
  );
};

export default AppLayout;
