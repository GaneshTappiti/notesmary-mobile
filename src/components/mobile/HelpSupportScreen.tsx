
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, Send, Mail, MessageSquare, HelpCircle } from 'lucide-react';
import MobileLayout from './MobileLayout';
import { useToast } from '@/hooks/use-toast';

export const HelpSupportScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim()) {
      toast({
        title: "Required field",
        description: "Please enter a subject for your message",
        variant: "destructive"
      });
      return;
    }
    
    if (!message.trim()) {
      toast({
        title: "Required field",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Here you would normally send the message to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible",
      });
      
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error sending support request:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <MobileLayout>
      <div className="space-y-4 pb-6">
        <div className="flex items-center py-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Help & Support</h1>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger>How do I create a study room?</AccordionTrigger>
            <AccordionContent>
              To create a study room, navigate to the Study Rooms section and tap the "Create Room" button. 
              Fill in the details like room name, subject, and privacy settings, then tap "Create".
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-2">
            <AccordionTrigger>Can I access my notes offline?</AccordionTrigger>
            <AccordionContent>
              Yes, any notes you've viewed will be cached for offline access. 
              To ensure specific notes are available offline, open them while connected to the internet.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-3">
            <AccordionTrigger>How do I share my notes with classmates?</AccordionTrigger>
            <AccordionContent>
              Open the note you want to share, tap the share icon in the top right corner, 
              and choose how you'd like to share it - via link, email, or directly through the app.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-4">
            <AccordionTrigger>How do AI answers work?</AccordionTrigger>
            <AccordionContent>
              Our AI system analyzes your questions and provides relevant answers based on academic sources. 
              To get the best results, be specific with your questions and provide context when necessary.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-5">
            <AccordionTrigger>How do I reset my password?</AccordionTrigger>
            <AccordionContent>
              Go to the login screen and tap "Forgot Password". Enter your email address, 
              and we'll send you instructions to reset your password.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Support
            </CardTitle>
            <CardDescription>
              Send us a message and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help you?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue in detail"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                disabled={submitting} 
                className="w-full"
              >
                {submitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-500">Need urgent help?</p>
          <Button variant="outline" className="w-full">
            <Mail className="w-4 h-4 mr-2" />
            Email Support Team
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
