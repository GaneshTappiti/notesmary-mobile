
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthService, UserProfile } from '@/services/AuthService';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  profile: UserProfile | null;
  isLoading: boolean;
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if there's an active session
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData.session) {
          setIsAuthenticated(true);
          setUser(sessionData.session.user);
          
          // Fetch the user profile
          if (sessionData.session.user) {
            const userProfile = await AuthService.getUserProfile(sessionData.session.user.id);
            setProfile(userProfile);
          }
        } else {
          // No active session found
          setIsAuthenticated(false);
          setUser(null);
          setProfile(null);
          localStorage.removeItem('isLoggedIn');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        // Set isLoading to false regardless of outcome
        setIsLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        setUser(session.user);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Fetch the user profile
        if (session.user) {
          const userProfile = await AuthService.getUserProfile(session.user.id);
          setProfile(userProfile);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUser(null);
        setProfile(null);
        localStorage.removeItem('isLoggedIn');
      }
    });

    checkAuth();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { session } = await AuthService.login({ email, password });
      if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Fetch the user profile
        if (session.user) {
          const userProfile = await AuthService.getUserProfile(session.user.id);
          setProfile(userProfile);
        }
        
        toast({
          title: 'Login Successful',
          description: 'Welcome back to Notex!',
        });
      }
    } catch (error) {
      // Error is already handled in AuthService
      setIsAuthenticated(false);
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
      setIsAuthenticated(false);
      setUser(null);
      setProfile(null);
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
