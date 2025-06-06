
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BrainCircuit, 
  GraduationCap, 
  BarChart, 
  Upload, 
  Search,
  Bell,
  Users,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
  User,
  Radar,
  PanelLeft
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarRail
} from "@/components/ui/sidebar";
import { useToast } from '@/hooks/use-toast';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useMemo, useCallback } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';

export const AppSidebar = () => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const isActive = useCallback((path: string) => {
    if (path.includes(':')) {
      const basePath = path.split('/:')[0];
      return location.pathname.startsWith(basePath);
    }
    return location.pathname === path;
  }, [location.pathname]);
  
  const handleSignOut = useCallback(async () => {
    try {
      await logout();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
        duration: 3000,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  }, [logout, toast, navigate]);

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
    // Close mobile drawer if open
    const drawerCloseBtn = document.querySelector('[data-drawer-close="true"]');
    if (drawerCloseBtn && drawerCloseBtn instanceof HTMLElement) {
      drawerCloseBtn.click();
    }
  }, [navigate]);
  
  const mainMenuItems = useMemo(() => [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Upload Notes",
      path: "/upload-notes",
      icon: <Upload size={20} />,
    },
    {
      title: "Find Notes",
      path: "/find-notes",
      icon: <Search size={20} />,
    },
    {
      title: "My Notes",
      path: "/my-notes",
      icon: <FileText size={20} />,
    },
    {
      title: "AI Answers",
      path: "/ai-answers",
      icon: <BrainCircuit size={20} />,
    },
    {
      title: "Mark Answers",
      path: "/ai-mark-answers",
      icon: <GraduationCap size={20} />,
    },
    {
      title: "Study Analytics",
      path: "/study-analytics",
      icon: <BarChart size={20} />,
    },
    {
      title: "StudyPulse",
      path: "/study-pulse",
      icon: <Radar size={20} />,
    },
    {
      title: "Study Rooms",
      path: "/study-rooms",
      icon: <Users size={20} />,
    },
  ], []);
  
  const settingsItems = useMemo(() => [
    {
      title: "Account Settings",
      path: "/settings",
      icon: <User size={18} />,
    },
    {
      title: "Subscription",
      path: "/subscription",
      icon: <CreditCard size={18} />,
    },
  ], []);

  return (
    <Sidebar 
      data-state={state} 
      className="z-50 shadow-md border-r border-gray-100 bg-white rounded-tr-[20px] rounded-br-[20px] overflow-hidden w-full md:w-[270px]"
    >
      <SidebarHeader className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div onClick={() => handleNavigation("/dashboard")} className="flex items-center gap-2 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            N
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
            Notex
          </span>
        </div>
        
        <div className="hidden md:block">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-7 px-1 rounded-md py-1 aspect-square hover:bg-gray-100"
            data-state={state}
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="shrink-0 h-4 w-4" />
          </button>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 px-3 mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.path)} 
                    isActive={isActive(item.path)}
                    tooltip={state === "collapsed" ? item.title : undefined}
                    className={cn(
                      "transition-all duration-200 hover:translate-x-1 rounded-xl py-2",
                      isActive(item.path) ? "bg-blue-50 border-l-4 border-blue-500" : ""
                    )}
                  >
                    <div className="flex items-center gap-3 px-3">
                      <div className={cn(
                        "p-1.5 rounded-md",
                        isActive(item.path) 
                          ? "text-blue-600" 
                          : "text-gray-500"
                      )}>
                        {item.icon}
                      </div>
                      <span className={cn(
                        "font-medium", 
                        isActive(item.path) 
                          ? "text-blue-600" 
                          : "text-gray-700"
                      )}>
                        {item.title}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem>
                <Collapsible
                  open={isSettingsOpen}
                  onOpenChange={setIsSettingsOpen}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      isActive={location.pathname.includes('settings') || location.pathname.includes('subscription')}
                      tooltip={state === "collapsed" ? "Settings" : undefined}
                      className={cn(
                        "transition-all duration-200 hover:translate-x-1 w-full justify-between rounded-xl py-2",
                        (location.pathname.includes('settings') || location.pathname.includes('subscription')) && 
                        "bg-blue-50 border-l-4 border-blue-500"
                      )}
                    >
                      <div className="flex items-center gap-3 px-3">
                        <div className={cn(
                          "p-1.5 rounded-md",
                          (location.pathname.includes('settings') || location.pathname.includes('subscription'))
                            ? "text-blue-600" 
                            : "text-gray-500"
                        )}>
                          <Settings size={20} />
                        </div>
                        <span className={cn(
                          "font-medium", 
                          (location.pathname.includes('settings') || location.pathname.includes('subscription'))
                            ? "text-blue-600" 
                            : "text-gray-700"
                        )}>
                          Settings
                        </span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 mr-4 ${isSettingsOpen ? 'rotate-180' : ''}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-12 pr-3 pt-1 space-y-1">
                    {settingsItems.map((item) => (
                      <div 
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-colors cursor-pointer ${
                          isActive(item.path) 
                            ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600 font-medium' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 px-3 mb-2">
            Updates
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleNavigation("/notifications")}
                  isActive={isActive("/notifications")}
                  tooltip={state === "collapsed" ? "Notifications" : undefined}
                  className={cn(
                    "transition-all duration-200 hover:translate-x-1 rounded-xl py-2",
                    isActive("/notifications") && "bg-blue-50 border-l-4 border-blue-500"
                  )}
                >
                  <div className="flex items-center gap-3 px-3">
                    <div className={cn(
                      "p-1.5 rounded-md relative",
                      isActive("/notifications") 
                        ? "text-blue-600" 
                        : "text-gray-500"
                    )}>
                      <Bell size={20} />
                      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 rounded-full"></span>
                    </div>
                    <span className={cn(
                      "font-medium", 
                      isActive("/notifications") 
                        ? "text-blue-600" 
                        : "text-gray-700"
                    )}>
                      Notifications
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-100 mt-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-xl border-2 border-white">
              <AvatarImage 
                src="https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff" 
                loading="lazy"
              />
              <AvatarFallback className="bg-blue-600 text-white">S</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900">Student</p>
              <p className="text-xs text-gray-500">student@example.com</p>
            </div>
          </div>
        </div>
        <SidebarMenuButton 
          onClick={handleSignOut}
          tooltip={state === "collapsed" ? "Sign Out" : undefined}
          className="w-full text-gray-700 hover:bg-red-50 transition-colors duration-200 py-2 rounded-xl"
        >
          <LogOut size={18} className="text-red-500" />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
      
      <SidebarRail className="hidden md:flex" />
    </Sidebar>
  );
};
