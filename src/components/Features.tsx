
import { motion } from 'framer-motion';
import { 
  FileText, 
  BrainCircuit, 
  Search, 
  MessageSquare,
  Youtube,
  Users
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
      ]
    },
    {
      icon: Search,
      title: "Syllabus-Based Q&A",
      description: "Ask questions and get precise, syllabus-aligned answers directly from your uploaded materials.",
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50",
      steps: [
        "Ask any question related to your course",
        "AI fetches accurate answers from your materials",
        "Get contextual information with source references"
      ]
    },
    {
      icon: Users,
      title: "Real-time Study Rooms",
      description: "Create or join virtual study rooms for group discussions with AI-generated summaries.",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
      steps: [
        "Create a study room or join existing ones",
        "Collaborate with peers in real-time",
        "Get AI-generated summaries of discussions"
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};
