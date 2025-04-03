
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Determine if sidebar should be shown based on the current path
  useEffect(() => {
    // Don't show sidebar on landing page, login, or authentication
    const noSidebarPaths = ['/', '/login', '/authentication'];
    setShowSidebar(!noSidebarPaths.includes(location.pathname));
  }, [location.pathname]);
  
  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem("isLoggedIn");
    
    // Show toast notification
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
      duration: 3000,
    });
    
    // Redirect to home page
    navigate('/');
  };
  
  if (!showSidebar) {
    return (
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen w-full max-w-full overflow-x-hidden">
            <Navbar />
            <main className="pt-16 px-4 max-w-full overflow-x-auto">{children}</main>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full max-w-full overflow-x-hidden">
            <AppSidebar />
            <SidebarInset>
              <div className="flex flex-col min-h-full max-w-full">
                <div className="flex justify-between items-center p-3 border-b h-14">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger className="mr-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1">
                      <Menu className="h-5 w-5" />
                    </SidebarTrigger>
                    <h1 className="text-lg font-semibold truncate">
                      {getPageTitle(location.pathname)}
                    </h1>
                  </div>
                  
                  {/* Sign out button in top navigation */}
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1"
                    >
                      <LogOut size={16} />
                      <span className="hidden sm:inline">Sign Out</span>
                    </Button>
                  </div>
                </div>
                <main className="flex-1 p-3 overflow-auto">
                  {children}
                </main>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
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
    'subscription': 'Subscription Management',
  };
  
  return titles[path] || 'Notex';
};

export default AppLayout;
