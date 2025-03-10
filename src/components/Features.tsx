
import { motion } from 'framer-motion';
import { 
  FileText, 
  BrainCircuit, 
  Search, 
  Download, 
  FlaskConical, 
  Users 
} from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Toppers' Notes Collection",
      description: "Upload handwritten notes or input them directly. Our platform preserves the quality while making them digital.",
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50"
    },
    {
      icon: BrainCircuit,
      title: "AI-Powered Summarization",
      description: "Our AI extracts key points and generates structured, easy-to-read notes with bullet points and mind maps.",
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50"
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description: "AI categorizes notes by subject, topic, and exam type with smart search and keyword recommendations.",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50"
    },
    {
      icon: Download,
      title: "Multiformat Exports",
      description: "Download your notes in PDF, DOCX, and Notion-compatible formats or listen with text-to-speech.",
      iconColor: "text-amber-600",
      iconBgColor: "bg-amber-50"
    },
    {
      icon: FlaskConical,
      title: "Interactive Learning",
      description: "Study with AI-powered flashcards and auto-generated quizzes created from your notes.",
      iconColor: "text-rose-600",
      iconBgColor: "bg-rose-50"
    },
    {
      icon: Users,
      title: "Collaboration & Community",
      description: "Share notes, discuss topics, and benefit from AI that refines and combines the best content.",
      iconColor: "text-indigo-600",
      iconBgColor: "bg-indigo-50"
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
              Smart Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            AI-Powered Tools for Students
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Transform how you study with powerful features designed to save time and improve learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * index}
              iconColor={feature.iconColor}
              iconBgColor={feature.iconBgColor}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">How NOTES4U Works</h3>
            <div className="relative">
              <div className="hidden sm:block absolute top-0 left-[15%] h-full w-0.5 bg-blue-100"></div>
              <div className="space-y-8">
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white shadow-md z-10">1</div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium text-gray-900">Upload Your Notes</h4>
                    <p className="mt-1 text-gray-600">Take a photo of your handwritten notes or upload digital files. Our system supports various formats.</p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white shadow-md z-10">2</div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium text-gray-900">AI Processing</h4>
                    <p className="mt-1 text-gray-600">Our advanced AI analyzes your notes, identifies key concepts, and organizes them into a structured format.</p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white shadow-md z-10">3</div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium text-gray-900">Access Anywhere</h4>
                    <p className="mt-1 text-gray-600">Your enhanced notes are available on all your devices. Study on the go with our mobile-friendly interface.</p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white shadow-md z-10">4</div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium text-gray-900">Study Smart</h4>
                    <p className="mt-1 text-gray-600">Use AI-generated flashcards, quizzes, and summaries to reinforce your learning and prepare for exams.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
