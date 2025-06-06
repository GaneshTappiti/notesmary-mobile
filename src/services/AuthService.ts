import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

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

export class AuthService {
  /**
   * Check if an email domain is from an educational institution
   * Bypass for admin email
   */
  static isEducationalEmail(email: string): boolean {
    // Special exception for admin email
    if (email === "2005ganesh16@gmail.com") {
      console.log("Admin email detected, bypassing educational email check");
      return true;
    }
    
    const domain = email.split('@')[1];
    if (!domain) return false;
    
    return EDUCATIONAL_DOMAINS.some(pattern => pattern.test(domain));
  }

  /**
   * Sign up a new user
   */
  static async signUp(credentials: SignUpCredentials) {
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
  }

  /**
   * Sign in with email and password
   */
  static async login(email: string, password: string) {
    try {
      console.log("Starting login process for:", email);
      
      // For admin email, add special logging
      if (email === "2005ganesh16@gmail.com") {
        console.log("Admin login attempt with:", email);
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Supabase login error:", error);
        throw error;
      }

      console.log("Login successful:", data);
      
      // Set the persistent login flag
      localStorage.setItem('isLoggedIn', 'true');
      
      return { data, error: null }; // Explicitly return with this format for consistent error handling
    } catch (error: any) {
      console.error('Error logging in:', error);
      
      // Special handling for admin login attempts
      if (email === "2005ganesh16@gmail.com") {
        console.error('Admin login failed:', error);
        
        if (error.message && error.message.includes("Email not confirmed")) {
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
      
      return { data: null, error };
    }
  }

  /**
   * Request password reset for email
   */
  static async requestPasswordReset(email: string) {
    try {
      console.log("Requesting password reset for:", email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Password Reset Email Sent',
        description: 'Please check your email for password reset instructions.',
      });

      return { success: true };
    } catch (error: any) {
      console.error('Password reset request error:', error);
      toast({
        title: 'Password Reset Failed',
        description: error.message || 'Failed to send password reset email. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  }

  /**
   * Update user password (used during password reset flow)
   */
  static async updatePassword(newPassword: string) {
    try {
      console.log("Updating user password");
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Password Updated',
        description: 'Your password has been updated successfully.',
      });

      return { success: true };
    } catch (error: any) {
      console.error('Password update error:', error);
      toast({
        title: 'Password Update Failed',
        description: error.message || 'Failed to update password. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  }

  /**
   * Sign out the current user
   */
  static async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      // Remove isLoggedIn from localStorage
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
  }

  /**
   * Get the current authenticated user
   */
  static async getCurrentUser() {
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
  }

  /**
   * Check if the user has a valid session
   */
  static async hasValidSession() {
    try {
      // Check localStorage first for quick response
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (!isLoggedIn) {
        return false;
      }
      
      // Then verify with Supabase
      const { data } = await supabase.auth.getSession();
      return !!data.session;
    } catch (error) {
      console.error('Error checking session:', error);
      return false;
    }
  }

  /**
   * Get the user profile
   */
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      // First try to get the profile
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // If profile doesn't exist, create a new one
      if (error && error.code === 'PGRST116') {
        console.log("Profile doesn't exist for user, creating one");
        
        // Get user data to extract information
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        
        if (user) {
          // Create a new profile
          const newProfile: Partial<UserProfile> = {
            id: userId,
            full_name: user.user_metadata?.full_name || null,
            email: user.email,
            email_domain: user.email ? extractEmailDomain(user.email) : null,
            branch: null,
            year_of_entry: null,
            year_of_completion: null,
            phone: null,
            avatar_url: null
          };
          
          // Insert the new profile
          const { data: createdProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([newProfile])
            .select()
            .single();
            
          if (insertError) {
            console.error('Error creating profile:', insertError);
            return null;
          }
          
          return createdProfile;
        }
        
        return null;
      }

      if (error) {
        console.error('Error getting profile:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * Update the user profile
   */
  static async updateUserProfile(userId: string, profile: Partial<UserProfile>) {
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
  }
}
