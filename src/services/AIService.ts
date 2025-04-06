
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

// Define the AIRequestType type
export type AIRequestType = 'generate-answer' | 'generate-questions' | 'youtube-summary' | 'pdf-answer';

export const AIService = {
  async saveAIRequest(userId: string, requestType: string, input: any, output: any, tokensUsed: number) {
    try {
      const { data, error } = await supabase
        .from('ai_requests')
        .insert({
          user_id: userId,
          request_type: requestType,
          input,
          output,
          tokens_used: tokensUsed
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving AI request:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in saveAIRequest:', error);
      throw error;
    }
  },

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

  async getAnswer(question: string, noteContent?: string) {
    return this.sendRequest('generate-answer', question, noteContent);
  },

  async generateQuestions(noteContent: string) {
    return this.sendRequest('generate-questions', '', noteContent);
  },

  async getYouTubeSummary(videoUrl: string) {
    return this.sendRequest('youtube-summary', videoUrl);
  },

  async getUserAIRequests() {
    try {
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

  async getPDFAnswer(question: string, noteIds?: string[]) {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error('You must be logged in to use AI features');
      }

      const { data, error } = await supabase.functions.invoke('pdf-query', {
        body: {
          question,
          noteIds,
          userId: user.data.user.id,
        },
      });

      if (error) {
        throw error;
      }

      // Save the request for analytics
      this.saveAIRequest(
        user.data.user.id,
        'pdf-answer',
        { question, noteIds },
        { answer: data.answer },
        data.tokensUsed || 0
      ).catch(err => console.error('Error saving AI request:', err));

      return data;
    } catch (error: any) {
      console.error('Error with PDF answer request:', error);
      toast({
        title: 'PDF Answer Request Failed',
        description: error.message || 'Failed to process your request. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  },

  async getUserPDFs() {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError || !userData.user) {
        throw new Error('You must be logged in to retrieve PDFs');
      }
      
      const { data, error } = await supabase
        .from('notes')
        .select('id, title, subject, branch, file_url, uploaded_at')
        .eq('user_id', userData.user.id)
        .order('uploaded_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error fetching user PDFs:', error);
      return [];
    }
  }
};
