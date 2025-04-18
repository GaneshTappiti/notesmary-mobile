
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { HeaderNav } from '@/components/HeaderNav';
import { TooltipProvider } from "@/components/ui/tooltip";
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

  // Handle loading state
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // Determine page type
  useEffect(() => {
    // Don't show sidebar on landing page, login, or authentication
    const noSidebarPaths = ['/', '/login', '/authentication'];
    setShowSidebar(!noSidebarPaths.includes(location.pathname));
    
    // Check if current page is a study room page
    setIsStudyRoomPage(location.pathname.includes('/study-room/') && !location.pathname.includes('/chat'));
    
    // Check if current page is a study room chat page
    setIsStudyRoomChatPage(location.pathname.includes('/study-room/') && location.pathname.includes('/chat'));
  }, [location.pathname]);
  
  // Close mobile sidebar on page change
  useEffect(() => {
    setIsSheetOpen(false);
  }, [location.pathname, isMobile]);
  
  // Mobile sidebar component
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
  
  // Standard content layout
  const renderStandardContent = () => (
    <div className="flex flex-col min-h-full max-w-full">
      <HeaderNav />
      <main className="flex-1 p-3 sm:p-4 md:p-6 pb-safe-bottom overflow-auto">
        {isLoading ? (
          <div className="max-w-xl mx-auto">
            <Loading containerClassName="p-4" />
          </div>
        ) : children}
      </main>
    </div>
  );

  // Render based on page type, using early returns
  if (!showSidebar) {
    return (
      <TooltipProvider>
        <div className="min-h-[100dvh] w-full max-w-full overflow-hidden">
          <Navbar />
          <main className="pt-16 px-4 pb-safe-bottom max-w-full overflow-x-auto overflow-y-auto">
            {isLoading ? (
              <div className="max-w-xl mx-auto">
                <Loading containerClassName="p-4" />
              </div>
            ) : children}
          </main>
        </div>
      </TooltipProvider>
    );
  } 
  
  if (isStudyRoomChatPage) {
    return (
      <TooltipProvider>
        <div className="min-h-[100dvh] w-full max-w-full overflow-hidden">
          <main className="w-full h-[100dvh] pb-safe-bottom">
            {isLoading ? (
              <div className="max-w-xl mx-auto">
                <Loading containerClassName="p-4" />
              </div>
            ) : children}
          </main>
          <MobileSidebar />
        </div>
      </TooltipProvider>
    );
  } 
  
  if (isStudyRoomPage) {
    return (
      <TooltipProvider>
        <div className="min-h-[100dvh] w-full max-w-full overflow-hidden">
          <HeaderNav />
          <main className="pt-16 px-4 pb-safe-bottom max-w-full overflow-x-auto overflow-y-auto">
            {isLoading ? (
              <div className="max-w-xl mx-auto">
                <Loading containerClassName="p-4" />
              </div>
            ) : children}
          </main>
          <MobileSidebar />
        </div>
      </TooltipProvider>
    );
  } 
  
  // Default layout with sidebar
  return (
    <TooltipProvider>
      <div className="min-h-[100dvh] flex w-full max-w-full overflow-hidden">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        
        <MobileSidebar />
        
        <SidebarInset>
          {renderStandardContent()}
        </SidebarInset>
      </div>
    </TooltipProvider>
  );
};

export default AppLayout;
