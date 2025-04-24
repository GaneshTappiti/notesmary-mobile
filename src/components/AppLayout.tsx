
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';  // Note the capitalization
import { HeaderNav } from '@/components/HeaderNav';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

const MobileSidebar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild className="md:hidden fixed top-3 left-3 z-50">
        <Button variant="ghost" size="icon" className="rounded-full bg-background/90 backdrop-blur-sm shadow-sm border">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[80%] max-w-[300px] bg-white">
        <AppSideBar />
      </SheetContent>
    </Sheet>
  );
};

const StudyRoomLayout = ({ children }: AppLayoutProps) => (
  <div className="min-h-[100dvh] w-full max-w-full">
    <main className="w-full h-[100dvh] pb-safe-bottom">{children}</main>
    <MobileSidebar />
  </div>
);

const SimpleLayout = ({ children }: AppLayoutProps) => (
  <div className="min-h-[100dvh] w-full max-w-full">
    <HeaderNav />
    <main className="pt-16 px-4 pb-safe-bottom max-w-full">
      {children}
    </main>
    <MobileSidebar />
  </div>
);

const StandardLayout = ({ children }: AppLayoutProps) => (
  <div className="min-h-[100dvh] flex w-full max-w-full">
    <div className="hidden md:block">
      <AppSideBar />
    </div>
    
    <MobileSidebar />
    
    <SidebarInset>
      <div className="flex flex-col min-h-full max-w-full">
        <HeaderNav />
        
        <main className="flex-1 p-3 sm:p-4 md:p-6 pb-safe-bottom overflow-x-hidden">
          {children}
        </main>
      </div>
    </SidebarInset>
  </div>
);

const BasicLayout = ({ children }: AppLayoutProps) => (
  <div className="min-h-[100dvh] w-full max-w-full overflow-x-hidden">
    <main className="px-4 pb-safe-bottom max-w-full">
      {children}
    </main>
  </div>
);

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [layoutType, setLayoutType] = useState<string>('standard');
  
  useEffect(() => {
    // Use path matching for layout determination
    const path = location.pathname;
    
    if (path.includes('/study-room/') && path.includes('/chat')) {
      setLayoutType('study-room-chat');
    } else if (path.includes('/study-room/')) {
      setLayoutType('study-room');
    } else if (path === '/' || path === '/login' || path === '/authentication') {
      setLayoutType('basic');
    } else {
      setLayoutType('standard');
    }
  }, [location.pathname]);
  
  // Wrap each layout with TooltipProvider to ensure tooltips work
  return (
    <TooltipProvider>
      {(() => {
        switch (layoutType) {
          case 'study-room-chat':
            return <StudyRoomLayout>{children}</StudyRoomLayout>;
          case 'study-room':
            return <SimpleLayout>{children}</SimpleLayout>;
          case 'basic':
            return <BasicLayout>{children}</BasicLayout>;
          case 'standard':
          default:
            return <StandardLayout>{children}</StandardLayout>;
        }
      })()}
    </TooltipProvider>
  );
};

export default AppLayout;
