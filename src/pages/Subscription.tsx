
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Download, FileText, BrainCircuit, Users, Star, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PlanFeature {
  text: string;
  available: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
}

const Subscription = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [currentPlan, setCurrentPlan] = useState<string>("free");
  
  const plans: Plan[] = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      description: "Basic access to note-sharing features",
      features: [
        { text: "Upload up to 5 notes per month", available: true },
        { text: "Basic AI assistance", available: true },
        { text: "Join public study rooms", available: true },
        { text: "Standard search features", available: true },
        { text: "Ad-supported experience", available: true },
        { text: "Premium note formats", available: false },
        { text: "Create private study rooms", available: false },
        { text: "Unlimited note uploads", available: false },
      ],
      buttonText: "Current Plan"
    },
    {
      id: "pro",
      name: "Pro",
      price: "$5.99",
      description: "Enhanced features for serious students",
      features: [
        { text: "Upload up to 30 notes per month", available: true },
        { text: "Advanced AI assistance", available: true },
        { text: "Create up to 3 private study rooms", available: true },
        { text: "Enhanced search with filters", available: true },
        { text: "Ad-free experience", available: true },
        { text: "Premium note formats and templates", available: true },
        { text: "Priority customer support", available: true },
        { text: "Unlimited note downloads", available: false },
      ],
      buttonText: "Upgrade to Pro",
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      price: "$9.99",
      description: "Complete access to all features",
      features: [
        { text: "Unlimited note uploads", available: true },
        { text: "Premium AI assistance with GPT-4", available: true },
        { text: "Unlimited private study rooms", available: true },
        { text: "Advanced analytics and insights", available: true },
        { text: "Ad-free experience", available: true },
        { text: "All note formats and templates", available: true },
        { text: "Priority customer support", available: true },
        { text: "Unlimited note downloads", available: true },
      ],
      buttonText: "Upgrade to Premium"
    }
  ];
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handleUpgrade = () => {
    if (selectedPlan === currentPlan) {
      toast({
        title: "Already subscribed",
        description: `You are already on the ${plans.find(p => p.id === currentPlan)?.name} plan.`,
        variant: "default"
      });
      return;
    }
    
    toast({
      title: "Subscription updated",
      description: `You have successfully upgraded to the ${plans.find(p => p.id === selectedPlan)?.name} plan.`,
      variant: "default"
    });
    
    setCurrentPlan(selectedPlan);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="pb-12 px-4 w-full max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Subscription</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your subscription plan</p>
        </div>
        
        <div className="mb-10">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Current Plan: {plans.find(p => p.id === currentPlan)?.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your subscription renews on November 15, 2025</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                {currentPlan === "premium" ? (
                  <Badge className="bg-blue-600 dark:bg-blue-700">Premium Member</Badge>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => handleSelectPlan("premium")}>
                    Upgrade Plan
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative border-none shadow-md hover:shadow-lg transition-all duration-300 ${
                selectedPlan === plan.id ? 'ring-2 ring-blue-600 dark:ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-blue-600 font-medium">Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{plan.name}</span>
                  <span className="text-2xl font-bold">{plan.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span></span>
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle 
                      className={`h-5 w-5 mt-0.5 ${
                        feature.available 
                          ? 'text-green-500 dark:text-green-400' 
                          : 'text-gray-300 dark:text-gray-600'
                      }`} 
                    />
                    <span className={feature.available ? '' : 'text-gray-400 dark:text-gray-600'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${
                    currentPlan === plan.id 
                      ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
                      : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {currentPlan === plan.id ? 'Current Plan' : plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Card className="border-none shadow-md mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Plan Comparison</CardTitle>
            <CardDescription>Compare features across different plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Free</th>
                    <th className="text-center py-3 px-4">Pro</th>
                    <th className="text-center py-3 px-4">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Upload className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>Note Uploads</span>
                    </td>
                    <td className="text-center py-3 px-4">5/month</td>
                    <td className="text-center py-3 px-4">30/month</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <BrainCircuit className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>AI Assistance</span>
                    </td>
                    <td className="text-center py-3 px-4">Basic</td>
                    <td className="text-center py-3 px-4">Advanced</td>
                    <td className="text-center py-3 px-4">Premium</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span>Study Rooms</span>
                    </td>
                    <td className="text-center py-3 px-4">Public Only</td>
                    <td className="text-center py-3 px-4">3 Private</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      <span>Note Formats</span>
                    </td>
                    <td className="text-center py-3 px-4">Standard</td>
                    <td className="text-center py-3 px-4">Premium</td>
                    <td className="text-center py-3 px-4">All</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Download className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <span>Downloads</span>
                    </td>
                    <td className="text-center py-3 px-4">10/month</td>
                    <td className="text-center py-3 px-4">100/month</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleUpgrade} 
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            size="lg"
          >
            {selectedPlan === currentPlan ? 'Already on this plan' : `Upgrade to ${plans.find(p => p.id === selectedPlan)?.name}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
