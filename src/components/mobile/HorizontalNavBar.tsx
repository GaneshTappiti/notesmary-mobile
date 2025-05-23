
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FileText, BrainCircuit, Bell, User, Search } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 py-3 px-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-bold text-xl">NoteSmarty</h1>
        <Bell 
          className="h-5 w-5 text-gray-500 cursor-pointer" 
          onClick={() => navigate('/notifications')}
        />
      </div>
      
      <nav className="overflow-x-auto hide-scrollbar">
        <div className="flex space-x-6 py-1 px-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center min-w-16 relative",
                "transition-colors duration-200"
              )}
            >
              <div className={cn(
                "rounded-full p-2",
                isActive(item.path) 
                  ? "text-white bg-blue-600" 
                  : "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
              )}>
                {item.icon}
              </div>
              <span className={cn(
                "text-xs mt-1",
                isActive(item.path) 
                  ? "font-medium text-blue-600" 
                  : "text-gray-600 dark:text-gray-400"
              )}>
                {item.label}
              </span>
              
              {isActive(item.path) && (
                <motion.div
                  className="absolute -bottom-3 h-1 w-4 bg-blue-600 rounded-full"
                  layoutId="navigation-underline"
                  transition={{ type: "spring", bounce: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default HorizontalNavBar;
