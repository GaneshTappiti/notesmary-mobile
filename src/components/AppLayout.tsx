
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { TooltipProvider } from "@/components/ui/tooltip";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Determine if sidebar should be shown based on the current path
  useEffect(() => {
    // Don't show sidebar on landing page, login, or authentication
    const noSidebarPaths = ['/', '/login', '/authentication'];
    setShowSidebar(!noSidebarPaths.includes(location.pathname));
  }, [location.pathname]);
  
  if (!showSidebar) {
    return (
      <TooltipProvider>
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-20">{children}</main>
        </div>
      </TooltipProvider>
    );
  }
  
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-col min-h-full">
              <div className="flex items-center p-4 border-b">
                <SidebarTrigger className="mr-2" />
                <h1 className="text-xl font-semibold">
                  {getPageTitle(location.pathname)}
                </h1>
              </div>
              <main className="flex-1 p-4">
                {children}
              </main>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

// Helper function to get page title based on current path
const getPageTitle = (pathname: string) => {
  const path = pathname.split('/')[1];
  
  const titles: Record<string, string> = {
    'dashboard': 'Dashboard',
    'upload-notes': 'Upload Notes',
    'find-notes': 'Find Notes',
    'view-notes': 'View Notes', 
    'ai-answers': 'AI Answers',
    'notifications': 'Notifications',
    'study-analytics': 'Study Analytics',
    'study-room': 'Study Room',
    'team': 'Team Collaboration',
    'ai-study-tips': 'AI Study Tips',
    'subscription': 'Subscription Management',
    'ai-insights': 'AI Insights'
  };
  
  return titles[path] || 'Notex';
};

export default AppLayout;
