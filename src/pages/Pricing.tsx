
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Pricing as PricingComponent } from '@/components/Pricing';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

const Pricing = () => {
  useEffect(() => {
    document.title = "Pricing | Notex";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Pricing | Notex</title>
        <meta name="description" content="Affordable pricing plans for Notex - AI-powered learning platform" />
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
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the plan that's right for you and start enhancing your learning experience today.
              </p>
            </div>
            
            <PricingComponent />
          </div>
        </motion.div>
        
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
