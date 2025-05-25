
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { animationVariants } from '@/utils/animations';

interface FABAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface FloatingActionButtonProps {
  actions?: FABAction[];
  mainAction?: () => void;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions = [],
  mainAction,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMainClick = () => {
    if (actions.length > 0) {
      setIsExpanded(!isExpanded);
    } else if (mainAction) {
      mainAction();
    }
  };

  return (
    <div className={cn("fixed bottom-20 right-4 z-50", className)}>
      <AnimatePresence>
        {isExpanded && actions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="flex flex-col-reverse gap-3 mb-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  action.onClick();
                  setIsExpanded(false);
                }}
                className="bg-white shadow-lg rounded-full p-3 flex items-center gap-2 min-w-max group hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {action.icon}
                <span className="text-sm font-medium text-gray-700 pr-1 group-hover:text-gray-900">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleMainClick}
        className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
        variants={animationVariants.fabExpand}
        animate={isExpanded ? "expanded" : "initial"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isExpanded ? 'close' : 'plus'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isExpanded ? <X size={24} /> : <Plus size={24} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
