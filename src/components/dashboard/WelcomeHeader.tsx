
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface WelcomeHeaderProps {
  userName?: string;
  onLogout: () => void;
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ 
  userName, 
  onLogout, 
  isAdmin, 
  onAdminClick 
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleProfileClick = () => {
    try {
      navigate('/profile');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleAdminClick = () => {
    if (onAdminClick) {
      onAdminClick();
    }
  };

  return (
    <Card className="shadow-sm transition-all hover:shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'} text-gray-900 dark:text-gray-100`}>
              Welcome back{userName ? `, ${userName.split(' ')[0]}` : ''}! 👋
            </h1>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 dark:text-gray-400 mt-1`}>
              Ready to dive into your studies today?
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Profile Button */}
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "default"}
              onClick={handleProfileClick}
              className="flex items-center gap-2"
            >
              <User size={isMobile ? 16 : 18} />
              {!isMobile && "Profile"}
            </Button>
            
            {isAdmin && onAdminClick && (
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={handleAdminClick}
                className="flex items-center gap-2"
              >
                <Settings size={isMobile ? 16 : 18} />
                {!isMobile && "Admin"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
