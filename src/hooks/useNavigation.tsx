
import { 
  Home, 
  Upload, 
  Search, 
  FileText, 
  Bot, 
  CheckSquare, 
  BarChart3, 
  Zap, 
  Users, 
  Settings,
  Bell
} from 'lucide-react';

export const useNavigation = () => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: <Home size={18} />
    },
    {
      id: 'upload-notes',
      label: 'Upload Notes',
      path: '/upload-notes',
      icon: <Upload size={18} />
    },
    {
      id: 'find-notes',
      label: 'Find Notes',
      path: '/find-notes',
      icon: <Search size={18} />
    },
    {
      id: 'my-notes',
      label: 'My Notes',
      path: '/my-notes',
      icon: <FileText size={18} />
    },
    {
      id: 'ai-answers',
      label: 'AI Answers',
      path: '/ai-answers',
      icon: <Bot size={18} />
    },
    {
      id: 'mark-answers',
      label: 'Mark Answers',
      path: '/ai-mark-answers',
      icon: <CheckSquare size={18} />
    },
    {
      id: 'study-analytics',
      label: 'Study Analytics',
      path: '/study-analytics',
      icon: <BarChart3 size={18} />
    },
    {
      id: 'study-pulse',
      label: 'StudyPulse',
      path: '/study-pulse',
      icon: <Zap size={18} />
    },
    {
      id: 'study-rooms',
      label: 'Study Rooms',
      path: '/study-rooms',
      icon: <Users size={18} />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      path: '/notifications',
      icon: <Bell size={18} />
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: <Settings size={18} />
    }
  ];

  return { navItems };
};
