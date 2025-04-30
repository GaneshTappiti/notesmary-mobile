import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Bell, 
  Search,
  LogOut,
  Settings,
  User,
  ChevronDown,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
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
    
    // Standard breadcrumbs for routes
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {paths[0] !== 'dashboard' && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/${paths[0]}`}>{getPageTitle(`/${paths[0]}`)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              {paths.length > 1 && paths[0] === 'study-room' && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {paths.length > 2 ? (
                      <BreadcrumbLink asChild>
                        <Link to={`/${paths[0]}/${paths[1]}`}>Room Details</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>Room Details</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  
                  {paths.length > 2 && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {paths[2] === 'chat' ? 'Chat' : 
                          paths[2] === 'info' ? 'Room Info' : paths[2]}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  // Handle notifications click with improved feedback
  const handleNotificationsClick = () => {
    setUnreadNotifications(0); // Reset unread count when notifications are viewed
    toast({
      title: "Accessing notifications",
      description: "Taking you to your notifications page",
      duration: 2000,
    });
    navigate('/notifications');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 h-16">
      <div className="h-full flex flex-col justify-center">
        <div className="flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="hidden md:flex transition-all hover:bg-gray-100 rounded-full p-1">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            
            <div className="hidden md:block">
              {generateBreadcrumbs()}
            </div>
            
            <div className="md:hidden">
              <h1 className="text-lg font-medium text-gray-800">
                {getPageTitle(location.pathname)}
              </h1>
            </div>
          </div>
          
          {/* Search bar and actions */}
          <div className="flex items-center gap-3">
            {/* Search bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search..." 
                className="w-[240px] pl-9 pr-4 py-2 rounded-lg bg-gray-50 border-gray-200"
              />
            </div>
            
            {/* Notifications - Improved accessibility and hover state */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative rounded-full hover:bg-gray-100"
              onClick={handleNotificationsClick}
              aria-label={`Notifications ${unreadNotifications > 0 ? `(${unreadNotifications} unread)` : ''}`}
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
                  className="rounded-full flex items-center gap-2 pr-2 pl-1"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff" alt="Student" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">Student</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
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
