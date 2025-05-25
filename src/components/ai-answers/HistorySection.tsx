
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Eye, Trash2, Clock, MessageSquare, Brain } from "lucide-react";
import { Database } from "@/types/database.types";

type AIRequest = Database['public']['Tables']['ai_requests']['Row'];

interface HistorySectionProps {
  history: AIRequest[];
  onDeleteItem?: (id: string) => void;
}

export const HistorySection = ({ history, onDeleteItem }: HistorySectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<AIRequest | null>(null);

  const filteredHistory = history.filter(item => 
    item.input?.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.output?.answer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
          <Clock className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">Question History</h2>
          <p className="text-gray-600">
            Review and revisit your past AI conversations
          </p>
        </div>
        {history.length > 0 && (
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {history.length} question{history.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      {/* Search Bar */}
      {history.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search your questions and answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>
      )}

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <Card className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 border-gray-200">
          <CardContent>
            <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {searchTerm ? "No matching questions found" : "No questions yet"}
            </h3>
            <p className="text-gray-500">
              {searchTerm 
                ? "Try adjusting your search terms to find what you're looking for." 
                : "Start by asking a question above to build your learning history!"
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-gray-200 bg-white hover:border-blue-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {formatDate(item.created_at || '')}
                    </div>
                    {onDeleteItem && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteItem(item.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <CardTitle className="text-sm font-semibold leading-tight text-gray-900 line-clamp-2">
                    {truncateText(item.input?.question || "Question", 80)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {truncateText(item.output?.answer || "No answer available", 120)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedItem(item)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-medium text-xs"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Full Conversation →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Full Answer Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardDescription className="text-gray-600 text-sm mb-1">
                        {formatDate(selectedItem.created_at || '')}
                      </CardDescription>
                      <CardTitle className="text-xl text-gray-900">Question & Answer</CardTitle>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full h-8 w-8 p-0"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Your Question:</h4>
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {selectedItem.input?.question || "No question available"}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">AI Assistant Response:</h4>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {selectedItem.output?.answer || "No answer available"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
