
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileSidebarTriggerProps {
  onClick: () => void;
}

export const MobileSidebarTrigger: React.FC<MobileSidebarTriggerProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="h-10 w-10 rounded-lg"
      aria-label="Open navigation menu"
    >
      <Menu size={20} />
    </Button>
  );
};
