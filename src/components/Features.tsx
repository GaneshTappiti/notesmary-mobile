
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  MessageSquare,
  Youtube,
  Users,
  Video,
  ScreenShare,
  Mic
} from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "AI-Powered Notes Processing",
      description: "Upload PDFs of notes and question banks for instant AI processing and smart organization.",
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50",
      steps: [
        "Upload your PDF notes and question banks",
        "AI processes and indexes all content",
        "Access your enhanced notes from any device"
      ],
      subFeatures: [
        {
          icon: FileText,
          title: "AI-Powered Answer Retrieval",
          description: "Upload a question bank → AI matches answers from your study materials"
        },
        {
          icon: Search,
          title: "Instant Access",
          description: "No need to manually search—just get the exact answer instantly"
        }
      ]
    },
    {
      icon: Search,
      title: "Syllabus-Based Q&A",
      description: "Get 2, 5, & 10-mark answers generated directly from your uploaded class materials.",
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50",
      steps: [
        "Upload class notes & question banks",
        "Ask any question related to your syllabus",
        "Receive precisely formatted 2, 5, or 10-mark answers from your materials"
      ],
      subFeatures: [
        {
          icon: FileText,
          title: "Syllabus-Aligned Responses",
          description: "No more random internet answers—only content from your approved materials"
        },
        {
          icon: Search,
          title: "Exam-Ready Formatting",
          description: "Get answers formatted specifically for different mark weightages"
        }
      ]
    },
    {
      icon: Users,
      title: "Real-time Study Rooms",
      description: "Join interactive study sessions with video calls, screen sharing, and collaborative discussions.",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
      steps: [
        "Create or join virtual study rooms",
        "Participate in group video calls and screen sharing",
        "Review notes together in real-time with AI summaries"
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
          icon: MessageSquare,
          title: "Collaborative Chat",
          description: "Text-based discussions alongside video for sharing links and quick notes"
        },
        {
          icon: Mic,
          title: "Clear Audio",
          description: "High-quality audio ensures everyone can hear explanations clearly"
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
        "Get structured notes with key points and formulas"
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
