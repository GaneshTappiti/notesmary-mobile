
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAnswers = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI study assistant. How can I help you with your studies today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const { toast } = useToast();

  // Handle sending a question to the AI
  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    // Add user's question to messages
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const aiResponses = [
        "That's a great question! In this subject, the key concept to understand is how the principles work together to create a unified theory.",
        "Based on your question, I'd recommend reviewing Chapter 5 in your textbook, which covers this topic in detail.",
        "Let me explain this step by step: First, consider the fundamental properties. Second, apply the formula. Third, analyze the results.",
        "This concept is often misunderstood. The important thing to remember is that it builds on previous knowledge from earlier chapters."
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      setQuestion('');
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Answers | Notex</title>
      </Helmet>
      
      <PageContainer className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-full">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">AI Answers</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Study Assistant</CardTitle>
            <CardDescription>
              Ask questions about your study material and get instant answers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto p-2">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    <div 
                      className={`text-xs mt-1 ${
                        message.isUser ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p>Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full gap-2">
              <Textarea 
                placeholder="Ask a question about your studies..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
                rows={2}
              />
              <Button 
                onClick={handleSendQuestion}
                disabled={!question.trim() || isLoading}
                className="self-end"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="ml-2 sr-only md:not-sr-only">Send</span>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ask specific questions for more accurate answers</li>
              <li>Try explaining concepts to test your understanding</li>
              <li>Ask for summaries of topics you're struggling with</li>
              <li>Request example problems for practice</li>
            </ul>
          </CardContent>
        </Card>
      </PageContainer>
    </>
  );
};

export default AIAnswers;
