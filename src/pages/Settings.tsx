
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Bell, Upload, Moon, Sun, Save, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    bio: 'Student at University of Technology',
    profilePic: '/placeholder.svg'
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    autoSave: true
  });

  // Update form data with user info if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.user_metadata?.full_name || prev.fullName,
        email: user.email || prev.email,
        username: user.user_metadata?.username || user.email?.split('@')[0] || prev.username,
      }));
    }
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Reset saved state when form is changed
    setSaved(false);
  };
  
  const handleToggleChange = (name: string) => {
    setPreferences(prev => ({ ...prev, [name]: !prev[name] }));
    // Reset saved state when preferences are changed
    setSaved(false);
    
    // Show toast for dark mode toggle to make it more interactive
    if (name === 'darkMode') {
      toast({
        title: preferences.darkMode ? "Light mode enabled" : "Dark mode enabled",
        description: "Your theme preference has been updated.",
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update UI state
      setSaved(true);
      
      toast({
        title: "Settings saved",
        description: "Your profile settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset saved state after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (saved) {
      timer = setTimeout(() => setSaved(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [saved]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="pb-12 px-4 w-full max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Account Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your profile and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.profilePic} alt="Profile" />
                  <AvatarFallback>{formData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Upload size={16} />
                  <span>Change Picture</span>
                </Button>
                <div className="text-center">
                  <h3 className="font-medium text-lg">{formData.fullName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@{formData.username}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-1">
                    <User size={16} />
                    <span>Full Name</span>
                  </Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail size={16} />
                    <span>Email</span>
                  </Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    disabled={Boolean(user)} // Disable email editing if user is logged in
                  />
                  {user && (
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed after account creation</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-1">
                    <User size={16} />
                    <span>Username</span>
                  </Label>
                  <Input 
                    id="username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio" className="flex items-center gap-1">
                    <User size={16} />
                    <span>Bio</span>
                  </Label>
                  <Input 
                    id="bio" 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                        Saving...
                      </>
                    ) : saved ? (
                      <>
                        <Check size={18} className="text-green-200" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Preferences</CardTitle>
              <CardDescription>Customize your notification and app settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell size={18} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about your notes and study groups</p>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.emailNotifications} 
                    onCheckedChange={() => handleToggleChange('emailNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell size={18} className="text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get real-time alerts in your browser</p>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.pushNotifications} 
                    onCheckedChange={() => handleToggleChange('pushNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {preferences.darkMode ? (
                      <Moon size={18} className="text-indigo-600 dark:text-indigo-400" />
                    ) : (
                      <Sun size={18} className="text-amber-500" />
                    )}
                    <div>
                      <p className="font-medium">{preferences.darkMode ? "Dark Mode" : "Light Mode"}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.darkMode} 
                    onCheckedChange={() => handleToggleChange('darkMode')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload size={18} className="text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-medium">Auto-Save Draft Notes</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Automatically save your notes as you type</p>
                    </div>
                  </div>
                  <Switch 
                    checked={preferences.autoSave} 
                    onCheckedChange={() => handleToggleChange('autoSave')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
