import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService, UserProfile } from "@/services/AuthService";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  isAdmin: boolean;
  isCollegeAdmin: boolean;
  userProfile: UserProfile | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<UserProfile | null>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  isAdmin: false,
  isCollegeAdmin: false,
  userProfile: null,
  profile: null,
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(null),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCollegeAdmin, setIsCollegeAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const hasSession = await AuthService.hasValidSession();
        if (hasSession) {
          setIsAuthenticated(true);
          const currentUser = await AuthService.getCurrentUser();
          setUser(currentUser);

          if (currentUser) {
            const profile = await AuthService.getUserProfile(currentUser.id);
            setUserProfile(profile);
            setIsAdmin(currentUser.email === "2005ganesh16@gmail.com");
            
            // Check if the user is a college admin (has educational email domain)
            const emailDomain = currentUser.email ? currentUser.email.split('@')[1] : '';
            const isEducationalDomain = AuthService.isEducationalEmail ? 
              AuthService.isEducationalEmail(currentUser.email || '') : 
              false;
            setIsCollegeAdmin(isEducationalDomain && emailDomain !== 'gmail.com');
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  // Login with email and password - removed automatic navigation
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await AuthService.login(email, password);
      
      if (error) throw error;

      setIsAuthenticated(true);
      setUser(data.session?.user);
      setIsAdmin(email === "2005ganesh16@gmail.com");

      // Fetch and set user profile
      const profile = await AuthService.getUserProfile(data.session?.user.id);
      setUserProfile(profile);

      // Don't navigate here - let the Authentication component handle it
      console.log("Login successful in context, navigation will be handled by Authentication component");
    } catch (error: any) {
      console.error("Login error in context:", error);
      setIsAuthenticated(false);
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup with email, password, and full name
  const signup = async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true);
      await AuthService.signUp({ email, password, fullName });
      toast({
        title: "Signup Successful",
        description: "Please confirm your email to continue.",
      });
      navigate("/authentication", { state: { activeTab: 'login' } });
    } catch (error: any) {
      console.error("Signup error in context:", error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout the user
  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);
      setUserProfile(null);
      toast({
        title: "Logout Successful",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (profile: Partial<UserProfile>) => {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error("User ID not available");
      }
      const updatedProfile = await AuthService.updateUserProfile(user.id, profile);
      setUserProfile(updatedProfile);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      return updatedProfile;
    } catch (error) {
      console.error("Profile update error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    isAdmin,
    isCollegeAdmin,
    userProfile,
    profile: userProfile,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
