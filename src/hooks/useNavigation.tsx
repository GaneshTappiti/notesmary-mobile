
import { Home, FileText, BrainCircuit, Search, User, Bell, BarChart3, Users, Upload } from 'lucide-react';

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
    { id: 'ai-answers', icon: <BrainCircuit size={20} />, label: 'AI', path: '/ai-answers' },
    { id: 'find-notes', icon: <Search size={20} />, label: 'Find', path: '/find-notes' },
    { id: 'upload-notes', icon: <Upload size={20} />, label: 'Upload', path: '/upload-notes' },
    { id: 'study-pulse', icon: <Users size={20} />, label: 'Pulse', path: '/study-pulse' },
    { id: 'study-analytics', icon: <BarChart3 size={20} />, label: 'Analytics', path: '/study-analytics' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Alerts', path: '/notifications' },
    { id: 'settings', icon: <User size={20} />, label: 'Profile', path: '/settings' },
  ];

  return { navItems };
};
