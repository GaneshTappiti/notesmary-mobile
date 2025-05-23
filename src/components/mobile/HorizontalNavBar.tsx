
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FileText, BrainCircuit, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const HorizontalNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/dashboard' },
    { icon: <FileText size={24} />, label: 'Notes', path: '/my-notes' },
    { icon: <BrainCircuit size={24} />, label: 'AI', path: '/ai-answers' },
    { icon: <Search size={24} />, label: 'Find', path: '/find-notes' },
    { icon: <User size={24} />, label: 'Profile', path: '/settings' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t dark:border-gray-800 h-16 safe-padding-bottom z-50">
      <nav className="flex justify-around items-center h-full px-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-xs transition-colors", 
              isActive(item.path) 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-gray-500 dark:text-gray-400"
            )}
            onClick={() => navigate(item.path)}
          >
            <div className="relative mb-1">
              {isActive(item.path) && (
                <motion.div
                  className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full -m-2"
                  layoutId="navHighlight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.2 }}
                />
              )}
              {item.icon}
            </div>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default HorizontalNavBar;
