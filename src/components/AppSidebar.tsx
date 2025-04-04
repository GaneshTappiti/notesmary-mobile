
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  BookText, 
  BrainCircuit, 
  MessageSquare, 
  CreditCard, 
  BarChart, 
  Upload, 
  Search,
  Bell,
  Home,
  LogOut,
  ChevronDown,
  Settings,
  User,
  FileText,
  Users,
  GraduationCap
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
import { ThemeToggle } from './ThemeToggle';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from 'react';

export const AppSidebar = () => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isStudyRoomOpen, setIsStudyRoomOpen] = useState(false);
  
  const isActive = (path: string) => {
    // Match exact path or path pattern with parameters
    if (path.includes(':')) {
      const basePath = path.split('/:')[0];
      return location.pathname.startsWith(basePath);
    }
    return location.pathname === path;
  };
  
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
  
  const mainMenuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home size={18} />,
    },
    {
      title: "Upload Notes",
      path: "/upload-notes",
      icon: <Upload size={18} />,
    },
    {
      title: "Find Notes",
      path: "/find-notes",
      icon: <Search size={18} />,
    },
    {
      title: "My Notes",
      path: "/view-notes",
      icon: <FileText size={18} />,
    },
    {
      title: "AI Answers",
      path: "/ai-answers",
      icon: <BrainCircuit size={18} />,
    },
    {
      title: "Mark Answers",
      path: "/ai-mark-answers",
      icon: <GraduationCap size={18} />,
    },
    {
      title: "Notifications",
      path: "/notifications",
      icon: <Bell size={18} />,
    },
    {
      title: "Study Analytics",
      path: "/study-analytics",
      icon: <BarChart size={18} />,
    },
  ];
  
  // Study room submenu items
  const studyRoomItems = [
    {
      title: "Study Room",
      path: "/study-room/1",
      icon: <Users size={18} />,
    },
    {
      title: "Study Room Chat",
      path: "/study-room/1/chat",
      icon: <MessageSquare size={18} />,
    },
  ];
  
  // Settings submenu items (including subscription)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsItems = [
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
  ];

  return (
    <Sidebar data-state={state} className="z-50 shadow-lg border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <Link to="/dashboard" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Notex
        </Link>
        <ThemeToggle variant="ghost" size="sm" className="rounded-full" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={state === "collapsed" ? item.title : undefined}
                    className="transition-all duration-200 hover:translate-x-1"
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Collapsible Study Room section */}
              <SidebarMenuItem>
                <Collapsible
                  open={isStudyRoomOpen}
                  onOpenChange={setIsStudyRoomOpen}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      isActive={location.pathname.includes('study-room')}
                      tooltip={state === "collapsed" ? "Study Rooms" : undefined}
                      className="transition-all duration-200 hover:translate-x-1 w-full justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Users size={18} />
                        <span>Study Rooms</span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${isStudyRoomOpen ? 'rotate-180' : ''}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-7 pt-1 space-y-1">
                    {studyRoomItems.map((item) => (
                      <Link 
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive(item.path) 
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
              
              {/* Collapsible Settings section with Subscription */}
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
                      className="transition-all duration-200 hover:translate-x-1 w-full justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Settings size={18} />
                        <span>Settings</span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${isSettingsOpen ? 'rotate-180' : ''}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-7 pt-1 space-y-1">
                    {settingsItems.map((item) => (
                      <Link 
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive(item.path) 
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="px-4 py-2">
          <SidebarMenuButton 
            onClick={handleSignOut}
            tooltip={state === "collapsed" ? "Sign Out" : undefined}
            className="w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </SidebarMenuButton>
        </div>
        <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
          © 2025 Notex
        </div>
      </SidebarFooter>
      
      {/* Add sidebar rail to make it draggable */}
      <SidebarRail className="hidden md:flex" />
    </Sidebar>
  );
};
