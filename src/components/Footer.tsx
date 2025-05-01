
import { motion } from 'framer-motion';
import { BookOpen, Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const Footer = () => {
  const { toast } = useToast();
  
  const handleComingSoonLink = (e: React.MouseEvent<HTMLAnchorElement>, pageName: string) => {
    e.preventDefault();
    toast({
      title: "Coming Soon",
      description: `The ${pageName} page will be available soon.`,
    });
  };

  return (
    <footer id="contact" className="bg-gray-50 dark:bg-gray-900/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-200 dark:border-gray-800"
        >
          {/* Logo and tagline */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Notex
              </span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Smarter learning starts here. AI-powered tools for academic excellence.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="#" 
                onClick={(e) => handleComingSoonLink(e, 'Twitter')}
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="#" 
                onClick={(e) => handleComingSoonLink(e, 'Instagram')}
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#features" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Features</a></li>
              <li><a href="#pricing" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Pricing</a></li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoonLink(e, 'About Us')}
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoonLink(e, 'Testimonials')}
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoonLink(e, 'Contact Support')}
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row justify-between text-sm text-gray-500 dark:text-gray-500"
        >
          <p>&copy; {new Date().getFullYear()} Notex. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex flex-wrap space-x-4">
            <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy</Link>
            <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms</Link>
            <Link to="/cookies" className="hover:text-blue-600 dark:hover:text-blue-400">Cookies</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
