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
  email_domain?: string | null;
  branch: string | null;
  year_of_entry: string | null;
  year_of_completion: string | null;
  phone: string | null;
  avatar_url: string | null;
};

// Educational domain patterns
const EDUCATIONAL_DOMAINS = [
  /\.edu$/,                // .edu
  /\.ac\.[a-z]{2,}$/,      // .ac.xx
  /\.edu\.[a-z]{2,}$/,     // .edu.xx
  /\.college$/,            // .college
  /\.university$/,         // .university
  /\.org$/,                // .org
  /\.school$/,             // .school
  // Common country-specific academic domains
  /\.(ca|de|fr|it|es|br|cn|in|uk|ng|jp|au|my|sg)$/ 
];

/**
 * Check if an email domain is from an educational institution
 * Bypass for admin email
 */
const isEducationalEmail = (email: string): boolean => {
  // Special exception for admin email
  if (email === "2005ganesh16@gmail.com") {
    console.log("Admin email detected, bypassing educational email check");
    return true;
  }
  
  const domain = email.split('@')[1];
  if (!domain) return false;
  
  return EDUCATIONAL_DOMAINS.some(pattern => pattern.test(domain));
};

/**
 * Extract domain from email
 */
const extractEmailDomain = (email: string): string => {
  return email.split('@')[1] || '';
};

export const AuthService = {
  /**
   * Sign up a new user
   */
  async signUp(credentials: SignUpCredentials) {
    try {
      console.log("Starting signup process for:", credentials.email);
      
      // Verify email domain is educational or admin email
      if (!isEducationalEmail(credentials.email)) {
        throw new Error('Access is limited to academic institution emails. Please sign up with your official college email address.');
      }
      
      const emailDomain = extractEmailDomain(credentials.email);
      
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            full_name: credentials.fullName || '',
            email_domain: emailDomain,
          },
        },
      });

      if (authError) {
        console.error("Supabase signup error:", authError);
        throw authError;
      }

      console.log("Signup successful:", authData);
      
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
      console.log("Starting login process for:", credentials.email);
      
      // For admin email, add special logging
      if (credentials.email === "2005ganesh16@gmail.com") {
        console.log("Admin login attempt with:", credentials.email);
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        console.error("Supabase login error:", error);
        throw error;
      }

      console.log("Login successful:", data);
      return data;
    } catch (error: any) {
      console.error('Error logging in:', error);
      
      // Special handling for admin login attempts
      if (credentials.email === "2005ganesh16@gmail.com") {
        console.error('Admin login failed:', error);
        
        if (error.message.includes("Email not confirmed")) {
          toast({
            title: 'Email Not Confirmed',
            description: 'Your admin account needs email confirmation. Please check your email inbox or disable email confirmation in Supabase.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Admin Login Failed',
            description: 'Invalid admin credentials. Make sure you have created an admin account first.',
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Login Failed',
          description: error.message || 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
      }
      
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
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      return data;
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
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
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

      return data;
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
