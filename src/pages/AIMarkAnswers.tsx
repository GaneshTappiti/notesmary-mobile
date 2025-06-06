
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Brain, Target, RefreshCw, FileText } from 'lucide-react';
import { PageContainer } from '@/components/PageContainer';
import { QuestionPrompt } from '@/components/answer-generator/QuestionPrompt';
import { AnswerFormatSelector } from '@/components/answer-generator/AnswerFormatSelector';
import { DocumentUpload } from '@/components/answer-generator/DocumentUpload';
import { AnswerPreview } from '@/components/answer-generator/AnswerPreview';
import { EmptyState } from '@/components/answer-generator/EmptyState';

const AIMarkAnswers = () => {
  const { toast } = useToast();
  const [questionPrompt, setQuestionPrompt] = useState('');
  const [markType, setMarkType] = useState('5');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAnswer, setGeneratedAnswer] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast({
        title: "Document Uploaded! 📄",
        description: `${e.target.files[0].name} is ready for processing`,
      });
    }
  };

  const handleGenerateAnswer = async () => {
    if (!selectedFile) {
      toast({
        title: "Document Required",
        description: "Please upload your study materials to generate structured answers.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI processing with document analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const topic = questionPrompt || "comprehensive study material analysis";
      const mockAnswer = {
        question: questionPrompt || `Comprehensive analysis of ${selectedFile.name}`,
        markType: parseInt(markType),
        documentName: selectedFile.name,
        structuredAnswer: {
          introduction: `Based on the analysis of ${selectedFile.name}, this response provides a structured examination of ${topic}...`,
          mainPoints: [
            `Primary concept derived from the study materials with detailed explanation and supporting evidence`,
            `Secondary important element demonstrating comprehensive understanding from the uploaded content`, 
            `Third key point with practical applications and real-world examples from your materials`,
            ...(parseInt(markType) >= 10 ? [
              `Advanced analysis showing deeper insights from the document content`,
              `Critical evaluation and synthesis of multiple concepts from your study materials`
            ] : [])
          ].slice(0, parseInt(markType) === 2 ? 2 : parseInt(markType) === 5 ? 3 : 5),
          conclusion: `In conclusion, the analysis of your study materials demonstrates comprehensive coverage of the topic with well-structured insights...`,
          keyTerms: ["Key Term 1", "Key Term 2", "Key Term 3", "Key Term 4"]
        },
        estimatedScore: Math.floor(parseInt(markType) * (0.85 + Math.random() * 0.1)),
        feedback: [
          {
            type: 'strength',
            text: 'Excellent use of source material with clear structure and logical progression.'
          },
          {
            type: 'improvement', 
            text: 'Consider expanding on specific examples mentioned in your uploaded materials.'
          },
          ...(parseInt(markType) >= 10 ? [{
            type: 'strength',
            text: 'Demonstrates advanced synthesis of multiple concepts from the study materials.'
          }] : [])
        ]
      };
      
      setGeneratedAnswer(mockAnswer);
      
      toast({
        title: "Answer Generated Successfully! 🎉",
        description: `Structured ${markType}-mark answer ready based on your materials`,
      });
      
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error processing your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyAnswer = () => {
    if (generatedAnswer) {
      const fullAnswer = `${generatedAnswer.structuredAnswer.introduction}\n\n${generatedAnswer.structuredAnswer.mainPoints.map((point: string, index: number) => `${index + 1}. ${point}`).join('\n\n')}\n\n${generatedAnswer.structuredAnswer.conclusion}`;
      navigator.clipboard.writeText(fullAnswer);
      toast({
        title: "Answer Copied! 📋",
        description: "Structured answer copied to clipboard",
      });
    }
  };

  const resetForm = () => {
    setQuestionPrompt('');
    setSelectedFile(null);
    setGeneratedAnswer(null);
    setMarkType('5');
    
    toast({
      title: "Form Reset",
      description: "Ready for new study materials",
    });
  };

  return (
    <>
      <Helmet>
        <title>AI Study Material Analyzer | Notex</title>
      </Helmet>
      
      <PageContainer>
        <TooltipProvider>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8 text-center"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                <motion.div 
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="p-3 sm:p-4 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-lg"
                >
                  <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </motion.div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    AI Study Material Analyzer
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1">
                    Upload your notes and get exam-ready structured answers
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Input Section */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <Card className="shadow-xl border-0 bg-white overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Target className="h-5 w-5 text-purple-600" />
                      Document Analysis Setup
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Upload your study materials and configure your answer format
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-4 sm:p-6 space-y-5">
                    <DocumentUpload selectedFile={selectedFile} onFileChange={handleFileChange} />
                    <AnswerFormatSelector value={markType} onValueChange={setMarkType} />
                    <QuestionPrompt value={questionPrompt} onChange={setQuestionPrompt} />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button 
                        onClick={handleGenerateAnswer}
                        disabled={isGenerating || !selectedFile}
                        className="flex-1 h-11 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                      >
                        {isGenerating ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <Brain className="h-5 w-5" />
                          </motion.div>
                        ) : (
                          <Brain className="h-5 w-5 mr-2" />
                        )}
                        {isGenerating ? "Analyzing Document..." : "Generate Structured Answer"}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={resetForm} 
                        className="h-11 hover:bg-gray-50 transition-colors"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Preview/Results Section */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2"
              >
                {generatedAnswer ? (
                  <AnswerPreview 
                    generatedAnswer={generatedAnswer}
                    onCopy={copyAnswer}
                    onReset={() => setGeneratedAnswer(null)}
                  />
                ) : (
                  <EmptyState />
                )}
              </motion.div>
            </div>
          </div>
        </TooltipProvider>
      </PageContainer>
    </>
  );
};

export default AIMarkAnswers;
