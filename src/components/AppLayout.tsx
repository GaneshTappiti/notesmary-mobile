
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
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
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
  
  // Mobile drawer for sidebar on small screens
  const MobileSidebar = () => (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild className="md:hidden fixed top-3 left-3 z-50">
        <Button variant="ghost" size="icon" className="rounded-full bg-background/90 backdrop-blur-sm shadow-sm border">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0 max-h-screen h-screen">
        <div className="h-full overflow-y-auto">
          <AppSidebar />
        </div>
      </DrawerContent>
    </Drawer>
  );
  
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full max-w-full overflow-x-hidden">
            {/* Desktop sidebar */}
            <div className="hidden md:block">
              <AppSidebar />
            </div>
            
            {/* Mobile sidebar drawer */}
            <MobileSidebar />
            
            <SidebarInset>
              <div className="flex flex-col min-h-full max-w-full">
                <header className="sticky top-0 z-40 flex justify-between items-center p-3 border-b h-14 bg-background/95 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger className="hidden md:flex mr-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1">
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
                </header>
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
