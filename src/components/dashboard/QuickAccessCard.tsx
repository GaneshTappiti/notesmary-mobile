
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
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  title,
  description,
  icon,
  bgColor,
  buttonText,
  buttonVariant,
  onClick,
  isPrimary = false
}) => {
  return (
    <Card 
      className={`border shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] dark:bg-gray-800 group ${
        isPrimary ? 'border-blue-300 dark:border-blue-700/50' : ''
      }`}
    >
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center gap-3">
          <div className={`${bgColor} dark:bg-opacity-20 p-2.5 rounded-full transition-all duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">{title}</CardTitle>
            {isPrimary && (
              <Badge variant="default" className="bg-blue-600 text-[10px] py-0 px-1.5">
                Primary
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pb-4">
        <Button 
          className="w-full" 
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
