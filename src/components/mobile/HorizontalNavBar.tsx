
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
    <motion.div 
      className="fixed bottom-3 left-3 right-3 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border border-gray-200/50 dark:border-gray-800/50 rounded-2xl h-16 safe-padding-bottom">
        <nav className="flex justify-around items-center h-full px-2">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-xs transition-all duration-200 relative min-w-0",
                "active:scale-95"
              )}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.9 }}
            >
              {/* Active state background */}
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-x-1 inset-y-1 bg-blue-600/10 dark:bg-blue-400/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Icon container */}
              <motion.div 
                className="mb-1 relative z-10"
                animate={isActive(item.path) ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className={cn(
                  "transition-colors duration-200",
                  isActive(item.path) 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-500 dark:text-gray-400"
                )}>
                  {item.icon}
                </div>
              </motion.div>
              
              {/* Label */}
              <span className={cn(
                "transition-all duration-200 font-medium text-xs leading-none z-10",
                isActive(item.path) 
                  ? "text-blue-600 dark:text-blue-400 font-semibold" 
                  : "text-gray-500 dark:text-gray-400"
              )}>
                {item.label}
              </span>
              
              {/* Tap effect */}
              <motion.div
                className="absolute inset-0 bg-gray-200/30 dark:bg-gray-600/30 rounded-xl opacity-0"
                animate={{ opacity: 0 }}
                whileTap={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
              />
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default HorizontalNavBar;
