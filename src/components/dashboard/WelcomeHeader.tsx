
import { Button } from '@/components/ui/button';
import { LogOut, ShieldCheck } from 'lucide-react';

interface WelcomeHeaderProps {
  userName?: string;
  onLogout: () => void;
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

export const WelcomeHeader = ({ 
  userName, 
  onLogout, 
  isAdmin = false,
  onAdminClick
}: WelcomeHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">
        Welcome back, {userName || 'Student'}!
      </h1>
      <div className="flex items-center gap-2">
        {isAdmin && (
          <Button 
            variant="default" 
            onClick={onAdminClick}
            className="gap-2 bg-amber-600 hover:bg-amber-700"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin Panel
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={onLogout}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};
