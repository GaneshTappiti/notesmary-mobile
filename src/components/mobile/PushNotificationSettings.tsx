
import React, { useState, useEffect } from 'react';
import { MobileHeader } from './MobileHeader';
import { MobileLayout } from './MobileLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bell, BellOff, ArrowRight } from 'lucide-react';

export const PushNotificationSettings = () => {
  const { toast } = useToast();
  const [pushEnabled, setPushEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState({
    studyReminders: false,
    newMessages: true,
    aiUpdates: false,
    noteUpdates: true,
    marketingNotifications: false
  });

  useEffect(() => {
    // Simulate checking if push notifications are enabled
    const checkPushStatus = async () => {
      try {
        setTimeout(() => {
          setPushEnabled(false);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error checking push notification status:', error);
        setLoading(false);
      }
    };

    checkPushStatus();
  }, []);

  const handleTogglePush = async () => {
    try {
      setLoading(true);
      
      // Simulate enabling/disabling push notifications
      setTimeout(() => {
        setPushEnabled(!pushEnabled);
        toast({
          title: !pushEnabled ? "Notifications Enabled" : "Notifications Disabled",
          description: !pushEnabled 
            ? "You will now receive push notifications" 
            : "You will no longer receive push notifications"
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error toggling push notifications:', error);
      toast({
        title: "Error",
        description: "Could not update notification settings",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleSettingChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Setting Updated",
      description: `${setting} notifications ${!notificationSettings[setting] ? 'enabled' : 'disabled'}`
    });
  };

  return (
    <MobileLayout>
      <MobileHeader title="Notification Settings" showBackButton />
      
      <div className="p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {pushEnabled 
                ? <Bell className="h-6 w-6 text-blue-600" /> 
                : <BellOff className="h-6 w-6 text-gray-400" />
              }
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Push Notifications
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {pushEnabled 
                    ? "You're receiving push notifications" 
                    : "Push notifications are disabled"
                  }
                </p>
              </div>
            </div>
            
            <Switch
              checked={pushEnabled}
              onCheckedChange={handleTogglePush}
              disabled={loading}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
          
          {pushEnabled && (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="p-4 flex justify-between items-center">
                  <Label
                    htmlFor={key}
                    className="text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    {key.replace(/([A-Z])/g, ' $1')
                      .replace(/^./, str => str.toUpperCase())}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleSettingChange(key as keyof typeof notificationSettings)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              ))}
              
              <div className="p-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-blue-600"
                  onClick={() => {
                    toast({
                      title: "Advanced Settings",
                      description: "Advanced notification settings coming soon"
                    });
                  }}
                >
                  Advanced Settings
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {!pushEnabled && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Enable push notifications to stay updated about your study activities,
              messages, and AI-powered insights.
            </p>
            <Button 
              onClick={handleTogglePush}
              disabled={loading}
              className="w-full"
            >
              Enable Notifications
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};
