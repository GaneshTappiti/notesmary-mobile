
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Youtube, Users, User, ArrowRight, BookOpen, Upload, Book, BookOpenCheck, BrainCircuit, MessageSquare, BookmarkPlus, History } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
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
      description: "Share your study materials with others",
      icon: Upload,
      color: "bg-purple-500",
      link: "/upload",
      category: "notes"
    },
    {
      title: "Search Notes",
      description: "Find study materials by topic or subject",
      icon: Search,
      color: "bg-blue-500",
      link: "/search",
      category: "notes"
    },
    {
      title: "Answer Retrieval",
      description: "Get answers from your uploaded notes",
      icon: FileText,
      color: "bg-green-500",
      link: "/ai-answers",
      category: "ai"
    },
    {
      title: "2/5/10 Mark Answers",
      description: "AI generates structured exam answers",
      icon: BookOpenCheck,
      color: "bg-emerald-500",
      link: "/structured-answers",
      category: "ai"
    },
    {
      title: "YouTube Summaries",
      description: "AI summaries of educational videos",
      icon: Youtube,
      color: "bg-red-500",
      link: "/youtube-summary",
      category: "ai"
    },
    {
      title: "Study Rooms",
      description: "Join or create collaborative study sessions",
      icon: Users,
      color: "bg-amber-500",
      link: "/study-rooms",
      category: "study"
    },
    {
      title: "Create Study Room",
      description: "Start a new study group with friends",
      icon: MessageSquare,
      color: "bg-pink-500",
      link: "/create-room",
      category: "study"
    },
    {
      title: "Saved Resources",
      description: "Access your bookmarked study materials",
      icon: BookmarkPlus,
      color: "bg-indigo-500",
      link: "/saved",
      category: "other"
    },
    {
      title: "Study History",
      description: "View your learning progress and history",
      icon: History,
      color: "bg-gray-500",
      link: "/history",
      category: "other"
    }
  ];

  // Filter features based on active tab
  const filteredFeatures = activeTab === "all" 
    ? features 
    : features.filter(feature => feature.category === activeTab);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-10`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              NOTES4U
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hidden sm:flex">
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </Button>
            <Avatar className="cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-500 text-white">ST</AvatarFallback>
            </Avatar>
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
          className="mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input 
              className="pl-10 py-6 pr-32 shadow-md rounded-full" 
              placeholder="Search notes, questions, or study materials..." 
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Button className="rounded-full">
                Search
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Category tabs */}
        <div className="mb-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start mb-2 overflow-x-auto flex-nowrap md:justify-center">
              <TabsTrigger value="all" className="px-4">All</TabsTrigger>
              <TabsTrigger value="notes" className="px-4">Notes</TabsTrigger>
              <TabsTrigger value="ai" className="px-4">AI Tools</TabsTrigger>
              <TabsTrigger value="study" className="px-4">Study Rooms</TabsTrigger>
              <TabsTrigger value="other" className="px-4">Other</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFeatures.map((feature, index) => (
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
                  <Button asChild variant="ghost" className="w-full justify-between">
                    <Link to={feature.link}>
                      <span>Access</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
      
      {/* Mobile navigation bar */}
      <div className={`sm:hidden fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} py-2 px-4 z-10`}>
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="flex flex-col items-center">
            <Book className="h-5 w-5 text-blue-500" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/search" className="flex flex-col items-center">
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link to="/ai-answers" className="flex flex-col items-center">
            <BrainCircuit className="h-5 w-5" />
            <span className="text-xs mt-1">AI Tools</span>
          </Link>
          <Link to="/study-rooms" className="flex flex-col items-center">
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Rooms</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
