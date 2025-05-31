
import { Home, FileText, Users, BrainCircuit, User } from 'lucide-react';

export interface NavItemData {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

export const useNavigation = () => {
  const navItems: NavItemData[] = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Home', path: '/dashboard' },
    { id: 'my-notes', icon: <FileText size={20} />, label: 'Notes', path: '/my-notes' },
    { id: 'study-rooms', icon: <Users size={20} />, label: 'Rooms', path: '/study-rooms' },
    { id: 'ai-answers', icon: <BrainCircuit size={20} />, label: 'AI', path: '/ai-answers' },
    { id: 'profile', icon: <User size={20} />, label: 'Profile', path: '/profile' },
  ];

  return { navItems };
};
