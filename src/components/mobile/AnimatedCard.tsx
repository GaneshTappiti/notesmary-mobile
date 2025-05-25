
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { animationVariants } from '@/utils/animations';

interface AnimatedCardProps extends CardProps {
  withHover?: boolean;
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className, 
  withHover = true,
  delay = 0,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 24,
        delay
      }}
      variants={withHover ? animationVariants.cardHover : undefined}
      whileHover={withHover ? "hover" : undefined}
      whileTap={withHover ? "tap" : undefined}
    >
      <Card
        className={cn(
          "transition-shadow duration-200",
          withHover && "cursor-pointer hover:shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
};
