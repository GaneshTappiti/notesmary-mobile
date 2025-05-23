
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, MessageSquare, Mail, Phone, 
  BookOpen, ChevronRight, Send, ArrowRight 
} from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { MobileLayout } from './MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

export const HelpSupportScreen = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [message, setMessage] = useState('');
  
  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible"
    });
    setMessage('');
  };
  
  const faqs = [
    {
      question: "How do I upload my notes?",
      answer: "To upload notes, go to the Notes tab and tap on the + button. You can upload images of your handwritten notes or PDF files."
    },
    {
      question: "How do AI answers work?",
      answer: "Our AI processes your questions and provides answers based on a vast knowledge base. You can ask questions through the AI tab."
    },
    {
      question: "How do I join a study room?",
      answer: "Browse available study rooms from the Home tab, select a room, and tap on the Join button. You'll be connected with other students instantly."
    },
    {
      question: "Can I use the app offline?",
      answer: "Some features like viewing previously downloaded notes are available offline, but most features require an internet connection."
    },
    {
      question: "How do I reset my password?",
      answer: "Go to the Profile tab, tap on Settings, and select 'Reset Password'. Follow the instructions sent to your email."
    }
  ];
  
  const contacts = [
    {
      method: "Chat Support",
      description: "Get quick answers during business hours",
      icon: <MessageSquare className="h-5 w-5 text-blue-600" />,
      action: "Start Chat",
      onClick: () => {
        toast({
          title: "Chat initiated",
          description: "A support representative will be with you shortly"
        });
      }
    },
    {
      method: "Email Support",
      description: "support@notex.com",
      icon: <Mail className="h-5 w-5 text-blue-600" />,
      action: "Email Us",
      onClick: () => {
        window.location.href = "mailto:support@notex.com";
      }
    },
    {
      method: "Phone Support",
      description: "Available Mon-Fri, 9am-5pm",
      icon: <Phone className="h-5 w-5 text-blue-600" />,
      action: "Call Now",
      onClick: () => {
        window.location.href = "tel:+15551234567";
      }
    },
    {
      method: "Knowledge Base",
      description: "Browse our detailed guides",
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
      action: "View Guides",
      onClick: () => {
        toast({
          title: "Coming soon",
          description: "Our knowledge base is under construction"
        });
      }
    }
  ];
  
  return (
    <MobileLayout>
      <MobileHeader title="Help & Support" showBackButton />
      
      <div className="p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm mb-4">
          <div className="flex divide-x divide-gray-100 dark:divide-gray-700">
            <button
              className={`flex-1 py-3 text-center ${
                activeTab === 'faq' 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              <HelpCircle className="h-5 w-5 mx-auto mb-1" />
              FAQ
            </button>
            <button
              className={`flex-1 py-3 text-center ${
                activeTab === 'contact' 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('contact')}
            >
              <MessageSquare className="h-5 w-5 mx-auto mb-1" />
              Contact
            </button>
          </div>
        </div>
        
        {activeTab === 'faq' ? (
          <motion.div
            key="faq"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Accordion type="single" collapsible className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 dark:border-gray-700 last:border-none">
                  <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-900 dark:text-white text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ) : (
          <motion.div
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              {contacts.map((contact, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-none"
                >
                  <div className="flex items-center">
                    {contact.icon}
                    <div className="ml-3">
                      <h3 className="text-gray-900 dark:text-white font-medium">{contact.method}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{contact.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={contact.onClick}
                    className="text-blue-600 dark:text-blue-400"
                  >
                    {contact.action} <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Send us a message
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="support-message" className="text-gray-700 dark:text-gray-300">
                    How can we help?
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="support-message"
                      placeholder="Type your message here..."
                      className="pr-12 h-24 pt-3 resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      multiline
                    />
                    <Button
                      className="absolute bottom-2 right-2 h-8 w-8 p-0"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      variant="ghost"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full" onClick={handleSendMessage} disabled={!message.trim()}>
                  Send Message <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </MobileLayout>
  );
};
