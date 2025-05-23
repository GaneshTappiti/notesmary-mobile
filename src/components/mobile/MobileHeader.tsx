
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  title: string;
  showBackButton?: boolean;
  showSearchButton?: boolean;
  showNotificationButton?: boolean;
  onSearchClick?: () => void;
  className?: string;
  rightElement?: React.ReactNode;
}

export const MobileHeader = ({
  title,
  showBackButton = false,
  showSearchButton = false,
  showNotificationButton = false,
  onSearchClick,
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
  
  return (
    <header className={cn(
      "sticky top-0 z-20 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between",
      className
    )}>
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack} 
            className="h-9 w-9 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-medium text-gray-900 dark:text-white truncate">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        {showSearchButton && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onSearchClick} 
            className="h-9 w-9 rounded-full"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}
        
        {showNotificationButton && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNotifications} 
            className="h-9 w-9 rounded-full"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
        )}
        
        {rightElement}
      </div>
    </header>
  );
};
