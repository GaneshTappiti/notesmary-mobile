
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { HeaderNav } from '@/components/HeaderNav';
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User, Settings, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AppLayoutProps {
  children: React.ReactNode;
}

const MobileDropdownMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="md:hidden fixed top-3 left-3 z-50">
        <Button variant="ghost" size="icon" className="rounded-full bg-background/90 backdrop-blur-sm shadow-sm border">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 mt-1 bg-white">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const StudyRoomLayout = ({ children }: AppLayoutProps) => (
  <div className="min-h-[100dvh] w-full max-w-full">
    <main className="w-full h-[100dvh] pb-safe-bottom">{children}</main>
    <MobileDropdownMenu />
  </div>
);

const SimpleLayout = ({ children }: AppLayoutProps) => (
  <div className="min-h-[100dvh] w-full max-w-full">
    <HeaderNav />
    <main className="pt-16 pb-safe-bottom max-w-full overflow-x-hidden">
      {children}
    </main>
    <MobileDropdownMenu />
  </div>
);

const StandardLayout = ({ children }: AppLayoutProps) => (
  <div className="min-h-[100dvh] flex w-full max-w-full">
    <div className="hidden md:block">
      <AppSidebar />
    </div>
    
    <MobileDropdownMenu />
    
    <SidebarInset className="w-full">
      <div className="flex flex-col min-h-full w-full max-w-full">
        <HeaderNav />
        <main className="flex-1 pb-safe-bottom w-full overflow-x-hidden px-4 md:px-6">
          {children}
        </main>
      </div>
    </SidebarInset>
  </div>
);

const BasicLayout = ({ children }: AppLayoutProps) => (
  <div className="min-h-[100dvh] w-full max-w-full overflow-x-hidden">
    <main className="pb-safe-bottom max-w-full">
      {children}
    </main>
  </div>
);

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [layoutType, setLayoutType] = useState<string>('standard');
  
  // Use path matching for layout determination
  const path = location.pathname;
  
  // Use effect to set layout type based on path
  useEffect(() => {
    if (path.includes('/study-room/') && path.includes('/chat')) {
      setLayoutType('study-room-chat');
    } else if (path.includes('/study-room/')) {
      setLayoutType('study-room');
    } else if (path === '/' || path === '/login' || path === '/authentication') {
      setLayoutType('basic');
    } else {
      setLayoutType('standard');
    }
  }, [path]);
  
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
