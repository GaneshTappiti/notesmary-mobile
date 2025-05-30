
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Upload, 
  BrainCircuit, 
  BarChart3, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut,
  User,
  Trophy,
  FileArchive,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const displayName = user?.user_metadata?.full_name || 
                     user?.email?.split('@')[0] || 
                     "User";

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      onClose();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "There was an issue during logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      section: "Tools",
      items: [
        { icon: Search, label: "Find Notes", path: "/find-notes" },
        { icon: Upload, label: "Upload Notes", path: "/upload-notes" },
        { icon: BrainCircuit, label: "AI Answers", path: "/ai-answers" },
        { icon: Bell, label: "Notifications", path: "/notifications" },
      ]
    },
    {
      section: "Resources",
      items: [
        { icon: FileArchive, label: "Saved Resources", path: "/saved-resources" },
        { icon: Printer, label: "Printed Materials", path: "/printed-materials" },
        { icon: Trophy, label: "Achievement Badges", path: "/achievements" },
        { icon: BarChart3, label: "Study Analytics", path: "/study-analytics" },
      ]
    }
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-80 bg-slate-50 transition-transform duration-300 ease-out",
          "shadow-xl border-r border-gray-200",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Profile Header */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`} 
                  alt={displayName} 
                />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {displayName}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto py-4">
            {menuItems.map((section, sectionIndex) => (
              <div key={section.section} className="mb-6">
                <h4 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {section.section}
                </h4>
                <div className="space-y-1 px-3">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.path}
                        variant="ghost"
                        onClick={() => handleNavigation(item.path)}
                        className="w-full justify-start h-10 px-3 text-gray-700 hover:bg-white hover:text-gray-900"
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </Button>
                    );
                  })}
                </div>
                {sectionIndex < menuItems.length - 1 && (
                  <Separator className="mt-4 mx-6" />
                )}
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-3 space-y-1">
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/settings')}
              className="w-full justify-start h-10 px-3 text-gray-700 hover:bg-white hover:text-gray-900"
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/help')}
              className="w-full justify-start h-10 px-3 text-gray-700 hover:bg-white hover:text-gray-900"
            >
              <HelpCircle className="h-4 w-4 mr-3" />
              Help Center
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start h-10 px-3 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
            
            {/* App Version */}
            <div className="pt-2 px-3">
              <p className="text-xs text-gray-400">App Version 2.4.1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
