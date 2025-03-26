
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  MessageSquare,
  Youtube,
  Users,
  Video,
  ScreenShare,
  Mic,
  User,
  Book,
  Upload,
  Settings,
  Home,
  CreditCard,
  Bookmark,
  Filter,
  CheckCircle,
  FileQuestion,
  ListTodo,
  Edit,
  Lock,
  Share,
  MessageCircle
} from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const Features = () => {
  const features = [
    {
      icon: Home,
      title: "Smart Dashboard Access",
      description: "Centralized hub for accessing all your study materials and AI-powered features.",
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50",
      steps: [
        "View all your uploaded and saved notes",
        "Quick access to AI-powered study tools",
        "Join active study rooms and see recommended content"
      ],
      subFeatures: [
        {
          icon: Bookmark,
          title: "Personalized Content",
          description: "Dashboard customized to your course and study habits"
        },
        {
          icon: Search,
          title: "Quick Search",
          description: "Find any notes or materials instantly from your dashboard"
        }
      ]
    },
    {
      icon: Upload,
      title: "AI-Powered Notes Processing",
      description: "Upload PDFs of notes and question banks for instant AI processing and smart organization.",
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50",
      steps: [
        "Upload your handwritten or typed notes as PDFs or images",
        "Add metadata: branch, chapter, subject and regulations",
        "AI processes and indexes all content for smart searching"
      ],
      subFeatures: [
        {
          icon: FileText,
          title: "AI-Powered Answer Retrieval",
          description: "Upload a question bank → AI matches answers from your study materials"
        },
        {
          icon: CheckCircle,
          title: "Instant Access",
          description: "No need to manually search—just get the exact answer instantly"
        },
        {
          icon: Filter,
          title: "Smart Categorization",
          description: "AI automatically tags and organizes your uploaded materials"
        }
      ]
    },
    {
      icon: Search,
      title: "Intelligent Note Search",
      description: "Advanced search capabilities with filters and AI-powered recommendations.",
      iconColor: "text-amber-600",
      iconBgColor: "bg-amber-50",
      steps: [
        "Search by branch, chapter name, chapter number, or subject",
        "Get AI-suggested notes based on your syllabus",
        "Preview notes before downloading or using them"
      ],
      subFeatures: [
        {
          icon: FileText,
          title: "Syllabus-Aligned Results",
          description: "AI suggests the most relevant content based on your course"
        },
        {
          icon: Edit,
          title: "Preview Functionality",
          description: "See note content before downloading or using it"
        }
      ]
    },
    {
      icon: FileQuestion,
      title: "Syllabus-Based Q&A",
      description: "Get 2, 5, & 10-mark answers generated directly from your uploaded class materials.",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
      steps: [
        "Upload class notes & question banks",
        "Select question type (2, 5, or 10 marks)",
        "Receive precisely formatted answers from your materials with diagrams"
      ],
      subFeatures: [
        {
          icon: FileText,
          title: "Syllabus-Aligned Responses",
          description: "No more random internet answers—only content from your approved materials"
        },
        {
          icon: ListTodo,
          title: "Exam-Ready Formatting",
          description: "Get answers formatted specifically for different mark weightages"
        }
      ]
    },
    {
      icon: Youtube,
      title: "YouTube Video Summarization",
      description: "Input YouTube educational videos and get AI-extracted key topics, concepts, and formulas.",
      iconColor: "text-red-600",
      iconBgColor: "bg-red-50",
      steps: [
        "Paste any educational YouTube video link",
        "AI watches and processes the content",
        "Get structured notes with key points, concepts, and formulas"
      ],
      subFeatures: [
        {
          icon: Video,
          title: "Embedded Player",
          description: "Watch the video alongside the AI-generated summary"
        },
        {
          icon: FileText,
          title: "Bullet-Point Format",
          description: "Concise, easy-to-review summaries of complex content"
        }
      ]
    },
    {
      icon: Users,
      title: "Collaborative Study Rooms",
      description: "Join interactive study sessions with video calls, screen sharing, and collaborative discussions.",
      iconColor: "text-emerald-600",
      iconBgColor: "bg-emerald-50",
      steps: [
        "Create or join private/public study rooms",
        "Participate in group video calls and screen sharing",
        "Review notes together with AI-summarized discussions"
      ],
      subFeatures: [
        {
          icon: Video,
          title: "Group Video Calls",
          description: "Connect face-to-face with classmates for better collaboration"
        },
        {
          icon: ScreenShare,
          title: "Live Screen Sharing",
          description: "Host can share notes for everyone to view and discuss in real-time"
        },
        {
          icon: MessageCircle,
          title: "Collaborative Chat",
          description: "Text-based discussions alongside video for sharing links and notes"
        },
        {
          icon: MessageSquare,
          title: "AI Discussion Summary",
          description: "Get AI-generated summaries of key points discussed in your study session"
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Subscription & Premium Features",
      description: "Unlock advanced AI features and tools with affordable subscription plans.",
      iconColor: "text-violet-600",
      iconBgColor: "bg-violet-50",
      steps: [
        "Choose between Free, Basic, and Premium plans",
        "Unlock enhanced AI capabilities and advanced study tools",
        "Enjoy priority access to new features as they're released"
      ],
      subFeatures: [
        {
          icon: FileText,
          title: "Enhanced AI Analysis",
          description: "More detailed AI processing of your study materials"
        },
        {
          icon: Share,
          title: "Advanced Collaboration",
          description: "Host larger study rooms with additional features"
        }
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
              Core Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            AI-Powered Learning Platform
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Transform how you study with our comprehensive AI-driven tools designed for modern students
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              steps={feature.steps}
              delay={0.1 * index}
              iconColor={feature.iconColor}
              iconBgColor={feature.iconBgColor}
              subFeatures={feature.subFeatures}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
