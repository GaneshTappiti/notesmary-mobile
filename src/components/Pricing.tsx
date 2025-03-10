
import { motion } from 'framer-motion';
import { PriceCard } from './PriceCard';

export const Pricing = () => {
  const plans = [
    {
      title: "Basic",
      price: "₹0",
      description: "Perfect for trying out the platform",
      features: [
        "Upload up to 10 notes per month",
        "Basic AI summarization",
        "PDF exports",
        "Mobile access",
        "7-day history"
      ],
      popular: false
    },
    {
      title: "Student",
      price: "₹49",
      description: "Everything you need for personal study",
      features: [
        "Unlimited note uploads",
        "Advanced AI summarization",
        "All export formats (PDF, DOCX, Notion)",
        "Text-to-speech audio notes",
        "Basic flashcards & quizzes",
        "Unlimited history"
      ],
      popular: true
    },
    {
      title: "Premium",
      price: "₹99",
      description: "The ultimate package for serious students",
      features: [
        "All Student features",
        "Advanced flashcards & quizzes",
        "Smart study recommendations",
        "Collaboration tools",
        "Priority processing",
        "Personalized study plans",
        "Advanced analytics"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20">
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
              Pricing
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Choose the plan that works best for your study needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PriceCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              delay={0.1 * index}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gray-50 p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">For Schools & Universities</h3>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">Bulk Subscription Plan</h4>
              <p className="text-gray-600 mb-4">
                Special pricing for educational institutions. Get NOTES4U for your entire class, department, or school.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Volume discounts for 50+ students
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Administrative dashboard for faculty
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Integration with learning management systems
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Dedicated support for institutions
                </li>
              </ul>
              <div className="text-center">
                <button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
