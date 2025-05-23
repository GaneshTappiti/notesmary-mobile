
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { MobileLayout } from './MobileLayout';
import { ChevronLeft, Bell, BellOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export const PushNotificationSettings = () => {
  const navigate = useNavigate();
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt' | 'unsupported'>('prompt');
  const [loading, setLoading] = useState(true);
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'study_reminders',
      title: 'Study Reminders',
      description: 'Get notified about scheduled study sessions',
      enabled: true
    },
    {
      id: 'new_notes',
      title: 'New Notes',
      description: 'Notifications when new notes are available',
      enabled: true
    },
    {
      id: 'ai_answers',
      title: 'AI Answers',
      description: 'Get notified when AI has answered your questions',
      enabled: true
    },
    {
      id: 'updates',
      title: 'App Updates',
      description: 'Stay informed about new features and improvements',
      enabled: false
    }
  ]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await Preferences.get({ key: 'notification-settings' });
        if (storedSettings.value) {
          setNotificationSettings(JSON.parse(storedSettings.value));
        }

        // Check notification permission status if on native platform
        try {
          const { PushNotifications } = await import('@capacitor/push-notifications');
          const status = await PushNotifications.checkPermissions();
          setPermissionStatus(status.receive);
        } catch (err) {
          console.log('Push notifications not available', err);
          setPermissionStatus('unsupported');
        }
      } catch (error) {
        console.error('Failed to load notification settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const saveSetting = async (id: string, enabled: boolean) => {
    try {
      const updatedSettings = notificationSettings.map(setting => 
        setting.id === id ? { ...setting, enabled } : setting
      );
      
      setNotificationSettings(updatedSettings);
      await Preferences.set({
        key: 'notification-settings',
        value: JSON.stringify(updatedSettings)
      });

      try {
        // If enabling notifications and permission isn't granted, request it
        if (enabled && permissionStatus !== 'granted' && permissionStatus !== 'unsupported') {
          const { PushNotifications } = await import('@capacitor/push-notifications');
          await PushNotifications.requestPermissions();
          const status = await PushNotifications.checkPermissions();
          setPermissionStatus(status.receive);
        }
      } catch (err) {
        console.log('Push notifications not available:', err);
      }
    } catch (error) {
      console.error('Failed to save notification setting:', error);
    }
  };

  const toggleAllNotifications = async (enabled: boolean) => {
    try {
      const updatedSettings = notificationSettings.map(setting => ({
        ...setting,
        enabled
      }));
      
      setNotificationSettings(updatedSettings);
      await Preferences.set({
        key: 'notification-settings',
        value: JSON.stringify(updatedSettings)
      });

      if (enabled && permissionStatus !== 'granted' && permissionStatus !== 'unsupported') {
        try {
          const { PushNotifications } = await import('@capacitor/push-notifications');
          await PushNotifications.requestPermissions();
          const status = await PushNotifications.checkPermissions();
          setPermissionStatus(status.receive);
        } catch (err) {
          console.log('Push notifications not available:', err);
        }
      }
    } catch (error) {
      console.error('Failed to toggle all notifications:', error);
    }
  };

  const areAllEnabled = notificationSettings.every(setting => setting.enabled);
  
  return (
    <MobileLayout>
      <div className="space-y-4 pb-6">
        <div className="flex items-center py-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)} 
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Notification Settings</h1>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        ) : (
          <>
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Notifications</CardTitle>
                    <CardDescription>Enable or disable all notifications</CardDescription>
                  </div>
                  <Switch 
                    checked={areAllEnabled}
                    onCheckedChange={toggleAllNotifications}
                  />
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-500">
                {permissionStatus === 'denied' && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-md text-yellow-800 dark:text-yellow-200 text-sm mb-3">
                    Notifications are blocked in your device settings. Please enable them to receive notifications.
                  </div>
                )}
                
                {permissionStatus === 'unsupported' && (
                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md text-sm mb-3">
                    Push notifications may not be supported in this environment.
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              {notificationSettings.map(setting => (
                <Card key={setting.id} className="shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{setting.title}</CardTitle>
                        <CardDescription className="text-sm">{setting.description}</CardDescription>
                      </div>
                      <Switch 
                        checked={setting.enabled && permissionStatus !== 'denied'}
                        onCheckedChange={(checked) => saveSetting(setting.id, checked)}
                        disabled={permissionStatus === 'denied'}
                      />
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
};
