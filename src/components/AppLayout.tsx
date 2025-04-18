
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { HeaderNav } from '@/components/HeaderNav';
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';
import Loading from '@/components/ui/loading';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isStudyRoomPage, setIsStudyRoomPage] = useState(false);
  const [isStudyRoomChatPage, setIsStudyRoomChatPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  useEffect(() => {
    // Don't show sidebar on landing page, login, or authentication
    const noSidebarPaths = ['/', '/login', '/authentication'];
    setShowSidebar(!noSidebarPaths.includes(location.pathname));
    
    // Check if current page is a study room page
    setIsStudyRoomPage(location.pathname.includes('/study-room/') && !location.pathname.includes('/chat'));
    
    // Check if current page is a study room chat page
    setIsStudyRoomChatPage(location.pathname.includes('/study-room/') && location.pathname.includes('/chat'));
  }, [location.pathname]);
  
  useEffect(() => {
    setIsSheetOpen(false);
  }, [location.pathname, isMobile]);
  
  // Determine layout based on page type
  const renderLayout = () => {
    if (!showSidebar) {
      return (
        <div className="min-h-[100dvh] w-full max-w-full overflow-hidden">
          <Navbar />
          <main className="pt-16 px-4 pb-safe-bottom max-w-full overflow-x-auto overflow-y-auto">
            {isLoading ? <Loading /> : children}
          </main>
        </div>
      );
    } 
    
    if (isStudyRoomChatPage) {
      return (
        <div className="min-h-[100dvh] w-full max-w-full overflow-hidden">
          <main className="w-full h-[100dvh] pb-safe-bottom">
            {isLoading ? <Loading /> : children}
          </main>
          <MobileSidebar isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} />
        </div>
      );
    } 
    
    if (isStudyRoomPage) {
      return (
        <div className="min-h-[100dvh] w-full max-w-full overflow-hidden">
          <HeaderNav />
          <main className="pt-16 px-4 pb-safe-bottom max-w-full overflow-x-auto overflow-y-auto">
            {isLoading ? <Loading /> : children}
          </main>
          <MobileSidebar isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} />
        </div>
      );
    } 
    
    return (
      <div className="min-h-[100dvh] flex w-full max-w-full overflow-hidden">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        
        <MobileSidebar isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} />
        
        <SidebarInset>
          <div className="flex flex-col min-h-full max-w-full">
            <HeaderNav />
            
            <main className="flex-1 p-3 sm:p-4 md:p-6 pb-safe-bottom overflow-auto">
              {isLoading ? <Loading /> : children}
            </main>
          </div>
        </SidebarInset>
      </div>
    );
  };

  return (
    <ThemeProvider>
      <TooltipProvider>
        {renderLayout()}
      </TooltipProvider>
    </ThemeProvider>
  );
};

const MobileSidebar = ({ isSheetOpen, setIsSheetOpen }: { isSheetOpen: boolean; setIsSheetOpen: (open: boolean) => void }) => (
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

export default AppLayout;
