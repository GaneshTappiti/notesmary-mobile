
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogIn, BrainCircuit, LogOut, Search, Bell } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UploadModal } from './UploadModal';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from './ThemeToggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Mock unread count
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if we're in dashboard mode (showing the sidebar)
  const isDashboardMode = !['/', '/login', '/authentication'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    checkLoginStatus();
    
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // If we're in dashboard mode, don't show the marketing navbar
  if (isDashboardMode) {
    return null;
  }

  const checkAuthAndProceed = (action: 'upload' | 'dashboard' | 'find' | 'notifications') => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: action === 'upload' 
          ? "Please login to upload notes" 
          : action === 'find'
          ? "Please login to search notes"
          : action === 'notifications'
          ? "Please login to view notifications"
          : "Please login to access your dashboard",
      });
      navigate('/authentication');
      return false;
    }
    
    return true;
  };

  const handleUploadClick = () => {
    if (checkAuthAndProceed('upload')) {
      navigate('/upload-notes');
    }
  };

  const handleDashboardClick = () => {
    if (checkAuthAndProceed('dashboard')) {
      navigate('/dashboard');
    }
  };

  const handleFindNotesClick = () => {
    if (checkAuthAndProceed('find')) {
      navigate('/find-notes');
    }
  };

  const handleNotificationsClick = () => {
    if (checkAuthAndProceed('notifications')) {
      navigate('/notifications');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Notex
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex items-center space-x-4"
            >
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/" className="text-foreground hover:text-blue-600 font-medium px-3 py-2">
                      Home
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-foreground hover:text-blue-600 font-medium">
                      Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                        <Link to="/ai-answers" className="flex items-start gap-2 p-2 hover:bg-accent rounded-md">
                          <BrainCircuit size={18} className="mt-0.5 text-blue-600" />
                          <div>
                            <div className="font-medium">AI Answers</div>
                            <div className="text-sm text-muted-foreground">Get instant help with your questions</div>
                          </div>
                        </Link>
                        <div 
                          onClick={handleFindNotesClick}
                          className="flex items-start gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                        >
                          <Search size={18} className="mt-0.5 text-purple-600" />
                          <div>
                            <div className="font-medium">Find Notes</div>
                            <div className="text-sm text-muted-foreground">Browse shared study materials</div>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <a href="#pricing" className="text-foreground hover:text-blue-600 font-medium px-3 py-2">
                      Pricing
                    </a>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <a href="#about" className="text-foreground hover:text-blue-600 font-medium px-3 py-2">
                      About
                    </a>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center space-x-3"
            >
              <ThemeToggle variant="ghost" className="rounded-full" />
              
              {isLoggedIn && (
                <Button 
                  variant="ghost" 
                  className="relative"
                  onClick={handleNotificationsClick}
                >
                  <Bell size={18} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleUploadClick}
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Upload Notes
              </Button>
              
              {isLoggedIn ? (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                  onClick={handleDashboardClick}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg flex items-center gap-2"
                  onClick={() => navigate('/authentication')}
                >
                  <LogIn size={18} />
                  <span>Login / Sign Up</span>
                </Button>
              )}
            </motion.div>
            
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle variant="ghost" className="rounded-full" />
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </nav>
        </div>
        
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-5 space-y-4">
              <a 
                href="/"
                className="block text-foreground hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#features" 
                className="block text-foreground hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="block text-foreground hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#about" 
                className="block text-foreground hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <Link
                to="/ai-answers"
                className="block text-foreground hover:text-blue-600 font-medium flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BrainCircuit size={18} className="mr-1" />
                AI Answers
              </Link>
              <div
                className="block text-foreground hover:text-blue-600 font-medium flex items-center"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleFindNotesClick();
                }}
              >
                <Search size={18} className="mr-1" />
                Find Notes
              </div>
              {isLoggedIn && (
                <div
                  className="block text-foreground hover:text-blue-600 font-medium flex items-center relative"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNotificationsClick();
                  }}
                >
                  <Bell size={18} className="mr-1" />
                  Notifications
                  {unreadNotifications > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </div>
              )}
              <div className="pt-4 flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleUploadClick();
                  }}
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Upload Notes
                </Button>
                
                {isLoggedIn ? (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleDashboardClick();
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/authentication');
                    }}
                  >
                    <LogIn size={18} />
                    <span>Login / Sign Up</span>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <UploadModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </>
  );
};
