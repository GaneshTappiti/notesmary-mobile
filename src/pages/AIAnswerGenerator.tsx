
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Check, Copy, Save, ThumbsUp, ThumbsDown, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AIService } from '@/services/AIService';
import Loading from '@/components/ui/loading';

// Subject and chapter data
const subjects = [
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'mathematics', name: 'Mathematics' },
  { id: 'computerScience', name: 'Computer Science' }
];

const chaptersBySubject = {
  physics: [
    { id: 'mechanics', name: 'Mechanics' },
    { id: 'thermodynamics', name: 'Thermodynamics' },
    { id: 'optics', name: 'Optics' },
    { id: 'electromagnetism', name: 'Electromagnetism' },
    { id: 'modernPhysics', name: 'Modern Physics' }
  ],
  chemistry: [
    { id: 'organicChemistry', name: 'Organic Chemistry' },
    { id: 'inorganicChemistry', name: 'Inorganic Chemistry' },
    { id: 'physicalChemistry', name: 'Physical Chemistry' },
    { id: 'analyticalChemistry', name: 'Analytical Chemistry' }
  ],
  biology: [
    { id: 'cellBiology', name: 'Cell Biology' },
    { id: 'genetics', name: 'Genetics' },
    { id: 'ecology', name: 'Ecology' },
    { id: 'humanPhysiology', name: 'Human Physiology' }
  ],
  mathematics: [
    { id: 'algebra', name: 'Algebra' },
    { id: 'calculus', name: 'Calculus' },
    { id: 'geometry', name: 'Geometry' },
    { id: 'statistics', name: 'Statistics' },
    { id: 'trigonometry', name: 'Trigonometry' }
  ],
  computerScience: [
    { id: 'algorithms', name: 'Algorithms & Data Structures' },
    { id: 'programming', name: 'Programming Languages' },
    { id: 'databases', name: 'Databases' },
    { id: 'networking', name: 'Computer Networks' },
    { id: 'ai', name: 'Artificial Intelligence' }
  ]
};

type MarkType = '2marks' | '5marks' | '10marks';

const AIAnswerGenerator = () => {
  const { toast } = useToast();
  const [subject, setSubject] = useState<string>('');
  const [chapter, setChapter] = useState<string>('');
  const [question, setQuestion] = useState('');
  const [markType, setMarkType] = useState<MarkType>('5marks');
  const [chapters, setChapters] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Update chapters when subject changes
    if (subject) {
      setChapters(chaptersBySubject[subject as keyof typeof chaptersBySubject] || []);
      setChapter(''); // Reset chapter when subject changes
    } else {
      setChapters([]);
    }
  }, [subject]);

  const handleGenerateAnswer = async () => {
    if (!question.trim()) {
      toast({
        title: "Question required",
        description: "Please enter a question to generate an answer.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      // Form the prompt including subject, chapter and mark type
      const prompt = `
Subject: ${subject ? subjects.find(s => s.id === subject)?.name : 'General'}
${chapter ? `Chapter: ${chapters.find(c => c.id === chapter)?.name}` : ''}
Question: ${question}
Please provide a ${markType === '2marks' ? 'concise' : markType === '5marks' ? 'detailed' : 'comprehensive'} answer worth ${markType.replace('marks', ' marks')}.
      `.trim();

      // Use the AIService to get the answer
      const response = await AIService.getAnswer(prompt);
      setAnswer(response);
    } catch (error) {
      console.error("Error generating answer:", error);
      toast({
        title: "Error",
        description: "Failed to generate answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (answer) {
      navigator.clipboard.writeText(answer);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Answer copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (answer) {
      // Here you would integrate with your notes system
      // For now, just show a success message
      setSaved(true);
      toast({
        title: "Saved!",
        description: "Answer saved to your notes",
      });
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleRating = (positive: boolean) => {
    // In a real implementation, you would send this feedback to your backend
    toast({
      title: "Thank you!",
      description: `Your ${positive ? "positive" : "negative"} feedback has been recorded.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Answer Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">Get AI-written answers tailored to your academic needs</p>
      </div>

      {/* Input section */}
      <Card className="mb-8 bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
          <CardDescription>Provide information about your question</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Subject and Chapter Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj.id} value={subj.id}>{subj.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chapter">Chapter</Label>
              <Select value={chapter} onValueChange={setChapter} disabled={!subject}>
                <SelectTrigger id="chapter">
                  <SelectValue placeholder={subject ? "Select a chapter" : "Select a subject first"} />
                </SelectTrigger>
                <SelectContent>
                  {chapters.map((chap) => (
                    <SelectItem key={chap.id} value={chap.id}>{chap.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Question Input */}
          <div className="space-y-2">
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              placeholder="Type or paste your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {/* Mark Type Selection */}
          <div className="space-y-2">
            <Label>Answer Detail Level</Label>
            <div className="flex justify-center sm:justify-start pt-2">
              <ToggleGroup type="single" value={markType} onValueChange={(value) => value && setMarkType(value as MarkType)}>
                <ToggleGroupItem value="2marks" aria-label="2 Marks" className="px-4">
                  2 Marks
                  <span className="hidden sm:inline ml-1">(Brief)</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="5marks" aria-label="5 Marks" className="px-4">
                  5 Marks
                  <span className="hidden sm:inline ml-1">(Detailed)</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="10marks" aria-label="10 Marks" className="px-4">
                  10 Marks
                  <span className="hidden sm:inline ml-1">(Comprehensive)</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateAnswer}
            disabled={loading || !question.trim()}
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-indigo-600"
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : "Generate Answer"}
          </Button>
        </CardFooter>
      </Card>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center my-8">
          <Loading />
        </div>
      )}

      {/* Answer Display */}
      {answer && !loading && (
        <Card className="bg-white dark:bg-gray-800 border-t-4 border-indigo-500 shadow-lg">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Generated Answer</span>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopy} 
                  className={copied ? "bg-green-100 dark:bg-green-900" : ""}
                >
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSave}
                  className={saved ? "bg-blue-100 dark:bg-blue-900" : ""}
                >
                  <Save className="h-4 w-4 mr-1" />
                  {saved ? "Saved" : "Save to Notes"}
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              {subject && `Subject: ${subjects.find(s => s.id === subject)?.name}`}
              {chapter && `, Chapter: ${chapters.find(c => c.id === chapter)?.name}`}
              {` • ${markType.replace('marks', ' Marks')} Answer`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-line">
                {answer}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-gray-500">Was this answer helpful?</span>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full" 
                onClick={() => handleRating(true)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span className="sr-only">Helpful</span>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full" 
                onClick={() => handleRating(false)}
              >
                <ThumbsDown className="h-4 w-4" />
                <span className="sr-only">Not Helpful</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AIAnswerGenerator;
