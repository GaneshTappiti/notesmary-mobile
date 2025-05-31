
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  School, 
  Calendar,
  Edit3,
  Save,
  X,
  LogOut,
  Trash2,
  Shield,
  Camera,
  Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/components/AppLayout';
import { Helmet } from 'react-helmet-async';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  branch: string;
  yearOfEntry: string;
  yearOfCompletion: string;
  bio: string;
}

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user data - in real app, this would come from the auth context
  const [profile, setProfile] = useState<UserProfile>({
    fullName: user?.user_metadata?.full_name || 'John Doe',
    email: user?.email || 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    branch: 'Computer Science',
    yearOfEntry: '2022',
    yearOfCompletion: '2026',
    bio: 'Passionate about technology and learning. Always eager to share knowledge and collaborate with fellow students.'
  });
  
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedProfile(profile); // Reset changes
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(editedProfile);
      setIsEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleChangePassword = () => {
    toast({
      title: "Change Password",
      description: "Password change functionality will be implemented soon.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Delete Account",
      description: "Account deletion requires additional confirmation. This feature will be implemented soon.",
      variant: "destructive"
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const profileContent = (
    <>
      <Helmet>
        <title>Profile | StudyPulse</title>
      </Helmet>
      
      <div className="space-y-6 animate-fade-in">
        {isMobile && (
          <MobileHeader
            title="Profile"
            showBackButton={true}
          />
        )}
        
        {!isMobile && (
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        )}

        {/* Profile Header Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage src="/placeholder.svg" alt={profile.fullName} />
                  <AvatarFallback className="text-xl font-semibold">
                    {getInitials(profile.fullName)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">{profile.fullName}</h2>
                <p className="text-muted-foreground mb-3">{profile.email}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary">{profile.branch}</Badge>
                  <Badge variant="outline">Class of {profile.yearOfCompletion}</Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : handleEditToggle}
                  disabled={isLoading}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save'}
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
                
                {isEditing && (
                  <Button variant="outline" onClick={handleEditToggle}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Manage your personal details and academic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={isEditing ? editedProfile.fullName : profile.fullName}
                  onChange={(e) => setEditedProfile({...editedProfile, fullName: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={isEditing ? editedProfile.email : profile.email}
                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={isEditing ? editedProfile.phone : profile.phone}
                  onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="branch">Branch/Major</Label>
                <Input
                  id="branch"
                  value={isEditing ? editedProfile.branch : profile.branch}
                  onChange={(e) => setEditedProfile({...editedProfile, branch: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearOfEntry">Year of Entry</Label>
                <Input
                  id="yearOfEntry"
                  value={isEditing ? editedProfile.yearOfEntry : profile.yearOfEntry}
                  onChange={(e) => setEditedProfile({...editedProfile, yearOfEntry: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearOfCompletion">Expected Graduation</Label>
                <Input
                  id="yearOfCompletion"
                  value={isEditing ? editedProfile.yearOfCompletion : profile.yearOfCompletion}
                  onChange={(e) => setEditedProfile({...editedProfile, yearOfCompletion: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={isEditing ? editedProfile.bio : profile.bio}
                onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                disabled={!isEditing}
                placeholder="Tell us a bit about yourself..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Account Security
            </CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleChangePassword}>
                Change Password
              </Button>
            </div>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your account is secured with industry-standard encryption. Enable two-factor authentication for enhanced security.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>
              Manage your account preferences and access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={handleLogout} className="flex-1">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              
              <Button variant="destructive" onClick={handleDeleteAccount} className="flex-1">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
            
            <Alert className="border-destructive/50 text-destructive">
              <AlertDescription>
                <strong>Warning:</strong> Deleting your account will permanently remove all your data including notes, study sessions, and progress. This action cannot be undone.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <AppLayout>
      {isMobile ? (
        <div className="px-4 py-6">
          {profileContent}
        </div>
      ) : (
        <div className="container mx-auto py-6 px-4 max-w-4xl">
          {profileContent}
        </div>
      )}
    </AppLayout>
  );
};

export default ProfileScreen;
