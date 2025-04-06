
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { HeaderNav } from '@/components/HeaderNav';
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Menu, Upload, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from '@/hooks/use-mobile';
import { UploadModal } from '@/components/UploadModal';

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
  const [showUploadModal, setShowUploadModal] = useState(false);
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
  
  // Close drawer when navigating or when screen size changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname, isMobile]);
  
  if (!showSidebar) {
    return (
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen w-full max-w-full overflow-hidden">
            <Navbar />
            <main className="pt-16 px-4 pb-safe-bottom max-w-full overflow-x-auto overflow-y-auto">
              {children}
            </main>
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
      <DrawerContent className="p-0 max-h-[90vh] h-[90vh] rounded-t-xl">
        <div className="h-full overflow-y-auto">
          <AppSidebar />
        </div>
      </DrawerContent>
    </Drawer>
  );
  
  // Floating action button for quick actions
  const FloatingActionButton = () => (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col items-end gap-3">
        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowUploadModal(true)}
        >
          <Upload className="h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-background border-blue-200 hover:border-blue-300"
          onClick={() => navigate('/ai-answers')}
        >
          <Search className="h-5 w-5 text-blue-600" />
        </Button>
      </div>
    </div>
  );
  
  // For study room chat, we want a clean layout to maximize chat space
  if (isStudyRoomChatPage) {
    return (
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen w-full max-w-full overflow-hidden">
            <main className="w-full h-screen pb-safe-bottom">{children}</main>
            
            {/* Mobile sidebar for study room */}
            <MobileSidebar />
            <FloatingActionButton />
            <UploadModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
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
          <div className="min-h-screen w-full max-w-full overflow-hidden">
            <HeaderNav />
            <main className="pt-16 px-4 pb-safe-bottom max-w-full overflow-x-auto overflow-y-auto">
              {children}
            </main>
            
            {/* Mobile sidebar for study room */}
            <MobileSidebar />
            <FloatingActionButton />
            <UploadModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    );
  }
  
  // Default layout with sidebar for most pages
  return (
    <ThemeProvider>
      <TooltipProvider>
        <div className="min-h-screen flex w-full max-w-full overflow-hidden">
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
              
              <main className="flex-1 p-4 md:p-6 pb-safe-bottom overflow-auto">
                {children}
              </main>
            </div>
          </SidebarInset>
          
          <FloatingActionButton />
          <UploadModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
