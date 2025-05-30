
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { MobileSidebar } from './MobileSidebar';

interface MobileHeaderProps {
  title: string;
  showBackButton?: boolean;
  showSearchButton?: boolean;
  showNotificationButton?: boolean;
  showMenuButton?: boolean;
  onSearchClick?: () => void;
  onMenuClick?: () => void;
  className?: string;
  rightElement?: React.ReactNode;
  subtitle?: string;
}

export const MobileHeader = ({
  title,
  subtitle,
  showBackButton = false,
  showSearchButton = false,
  showNotificationButton = false,
  showMenuButton = true, // Default to true for new hybrid system
  onSearchClick,
  onMenuClick,
  className,
  rightElement
}: MobileHeaderProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleNotifications = () => {
    navigate('/notifications');
  };
  
  const handleSearch = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      navigate('/find-notes');
    }
  };

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      setSidebarOpen(true);
    }
  };
  
  return (
    <>
      <motion.header 
        className={cn(
          "sticky top-0 z-20 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between safe-top",
          className
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-4">
          {showBackButton && (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack} 
                className="h-10 w-10 rounded-full bg-gray-50 hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
          
          {showMenuButton && !showBackButton && (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleMenuClick} 
                className="h-10 w-10 rounded-full bg-gray-50 hover:bg-gray-100"
                aria-label="Main menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
          
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-gray-900 truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {showSearchButton && (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSearch} 
                className="h-10 w-10 rounded-full bg-gray-50 hover:bg-gray-100"
              >
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
          
          {showNotificationButton && (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNotifications} 
                className="h-10 w-10 rounded-full bg-gray-50 hover:bg-gray-100 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </motion.div>
          )}
          
          {rightElement}
        </div>
      </motion.header>

      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};
