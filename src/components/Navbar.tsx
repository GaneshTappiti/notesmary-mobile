
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                Notex
              </span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-6"
          >
            <a 
              href="#features" 
              className="text-foreground hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="text-foreground hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Pricing
            </a>
            <a 
              href="#contact" 
              className="text-foreground hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </a>
          </motion.div>
          
          {/* Right side actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <ThemeToggle variant="ghost" className="rounded-full" />
            
            <div className="hidden md:flex items-center space-x-3">
              {isLoggedIn ? (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-foreground hover:text-blue-600"
                    onClick={() => navigate('/authentication')}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5"
                    onClick={() => navigate('/authentication')}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
            
            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80vw] sm:w-[350px] bg-white">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">Notex</span>
                      </div>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                    </div>
                    
                    <div className="flex flex-col space-y-4 py-6">
                      <a 
                        href="#features" 
                        className="text-foreground hover:text-blue-600 py-2"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Features
                      </a>
                      <a 
                        href="#pricing" 
                        className="text-foreground hover:text-blue-600 py-2"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Pricing
                      </a>
                      <a 
                        href="#contact" 
                        className="text-foreground hover:text-blue-600 py-2"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Contact
                      </a>
                      <div className="border-t my-2"></div>
                      {isLoggedIn ? (
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                          onClick={() => navigate('/dashboard')}
                        >
                          Dashboard
                        </Button>
                      ) : (
                        <>
                          <Button 
                            variant="outline"
                            className="w-full"
                            onClick={() => navigate('/authentication')}
                          >
                            <LogIn className="w-4 h-4 mr-2" />
                            Login
                          </Button>
                          
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                            onClick={() => navigate('/authentication')}
                          >
                            Get Started
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>
        </nav>
      </div>
    </header>
  );
};
