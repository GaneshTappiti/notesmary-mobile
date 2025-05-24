
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Moon,
  Sun,
  Smartphone,
  Lock,
  Eye,
  Mail,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MobileHeader } from './MobileHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SettingItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onToggle?: (value: boolean) => void;
  onClick?: () => void;
  danger?: boolean;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export const MobileSettings = () => {
  const { user, profile, logout } = useAuth();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    studyReminders: true,
    roomInvitations: true,
    darkMode: false,
    autoSync: true,
    offlineMode: false,
    biometricAuth: false,
    twoFactorAuth: false
  });

  const handleToggle = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleSignOut = async () => {
    try {
      await logout();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const settingSections: SettingSection[] = [
    {
      title: "Notifications",
      items: [
        {
          id: 'push',
          label: 'Push Notifications',
          description: 'Receive notifications on your device',
          icon: <Bell className="h-5 w-5" />,
          type: 'toggle',
          value: settings.pushNotifications,
          onToggle: (value) => handleToggle('pushNotifications', value)
        },
        {
          id: 'email',
          label: 'Email Notifications',
          description: 'Receive updates via email',
          icon: <Mail className="h-5 w-5" />,
          type: 'toggle',
          value: settings.emailNotifications,
          onToggle: (value) => handleToggle('emailNotifications', value)
        },
        {
          id: 'reminders',
          label: 'Study Reminders',
          description: 'Get reminded about scheduled study sessions',
          icon: <MessageSquare className="h-5 w-5" />,
          type: 'toggle',
          value: settings.studyReminders,
          onToggle: (value) => handleToggle('studyReminders', value)
        },
        {
          id: 'invitations',
          label: 'Room Invitations',
          description: 'Notifications for study room invites',
          icon: <User className="h-5 w-5" />,
          type: 'toggle',
          value: settings.roomInvitations,
          onToggle: (value) => handleToggle('roomInvitations', value)
        }
      ]
    },
    {
      title: "Appearance",
      items: [
        {
          id: 'theme',
          label: 'Dark Mode',
          description: 'Switch between light and dark themes',
          icon: settings.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />,
          type: 'toggle',
          value: settings.darkMode,
          onToggle: (value) => handleToggle('darkMode', value)
        },
        {
          id: 'display',
          label: 'Display Settings',
          icon: <Smartphone className="h-5 w-5" />,
          type: 'navigation',
          onClick: () => toast({ title: "Coming soon", description: "Display settings will be available soon" })
        }
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        {
          id: 'biometric',
          label: 'Biometric Authentication',
          description: 'Use fingerprint or face unlock',
          icon: <Lock className="h-5 w-5" />,
          type: 'toggle',
          value: settings.biometricAuth,
          onToggle: (value) => handleToggle('biometricAuth', value)
        },
        {
          id: '2fa',
          label: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          icon: <Shield className="h-5 w-5" />,
          type: 'toggle',
          value: settings.twoFactorAuth,
          onToggle: (value) => handleToggle('twoFactorAuth', value)
        },
        {
          id: 'privacy',
          label: 'Privacy Settings',
          icon: <Eye className="h-5 w-5" />,
          type: 'navigation',
          onClick: () => toast({ title: "Coming soon", description: "Privacy settings will be available soon" })
        }
      ]
    },
    {
      title: "Data & Sync",
      items: [
        {
          id: 'autosync',
          label: 'Auto Sync',
          description: 'Automatically sync your data across devices',
          icon: <Smartphone className="h-5 w-5" />,
          type: 'toggle',
          value: settings.autoSync,
          onToggle: (value) => handleToggle('autoSync', value)
        },
        {
          id: 'offline',
          label: 'Offline Mode',
          description: 'Download content for offline access',
          icon: <Smartphone className="h-5 w-5" />,
          type: 'toggle',
          value: settings.offlineMode,
          onToggle: (value) => handleToggle('offlineMode', value)
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          id: 'help',
          label: 'Help & Support',
          icon: <HelpCircle className="h-5 w-5" />,
          type: 'navigation',
          onClick: () => toast({ title: "Coming soon", description: "Help center will be available soon" })
        },
        {
          id: 'feedback',
          label: 'Send Feedback',
          icon: <MessageSquare className="h-5 w-5" />,
          type: 'navigation',
          onClick: () => toast({ title: "Thank you!", description: "Feedback feature coming soon" })
        }
      ]
    },
    {
      title: "Account",
      items: [
        {
          id: 'signout',
          label: 'Sign Out',
          icon: <LogOut className="h-5 w-5" />,
          type: 'action',
          onClick: handleSignOut,
          danger: true
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <MobileHeader
        title="Settings"
        showBackButton={true}
      />

      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 p-6 m-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff" />
              <AvatarFallback>
                {user?.user_metadata?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {profile?.full_name || 'Student'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
            
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="px-4 space-y-6">
          {settingSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wide">
                  {section.title}
                </h4>
              </div>
              
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                    className="px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-2 rounded-full ${item.danger ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} dark:bg-opacity-20`}>
                        {item.icon}
                      </div>
                      
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${item.danger ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                          {item.label}
                        </p>
                        {item.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {item.type === 'toggle' && (
                        <Switch
                          checked={item.value || false}
                          onCheckedChange={item.onToggle}
                        />
                      )}
                      
                      {(item.type === 'navigation' || item.type === 'action') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={item.onClick}
                          className="p-1"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Footer spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
};
