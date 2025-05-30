
import { Home, FileText, Users, MessageSquare } from 'lucide-react';

export interface NavItemData {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

export const useNavigation = () => {
  // Primary navigation - 4 high-frequency actions only
  const navItems: NavItemData[] = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Home', path: '/dashboard' },
    { id: 'my-notes', icon: <FileText size={20} />, label: 'Notes', path: '/my-notes' },
    { id: 'study-rooms', icon: <Users size={20} />, label: 'Study', path: '/study-rooms' },
    { id: 'study-pulse', icon: <MessageSquare size={20} />, label: 'Chat', path: '/study-pulse' },
  ];

  return { navItems };
};
