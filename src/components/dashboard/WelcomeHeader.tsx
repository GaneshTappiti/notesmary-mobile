
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface WelcomeHeaderProps {
  userName?: string;
  onLogout: () => void;
}

export const WelcomeHeader = ({ userName, onLogout }: WelcomeHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">
        Welcome back, {userName || 'Student'}!
      </h1>
      <Button 
        variant="outline" 
        onClick={onLogout}
        className="gap-2"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
};
