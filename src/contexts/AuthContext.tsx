
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthService, UserProfile } from '@/services/AuthService';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  isCollegeAdmin: boolean;
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
  const [isCollegeAdmin, setIsCollegeAdmin] = useState<boolean>(false);
  const { toast } = useToast();

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

  // Check admin status separately to avoid circular callbacks
  const checkAdminStatus = async (email: string) => {
    try {
      // Special case for admin email
      if (email === "2005ganesh16@gmail.com") {
        return true;
      }
      
      // For other emails, use RPC
      const { data: isAdminUser, error } = await supabase.rpc('is_admin', { check_email: email });
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return !!isAdminUser;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  // Check college admin status - for educational domains
  const checkCollegeAdminStatus = (email: string) => {
    if (!email) return false;
    
    // Check for educational email domains
    const EDUCATIONAL_DOMAINS = [
      /\.edu$/,                // .edu
      /\.ac\.[a-z]{2,}$/,      // .ac.xx
      /\.edu\.[a-z]{2,}$/      // .edu.xx
    ];
    
    const domain = email.split('@')[1];
    if (!domain) return false;
    
    // For demo purposes, consider users with educational domains as college admins
    return EDUCATIONAL_DOMAINS.some(pattern => pattern.test(domain));
  };

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;
    
    const initializeAuth = async () => {
      try {
        // First set up the subscription to auth state changes
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
          if (!mounted) return;
          
          console.log("Auth state changed:", event, session ? "session exists" : "no session");
          
          if (session) {
            setUser(session.user);
            setIsAuthenticated(true);
            
            // Defer profile fetching and admin checking
            if (session.user && session.user.email) {
              // Use setTimeout to avoid potential circular callbacks
              setTimeout(async () => {
                if (!mounted) return;
                
                try {
                  const adminStatus = await checkAdminStatus(session.user.email || '');
                  if (mounted) setIsAdmin(adminStatus);

                  // Check if user is a college admin (has educational domain)
                  const collegeAdminStatus = checkCollegeAdminStatus(session.user.email || '');
                  if (mounted) setIsCollegeAdmin(collegeAdminStatus);
                  
                  await fetchUserProfile(session.user.id);
                } catch (error) {
                  console.error("Error in deferred auth operations:", error);
                }
              }, 0);
            }
          } else {
            // User is logged out
            setUser(null);
            setProfile(null);
            setIsAdmin(false);
            setIsCollegeAdmin(false);
            setIsAuthenticated(false);
            localStorage.removeItem('isLoggedIn');
          }
        });
        
        // Store the subscription object correctly
        authSubscription = data.subscription;
        
        // Now check the current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session retrieval error:", sessionError);
          throw sessionError;
        }
        
        if (sessionData?.session) {
          setUser(sessionData.session.user);
          setIsAuthenticated(true);
          
          if (sessionData.session.user && sessionData.session.user.email) {
            const adminStatus = await checkAdminStatus(sessionData.session.user.email || '');
            if (mounted) setIsAdmin(adminStatus);

            // Check if user is a college admin (has educational domain)
            const collegeAdminStatus = checkCollegeAdminStatus(sessionData.session.user.email || '');
            if (mounted) setIsCollegeAdmin(collegeAdminStatus);
            
            await fetchUserProfile(sessionData.session.user.id);
          }
        } else {
          setUser(null);
          setProfile(null);
          setIsAdmin(false);
          setIsCollegeAdmin(false);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setIsAuthenticated(false);
          setUser(null);
        }
      } finally {
        if (mounted) {
          // Set loading to false regardless of success/failure
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
    
    // Clean up function to prevent memory leaks and state updates on unmounted component
    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Starting login process for:", email);
      
      const { data, error } = await AuthService.login({ email, password });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      if (data.session) {
        console.log("Login successful, session established");
        localStorage.setItem('isLoggedIn', 'true');
        
        // Auth state change event will update the state
        toast({
          title: 'Login Successful',
          description: email === "2005ganesh16@gmail.com" ? 'Welcome back, Admin!' : 'Welcome back to Notex!',
        });
      }
    } catch (error: any) {
      console.error("Login error in context:", error);
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
        isCollegeAdmin,
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
