
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
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
  ChevronLeft,
  ChevronRight
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
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const AppSidebar = () => {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  
  const menuItems = [
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
      title: "AI Answers",
      path: "/ai-answers",
      icon: <BrainCircuit size={18} />,
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
  
  const quickAccessItems = [
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
    {
      title: "Team Collaboration",
      path: "/team",
      icon: <Users size={18} />,
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
        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Notex
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="md:hidden"
        >
          {state === "expanded" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickAccessItems.map((item) => (
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
