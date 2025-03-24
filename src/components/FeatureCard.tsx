
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  iconColor?: string;
  iconBgColor?: string;
  steps?: string[];
  subFeatures?: SubFeature[];
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-50",
  steps,
  subFeatures,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="h-full flex flex-col p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-gray-200"
    >
      <div className={cn("p-3 rounded-xl mb-5 self-start", iconBgColor)}>
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {subFeatures && subFeatures.length > 0 && (
        <div className="mt-4 mb-6">
          <div className="h-px w-full bg-gray-100 mb-4"></div>
          <h4 className="font-medium text-gray-900 mb-3">Key Capabilities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subFeatures.map((subFeature, index) => {
              const SubIcon = subFeature.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <SubIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">{subFeature.title}</h5>
                    <p className="text-xs text-gray-600">{subFeature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {steps && steps.length > 0 && (
        <div className="mt-auto">
          <div className="h-px w-full bg-gray-100 mb-4"></div>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                </div>
                <p className="text-sm text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
