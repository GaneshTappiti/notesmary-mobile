
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Bell, 
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
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
    
    return titles[path] || 'Notex';
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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 h-[70px]">
      <div className="h-full flex flex-col justify-center">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="hidden md:flex mr-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            
            <div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Hello, Student 👋
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Here's your study overview
              </p>
            </div>
          </div>
          
          {/* Search bar and actions */}
          <div className="flex items-center gap-3">
            {/* Search bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search anything..." 
                className="w-[240px] pl-9 pr-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
            
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
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            
            {/* User profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative rounded-full h-8 w-8 p-0"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff" alt="Student" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
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
      </div>
    </header>
  );
};
