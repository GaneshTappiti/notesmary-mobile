
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  Upload, 
  Search, 
  BrainCircuit, 
  Users, 
  Bell, 
  ChevronDown,
  User,
  Settings,
  LogOut,
  GraduationCap,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const HeaderNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread count
  
  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
      duration: 3000,
    });
    navigate('/');
  };
  
  // Check if current path is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  // Function to get page title
  const getPageTitle = (pathname: string) => {
    const path = pathname.split('/')[1];
    
    const titles: Record<string, string> = {
      'dashboard': 'Dashboard',
      'upload-notes': 'Upload Notes',
      'find-notes': 'Find Notes',
      'view-notes': 'View Notes', 
      'ai-answers': 'AI Answers',
      'notifications': 'Notifications',
      'study-analytics': 'Study Analytics',
      'study-room': 'Study Room',
      'subscription': 'Subscription Management',
      'settings': 'Settings',
      'ai-mark-answers': 'Mark Answers',
    };
    
    return titles[path] || 'Notex';
  };

  // Main navigation items
  const navItems = [
    { 
      title: 'Dashboard', 
      path: '/dashboard', 
      icon: <Home size={18} />
    },
    { 
      title: 'Upload Notes', 
      path: '/upload-notes', 
      icon: <Upload size={18} />
    },
    { 
      title: 'Find Notes', 
      path: '/find-notes', 
      icon: <Search size={18} />
    },
    { 
      title: 'AI Answers', 
      path: '/ai-answers', 
      icon: <BrainCircuit size={18} />
    },
    { 
      title: 'Mark Answers', 
      path: '/ai-mark-answers', 
      icon: <GraduationCap size={18} />
    },
    { 
      title: 'Study Rooms', 
      path: '/study-room/1', 
      icon: <Users size={18} />
    }
  ];

  // Handle notifications click
  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b h-16 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="hidden md:flex mr-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        
        <h1 className="text-lg font-semibold mr-6">
          {getPageTitle(location.pathname)}
        </h1>
        
        {/* Navigation links - desktop only */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              size="sm"
              className={`gap-1.5 ${isActive(item.path) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="hidden lg:inline">{item.title}</span>
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <ThemeToggle 
          variant="ghost" 
          size="sm"
          className="rounded-full" 
        />
        
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative rounded-full"
          onClick={handleNotificationsClick}
        >
          <Bell size={18} />
          {unreadNotifications > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadNotifications}
            </Badge>
          )}
        </Button>
        
        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative rounded-full h-8 w-8 ml-1 border"
            >
              <User size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/view-notes')}>
                <User className="mr-2 h-4 w-4" />
                <span>My Notes</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
