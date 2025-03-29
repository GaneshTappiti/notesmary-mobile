
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, X, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type NotificationType = 'studyRoom' | 'notes' | 'collaboration' | 'system' | 'payment';
export type ActionType = 'join' | 'view' | 'accept' | 'decline' | 'renew';

interface NotificationProps {
  notification: {
    id: string;
    type: NotificationType;
    title: string;
    description: string;
    timestamp: string;
    isRead: boolean;
    actionType: ActionType;
    secondaryActionType?: ActionType;
    actionUrl?: string;
    actionText: string;
    secondaryActionText?: string;
  };
  icon: React.ReactNode;
  onAction: (id: string, actionType: ActionType, actionUrl?: string) => void;
}

export const NotificationCard: React.FC<NotificationProps> = ({
  notification,
  icon,
  onAction
}) => {
  const getActionIcon = (actionType: ActionType) => {
    switch (actionType) {
      case 'join':
        return <ArrowRight size={16} />;
      case 'view':
        return <FileText size={16} />;
      case 'accept':
        return <Check size={16} />;
      case 'decline':
        return <X size={16} />;
      case 'renew':
        return <ArrowRight size={16} />;
      default:
        return <ArrowRight size={16} />;
    }
  };

  const getActionButtonVariant = (actionType: ActionType) => {
    switch (actionType) {
      case 'join':
        return 'default';
      case 'view':
        return 'outline';
      case 'accept':
        return 'default';
      case 'decline':
        return 'destructive';
      case 'renew':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      className={`border-l-4 ${
        !notification.isRead 
          ? 'border-l-blue-500 bg-blue-50/50' 
          : 'border-l-gray-200'
      } hover:shadow-md transition-all`}
    >
      <CardContent className="p-4 flex items-start">
        <div className="mr-4 mt-1">
          {icon}
          {!notification.isRead && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform -translate-y-1/2 translate-x-1/2"></span>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 flex items-center">
                {notification.title}
                {!notification.isRead && (
                  <Badge variant="destructive" className="ml-2 py-0 px-1.5 h-auto text-[10px]">NEW</Badge>
                )}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{notification.description}</p>
            </div>
            <span className="text-xs text-gray-500">{notification.timestamp}</span>
          </div>
          
          <div className="mt-3 flex gap-2 justify-end">
            {notification.secondaryActionType && notification.secondaryActionText && (
              <Button 
                variant={getActionButtonVariant(notification.secondaryActionType)}
                size="sm"
                onClick={() => onAction(notification.id, notification.secondaryActionType!, notification.actionUrl)}
                className="flex items-center gap-1"
              >
                {getActionIcon(notification.secondaryActionType)}
                {notification.secondaryActionText}
              </Button>
            )}
            
            <Button 
              variant={getActionButtonVariant(notification.actionType)}
              size="sm"
              onClick={() => onAction(notification.id, notification.actionType, notification.actionUrl)}
              className="flex items-center gap-1"
            >
              {getActionIcon(notification.actionType)}
              {notification.actionText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
