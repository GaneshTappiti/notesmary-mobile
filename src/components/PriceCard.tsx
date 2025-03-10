
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PriceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  delay?: number;
}

export const PriceCard = ({
  title,
  price,
  description,
  features,
  popular = false,
  delay = 0
}: PriceCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "h-full flex flex-col p-8 rounded-2xl border transition-all duration-300",
        popular 
          ? "bg-blue-600 text-white border-blue-500 shadow-xl" 
          : "bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
      )}
    >
      {popular && (
        <div className="px-4 py-1 rounded-full bg-blue-500 self-start mb-6">
          <span className="text-xs font-bold tracking-wide uppercase text-white">
            Most Popular
          </span>
        </div>
      )}
      
      <h3 className={cn("text-xl font-bold", popular ? "text-white" : "text-gray-900")}>
        {title}
      </h3>
      
      <div className="mt-4 flex items-baseline">
        <span className={cn("text-4xl font-extrabold", popular ? "text-white" : "text-gray-900")}>
          {price}
        </span>
        <span className={cn("ml-1 text-xl", popular ? "text-blue-100" : "text-gray-500")}>
          /month
        </span>
      </div>
      
      <p className={cn("mt-3", popular ? "text-blue-100" : "text-gray-600")}>
        {description}
      </p>
      
      <div className="mt-6 flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={cn(
                "flex-shrink-0 mt-1",
                popular ? "text-blue-200" : "text-green-500"
              )}>
                <Check className="h-5 w-5" />
              </div>
              <span className={cn(
                "ml-2 text-sm",
                popular ? "text-blue-100" : "text-gray-600"
              )}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        className={cn(
          "mt-8",
          popular 
            ? "bg-white text-blue-600 hover:bg-blue-50" 
            : "bg-blue-600 text-white hover:bg-blue-700"
        )}
      >
        Get Started
      </Button>
    </motion.div>
  );
};
