
import React from 'react';
import { motion } from 'framer-motion';
import { animationVariants } from '@/utils/animations';

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({ children, className }) => {
  return (
    <motion.div
      variants={animationVariants.staggerContainer}
      initial="hidden"
      animate="show"
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={animationVariants.staggerItem}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
