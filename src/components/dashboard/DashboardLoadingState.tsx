
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface DashboardLoadingStateProps {
  type?: 'notes' | 'rooms' | 'stats' | 'general' | 'tasks' | 'analytics';
  count?: number;
}

export const DashboardLoadingState: React.FC<DashboardLoadingStateProps> = ({ 
  type = 'general', 
  count = 3 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (type === 'notes') {
    return (
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: count }).map((_, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="animate-pulse">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (type === 'rooms') {
    return (
      <motion.div 
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: count }).map((_, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex -space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
                    <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
                    <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (type === 'stats') {
    return (
      <motion.div 
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: count }).map((_, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (type === 'tasks') {
    return (
      <motion.div 
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: count }).map((_, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div className="flex items-center space-x-3 p-3 rounded-lg border animate-pulse">
              <Skeleton className="h-4 w-4 rounded" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (type === 'analytics') {
    return (
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="animate-pulse">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full rounded" />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  // General loading state
  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="animate-pulse">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-3" />
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
