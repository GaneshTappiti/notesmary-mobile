
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PushNotifications } from '@capacitor/push-notifications';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MobileHeader } from './MobileHeader';
import { MobileLayout } from './MobileLayout';
import { useToast } from '@/hooks/use-toast';
import { Preferences } from '@capacitor/preferences';

const notifications = [
  { id: 'study_rooms', name: 'Study Rooms', description: 'New invites and messages' },
  { id: 'notes', name: 'Notes', description: 'Comments and shares on your notes' },
  { id: 'ai_insights', name: 'AI Insights', description: 'Study recommendations and insights' },
  { id: 'reminders', name: 'Study Reminders', description: 'Session and assignment reminders' },
  { id: 'system', name: 'System Updates', description: 'Important app updates and news' }
];

export const PushNotificationSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [masterEnabled, setMasterEnabled] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        // Check if push permissions are enabled
        const permStatus = await PushNotifications.checkPermissions();
        const masterSetting = permStatus.receive === 'granted';
        setMasterEnabled(masterSetting);
        
        // Load individual notification preferences
        const prefs: Record<string, boolean> = {};
        
        for (const notif of notifications) {
          const { value } = await Preferences.get({ key: `notification-${notif.id}` });
          prefs[notif.id] = value === 'true';
        }
        
        setNotificationPrefs(prefs);
        setLoading(false);
      } catch (error) {
        console.error('Error loading notification preferences:', error);
        setLoading(false);
      }
    };
    
    loadPreferences();
  }, []);
  
  const handleMasterChange = async (enabled: boolean) => {
    try {
      setMasterEnabled(enabled);
      
      if (enabled) {
        // Request permissions
        const permStatus = await PushNotifications.requestPermissions();
        
        if (permStatus.receive === 'granted') {
          toast({
            title: "Notifications enabled",
            description: "You'll now receive push notifications"
          });
          
          await PushNotifications.register();
        } else {
          setMasterEnabled(false);
          toast({
            title: "Permission denied",
            description: "Push notifications permission was denied",
            variant: "destructive"
          });
        }
      } else {
        // Disable all notifications
        const newPrefs = { ...notificationPrefs };
        notifications.forEach(notif => {
          newPrefs[notif.id] = false;
        });
        
        setNotificationPrefs(newPrefs);
        
        // Save preferences
        for (const notif of notifications) {
          await Preferences.set({
            key: `notification-${notif.id}`,
            value: 'false'
          });
        }
        
        toast({
          title: "Notifications disabled",
          description: "You won't receive any push notifications"
        });
      }
    } catch (error) {
      console.error('Error managing push notifications:', error);
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive"
      });
    }
  };
  
  const handleNotificationChange = async (id: string, enabled: boolean) => {
    try {
      const newPrefs = { ...notificationPrefs, [id]: enabled };
      setNotificationPrefs(newPrefs);
      
      // Save the preference
      await Preferences.set({
        key: `notification-${id}`,
        value: enabled.toString()
      });
      
      toast({
        title: enabled ? "Enabled" : "Disabled",
        description: `${notifications.find(n => n.id === id)?.name} notifications ${enabled ? 'enabled' : 'disabled'}`
      });
    } catch (error) {
      console.error('Error saving notification preference:', error);
      toast({
        title: "Error",
        description: "Failed to update notification setting",
        variant: "destructive"
      });
    }
  };
  
  return (
    <MobileLayout>
      <MobileHeader title="Push Notifications" showBackButton />
      
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Enable Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Master toggle for all notifications</p>
              </div>
              <Switch 
                checked={masterEnabled} 
                onCheckedChange={handleMasterChange}
                aria-label="Toggle all notifications"
              />
            </div>
            
            {masterEnabled && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm divide-y divide-gray-100 dark:divide-gray-700">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between p-4">
                    <div>
                      <Label htmlFor={`notif-${notif.id}`} className="font-medium text-gray-900 dark:text-white">
                        {notif.name}
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{notif.description}</p>
                    </div>
                    <Switch 
                      id={`notif-${notif.id}`}
                      checked={notificationPrefs[notif.id] || false} 
                      onCheckedChange={(checked) => handleNotificationChange(notif.id, checked)}
                      disabled={!masterEnabled}
                      aria-label={`Toggle ${notif.name} notifications`}
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </MobileLayout>
  );
};
