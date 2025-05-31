
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import AppLayout from '@/components/AppLayout';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Info, 
  Moon, 
  Sun,
  Smartphone,
  Mail,
  Volume2,
  VolumeX
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    studyReminders: true,
    newNotes: false,
    studyRooms: true,
    sound: true
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error('Navigation error:', error);
      navigate('/dashboard');
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Notification settings updated",
      description: `${key} notifications ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    toast({
      title: "Theme updated",
      description: `Switched to ${!darkMode ? 'dark' : 'light'} mode.`,
    });
  };

  const handleDataExport = () => {
    toast({
      title: "Export requested",
      description: "Your data export will be ready shortly and sent to your email.",
    });
  };

  const settingsContent = (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Helmet>
        <title>Settings | StudyPulse</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          {!isMobile && "Back"}
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-6`}>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            {!isMobile && "Profile"}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            {!isMobile && "Notifications"}
          </TabsTrigger>
          {!isMobile && (
            <>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield size={16} />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2">
                <Info size={16} />
                About
              </TabsTrigger>
            </>
          )}
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6`}>
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.full_name || 'User')}&background=0D8ABC&color=fff`} />
                      <AvatarFallback>
                        {user?.user_metadata?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue={user?.user_metadata?.full_name || ""} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={user?.email} readOnly className="bg-muted" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="about">About</Label>
                      <Input id="about" placeholder="Tell us about yourself" />
                    </div>

                    {/* Theme Toggle */}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Appearance</Label>
                        <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleThemeToggle}
                        className="flex items-center gap-2"
                      >
                        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                        {darkMode ? 'Light' : 'Dark'}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Mail size={16} />
                  Email Notifications
                </h4>
                <div className="space-y-3">
                  {[
                    { key: 'email', label: 'Email notifications', description: 'Receive notifications via email' },
                    { key: 'studyReminders', label: 'Study reminders', description: 'Get reminded about your study sessions' },
                    { key: 'newNotes', label: 'New notes alerts', description: 'Notify when new notes are shared in your subjects' }
                  ].map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{label}</Label>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                      <Switch
                        checked={notifications[key as keyof typeof notifications]}
                        onCheckedChange={(checked) => handleNotificationChange(label, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Push Notifications */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Smartphone size={16} />
                  Push Notifications
                </h4>
                <div className="space-y-3">
                  {[
                    { key: 'push', label: 'Push notifications', description: 'Receive push notifications on your device' },
                    { key: 'studyRooms', label: 'Study room invitations', description: 'Get notified when invited to study rooms' },
                    { key: 'sound', label: 'Sound notifications', description: 'Play sound with notifications' }
                  ].map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="space-y-0.5 flex-1">
                        <Label className="flex items-center gap-2">
                          {key === 'sound' && (notifications.sound ? <Volume2 size={16} /> : <VolumeX size={16} />)}
                          {label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                      <Switch
                        checked={notifications[key as keyof typeof notifications]}
                        onCheckedChange={(checked) => handleNotificationChange(label, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {!isMobile && (
          <>
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Data</CardTitle>
                  <CardDescription>Manage your privacy settings and data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Data Export</Label>
                      <p className="text-sm text-muted-foreground">Download a copy of your data</p>
                      <Button variant="outline" onClick={handleDataExport}>
                        Export My Data
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Account Deletion</Label>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Account</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and all your data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About StudyPulse</CardTitle>
                  <CardDescription>App information and support.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Version</Label>
                      <p className="text-sm text-muted-foreground">StudyPulse v1.0.0</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Support</Label>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          Help Center
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Contact Support
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Report a Bug
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Legal</Label>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          Terms of Service
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Privacy Policy
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Licenses
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );

  return (
    <AppLayout>
      {isMobile && (
        <MobileHeader
          title="Settings"
          showBackButton={true}
        />
      )}
      <div className={isMobile ? "px-4 py-6" : "py-6"}>
        {settingsContent}
      </div>
    </AppLayout>
  );
};

export default Settings;
