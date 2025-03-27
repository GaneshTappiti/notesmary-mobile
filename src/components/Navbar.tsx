import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogIn, BrainCircuit, LogOut, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UploadModal } from './UploadModal';
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const checkAuthAndProceed = (action: 'upload' | 'dashboard' | 'find') => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: action === 'upload' 
          ? "Please login to upload notes" 
          : action === 'find'
          ? "Please login to search notes"
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
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/50 py-3' 
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
              className="hidden md:flex items-center space-x-8"
            >
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium">Pricing</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <Link to="/ai-answers" className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                <BrainCircuit size={18} className="mr-1" />
                AI Answers
              </Link>
              <div 
                onClick={handleFindNotesClick}
                className="text-gray-700 hover:text-blue-600 font-medium flex items-center cursor-pointer"
              >
                <Search size={18} className="mr-1" />
                Find Notes
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center space-x-4"
            >
              <Button 
                variant="outline" 
                onClick={handleUploadClick}
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Upload Notes
              </Button>
              
              {isLoggedIn ? (
                <div className="flex space-x-3">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg flex items-center gap-2"
                    onClick={handleDashboardClick}
                  >
                    Go to Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                </div>
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
            
            <div className="md:hidden">
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
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-5 space-y-4">
              <a 
                href="#features" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#about" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <Link
                to="/ai-answers"
                className="block text-gray-700 hover:text-blue-600 font-medium flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BrainCircuit size={18} className="mr-1" />
                AI Answers
              </Link>
              <div
                className="block text-gray-700 hover:text-blue-600 font-medium flex items-center"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleFindNotesClick();
                }}
              >
                <Search size={18} className="mr-1" />
                Find Notes
              </div>
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
                  <>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleDashboardClick();
                      }}
                    >
                      Go to Dashboard
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-gray-700 hover:text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </Button>
                  </>
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
