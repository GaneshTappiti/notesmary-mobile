
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthService, UserProfile } from '@/services/AuthService';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const checkAdminStatus = async (email: string) => {
    try {
      console.log("Checking admin status for email:", email);
      
      // For admin email, bypass the RPC call and set directly
      if (email === "2005ganesh16@gmail.com") {
        console.log("Admin email detected, setting isAdmin=true");
        return true;
      }
      
      // For other emails, use the is_admin function from Supabase
      const { data: isAdminUser, error } = await supabase.rpc('is_admin', { check_email: email });
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      console.log("Admin status from RPC:", isAdminUser);
      return !!isAdminUser;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  // Fetch user profile safely, outside of auth state change callback
  const fetchUserProfile = async (userId: string) => {
    try {
      const userProfile = await AuthService.getUserProfile(userId);
      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const initAuth = async () => {
      try {
        // First set up the subscription to auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (!isMounted) return;
          
          if (session) {
            setIsAuthenticated(true);
            setUser(session.user);
            
            // We use setTimeout to defer profile fetching to avoid potential circular callbacks
            if (session.user) {
              const email = session.user.email || '';
              
              // Check admin status safely
              setTimeout(async () => {
                if (!isMounted) return;
                
                const adminStatus = await checkAdminStatus(email);
                setIsAdmin(adminStatus);
                
                // Fetch user profile separately
                fetchUserProfile(session.user.id);
              }, 0);
            }
          } else {
            // User is logged out
            setIsAuthenticated(false);
            setUser(null);
            setProfile(null);
            setIsAdmin(false);
            localStorage.removeItem('isLoggedIn');
          }
        });
        
        // Now check the current session
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData.session) {
          setIsAuthenticated(true);
          setUser(sessionData.session.user);
          
          if (sessionData.session.user) {
            const adminStatus = await checkAdminStatus(sessionData.session.user.email || '');
            setIsAdmin(adminStatus);
            
            // Fetch user profile separately
            await fetchUserProfile(sessionData.session.user.id);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setProfile(null);
          setIsAdmin(false);
        }
        
        setIsLoading(false);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth check error:', error);
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    };

    initAuth();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Starting login process for:", email);
      
      // Check if this is the admin email
      const isAdminEmail = email === "2005ganesh16@gmail.com";
      if (isAdminEmail) {
        console.log("Admin login attempt detected");
      }
      
      const { data, error } = await AuthService.login({ email, password });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      if (data.session) {
        console.log("Login successful, session established");
        setIsAuthenticated(true);
        setUser(data.session.user);
        
        // The profile data and admin status will be handled by the onAuthStateChange
        localStorage.setItem('isLoggedIn', 'true');
        
        toast({
          title: 'Login Successful',
          description: isAdminEmail ? 'Welcome back, Admin!' : 'Welcome back to Notex!',
        });
      }
    } catch (error: any) {
      console.error("Login error in context:", error);
      setIsAuthenticated(false);
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName?: string) => {
    setIsLoading(true);
    try {
      await AuthService.signUp({ 
        email, 
        password, 
        fullName 
      });
      
      toast({
        title: 'Account Created',
        description: 'Your account has been created. You can now log in.',
      });
    } catch (error) {
      // Error is already handled in AuthService
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      // Auth state change will handle the rest
    } catch (error) {
      // Error is already handled in AuthService
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const updatedProfile = await AuthService.updateUserProfile(user.id, profileData);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
    } catch (error) {
      // Error is already handled in AuthService
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        profile,
        isLoading,
        isAdmin,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
