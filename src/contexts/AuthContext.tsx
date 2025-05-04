
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock authentication for demo purposes
  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        // In a real app, this would validate the token with your auth provider
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // Mock profile data
          setProfile({
            id: 'profile-1',
            user_id: parsedUser.id,
            full_name: parsedUser.name || 'Student User',
            avatar_url: 'https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff',
            bio: 'Student learning with Notex'
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call your auth provider's API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: 'user-123',
        email,
        name: email.split('@')[0]
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Mock profile
      const mockProfile = {
        id: 'profile-1',
        user_id: mockUser.id,
        full_name: mockUser.name || 'Student User',
        avatar_url: 'https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff',
        bio: 'Student learning with Notex'
      };
      
      setProfile(mockProfile);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call your auth provider's API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        email,
        name
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Mock profile
      const mockProfile = {
        id: 'profile-' + Math.floor(Math.random() * 1000),
        user_id: mockUser.id,
        full_name: name,
        avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
        bio: 'New student on Notex'
      };
      
      setProfile(mockProfile);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call your auth provider's API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear local storage and state
      localStorage.removeItem('user');
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    isAdmin: user?.email === 'admin@example.com', // Mock admin check
    login,
    signup,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
