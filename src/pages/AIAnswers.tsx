
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, BookOpen, Search, AlertCircle, CheckCircle2, FileIcon } from "lucide-react";
import { Database } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";
import { AnswerCard } from "@/components/ai-answers/AnswerCard";
import { HistorySection } from "@/components/ai-answers/HistorySection";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-2">AI Answer Retrieval</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upload your study materials and get AI-generated answers to your questions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-500" />
                  Upload Study Material
                </CardTitle>
                <CardDescription>
                  Upload your notes, textbooks, or study materials in PDF or text format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 
                  ${status === "ready" || status === "complete" ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-gray-300 hover:border-blue-400"}`}
                >
                  <div className="mx-auto flex flex-col items-center justify-center">
                    {status === "ready" || status === "complete" ? (
                      <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                    ) : (
                      <FileText className="h-12 w-12 text-blue-500 mb-4" />
                    )}
                    
                    <h3 className="text-lg font-medium mb-2">
                      {status === "ready" || status === "complete" 
                        ? "File Uploaded Successfully!" 
                        : "Drag & drop your notes here"}
                    </h3>
                    
                    {status === "ready" || status === "complete" ? (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {selectedFile?.name} ({Math.round((selectedFile?.size || 0) / 1024)} KB)
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Supported formats: PDF, TXT
                      </p>
                    )}
                    
                    <label className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium cursor-pointer transition-colors">
                      {status === "ready" || status === "complete" ? "Change File" : "Browse Files"}
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.txt"
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Extract text from your materials</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Question Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-500" />
                  Ask a Question
                </CardTitle>
                <CardDescription>
                  Ask any question related to your uploaded study material
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Example: What are the main components of a cell?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={3}
                    disabled={status === "idle" || status === "processing"}
                    className="resize-none w-full"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={handleAskQuestion} 
                    disabled={status === "idle" || status === "processing" || !question.trim()}
                    className="w-full"
                  >
                    {status === "processing" ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : "Get Answer"}
                  </Button>
                </div>
                
                {status === "error" && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-lg flex items-center text-red-800 dark:text-red-400">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p className="text-sm">There was an error processing your request. Please try again.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Answer Section */}
        {status === "complete" && (
          <div className="mt-8">
            <AnswerCard
              question={question}
              answer={answer}
              onSave={saveToHistory}
              isSaved={!!currentQuestionId}
              loading={loading}
            />
          </div>
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
  );
};

export default AIAnswers;
