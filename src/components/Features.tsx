
import React from 'react';
import { FeatureCard } from '@/components/FeatureCard';
import { 
  BrainCircuit, 
  FolderKanban, 
  Smartphone, 
  Users,
  Youtube,
  Search,
  FileQuestion,
  BarChart3,
  MessageSquare,
  FileText,
  Lock
} from 'lucide-react';

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Notex?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Unlock the full potential of your study notes with our AI-powered platform.
          </p>
        </div>
        
        {/* AI-Powered Smart Notes Management */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-1 w-16 bg-blue-500"></div>
            <h3 className="text-xl font-bold text-gray-800">AI-Powered Smart Notes Management</h3>
            <div className="h-1 w-16 bg-blue-500"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="AI-Powered Summaries"
              description="Get instant summaries of your notes, highlighting key concepts and ideas."
              icon={BrainCircuit}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-50"
            />
            <FeatureCard
              title="AI-Based Answer Retrieval"
              description="Upload notes, ask a question, and get precise answers from your materials."
              icon={FileText}
              iconColor="text-purple-600"
              iconBgColor="bg-purple-50"
              steps={[
                "Upload your study materials",
                "Ask any question about your content",
                "Get accurate answers extracted from your notes"
              ]}
            />
            <FeatureCard
              title="AI-Created Exam Question Bank"
              description="Predicts important exam questions from your uploaded study materials."
              icon={FileQuestion}
              iconColor="text-green-600"
              iconBgColor="bg-green-50"
              steps={[
                "Upload your course materials",
                "AI analyzes content for exam-relevant topics",
                "Review AI-generated potential exam questions"
              ]}
            />
          </div>
        </div>
        
        {/* Smarter, Faster Learning with Study Rooms & AI */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-1 w-16 bg-purple-500"></div>
            <h3 className="text-xl font-bold text-gray-800">Smarter, Faster Learning with Study Rooms & AI</h3>
            <div className="h-1 w-16 bg-purple-500"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Collaborative Study Rooms"
              description="Join study groups and share notes in real-time with your peers."
              icon={Users}
              iconColor="text-indigo-600"
              iconBgColor="bg-indigo-50"
              steps={[
                "Create or join a study room",
                "Invite classmates to collaborate",
                "Share notes and discuss in real-time"
              ]}
            />
            <FeatureCard
              title="Live Chat with AI Summaries"
              description="AI captures key takeaways from your group discussions automatically."
              icon={MessageSquare}
              iconColor="text-pink-600"
              iconBgColor="bg-pink-50"
              steps={[
                "Chat with your study group",
                "AI monitors the conversation",
                "Get smart summaries of discussion points"
              ]}
            />
            <FeatureCard
              title="AI-Powered Study Analytics"
              description="Get insights on what to focus on for better performance in exams."
              icon={BarChart3}
              iconColor="text-amber-600"
              iconBgColor="bg-amber-50"
              steps={[
                "Study using our platform",
                "AI analyzes your learning patterns",
                "Receive personalized study recommendations"
              ]}
            />
          </div>
        </div>
        
        {/* Seamless User Experience & Secure Login */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-1 w-16 bg-green-500"></div>
            <h3 className="text-xl font-bold text-gray-800">Seamless User Experience & Secure Login</h3>
            <div className="h-1 w-16 bg-green-500"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="Google Sign-In"
              description="One-click login/signup with Google for a seamless experience."
              icon={FolderKanban}
              iconColor="text-red-600"
              iconBgColor="bg-red-50"
            />
            <FeatureCard
              title="Smart Auto-Redirect"
              description="Logged-in users go directly to their personalized dashboard."
              icon={Smartphone}
              iconColor="text-teal-600"
              iconBgColor="bg-teal-50"
            />
            <FeatureCard
              title="Secure Session Handling"
              description="Automatic session management for enhanced security."
              icon={Lock}
              iconColor="text-gray-600"
              iconBgColor="bg-gray-50"
            />
          </div>
        </div>
        
        {/* AI-Enhanced YouTube Learning */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-1 w-16 bg-red-500"></div>
            <h3 className="text-xl font-bold text-gray-800">AI-Enhanced YouTube Learning</h3>
            <div className="h-1 w-16 bg-red-500"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <FeatureCard
              title="YouTube Video Summarization"
              description="AI extracts key points from video lectures, saving you time."
              icon={Youtube}
              iconColor="text-red-600"
              iconBgColor="bg-red-50"
              steps={[
                "Paste any YouTube lecture URL",
                "AI processes the video content",
                "Get comprehensive summary and key points"
              ]}
            />
            <FeatureCard
              title="Smart Search in Notes"
              description="Find specific topics instantly in your study materials."
              icon={Search}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-50"
              steps={[
                "Upload your study materials",
                "Use the intelligent search function",
                "Find relevant content across all your notes instantly"
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
