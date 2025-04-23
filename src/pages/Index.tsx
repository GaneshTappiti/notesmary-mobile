
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { Upload, Search, Users, Brain, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mapping of icon names to Lucide React icons
const iconMap = {
  'Upload': Upload,
  'Search': Search,
  'Users': Users,
  'Brain': Brain,
  'CheckSquare': CheckSquare
};

const Index: React.FC = () => {
  const navigate = useNavigate();

  // Fetch quick access links from Supabase
  const { data: quickLinks, isLoading } = useQuery({
    queryKey: ['quickLinks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quick_links')
        .select('*')
        .order('created_at');
      
      if (error) {
        console.error('Error fetching quick links:', error);
        return [];
      }
      
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to Study Companion
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Your all-in-one study management platform
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {isLoading ? (
              // Skeleton loading state
              Array.from({ length: 5 }).map((_, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              quickLinks?.map((link) => {
                const IconComponent = iconMap[link.icon_name as keyof typeof iconMap] || Upload;
                
                return (
                  <div 
                    key={link.id} 
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg ${link.is_primary ? 'border-2 border-blue-500' : ''}`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`${link.bg_color} p-3 rounded-full mr-4`}>
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {link.title}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {link.description}
                    </p>
                    <Button 
                      variant={link.is_primary ? 'default' : 'outline'} 
                      className="w-full"
                      onClick={() => navigate(link.page_link)}
                    >
                      Get Started
                    </Button>
                  </div>
                );
              })
            )}
          </div>
          <div className="mt-12">
            {/* Add a button to navigate to My Notes */}
            <Button onClick={() => navigate("/my-notes")} className="mx-auto">
              Go to My Notes
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
