
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Features as FeaturesComponent } from '@/components/Features';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

const Features = () => {
  useEffect(() => {
    document.title = "Features | Notex";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Features | Notex</title>
        <meta name="description" content="Explore the powerful features of Notex - AI-powered learning platform" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
        <Navbar />
        
        <motion.div 
          className="flex-1 pt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Advanced Learning Features
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how Notex leverages AI to transform your learning experience with our comprehensive suite of tools.
              </p>
            </div>
            
            <FeaturesComponent />
          </div>
        </motion.div>
        
        <Footer />
      </div>
    </>
  );
};

export default Features;
