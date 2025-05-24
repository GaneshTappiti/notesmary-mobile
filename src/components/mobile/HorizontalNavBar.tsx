
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-bottom">
      <motion.nav 
        className="flex justify-around items-center h-16 px-2"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {navItems.map((item) => (
          <motion.button
            key={item.path}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full text-xs transition-all duration-200 relative rounded-xl py-1",
              "active:scale-95 min-w-0"
            )}
            onClick={() => navigate(item.path)}
            whileTap={{ scale: 0.9 }}
          >
            {/* Active state background */}
            {isActive(item.path) && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-1 bg-blue-100 rounded-xl"
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
                  ? "text-blue-600" 
                  : "text-gray-500"
              )}>
                {item.icon}
              </div>
            </motion.div>
            
            {/* Label */}
            <span className={cn(
              "transition-all duration-200 font-medium text-xs leading-none z-10 truncate px-1",
              isActive(item.path) 
                ? "text-blue-600 font-semibold" 
                : "text-gray-500"
            )}>
              {item.label}
            </span>
          </motion.button>
        ))}
      </motion.nav>
    </div>
  );
};

export default HorizontalNavBar;
