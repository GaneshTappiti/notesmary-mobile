
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, BrainCircuit, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const HorizontalNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={22} />, label: 'Home', path: '/dashboard' },
    { icon: <FileText size={22} />, label: 'Notes', path: '/my-notes' },
    { icon: <BrainCircuit size={22} />, label: 'AI', path: '/ai-answers' },
    { icon: <Search size={22} />, label: 'Find', path: '/find-notes' },
    { icon: <User size={22} />, label: 'Profile', path: '/settings' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-t border-gray-200 safe-bottom">
      <nav className="flex justify-around items-center h-20 px-4">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 relative rounded-xl",
              "min-w-0 active:scale-95 py-2"
            )}
            onClick={() => navigate(item.path)}
          >
            <div className={cn(
              "transition-all duration-200 p-3 rounded-lg",
              isActive(item.path) 
                ? "text-blue-600 bg-blue-50" 
                : "text-gray-500"
            )}>
              {item.icon}
            </div>

            {isActive(item.path) && (
              <div className="absolute bottom-1 h-1 w-8 bg-blue-500 rounded-full transition-opacity duration-200" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default HorizontalNavBar;
