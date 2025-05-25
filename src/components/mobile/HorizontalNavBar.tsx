
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, BrainCircuit, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const HorizontalNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/dashboard' },
    { icon: <FileText size={20} />, label: 'Notes', path: '/my-notes' },
    { icon: <BrainCircuit size={20} />, label: 'AI', path: '/ai-answers' },
    { icon: <Search size={20} />, label: 'Find', path: '/find-notes' },
    { icon: <User size={20} />, label: 'Profile', path: '/settings' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 safe-bottom">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full text-xs transition-colors duration-200 relative",
              "min-w-0 active:opacity-75"
            )}
            onClick={() => navigate(item.path)}
          >
            <div className={cn(
              "mb-1 transition-colors duration-200",
              isActive(item.path) 
                ? "text-blue-600" 
                : "text-gray-500"
            )}>
              {item.icon}
            </div>
            
            <span className={cn(
              "transition-colors duration-200 font-medium text-xs leading-none truncate px-1",
              isActive(item.path) 
                ? "text-blue-600 font-semibold" 
                : "text-gray-500"
            )}>
              {item.label}
            </span>

            {isActive(item.path) && (
              <div className="absolute bottom-1 h-1 w-6 bg-blue-500 rounded-full transition-opacity duration-200" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default HorizontalNavBar;
