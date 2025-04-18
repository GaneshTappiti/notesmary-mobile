
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { HeaderNav } from '@/components/HeaderNav';
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isStudyRoomPage, setIsStudyRoomPage] = useState(false);
  const [isStudyRoomChatPage, setIsStudyRoomChatPage] = useState(false);
  const isMobile = useIsMobile();
  
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
  
  // Close drawer/sheet when navigating or when screen size changes
  useEffect(() => {
    setIsDrawerOpen(false);
    setIsSheetOpen(false);
  }, [location.pathname, isMobile]);
  
  if (!showSidebar) {
    return (
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-[100dvh] w-full max-w-full overflow-hidden">
            <Navbar />
            <main className="pt-16 px-4 pb-safe-bottom max-w-full overflow-x-auto overflow-y-auto">
              {children}
            </main>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    );
  }
  
  // Mobile sidebar with Sheet implementation (better UX than Drawer for this use case)
  const MobileSidebar = () => (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild className="md:hidden fixed top-3 left-3 z-50">
        <Button variant="ghost" size="icon" className="rounded-full bg-background/90 backdrop-blur-sm shadow-sm border">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[80%] max-w-[300px]">
        <AppSidebar />
      </SheetContent>
    </Sheet>
  );
  
  // For study room chat, we want a clean layout to maximize chat space
  if (isStudyRoomChatPage) {
    return (
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-[100dvh] w-full max-w-full overflow-hidden">
            <main className="w-full h-[100dvh] pb-safe-bottom">{children}</main>
            
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
          <div className="min-h-[100dvh] w-full max-w-full overflow-hidden">
            <HeaderNav />
            <main className="pt-16 px-4 pb-safe-bottom max-w-full overflow-x-auto overflow-y-auto">
              {children}
            </main>
            
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
        <div className="min-h-[100dvh] flex w-full max-w-full overflow-hidden">
          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <AppSidebar />
          </div>
          
          {/* Mobile sidebar with Sheet component */}
          <MobileSidebar />
          
          <SidebarInset>
            <div className="flex flex-col min-h-full max-w-full">
              {/* HeaderNav component */}
              <HeaderNav />
              
              <main className="flex-1 p-3 sm:p-4 md:p-6 pb-safe-bottom overflow-auto">
                {children}
              </main>
            </div>
          </SidebarInset>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
