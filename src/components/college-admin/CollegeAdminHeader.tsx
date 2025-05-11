
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, MessageSquare, Search, User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const CollegeAdminHeader: React.FC = () => {
  const { user, logout, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const domainName = user?.email ? user.email.split('@')[1] : 'Unknown Institution';
  const institutionName = domainName?.split('.')[0].charAt(0).toUpperCase() + domainName?.split('.')[0].slice(1) || 'College';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900">{institutionName} Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative flex items-center gap-2 pl-2 pr-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || user?.email}&background=0D8ABC&color=fff`} />
                    <AvatarFallback>{profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:block">
                    {profile?.full_name || user?.email?.split('@')[0] || 'Admin User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/college-admin/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Institution Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
