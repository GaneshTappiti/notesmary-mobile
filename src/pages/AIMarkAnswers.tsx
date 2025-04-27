import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Copy, Download, Upload, X, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PageContainer } from '@/components/PageContainer';

type AnswerType = '2marks' | '5marks' | '10marks' | 'all';
type GeneratedAnswer = {
  twoMarks?: string;
  fiveMarks?: string;
  tenMarks?: string;
};

const AIMarkAnswers = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [answerType, setAnswerType] = useState<AnswerType>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAnswer, setGeneratedAnswer] = useState<GeneratedAnswer | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (
        fileType === 'application/pdf' ||
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        if (selectedFile.size <= 10 * 1024 * 1024) {
          setFile(selectedFile);
        } else {
          toast({
            title: "File too large",
            description: "Maximum file size is 10MB",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Invalid file format",
          description: "Please upload PDF or DOCX files only",
          variant: "destructive",
        });
      }
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const generateAnswer = () => {
    if (!file) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      setGeneratedAnswer({
        twoMarks: "A transformer is an electrical device that transfers energy between two or more circuits through electromagnetic induction. It consists of two or more coils of wire wound around a core, and it's used to increase (step up) or decrease (step down) AC voltages.",
        fiveMarks: "A transformer is a static electrical device that transfers electrical energy between two or more circuits through electromagnetic induction. It consists of a core made of laminated iron sheets and two or more windings.\n\nKey principles:\n1. Mutual induction: When alternating current flows through the primary winding, it creates a changing magnetic field\n2. Core function: The iron core concentrates the magnetic flux\n3. Voltage transformation: The ratio of secondary to primary voltage is equal to the ratio of secondary to primary turns\n4. Power conservation: In an ideal transformer, input power equals output power\n\nTransformers are essential in power distribution systems for changing voltage levels efficiently.",
        tenMarks: "# Working Principle of a Transformer\n\n## Basic Structure\nA transformer consists of:\n- An iron core made of laminated sheets to reduce eddy current losses\n- Primary winding connected to the input AC source\n- Secondary winding connected to the load\n- Sometimes a tertiary winding for special applications\n\n## Working Principle\n\n### 1. Electromagnetic Induction\nWhen an alternating current flows through the primary winding, it produces a changing magnetic flux in the core. This changing flux links with the secondary winding and induces an EMF (electromotive force) according to Faraday's law of electromagnetic induction.\n\n### 2. Flux Linkage\nThe iron core provides a path for the magnetic flux, ensuring most of the flux produced by the primary winding links with the secondary winding. This maximizes energy transfer efficiency.\n\n### 3. Voltage Transformation\nThe voltage transformation ratio is given by:\nVs/Vp = Ns/Np\nWhere:\n- Vs = Secondary voltage\n- Vp = Primary voltage\n- Ns = Number of turns in secondary\n- Np = Number of turns in primary\n\n### 4. Current Transformation\nThe current transformation follows an inverse relationship:\nIs/Ip = Np/Ns\n\n### 5. Power Conservation\nIn an ideal transformer: Input power = Output power\nVp × Ip = Vs × Is\n\n## Types of Transformers\n1. Step-up transformer: Increases voltage (Ns > Np)\n2. Step-down transformer: Decreases voltage (Ns < Np)\n3. Isolation transformer: Same voltage (Ns = Np)\n\n## Losses in Transformers\n1. Copper losses (I²R losses)\n2. Eddy current losses\n3. Hysteresis losses\n4. Flux leakage\n\n## Efficiency\nTransformer efficiency = (Output power / Input power) × 100%\n\n## Applications\n1. Power distribution systems\n2. Electronic circuits\n3. Voltage stabilization\n4. Impedance matching"
      });
      setIsGenerating(false);
      
      toast({
        title: "Answer generated successfully",
        description: "We've generated answers based on your material",
      });
    }, 2000);
  };

  const copyAnswer = (answer: string) => {
    navigator.clipboard.writeText(answer);
    toast({
      title: "Copied to clipboard",
      description: "Answer has been copied to clipboard",
    });
  };

  const downloadAnswer = (answer: string, markType: string) => {
    const element = document.createElement('a');
    const file = new Blob([answer], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${markType}_answer_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <PageContainer>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">AI-Powered Answer Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">Upload study material and get structured answers based on mark distribution.</p>
      </div>

      <div className="grid gap-6 grid-cols-1">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Upload Study Material</CardTitle>
            <CardDescription>Supported formats: PDF, DOCX (Max 10MB)</CardDescription>
          </CardHeader>
          <CardContent>
            {!file ? (
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Drag & Drop or Click to Browse</p>
                <p className="text-xs text-gray-400 mt-2">Upload a study material to generate AI-powered structured answers!</p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium truncate max-w-xs">{file.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Select Answer Type</CardTitle>
            <CardDescription>Choose the mark distribution for your answer</CardDescription>
          </CardHeader>
          <CardContent>
            <Select 
              value={answerType} 
              onValueChange={(value) => setAnswerType(value as AnswerType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Answer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2marks">2 Marks - Short & concise explanation</SelectItem>
                <SelectItem value="5marks">5 Marks - Detailed explanation with key points</SelectItem>
                <SelectItem value="10marks">10 Marks - In-depth breakdown with stepwise explanation</SelectItem>
                <SelectItem value="all">All Formats (Generate all three types)</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              disabled={!file || isGenerating}
              onClick={generateAnswer}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing with AI...
                </>
              ) : (
                "Generate Answer"
              )}
            </Button>
          </CardContent>
        </Card>

        {generatedAnswer && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Generated Answers</h2>

            {(answerType === '2marks' || answerType === 'all') && generatedAnswer.twoMarks && (
              <Card className="shadow-md border-l-4 border-green-500">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>2 Marks Answer</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyAnswer(generatedAnswer.twoMarks!)}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => downloadAnswer(generatedAnswer.twoMarks!, '2marks')}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{generatedAnswer.twoMarks}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {(answerType === '5marks' || answerType === 'all') && generatedAnswer.fiveMarks && (
              <Card className="shadow-md border-l-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>5 Marks Answer</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyAnswer(generatedAnswer.fiveMarks!)}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => downloadAnswer(generatedAnswer.fiveMarks!, '5marks')}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none whitespace-pre-line">
                    <p>{generatedAnswer.fiveMarks}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {(answerType === '10marks' || answerType === 'all') && generatedAnswer.tenMarks && (
              <Card className="shadow-md border-l-4 border-purple-500">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>10 Marks Answer</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyAnswer(generatedAnswer.tenMarks!)}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => downloadAnswer(generatedAnswer.tenMarks!, '10marks')}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm font-sans">{generatedAnswer.tenMarks}</pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default AIMarkAnswers;
