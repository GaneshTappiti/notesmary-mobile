
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Save, MessageSquare, Brain } from "lucide-react";

interface AnswerCardProps {
  question: string;
  answer: string;
  onSave?: () => void;
  isSaved?: boolean;
  loading?: boolean;
}

export const AnswerCard = ({ question, answer, onSave, isSaved = false, loading = false }: AnswerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="shadow-xl border-0 bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900">Your Question</CardTitle>
              <CardDescription className="text-gray-600">
                Here's what you asked about your study material
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Question Display */}
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <p className="text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">
              {question}
            </p>
          </div>
          
          {/* Answer Display */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AI Assistant Response</h3>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-100">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">
                {answer}
              </p>
            </div>
          </div>
        </CardContent>
        
        {onSave && (
          <CardFooter className="bg-gray-50 border-t border-gray-100 px-6 py-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Powered by AI • Based on your uploaded material</span>
              </div>
              <Button
                onClick={onSave}
                disabled={isSaved || loading}
                variant={isSaved ? "secondary" : "default"}
                size="sm"
                className={isSaved ? "bg-green-100 text-green-700 border-green-200" : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"}
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Saved to History
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Answer
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};
