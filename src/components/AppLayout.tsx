
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { HeaderNav } from '@/components/HeaderNav';
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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
  const [isStudyRoomPage, setIsStudyRoomPage] = useState(false);
  const [isStudyRoomChatPage, setIsStudyRoomChatPage] = useState(false);
  
  // Determine if sidebar should be shown based on the current path
  useEffect(() => {
    // Don't show sidebar on landing page, login, or authentication
    const noSidebarPaths = ['/', '/login', '/authentication'];
    setShowSidebar(!noSidebarPaths.includes(location.pathname));
    
    // Check if current page is a study room page
    setIsStudyRoomPage(location.pathname.includes('/study-room/') && !location.pathname.includes('/chat'));
    
    // Check if current page is a study room chat page
    setIsStudyRoomChatPage(location.pathname.includes('/study-room/') && location.pathname.includes('/chat'));
  }, [location.pathname]);
  
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
  
  // For study room chat, we want a clean layout to maximize chat space
  if (isStudyRoomChatPage) {
    return (
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen w-full max-w-full overflow-x-hidden">
            <main className="w-full h-screen">{children}</main>
            
            {/* Mobile sidebar for study room */}
            <MobileSidebar />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    );
  }
  
  // For study room pages (but not chat), we want a simpler layout without the sidebar
  if (isStudyRoomPage) {
    return (
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen w-full max-w-full overflow-x-hidden">
            <HeaderNav />
            <main className="pt-16 px-4 max-w-full overflow-x-auto">{children}</main>
            
            {/* Mobile sidebar for study room */}
            <MobileSidebar />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    );
  }
  
  // Default layout with sidebar for most pages
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
                {/* New HeaderNav component */}
                <HeaderNav />
                
                <main className="flex-1 p-4 md:p-6 overflow-auto">
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

export default AppLayout;
