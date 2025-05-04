
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Subscription = () => {
  const { toast } = useToast();
  
  const handleUpgrade = (plan: string) => {
    toast({
      title: "Subscription update",
      description: `You selected the ${plan} plan. This feature will be available soon.`,
    });
  };
  
  return (
    <>
      <Helmet>
        <title>Subscription | Notex</title>
      </Helmet>
      
      <div className="container max-w-5xl mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription plan and billing information.</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-blue-800">Current Plan: Free</h3>
              <p className="text-sm text-blue-700">You are currently on the free plan with limited features.</p>
            </div>
            <Button variant="outline" className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50">
              Manage Billing
            </Button>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>For individual students</CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>5 AI Questions per day</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Basic note uploads</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Access to study rooms</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" disabled className="w-full">Current Plan</Button>
            </CardFooter>
          </Card>
          
          {/* Pro Plan */}
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full w-fit mb-2">Popular</div>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For serious students</CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Unlimited AI Questions</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Advanced note processing</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Create private study rooms</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Detailed analytics</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleUpgrade("Pro")}>Upgrade to Pro</Button>
            </CardFooter>
          </Card>
          
          {/* Team Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>For study groups</CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold">$24.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Up to 5 team members</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Collaborative note editing</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Team analytics dashboard</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => handleUpgrade("Team")}>Upgrade to Team</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Subscription;
