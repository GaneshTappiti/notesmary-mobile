
import React from 'react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      className={cn(
        "flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 relative rounded-xl",
        "min-w-0 active:scale-95 py-2"
      )}
      onClick={onClick}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className={cn(
        "transition-all duration-200 p-2 rounded-lg mb-1",
        isActive 
          ? "text-blue-600 bg-blue-50" 
          : "text-gray-500"
      )}>
        {icon}
      </div>

      <span className={cn(
        "text-xs font-medium transition-colors duration-200",
        isActive ? "text-blue-600" : "text-gray-500"
      )}>
        {label}
      </span>

      {isActive && (
        <div className="absolute bottom-0 h-1 w-8 bg-blue-600 rounded-full transition-opacity duration-200" />
      )}
    </button>
  );
};
