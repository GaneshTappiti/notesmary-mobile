
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface DashboardLoadingStateProps {
  type?: 'notes' | 'rooms' | 'stats' | 'general';
  count?: number;
}

export const DashboardLoadingState: React.FC<DashboardLoadingStateProps> = ({ 
  type = 'general', 
  count = 3 
}) => {
  if (type === 'notes') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-3" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (type === 'rooms') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-8 w-16" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (type === 'stats') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-12" />
                </div>
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // General loading state
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
