
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  MessageSquare, 
  Users, 
  FileText, 
  TrendingUp, 
  Search, 
  ChevronRight 
} from 'lucide-react';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  title: string, 
  description: string 
}) => (
  <motion.div 
    className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group h-full"
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex flex-col sm:flex-row sm:items-center mb-4">
      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 sm:p-3 rounded-xl mb-3 sm:mb-0 sm:mr-4 w-12 h-12 flex items-center justify-center">
        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
    </div>
    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "NOTES4U - AI-Powered Learning Platform";
    
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 opacity-50 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      />

      <Navbar />

      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AI-Powered <br className="hidden sm:block" />
              <span className="text-blue-600">Learning Revolution</span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transform your study experience with advanced AI technologies. Generate answers, collaborate in real-time, and unlock your academic potential.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                onClick={() => navigate('/authentication')}
              >
                Get Started
                <ChevronRight className="ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Feature Illustration */}
          <motion.div 
            className="hidden lg:block relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 lg:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
                <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-3 sm:mb-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">AI-Powered Learning</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Intelligent study assistance</p>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2" />
                  <p className="font-medium text-sm sm:text-base">Smart Notes</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                  <p className="font-medium text-sm sm:text-base">Collaborative Study</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-10 sm:py-12 md:py-16 lg:py-24">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Revolutionize Your Study Experience
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Discover the power of AI-driven learning with NOTES4U's cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
            <FeatureCard 
              icon={Brain}
              title="AI Answers"
              description="Generate precise answers for 2, 5, and 10-mark questions using advanced AI technology."
            />
            <FeatureCard 
              icon={Search}
              title="Smart Search"
              description="Instantly find relevant notes and study materials with our intelligent search engine."
            />
            <FeatureCard 
              icon={Users}
              title="Collaborative Learning"
              description="Join real-time study rooms, collaborate with peers, and boost your academic performance."
            />
            <FeatureCard 
              icon={MessageSquare}
              title="Live AI Chat"
              description="Get instant summaries, explanations, and study guidance through our AI chat interface."
            />
            <FeatureCard 
              icon={BookOpen}
              title="PDF Answer Retrieval"
              description="Upload PDFs and extract precise answers directly from your study materials."
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Study Analytics"
              description="Track your progress, identify strengths, and personalize your learning journey."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
