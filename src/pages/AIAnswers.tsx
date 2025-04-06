
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, BookOpen, Search, AlertCircle, CheckCircle2, FilePdf, BookMarked, Brain } from "lucide-react";
import { AIService } from "@/services/AIService";
import { UploadModal } from "@/components/UploadModal";
import { Note } from "@/services/NotesService";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const AIAnswers = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedText, setUploadedText] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "ready" | "processing" | "complete" | "error">("idle");
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("text");
  const [userPDFs, setUserPDFs] = useState<Note[]>([]);
  const [selectedPDFs, setSelectedPDFs] = useState<string[]>([]);
  const [usePDFMode, setUsePDFMode] = useState<boolean>(false);
  const [sources, setSources] = useState<{ title: string, content: string }[]>([]);

  // Fetch user's PDFs on component mount
  useEffect(() => {
    const fetchUserPDFs = async () => {
      try {
        const pdfs = await AIService.getUserPDFs();
        setUserPDFs(pdfs);
        
        // If user has PDFs, default to PDF mode
        if (pdfs.length > 0) {
          setUsePDFMode(true);
          // Select the first PDF by default
          setSelectedPDFs([pdfs[0].id]);
        }
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    fetchUserPDFs();
  }, [showUploadModal]); // Refetch when upload modal closes

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

  const handlePDFToggle = (checked: boolean) => {
    setUsePDFMode(checked);
    setStatus(checked && userPDFs.length > 0 ? "ready" : "idle");
  };

  const handlePDFSelection = (pdfId: string) => {
    setSelectedPDFs(current => {
      const isSelected = current.includes(pdfId);
      
      if (isSelected) {
        // Remove from selection if already selected
        return current.filter(id => id !== pdfId);
      } else {
        // Add to selection
        return [...current, pdfId];
      }
    });
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
    setAnswer("");
    setSources([]);

    try {
      if (usePDFMode) {
        // Use PDF-based answering
        if (selectedPDFs.length === 0) {
          throw new Error("Please select at least one PDF to query");
        }

        const result = await AIService.getPDFAnswer(question, selectedPDFs);
        setAnswer(result.answer);
        
        // If sources are provided
        if (result.sources) {
          setSources(result.sources);
        }
      } else {
        // Use regular text-based answering
        const demoAnswer = await AIService.getAnswer(question, uploadedText);
        setAnswer(demoAnswer);
      }
      
      setStatus("complete");
    } catch (error: any) {
      console.error("Error processing request:", error);
      setStatus("error");
      toast({
        title: "Error",
        description: error.message || "Failed to get an answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return <FilePdf className="h-4 w-4 text-red-500" />;
    }
    return <FileText className="h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-12 px-4 pb-safe-bottom overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">AI Answer Retrieval</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get AI-powered answers from your uploaded study materials
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* PDF/Text mode toggle */}
        <div className="flex items-center justify-center mb-6 space-x-6">
          <div 
            className={`flex items-center space-x-2 p-2 rounded-full ${!usePDFMode ? 'bg-blue-100 dark:bg-blue-900/20' : ''}`}
            onClick={() => handlePDFToggle(false)}
          >
            <FileText className={`h-5 w-5 ${!usePDFMode ? 'text-blue-600' : 'text-gray-500'}`} />
            <span className={`text-sm font-medium ${!usePDFMode ? 'text-blue-600' : 'text-gray-500'}`}>Text Input</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Switch 
              id="pdf-mode" 
              checked={usePDFMode}
              onCheckedChange={handlePDFToggle}
            />
            <Label 
              htmlFor="pdf-mode"
              className="text-sm cursor-pointer"
            >
              {usePDFMode ? 'Using PDF Knowledge Base' : 'Switch to PDF Mode'}
            </Label>
          </div>
          
          <div 
            className={`flex items-center space-x-2 p-2 rounded-full ${usePDFMode ? 'bg-blue-100 dark:bg-blue-900/20' : ''}`}
            onClick={() => handlePDFToggle(true)}
          >
            <FilePdf className={`h-5 w-5 ${usePDFMode ? 'text-blue-600' : 'text-gray-500'}`} />
            <span className={`text-sm font-medium ${usePDFMode ? 'text-blue-600' : 'text-gray-500'}`}>PDF Knowledge</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {usePDFMode ? (
                    <>
                      <FilePdf className="h-5 w-5 text-red-500" />
                      Query Your PDF Library
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 text-blue-500" />
                      Upload Study Material
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {usePDFMode 
                    ? "Select PDFs from your library to query with AI" 
                    : "Upload your notes, textbooks, or study materials in text format"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {usePDFMode ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium">Your PDF Library</h3>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setShowUploadModal(true)}
                      >
                        <Upload className="h-4 w-4 mr-1" /> Upload New
                      </Button>
                    </div>

                    {userPDFs.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                        <BookMarked className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-4">No PDFs uploaded yet</p>
                        <Button 
                          variant="default" 
                          onClick={() => setShowUploadModal(true)}
                        >
                          <Upload className="h-4 w-4 mr-1" /> Upload Your First PDF
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        {userPDFs.map((pdf) => (
                          <div 
                            key={pdf.id}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors
                              ${selectedPDFs.includes(pdf.id) 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-700' 
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-800'}
                            `}
                            onClick={() => handlePDFSelection(pdf.id)}
                          >
                            <Checkbox 
                              checked={selectedPDFs.includes(pdf.id)}
                              onCheckedChange={() => handlePDFSelection(pdf.id)}
                              className="mr-3"
                            />
                            <div className="flex items-center flex-1 min-w-0">
                              {getFileIcon(pdf.title)}
                              <div className="ml-3 flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{pdf.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {pdf.subject || "Uncategorized"}
                                </p>
                              </div>
                              {pdf.branch && (
                                <Badge variant="outline" className="ml-2">{pdf.branch}</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 
                    ${status === "ready" || status === "complete" ? "border-green-500 bg-green-50 dark:bg-green-900/10" : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-700"}`}
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
                          Supported format: TXT
                        </p>
                      )}
                      
                      <label className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium cursor-pointer transition-colors">
                        {status === "ready" || status === "complete" ? "Change File" : "Browse Files"}
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".txt"
                        />
                      </label>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">
                    Ask a Question
                  </label>
                  <Textarea
                    placeholder={`Example: ${usePDFMode ? "What are the key concepts discussed in chapter 3?" : "What are the main components of a cell?"}`}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={3}
                    disabled={(usePDFMode && selectedPDFs.length === 0) || status === "processing"}
                    className="resize-none w-full"
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleAskQuestion} 
                    disabled={(usePDFMode && selectedPDFs.length === 0) || 
                              (!usePDFMode && status === "idle") || 
                              status === "processing" || 
                              !question.trim()}
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
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" /> 
                        {usePDFMode ? "Ask AI about selected PDFs" : "Get Answer"}
                      </>
                    )}
                  </Button>
                </div>
                
                {status === "error" && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-lg flex items-center text-red-800 dark:text-red-400">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p className="text-sm">There was an error processing your request. Please try again.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right side - Answer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-500" />
                  Answer
                </CardTitle>
                <CardDescription>
                  {status === "complete" 
                    ? "AI-generated answer based on your study material" 
                    : "Ask a question to get an answer from the AI"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {status === "processing" ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Generating your answer...</p>
                  </div>
                ) : status === "complete" ? (
                  <>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                      <pre className="whitespace-pre-wrap text-sm">
                        {answer}
                      </pre>
                    </div>
                    
                    {/* Show Sources if available */}
                    {sources.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-2">Sources</h3>
                        <div className="space-y-3">
                          {sources.map((source, index) => (
                            <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                {source.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-2">
                                {source.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12 text-gray-400">
                    <Search className="h-12 w-12 mb-4 opacity-30" />
                    <p className="text-lg font-medium mb-2">No Answer Yet</p>
                    <p className="text-sm max-w-md">
                      {usePDFMode
                        ? "Select PDFs from your library and ask a question to get AI-powered answers"
                        : "Upload your study material and ask a question to get AI-powered answers"}
                    </p>
                  </div>
                )}
              </CardContent>
              
              {status === "complete" && (
                <CardFooter className="text-sm text-gray-500 flex flex-wrap justify-between items-center">
                  <p>Powered by AI based on your {usePDFMode ? "uploaded PDFs" : "study material"}.</p>
                  
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button variant="outline" size="sm" onClick={() => setQuestion("")}>
                      New Question
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(answer);
                        toast({ title: "Answer copied to clipboard" });
                      }
                    }}>
                      Copy Answer
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Upload Modal for PDFs */}
      <UploadModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </div>
  );
};

export default AIAnswers;
