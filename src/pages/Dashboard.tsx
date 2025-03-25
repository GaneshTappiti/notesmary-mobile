
import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Search, FileText, Youtube, Users, User, ArrowRight, BookOpen, Upload } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Dashboard features
  const features = [
    {
      title: "Upload Notes",
      description: "Upload and share your study materials",
      icon: Upload,
      color: "bg-purple-500",
      link: "/upload"
    },
    {
      title: "Search Notes",
      description: "Find study materials by topic or subject",
      icon: Search,
      color: "bg-blue-500",
      link: "/search"
    },
    {
      title: "AI Answer Retrieval",
      description: "Get precise answers from your notes",
      icon: FileText,
      color: "bg-green-500",
      link: "/ai-answers"
    },
    {
      title: "YouTube Summaries",
      description: "AI summaries of educational videos",
      icon: Youtube,
      color: "bg-red-500",
      link: "/youtube-summary"
    },
    {
      title: "Study Rooms",
      description: "Join or create collaborative study sessions",
      icon: Users,
      color: "bg-amber-500",
      link: "/study-rooms"
    },
    {
      title: "Profile & Settings",
      description: "Manage your account and preferences",
      icon: User,
      color: "bg-sky-500",
      link: "/profile"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              NOTES4U
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, Student</h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Access all your study tools and resources from one place
          </p>
        </motion.div>
        
        {/* Search bar */}
        <motion.div 
          className="mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <Input 
              className="pl-10 py-6 pr-4 shadow-md" 
              placeholder="Search for notes, questions, or study materials..." 
            />
            <Button className="absolute right-1 top-1">
              Search
            </Button>
          </div>
        </motion.div>
        
        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`hover:shadow-lg transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader className="pb-2">
                  <div className={`p-3 ${feature.color} w-fit rounded-lg mb-2`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className={isDarkMode ? 'text-gray-400' : ''}>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  {/* Content specific to the feature could go here */}
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to={feature.link}>
                      Access <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
