
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type SignUpCredentials = {
  email: string;
  password: string;
  fullName?: string;
  branch?: string;
  yearOfEntry?: string;
  yearOfCompletion?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type UserProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  branch: string | null;
  year_of_entry: string | null;
  year_of_completion: string | null;
  phone: string | null;
  avatar_url: string | null;
};

export const AuthService = {
  /**
   * Sign up a new user
   */
  async signUp(credentials: SignUpCredentials) {
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            full_name: credentials.fullName || '',
          },
        },
      });

      if (authError) {
        throw authError;
      }

      // The profile is automatically created through the database trigger
      return authData;
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        title: 'Sign Up Failed',
        description: error.message || 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  },

  /**
   * Sign in with email and password
   */
  async login(credentials: LoginCredentials) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Error logging in:', error);
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  },

  /**
   * Sign out the current user
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      // Remove isLoggedIn from localStorage as well
      localStorage.removeItem('isLoggedIn');
      
      return true;
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: 'Sign Out Failed',
        description: error.message || 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  },

  /**
   * Get the current authenticated user
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  /**
   * Get the user profile
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      // Use type casting to work around type issues
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  /**
   * Update the user profile
   */
  async updateUserProfile(userId: string, profile: Partial<UserProfile>) {
    try {
      // Use type casting to work around type issues
      const { data, error } = await supabase
        .from('profiles')
        .update(profile as any)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });

      return data as UserProfile;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  },
};
