
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type Note = {
  id: string;
  title: string;
  subject?: string;
  branch?: string;
  chapter_name?: string;
  chapter_no?: string;
  regulation?: string;
  content?: string;
  file_url?: string;
  uploaded_at: string;
  user_id: string;
};

export type NoteUpload = {
  title: string;
  subject?: string;
  branch?: string;
  chapter_name?: string;
  chapter_no?: string;
  regulation?: string;
  content?: string;
  file?: File;
};

export const NotesService = {
  /**
   * Upload a new note with optional file attachment
   */
  async uploadNote(note: NoteUpload) {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error('You must be logged in to upload notes');
      }

      const userId = user.data.user.id;
      let fileUrl = null;

      // If a file was provided, upload it to storage
      if (note.file) {
        const fileExt = note.file.name.split('.').pop();
        const filePath = `${userId}/${Date.now()}.${fileExt}`;

        // Upload the file to Supabase storage
        const { data: fileData, error: fileError } = await supabase.storage
          .from('notes')
          .upload(filePath, note.file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (fileError) {
          throw fileError;
        }

        // Get the public URL for the file
        const { data: urlData } = supabase.storage.from('notes').getPublicUrl(filePath);
        fileUrl = urlData.publicUrl;
      }

      // Insert the note into the database
      const { data, error } = await supabase.from('notes').insert({
        title: note.title,
        subject: note.subject || null,
        branch: note.branch || null,
        chapter_name: note.chapter_name || null,
        chapter_no: note.chapter_no || null,
        regulation: note.regulation || null,
        content: note.content || null,
        file_url: fileUrl,
        user_id: userId,
      }).select().single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Note Uploaded',
        description: 'Your note has been uploaded successfully.',
      });

      return data;
    } catch (error: any) {
      console.error('Error uploading note:', error);
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload note. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  },

  /**
   * Get all notes for the current user
   */
  async getUserNotes() {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user notes:', error);
      return [];
    }
  },

  /**
   * Get a specific note by ID
   */
  async getNoteById(noteId: string) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', noteId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching note:', error);
      return null;
    }
  },

  /**
   * Update an existing note
   */
  async updateNote(noteId: string, updates: Partial<Note>, newFile?: File) {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error('You must be logged in to update notes');
      }

      let fileUrl = updates.file_url;

      // If a new file was provided, upload it
      if (newFile) {
        const userId = user.data.user.id;
        const fileExt = newFile.name.split('.').pop();
        const filePath = `${userId}/${Date.now()}.${fileExt}`;

        // Upload the file to Supabase storage
        const { error: fileError } = await supabase.storage
          .from('notes')
          .upload(filePath, newFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (fileError) {
          throw fileError;
        }

        // Get the public URL for the file
        const { data: urlData } = supabase.storage.from('notes').getPublicUrl(filePath);
        fileUrl = urlData.publicUrl;
      }

      // Update the note in the database
      const { data, error } = await supabase
        .from('notes')
        .update({
          ...updates,
          file_url: fileUrl,
        })
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

      return data;
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
      // First get the note to check if it has a file
      const { data: note, error: fetchError } = await supabase
        .from('notes')
        .select('file_url')
        .eq('id', noteId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // If the note has a file, delete it from storage
      if (note.file_url) {
        const filePath = note.file_url.split('/').pop();
        const userId = (await supabase.auth.getUser()).data.user?.id;
        
        if (userId && filePath) {
          await supabase.storage
            .from('notes')
            .remove([`${userId}/${filePath}`]);
        }
      }

      // Delete the note from the database
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);

      if (error) {
        throw error;
      }

      toast({
        title: 'Note Deleted',
        description: 'The note has been deleted successfully.',
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting note:', error);
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete note. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  },

  /**
   * Search notes by various criteria
   */
  async searchNotes(params: {
    title?: string;
    subject?: string;
    branch?: string;
    chapter?: string;
  }) {
    try {
      let query = supabase.from('notes').select('*');

      if (params.title) {
        query = query.ilike('title', `%${params.title}%`);
      }
      
      if (params.subject) {
        query = query.eq('subject', params.subject);
      }
      
      if (params.branch) {
        query = query.eq('branch', params.branch);
      }
      
      if (params.chapter) {
        query = query.ilike('chapter_name', `%${params.chapter}%`);
      }
      
      const { data, error } = await query.order('uploaded_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error searching notes:', error);
      return [];
    }
  },
};
