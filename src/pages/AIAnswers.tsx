
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, BookOpen, Search, AlertCircle, CheckCircle2, FileIcon, Sparkles, Brain } from "lucide-react";
import { Database } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";
import { AnswerCard } from "@/components/ai-answers/AnswerCard";
import { HistorySection } from "@/components/ai-answers/HistorySection";
import { PageContainer } from "@/components/PageContainer";

// Define properly typed Note interface based on database.types.ts
type Note = Database['public']['Tables']['notes']['Row'];
type AIRequest = Database['public']['Tables']['ai_requests']['Row'];

const AIAnswers = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedText, setUploadedText] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "ready" | "processing" | "complete" | "error">("idle");
  const [userNotes, setUserNotes] = useState<Note[]>([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState<boolean>(false);
  const [questionHistory, setQuestionHistory] = useState<AIRequest[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

  // Fetch user's notes from Supabase
  useEffect(() => {
    const fetchUserNotes = async () => {
      setIsLoadingNotes(true);
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('id, title, branch, file_url, uploaded_at')
          .order('uploaded_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setUserNotes(data as Note[]);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast({
          title: "Error",
          description: "Failed to load your notes. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingNotes(false);
      }
    };

    fetchUserNotes();
  }, [toast]);

  // Fetch user's question history
  useEffect(() => {
    const fetchQuestionHistory = async () => {
      setIsLoadingHistory(true);
      try {
        const { data, error } = await supabase
          .from('ai_requests')
          .select('*')
          .eq('request_type', 'question_answer')
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) {
          throw error;
        }

        if (data) {
          setQuestionHistory(data as AIRequest[]);
        }
      } catch (error) {
        console.error('Error fetching question history:', error);
        toast({
          title: "Error",
          description: "Failed to load question history.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchQuestionHistory();
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // For demo purposes, we'll simply read the file as text
      // In a real app, you would send this to your backend for processing
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const text = event.target.result.toString();
          setUploadedText(text);
          setStatus("ready");
          toast({
            title: "File uploaded",
            description: "Your notes are ready for questions",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const saveToHistory = async () => {
    if (!question || !answer) return;

    try {
      const { data, error } = await supabase
        .from('ai_requests')
        .insert({
          request_type: 'question_answer',
          input: { question },
          output: { answer },
          tokens_used: answer.length
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setCurrentQuestionId(data.id);
        setQuestionHistory(prev => [data as AIRequest, ...prev]);
        toast({
          title: "Saved to history",
          description: "Your question and answer have been saved.",
        });
      }
    } catch (error) {
      console.error('Error saving to history:', error);
      toast({
        title: "Error",
        description: "Failed to save to history. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_requests')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setQuestionHistory(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Deleted",
        description: "Question removed from history.",
      });
    } catch (error) {
      console.error('Error deleting history item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Please enter a question",
        description: "Your question cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setStatus("processing");
    setCurrentQuestionId(null);

    try {
      // In a real implementation, this would be an API call to OpenAI
      // Simulating API call with setTimeout
      setTimeout(() => {
        // Generate a simple AI response based on the text for demo purposes
        const demoAnswer = generateDemoAnswer(uploadedText, question);
        setAnswer(demoAnswer);
        setLoading(false);
        setStatus("complete");
      }, 2000);
    } catch (error) {
      console.error("Error processing request:", error);
      setLoading(false);
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to get an answer. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Simple function to generate a demo answer
  const generateDemoAnswer = (text: string, query: string): string => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    // Try to find sentences that might contain the answer
    const sentences = text.split(/[.!?]+/);
    const relevantSentences = sentences.filter(sentence => 
      sentence.toLowerCase().includes(lowerQuery) || 
      lowerQuery.split(" ").some(word => sentence.toLowerCase().includes(word))
    );
    
    if (relevantSentences.length > 0) {
      return "Based on your uploaded notes, here's what I found:\n\n" + 
        relevantSentences.join(". ") + 
        "\n\nNote: This is a demo answer. In the actual implementation, this would use OpenAI's API for more accurate responses.";
    } else {
      return "I couldn't find specific information about this in your notes. In the actual implementation, OpenAI's advanced AI would provide more comprehensive answers based on the context of your uploaded material.";
    }
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Study Assistant
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload your study materials and get intelligent, AI-powered answers to help you learn better and faster
          </p>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column - Upload & Question */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* File Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Upload className="h-5 w-5 text-blue-500" />
                  Study Material
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Upload PDF or text files to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer
                  ${status === "ready" || status === "complete" 
                    ? "border-green-400 bg-green-50" 
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"}`}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.txt"
                  />
                  
                  <div className="mx-auto flex flex-col items-center">
                    {status === "ready" || status === "complete" ? (
                      <>
                        <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
                        <h3 className="font-semibold text-green-700 mb-2">File Ready!</h3>
                        <p className="text-sm text-green-600 mb-3">
                          {selectedFile?.name}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-blue-100 rounded-full mb-3">
                          <FileText className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="font-semibold text-gray-700 mb-2">Upload Your Notes</h3>
                        <p className="text-sm text-gray-500 mb-3">
                          Drag & drop or click to browse
                        </p>
                      </>
                    )}
                    
                    <Button 
                      variant={status === "ready" || status === "complete" ? "outline" : "default"}
                      size="sm"
                      className="mt-2"
                    >
                      {status === "ready" || status === "complete" ? "Change File" : "Browse Files"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Question Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Search className="h-5 w-5 text-blue-500" />
                  Ask Question
                </CardTitle>
                <CardDescription className="text-gray-600">
                  What would you like to know about your material?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Example: What are the main components of a cell? Explain the process of photosynthesis..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                  disabled={status === "idle" || status === "processing"}
                  className="resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
                
                <Button 
                  onClick={handleAskQuestion} 
                  disabled={status === "idle" || status === "processing" || !question.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
                  size="lg"
                >
                  {status === "processing" ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get AI Answer
                    </>
                  )}
                </Button>
                
                {status === "error" && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center text-red-700">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p className="text-sm">Something went wrong. Please try again.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Answer & History */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Answer Section */}
          {status === "complete" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnswerCard
                question={question}
                answer={answer}
                onSave={saveToHistory}
                isSaved={!!currentQuestionId}
                loading={loading}
              />
            </motion.div>
          )}

          {/* Empty State for Answer Area */}
          {status !== "complete" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="p-6 bg-gray-50 rounded-2xl max-w-md mx-auto">
                <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                  <Brain className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready to Help You Learn</h3>
                <p className="text-gray-500 text-sm">
                  Upload your study material and ask a question to get started with AI-powered learning assistance.
                </p>
              </div>
            </motion.div>
          )}

          {/* History Section */}
          {!isLoadingHistory && (
            <HistorySection
              history={questionHistory}
              onDeleteItem={deleteHistoryItem}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default AIAnswers;
