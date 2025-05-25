import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 safe-bottom"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        delay: 0.1
      }}
    >
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, index) => (
          <motion.button
            key={item.path}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full text-xs transition-all duration-200 relative rounded-xl py-1",
              "min-w-0"
            )}
            onClick={() => navigate(item.path)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: index * 0.05,
              type: 'spring',
              stiffness: 400,
              damping: 17
            }}
          >
            {/* Active state background with smooth transition */}
            <AnimatePresence>
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-1 bg-blue-100 rounded-xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ 
                    type: "spring", 
                    bounce: 0.2, 
                    duration: 0.4
                  }}
                />
              )}
            </AnimatePresence>
            
            {/* Icon container with bounce animation */}
            <motion.div 
              className="mb-1 relative z-10"
              animate={isActive(item.path) ? 
                { scale: 1.1, y: -1 } : 
                { scale: 1, y: 0 }
              }
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17,
                duration: 0.3
              }}
            >
              <div className={cn(
                "transition-all duration-300 ease-out",
                isActive(item.path) 
                  ? "text-blue-600" 
                  : "text-gray-500"
              )}>
                {item.icon}
              </div>
            </motion.div>
            
            {/* Label with subtle animation */}
            <motion.span 
              className={cn(
                "transition-all duration-300 font-medium text-xs leading-none z-10 truncate px-1",
                isActive(item.path) 
                  ? "text-blue-600 font-semibold" 
                  : "text-gray-500"
              )}
              animate={isActive(item.path) ? 
                { scale: 1.05 } : 
                { scale: 1 }
              }
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.span>

            {/* Ripple effect on tap */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-blue-200"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 1.2, opacity: 0.3 }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: 'none' }}
            />
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
};

export default HorizontalNavBar;
