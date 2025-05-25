
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { animationVariants } from '@/utils/animations';

interface PageTransitionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  direction = 'right' 
}) => {
  const location = useLocation();
  
  const getVariant = () => {
    switch (direction) {
      case 'left':
        return animationVariants.pageEnterFromLeft;
      case 'up':
        return animationVariants.modalEnter;
      default:
        return animationVariants.pageEnter;
    }
  };

  const variant = getVariant();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={variant.initial}
        animate={variant.animate}
        exit={variant.exit}
        transition={variant.transition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
