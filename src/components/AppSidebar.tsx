
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
  LogOut
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
  useSidebar
} from "@/components/ui/sidebar";
import { useToast } from '@/hooks/use-toast';

export const AppSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
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
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Notex
        </Link>
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
      
      <SidebarFooter>
        <div className="px-4 py-2">
          <SidebarMenuButton 
            onClick={handleSignOut}
            tooltip={state === "collapsed" ? "Sign Out" : undefined}
            className="w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </SidebarMenuButton>
        </div>
        <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
          © 2025 Notex
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
