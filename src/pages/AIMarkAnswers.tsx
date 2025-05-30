
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Brain, Upload, FileText, CheckCircle2, AlertTriangle, Star } from 'lucide-react';
import { PageContainer } from '@/components/PageContainer';

const AIMarkAnswers = () => {
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [rubric, setRubric] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isMarking, setIsMarking] = useState(false);
  const [markingResult, setMarkingResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleMarkAnswer = async () => {
    if (!question || !answer) {
      toast({
        title: "Missing Information",
        description: "Please provide both a question and answer to mark.",
        variant: "destructive",
      });
      return;
    }

    setIsMarking(true);
    
    try {
      // Simulate AI marking process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock marking result
      const mockResult = {
        score: 85,
        maxScore: 100,
        grade: 'B+',
        feedback: [
          {
            type: 'strength',
            text: 'Excellent understanding of the core concepts and clear explanation of the methodology.'
          },
          {
            type: 'improvement',
            text: 'Could benefit from more specific examples to support your arguments.'
          },
          {
            type: 'suggestion',
            text: 'Consider expanding on the implications of your findings in the conclusion.'
          }
        ],
        breakdown: [
          { criterion: 'Understanding', score: 9, maxScore: 10 },
          { criterion: 'Analysis', score: 8, maxScore: 10 },
          { criterion: 'Communication', score: 7, maxScore: 10 },
          { criterion: 'Evidence', score: 6, maxScore: 10 }
        ]
      };
      
      setMarkingResult(mockResult);
      
      toast({
        title: "Answer Marked Successfully",
        description: `Your answer received a score of ${mockResult.score}/${mockResult.maxScore} (${mockResult.grade})`,
      });
      
    } catch (error) {
      toast({
        title: "Marking Failed",
        description: "There was an error marking your answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMarking(false);
    }
  };

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setRubric('');
    setSelectedFile(null);
    setMarkingResult(null);
  };

  return (
    <>
      <Helmet>
        <title>AI Mark Answers | Notex</title>
      </Helmet>
      
      <PageContainer>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AI Answer Marking
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get instant, detailed feedback on your answers with AI-powered marking and personalized improvement suggestions
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="xl:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Question & Answer
                  </CardTitle>
                  <CardDescription>
                    Enter the question and your answer for AI marking
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Textarea
                      id="question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Enter the question you're answering..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="answer">Your Answer</Label>
                    <Textarea
                      id="answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Enter your answer here..."
                      rows={8}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rubric">Marking Rubric (Optional)</Label>
                    <Textarea
                      id="rubric"
                      value={rubric}
                      onChange={(e) => setRubric(e.target.value)}
                      placeholder="Provide specific marking criteria or rubric..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="file">Upload Answer File (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
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
                          <p className="text-sm text-gray-600">Upload answer document</p>
                        </div>
                      )}
                      
                      <Button 
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => document.getElementById('file')?.click()}
                      >
                        {selectedFile ? "Change File" : "Browse Files"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={handleMarkAnswer}
                      disabled={isMarking || (!question || !answer)}
                      className="flex-1"
                    >
                      {isMarking ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Marking Answer...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Mark My Answer
                        </>
                      )}
                    </Button>
                    
                    <Button variant="outline" onClick={resetForm}>
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="xl:col-span-1">
              {markingResult ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="text-center">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-3">
                        <span className="text-2xl font-bold text-white">
                          {markingResult.grade}
                        </span>
                      </div>
                      <CardTitle>Score: {markingResult.score}/{markingResult.maxScore}</CardTitle>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Detailed Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {markingResult.breakdown.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.criterion}</span>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(item.maxScore)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${
                                    i < item.score ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {item.score}/{item.maxScore}
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {markingResult.feedback.map((item: any, index: number) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg border-l-4 ${
                            item.type === 'strength' 
                              ? 'bg-green-50 border-green-400' 
                              : item.type === 'improvement'
                              ? 'bg-yellow-50 border-yellow-400'
                              : 'bg-blue-50 border-blue-400'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {item.type === 'strength' && <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />}
                            {item.type === 'improvement' && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                            {item.type === 'suggestion' && <Brain className="h-4 w-4 text-blue-500 mt-0.5" />}
                            <p className="text-sm">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready to Mark</h3>
                    <p className="text-gray-500 text-sm">
                      Enter your question and answer to get detailed AI feedback and scoring
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default AIMarkAnswers;
