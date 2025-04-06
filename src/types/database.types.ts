
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          email_domain: string | null;
          branch: string | null;
          year_of_entry: string | null;
          year_of_completion: string | null;
          phone: string | null;
          avatar_url: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          email_domain?: string | null;
          branch?: string | null;
          year_of_entry?: string | null;
          year_of_completion?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          email_domain?: string | null;
          branch?: string | null;
          year_of_entry?: string | null;
          year_of_completion?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          updated_at?: string | null;
        };
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          subject: string | null;
          branch: string | null;
          chapter_name: string | null;
          chapter_no: string | null;
          regulation: string | null;
          content: string | null;
          file_url: string | null;
          uploaded_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          subject?: string | null;
          branch?: string | null;
          chapter_name?: string | null;
          chapter_no?: string | null;
          regulation?: string | null;
          content?: string | null;
          file_url?: string | null;
          uploaded_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          subject?: string | null;
          branch?: string | null;
          chapter_name?: string | null;
          chapter_no?: string | null;
          regulation?: string | null;
          content?: string | null;
          file_url?: string | null;
          uploaded_at?: string | null;
        };
      };
      ai_requests: {
        Row: {
          id: string;
          user_id: string;
          request_type: string;
          input: any | null;
          output: any | null;
          tokens_used: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          request_type: string;
          input?: any | null;
          output?: any | null;
          tokens_used?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          request_type?: string;
          input?: any | null;
          output?: any | null;
          tokens_used?: number | null;
          created_at?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
