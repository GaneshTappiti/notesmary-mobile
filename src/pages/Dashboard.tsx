import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Search,
  BrainCircuit,
  Users,
  BookOpen,
} from 'lucide-react';
import { DashboardEmptyState } from '@/components/dashboard/DashboardEmptyState';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const quickAccessItems = [
    {
      title: "Upload Notes",
      description: "Share your study materials",
      icon: <Upload className="h-6 w-6" />,
      path: "/upload-notes",
      color: "bg-blue-500"
    },
    {
      title: "Find Notes", 
      description: "Discover study resources",
      icon: <Search className="h-6 w-6" />,
      path: "/find-notes",
      color: "bg-green-500"
    },
    {
      title: "AI Answers",
      description: "Get instant help",
      icon: <BrainCircuit className="h-6 w-6" />,
      path: "/ai-answers", 
      color: "bg-purple-500"
    },
    {
      title: "Study Rooms",
      description: "Join study sessions",
      icon: <Users className="h-6 w-6" />,
      path: "/study-rooms",
      color: "bg-orange-500"
    },
    {
      title: "Saved Summaries",
      description: "View your saved summaries",
      icon: <BookOpen className="h-6 w-6" />,
      path: "/saved-summaries",
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickAccessItems.map((item) => (
            <div 
              key={item.title} 
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handleNavigation(item.path)}
            >
              <div className={`p-4 ${item.color} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <DashboardEmptyState 
          icon={<BookOpen className="h-6 w-6" />}
          title="No Recent Activity"
          description="Your recent activity will be displayed here."
          compact={true}
        />
      </section>
    </div>
  );
};

export default Dashboard;
