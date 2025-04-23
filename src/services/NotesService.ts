import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Database } from '@/types/database.types';

export type Note = Database['public']['Tables']['notes']['Row'];

export type NoteInput = {
  title: string;
  subject: string;
  branch: string;
  chapter_name: string;
  chapter_no: string;
  regulation: string;
  content: string;
  file_url?: string;
};

export const NotesService = {
  /**
   * Upload notes for a user
   */
  async uploadNotes(note: NoteInput, userId: string) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert({
          user_id: userId,
          title: note.title,
          subject: note.subject,
          branch: note.branch,
          chapter_name: note.chapter_name,
          chapter_no: note.chapter_no,
          regulation: note.regulation,
          content: note.content,
          file_url: note.file_url,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Notes Uploaded',
        description: 'Your notes have been uploaded successfully.',
      });

      return data;
    } catch (error: any) {
      console.error('Error uploading notes:', error);
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload notes. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  },

  /**
   * Get all notes for a user
   */
  async getNotes(userId: string) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('uploaded_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Note[];
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  },

  /**
   * Get a note by ID
   */
  async getNote(noteId: string) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', noteId)
        .single();

      if (error) {
        throw error;
      }

      return data as Note;
    } catch (error) {
      console.error('Error fetching note:', error);
      return null;
    }
  },

  /**
   * Update a note
   */
  async updateNote(noteId: string, note: Partial<NoteInput>) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .update(note)
        .eq('id', noteId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Note Updated',
        description: 'Your note has been updated successfully.',
      });

      return data as Note;
    } catch (error: any) {
      console.error('Error updating note:', error);
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update note. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  },

  /**
   * Delete a note
   */
  async deleteNote(noteId: string) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);

      if (error) {
        throw error;
      }

      toast({
        title: 'Note Deleted',
        description: 'Your note has been deleted successfully.',
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting note:', error);
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete note. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  },

  async createNote(note: NoteInput, userId: string) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert({
          title: note.title,
          subject: note.subject,
          branch: note.branch,
          chapter_name: note.chapter_name,
          chapter_no: note.chapter_no,
          regulation: note.regulation,
          content: note.content,
          file_url: note.file_url,
          user_id: userId
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  async getNoteById(id: string) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Error getting note by ID:', error);
      return null;
    }
  },

  /**
   * Find notes by keywords
   */
  async findNotes(userId: string, keywords: string) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .ilike('title', `%${keywords}%`)
        .order('uploaded_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Note[];
    } catch (error) {
      console.error('Error finding notes:', error);
      return [];
    }
  },
};
