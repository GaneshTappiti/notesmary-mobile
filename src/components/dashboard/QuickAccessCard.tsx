
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  buttonText: string;
  buttonVariant: "default" | "outline";
  onClick: () => void;
  isPrimary?: boolean;
  className?: string;
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  title,
  description,
  icon,
  bgColor,
  buttonText,
  buttonVariant,
  onClick,
  isPrimary = false,
  className
}) => {
  return (
    <Card 
      className={`border shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-1px] dark:bg-gray-800 group ${
        isPrimary ? 'border-blue-300 dark:border-blue-700/50' : ''
      } ${className || ''}`}
    >
      <CardHeader className="pb-3 pt-4">
        <div className="flex items-start gap-3">
          <div className={`${bgColor} dark:bg-opacity-20 p-2 rounded-lg transition-all duration-300 group-hover:scale-105`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-sm font-medium leading-tight">{title}</CardTitle>
              {isPrimary && (
                <Badge variant="default" className="bg-blue-600 text-[9px] py-0 px-1 h-4">
                  Primary
                </Badge>
              )}
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-xs leading-tight">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="pt-0 pb-4">
        <Button 
          className="w-full text-xs h-8" 
          variant={buttonVariant} 
          onClick={onClick}
          size="sm"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
