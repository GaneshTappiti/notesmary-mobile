
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X } from "lucide-react";
import { PageContainer } from "@/components/PageContainer";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleAuthAction = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/authentication');
    }
  };
  
  const handleLoginClick = (e: React.MouseEvent) => {
    if (isAuthenticated) {
      e.preventDefault();
      toast({
        title: "Already logged in",
        description: "You are already logged in to your account",
      });
    } else {
      navigate('/authentication', { state: { activeTab: 'login' } });
    }
  };
  
  const handleSignupClick = (e: React.MouseEvent) => {
    if (isAuthenticated) {
      e.preventDefault();
      toast({
        title: "Already logged in",
        description: "You are already logged in to your account",
      });
    } else {
      navigate('/authentication', { state: { activeTab: 'signup' } });
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "There was an issue during logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md py-2 shadow-sm"
          : "bg-transparent py-3 md:py-5"
      }`}
    >
      <PageContainer fullWidth noPadding className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Notex
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="mr-2"
                >
                  Dashboard
                </Button>
                <Button onClick={handleLogout}>Log out</Button>
              </>
            ) : (
              <>
                <Link 
                  to="/authentication" 
                  onClick={handleLoginClick}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/authentication"
                  onClick={handleSignupClick}
                >
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-gray-100">
            <div className="space-y-1 px-2">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              
              <div className="pt-4 pb-2">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      onClick={() => {
                        navigate('/dashboard');
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Dashboard
                    </Button>
                    <Button 
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link 
                      to="/authentication" 
                      className="block w-full" 
                      onClick={(e) => {
                        handleLoginClick(e);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Button variant="outline" className="w-full">Log in</Button>
                    </Link>
                    <Link 
                      to="/authentication" 
                      className="block w-full"
                      onClick={(e) => {
                        handleSignupClick(e);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Button className="w-full">Sign up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </header>
  );
};
