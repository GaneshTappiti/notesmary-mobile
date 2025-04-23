
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  content: string;
  uploaded_at: string | null;
}

const MyNotes: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check auth
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/authentication");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("notes")
        .select("id,title,content,uploaded_at")
        .eq("user_id", user.id)
        .order("uploaded_at", { ascending: false });
      if (error) {
        toast({ title: "Error", description: "Failed to fetch notes" });
      } else {
        setNotes(data as Note[]);
      }
      setLoading(false);
    };
    fetchNotes();
  }, [user, toast]);

  // Add note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: "Title required", description: "Please enter a note title" });
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, content, user_id: user.id }])
      .select("id,title,content,uploaded_at");
    if (error) {
      toast({ title: "Error", description: error.message });
    } else if (data) {
      setNotes((prev) => [data[0] as Note, ...prev]);
      setTitle("");
      setContent("");
      toast({ title: "Note added!", description: "Your note was saved." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Notes</h2>
      <form className="space-y-4 mb-8" onSubmit={handleAddNote}>
        <Input
          placeholder="Enter note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          disabled={loading}
        />
        <Textarea
          placeholder="Enter note content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={4}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Note"}
        </Button>
      </form>
      <div className="space-y-4">
        {notes.length === 0 && (
          <div className="text-gray-500 text-center">You have no notes yet.</div>
        )}
        {notes.map(note => (
          <div
            key={note.id}
            className="border rounded-lg p-4 shadow transition-all bg-white dark:bg-gray-900"
          >
            <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300">{note.title}</h3>
            <p className="mb-1 text-gray-700 dark:text-gray-300">{note.content}</p>
            <div className="text-xs text-gray-400 mt-2">
              {note.uploaded_at ? new Date(note.uploaded_at).toLocaleString() : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNotes;
