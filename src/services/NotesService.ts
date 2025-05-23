import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Database } from '@/types/database.types';
import { OfflineManager, CACHE_KEYS } from '@/utils/offlineManager';

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

// Helper to detect if we're online
const isOnline = async (): Promise<boolean> => {
  try {
    const Network = await import('@capacitor/network').then(module => module.Network);
    const status = await Network.getStatus();
    return status.connected;
  } catch (error) {
    console.error('Error checking network status:', error);
    // Assume online if we can't check (e.g., in web environment)
    return true;
  }
};

export const NotesService = {
  /**
   * Upload notes for a user
   */
  async uploadNotes(note: NoteInput, userId: string) {
    try {
      // Check if we're online
      const online = await isOnline();
      
      if (!online) {
        toast({
          title: 'You are offline',
          description: 'Your notes will be saved locally and uploaded when you reconnect.',
          variant: 'warning',
        });
        
        // Store draft locally
        const drafts = await OfflineManager.getData<NoteInput[]>('offline-note-drafts') || [];
        drafts.push(note);
        await OfflineManager.saveData('offline-note-drafts', drafts);
        
        // Return a placeholder with local ID
        return {
          ...note,
          id: `local-${Date.now()}`,
          user_id: userId,
          uploaded_at: new Date().toISOString(),
          _isOffline: true
        };
      }
      
      // We're online, proceed with regular upload
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

      // Cache the newly created note
      const cachedNotes = await OfflineManager.getData<Note[]>(CACHE_KEYS.NOTES) || [];
      cachedNotes.unshift(data);
      await OfflineManager.saveData(CACHE_KEYS.NOTES, cachedNotes);

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
      // Check if we're online
      const online = await isOnline();
      
      // If offline, return cached data
      if (!online) {
        toast({
          title: 'Offline Mode',
          description: 'Showing cached notes. Some content may not be up to date.',
          variant: 'warning',
        });
        
        const cachedNotes = await OfflineManager.getData<Note[]>(CACHE_KEYS.NOTES);
        return cachedNotes || [];
      }
      
      // We're online, fetch from API
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('uploaded_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Update cache with fresh data
      await OfflineManager.saveData(CACHE_KEYS.NOTES, data, 24 * 60 * 60 * 1000); // Cache for 24 hours

      return data as Note[];
    } catch (error) {
      console.error('Error fetching notes:', error);
      
      // Try to get from cache as fallback
      const cachedNotes = await OfflineManager.getData<Note[]>(CACHE_KEYS.NOTES);
      if (cachedNotes) {
        toast({
          title: 'Showing Cached Data',
          description: 'Could not fetch the latest notes. Showing previously cached data.',
          variant: 'warning',
        });
        return cachedNotes;
      }
      
      return [];
    }
  },

  /**
   * Get a note by ID
   */
  async getNote(noteId: string) {
    try {
      // Check if we're online
      const online = await isOnline();
      
      // For local offline notes that haven't been synced yet
      if (noteId.startsWith('local-')) {
        const drafts = await OfflineManager.getData<NoteInput[]>('offline-note-drafts') || [];
        const localIndex = parseInt(noteId.replace('local-', ''));
        
        const draftNote = drafts.find(draft => `local-${localIndex}` === noteId);
        if (draftNote) {
          return {
            ...draftNote,
            id: noteId,
            _isOffline: true,
            uploaded_at: new Date().toISOString()
          } as Note;
        }
        return null;
      }
      
      // If offline, try to get from cache
      if (!online) {
        const cachedNotes = await OfflineManager.getData<Note[]>(CACHE_KEYS.NOTES);
        if (cachedNotes) {
          const note = cachedNotes.find(note => note.id === noteId);
          if (note) {
            return note;
          }
        }
        
        toast({
          title: 'Offline Mode',
          description: 'This note is not available offline.',
          variant: 'warning',
        });
        return null;
      }
      
      // We're online, fetch from API
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', noteId)
        .single();

      if (error) {
        throw error;
      }

      // Cache this individual note for offline access
      const cachedNotes = await OfflineManager.getData<Note[]>(CACHE_KEYS.NOTES) || [];
      const existingIndex = cachedNotes.findIndex(note => note.id === noteId);
      
      if (existingIndex >= 0) {
        cachedNotes[existingIndex] = data;
      } else {
        cachedNotes.push(data);
      }
      
      await OfflineManager.saveData(CACHE_KEYS.NOTES, cachedNotes);
      
      // Also cache to recent notes
      const recentNotes = await OfflineManager.getData<Note[]>(CACHE_KEYS.RECENT_NOTES) || [];
      const existingRecentIndex = recentNotes.findIndex(note => note.id === noteId);
      
      if (existingRecentIndex >= 0) {
        recentNotes.splice(existingRecentIndex, 1);
      }
      recentNotes.unshift(data);
      
      // Keep only the 10 most recent notes
      const trimmedRecents = recentNotes.slice(0, 10);
      await OfflineManager.saveData(CACHE_KEYS.RECENT_NOTES, trimmedRecents);

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
      // Check if we're online
      const online = await isOnline();
      
      // If offline, search in cached notes
      if (!online) {
        const cachedNotes = await OfflineManager.getData<Note[]>(CACHE_KEYS.NOTES);
        if (cachedNotes) {
          // Simple client-side search
          const filteredNotes = cachedNotes.filter(note => 
            note.title.toLowerCase().includes(keywords.toLowerCase()) ||
            note.subject.toLowerCase().includes(keywords.toLowerCase()) ||
            note.content.toLowerCase().includes(keywords.toLowerCase())
          );
          
          return filteredNotes;
        }
        
        toast({
          title: 'Offline Mode',
          description: 'Search functionality is limited while offline.',
          variant: 'warning',
        });
        return [];
      }
      
      // We're online, use the API
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
  
  /**
   * Sync any offline notes when coming back online
   */
  async syncOfflineNotes(userId: string) {
    try {
      const drafts = await OfflineManager.getData<NoteInput[]>('offline-note-drafts');
      if (!drafts || drafts.length === 0) {
        return { success: true, count: 0 };
      }
      
      let successCount = 0;
      
      for (const draft of drafts) {
        try {
          const { data, error } = await supabase
            .from('notes')
            .insert({
              user_id: userId,
              title: draft.title,
              subject: draft.subject,
              branch: draft.branch,
              chapter_name: draft.chapter_name,
              chapter_no: draft.chapter_no,
              regulation: draft.regulation,
              content: draft.content,
              file_url: draft.file_url,
            })
            .select()
            .single();
            
          if (!error) {
            successCount++;
          }
        } catch (error) {
          console.error('Error syncing offline note:', error);
        }
      }
      
      // Clear the offline drafts
      await OfflineManager.removeData('offline-note-drafts');
      
      // Refresh the notes cache
      this.getNotes(userId);
      
      if (successCount > 0) {
        toast({
          title: 'Notes Synced',
          description: `Successfully uploaded ${successCount} offline notes.`,
        });
      }
      
      return { success: true, count: successCount };
    } catch (error) {
      console.error('Error syncing offline notes:', error);
      return { success: false, count: 0 };
    }
  }
};
