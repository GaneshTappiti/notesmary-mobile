
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Star, 
  HelpCircle,
  Copy,
  RefreshCw,
  Zap,
  Target,
  BookOpen
} from 'lucide-react';
import { PageContainer } from '@/components/PageContainer';

const AIMarkAnswers = () => {
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [rubric, setRubric] = useState('');
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
    if (!question) {
      toast({
        title: "Question Required",
        description: "Please provide a question to generate a structured answer.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI generation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated answer based on mark type
      const mockAnswer = {
        question,
        markType: parseInt(markType),
        structuredAnswer: {
          introduction: "Brief introduction addressing the key concept...",
          mainPoints: [
            "First main point with detailed explanation and supporting evidence",
            "Second critical aspect with examples and analysis", 
            "Third important element demonstrating understanding"
          ],
          conclusion: "Concise conclusion tying together the main arguments...",
          keyTerms: ["Term 1", "Term 2", "Term 3"]
        },
        estimatedScore: Math.floor(parseInt(markType) * 0.85),
        feedback: [
          {
            type: 'strength',
            text: 'Strong structure with clear logical flow between points.'
          },
          {
            type: 'improvement', 
            text: 'Consider adding more specific examples to support your arguments.'
          }
        ]
      };
      
      setGeneratedAnswer(mockAnswer);
      
      toast({
        title: "Answer Generated Successfully",
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
        title: "Answer Copied",
        description: "Structured answer copied to clipboard",
      });
    }
  };

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setRubric('');
    setSelectedFile(null);
    setGeneratedAnswer(null);
    setMarkType('5');
  };

  return (
    <>
      <Helmet>
        <title>Structured Answer Generator | Notex</title>
      </Helmet>
      
      <PageContainer>
        <TooltipProvider>
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-4 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-lg">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Structured Answer Generator
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    Get exam-ready answers in your preferred format
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Section */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Target className="h-5 w-5 text-purple-600" />
                      Answer Configuration
                    </CardTitle>
                    <CardDescription className="text-base">
                      Configure your question and get a perfectly structured exam answer
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-6">
                    {/* Question Input */}
                    <div className="space-y-2">
                      <Label htmlFor="question" className="text-base font-semibold flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Exam Question
                      </Label>
                      <Textarea
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter your exam question here... e.g., 'Explain the causes and effects of climate change on global ecosystems'"
                        rows={4}
                        className="text-base resize-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* Mark Type Selection */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Answer Format
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Choose the mark value to get appropriately structured answers</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      
                      <RadioGroup value={markType} onValueChange={setMarkType} className="flex gap-4">
                        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3 flex-1">
                          <RadioGroupItem value="2" id="2mark" />
                          <Label htmlFor="2mark" className="font-medium cursor-pointer">
                            2-Mark Answer
                            <span className="block text-xs text-gray-500">Brief & Concise</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 bg-purple-50 rounded-lg p-3 flex-1 border-2 border-purple-200">
                          <RadioGroupItem value="5" id="5mark" />
                          <Label htmlFor="5mark" className="font-medium cursor-pointer">
                            5-Mark Answer
                            <span className="block text-xs text-purple-600">Structured & Detailed</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3 flex-1">
                          <RadioGroupItem value="10" id="10mark" />
                          <Label htmlFor="10mark" className="font-medium cursor-pointer">
                            10-Mark Answer
                            <span className="block text-xs text-gray-500">Comprehensive</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Optional Context */}
                    <div className="space-y-2">
                      <Label htmlFor="rubric" className="text-base font-semibold flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Additional Context (Optional)
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add specific requirements, marking criteria, or context</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Textarea
                        id="rubric"
                        value={rubric}
                        onChange={(e) => setRubric(e.target.value)}
                        placeholder="Add any specific requirements, marking criteria, or additional context..."
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="file" className="text-base font-semibold">Reference Material (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 hover:bg-purple-50 transition-colors">
                        <input
                          id="file"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.txt"
                        />
                        
                        {selectedFile ? (
                          <div>
                            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <p className="font-medium">{selectedFile.name}</p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Upload reference material or notes</p>
                          </div>
                        )}
                        
                        <Button 
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          onClick={() => document.getElementById('file')?.click()}
                        >
                          {selectedFile ? "Change File" : "Browse Files"}
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button 
                        onClick={handleGenerateAnswer}
                        disabled={isGenerating || !question.trim()}
                        className="flex-1 h-12 text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        isLoading={isGenerating}
                      >
                        {!isGenerating && <Brain className="h-5 w-5 mr-2" />}
                        {isGenerating ? "Generating Answer..." : "Generate Structured Answer"}
                      </Button>
                      
                      <Button variant="outline" onClick={resetForm} className="h-12">
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview/Results Section */}
              <div className="lg:col-span-1">
                {generatedAnswer ? (
                  <div className="space-y-4">
                    {/* Score Card */}
                    <Card className="text-center bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                      <CardHeader className="pb-3">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-3">
                          <span className="text-2xl font-bold text-white">
                            {generatedAnswer.estimatedScore}/{generatedAnswer.markType}
                          </span>
                        </div>
                        <CardTitle className="text-lg">Estimated Score</CardTitle>
                      </CardHeader>
                    </Card>

                    {/* Generated Answer */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          Structured Answer
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={copyAnswer}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setGeneratedAnswer(null)}>
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-800 mb-1">Introduction</p>
                          <p className="text-sm">{generatedAnswer.structuredAnswer.introduction}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Main Points:</p>
                          {generatedAnswer.structuredAnswer.mainPoints.map((point: string, index: number) => (
                            <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                              <strong>{index + 1}.</strong> {point}
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-green-800 mb-1">Conclusion</p>
                          <p className="text-sm">{generatedAnswer.structuredAnswer.conclusion}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Feedback */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">AI Feedback</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {generatedAnswer.feedback.map((item: any, index: number) => (
                          <div 
                            key={index}
                            className={`p-3 rounded-lg border-l-4 ${
                              item.type === 'strength' 
                                ? 'bg-green-50 border-green-400' 
                                : 'bg-yellow-50 border-yellow-400'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {item.type === 'strength' && <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />}
                              {item.type === 'improvement' && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                              <p className="text-sm">{item.text}</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="text-center h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
                    <CardContent className="py-12">
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                          <Brain className="h-8 w-8 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready to Generate</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">
                            Enter your question and select the mark value to get a perfectly structured exam answer
                          </p>
                        </div>
                        <div className="space-y-2 text-xs text-gray-400">
                          <p>✓ Structured format based on mark value</p>
                          <p>✓ Key points and logical flow</p>
                          <p>✓ AI feedback and scoring</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </TooltipProvider>
      </PageContainer>
    </>
  );
};

export default AIMarkAnswers;
