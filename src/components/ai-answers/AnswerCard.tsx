
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Save } from "lucide-react";

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
      className="max-w-6xl mx-auto"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardTitle className="text-xl">Your Question</CardTitle>
          <CardDescription className="text-base">
            Here's what you asked about your study material
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6 border-l-4 border-blue-500">
            <p className="text-gray-900 dark:text-gray-100 font-medium whitespace-pre-wrap">
              {question}
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              AI Answer
            </h3>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border">
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap leading-relaxed">
                {answer}
              </p>
            </div>
          </div>
        </CardContent>
        {onSave && (
          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 border-t">
            <div className="flex justify-between items-center w-full">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Powered by AI based on your uploaded study material
              </p>
              <Button
                onClick={onSave}
                disabled={isSaved || loading}
                variant={isSaved ? "secondary" : "default"}
                size="sm"
                className="ml-4"
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" />
                    Save to History
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
