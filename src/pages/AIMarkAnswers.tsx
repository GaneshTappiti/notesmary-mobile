
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Brain, Target, RefreshCw } from 'lucide-react';
import { PageContainer } from '@/components/PageContainer';
import { QuestionInput } from '@/components/answer-generator/QuestionInput';
import { AnswerFormatSelector } from '@/components/answer-generator/AnswerFormatSelector';
import { ContextInput } from '@/components/answer-generator/ContextInput';
import { FileUpload } from '@/components/answer-generator/FileUpload';
import { AnswerPreview } from '@/components/answer-generator/AnswerPreview';
import { EmptyState } from '@/components/answer-generator/EmptyState';

const AIMarkAnswers = () => {
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [markType, setMarkType] = useState('5');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAnswer, setGeneratedAnswer] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleGenerateAnswer = async () => {
    if (!question.trim()) {
      toast({
        title: "Question Required",
        description: "Please provide a question to generate a structured answer.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI generation process with more realistic timing
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Enhanced mock answer based on mark type
      const mockAnswer = {
        question,
        markType: parseInt(markType),
        structuredAnswer: {
          introduction: `This response addresses the key concepts of ${question.split(' ').slice(0, 3).join(' ')}...`,
          mainPoints: [
            `First critical aspect with detailed analysis and supporting evidence from recent studies`,
            `Second important element demonstrating comprehensive understanding of the topic`, 
            `Third key point with practical examples and real-world applications`,
            ...(parseInt(markType) >= 10 ? [
              `Fourth advanced concept with comparative analysis`,
              `Fifth dimension exploring implications and future considerations`
            ] : [])
          ].slice(0, parseInt(markType) === 2 ? 2 : parseInt(markType) === 5 ? 3 : 5),
          conclusion: `In conclusion, the analysis demonstrates a comprehensive understanding of the topic with clear connections between concepts...`,
          keyTerms: ["Key Term 1", "Key Term 2", "Key Term 3"]
        },
        estimatedScore: Math.floor(parseInt(markType) * (0.8 + Math.random() * 0.15)),
        feedback: [
          {
            type: 'strength',
            text: 'Excellent structure with clear logical progression between main points.'
          },
          {
            type: 'improvement', 
            text: 'Consider adding more specific examples to strengthen your arguments.'
          },
          ...(parseInt(markType) >= 10 ? [{
            type: 'strength',
            text: 'Demonstrates advanced critical thinking and analysis skills.'
          }] : [])
        ]
      };
      
      setGeneratedAnswer(mockAnswer);
      
      toast({
        title: "Answer Generated Successfully! 🎉",
        description: `Structured ${markType}-mark answer ready for review`,
      });
      
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your answer. Please try again.",
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
    setQuestion('');
    setContext('');
    setSelectedFile(null);
    setGeneratedAnswer(null);
    setMarkType('5');
    
    toast({
      title: "Form Reset",
      description: "Ready for a new question",
    });
  };

  return (
    <>
      <Helmet>
        <title>Structured Answer Generator | Notex</title>
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
                  <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </motion.div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Structured Answer Generator
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1">
                    Get exam-ready answers in your preferred format
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
                      Answer Configuration
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Configure your question and get a perfectly structured exam answer
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-4 sm:p-6 space-y-6">
                    <QuestionInput value={question} onChange={setQuestion} />
                    <AnswerFormatSelector value={markType} onValueChange={setMarkType} />
                    <ContextInput value={context} onChange={setContext} />
                    <FileUpload selectedFile={selectedFile} onFileChange={handleFileChange} />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button 
                        onClick={handleGenerateAnswer}
                        disabled={isGenerating || !question.trim()}
                        className="flex-1 h-12 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
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
                        {isGenerating ? "Generating Answer..." : "Generate Structured Answer"}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={resetForm} 
                        className="h-12 hover:bg-gray-50 transition-colors"
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
