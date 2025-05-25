
import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { animationVariants } from '@/utils/animations';

interface AnimatedButtonProps extends ButtonProps {
  withRipple?: boolean;
  withBounce?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  className, 
  withRipple = true,
  withBounce = true,
  ...props 
}) => {
  return (
    <motion.div
      whileTap={withBounce ? animationVariants.buttonTap : undefined}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button
        className={cn(
          "relative overflow-hidden",
          withRipple && "active:bg-opacity-80",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};
