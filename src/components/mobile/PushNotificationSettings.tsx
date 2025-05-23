import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ChevronLeft, Bell, BellOff, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MobileLayout } from './MobileLayout';

// Define types for permission states
type PermissionState = 'granted' | 'denied' | 'prompt' | 'unsupported';

export const PushNotificationSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [scheduleEnabled, setScheduleEnabled] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState>('prompt');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        // Use dynamic import to avoid issues with SSR
        const PushNotifications = await import('@capacitor/push-notifications')
          .then((module) => module.PushNotifications);
        
        // Check if push notifications are supported
        const status = await PushNotifications.checkPermissions();
        
        // Handle the permission status - access correct property
        if (status.receive === 'granted') {
          setPushEnabled(true);
          setPermissionStatus('granted');
        } else if (status.receive === 'denied') {
          setPushEnabled(false);
          setPermissionStatus('denied');
        } else {
          setPushEnabled(false);
          setPermissionStatus('prompt');
        }
      } catch (error) {
        console.error('Error checking push notification permissions:', error);
        setPermissionStatus('unsupported');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkPermissions();
  }, []);

  const handlePushToggle = async () => {
    try {
      setIsLoading(true);
      
      // Use dynamic import
      const PushNotifications = await import('@capacitor/push-notifications')
        .then((module) => module.PushNotifications);
      
      if (!pushEnabled) {
        // Request permissions
        const result = await PushNotifications.requestPermissions();
        
        if (result.receive === 'granted') {
          await PushNotifications.register();
          setPushEnabled(true);
          setPermissionStatus('granted');
          
          toast({
            title: 'Push Notifications Enabled',
            description: 'You will now receive push notifications.'
          });
        } else {
          // Map any unexpected values to our allowed types
          let status: PermissionState = 'denied';
          if (result.receive === 'prompt') status = 'prompt';
          
          setPermissionStatus(status);
          setPushEnabled(false);
          
          toast({
            title: 'Permission Denied',
            description: 'Push notifications permission was denied.',
            variant: 'destructive'
          });
        }
      } else {
        // Disable push notifications
        await PushNotifications.unregister();
        setPushEnabled(false);
        
        toast({
          title: 'Push Notifications Disabled',
          description: 'You will no longer receive push notifications.'
        });
      }
    } catch (error) {
      console.error('Error toggling push notifications:', error);
      toast({
        title: 'Error',
        description: 'Failed to change notification settings.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openAppSettings = async () => {
    try {
      // Use dynamic import
      const { App } = await import('@capacitor/app');
      // Open app settings using the correct method
      await App.openUrl({
        url: 'app-settings:'
      });
    } catch (error) {
      console.error('Error opening app settings:', error);
      toast({
        title: 'Error',
        description: 'Could not open app settings.',
        variant: 'destructive'
      });
    }
  };

  return (
    <MobileLayout hideBottomNav>
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
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-500" />
              Push Notifications
            </CardTitle>
            <CardDescription>
              Receive alerts when there's activity in your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Allow notifications on your device
                </p>
              </div>
              <Switch 
                checked={pushEnabled} 
                onCheckedChange={handlePushToggle}
                disabled={isLoading || permissionStatus === 'unsupported'}
              />
            </div>
            
            {permissionStatus === 'denied' && (
              <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-md flex gap-3">
                <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    Permission Required
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    You'll need to enable notifications in your device settings.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 h-8 text-xs bg-amber-100 hover:bg-amber-200 dark:bg-amber-800/40 dark:hover:bg-amber-800/60"
                    onClick={openAppSettings}
                  >
                    Open Settings
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Study Room Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Messages and updates from your study rooms
                  </p>
                </div>
                <Switch 
                  checked={scheduleEnabled} 
                  onCheckedChange={setScheduleEnabled}
                  disabled={!pushEnabled || isLoading}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch 
                  checked={emailEnabled} 
                  onCheckedChange={setEmailEnabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BellOff className="w-5 h-5 mr-2 text-gray-500" />
              Do Not Disturb
            </CardTitle>
            <CardDescription>
              Set quiet hours when you don't want to be disturbed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Quiet Hours</p>
                  <p className="text-sm text-muted-foreground">
                    Silence notifications during set hours
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-2 opacity-50 pointer-events-none">
                <div>
                  <p className="text-xs mb-1">Start Time</p>
                  <Button variant="outline" className="w-full justify-start">10:00 PM</Button>
                </div>
                <div>
                  <p className="text-xs mb-1">End Time</p>
                  <Button variant="outline" className="w-full justify-start">7:00 AM</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <Button variant="outline" className="w-full" onClick={() => navigate('/settings')}>
            Back to Settings
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
