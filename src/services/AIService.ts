
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type AIRequestType = 'generate-answer' | 'generate-questions' | 'youtube-summary';

export const AIService = {
  /**
   * Send a request to the AI integration edge function
   */
  async sendRequest(requestType: AIRequestType, prompt: string, content?: string) {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error('You must be logged in to use AI features');
      }

      const { data, error } = await supabase.functions.invoke('ai-integration', {
        body: {
          requestType,
          prompt,
          content,
          userId: user.data.user.id,
        },
      });

      if (error) {
        throw error;
      }

      return data.result;
    } catch (error: any) {
      console.error('Error with AI request:', error);
      toast({
        title: 'AI Request Failed',
        description: error.message || 'Failed to process your request. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  },

  /**
   * Get AI-generated answer to a question
   */
  async getAnswer(question: string, noteContent?: string) {
    return this.sendRequest('generate-answer', question, noteContent);
  },

  /**
   * Generate questions from note content
   */
  async generateQuestions(noteContent: string) {
    return this.sendRequest('generate-questions', '', noteContent);
  },

  /**
   * Generate a summary from YouTube content
   */
  async getYouTubeSummary(videoUrl: string) {
    return this.sendRequest('youtube-summary', videoUrl);
  },

  /**
   * Get user's past AI requests
   */
  async getUserAIRequests() {
    try {
      // Explicitly type the response to match our Database types
      const { data, error } = await supabase
        .from('ai_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching AI requests:', error);
      return [];
    }
  },
};
