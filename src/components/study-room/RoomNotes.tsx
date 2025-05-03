
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, Download } from 'lucide-react';

interface RoomNotesProps {
  roomId: string;
}

export const RoomNotes = ({ roomId }: RoomNotesProps) => {
  const [notes, setNotes] = useState<string>(
    "# Physics Study Notes\n\n## Key Formulas\n\n- E = mc²\n- F = ma\n- p = mv\n\n## Questions to Discuss\n\n1. How does relativistic mass change with velocity?\n2. Explain the photoelectric effect and its significance.\n3. Why is quantum entanglement important?\n\n## Next Steps\n\n- Review Chapter 7\n- Complete problem set 3\n- Prepare for quiz on Thursday"
  );
  
  const handleSaveNotes = () => {
    // In a real application, this would save to a database
    console.log("Saving notes:", notes);
  };
  
  return (
    <div className="flex flex-col h-full p-4 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" />
          <h2 className="font-medium">Collaborative Notes</h2>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => {
              const blob = new Blob([notes], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `study-room-${roomId}-notes.md`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSaveNotes}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
      
      <Textarea 
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="flex-1 min-h-[500px] font-mono text-sm resize-none p-4 border-gray-200 dark:border-gray-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder="Write your collaborative notes here..."
      />
      
      <div className="mt-2 text-sm text-muted-foreground">
        <p>Markdown formatting is supported. Last saved 5 minutes ago.</p>
      </div>
    </div>
  );
};
