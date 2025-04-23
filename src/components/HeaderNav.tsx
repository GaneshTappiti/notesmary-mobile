import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Bell, 
  User,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';

export const HeaderNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread count
  const { state, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  
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
      'study-rooms': 'Study Rooms',
      'study-room': 'Study Room',
      'subscription': 'Subscription Management',
      'settings': 'Settings',
      'ai-mark-answers': 'Mark Answers',
    };
    
    return titles[path] || 'Notezz';  // Updated from 'Notex' to 'Notezz'
  };

  // Function to generate breadcrumbs based on the current path
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(x => x);
    
    if (paths.length === 0) {
      return null;
    }
    
    // For study room routes with IDs, we need special handling
    if (paths[0] === 'study-room' && paths.length > 1) {
      if (paths.length === 2) {
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/study-rooms">Study Rooms</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Room Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      } else if (paths.length === 3 && paths[2] === 'chat') {
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/study-rooms">Study Rooms</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/study-room/${paths[1]}`}>Room Details</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Chat</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      } else if (paths.length === 3 && paths[2] === 'info') {
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/study-rooms">Study Rooms</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Room Info</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      }
    }
    
    // Standard breadcrumbs for other routes
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{getPageTitle(location.pathname)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  // Handle notifications click
  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b h-16 px-4">
      <div className="h-full flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isMobile && (
              <SidebarTrigger 
                className="hidden md:flex mr-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1"
              >
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
            )}
            
            <h1 className="text-lg font-semibold mr-6">
              {getPageTitle(location.pathname)}
            </h1>
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
        </div>
        
        {/* Add breadcrumbs below the main header content */}
        <div className="hidden md:flex items-center mt-1 ml-10 text-sm text-muted-foreground">
          {generateBreadcrumbs()}
        </div>
      </div>
    </header>
  );
};
