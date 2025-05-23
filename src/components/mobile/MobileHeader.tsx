
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
  showMenuButton = false,
  onSearchClick,
  onMenuClick,
  className,
  rightElement
}: MobileHeaderProps) => {
  const navigate = useNavigate();
  
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
  
  return (
    <motion.header 
      className={cn(
        "sticky top-0 z-20 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between",
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3">
        {showBackButton && (
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack} 
              className="h-9 w-9 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
        
        {showMenuButton && (
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onMenuClick} 
              className="h-9 w-9 rounded-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
        
        <div className="flex flex-col">
          <h1 className="text-lg font-medium text-gray-900 dark:text-white truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {showSearchButton && (
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSearch} 
              className="h-9 w-9 rounded-full"
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
              className="h-9 w-9 rounded-full relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          </motion.div>
        )}
        
        {rightElement}
      </div>
    </motion.header>
  );
};
