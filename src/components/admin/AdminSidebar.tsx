
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  CalendarDays, 
  Users, 
  BarChart3, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  open, 
  setOpen 
}) => {
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        variant: "destructive",
      });
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Uploaded Notes', href: '/admin/notes', icon: FileText },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Events & Announcements', href: '/admin/events', icon: CalendarDays },
    { name: 'Users Management', href: '/admin/users', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Mobile sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 transform transition-transform ease-in-out duration-300 md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              Notex Admin
            </span>
          </div>
          <button
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {renderSidebarContent()}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                Notex Admin
              </span>
            </div>
            <div className="mt-5 flex-1">
              {renderSidebarContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function renderSidebarContent() {
    return (
      <nav className="mt-5 px-2 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => cn(
              isActive
                ? "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
            )}
          >
            <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
            {item.name}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="w-full text-left text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 group flex items-center px-2 py-2 text-base font-medium rounded-md"
        >
          <LogOut className="mr-3 flex-shrink-0 h-6 w-6" />
          Logout
        </button>
      </nav>
    );
  }
};
